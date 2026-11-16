import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

// PWA manifest, built from siteConfig. Icons are in public/ (from the logo kit).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "OMS",
    description: siteConfig.description,
    lang: "he",
    dir: "rtl",
    start_url: "/",
    display: "standalone",
    theme_color: siteConfig.themeColor,
    background_color: siteConfig.backgroundColor,
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
