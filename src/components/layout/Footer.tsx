import Image from "next/image";
import Link from "next/link";
import { logos } from "@/lib/images";
import { footerGroups, phoneHref, site, whatsappHref } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";

const contactRows: { key: keyof typeof site.contact; icon: IconName; href?: (v: string) => string }[] = [
  { key: "phone", icon: "phone", href: phoneHref },
  { key: "whatsapp", icon: "chat", href: whatsappHref },
  { key: "email", icon: "mail", href: (v) => `mailto:${v}` },
  { key: "address", icon: "pin" },
  { key: "hours", icon: "clock" },
];

export function Footer() {
  const contacts = contactRows.filter((r) => site.contact[r.key]);
  return (
    <footer className="bg-ink text-paper">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Link href="/" aria-label="CleanBricks home" className="inline-block">
              <Image
                src={logos.horizontalWhite.src}
                width={logos.horizontalWhite.width}
                height={logos.horizontalWhite.height}
                alt="CleanBricks"
                sizes="180px"
                className="h-auto w-44"
              />
            </Link>
            <p className="mt-6 leading-relaxed text-paper/75">
              Professional cleaning for homes, offices, short-lets and businesses across Lagos.
            </p>
            <p className="mt-6 font-display text-2xl leading-tight font-bold tracking-tight text-brand">
              Cleaner spaces.
              <br />
              Better living.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="text-sm font-medium tracking-[0.12em] text-paper/70 uppercase">{group.title}</h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-paper/90 transition-colors hover:text-brand">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                {group.title === "Get in touch" && contacts.length > 0 && (
                  <ul className="mt-6 space-y-3 text-paper/80">
                    {contacts.map((r) => {
                      const v = site.contact[r.key] as string;
                      return (
                        <li key={r.key} className="flex items-start gap-3">
                          <Icon name={r.icon} className="mt-0.5 size-5 shrink-0 text-brand" />
                          {r.href ? (
                            <a href={r.href(v)} className="hover:text-brand">
                              {v}
                            </a>
                          ) : (
                            <span>{v}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-paper/15 pt-6 text-sm text-paper/70 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} CleanBricks. All rights reserved.</p>
          <p>Cleaning &amp; property care, Lagos.</p>
        </div>
      </Container>
    </footer>
  );
}
