const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  externalUrl: string | null;
  content?: string;
  category: string;
  thumbnail: string | null;
  tags: string[];
  featured: boolean;
  publishedAt: string | null;
  createdAt: string;
  likes?: number;
  author: {
    id: string;
    name: string;
  };
  _count?: {
    comments: number;
  };
};

/**
 * FeedPhoto represents a single photo attached to a feed item.
 * A feed item can have any number of these (0, 1, 2, 10...),
 * ordered by `position` (0 = first/cover photo, 1 = second, etc).
 */
export type FeedPhoto = {
  id: string;
  url: string;
  position: number;
};

/**
 * FeedItem represents a single entry in the feed.
 * Can be a video, photo, note, or event.
 * Not all fields are filled — only the ones relevant to the type.
 *
 * Photos live exclusively in the `photos` array — there is no more
 * single photoUrl field.
 */
export type FeedItem = {
  id: string;
  type: "video" | "photo" | "note" | "event";
  date: string;
  title: string | null;
  description: string | null;
  youtubeId: string | null;
  /** Unlimited photos per item, pre-sorted by position (ascending) by the backend */
  photos?: FeedPhoto[];
  noteContent: string | null;
  eventLocation: string | null;
  eventTime: string | null;
  published: boolean;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
};

type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
};

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getBlogPosts(params?: {
  category?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<BlogPost>> {
  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.set("category", params.category);
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  const qs = searchParams.toString();
  return fetchJson<PaginatedResponse<BlogPost>>(
    `${API_URL}/blog${qs ? `?${qs}` : ""}`
  );
}

export async function getBlogPost(
  idOrSlug: string
): Promise<BlogPost> {
  return fetchJson<BlogPost>(`${API_URL}/blog/${idOrSlug}`);
}

/**
 * Fetch all published feed items from the backend.
 * Optional: filter by type (video, photo, note, event) and paginate.
 */
export async function getFeedItems(params?: {
  type?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<FeedItem>> {
  const searchParams = new URLSearchParams();
  if (params?.type) searchParams.set("type", params.type);
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  const qs = searchParams.toString();
  return fetchJson<PaginatedResponse<FeedItem>>(
    `${API_URL}/feed${qs ? `?${qs}` : ""}`
  );
}

// PATCH for apps/frontend/src/services/api.ts
// Add these types and functions — everything else in the file stays
// exactly as it is.

export type ReactionEmoji = "heart" | "clap" | "rocket" | "party" | "flex";

export type ReactionSummary = {
  feedItemId: string;
  counts: Record<ReactionEmoji, number>;
  myReaction: ReactionEmoji | null;
};

/**
 * Get reaction counts for a feed item, plus the current visitor's
 * own reaction (if any).
 */
export async function getReactions(
  feedItemId: string,
  visitorId: string
): Promise<ReactionSummary> {
  return fetchJson<ReactionSummary>(
    `${API_URL}/feed/${feedItemId}/reactions?visitorId=${encodeURIComponent(visitorId)}`
  );
}

/**
 * Toggle a reaction on a feed item for the given visitor.
 * Returns the updated summary.
 */
export async function toggleReaction(
  feedItemId: string,
  visitorId: string,
  emoji: ReactionEmoji
): Promise<ReactionSummary> {
  const res = await fetch(`${API_URL}/feed/${feedItemId}/reactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ visitorId, emoji }),
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}