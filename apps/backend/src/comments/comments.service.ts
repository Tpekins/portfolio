import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto, UpdateCommentStatusDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all approved comments for a blog post (public)
   */
  async findByBlogPost(blogPostId: string) {
    // First verify the blog post exists
    const blogPost = await this.prisma.blogPost.findUnique({
      where: { id: blogPostId },
    });

    if (!blogPost) {
      throw new NotFoundException('Blog post not found');
    }

    return this.prisma.comment.findMany({
      where: {
        blogPostId,
        approved: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get all comments for a blog post including unapproved (admin only)
   */
  async findByBlogPostAdmin(blogPostId: string) {
    const blogPost = await this.prisma.blogPost.findUnique({
      where: { id: blogPostId },
    });

    if (!blogPost) {
      throw new NotFoundException('Blog post not found');
    }

    return this.prisma.comment.findMany({
      where: { blogPostId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get single comment (admin only)
   */
  async findOne(id: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  /**
   * Create new comment (public, but requires approval)
   */
  async create(blogPostId: string, createCommentDto: CreateCommentDto) {
    // Verify blog post exists
    const blogPost = await this.prisma.blogPost.findUnique({
      where: { id: blogPostId },
    });

    if (!blogPost) {
      throw new NotFoundException('Blog post not found');
    }

    const comment = await this.prisma.comment.create({
      data: {
        ...createCommentDto,
        blogPostId,
        approved: false, // Comments require moderation by default
      },
    });

    return {
      id: comment.id,
      message:
        'Thank you for your comment. It will be displayed after admin approval.',
    };
  }

  /**
   * Update comment approval status (admin only)
   */
  async updateStatus(
    id: string,
    updateCommentStatusDto: UpdateCommentStatusDto,
  ) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const updatedComment = await this.prisma.comment.update({
      where: { id },
      data: {
        approved: updateCommentStatusDto.approved,
      },
    });

    return updatedComment;
  }

  /**
   * Delete comment (admin only)
   */
  async delete(id: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    await this.prisma.comment.delete({
      where: { id },
    });

    return { message: 'Comment deleted successfully' };
  }
}
