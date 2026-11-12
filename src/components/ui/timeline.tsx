"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  content: React.ReactNode;
}

// Based on Aceternity UI Timeline, restyled for the brand: numbered gold/blue markers,
// a line that fills in deep blue with a gold tip as you scroll, and a sticky step number
// that stays under the site header.
export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Track the list height (it changes with viewport width as text wraps)
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setHeight(entry.contentRect.height));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 30%", "end 60%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full" ref={containerRef}>
      <div ref={ref} className="relative mx-auto max-w-6xl px-4 pb-12">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-12 md:gap-10 md:pt-24 first:md:pt-16">
            {/* z-10 keeps it under the sticky site header (z-40) */}
            <div className="sticky top-28 z-10 size-16 shrink-0 self-start">
              <div className="absolute start-0 flex size-16 items-center justify-center rounded-full bg-background">
                <div className="flex size-11 items-center justify-center rounded-full border-2 border-highlight bg-card font-heading text-lg font-bold text-primary shadow-sm">
                  {index + 1}
                </div>
              </div>
            </div>

            <div className="relative w-full ps-4 md:ps-0">
              {item.content}
            </div>
          </div>
        ))}
        {/* Track, plus the part that fills as you scroll */}
        <div
          style={{ height: height + "px" }}
          className="absolute start-12 top-0 w-0.5 overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-border to-transparent to-[99%] mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-0.5 rounded-full bg-linear-to-t from-highlight from-[0%] via-primary via-[12%] to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
