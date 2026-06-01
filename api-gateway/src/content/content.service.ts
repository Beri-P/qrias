import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content, ContentStatus } from './entities/content.entity';
import { CreateContentDto } from './dto/create-content.dto';
import { User } from '../users/entities/user.entity';
import { CacheService } from '../cache/cache.service';

const FEED_KEY = 'content:feed:*';
const feedKey = (type?: string) => `content:feed:${type ?? 'all'}`;
const itemKey = (id: string) => `content:item:${id}`;

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content) private repo: Repository<Content>,
    private cache: CacheService,
  ) {}

  async create(dto: CreateContentDto, author: User) {
    const content = this.repo.create({ ...dto, author });
    const saved = await this.repo.save(content);
    await this.cache.delByPattern(FEED_KEY);
    return saved;
  }

  async findAll(type?: string) {
    const key = feedKey(type);
    const cached = await this.cache.get(key);
    if (cached) return cached;

    const qb = this.repo
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.author', 'author')
      .where('c.status = :status', { status: ContentStatus.PUBLISHED })
      .orderBy('c.createdAt', 'DESC');
    if (type) qb.andWhere('c.type = :type', { type });

    const results = await qb.getMany();
    await this.cache.set(key, results, 120); // 2 min TTL
    return results;
  }

  async findOne(id: string) {
    const key = itemKey(id);
    const cached = await this.cache.get(key);
    if (cached) return cached;

    const c = await this.repo.findOne({
      where: { id },
      relations: { author: true },
    });
    if (!c) throw new NotFoundException('Content not found');
    await this.cache.set(key, c, 300); // 5 min TTL
    return c;
  }

  async publish(id: string) {
    await this.repo.update(id, {
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    });
    await this.cache.del(itemKey(id));
    await this.cache.delByPattern(FEED_KEY);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.repo.delete(id);
    await this.cache.del(itemKey(id));
    await this.cache.delByPattern(FEED_KEY);
    return { deleted: true };
  }
}
