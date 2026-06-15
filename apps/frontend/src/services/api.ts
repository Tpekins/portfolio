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
 * FeedItem represents a single entry in the feed.
 * Can be a video, photo, note, or event.
 * Not all fields are filled — only the ones relevant to the type.
 */
export type FeedItem = {
  id: string;
  type: "video" | "photo" | "note" | "event";
  date: string;
  title: string | null;
  description: string | null;
  youtubeId: string | null;
  photoUrl: string | null;
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
