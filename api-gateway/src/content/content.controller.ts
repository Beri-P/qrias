import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';

@Controller('content')
export class ContentController {
  constructor(private service: ContentService) {}

  @Get()
  findAll(@Query('type') type?: string) { return this.service.findAll(type); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.service.findOne(id); }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: CreateContentDto, @Req() req) { return this.service.create(dto, req.user); }

  @Post(':id/publish')
  @UseGuards(AuthGuard('jwt'))
  publish(@Param('id') id: string) { return this.service.publish(id); }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) { return this.service.remove(id); }
}