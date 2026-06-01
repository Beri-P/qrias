import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Req,
  Ip,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Content } from './entities/content.entity';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { AnalyticsService } from '../analytics/analytics.service';

@Controller('content')
export class ContentController {
  constructor(
    private service: ContentService,
    private analytics: AnalyticsService,
  ) {}

  @Get()
  findAll(@Query('type') type?: string) {
    return this.service.findAll(type);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req, @Ip() ip: string) {
    const content = (await this.service.findOne(id)) as Content;
    // Track the analytics event
    this.analytics
      .track(id, content.type, req.user?.id ?? null, ip)
      .catch(() => {});
    return content;
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: CreateContentDto, @Req() req) {
    return this.service.create(dto, req.user);
  }

  @Post(':id/publish')
  @UseGuards(AuthGuard('jwt'))
  publish(@Param('id') id: string) {
    return this.service.publish(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
