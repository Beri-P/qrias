import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ContentType } from '../entities/content.entity';

export class CreateContentDto {
  @IsString() title: string;
  @IsOptional() @IsString() description?: string;
  @IsEnum(ContentType) type: ContentType;
  @IsOptional() @IsString() mediaUrl?: string;
  @IsOptional() @IsString() thumbnailUrl?: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsString() language?: string;
}
