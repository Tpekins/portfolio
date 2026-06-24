-- CreateTable
CREATE TABLE "feed_item_photos" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "feedItemId" TEXT NOT NULL,

    CONSTRAINT "feed_item_photos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "feed_item_photos_feedItemId_position_idx" ON "feed_item_photos"("feedItemId", "position");

-- AddForeignKey
ALTER TABLE "feed_item_photos" ADD CONSTRAINT "feed_item_photos_feedItemId_fkey" FOREIGN KEY ("feedItemId") REFERENCES "feed_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
