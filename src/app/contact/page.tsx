import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHeader } from "@/components/sections/PageHeader";
import { pageMeta } from "@/lib/seo";
import { phoneHref, site, whatsappHref } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact CleanBricks",
  description: "Talk to CleanBricks about cleaning for your home, office, short-let or business in Lagos.",
  path: "/contact",
});

const channels: { key: keyof typeof site.contact; label: string; icon: IconName; href?: (v: string) => string }[] = [
  { key: "phone", label: "Phone", icon: "phone", href: phoneHref },
  { key: "whatsapp", label: "WhatsApp", icon: "chat", href: whatsappHref },
  { key: "email", label: "Email", icon: "mail", href: (v) => `mailto:${v}` },
  { key: "address", label: "Location", icon: "pin" },
  { key: "hours", label: "Working hours", icon: "clock" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's make your space shine."
        text="Questions, quotes or a booking? Send us a message and we will get back to you."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <section className="py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="reveal">
            <h2 className="font-display text-3xl font-bold tracking-tight">Contact information</h2>
            <p className="mt-3 leading-relaxed text-ink/75">Call, message or send us a request. Whatever is easiest for you.</p>
            <ul className="mt-8 space-y-4">
              {channels.filter((c) => site.contact[c.key]).map((c) => {
                const value = site.contact[c.key] as string;
                return (
                  <li key={c.key} className="flex items-start gap-4 rounded-3xl bg-mint p-5">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand text-ink">
                      <Icon name={c.icon} className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium tracking-wide text-ink/70">{c.label}</p>
                      {c.href ? (
                        <a href={c.href(value)} {...(c.key === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="text-lg font-medium underline-offset-4 hover:underline">
                          {value}
                        </a>
                      ) : (
                        <p className="text-lg font-medium">{value}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
            {site.contact.whatsapp && (
              <a
                href={whatsappHref(site.contact.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 font-medium transition hover:bg-lime"
              >
                <Icon name="chat" className="size-5" />
                Chat on WhatsApp
              </a>
            )}
          </div>
          <div className="reveal rounded-[2rem] bg-paper p-6 shadow-[0_30px_60px_-40px_rgba(31,41,55,0.35)] ring-1 ring-ink/5 sm:p-10">
            <h2 className="mb-6 font-display text-3xl font-bold tracking-tight">Send us a message</h2>
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
