import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactSubmissionDto, ContactQueryDto } from './dto/contact.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all contact submissions (admin only with pagination)
   */
  async findAll(query: ContactQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const where: Prisma.ContactSubmissionWhereInput = {};

    if (query.status) {
      where.status = query.status;
    }

    const [submissions, total] = await Promise.all([
      this.prisma.contactSubmission.findMany({
        where,
        orderBy: { submittedAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.contactSubmission.count({ where }),
    ]);

    return {
      data: submissions,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get single contact submission (admin only)
   */
  async findOne(id: string) {
    const submission = await this.prisma.contactSubmission.findUnique({
      where: { id },
    });

    if (!submission) {
      throw new NotFoundException('Contact submission not found');
    }

    return submission;
  }

  /**
   * Create new contact submission (public)
   */
  async create(createContactSubmissionDto: CreateContactSubmissionDto) {
    const submission = await this.prisma.contactSubmission.create({
      data: {
        ...createContactSubmissionDto,
        status: 'pending',
      },
    });

    // TODO: Send email notification to admin
    return {
      id: submission.id,
      message: 'Thank you for your message. We will get back to you soon.',
    };
  }

  /**
   * Update contact submission status (admin only)
   */
  async updateStatus(id: string, status: string) {
    const validStatuses = ['pending', 'read', 'replied'];

    if (!validStatuses.includes(status)) {
      throw new BadRequestException(
        `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      );
    }

    const submission = await this.prisma.contactSubmission.findUnique({
      where: { id },
    });

    if (!submission) {
      throw new NotFoundException('Contact submission not found');
    }

    const updatedSubmission = await this.prisma.contactSubmission.update({
      where: { id },
      data: { status },
    });

    return updatedSubmission;
  }

  /**
   * Delete contact submission (admin only)
   */
  async delete(id: string) {
    const submission = await this.prisma.contactSubmission.findUnique({
      where: { id },
    });

    if (!submission) {
      throw new NotFoundException('Contact submission not found');
    }

    await this.prisma.contactSubmission.delete({
      where: { id },
    });

    return { message: 'Contact submission deleted successfully' };
  }
}
