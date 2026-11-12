import { CalendarClock, Check, House, NotebookPen, UserSearch, X } from "lucide-react";

import { ChatDemo } from "@/components/chat-demo";
import { Reveal } from "@/components/reveal";
import { agent } from "@/content/home";

const icons = {
  calendar: CalendarClock,
  status: UserSearch,
  notes: NotebookPen,
  match: House,
};

export function Agent() {
  const { chat, comparison } = agent;

  return (
    <section id="agent">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
        {/* Chat: first in the DOM, so on the right in RTL */}
        <Reveal>
          <ChatDemo
            name={chat.name}
            status={chat.status}
            typingLabel={chat.typing}
            placeholder={chat.placeholder}
            label={chat.label}
            messages={chat.messages}
          />
        </Reveal>

        <div>
          <Reveal className="text-center lg:text-start">
            <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">{agent.title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">{agent.text}</p>
          </Reveal>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {agent.capabilities.map((capability, i) => {
              const Icon = icons[capability.icon];
              return (
                <li key={capability.title}>
                  <Reveal delay={i * 100} className="h-full">
                    <div className="group flex h-full gap-3 rounded-2xl border bg-card p-4 shadow-sm transition duration-300 hover:border-primary/30 hover:shadow-md motion-safe:hover:-translate-y-1">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground transition duration-300 group-hover:bg-primary group-hover:text-primary-foreground motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-6">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-semibold">{capability.title}</h3>
                        <p className="text-sm text-muted-foreground">{capability.text}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>

          {/* Until now vs. with the agent */}
          <Reveal delay={150} className="mt-6">
            <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
              <div className="grid grid-cols-2 border-b text-sm font-semibold">
                <div className="px-4 py-3 text-muted-foreground">{comparison.manualTitle}</div>
                <div className="bg-primary px-4 py-3 text-primary-foreground">{comparison.agentTitle}</div>
              </div>
              <ul>
                {comparison.rows.map((row) => (
                  <li
                    key={row.agent}
                    className="grid grid-cols-2 border-b text-sm transition-colors last:border-b-0 hover:bg-muted/60"
                  >
                    <div className="flex gap-2 px-4 py-3 text-muted-foreground">
                      <X className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" aria-hidden="true" />
                      <span>
                        <span className="sr-only">{comparison.manualTitle}: </span>
                        {row.manual}
                      </span>
                    </div>
                    <div className="flex gap-2 bg-accent/40 px-4 py-3 font-medium">
                      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-highlight text-highlight-foreground">
                        <Check className="size-3" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="sr-only">{comparison.agentTitle}: </span>
                        {row.agent}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
