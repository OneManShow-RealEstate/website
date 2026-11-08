import { ArrowLeft, FileSpreadsheet, MessageCircle, PhoneIncoming } from "lucide-react";

import { AppScreen } from "@/components/app-screen";
import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { leads } from "@/content/home";

const icons = {
  whatsapp: MessageCircle,
  phone: PhoneIncoming,
  import: FileSpreadsheet,
};

export function Leads() {
  return (
    <section id="leads">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeader title={leads.title} text={leads.text} />

        <div className="mt-12 grid items-center gap-6 lg:grid-cols-12 lg:gap-10">
          {/* Sources: first in the DOM, so on the right in RTL */}
          <ul className="grid gap-4 lg:col-span-4">
            {leads.sources.map((source, i) => {
              const Icon = icons[source.icon];
              return (
                <li key={source.title}>
                  <Reveal delay={i * 120}>
                    <div className="group flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-sm transition duration-300 hover:border-primary/30 hover:shadow-md motion-safe:hover:-translate-y-1">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground transition duration-300 group-hover:bg-primary group-hover:text-primary-foreground motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6">
                        <Icon className="size-6" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold">{source.title}</h3>
                        <p className="text-muted-foreground">{source.text}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>

          <Reveal delay={200} className="min-w-0 lg:col-span-8">
            <AppScreen active="leads" title={leads.board.title} label={leads.board.label}>
              <div className="mb-4 grid grid-cols-3 gap-2">
                {leads.board.stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border bg-background p-3">
                    <div className="font-heading text-2xl font-bold text-primary tabular-nums">
                      <CountUp value={stat.value} />
                    </div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
              {/* Columns scroll sideways inside the screen on small screens */}
              <div className="flex snap-x gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-3 md:overflow-visible">
                {leads.board.columns.map((column, c) => (
                  <div
                    key={column.title}
                    className="min-w-40 shrink-0 snap-start rounded-xl bg-muted p-3 md:min-w-0"
                  >
                    <div className="mb-3 flex items-center justify-between text-sm font-semibold text-primary">
                      {column.title}
                      <span className="rounded-full bg-card px-2 text-xs text-muted-foreground">
                        {column.leads.length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {column.leads.map((lead, l) => {
                        const isNew = c === 0 && l === 0;
                        return (
                          <div
                            key={lead.name}
                            className={`rounded-lg border bg-card p-3 shadow-xs transition duration-300 hover:shadow-md motion-safe:hover:-translate-y-0.5 ${isNew ? "lead-drop" : ""}`}
                          >
                            <div className="flex items-center gap-2 font-semibold">
                              {lead.name}
                              {isNew && (
                                <span className="relative flex size-2">
                                  <span className="absolute inline-flex size-full rounded-full bg-highlight opacity-75 motion-safe:animate-ping" />
                                  <span className="relative inline-flex size-2 rounded-full bg-highlight" />
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">{lead.detail}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </AppScreen>
          </Reveal>
        </div>

        <Reveal className="mt-14 text-center">
          <p className="font-semibold">{leads.flowTitle}</p>
          {/* Steps light up one after another, in a loop (see .flow-step in globals.css) */}
          <ol
            className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-3"
            style={{ "--steps": leads.flow.length } as React.CSSProperties}
          >
            {leads.flow.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                {i > 0 && <ArrowLeft className="size-4 text-highlight" aria-hidden="true" />}
                <span
                  className="flow-step rounded-full border bg-card px-4 py-2 text-sm font-medium shadow-xs"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
