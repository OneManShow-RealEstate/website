import { buttonVariants } from "@/components/ui/button";
import { hero, heroChat } from "@/content/home";
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

        <ChatMockup />
      </div>
    </section>
  );
}

// Illustrative chat between the broker and the agent.
function ChatMockup() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-sm rounded-3xl border bg-card p-4 shadow-xl"
    >
      <div className="flex items-center gap-3 border-b pb-3">
        <div className="size-9 rounded-full bg-primary" />
        <div>
          <div className="text-sm font-semibold">הסוכן שלך</div>
          <div className="text-xs text-muted-foreground">מחובר</div>
        </div>
      </div>
      <div className="flex flex-col gap-2 pt-4">
        {heroChat.map((message, i) => (
          <div
            key={i}
            className={cn(
              "max-w-[85%] whitespace-pre-line rounded-2xl px-3 py-2 text-sm leading-relaxed",
              message.from === "broker"
                ? "self-start rounded-ss-sm bg-primary text-primary-foreground"
                : "self-end rounded-se-sm bg-muted"
            )}
          >
            {message.text}
          </div>
        ))}
      </div>
    </div>
  );
}
