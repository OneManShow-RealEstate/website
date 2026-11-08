import type { Metadata } from "next";

import { TokenValue } from "@/components/token-value";
import { buttonVariants } from "@/components/ui/button";

// Internal brand kit: palette and typography. Source of truth for values is globals.css.
export const metadata: Metadata = {
  title: "Style guide",
  robots: { index: false, follow: false },
};

const colors = [
  { name: "כחול עמוק · Primary", token: "--primary", bg: "bg-primary", fg: "text-primary-foreground", usage: "כפתורים ראשיים, קישורים, כותרות קטנות, משטחי מותג" },
  { name: "זהב · Highlight", token: "--highlight", bg: "bg-highlight", fg: "text-highlight-foreground", usage: "תגיות, אייקונים, הדגשות וקווים. לא לטקסט רץ" },
  { name: "ונילה · Background", token: "--background", bg: "bg-background", fg: "text-foreground", usage: "רקע העמוד" },
  { name: "כרטיס · Card", token: "--card", bg: "bg-card", fg: "text-card-foreground", usage: "כרטיסים ומשטחים מוגבהים" },
  { name: "רקע משני · Muted", token: "--muted", bg: "bg-muted", fg: "text-foreground", usage: "רקע לסקשנים מופרדים" },
  { name: "כחול בהיר · Accent", token: "--accent", bg: "bg-accent", fg: "text-accent-foreground", usage: "רקע לאייקונים ותגיות בגוון כחול" },
  { name: "טקסט · Foreground", token: "--foreground", bg: "bg-foreground", fg: "text-background", usage: "טקסט ראשי" },
  { name: "טקסט משני · Muted foreground", token: "--muted-foreground", bg: "bg-muted-foreground", fg: "text-background", usage: "טקסט משני" },
  { name: "גבול · Border", token: "--border", bg: "bg-border", fg: "text-foreground", usage: "גבולות ומפרידים" },
];

const typeScale = [
  { name: "Display / H1", className: "font-heading text-4xl font-extrabold leading-tight md:text-5xl", spec: "Rubik 800 · 36→48px", sample: "כל המשרד שלך, בתוך הוואטסאפ" },
  { name: "H2", className: "font-heading text-3xl font-bold md:text-4xl", spec: "Rubik 700 · 30→36px", sample: "בלי ללמוד מערכת חדשה" },
  { name: "H3", className: "font-heading text-lg font-semibold", spec: "Rubik 600 · 18px", sample: "מענה מהיר לכל פנייה" },
  { name: "Eyebrow", className: "text-sm font-semibold text-primary", spec: "Assistant 600 · 14px", sample: "מי אנחנו" },
  { name: "Lead", className: "text-lg leading-relaxed text-muted-foreground", spec: "Assistant 400 · 18px", sample: "סוכן AI שעונה לפניות, מתעד לקוחות ומנהל את העסקאות." },
  { name: "Body", className: "leading-relaxed", spec: "Assistant 400 · 16px", sample: "לקוחות, שיחות ופניות נרשמים בלי להקליד שום דבר בעצמך." },
  { name: "Small", className: "text-sm text-muted-foreground", spec: "Assistant 400 · 14px", sample: "חודש ניסיון ללא עלות. בלי כרטיס אשראי." },
];

const weights = [400, 500, 600, 700, 800];

export default function StyleGuide() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16">
      <h1 className="text-4xl font-extrabold">קיט מותג</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        פלטת צבעים וטיפוגרפיה של One Man Show. הערכים מוגדרים ב‑<code dir="ltr" className="font-mono text-sm">globals.css</code>.
      </p>

      <section className="mt-16">
        <h2 className="text-3xl font-bold">פלטת צבעים</h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {colors.map((c) => (
            <li key={c.token} className="overflow-hidden rounded-2xl border bg-card">
              <div className={`flex h-20 items-end p-3 sm:h-28 sm:p-4 ${c.bg} ${c.fg}`}>
                <span className="font-heading text-lg font-semibold">Aa אב</span>
              </div>
              <div className="space-y-1 p-3 sm:p-4">
                <div className="text-sm font-semibold sm:text-base">{c.name}</div>
                <div className="flex flex-wrap gap-x-3">
                  <code dir="ltr" className="font-mono text-xs">{c.bg}</code>
                  <TokenValue name={c.token} />
                </div>
                <p className="text-xs text-muted-foreground sm:text-sm">{c.usage}</p>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="mt-12 text-lg font-semibold">שילובים בשימוש</h3>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a href="#" className={buttonVariants()}>הצטרפות לרשימת ההמתנה</a>
          <a href="#" className={buttonVariants({ variant: "outline" })}>איך זה עובד</a>
          <span className="rounded-full bg-highlight px-3 py-1 text-sm font-semibold text-highlight-foreground">חודש חינם</span>
          <span className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">תגית כחולה</span>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold">טיפוגרפיה</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border bg-card p-6">
            <div className="text-sm text-muted-foreground">כותרות</div>
            <div className="mt-2 font-heading text-5xl font-bold">Rubik</div>
            <p className="mt-3 font-heading text-xl">אבגדהוזחטיכלמנסעפצקרשת 0123456789</p>
            <code dir="ltr" className="mt-3 block font-mono text-xs">font-heading · h1–h4 automatically</code>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <div className="text-sm text-muted-foreground">טקסט</div>
            <div className="mt-2 text-5xl font-bold">Assistant</div>
            <p className="mt-3 text-xl">אבגדהוזחטיכלמנסעפצקרשת 0123456789</p>
            <code dir="ltr" className="mt-3 block font-mono text-xs">font-sans · default</code>
          </div>
        </div>

        <h3 className="mt-12 text-lg font-semibold">משקלים</h3>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {[
            { label: "Rubik", font: "font-heading" },
            { label: "Assistant", font: "font-sans" },
          ].map((f) => (
            <div key={f.label} className="rounded-2xl border bg-card p-4">
              {weights.map((w) => (
                <div key={w} className={`${f.font} text-lg`} style={{ fontWeight: w }}>
                  סוכן AI בוואטסאפ · <span dir="ltr">{f.label} {w}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <h3 className="mt-12 text-lg font-semibold">סולם גדלים</h3>
        <ul className="mt-4 divide-y rounded-2xl border bg-card">
          {typeScale.map((t) => (
            <li key={t.name} className="grid gap-2 p-5 md:grid-cols-[10rem_1fr]">
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="font-mono text-xs text-muted-foreground"><span dir="ltr">{t.spec}</span></div>
              </div>
              <div className={t.className}>{t.sample}</div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
