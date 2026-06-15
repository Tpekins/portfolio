import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { FeedService } from './feed.service';
import {
  CreateFeedItemDto,
  UpdateFeedItemDto,
  FeedItemQueryDto,
} from './dto/feed.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles, RolesGuard } from '../auth/guards/roles.guard';

/**
 * FeedController handles all HTTP requests for feed items.
 *
 * PUBLIC endpoints (no auth required):
 * - GET /feed          — list all published feed items
 * - GET /feed/:id      — get a single published feed item
 *
 * ADMIN endpoints (JWT + admin role required):
 * - GET /feed/admin/all   — list all items (published + unpublished)
 * - POST /feed            — create a new feed item
 * - PUT /feed/:id         — update an existing feed item
 * - DELETE /feed/:id      — delete a feed item
 */
@ApiTags('feed')
@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  /**
   * Get all published feed items.
   * PUBLIC — anyone can view.
   * Optional query params: type (video|photo|note|event), page, limit.
   */
  @Get()
  @ApiOperation({ summary: 'Get all published feed items' })
  // eslint-disable-next-line prettier/prettier
  @ApiQuery({ name: 'type', required: false, enum: ['video', 'photo', 'note', 'event'] })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, description: 'List of published feed items' })
  async findAll(@Query() query: FeedItemQueryDto) {
    return this.feedService.findAll(query);
  }

  /**
   * Get all feed items for admin dashboard.
   * ADMIN ONLY — requires auth + admin role.
   * Shows both published and unpublished items.
   */
  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all feed items for admin (published and unpublished)',
  })
  async findAllAdmin(@Request() req, @Query() query: FeedItemQueryDto) {
    return this.feedService.findAllAdmin(req.user.id, query);
  }

  /**
   * Get a single published feed item by ID.
   * PUBLIC — anyone can view.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get single feed item by ID' })
  @ApiResponse({ status: 200, description: 'Feed item found' })
  @ApiResponse({ status: 404, description: 'Feed item not found' })
  async findOne(@Param('id') id: string) {
    return this.feedService.findOne(id);
  }

  /**
   * Create a new feed item.
   * ADMIN ONLY — requires auth + admin role.
   *
   * When creating, only fill the fields relevant to the type:
   * - Video: type="video", title, description, youtubeId
   * - Photo: type="photo", title, description, photoUrl
   * - Note:  type="note", noteContent
   * - Event: type="event", title, description, eventLocation, eventTime
   *
   * The date field auto-defaults to now() if not provided.
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new feed item (admin only)' })
  @ApiResponse({ status: 201, description: 'Feed item created' })
  async create(@Body() createFeedItemDto: CreateFeedItemDto, @Request() req) {
    return this.feedService.create(createFeedItemDto, req.user.id);
  }

  /**
   * Update an existing feed item.
   * ADMIN ONLY — only the author can update.
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update feed item (admin only)' })
  @ApiResponse({ status: 200, description: 'Feed item updated' })
  async update(
    @Param('id') id: string,
    @Body() updateFeedItemDto: UpdateFeedItemDto,
    @Request() req,
  ) {
    return this.feedService.update(id, updateFeedItemDto, req.user.id);
  }

  /**
   * Delete a feed item.
   * ADMIN ONLY — only the author can delete.
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete feed item (admin only)' })
  @ApiResponse({ status: 200, description: 'Feed item deleted' })
  async delete(@Param('id') id: string, @Request() req) {
    return this.feedService.delete(id, req.user.id);
  }
}
