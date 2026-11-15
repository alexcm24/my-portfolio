import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import KitScripts from "@/components/KitScripts";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: `${SITE.name}, software engineer`,
  description: SITE.description,
  openGraph: {
    title: `${SITE.name}, software engineer`,
    description: SITE.description,
    url: SITE.url,
    type: "website",
  },
  // The image itself comes from app/opengraph-image.png
  twitter: { card: "summary_large_image" },
  other: { "site-kind": "software", "page-type": "software" },
};

export const viewport: Viewport = { themeColor: "#f7f9fa", width: "device-width", initialScale: 1, viewportFit: "cover" };

const KIT_CSS = [
  "/assets/system.css",
  "/assets/ui/cards.css",
  "/assets/motion/motion.css",
  "/assets/backgrounds/backgrounds.css",
  "/assets/layout/layout.css",
  "/assets/icons/icon.css",
  "/assets/ui/base.css",
  "/assets/diagrams/diagram.css",
  // the palette and page CSS, last so it reads after the kit
  "/site.css",
];

// the hero's entrance and the moments' safety mark, set before first paint
const BOOT =
  "document.documentElement.classList.add('m-enter','mo-js');" +
  "setTimeout(function(){document.documentElement.classList.add('m-enter-done')},700);" +
  "setTimeout(function(){document.documentElement.classList.add('mo-safe')},2500);";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-type="software"
      data-radius="sharp"
      data-ground="sky"
      data-buttons="arrow"
      data-motion=""
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Reddit+Sans:wght@400..700&family=JetBrains+Mono:wght@400..500&display=swap"
          rel="stylesheet"
        />
        {KIT_CSS.map((href) => (
          // eslint-disable-next-line @next/next/no-css-tags
          <link key={href} rel="stylesheet" href={href} />
        ))}
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
        <link rel="modulepreload" href="/assets/moments/moments.js" />
        <link rel="modulepreload" href="/assets/moments/lib.js" />
      </head>
      <body>
        {children}
        <KitScripts />
        <Analytics />
      </body>
    </html>
  );
}
