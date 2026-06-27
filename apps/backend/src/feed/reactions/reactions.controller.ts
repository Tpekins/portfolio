import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReactionsService } from './reactions.service';
import { ToggleReactionDto } from './reactions.dto';

/**
 * ReactionsController — fully public, no auth required.
 * Anyone visiting the site can react; visitor identity is just an
 * anonymous client-generated ID, not a real account.
 */
@ApiTags('reactions')
@Controller('feed/:feedItemId/reactions')
export class ReactionsController {
  constructor(private reactionsService: ReactionsService) {}

  /**
   * Get reaction counts for a feed item, plus the requesting visitor's
   * current reaction (if visitorId is passed as a query param).
   */
  @Get()
  @ApiOperation({ summary: 'Get reaction summary for a feed item' })
  async getSummary(
    @Param('feedItemId') feedItemId: string,
    @Query('visitorId') visitorId?: string,
  ) {
    return this.reactionsService.getSummary(feedItemId, visitorId);
  }

  /**
   * Toggle a visitor's reaction on a feed item (add, switch, or remove).
   */
  @Post()
  @ApiOperation({ summary: 'Toggle a reaction on a feed item' })
  async toggle(
    @Param('feedItemId') feedItemId: string,
    @Body() dto: ToggleReactionDto,
  ) {
    return this.reactionsService.toggle(feedItemId, dto);
  }
}