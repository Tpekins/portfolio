/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppEnv } from '../config/configuration';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private apiKey: string | undefined;

  constructor(private configService: ConfigService<AppEnv>) {
    this.apiKey = this.configService.get<string>('GOOGLE_GENAI_API_KEY');

    if (!this.apiKey) {
      this.logger.warn(
        'Google GenAI API key not configured. Set GOOGLE_GENAI_API_KEY in .env',
      );
    }
  }

  /**
   * Generate summary for blog content
   * Requires GOOGLE_GENAI_API_KEY to be set in environment
   */
  async generateSummary(content: string): Promise<string> {
    if (!this.apiKey) {
      throw new BadRequestException(
        'AI service not configured. Please set GOOGLE_GENAI_API_KEY in environment.',
      );
    }

    if (!content || content.length === 0) {
      throw new BadRequestException(
        'Content is required for summary generation',
      );
    }

    try {
      // TODO: Implement Google GenAI integration
      // This is a placeholder that shows the integration pattern
      const prompt = `Please provide a concise 2-3 sentence summary of the following content:\n\n${content}`;

      this.logger.log('Generating summary for content');

      // Replace this with actual Google GenAI API call
      // For now, return a placeholder
      return `[AI Summary] This content discusses key concepts related to the provided text. To enable AI features, configure GOOGLE_GENAI_API_KEY.`;
    } catch (error) {
      this.logger.error('Failed to generate summary', error);
      throw new BadRequestException('Failed to generate summary');
    }
  }

  /**
   * Generate tags for blog content
   * Requires GOOGLE_GENAI_API_KEY to be set in environment
   */
  async generateTags(
    title: string,
    content: string,
    maxTags: number = 5,
  ): Promise<string[]> {
    if (!this.apiKey) {
      throw new BadRequestException(
        'AI service not configured. Please set GOOGLE_GENAI_API_KEY in environment.',
      );
    }

    if (!title || !content) {
      throw new BadRequestException(
        'Title and content are required for tag generation',
      );
    }

    try {
      const prompt = `Generate ${maxTags} relevant tags for a blog post with the following title and content. Return only the tags as a comma-separated list.\n\nTitle: ${title}\n\nContent: ${content}`;

      this.logger.log('Generating tags for content');

      // TODO: Implement Google GenAI integration
      // For now, return some basic tags based on content analysis
      const basicTags = ['blog', 'content', 'development'];
      return basicTags.slice(0, maxTags);
    } catch (error) {
      this.logger.error('Failed to generate tags', error);
      throw new BadRequestException('Failed to generate tags');
    }
  }

  /**
   * Health check for AI service
   */
  async healthCheck(): Promise<{ status: string; configured: boolean }> {
    return {
      status: 'ok',
      configured: !!this.apiKey,
    };
  }
}
