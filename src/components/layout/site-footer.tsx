import { Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { footer } from "@/content/footer";
import { cn } from "@/lib/utils";

// Based on shadcnblocks Footer2, restyled for the brand: deep blue background, text logo,
// a waitlist button, and a contact column (plain text while the details are placeholders).
export function SiteFooter() {
  const { contact } = siteConfig;
  const contactItems = [
    { icon: Mail, label: contact.email, href: `mailto:${contact.email}`, dir: "ltr" },
    { icon: Phone, label: contact.phone, href: `tel:${contact.phone.replace(/-/g, "")}`, dir: "ltr" },
    { icon: MessageCircle, label: "וואטסאפ", href: contact.whatsapp, dir: undefined },
  ] as const;

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-8">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-6">
          {/* Brand: first in the DOM, so on the right in RTL */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 font-heading text-2xl font-bold">
              <span className="size-2.5 rounded-full bg-highlight" aria-hidden="true" />
              {siteConfig.name}
            </Link>
            <p className="mt-4 max-w-xs leading-relaxed text-primary-foreground/75">{footer.description}</p>
            <a
              href={siteConfig.waitlistHref}
              className={cn(
                buttonVariants(),
                "mt-6 h-11 bg-highlight px-5 text-highlight-foreground hover:bg-highlight/90"
              )}
            >
              {footer.ctaLabel}
            </a>
          </div>

          {siteConfig.footerNav.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h2 className="mb-4 font-heading font-semibold">{section.title}</h2>
              <ul className="space-y-3 text-sm">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-primary-foreground/75 transition-colors hover:text-highlight">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2">
            <h2 className="mb-4 font-heading font-semibold">{footer.contactTitle}</h2>
            <ul className="space-y-3 text-sm">
              {contactItems.map(({ icon: Icon, label, href, dir }) => (
                <li key={label} className="flex items-center gap-2 text-primary-foreground/75">
                  <Icon className="size-4 shrink-0 text-highlight" aria-hidden="true" />
                  {/* Live links only once the real details are in (siteConfig.contact.ready) */}
                  {contact.ready ? (
                    <a href={href} dir={dir} className="transition-colors hover:text-highlight">
                      {label}
                    </a>
                  ) : (
                    <span dir={dir}>{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-primary-foreground/15 pt-6 text-sm text-primary-foreground/60 md:flex-row md:items-center">
          <p>{footer.copyright}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {siteConfig.legalLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="transition-colors hover:text-highlight">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
