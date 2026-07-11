import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { validateEnv } from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { FeedModule } from './feed/feed.module';
import { ProjectsModule } from './projects/projects.module';
import { ContactModule } from './contact/contact.module';
import { CommentsModule } from './comments/comments.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { EmailModule } from './email/email.module';
import { AiModule } from './ai/ai.module';
import { SitemapModule } from './sitemap/sitemap.module';
import { ReactionsModule } from './feed/reactions/reactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    PrismaModule,
    AuthModule,
    BlogModule,
    FeedModule,
    ReactionsModule,
    ProjectsModule,
    ContactModule,
    CommentsModule,
    FileUploadModule,
    EmailModule,
    AiModule,
    SitemapModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
