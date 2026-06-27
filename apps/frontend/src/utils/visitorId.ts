/**
 * Returns a stable anonymous visitor ID for this browser.
 * Generated once and stored in localStorage — the same visitor will
 * get the same ID back on every future visit from this browser,
 * until they clear their browser data or use a different browser/device.
 *
 * Not tied to any real account or personal info — purely a random
 * string used to prevent the same browser from reacting to the same
 * feed item more than once.
 */
const VISITOR_ID_KEY = "tp_visitor_id";

export function getVisitorId(): string {
  if (typeof window === "undefined") {
    // Safety guard for any server-side rendering context
    return "";
  }

  let id = window.localStorage.getItem(VISITOR_ID_KEY);

  if (!id) {
    id = `visitor_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    window.localStorage.setItem(VISITOR_ID_KEY, id);
  }

  return id;
}