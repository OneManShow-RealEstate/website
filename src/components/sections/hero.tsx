import { HeroBeam } from "@/components/hero-beam";
import { buttonVariants } from "@/components/ui/button";
import { hero } from "@/content/home";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="text-center md:text-start">
          <span className="inline-block rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
            {hero.eyebrow}
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-balance md:text-5xl">
            {hero.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
            {hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <a
              href={hero.primaryCta.href}
              className={cn(buttonVariants({ size: "lg" }), "h-12 px-6 text-base")}
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 px-6 text-base"
              )}
            >
              {hero.secondaryCta.label}
            </a>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{hero.note}</p>
        </div>

        <HeroBeam />
      </div>
    </section>
  );
}
