import type { Metadata, Viewport } from "next";
import { Assistant, Geist_Mono, Rubik } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

// Body text
const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["hebrew", "latin"],
});

// Headings
const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Icons (favicon.ico, icon.svg, apple-icon.png), the share image (opengraph-image.png) and
// the app manifest (manifest.ts) live in src/app, so Next.js adds their <head> tags on its own.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s · ${siteConfig.name}` },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${assistant.variable} ${rubik.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
