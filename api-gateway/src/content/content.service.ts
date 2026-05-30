import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content, ContentStatus } from './entities/content.entity';
import { CreateContentDto } from './dto/create-content.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ContentService {
  constructor(@InjectRepository(Content) private repo: Repository<Content>) {}

  create(dto: CreateContentDto, author: User) {
    const content = this.repo.create({ ...dto, author });
    return this.repo.save(content);
  }

  findAll(type?: string) {
    const qb = this.repo.createQueryBuilder('c')
      .leftJoinAndSelect('c.author', 'author')
      .where('c.status = :status', { status: ContentStatus.PUBLISHED })
      .orderBy('c.createdAt', 'DESC');
    if (type) qb.andWhere('c.type = :type', { type });
    return qb.getMany();
  }

  async findOne(id: string) {
    const c = await this.repo.findOne({ where: { id }, relations: { author: true } });
    if (!c) throw new NotFoundException('Content not found');
    return c;
  }

  async publish(id: string) {
    await this.repo.update(id, { status: ContentStatus.PUBLISHED, publishedAt: new Date() });
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { deleted: true };
  }
}