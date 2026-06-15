import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Play,
  ImageIcon,
  FileText,
  Calendar,
  X,
  ExternalLink,
  MapPin,
  Clock,
  Search,
} from "lucide-react";
import { getFeedItems, type FeedItem } from "../services/api";

type FeedType = "video" | "photo" | "note" | "event";

const filters: { label: string; value: FeedType | "all" }[] = [
  { label: "ALL", value: "all" },
  { label: "VIDEOS", value: "video" },
  { label: "PHOTOS", value: "photo" },
  { label: "NOTES", value: "note" },
  { label: "EVENTS", value: "event" },
];

const typeConfig: Record<
  FeedType,
  {
    icon: typeof Play;
    label: string;
    badgeClass: string;
    dateClass: string;
    borderClass: string;
  }
> = {
  video: {
    icon: Play,
    label: "VIDEO",
    badgeClass: "border-amber-500 text-amber-600 bg-amber-50",
    dateClass: "text-amber-600",
    borderClass: "border-amber-500",
  },
  photo: {
    icon: ImageIcon,
    label: "PHOTO",
    badgeClass: "border-emerald-600 text-emerald-700 bg-emerald-50",
    dateClass: "text-emerald-700",
    borderClass: "border-emerald-600",
  },
  note: {
    icon: FileText,
    label: "NOTE",
    badgeClass: "border-indigo-500 text-indigo-600 bg-indigo-50",
    dateClass: "text-indigo-600",
    borderClass: "border-indigo-500",
  },
  event: {
    icon: Calendar,
    label: "EVENT",
    badgeClass: "border-rose-500 text-rose-600 bg-rose-50",
    dateClass: "text-rose-600",
    borderClass: "border-rose-500",
  },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    .toUpperCase();
}

