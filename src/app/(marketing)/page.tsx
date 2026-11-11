import { SiteHeader } from "@/components/layout/site-header";
import { About } from "@/components/sections/about";
import { Agent } from "@/components/sections/agent";
import { Audience } from "@/components/sections/audience";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Leads } from "@/components/sections/leads";
import { Properties } from "@/components/sections/properties";
import { WaitlistDialog } from "@/components/waitlist-dialog";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Leads />
        <Properties />
        <Agent />
        <HowItWorks />
        <Audience />
        <Faq />
      </main>
      <WaitlistDialog />
    </>
  );
}
