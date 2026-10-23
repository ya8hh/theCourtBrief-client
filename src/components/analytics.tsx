"use client";
import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { initializeAnalytics, trackPage, type AnalyticsWindow } from "@/lib/analytics";

export function Analytics({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    // Exclude preview deploys, local development and the Netlify alias.
    if (!["courtroomdigest.com", "www.courtroomdigest.com"].includes(globalThis.location.hostname)) return;
    const target = globalThis.window as unknown as AnalyticsWindow;
    initializeAnalytics(target, measurementId);
    trackPage(target, globalThis.location.origin, pathname, globalThis.document.title, globalThis.document.referrer);
    setEnabled(true);
  }, [measurementId, pathname]);
  useEffect(() => {
    if (!enabled) return;
    function onClick(event: MouseEvent) {
      const link = event.target instanceof globalThis.Element ? event.target.closest<HTMLAnchorElement>("a[data-court-source]") : null;
      if (!link) return;
      const target = globalThis.window as unknown as AnalyticsWindow;
      target.gtag?.("event", "court_source_click", {
        send_to: measurementId,
        article_path: globalThis.location.pathname,
        source_host: new URL(link.href).hostname,
      });
    }
    globalThis.document.addEventListener("click", onClick);
    return () => globalThis.document.removeEventListener("click", onClick);
  }, [enabled, measurementId]);
  return enabled ? <Script id="court-ga4" src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" /> : null;
}
