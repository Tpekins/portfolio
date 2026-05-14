/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateProjectDto,
  UpdateProjectDto,
  ProjectQueryDto,
} from './dto/project.dto';
import { Prisma } from '@generated';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all projects with pagination and filters (public - all)
   */
  async findAll(query: ProjectQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.ProjectWhereInput = {};

    if (query.featured !== undefined) {
      where.featured = query.featured;
    }

    const [projects, total] = await Promise.all([
      this.prisma.project.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          technologies: true,
          thumbnail: true,
          demoUrl: true,
          gitUrl: true,
          featured: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      this.prisma.project.count({ where }),
    ]);

    return {
      data: projects,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get single project by ID or slug (public)
   */
  async findOne(idOrSlug: string) {
    const project = await this.prisma.project.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
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

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  /**
   * Create new project (admin only)
   */
  async create(createProjectDto: CreateProjectDto, userId: string) {
    // Check if slug is unique
    const existingSlug = await this.prisma.project.findUnique({
      where: { slug: createProjectDto.slug },
    });

    if (existingSlug) {
      throw new BadRequestException('A project with this slug already exists');
    }

    const project = await this.prisma.project.create({
      data: {
        ...createProjectDto,
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

    return project;
  }

  /**
   * Update project (admin only)
   */
  async update(id: string, updateProjectDto: UpdateProjectDto, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (project.authorId !== userId) {
      throw new BadRequestException(
        'You do not have permission to update this project',
      );
    }

    // Check if slug is unique (if changing slug)
    if (updateProjectDto.slug && updateProjectDto.slug !== project.slug) {
      const existingSlug = await this.prisma.project.findUnique({
        where: { slug: updateProjectDto.slug },
      });

      if (existingSlug) {
        throw new BadRequestException(
          'A project with this slug already exists',
        );
      }
    }

    const updatedProject = await this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return updatedProject;
  }

  /**
   * Delete project (admin only)
   */
  async delete(id: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (project.authorId !== userId) {
      throw new BadRequestException(
        'You do not have permission to delete this project',
      );
    }

    await this.prisma.project.delete({
      where: { id },
    });

    return { message: 'Project deleted successfully' };
  }
}
