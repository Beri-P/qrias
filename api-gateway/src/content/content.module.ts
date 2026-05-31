import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { ContentService } from './content.service';
import { CacheService } from '../cache/cache.service'
import { ContentController } from './content.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Content])],
  providers: [ContentService, CacheService],
  controllers: [ContentController],
})
export class ContentModule {}