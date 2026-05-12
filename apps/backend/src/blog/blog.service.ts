/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateBlogPostDto,
  UpdateBlogPostDto,
  BlogPostQueryDto,
} from './dto/blog.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all blog posts with pagination and filters
   */
  async findAll(query: BlogPostQueryDto, userId: string) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.BlogPostWhereInput = {
      published: true,
    };

    if (query.category) {
      where.category = query.category;
    }

    if (query.featured !== undefined) {
      where.featured = query.featured;
    }

    const [posts, total] = await Promise.all([
      this.prisma.blogPost.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          category: true,
          thumbnail: true,
          tags: true,
          featured: true,
          publishedAt: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: { comments: true },
          },
        },
      }),
      this.prisma.blogPost.count({ where }),
    ]);

    return {
      data: posts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get all posts for admin (published and unpublished)
   */
  async findAllAdmin(userId: string, query: BlogPostQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.BlogPostWhereInput = {
      authorId: userId,
    };

    if (query.category) {
      where.category = query.category;
    }

    if (query.featured !== undefined) {
      where.featured = query.featured;
    }

    if (query.published !== undefined) {
      where.published = query.published;
    }

    const [posts, total] = await Promise.all([
      this.prisma.blogPost.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.blogPost.count({ where }),
    ]);

    return {
      data: posts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get single blog post by ID or slug
   */
  async findOne(idOrSlug: string) {
    const post = await this.prisma.blogPost.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
        published: true,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        comments: {
          where: { approved: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!post) {
      throw new NotFoundException('Blog post not found');
    }

    return post;
  }

  /**
   * Get single blog post by ID (admin - includes unpublished)
   */
  async findOneAdmin(id: string, userId: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        comments: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!post) {
      throw new NotFoundException('Blog post not found');
    }

    if (post.authorId !== userId) {
      throw new BadRequestException(
        'You do not have permission to access this post',
      );
    }

    return post;
  }

  /**
   * Create new blog post
   */
  async create(createBlogPostDto: CreateBlogPostDto, userId: string) {
    // Check if slug is unique
    const existingSlug = await this.prisma.blogPost.findUnique({
      where: { slug: createBlogPostDto.slug },
    });

    if (existingSlug) {
      throw new BadRequestException('A post with this slug already exists');
    }

    const post = await this.prisma.blogPost.create({
      data: {
        ...createBlogPostDto,
        publishedAt: createBlogPostDto.published ? new Date() : null,
        authorId: userId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return post;
  }

  /**
   * Update blog post
   */
  async update(
    id: string,
    updateBlogPostDto: UpdateBlogPostDto,
    userId: string,
  ) {
    const post = await this.prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Blog post not found');
    }

    if (post.authorId !== userId) {
      throw new BadRequestException(
        'You do not have permission to update this post',
      );
    }

    // Check if slug is unique (if changing slug)
    if (updateBlogPostDto.slug && updateBlogPostDto.slug !== post.slug) {
      const existingSlug = await this.prisma.blogPost.findUnique({
        where: { slug: updateBlogPostDto.slug },
      });

      if (existingSlug) {
        throw new BadRequestException('A post with this slug already exists');
      }
    }

    const updatedPost = await this.prisma.blogPost.update({
      where: { id },
      data: {
        ...updateBlogPostDto,
        publishedAt:
          updateBlogPostDto.published === true && !post.published
            ? new Date()
            : updateBlogPostDto.publishedAt
              ? new Date(updateBlogPostDto.publishedAt)
              : post.publishedAt,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return updatedPost;
  }

  /**
   * Delete blog post
   */
  async delete(id: string, userId: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Blog post not found');
    }

    if (post.authorId !== userId) {
      throw new BadRequestException(
        'You do not have permission to delete this post',
      );
    }

    await this.prisma.blogPost.delete({
      where: { id },
    });

    return { message: 'Blog post deleted successfully' };
  }
}
