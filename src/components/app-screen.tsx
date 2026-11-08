import { CalendarDays, Handshake, House, LayoutDashboard, Search, Users } from "lucide-react";

import { appNav } from "@/content/home";
import { cn } from "@/lib/utils";

const icons = {
  dashboard: LayoutDashboard,
  leads: Users,
  properties: House,
  deals: Handshake,
  calendar: CalendarDays,
};

type Page = keyof typeof icons;

// Illustration of the app's screen: top bar, side menu (bottom tabs on mobile) and a content area.
// Decorative: hidden from screen readers, so pass a short text summary in `label` instead.
export function AppScreen({
  active,
  title,
  label,
  badge,
  className,
  children,
}: {
  active: Page;
  title: string;
  label: string;
  badge?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className={cn("overflow-hidden rounded-2xl border bg-card shadow-lg", className)}>
      <figcaption className="sr-only">{label}</figcaption>
      <div aria-hidden="true">
        {/* Top bar */}
        <div className="flex items-center gap-3 border-b bg-muted/60 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-border" />
            <span className="size-2.5 rounded-full bg-border" />
            <span className="size-2.5 rounded-full bg-border" />
          </div>
          <div className="mx-auto flex w-full max-w-60 items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground">
            <Search className="size-3.5" />
            חיפוש לקוח או נכס
          </div>
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-highlight text-xs font-bold text-highlight-foreground">
            מ
          </span>
        </div>

        <div className="flex">
          {/* Side menu: first in the DOM, so on the right in RTL */}
          <nav className="hidden w-40 shrink-0 border-e bg-muted/40 p-3 sm:block">
            <div className="mb-4 px-2 font-heading text-sm font-bold">One Man Show</div>
            <ul className="space-y-1">
              {appNav.map((item) => {
                const Icon = icons[item.page];
                return (
                  <li
                    key={item.page}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm",
                      item.page === active
                        ? "bg-primary font-semibold text-primary-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="min-w-0 flex-1 p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="font-heading text-lg font-semibold">{title}</span>
              {badge}
            </div>
            {children}
          </div>
        </div>

        {/* Bottom tabs on mobile, like the phone app */}
        <ul className="flex justify-around border-t bg-muted/40 py-2 sm:hidden">
          {appNav.map((item) => {
            const Icon = icons[item.page];
            return (
              <li
                key={item.page}
                className={cn(
                  "flex flex-col items-center gap-0.5 text-[0.65rem]",
                  item.page === active ? "font-semibold text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>
    </figure>
  );
}