function TypeBadge({ type }: { type: FeedType }) {
  const config = typeConfig[type];
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${config.badgeClass}`}
    >
      <Icon size={12} />
      {config.label}
    </span>
  );
}

/* ─── Photo Lightbox ─── */
function PhotoLightbox({
  photoUrl,
  title,
  onClose,
}: {
  photoUrl: string;
  title: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 md:p-12"
    >
      {/* Close button — circled X at extreme top-right edge */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 md:top-6 md:right-6 w-14 h-14 rounded-full bg-white flex items-center justify-center text-black shadow-2xl hover:bg-gray-100 hover:scale-110 transition-all duration-300 z-[70]"
        aria-label="Close"
      >
        <X size={28} strokeWidth={2.5} />
      </button>

      <motion.img
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        src={photoUrl}
        alt={title}
        className="max-w-full max-h-full object-contain rounded-lg"
      />
    </motion.div>
  );
}

/* ─── Feed Item Renderer ─── */
function FeedItemCard({
  item,
  onPhotoClick,
}: {
  item: FeedItem;
  onPhotoClick?: (item: FeedItem) => void;
}) {
  const config = typeConfig[item.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative py-12 md:py-16 border-b border-border-subtle hover:bg-primary/5 transition-colors duration-700"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header row: date + badge | title + desc | arrow */}
        <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-start">
          {/* Left: Date + Badge */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <div className={`text-[10px] font-black uppercase tracking-[0.3em] ${config.dateClass}`}>
              {formatDate(item.date)}
            </div>
            <TypeBadge type={item.type} />
          </div>

          {/* Middle: Content */}
          <div className="md:col-span-8">
            {item.type === "note" ? (
              <div className={`border-l-2 ${config.borderClass} pl-6`}>
                <p className="text-lg md:text-xl text-text-primary italic leading-relaxed font-medium">
                  {item.noteContent}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="section-title !text-2xl md:!text-3xl group-hover:text-primary transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-body text-sm font-medium leading-relaxed">
                  {item.description}
                </p>

                {/* Video: Watch on YouTube */}
                {item.type === "video" && item.youtubeId && (
                  <a
                    href={`https://www.youtube.com/watch?v=${item.youtubeId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-amber-600 opacity-70 hover:opacity-100 transition-opacity mt-1"
                  >
                    <ExternalLink size={10} />
                    WATCH ON YOUTUBE
                  </a>
                )}

                {/* Event: location + time */}
                {item.type === "event" && (
                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    {item.eventLocation && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-text-secondary">
                        <MapPin size={12} className="text-rose-500" />
                        {item.eventLocation}
                      </span>
                    )}
                    {item.eventTime && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-text-secondary">
                        <Clock size={12} className="text-rose-500" />
                        {item.eventTime}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Arrow */}
          <div className="md:col-span-2 flex justify-end items-start pt-2">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-xl shadow-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:scale-110 cursor-pointer">
              <ArrowRight size={22} />
            </div>
          </div>
        </div>

        {/* Inline media for Video */}
        {item.type === "video" && item.youtubeId && (
          <div className="mt-8 md:mt-10 md:pl-[calc(16.666%+3rem)] max-w-3xl">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-black" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${item.youtubeId}`}
                title={item.title}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Inline media for Photo */}
        {item.type === "photo" && item.photoUrl && (
          <div className="mt-8 md:mt-10 md:pl-[calc(16.666%+3rem)] max-w-3xl">
            <div
              className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer group/photo"
              onClick={() => onPhotoClick?.(item)}
            >
              <img
                src={item.photoUrl}
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover/photo:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover/photo:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center text-emerald-600 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-500 scale-75 group-hover/photo:scale-100">
                  <ImageIcon size={28} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Main Feed Page ─── */
export default function Feed() {
  const [activeFilter, setActiveFilter] = useState<FeedType | "all">("all");
  const [search, setSearch] = useState("");
  const [lightboxItem, setLightboxItem] = useState<FeedItem | null>(null);
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch feed items from the backend when the component mounts.
   * This replaces the old empty array with real data from Neon.
   */
  useEffect(() => {
    setLoading(true);
    getFeedItems()
      .then((res) => setFeedItems(res.data))
      .catch(() => setFeedItems([]))
      .finally(() => setLoading(false));
  }, []);

  /**
   * Filter items locally based on:
   * - Active tab (ALL / VIDEOS / PHOTOS / NOTES / EVENTS)
   * - Search text (matches title, description, note content, or type)
   */
  const filteredItems = feedItems.filter((item) => {
    const matchesCategory =
      activeFilter === "all" || item.type === activeFilter;
    const matchesSearch =
      (item.title?.toLowerCase() ?? "").includes(search.toLowerCase()) ||
      (item.description?.toLowerCase() ?? "").includes(search.toLowerCase()) ||
      (item.noteContent?.toLowerCase() ?? "").includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col">
      {/* Feed Hero */}
      <section className="pt-48 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 pb-8 border-b border-border-subtle">
            <div className="space-y-3 max-w-3xl">
              <span className="section-label">Updates & Moments</span>
              <h1 className="heading-hero">The Feed</h1>
            </div>
          </div>

          {/* Filter Tabs + Search */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`text-[10px] font-black uppercase tracking-widest px-8 py-4 rounded-full border transition-all ${
                  activeFilter === f.value
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-text-secondary border-border-subtle hover:border-primary hover:text-primary"
                }`}
              >
                {f.label}
              </button>
            ))}
            <div className="flex-grow md:max-w-xs ml-auto relative">
              <input
                type="text"
                placeholder="Search feed..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-border-subtle rounded-full py-4 px-12 focus:outline-none focus:border-primary text-sm font-medium"
              />
              <Search
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary opacity-40"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feed List */}
      <section className="pb-48 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="py-32 text-center text-text-secondary font-medium opacity-50">
              Loading feed...
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <FeedItemCard
                    key={item.id}
                    item={item}
                    onPhotoClick={setLightboxItem}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-32 text-center text-text-secondary font-medium opacity-50"
                >
                  No items found.
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Photo Lightbox */}
      <AnimatePresence>
        {lightboxItem && lightboxItem.photoUrl && (
          <PhotoLightbox
            photoUrl={lightboxItem.photoUrl}
            title={lightboxItem.title ?? ""}
            onClose={() => setLightboxItem(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
