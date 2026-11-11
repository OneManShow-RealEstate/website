"use client";

import { BellRing, CalendarClock, House, MessageCircle, NotebookPen, Users } from "lucide-react";
import { forwardRef, useRef, type ComponentType, type RefObject } from "react";

import { AnimatedBeam } from "@/components/ui/animated-beam";
import { heroBeam } from "@/content/home";

type Task = (typeof heroBeam.right | typeof heroBeam.left)[number];
type Side = "right" | "left";

const icons: Record<Task["icon"], ComponentType<{ className?: string }>> = {
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

const TaskPill = forwardRef<HTMLDivElement, { task: Task }>(({ task }, ref) => {
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
TaskPill.displayName = "TaskPill";

// Everyday tasks on both sides, each connected to the brand in the middle by an animated beam.
export function HeroBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

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
          {heroBeam.right.map((task, i) => (
            <BeamedTask
              key={task.label}
              task={task}
              side="right"
              row={i}
              rows={heroBeam.right.length}
              containerRef={containerRef}
              centerRef={centerRef}
            />
          ))}
        </div>

        <div
          ref={centerRef}
          className="relative z-10 flex size-20 shrink-0 items-center justify-center rounded-full bg-primary p-2 text-center font-heading text-xs leading-tight font-bold text-primary-foreground shadow-lg ring-4 ring-highlight/40 sm:size-24 sm:text-sm"
        >
          {heroBeam.center}
        </div>

        <div className="flex flex-col items-start gap-10">
          {heroBeam.left.map((task, i) => (
            <BeamedTask
              key={task.label}
              task={task}
              side="left"
              row={i}
              rows={heroBeam.left.length}
              containerRef={containerRef}
              centerRef={centerRef}
            />
          ))}
        </div>
      </div>
    </figure>
  );
}

// A task bubble plus its beam to the center. The beam's SVG is absolute, relative to the container.
function BeamedTask({
  task,
  side,
  row,
  rows,
  containerRef,
  centerRef,
}: {
  task: Task;
  side: Side;
  row: number;
  rows: number;
  containerRef: RefObject<HTMLDivElement | null>;
  centerRef: RefObject<HTMLDivElement | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Rows above the middle curve up, rows below curve down (0 for the middle one)
  const middle = (rows - 1) / 2;
  const curvature = (middle - row) * 40;
  // Stagger the flashes across both columns
  const order = side === "right" ? row : rows + row;
  return (
    <>
      <TaskPill ref={ref} task={task} />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={ref}
        toRef={centerRef}
        // Right-side tasks flow leftwards into the center, left-side ones rightwards
        reverse={side === "right"}
        curvature={curvature}
        duration={6}
        delay={order * 0.8}
        repeatDelay={0.5}
        pathColor={PRIMARY}
        pathOpacity={0.15}
        gradientStartColor={GOLD}
        gradientStopColor={GOLD}
      />
    </>
  );
}
