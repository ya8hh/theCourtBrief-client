// Explicit page views avoid duplicate events during client-side navigation.
export type AnalyticsWindow = {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  courtAnalytics?: { id: string; lastPath?: string };
};
export function validMeasurementId(id: string | undefined): string | null {
  const value = id?.trim();
  return value && /^G-[A-Z0-9]{6,20}$/.test(value) ? value : null;
}
export function initializeAnalytics(target: AnalyticsWindow, id: string) {
  if (target.courtAnalytics?.id === id) return;
  target.dataLayer = target.dataLayer || [];
  // Google tag consumes the standard gtag arguments queue.
  // eslint-disable-next-line prefer-rest-params
  target.gtag = function () { target.dataLayer!.push(arguments); };
  target.gtag("js", new Date());
  target.gtag("config", id, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  target.courtAnalytics = { id };
}
export function trackPage(target: AnalyticsWindow, origin: string, pathname: string, title: string, referrer: string) {
  if (!target.gtag || !target.courtAnalytics || target.courtAnalytics.lastPath === pathname) return;
  target.courtAnalytics.lastPath = pathname;
  let cleanReferrer = "";
  try { const url = new URL(referrer); cleanReferrer = url.origin + url.pathname; } catch { /* Direct visit. */ }
  target.gtag("event", "page_view", {
    send_to: target.courtAnalytics.id,
    page_location: origin + pathname,
    page_title: title,
    page_referrer: cleanReferrer,
  });
}
