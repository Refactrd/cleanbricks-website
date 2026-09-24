import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { CTASection } from "@/components/sections/CTASection";
import { PageHeader } from "@/components/sections/PageHeader";
import { pageMeta } from "@/lib/seo";
import { services } from "@/lib/services";

export const metadata = pageMeta({
  title: "Cleaning Services in Lagos",
  description:
    "Residential, short-let and Airbnb, and commercial cleaning across Lagos. See what CleanBricks offers and book a clean.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our services"
        title="Cleaning that fits the way you live and work."
        text="Homes, short-lets and businesses across Lagos. Pick the service that matches your space and we will take it from there."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="py-20 sm:py-28">
        <Container className="space-y-20 sm:space-y-28">
          {services.map((s, i) => (
            <article key={s.slug} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
              <div className={`reveal overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] ${i % 2 ? "lg:order-2" : ""}`}>
                <Image
                  src={s.image.src}
                  width={s.image.width}
                  height={s.image.height}
                  alt={s.image.alt}
                  sizes="(min-width: 1200px) 560px, (min-width: 1024px) 45vw, 100vw"
                  className="aspect-[4/3] w-full object-cover object-top transition-transform duration-700 ease-out-soft hover:scale-105"
                />
              </div>
              <div className="reveal">
                <span className="grid size-14 place-items-center rounded-2xl bg-brand text-ink">
                  <Icon name={s.icon} className="size-7" />
                </span>
                <h2 className="mt-6 font-display text-[clamp(1.9rem,3.6vw,2.75rem)] leading-[1.05] font-bold tracking-[-0.02em]">
                  <Link href={s.href} className="hover:underline hover:decoration-brand hover:decoration-4 hover:underline-offset-8">
                    {s.title}
                  </Link>
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-ink/75">{s.intro}</p>
                <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {s.includes.slice(0, 4).map((inc) => (
                    <li key={inc.title} className="flex items-start gap-2.5">
                      <Icon name="check" className="mt-0.5 size-5 shrink-0 text-brand" />
                      {inc.title}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={s.href} variant="dark" arrow>
                    Learn more
                  </Button>
                  <Button href="/book" variant="outline">
                    Book a Cleaning
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <section className="bg-mint py-16 sm:py-20">
        <Container className="reveal max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Starting with cleaning. Built to grow.</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/75">
            CleanBricks begins with professional cleaning and is being built into a trusted name in modern property and home care.
          </p>
        </Container>
      </section>

      <div className="pt-20 sm:pt-28">
        <CTASection />
      </div>
    </>
  );
}
