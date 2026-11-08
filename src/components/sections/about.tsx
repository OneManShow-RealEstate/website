import { Contact, FileText, LayoutDashboard, Zap } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { about, features } from "@/content/home";

const icons = {
  zap: Zap,
  fileText: FileText,
  contact: Contact,
  layoutDashboard: LayoutDashboard,
};

export function About() {
  return (
    <section id="about" className="border-y bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeader eyebrow={about.eyebrow} title={about.title} text={about.text} />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = icons[feature.icon];
            return (
              <li key={feature.title}>
                <Reveal delay={i * 100} className="h-full">
                  {/* Flip card: hover (mouse), focus (keyboard, or tap on touch screens) turns it over */}
                  <div
                    tabIndex={0}
                    className="group h-52 rounded-2xl outline-none perspective-distant focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <div className="relative size-full transition-transform duration-700 ease-out transform-3d group-hover:-rotate-y-180 group-focus:-rotate-y-180 motion-reduce:transition-none">
                      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border bg-card p-6 text-center shadow-sm backface-hidden">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                          <Icon className="size-6" aria-hidden="true" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                        <span className="mt-2 hidden text-xs text-muted-foreground pointer-coarse:block">
                          הקישו לפרטים
                        </span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-primary p-6 text-center text-primary-foreground shadow-lg backface-hidden rotate-y-180">
                        <p className="leading-relaxed">{feature.text}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
