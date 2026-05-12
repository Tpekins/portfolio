import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class CreateBlogPostDto {
  @ApiProperty({ example: 'My First Blog Post' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'my-first-blog-post' })
  @IsString()
  slug: string;

  @ApiProperty({ example: 'This is the content of the blog post...' })
  @IsString()
  content: string;

  @ApiProperty({ example: 'Programming', required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ example: 'A brief excerpt', required: false })
  @IsOptional()
  @IsString()
  excerpt?: string;

  @ApiProperty({ example: ['typescript', 'nestjs'], required: false })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  published?: boolean;
}

export class UpdateBlogPostDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  excerpt?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  publishedAt?: string;
}

export class BlogPostQueryDto {
  @ApiProperty({ required: false, description: 'Filter by category' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ required: false, description: 'Filter by featured status' })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiProperty({ required: false, description: 'Filter by published status' })
  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @ApiProperty({ required: false, description: 'Page number', example: 1 })
  @IsOptional()
  page?: number;

  @ApiProperty({ required: false, description: 'Items per page', example: 10 })
  @IsOptional()
  limit?: number;
}
