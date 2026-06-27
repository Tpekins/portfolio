import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsIn } from 'class-validator';

// The curated set of allowed reactions. Adding/removing an emoji here
// requires no database migration — it's enforced purely by validation.
export const ALLOWED_REACTIONS = [
  'heart', // ❤️ appreciate / love
  'clap', // 👏 congrats / proud
  'rocket', // 🚀 impressive / inspiring (career, research)
  'party', // 🎉 celebration
  'flex', // 💪 respect / strength
] as const;

export type ReactionEmoji = (typeof ALLOWED_REACTIONS)[number];

export class ToggleReactionDto {
  @ApiProperty({
    example: 'heart',
    enum: ALLOWED_REACTIONS,
    description: 'Which curated reaction the visitor is toggling',
  })
  @IsString()
  @IsIn(ALLOWED_REACTIONS)
  emoji!: ReactionEmoji;

  @ApiProperty({
    example: 'visitor_8f3a2c1d',
    description:
      'Anonymous visitor ID generated and stored client-side (localStorage). Not a real user account.',
  })
  @IsString()
  visitorId!: string;
}
