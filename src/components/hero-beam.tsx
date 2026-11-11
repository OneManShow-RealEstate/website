"use client";

import { BellRing, CalendarClock, House, MessageCircle, NotebookPen, Users } from "lucide-react";
import { forwardRef, useRef, type ComponentType, type RefObject } from "react";

import { AnimatedBeam } from "@/components/ui/animated-beam";
import { heroBeam } from "@/content/home";

const icons: Record<(typeof heroBeam.tasks)[number]["icon"], ComponentType<{ className?: string }>> = {
  calendar: CalendarClock,
  clients: Users,
  inquiries: MessageCircle,
  properties: House,
  reminders: BellRing,
  notes: NotebookPen,
};

// Brand tokens from globals.css: deep blue lines, gold flash
const PRIMARY = "var(--primary)";
const GOLD = "var(--highlight)";

const Task = forwardRef<HTMLDivElement, { task: (typeof heroBeam.tasks)[number] }>(({ task }, ref) => {
  const Icon = icons[task.icon];
  return (
    <div
      ref={ref}
      className="relative z-10 flex items-center gap-2 rounded-2xl border bg-card px-2.5 py-2 text-xs font-semibold shadow-sm sm:px-3 sm:text-sm"
    >
      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground sm:size-8">
        <Icon className="size-4" />
      </span>
      {task.label}
    </div>
  );
});
Task.displayName = "Task";

// Everyday tasks on both sides, each connected to the brand in the middle by an animated beam.
export function HeroBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const right = heroBeam.tasks.slice(0, 3);
  const left = heroBeam.tasks.slice(3);

  return (
    <figure className="mx-auto w-full max-w-md">
      <figcaption className="sr-only">{heroBeam.label}</figcaption>
      <div
        ref={containerRef}
        aria-hidden="true"
        className="relative flex items-center justify-between gap-2 py-4"
      >
        {/* First in the DOM, so on the right in RTL */}
        <div className="flex flex-col items-end gap-10">
          {right.map((task, i) => (
            <BeamedTask key={task.label} task={task} index={i} containerRef={containerRef} centerRef={centerRef} />
          ))}
        </div>

        <div
          ref={centerRef}
          className="relative z-10 flex size-20 shrink-0 items-center justify-center rounded-full bg-primary p-2 text-center font-heading text-xs leading-tight font-bold text-primary-foreground shadow-lg ring-4 ring-highlight/40 sm:size-24 sm:text-sm"
        >
          {heroBeam.center}
        </div>

        <div className="flex flex-col items-start gap-10">
          {left.map((task, i) => (
            <BeamedTask key={task.label} task={task} index={i + 3} containerRef={containerRef} centerRef={centerRef} />
          ))}
        </div>
      </div>
    </figure>
  );
}

// A task bubble plus its beam to the center. The beam's SVG is absolute, relative to the container.
function BeamedTask({
  task,
  index,
  containerRef,
  centerRef,
}: {
  task: (typeof heroBeam.tasks)[number];
  index: number;
  containerRef: RefObject<HTMLDivElement | null>;
  centerRef: RefObject<HTMLDivElement | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
      <Task ref={ref} task={task} />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={ref}
        toRef={centerRef}
        // Right-side tasks flow leftwards into the center, left-side ones rightwards
        reverse={index < 3}
        curvature={[40, 0, -40][index % 3]}
        duration={6}
        delay={index * 0.8}
        repeatDelay={0.5}
        pathColor={PRIMARY}
        pathOpacity={0.15}
        gradientStartColor={GOLD}
        gradientStopColor={GOLD}
      />
    </>
  );
}
