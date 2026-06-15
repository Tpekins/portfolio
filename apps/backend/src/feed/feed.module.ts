import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { PrismaModule } from '../prisma/prisma.module';

/**
 * FeedModule bundles the Feed service and controller together.
 * It imports PrismaModule so the FeedService can access the database.
 */
@Module({
  imports: [PrismaModule],
  controllers: [FeedController],
  providers: [FeedService],
  exports: [FeedService],
})
export class FeedModule {}
