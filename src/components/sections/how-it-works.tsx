import { Check, CheckCheck, QrCode, UserRound } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { buttonVariants } from "@/components/ui/button";
import { Timeline } from "@/components/ui/timeline";
import { howItWorks } from "@/content/home";
import { cn } from "@/lib/utils";

type Step = (typeof howItWorks.steps)[number];

export function HowItWorks() {
  const data = howItWorks.steps.map((step) => ({ content: <StepContent step={step} /> }));

  return (
    <section id="how-it-works">
      <div className="mx-auto max-w-6xl px-4 pt-16 md:pt-24">
        <SectionHeader title={howItWorks.title} text={howItWorks.text} />
      </div>

      <Timeline data={data} />

      <div className="flex justify-center px-4 pb-16 md:pb-24">
        <a href={howItWorks.cta.href} className={cn(buttonVariants({ size: "lg" }), "h-12 px-6 text-base")}>
          {howItWorks.cta.label}
        </a>
      </div>
    </section>
  );
}

function StepContent({ step }: { step: Step }) {
  return (
    <Reveal className="grid items-center gap-6 lg:grid-cols-2 lg:gap-8">
      <div>
        <h4 className="text-2xl font-bold">{step.title}</h4>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{step.text}</p>
        <ul className="mt-4 space-y-2">
          {step.points.map((point) => (
            <li key={point} className="flex items-center gap-2 font-medium">
              <span className="flex size-5 items-center justify-center rounded-full bg-highlight text-highlight-foreground">
                <Check className="size-3" aria-hidden="true" />
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
      <div aria-hidden="true" className="w-full max-w-sm">
        <StepVisual visual={step.visual} />
      </div>
    </Reveal>
  );
}

// Small decorative illustration per step
function StepVisual({ visual }: { visual: Step["visual"] }) {
  switch (visual.kind) {
    case "connect":
      return (
        <div className="flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm">
          <span className="flex size-20 shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-primary/30 text-primary">
            <QrCode className="size-12" />
          </span>
          <div>
            <div className="text-sm text-muted-foreground">{visual.caption}</div>
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-highlight/25 px-3 py-1 text-sm font-semibold text-highlight-foreground">
              <span className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-highlight motion-safe:animate-ping" />
                <span className="relative size-2 rounded-full bg-highlight" />
              </span>
              {visual.status}
            </div>
          </div>
        </div>
      );
    case "message":
      return (
        <div className="flex flex-col gap-2 rounded-2xl border bg-muted p-3 shadow-sm">
          <div className="max-w-[85%] self-start rounded-2xl rounded-ss-sm bg-primary px-3 py-2 text-sm text-primary-foreground">
            {visual.request}
            <CheckCheck className="ms-1 inline size-3.5 opacity-70" />
          </div>
          <div className="max-w-[85%] self-end rounded-2xl rounded-se-sm bg-card px-3 py-2 text-sm">
            {visual.reply}
          </div>
        </div>
      );
    case "card":
      return (
        <div className="rounded-2xl border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <UserRound className="size-5" />
            </span>
            <span className="font-semibold">{visual.name}</span>
            <span className="ms-auto rounded-full bg-highlight/30 px-2 text-xs font-medium text-highlight-foreground">
              {visual.stage}
            </span>
          </div>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            {visual.rows.map((row) => (
              <li key={row}>{row}</li>
            ))}
          </ul>
          <div className="mt-3 border-t pt-2 text-xs font-medium text-primary">{visual.updated}</div>
        </div>
      );
  }
}
