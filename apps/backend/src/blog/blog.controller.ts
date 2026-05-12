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
import { BlogService } from './blog.service';
import {
  CreateBlogPostDto,
  UpdateBlogPostDto,
  BlogPostQueryDto,
} from './dto/blog.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles, RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  /**
   * Get all published blog posts (public)
   */
  @Get()
  @ApiOperation({ summary: 'Get all published blog posts' })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'featured', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, description: 'List of published blog posts' })
  async findAll(@Query() query: BlogPostQueryDto) {
    return this.blogService.findAll(query, '');
  }

  /**
   * Get admin blog posts (requires auth)
   */
  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all blog posts for admin (published and unpublished)',
  })
  async findAllAdmin(@Request() req, @Query() query: BlogPostQueryDto) {
    return this.blogService.findAllAdmin(req.user.id, query);
  }

  /**
   * Get single blog post by ID or slug (public)
   */
  @Get(':idOrSlug')
  @ApiOperation({ summary: 'Get single blog post by ID or slug' })
  @ApiResponse({ status: 200, description: 'Blog post with comments' })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  async findOne(@Param('idOrSlug') idOrSlug: string) {
    return this.blogService.findOne(idOrSlug);
  }

  /**
   * Create new blog post (admin only)
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new blog post (admin only)' })
  @ApiResponse({ status: 201, description: 'Blog post created' })
  async create(@Body() createBlogPostDto: CreateBlogPostDto, @Request() req) {
    return this.blogService.create(createBlogPostDto, req.user.id);
  }

  /**
   * Update blog post (admin only)
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update blog post (admin only)' })
  @ApiResponse({ status: 200, description: 'Blog post updated' })
  async update(
    @Param('id') id: string,
    @Body() updateBlogPostDto: UpdateBlogPostDto,
    @Request() req,
  ) {
    return this.blogService.update(id, updateBlogPostDto, req.user.id);
  }

  /**
   * Delete blog post (admin only)
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete blog post (admin only)' })
  @ApiResponse({ status: 200, description: 'Blog post deleted' })
  async delete(@Param('id') id: string, @Request() req) {
    return this.blogService.delete(id, req.user.id);
  }
}
