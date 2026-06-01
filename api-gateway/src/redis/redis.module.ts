import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

export const REDIS_CLIENT = 'REDIS_CLIENT';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: (c: ConfigService) =>
        new Redis({
          host: c.get('REDIS_HOST'),
          port: +c.get('REDIS_PORT'),
          password: c.get('REDIS_PASS'),
        }),
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
