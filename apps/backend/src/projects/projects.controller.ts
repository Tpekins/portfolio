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
import { ProjectService } from './projects.service';
import {
  CreateProjectDto,
  UpdateProjectDto,
  ProjectQueryDto,
} from './dto/project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles, RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  /**
   * Get all projects (public)
   */
  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiQuery({ name: 'featured', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, description: 'List of projects' })
  async findAll(@Query() query: ProjectQueryDto) {
    return this.projectService.findAll(query);
  }

  /**
   * Get single project by ID or slug (public)
   */
  @Get(':idOrSlug')
  @ApiOperation({ summary: 'Get single project by ID or slug' })
  @ApiResponse({ status: 200, description: 'Project details' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async findOne(@Param('idOrSlug') idOrSlug: string) {
    return this.projectService.findOne(idOrSlug);
  }

  /**
   * Create new project (admin only)
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new project (admin only)' })
  @ApiResponse({ status: 201, description: 'Project created' })
  async create(@Body() createProjectDto: CreateProjectDto, @Request() req) {
    return this.projectService.create(createProjectDto, req.user.id);
  }

  /**
   * Update project (admin only)
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update project (admin only)' })
  @ApiResponse({ status: 200, description: 'Project updated' })
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Request() req,
  ) {
    return this.projectService.update(id, updateProjectDto, req.user.id);
  }

  /**
   * Delete project (admin only)
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete project (admin only)' })
  @ApiResponse({ status: 200, description: 'Project deleted' })
  async delete(@Param('id') id: string, @Request() req) {
    return this.projectService.delete(id, req.user.id);
  }
}
