"use client";

import { CalendarCheck, CalendarDays, CheckCheck, Mic, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Message = {
  readonly from: "broker" | "agent";
  readonly time: string;
  readonly text: string;
  readonly card?: { readonly name: string; readonly stage: string; readonly detail: string };
  readonly event?: { readonly title: string; readonly when: string; readonly calendar: string };
};

// WhatsApp-style chat with the agent. When it scrolls into view it plays message by message,
// with a typing indicator before each agent reply. Without JS or with reduced motion it shows
// the whole conversation. Decorative: screen readers get `label` instead.
export function ChatDemo({
  name,
  status,
  typingLabel,
  placeholder,
  label,
  messages,
}: {
  name: string;
  status: string;
  typingLabel: string;
  placeholder: string;
  label: string;
  messages: readonly Message[];
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(messages.length);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setShown(0);
        let t = 500;
        messages.forEach((message, i) => {
          if (message.from === "agent") {
            timers.push(window.setTimeout(() => setTyping(true), t));
            t += 1300;
          }
          timers.push(
            window.setTimeout(() => {
              setTyping(false);
              setShown(i + 1);
            }, t)
          );
          t += message.from === "agent" ? 1400 : 800;
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [messages]);

  return (
    <figure ref={ref} className="mx-auto w-full max-w-md">
      <figcaption className="sr-only">{label}</figcaption>
      <div aria-hidden="true" className="overflow-hidden rounded-[2rem] border-8 border-foreground/90 bg-card shadow-xl">
        {/* Header */}
        <div className="flex items-center gap-3 bg-primary px-4 py-3 text-primary-foreground">
          <span className="flex size-10 items-center justify-center rounded-full bg-highlight text-highlight-foreground">
            <Sparkles className="size-5" />
          </span>
          <div>
            <div className="font-heading font-semibold">{name}</div>
            <div className="text-xs text-primary-foreground/75">{typing ? typingLabel : status}</div>
          </div>
        </div>

        {/* Messages: anchored to the bottom like a real chat */}
        <div className="flex h-[30rem] flex-col justify-end gap-2 overflow-hidden bg-muted p-3 mask-t-from-90%">
          {messages.slice(0, shown).map((message, i) => {
            const fromBroker = message.from === "broker";
            return (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-xs motion-safe:animate-[chat-in_0.35s_ease-out]",
                  fromBroker
                    ? "self-start rounded-ss-sm bg-primary text-primary-foreground"
                    : "self-end rounded-se-sm bg-card"
                )}
              >
                {message.text}
                {message.event && (
                  <div className="mt-2 overflow-hidden rounded-lg border bg-background">
                    <div className="flex gap-2 border-s-4 border-primary p-2">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                        <CalendarDays className="size-5" />
                      </span>
                      <div>
                        <div className="font-semibold">{message.event.title}</div>
                        <div className="text-xs text-muted-foreground">{message.event.when}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 border-t px-2 py-1.5 text-xs font-medium text-primary">
                      <CalendarCheck className="size-3.5" />
                      {message.event.calendar}
                    </div>
                  </div>
                )}
                {message.card && (
                  <div className="mt-2 rounded-lg border bg-background p-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold">{message.card.name}</span>
                      <span className="rounded-full bg-highlight/30 px-2 text-xs font-medium text-highlight-foreground">
                        {message.card.stage}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">{message.card.detail}</div>
                  </div>
                )}
                <div
                  className={cn(
                    "mt-1 flex items-center justify-end gap-1 text-[0.65rem]",
                    fromBroker ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}
                >
                  {message.time}
                  {fromBroker && <CheckCheck className="size-3.5" />}
                </div>
              </div>
            );
          })}

          {typing && (
            <div className="flex gap-1 self-end rounded-2xl rounded-se-sm bg-card px-4 py-3 shadow-xs">
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  className="size-2 animate-bounce rounded-full bg-muted-foreground/60"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2 border-t bg-card p-3">
          <div className="flex-1 rounded-full border bg-background px-4 py-2 text-sm text-muted-foreground">
            {placeholder}
          </div>
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Mic className="size-4" />
          </span>
        </div>
      </div>
    </figure>
  );
}
