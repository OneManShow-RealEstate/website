import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "תנאי שימוש",
  // Placeholder until the real page is written
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="text-3xl font-bold md:text-4xl">תנאי שימוש</h1>
      <p className="mt-6 text-lg text-muted-foreground">תנאי השימוש המלאים יפורסמו כאן לקראת ההשקה.</p>
    </main>
  );
}
