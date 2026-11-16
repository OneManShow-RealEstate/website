// Single source of truth for site-wide details.
// Contact details are placeholders until the real ones are decided.
export const siteConfig = {
  name: "One Man Show",
  description:
    "סוכן AI בוואטסאפ של המתווך ואפליקציה אחת שמרכזת את כל הלקוחות, הפניות והעסקאות.",
  // Production URL, used for absolute links (Open Graph image, canonical)
  url: "https://onemanshow.vercel.app",
  // Brand navy (same as --primary in globals.css), for the browser UI and the app manifest
  themeColor: "#0f3072",
  backgroundColor: "#fbf7e9",
  // Logo files in public/brand (from the logo kit), with their intrinsic sizes for next/image
  logo: {
    horizontal: { src: "/brand/logo-horizontal.svg", width: 562, height: 144 },
    horizontalOnDark: { src: "/brand/logo-horizontal-dark.svg", width: 562, height: 144 },
    mark: { src: "/brand/mark.svg", width: 512, height: 512 },
  },
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
