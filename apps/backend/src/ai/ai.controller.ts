import {
  Controller,
  Post,
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
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles, RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('ai')
@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  /**
   * Generate blog summary using AI
   */
  @Post('generate-summary')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Generate blog post summary using AI' })
  @ApiResponse({
    status: 200,
    description: 'Generated summary',
    schema: {
      example: {
        summary: 'This is an AI-generated summary of the blog post content.',
      },
    },
  })
  async generateSummary(@Body('content') content: string) {
    const summary = await this.aiService.generateSummary(content);
    return { summary };
  }

  /**
   * Generate blog tags using AI
   */
  @Post('generate-tags')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Generate blog post tags using AI' })
  @ApiResponse({
    status: 200,
    description: 'Generated tags',
    schema: {
      example: {
        tags: [
          'typescript',
          'nestjs',
          'programming',
          'tutorial',
          'web-development',
        ],
      },
    },
  })
  async generateTags(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('maxTags') maxTags?: number,
  ) {
    const tags = await this.aiService.generateTags(title, content, maxTags);
    return { tags };
  }

  /**
   * AI service health check
   */
  @Post('health')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Check AI service status' })
  @ApiResponse({
    status: 200,
    description: 'AI service status',
    schema: {
      example: {
        status: 'ok',
        configured: true,
      },
    },
  })
  async healthCheck() {
    return this.aiService.healthCheck();
  }
}
