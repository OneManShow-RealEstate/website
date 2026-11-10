import { SiteHeader } from "@/components/layout/site-header";
import { About } from "@/components/sections/about";
import { Agent } from "@/components/sections/agent";
import { Hero } from "@/components/sections/hero";
import { Leads } from "@/components/sections/leads";
import { Properties } from "@/components/sections/properties";

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
      </main>
    </>
  );
}
