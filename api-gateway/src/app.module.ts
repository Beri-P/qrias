import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ContentModule } from './content/content.module';
import { RedisModule } from './redis/redis.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (c: ConfigService) => ({
        type: 'postgres',
        host: c.get('DB_HOST'),
        port: +(c.get('DB_PORT') ?? 5432),
        username: c.get('DB_USER'),
        password: c.get('DB_PASS'),
        database: c.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // dev only — swap for migrations in prod
      }),
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (c: ConfigService) => ({ uri: c.get('MONGO_URI') }),
    }),
    AuthModule,
    UsersModule,
    ContentModule,
    RedisModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
