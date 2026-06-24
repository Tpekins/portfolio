-- This migration captures changes that were already made manually in Neon
-- (the feed_items table, the likes column on blog_posts, and the authorId FK
-- on feed_items). It will be marked as "applied" without actually running,
-- since these changes already exist in the live database.

-- AlterTable
ALTER TABLE "blog_posts" ADD COLUMN "likes" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "feed_items" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT,
    "description" TEXT,
    "youtubeId" TEXT,
    "photoUrl" TEXT,
    "noteContent" TEXT,
    "eventLocation" TEXT,
    "eventTime" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "feed_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "feed_items" ADD CONSTRAINT "feed_items_authorId_fkey"
    FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;