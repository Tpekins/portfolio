import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsInt,
  IsArray,
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

  // eslint-disable-next-line prettier/prettier
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

  @ApiProperty({
    example: 'https://example.com/photo.jpg',
    required: false,
    description: 'Legacy single photo field — prefer photoUrls instead',
  })
  @IsOptional()
  @IsString()
  photoUrl?: string;

  @ApiProperty({
    // eslint-disable-next-line prettier/prettier
    example: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
    required: false,
    type: [String],
    description: 'List of photo URLs, in display order (any number of photos)',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  photoUrls?: string[];

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

  @ApiProperty({
    required: false,
    description: 'Legacy single photo field — prefer photoUrls instead',
  })
  @IsOptional()
  @IsString()
  photoUrl?: string;

  @ApiProperty({
    required: false,
    type: [String],
    description:
      'List of photo URLs, in display order. If provided, REPLACES all existing photos for this item.',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  photoUrls?: string[];

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
