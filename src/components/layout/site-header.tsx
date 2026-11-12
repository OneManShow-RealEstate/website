import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { hero } from "@/content/home";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Text logo until a real logo exists */}
        <Link href="/" className="text-lg font-bold tracking-tight">
          {siteConfig.name}
        </Link>
        <a href={hero.primaryCta.href} className={buttonVariants()}>
          {hero.primaryCta.label}
        </a>
      </div>
    </header>
  );
}
