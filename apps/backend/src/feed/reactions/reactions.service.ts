import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ToggleReactionDto, ALLOWED_REACTIONS } from './reactions.dto';

/**
 * ReactionsService handles toggling anonymous visitor reactions on feed
 * items (photos, for now). A visitor can have at most one active
 * reaction per feed item:
 *   - tapping a NEW emoji when they had none -> creates it
 *   - tapping the SAME emoji they already picked -> removes it (un-react)
 *   - tapping a DIFFERENT emoji than they had -> switches to the new one
 *     (and counts as a fresh "most recent" action)
 *
 * No login required visitors are identified by a random ID their
 * browser generates and stores in localStorage.
 *
 * `lastReaction` in the summary is whichever emoji was most recently
 * placed (by anyone), so the feed shows a live, varied icon per post
 * instead of a static default falls back to null only when a post
 * has zero active reactions.
 */
@Injectable()
export class ReactionsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get the reaction counts (per emoji) for a feed item, the most
   * recently placed reaction (for the default display icon), and
   * which emoji (if any) the given visitor has currently selected.
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
      select: { emoji: true, visitorId: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });

    const counts: Record<string, number> = {};
    for (const emoji of ALLOWED_REACTIONS) {
      counts[emoji] = 0;
    }
    for (const r of reactions) {
      counts[r.emoji] = (counts[r.emoji] ?? 0) + 1;
    }

    const myReaction = visitorId
      ? (reactions.find((r) => r.visitorId === visitorId)?.emoji ?? null)
      : null;

    // Since we ordered by createdAt desc, the first row (if any) is the
    // most recently placed/updated reaction overall.
    const lastReaction = reactions.length > 0 ? reactions[0].emoji : null;

    return { feedItemId, counts, myReaction, lastReaction };
  }

  /**
   * Toggle a visitor's reaction on a feed item.
   * Returns the updated summary (counts + lastReaction + visitor's state).
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
      // Same emoji tapped again -> remove (un-react)
      await this.prisma.feedItemReaction.delete({
        where: { id: existing.id },
      });
    } else {
      // Different emoji tapped -> switch, and refresh createdAt so this
      // counts as the new "most recent" action for lastReaction purposes
      await this.prisma.feedItemReaction.update({
        where: { id: existing.id },
        data: { emoji: dto.emoji, createdAt: new Date() },
      });
    }

    return this.getSummary(feedItemId, dto.visitorId);
  }
}
