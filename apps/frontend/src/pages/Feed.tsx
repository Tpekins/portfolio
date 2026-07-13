import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  getFeedItems,
  getReactions,
  toggleReaction,
  type FeedItem,
  type ReactionEmoji,
  type ReactionSummary,
} from "../services/api";
import { getVisitorId } from "../utils/visitorId";
import { useTranslation } from "@repo/ui";
import { Helmet } from "react-helmet-async";

type FeedType = "video" | "photo" | "note" | "event";

const filterValues: (FeedType | "all")[] = ["all", "video", "photo", "note", "event"];

const typeConfig: Record<
  FeedType,
  {
    icon: typeof Play;
    badgeClass: string;
    dateClass: string;
    borderClass: string;
  }
> = {
  video: {
    icon: Play,
    badgeClass: "border-amber-500 text-amber-600 bg-amber-50",
    dateClass: "text-amber-600",
    borderClass: "border-amber-500",
  },
  photo: {
    icon: ImageIcon,
    badgeClass: "border-emerald-600 text-emerald-700 bg-emerald-50",
    dateClass: "text-emerald-700",
    borderClass: "border-emerald-600",
  },
  note: {
    icon: FileText,
    badgeClass: "border-indigo-500 text-indigo-600 bg-indigo-50",
    dateClass: "text-indigo-600",
    borderClass: "border-indigo-500",
  },
  event: {
    icon: Calendar,
    badgeClass: "border-rose-500 text-rose-600 bg-rose-50",
    dateClass: "text-rose-600",
    borderClass: "border-rose-500",
  },
};

const typeLabels: Record<FeedType, string> = {
  video: "feed.videos",
  photo: "feed.photos",
  note: "feed.notes",
  event: "feed.events",
};

function formatDate(dateStr: string, locale: string): string {
  return new Date(dateStr)
    .toLocaleDateString(locale, {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    .toUpperCase();
}

function TypeBadge({ type }: { type: FeedType }) {
  const { t } = useTranslation();
  const config = typeConfig[type];
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${config.badgeClass}`}
    >
      <Icon size={12} />
      {t(typeLabels[type])}
    </span>
  );
}

/* ─── Photo Lightbox pages through however many photos the item has ───
   FIX (matching the foundation's FieldLog.tsx lightbox behavior):
   1. Close button was being visually covered by the site navbar. Raised
      the overlay's z-index well above any reasonable navbar z-index, and
      added a scroll-lock on <body> while open so the page underneath can't
      visually bleed through or shift the layout.
   2. Image looked uncentered/cut off at the top because the navbar (fixed,
      outside this component's stacking context) was rendering on top of
      the lightbox and visually eating into the top of the viewport. With
      the stacking fixed, the existing flex-center layout now centers the
      image in the *true* full viewport, exactly like FieldLog's lightbox. */
function PhotoLightbox({
  photos,
  title,
  startIndex = 0,
  onClose,
}: {
  photos: string[];
  title: string;
  startIndex?: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const hasMultiple = photos.length > 1;

  const goPrev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);
  const goNext = () => setIndex((i) => (i + 1) % photos.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    // Lock body scroll while the lightbox is open, and restore it on close.
    // This also stops the underlying page (and its fixed navbar) from
    // visually competing with the overlay while it's open.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos.length]);

  // Rendered via a portal straight onto document.body. This is the real
  // fix: the navbar is `position: fixed` *and* uses `backdrop-blur`, which
  // forces the browser to composite it on its own layer in that setup, a
  // higher z-index on a normally-nested element isn't reliably enough to
  // paint above it. Mounting the lightbox as a direct sibling of <nav> on
  // <body> sidesteps that entirely; it's no longer nested under anything
  // the navbar could ever render on top of.
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // z-[9999]: deliberately set above any reasonable site navbar z-index
      // (the previous z-[60] was being out-ranked by the navbar's own
      // stacking context, which is what caused both the missing close
      // button and the off-center image).
      className="fixed inset-0 z-[9999] bg-black/88 flex items-center justify-center p-3 md:p-8"
      onClick={onClose}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="fixed top-4 right-4 md:top-6 md:right-6 w-14 h-14 rounded-full bg-white flex items-center justify-center text-black shadow-2xl hover:bg-gray-100 hover:scale-110 transition-all duration-300 z-[10000]"
        aria-label="Close"
      >
        <X size={28} strokeWidth={2.5} />
      </button>

      {hasMultiple && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white flex items-center justify-center text-black shadow-2xl hover:bg-gray-100 hover:scale-110 transition-all duration-300 z-[10000]"
            aria-label="Previous photo"
          >
            <ChevronLeft size={28} strokeWidth={2.5} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white flex items-center justify-center text-black shadow-2xl hover:bg-gray-100 hover:scale-110 transition-all duration-300 z-[10000]"
            aria-label="Next photo"
          >
            <ChevronRight size={28} strokeWidth={2.5} />
          </button>

          <div className="fixed top-4 left-4 md:top-6 md:left-6 px-4 py-2 rounded-full bg-white/90 text-black text-xs font-black tracking-widest z-[10000]">
            {index + 1} / {photos.length}
          </div>
        </>
      )}

      <motion.img
        key={index}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        src={photos[index]}
        alt={title}
        className="max-w-[92vw] max-h-[88vh] w-auto h-auto object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />

      {hasMultiple && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-[10000] max-w-[90vw] overflow-x-auto px-2"
          onClick={(e) => e.stopPropagation()}
        >
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all ${
                i === index ? "bg-white" : "bg-white/40"
              }`}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>,
    document.body
  );
}

