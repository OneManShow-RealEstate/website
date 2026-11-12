import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "הצהרת נגישות",
  // Placeholder until the real page is written
  robots: { index: false },
};

export default function AccessibilityPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="text-3xl font-bold md:text-4xl">הצהרת נגישות</h1>
      <p className="mt-6 text-lg text-muted-foreground">אנחנו פועלים להנגיש את האתר לכל המשתמשים. הצהרת הנגישות המלאה, כולל פרטי רכז/ת הנגישות, תפורסם כאן בקרוב.</p>
    </main>
  );
}
