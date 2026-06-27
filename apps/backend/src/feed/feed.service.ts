/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateFeedItemDto,
  UpdateFeedItemDto,
  FeedItemQueryDto,
} from './dto/feed.dto';
import { Prisma } from '../generated/prisma/client';

/**
 * FeedService handles all business logic for feed items
 * (videos, photos, notes, events).
 * Public users can read. Only admin can create, update, or delete.
 *
 * Photos live exclusively in the FeedItemPhoto relation (feed_item_photos
 * table) — there is no more single photoUrl column on FeedItem.
 */
@Injectable()
export class FeedService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all published feed items with optional type filter and pagination.
   * This is a PUBLIC endpoint — anyone can view the feed.
   */
  async findAll(query: FeedItemQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.FeedItemWhereInput = {
      published: true,
    };

    if (query.type) {
      where.type = query.type;
    }

    const [items, total] = await Promise.all([
      this.prisma.feedItem.findMany({
        where,
        orderBy: { date: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          type: true,
          date: true,
          title: true,
          description: true,
          youtubeId: true,
          noteContent: true,
          eventLocation: true,
          eventTime: true,
          published: true,
          createdAt: true,
          photos: {
            orderBy: { position: 'asc' },
            select: { id: true, url: true, position: true },
          },
          author: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      this.prisma.feedItem.count({ where }),
    ]);

    return {
      data: items,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get all feed items for admin dashboard.
   * Shows both published and unpublished items.
   * ADMIN ONLY.
   */
  async findAllAdmin(userId: string, query: FeedItemQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.FeedItemWhereInput = {
      authorId: userId,
    };

    if (query.type) {
      where.type = query.type;
    }

    const [items, total] = await Promise.all([
      this.prisma.feedItem.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          photos: {
            orderBy: { position: 'asc' },
          },
        },
      }),
      this.prisma.feedItem.count({ where }),
    ]);

    return {
      data: items,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get a single feed item by ID.
   * PUBLIC endpoint — anyone can view a published item.
   */
  async findOne(id: string) {
    const item = await this.prisma.feedItem.findFirst({
      where: {
        id,
        published: true,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        photos: {
          orderBy: { position: 'asc' },
        },
      },
    });

    if (!item) {
      throw new NotFoundException('Feed item not found');
    }

    return item;
  }

  /**
   * Get a single feed item by ID for admin.
   * Includes unpublished items.
   * ADMIN ONLY.
   */
  async findOneAdmin(id: string, userId: string) {
    const item = await this.prisma.feedItem.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        photos: {
          orderBy: { position: 'asc' },
        },
      },
    });

    if (!item) {
      throw new NotFoundException('Feed item not found');
    }

    if (item.authorId !== userId) {
      throw new BadRequestException(
        'You do not have permission to access this feed item',
      );
    }

    return item;
  }

  /**
   * Create a new feed item.
   * ADMIN ONLY — requires authentication.
   *
   * Only fills the fields relevant to the type:
   * - Video: type, title, description, youtubeId
   * - Photo: type, title, description, photoUrls (array, any length)
   * - Note: type, noteContent
   * - Event: type, title, description, eventLocation, eventTime
   */
  async create(createFeedItemDto: CreateFeedItemDto, userId: string) {
    const photoUrls = createFeedItemDto.photoUrls ?? [];

    const data: Prisma.FeedItemCreateInput = {
      type: createFeedItemDto.type,
      date: createFeedItemDto.date
        ? new Date(createFeedItemDto.date)
        : new Date(),
      title: createFeedItemDto.title,
      description: createFeedItemDto.description,
      youtubeId: createFeedItemDto.youtubeId,
      noteContent: createFeedItemDto.noteContent,
      eventLocation: createFeedItemDto.eventLocation,
      eventTime: createFeedItemDto.eventTime,
      published: createFeedItemDto.published,
      author: {
        connect: { id: userId },
      },
      photos: {
        create: photoUrls.map((url, index) => ({
          url,
          position: index,
        })),
      },
    };

    const item = await this.prisma.feedItem.create({
      data,
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        photos: {
          orderBy: { position: 'asc' },
        },
      },
    });

    return item;
  }

  /**
   * Update an existing feed item.
   * ADMIN ONLY — only the author can update their own items.
   *
   * If `photoUrls` is provided, it REPLACES all existing photos for
   * this item (delete old rows, create new ones in the given order).
   * If `photoUrls` is omitted, existing photos are left untouched.
   */
  async update(
    id: string,
    updateFeedItemDto: UpdateFeedItemDto,
    userId: string,
  ) {
    const item = await this.prisma.feedItem.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Feed item not found');
    }

    if (item.authorId !== userId) {
      throw new BadRequestException(
        'You do not have permission to update this feed item',
      );
    }

    const { photoUrls, ...rest } = updateFeedItemDto;

    const updatedItem = await this.prisma.feedItem.update({
      where: { id },
      data: {
        ...rest,
        date: updateFeedItemDto.date
          ? new Date(updateFeedItemDto.date)
          : item.date,
        ...(photoUrls
          ? {
              photos: {
                deleteMany: {},
                create: photoUrls.map((url, index) => ({
                  url,
                  position: index,
                })),
              },
            }
          : {}),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        photos: {
          orderBy: { position: 'asc' },
        },
      },
    });

    return updatedItem;
  }

  /**
   * Delete a feed item.
   * ADMIN ONLY — only the author can delete their own items.
   * Photos are deleted automatically via onDelete: Cascade in the schema.
   */
  async delete(id: string, userId: string) {
    const item = await this.prisma.feedItem.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Feed item not found');
    }

    if (item.authorId !== userId) {
      throw new BadRequestException(
        'You do not have permission to delete this feed item',
      );
    }

    await this.prisma.feedItem.delete({
      where: { id },
    });

    return { message: 'Feed item deleted successfully' };
  }
}