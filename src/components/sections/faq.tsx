import { Check, MessageCircle, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { faq } from "@/content/home";
import { cn } from "@/lib/utils";

export function Faq() {
  return (
    <section id="faq">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
        {/* Side column: first in the DOM, so on the right in RTL; stays in view on desktop */}
        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-28">
            <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
              {faq.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">{faq.text}</p>

            <div className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <ShieldCheck className="size-6" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-bold">{faq.security.title}</h3>
              </div>
              <ul className="mt-5 space-y-3">
                {faq.security.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 font-medium"
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-highlight text-highlight-foreground">
                      <Check className="size-3" aria-hidden="true" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {siteConfig.contact.ready && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="font-medium">{faq.contact.title}</span>
                <a
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-10 gap-2 px-4",
                  )}
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  {faq.contact.label}
                </a>
              </div>
            )}
          </Reveal>
        </div>

        {/* Questions, grouped */}
        <div className="space-y-10 lg:col-span-7">
          {faq.groups.map((group) => (
            <Reveal key={group.title}>
              <h3 className="mb-4 text-sm font-semibold text-primary">
                {group.title}
              </h3>
              <Accordion className="gap-3">
                {group.items.map((item) => (
                  <AccordionItem
                    key={item.q}
                    value={item.q}
                    className="rounded-2xl border bg-card px-5 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <AccordionTrigger className="py-4 text-base font-semibold hover:no-underline **:data-[slot=accordion-trigger-icon]:text-primary">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-base leading-relaxed text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
