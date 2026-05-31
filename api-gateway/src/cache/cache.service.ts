import { Injectable, Inject } from '@nestjs/common'
import Redis from 'ioredis'
import { REDIS_CLIENT } from '../redis/redis.module'

@Injectable()
export class CacheService {
  constructor(@Inject(REDIS_CLIENT) private redis: Redis) {}

  async get<T>(key: string): Promise<T | null> {
    const val = await this.redis.get(key)
    return val ? JSON.parse(val) : null
  }

  async set(key: string, value: any, ttlSeconds = 60) {
    await this.redis.set(key, JSON.stringify(value), 'EX', ttlSeconds)
  }

  async del(...keys: string[]) {
    if (keys.length) await this.redis.del(...keys)
  }

  async delByPattern(pattern: string) {
    const keys = await this.redis.keys(pattern)
    if (keys.length) await this.redis.del(...keys)
  }
}