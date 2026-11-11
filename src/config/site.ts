// Single source of truth for site-wide details.
// Contact details are placeholders until the real ones are decided.
export const siteConfig = {
  name: "One Man Show",
  description:
    "סוכן AI בוואטסאפ של המתווך ואפליקציה אחת שמרכזת את כל הלקוחות, הפניות והעסקאות.",
  // Opens the waitlist popup (see WaitlistDialog); every CTA links here
  waitlistHref: "#waitlist",
  // Footer navigation: in-page sections of the home page
  footerNav: [
    {
      title: "המוצר",
      links: [
        { name: "הסוכן בוואטסאפ", href: "#agent" },
        { name: "ניהול לידים", href: "#leads" },
        { name: "ניהול נכסים", href: "#properties" },
        { name: "איך זה עובד", href: "#how-it-works" },
      ],
    },
    {
      title: "החברה",
      links: [
        { name: "מי אנחנו", href: "#about" },
        { name: "למי זה מתאים", href: "#audience" },
        { name: "שאלות נפוצות", href: "#faq" },
      ],
    },
  ],
  legalLinks: [
    { name: "מדיניות פרטיות", href: "/privacy" },
    { name: "תנאי שימוש", href: "/terms" },
    { name: "הצהרת נגישות", href: "/accessibility" },
  ],
  contact: {
    // false while the details below are placeholders: live contact links stay hidden
    ready: false,
    email: "hello@example.com",
    phone: "050-000-0000",
    whatsapp: "https://wa.me/972500000000",
  },
} as const;