/* ─── Fixed-size photo box: every photo, regardless of source dimensions,
       fills this exact 16:9 box and gets cropped via object-cover. ─── */
function PhotoBox({
  src,
  alt,
  onClick,
  overlayCount,
}: {
  src: string;
  alt: string;
  onClick?: () => void;
  overlayCount?: number;
}) {
  return (
    <div
      className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl cursor-pointer group/photo bg-[#e8e8e2]"
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/photo:scale-105"
      />
      {overlayCount ? (
        <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
          <span className="text-white text-2xl font-black">+{overlayCount}</span>
        </div>
      ) : (
        <div className="absolute inset-0 bg-black/0 group-hover/photo:bg-black/20 transition-colors duration-500 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center text-emerald-600 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-500 scale-75 group-hover/photo:scale-100">
            <ImageIcon size={28} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Photo grid: lays out 1..N photos as fixed-size boxes. ─── */
function PhotoGrid({
  photos,
  title,
  onPhotoClick,
}: {
  photos: { id: string; url: string }[];
  title: string;
  onPhotoClick: (startIndex: number) => void;
}) {
  const count = photos.length;

  if (count === 1) {
    return <PhotoBox src={photos[0].url} alt={title} onClick={() => onPhotoClick(0)} />;
  }

  if (count === 2) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {photos.map((p, i) => (
          <PhotoBox key={p.id} src={p.url} alt={title} onClick={() => onPhotoClick(i)} />
        ))}
      </div>
    );
  }

  if (count === 3) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {photos.map((p, i) => (
          <PhotoBox key={p.id} src={p.url} alt={title} onClick={() => onPhotoClick(i)} />
        ))}
      </div>
    );
  }

  const visible = photos.slice(0, 4);
  const extra = count - 4;

  return (
    <div className="grid grid-cols-2 gap-4">
      {visible.map((p, i) => (
        <PhotoBox
          key={p.id}
          src={p.url}
          alt={title}
          onClick={() => onPhotoClick(i)}
          overlayCount={i === 3 && extra > 0 ? extra : undefined}
        />
      ))}
    </div>
  );
}

/* ─── Event meta: location + time. Shown for ANY item type, whenever
       the data is actually filled in. ─── */
function EventMeta({ item }: { item: FeedItem }) {
  if (!item.eventLocation && !item.eventTime) return null;

  return (
    <div className="flex flex-col gap-1.5">
      {item.eventLocation && (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#333333]">
          <MapPin size={12} className="text-rose-500 flex-shrink-0" />
          {item.eventLocation}
        </span>
      )}
      {item.eventTime && (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#333333]">
          <Clock size={12} className="text-rose-500 flex-shrink-0" />
          {item.eventTime}
        </span>
      )}
    </div>
  );
}

/* ─── Reaction Bar: curated emoji picker for photo posts.
       Anonymous per-browser tracking via visitorId no login needed.
       Tap to react, tap the same emoji again to un-react, tap a
       different emoji to switch. ─── */
const REACTION_EMOJI_MAP: Record<ReactionEmoji, string> = {
  heart: "❤️",
  clap: "👏",
  rocket: "🚀",
  party: "🎉",
  flex: "💪",
};

const REACTION_ORDER: ReactionEmoji[] = ["heart", "clap", "rocket", "party", "flex"];

function ReactionBar({
  feedItemId,
  minimal = false,
  revealOnGroupHover = false,
}: {
  feedItemId: string;
  minimal?: boolean;
  revealOnGroupHover?: boolean;
}) {
  const [summary, setSummary] = useState<ReactionSummary | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const visitorId = getVisitorId();
    getReactions(feedItemId, visitorId)
      .then(setSummary)
      .catch(() => setSummary(null));
  }, [feedItemId]);

  const handlePick = async (emoji: ReactionEmoji) => {
    if (loading) return;
    setLoading(true);
    setOpen(false);
    try {
      const visitorId = getVisitorId();
      const updated = await toggleReaction(feedItemId, visitorId, emoji);
      setSummary(updated);
    } catch {
      // Silently ignore UI just won't update if the request fails
    } finally {
      setLoading(false);
    }
  };

  const totalCount = summary
    ? Object.values(summary.counts).reduce((a, b) => a + b, 0)
    : 0;

  const myEmoji = summary?.myReaction ?? null;
  const displayEmoji = myEmoji ?? summary?.lastReaction ?? null;

  // CRITICAL: this is the line that makes hover-based reveal actually work.
  // When revealOnGroupHover is true, the bar is opacity-0 by default and
  // ONLY becomes visible when the ancestor `group/grid` is hovered (or
  // while the picker is open, so it can't vanish mid-click).
  const visibilityClass = revealOnGroupHover
    ? `transition-opacity duration-200 ${
        open ? "opacity-100" : "opacity-0 group-hover/grid:opacity-100"
      }`
    : "";

  return (
    <div className={`relative inline-flex items-center gap-2 ${visibilityClass}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        disabled={loading}
        className={
          minimal
            ? `inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-bold transition-all ${
                myEmoji ? "text-[#2e7d32]" : "text-[#999999] hover:text-[#2e7d32]"
              }`
            : `inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-bold shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
                myEmoji
                  ? "bg-[#2e7d32]/10 border-[#2e7d32] text-[#2e7d32]"
                  : "bg-white border-[#d4d4cc] text-[#333333] hover:border-[#2e7d32]"
              }`
        }
      >
        <span className="text-sm leading-none">
          {displayEmoji ? REACTION_EMOJI_MAP[displayEmoji] : "🤍"}
        </span>
        {totalCount > 0 && <span>{totalCount}</span>}
      </button>

      {open && (
        <div className="absolute bottom-full left-0 mb-2 flex items-center gap-1 bg-white rounded-full shadow-xl border border-[#eeeeee] px-2 py-1.5 z-10">
          {REACTION_ORDER.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => handlePick(emoji)}
              className={`text-xl w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-125 ${
                myEmoji === emoji ? "bg-[#2e7d32]/10" : ""
              }`}
              aria-label={emoji}
            >
              {REACTION_EMOJI_MAP[emoji]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Feed Item Renderer ─── */
function FeedItemCard({
  item,
  onPhotoClick,
}: {
  item: FeedItem;
  onPhotoClick?: (item: FeedItem, startIndex: number) => void;
}) {
  const { t, locale } = useTranslation();
  const config = typeConfig[item.type];
  const photos = item.photos ?? [];
  const hasPhotos = photos.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group group/grid relative py-12 md:py-16 border-b border-[#eeeeee] hover:bg-[#2e7d32]/5 transition-colors duration-700"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header row: date + badge + location/time | title + desc | arrow */}
        <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-start">
          {/* Left: Date + Badge + Location/Time same slot for every type */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <div className={`text-[10px] font-black uppercase tracking-[0.3em] ${config.dateClass}`}>
              {formatDate(item.date, locale)}
            </div>
            <TypeBadge type={item.type} />
            <EventMeta item={item} />
          </div>

          {/* Middle: Content */}
          <div className="md:col-span-8">
            {item.type === "note" ? (
              <div className={`border-l-2 ${config.borderClass} pl-6`}>
                <p className="text-lg md:text-xl text-[#1a1a1c] italic leading-relaxed font-medium">
                  {item.noteContent}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="section-title !text-2xl md:!text-3xl group-hover:text-[#2e7d32] transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-[#333333] text-sm font-medium leading-relaxed">
                  {item.description}
                </p>

                {item.type === "video" && item.youtubeId && (
                  <a
                    href={`https://www.youtube.com/watch?v=${item.youtubeId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-amber-600 hover:opacity-80 transition-opacity mt-1"
                  >
                    <ExternalLink size={10} />
                    {t("feed.watchOnYouTube")}
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Right: Arrow */}
          <div className="md:col-span-2 flex justify-end items-start pt-2">
            {item.type === "video" && item.youtubeId ? (
              <a
                href={`https://www.youtube.com/watch?v=${item.youtubeId}`}
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 rounded-2xl bg-white shadow-xl shadow-[#2e7d32]/10 flex items-center justify-center text-[#2e7d32] hover:bg-[#2e7d32] hover:text-white transition-all duration-500 hover:scale-110"
                aria-label="Watch on YouTube"
              >
                <ArrowRight size={22} />
              </a>
            ) : hasPhotos ? (
              <button
                onClick={() => onPhotoClick?.(item, 0)}
                className="w-14 h-14 rounded-2xl bg-white shadow-xl shadow-[#2e7d32]/10 flex items-center justify-center text-[#2e7d32] hover:bg-[#2e7d32] hover:text-white transition-all duration-500 hover:scale-110"
                aria-label="View photo"
              >
                <ArrowRight size={22} />
              </button>
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-white shadow-xl shadow-[#2e7d32]/10 flex items-center justify-center text-[#2e7d32] group-hover:bg-[#2e7d32] group-hover:text-white transition-all duration-500 group-hover:scale-110">
                <ArrowRight size={22} />
              </div>
            )}
          </div>
        </div>

        {/* Inline media for Video */}
        {item.type === "video" && item.youtubeId && (
          <div className="mt-8 md:mt-10 md:pl-[calc(16.666%+3rem)] max-w-3xl">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-black aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${item.youtubeId}`}
                title={item.title ?? ""}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Inline media for Photos reaction bar hidden by default,
            fades in on hovering anywhere over the card (group/grid). */}
        {hasPhotos && (
          <div className="mt-8 md:mt-10 md:pl-[calc(16.666%+3rem)] max-w-3xl">
            <PhotoGrid
              photos={photos}
              title={item.title ?? ""}
              onPhotoClick={(startIndex) => onPhotoClick?.(item, startIndex)}
            />
            <div className="mt-3">
              <ReactionBar feedItemId={item.id} revealOnGroupHover />
            </div>
          </div>
        )}

        {/* Notes: same hover-the-card reveal as photos. Hidden by default,
            fades in on hovering anywhere over this note's card area. */}
        {item.type === "note" && (
          <div className="mt-4 md:pl-[calc(16.666%+3rem)]">
            <ReactionBar feedItemId={item.id} revealOnGroupHover />
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Main Feed Page ─── */
export default function Feed() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<FeedType | "all">("all");
  const [search, setSearch] = useState("");
  const [lightbox, setLightbox] = useState<{ item: FeedItem; startIndex: number } | null>(null);
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  const filterLabels: Record<FeedType | "all", string> = {
    all: t("feed.all"),
    video: t("feed.videos"),
    photo: t("feed.photos"),
    note: t("feed.notes"),
    event: t("feed.events"),
  };

  useEffect(() => {
    getFeedItems()
      .then((res) => setFeedItems(res.data))
      .catch(() => setFeedItems([]))
      .finally(() => setLoading(false));
  }, []);

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

  const lightboxPhotoUrls = lightbox ? (lightbox.item.photos ?? []).map((p) => p.url) : [];

  return (
    <div className="flex flex-col bg-[#f5f5f0]">
      <Helmet>
        <title>Feed | Tiani Pekins Ebika Updates & Activities</title>
        <meta name="description" content="Stay updated with Tiani Pekins Ebika's latest activities, videos, photos, notes, and events. Follow along with projects and community work." />
        <meta name="keywords" content="Tiani Pekins Ebika, feed, updates, videos, photos, notes, events, activities, Cameroon" />
        <link rel="canonical" href="https://tianipekins.com/feed" />
        <meta property="og:title" content="Feed | Tiani Pekins Ebika Updates & Activities" />
        <meta property="og:description" content="Stay updated with Tiani Pekins Ebika's latest activities, videos, photos, notes, and events." />
        <meta property="og:url" content="https://tianipekins.com/feed" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://tianipekins.com/og-image.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Feed | Tiani Pekins Ebika Updates & Activities" />
        <meta name="twitter:description" content="Stay updated with Tiani Pekins Ebika's latest activities, videos, photos, notes, and events." />
        <meta name="twitter:image" content="https://tianipekins.com/og-image.svg" />
      </Helmet>

      <section className="pt-48 pb-24 px-6 bg-[#f5f5f0]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 pb-8 border-b border-[#eeeeee]">
            <div className="space-y-3 max-w-3xl">
              <span className="section-label">{t("feed.updates")}</span>
              <h1 className="heading-hero">{t("feed.theFeed")}</h1>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-[#333333] font-medium max-w-xs">
                {t("feed.captured")}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            {filterValues.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-[10px] font-black uppercase tracking-widest px-8 py-4 rounded-full border transition-all ${
                  activeFilter === f
                    ? "bg-[#2e7d32] text-white border-[#2e7d32]"
                    : "bg-white text-[#333333] border-[#eeeeee] hover:border-[#2e7d32] hover:text-[#2e7d32]"
                }`}
              >
                {filterLabels[f]}
              </button>
            ))}
            <div className="flex-grow md:max-w-xs ml-auto relative">
              <input
                type="text"
                placeholder={t("feed.search")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-[#eeeeee] rounded-full py-4 px-12 focus:outline-none focus:border-[#2e7d32] text-sm font-medium"
              />
              <Search
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-[#333333] opacity-40"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-48 px-6">
        <div className="max-w-7xl mx-auto">
            {loading ? (
            <div className="py-32 text-center text-[#333333] font-medium">
              {t("feed.loading")}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <FeedItemCard
                    key={item.id}
                    item={item}
                    onPhotoClick={(it, startIndex) => setLightbox({ item: it, startIndex })}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-32 text-center text-[#333333] font-medium"
                >
                  {t("feed.noItems")}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightbox && lightboxPhotoUrls.length > 0 && (
          <PhotoLightbox
            photos={lightboxPhotoUrls}
            title={lightbox.item.title ?? ""}
            startIndex={lightbox.startIndex}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
