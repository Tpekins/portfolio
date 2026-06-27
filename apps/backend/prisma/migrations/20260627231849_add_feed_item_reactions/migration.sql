-- CreateTable
CREATE TABLE "feed_item_reactions" (
    "id" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "feedItemId" TEXT NOT NULL,

    CONSTRAINT "feed_item_reactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "feed_item_reactions_feedItemId_visitorId_key" ON "feed_item_reactions"("feedItemId", "visitorId");

-- AddForeignKey
ALTER TABLE "feed_item_reactions" ADD CONSTRAINT "feed_item_reactions_feedItemId_fkey" FOREIGN KEY ("feedItemId") REFERENCES "feed_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
