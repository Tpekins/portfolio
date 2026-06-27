import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ToggleReactionDto, ALLOWED_REACTIONS } from './reactions.dto';

/**
 * ReactionsService handles toggling anonymous visitor reactions on feed
 * items (photos, for now). A visitor can have at most one active
 * reaction per feed item:
 *   - tapping a NEW emoji when they had none -> creates it
 *   - tapping the SAME emoji they already picked -> removes it (un-react)
 *   - tapping a DIFFERENT emoji than they had -> switches to the new one
 *
 * No login required — visitors are identified by a random ID their
 * browser generates and stores in localStorage.
 */
@Injectable()
export class ReactionsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get the reaction counts (per emoji) for a feed item, plus which
   * emoji (if any) the given visitor has currently selected.
   */
  async getSummary(feedItemId: string, visitorId?: string) {
    const item = await this.prisma.feedItem.findUnique({
      where: { id: feedItemId },
      select: { id: true },
    });

    if (!item) {
      throw new NotFoundException('Feed item not found');
    }

    const reactions = await this.prisma.feedItemReaction.findMany({
      where: { feedItemId },
      select: { emoji: true, visitorId: true },
    });

    const counts: Record<string, number> = {};
    for (const emoji of ALLOWED_REACTIONS) {
      counts[emoji] = 0;
    }
    for (const r of reactions) {
      counts[r.emoji] = (counts[r.emoji] ?? 0) + 1;
    }

    const myReaction = visitorId
      ? reactions.find((r) => r.visitorId === visitorId)?.emoji ?? null
      : null;

    return { feedItemId, counts, myReaction };
  }

  /**
   * Toggle a visitor's reaction on a feed item.
   * Returns the updated summary (counts + the visitor's current state).
   */
  async toggle(feedItemId: string, dto: ToggleReactionDto) {
    const item = await this.prisma.feedItem.findUnique({
      where: { id: feedItemId },
      select: { id: true },
    });

    if (!item) {
      throw new NotFoundException('Feed item not found');
    }

    const existing = await this.prisma.feedItemReaction.findUnique({
      where: {
        feedItemId_visitorId: {
          feedItemId,
          visitorId: dto.visitorId,
        },
      },
    });

    if (!existing) {
      await this.prisma.feedItemReaction.create({
        data: {
          feedItemId,
          visitorId: dto.visitorId,
          emoji: dto.emoji,
        },
      });
    } else if (existing.emoji === dto.emoji) {
      await this.prisma.feedItemReaction.delete({
        where: { id: existing.id },
      });
    } else {
      await this.prisma.feedItemReaction.update({
        where: { id: existing.id },
        data: { emoji: dto.emoji },
      });
    }

    return this.getSummary(feedItemId, dto.visitorId);
  }
}

