import {
  Building2,
  Clock,
  Handshake,
  LayoutDashboard,
  MapPin,
  ShieldCheck,
  UserRound,
  Users,
  Wallet,
  Zap,
} from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { audience } from "@/content/home";

const icons = {
  independent: UserRound,
  office: Building2,
  zap: Zap,
  field: MapPin,
  wallet: Wallet,
  time: Clock,
  shared: Users,
  overview: LayoutDashboard,
  handoff: Handshake,
  quality: ShieldCheck,
};

type Tab = (typeof audience.tabs)[number];

export function Audience() {
  return (
    <section id="audience" className="border-y bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeader title={audience.title} text={audience.text} />

        <Reveal className="mt-10">
          <Tabs defaultValue={audience.tabs[0].value} className="items-center gap-8">
            {/* Big, clearly separate options, so it's obvious there is more than one type */}
            <TabsList className="h-auto w-full max-w-xl gap-1.5 rounded-2xl border bg-card p-1.5 shadow-sm group-data-horizontal/tabs:h-auto">
              {audience.tabs.map((tab) => {
                const Icon = icons[tab.icon];
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="group/trigger h-auto flex-col justify-start gap-2 rounded-xl px-2 py-3 text-center whitespace-normal sm:flex-row sm:gap-3 sm:px-4 sm:text-start text-foreground transition duration-300 not-data-active:hover:bg-muted data-active:bg-primary data-active:text-primary-foreground data-active:shadow-md data-active:hover:bg-primary data-active:hover:text-primary-foreground"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors group-data-active/trigger:bg-highlight group-data-active/trigger:text-highlight-foreground">
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className="block font-heading text-base font-bold">{tab.label}</span>
                      <span className="block text-xs text-muted-foreground group-data-active/trigger:text-primary-foreground/75 sm:text-sm">
                        {tab.sub}
                      </span>
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {audience.tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="w-full text-base motion-safe:animate-[chat-in_0.4s_ease-out]"
              >
                <Panel tab={tab} />
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
      </div>
    </section>
  );
}

function Panel({ tab }: { tab: Tab }) {
  return (
    <div className="grid gap-8 rounded-3xl border bg-card p-6 shadow-sm md:p-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <h3 className="text-2xl font-bold text-balance md:text-3xl">{tab.headline}</h3>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">{tab.text}</p>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {tab.benefits.map((benefit) => {
            const Icon = icons[benefit.icon];
            return (
              <li key={benefit.title} className="flex gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h4 className="font-semibold">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="self-center lg:col-span-5">
        <Summary summary={tab.summary} />
      </div>
    </div>
  );
}

// Decorative "today" card: daily stats for an independent broker, a team overview for an office
function Summary({ summary }: { summary: Tab["summary"] }) {
  return (
    <div aria-hidden="true" className="rounded-2xl border bg-background p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="font-heading font-semibold">{summary.title}</span>
        <span className="relative flex size-2.5">
          <span className="absolute inset-0 rounded-full bg-highlight motion-safe:animate-ping" />
          <span className="relative size-2.5 rounded-full bg-highlight" />
        </span>
      </div>

      {"rows" in summary ? (
        <>
          <ul className="mt-4 grid grid-cols-3 gap-2">
            {summary.rows.map((row) => (
              <li key={row.label} className="rounded-xl bg-card p-3 text-center shadow-xs">
                <div className="font-heading text-3xl font-extrabold text-primary">{row.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{row.label}</div>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-lg bg-highlight/20 px-3 py-2 text-center text-sm font-medium text-highlight-foreground">
            {summary.note}
          </p>
        </>
      ) : (
        <>
          <ul className="mt-4 space-y-2">
            {summary.team.map((member) => (
              <li key={member.name} className="flex items-center gap-3 rounded-xl bg-card p-2.5 shadow-xs">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                  {member.initial}
                </span>
                <span className="font-semibold">{member.name}</span>
                <span className="ms-auto text-end text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{member.clients}</span> {summary.clientsLabel}
                  {" · "}
                  <span className="font-semibold text-foreground">{member.deals}</span> {summary.dealsLabel}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-lg bg-highlight/20 px-3 py-2 text-center text-sm font-medium text-highlight-foreground">
            {summary.pending}
          </p>
        </>
      )}
    </div>
  );
}
