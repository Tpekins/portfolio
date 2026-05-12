import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CommentService } from './comments.service';
import { CreateCommentDto, UpdateCommentStatusDto } from './dto/comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles, RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('comments')
@Controller('blog/:blogPostId/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  /**
   * Get approved comments for a blog post (public)
   */
  @Get()
  @ApiOperation({ summary: 'Get approved comments for blog post (public)' })
  @ApiResponse({ status: 200, description: 'List of approved comments' })
  async findByBlogPost(@Param('blogPostId') blogPostId: string) {
    return this.commentService.findByBlogPost(blogPostId);
  }

  /**
   * Get all comments including unapproved (admin only)
   */
  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all comments including unapproved (admin only)',
  })
  async findByBlogPostAdmin(@Param('blogPostId') blogPostId: string) {
    return this.commentService.findByBlogPostAdmin(blogPostId);
  }

  /**
   * Submit new comment (public, requires approval)
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit new comment (public, requires approval)' })
  @ApiResponse({ status: 201, description: 'Comment submitted for approval' })
  async create(
    @Param('blogPostId') blogPostId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.create(blogPostId, createCommentDto);
  }

  /**
   * Approve or reject comment (admin only)
   */
  @Patch(':commentId/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Approve or reject comment (admin only)' })
  @ApiResponse({ status: 200, description: 'Comment status updated' })
  async updateStatus(
    @Param('commentId') commentId: string,
    @Body() updateCommentStatusDto: UpdateCommentStatusDto,
  ) {
    return this.commentService.updateStatus(commentId, updateCommentStatusDto);
  }

  /**
   * Delete comment (admin only)
   */
  @Delete(':commentId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete comment (admin only)' })
  @ApiResponse({ status: 200, description: 'Comment deleted' })
  async delete(@Param('commentId') commentId: string) {
    return this.commentService.delete(commentId);
  }
}
