import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  // Placeholder until the real policy is written
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="text-3xl font-bold md:text-4xl">מדיניות פרטיות</h1>
      <p className="mt-6 text-lg text-muted-foreground">
        מדיניות הפרטיות המלאה תפורסם כאן בקרוב. עד אז: הפרטים שנשלחים בטופס רשימת ההמתנה (שם, טלפון ומייל) מגיעים אלינו במייל דרך ספק שירות לשליחת מיילים, ומשמשים רק כדי ליצור איתכם קשר לגבי One Man Show. איננו מוכרים אותם ולא מוסרים אותם לשיווק, ואפשר לבקש מאיתנו למחוק אותם בכל עת, למשל כשנחזור אליכם אחרי ההרשמה.
      </p>
    </main>
  );
}
