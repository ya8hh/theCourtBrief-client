import type { Metadata } from "next";
import { Header, Footer } from "@/components/shell";
import { siteUrl } from "@/lib/cms";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { validMeasurementId } from "@/lib/analytics";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "CourtroomDigest | Supreme Court of India, explained",
    template: "%s | CourtroomDigest",
  },
  applicationName: "CourtroomDigest",
  description:
    "Independent reporting and clear explanations of Supreme Court of India judgments and orders.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const analyticsId = process.env.NODE_ENV === "production" ? validMeasurementId(process.env.GA_MEASUREMENT_ID ?? "G-390ZEXVFWM") : null;
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        {analyticsId && <Analytics measurementId={analyticsId} />}
      </body>
    </html>
  );
}
