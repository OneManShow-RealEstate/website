import { Check, House, RefreshCw } from "lucide-react";

import { AppScreen } from "@/components/app-screen";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { properties } from "@/content/home";

export function Properties() {
  const { screen } = properties;

  return (
    <section id="properties" className="border-y bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeader title={properties.title} text={properties.text} />

        <div className="mt-12 grid items-center gap-4 lg:grid-cols-12 lg:gap-0">
          {/* Sources: first in the DOM, so on the right in RTL */}
          <Reveal className="lg:col-span-2">
            <ul className="flex justify-center gap-3 lg:flex-col lg:items-end">
              {properties.sources.map((source) => (
                <li
                  key={source}
                  className="rounded-2xl border bg-card px-6 py-3 font-heading text-lg font-bold shadow-sm transition duration-300 hover:border-primary/30 hover:shadow-md motion-safe:hover:-translate-y-1"
                >
                  {source}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Sync line: a house travels from the sources to the app (down on mobile, sideways on desktop) */}
          <div aria-hidden="true" className="relative mx-auto h-20 w-10 lg:col-span-2 lg:mx-0 lg:h-10 lg:w-full">
            <span className="absolute inset-y-0 start-1/2 border-s-2 border-dashed border-primary/30 lg:inset-x-3 lg:inset-y-auto lg:top-1/2 lg:border-s-0 lg:border-t-2" />
            <span className="absolute inset-0 motion-safe:animate-[travel-y_2.6s_ease-in-out_infinite] lg:motion-safe:animate-[travel-x_2.6s_ease-in-out_infinite]">
              <span className="absolute inset-x-0 top-0 mx-auto flex size-8 items-center justify-center rounded-lg border bg-card text-primary shadow-sm lg:inset-x-auto lg:start-0 lg:top-1/2 lg:mx-0 lg:-translate-y-1/2">
                <House className="size-4" />
              </span>
            </span>
          </div>

          <Reveal delay={150} className="min-w-0 lg:col-span-8">
            <AppScreen
              active="properties"
              title={screen.title}
              label={screen.label}
              badge={
                <span className="flex items-center gap-1.5 rounded-full bg-highlight/25 px-3 py-1 text-xs font-semibold text-highlight-foreground">
                  <RefreshCw className="size-3.5 motion-safe:animate-[spin_3s_linear_infinite]" />
                  {screen.badge}
                </span>
              }
            >
              <div className="mb-3 flex gap-1 text-sm">
                {screen.tabs.map((tab, i) => (
                  <span
                    key={tab}
                    className={
                      i === 0
                        ? "rounded-full bg-primary px-3 py-1 font-semibold text-primary-foreground"
                        : "rounded-full px-3 py-1 text-muted-foreground"
                    }
                  >
                    {tab}
                  </span>
                ))}
              </div>
              <ul className="space-y-2">
                {screen.items.map((item, i) => {
                  const isNew = i === screen.items.length - 1;
                  return (
                    <li
                      key={item.address}
                      className={`flex items-center gap-3 rounded-xl border bg-background p-3 transition duration-300 hover:bg-card hover:shadow-md ${isNew ? "item-arrive" : ""}`}
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                        <House className="size-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 font-semibold">
                          <span className="truncate">{item.address}</span>
                          {isNew && (
                            <span className="shrink-0 rounded-full bg-highlight px-2 text-xs text-highlight-foreground">
                              {screen.newLabel}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{item.detail}</div>
                      </div>
                      <span className="hidden shrink-0 rounded-full border px-2 py-0.5 text-xs text-muted-foreground sm:inline">
                        {item.source}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </AppScreen>
          </Reveal>
        </div>

        <ul className="mt-14 flex flex-wrap justify-center gap-3">
          {properties.highlights.map((highlight, i) => (
            <li key={highlight}>
              <Reveal delay={i * 120}>
                <span className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium shadow-xs">
                  <span className="flex size-5 items-center justify-center rounded-full bg-highlight text-highlight-foreground">
                    <Check className="size-3" aria-hidden="true" />
                  </span>
                  {highlight}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
