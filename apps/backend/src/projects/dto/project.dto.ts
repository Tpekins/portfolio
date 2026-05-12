import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
  IsUrl,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'My Awesome Project' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'my-awesome-project' })
  @IsString()
  slug: string;

  @ApiProperty({ example: 'A detailed description of the project...' })
  @IsString()
  description: string;

  @ApiProperty({
    example: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  technologies?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @ApiProperty({ example: 'https://demo.example.com', required: false })
  @IsOptional()
  @IsUrl()
  demoUrl?: string;

  @ApiProperty({ example: 'https://github.com/user/project', required: false })
  @IsOptional()
  @IsUrl()
  gitUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}

export class UpdateProjectDto {
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
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  technologies?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  demoUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  gitUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}

export class ProjectQueryDto {
  @ApiProperty({ required: false, description: 'Filter by featured status' })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiProperty({ required: false, description: 'Page number', example: 1 })
  @IsOptional()
  page?: number;

  @ApiProperty({ required: false, description: 'Items per page', example: 10 })
  @IsOptional()
  limit?: number;
}
