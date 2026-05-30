import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, AuthProvider } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findByEmail(email: string, withPassword = false): Promise<User | null> {
    const qb = this.repo.createQueryBuilder('u').where('u.email = :email', { email });
    if (withPassword) qb.addSelect('u.password');
    return qb.getOne();
  }

  async findById(id: string): Promise<User | null> {
    return this.repo.findOneBy({ id });
  }

  async createLocal(email: string, name: string, password: string): Promise<User> {
    const exists = await this.findByEmail(email);
    if (exists) throw new ConflictException('Email already registered');
    const hashed = await bcrypt.hash(password, 12);
    const user = this.repo.create({ email, name, password: hashed, provider: AuthProvider.LOCAL });
    return this.repo.save(user);
  }

  async findOrCreateOAuth(profile: { email: string; name: string; providerId: string; avatarUrl: string; provider: AuthProvider }): Promise<User> {
    let user = await this.findByEmail(profile.email);
    if (!user) {
      user = this.repo.create(profile);
      await this.repo.save(user);
    }
    return user;
  }
}