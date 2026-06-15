import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFeedItemDto {
  @ApiProperty({ example: 'video', enum: ['video', 'photo', 'note', 'event'] })
  @IsString()
  type!: string;

  @ApiProperty({ example: '2026-06-10', required: false })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({ example: 'Building a REST API in 20 minutes', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'A hands-on walkthrough...', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'YOUR_VIDEO_ID', required: false })
  @IsOptional()
  @IsString()
  youtubeId?: string;

  @ApiProperty({ example: 'https://example.com/photo.jpg', required: false })
  @IsOptional()
  @IsString()
  photoUrl?: string;

  @ApiProperty({ example: 'Spent the afternoon mentoring...', required: false })
  @IsOptional()
  @IsString()
  noteContent?: string;

  @ApiProperty({ example: 'Douala, Cameroon', required: false })
  @IsOptional()
  @IsString()
  eventLocation?: string;

  @ApiProperty({ example: '2:00 PM WAT', required: false })
  @IsOptional()
  @IsString()
  eventTime?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  published?: boolean;
}

export class UpdateFeedItemDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  youtubeId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  photoUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  noteContent?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  eventLocation?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  eventTime?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  published?: boolean;
}

export class FeedItemQueryDto {
  @ApiProperty({ required: false, description: 'Filter by type' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ required: false, description: 'Page number', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiProperty({ required: false, description: 'Items per page', example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}
