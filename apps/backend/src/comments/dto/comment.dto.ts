import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  authorName!: string;

  @ApiProperty({ example: 'Great post! This helped me a lot.' })
  @IsString()
  @IsNotEmpty()
  content!: string;
}

export class UpdateCommentStatusDto {
  @ApiProperty({ example: true, description: 'Approve or reject comment' })
  approved!: boolean;
}
