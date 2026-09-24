import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Hero } from "@/components/sections/Hero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { ProcessChain } from "@/components/sections/ProcessChain";
import { BlogCard } from "@/components/sections/BlogCard";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { CTASection } from "@/components/sections/CTASection";
import { SpacesGallery } from "@/components/sections/SpacesGallery";
import { Icon } from "@/components/ui/Icon";
import { faqs, whyPoints } from "@/lib/content";
import { photos } from "@/lib/images";
import { naira, tiers } from "@/lib/pricing";
import { posts } from "@/lib/journal";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Professional Cleaning in Lagos",
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />

      <section aria-labelledby="services-heading" className="bg-mint py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Our services"
            title={<span id="services-heading">Clean spaces, without the stress</span>}
            text="Professional cleaning for the places you live, work and host in."
            className="mb-12 sm:mb-16"
          />
          <ServiceGrid />
        </Container>
      </section>

      <section aria-labelledby="spaces-heading" className="py-20 sm:py-28">
        <Container>
          <div className="mb-12 grid items-end gap-6 lg:grid-cols-2">
            <SectionHeading
              align="left"
              eyebrow="Spaces we care for"
              title={<span id="spaces-heading">Cleaning designed around your space</span>}
            />
            <p className="reveal max-w-md text-lg leading-relaxed text-ink/75 lg:justify-self-end">
              From apartments and family homes to offices and short-lets, we clean the places you live, work and host in.
            </p>
          </div>
          <SpacesGallery />
        </Container>
      </section>

      <section aria-labelledby="pricing-heading" className="bg-mint py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Pricing"
            title={<span id="pricing-heading">Clear prices by property size</span>}
            text="Choose Light, Standard or Deep Cleaning, then find your property size."
            className="mb-12"
          />
          <ul className="grid gap-5 md:grid-cols-3">
            {tiers.map((t) => (
              <li key={t.id} className={`reveal rounded-3xl p-7 sm:p-8 ${t.badge ? "bg-ink text-paper" : "bg-paper"}`}>
                {t.badge && <span className="mb-4 inline-flex rounded-full bg-sun px-3 py-1 text-xs font-medium text-ink">{t.badge}</span>}
                <h3 className="font-display text-2xl font-bold tracking-tight">{t.name}</h3>
                <p className={`mt-2 leading-relaxed ${t.badge ? "text-paper/75" : "text-ink/75"}`}>{t.summary}</p>
                <p className="mt-8 text-sm">From</p>
                <p className="font-display text-4xl font-bold tracking-tight">{naira(Math.min(...t.prices))}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Button href="/pricing" variant="dark" arrow>
              See full pricing
            </Button>
          </div>
        </Container>
      </section>

      <section aria-labelledby="why-heading" className="py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="reveal relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
              <Image
                src={photos.cleanerCaddy.src}
                width={photos.cleanerCaddy.width}
                height={photos.cleanerCaddy.height}
                alt={photos.cleanerCaddy.alt}
                sizes="(min-width: 1024px) 540px, (min-width: 448px) 448px, 100vw"
                className="size-full object-cover"
              />
            </div>
            <div aria-hidden="true" className="absolute -right-4 -bottom-4 -z-10 size-40 rounded-[2.5rem] bg-brand/25 sm:-right-6 sm:-bottom-6" />
          </div>
          <div className="reveal">
            <SectionHeading
              as="h2"
              eyebrow="Why CleanBricks"
              align="left"
              title={<span id="why-heading">A proper clean should feel like a proper clean</span>}
              text="Cleaning is a service and it deserves to be treated professionally. That is how we work."
            />
            <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {whyPoints.map((p) => (
                <li key={p.title} className="flex gap-4">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-brand text-ink">
                    <Icon name="check" className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight">{p.title}</h3>
                    <p className="mt-1 leading-relaxed text-ink/75">{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/about" variant="dark" arrow>
                About CleanBricks
              </Button>
              <Button href="/book" variant="outline">
                Book a Cleaning
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="process-heading" className="bg-mint py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title={<span id="process-heading">Four simple steps</span>}
            text="Booking should feel easy, so we have kept it that way."
            className="mb-12 sm:mb-16"
          />
          <ProcessChain />
          <div className="mt-10 text-center">
            <Button href="/how-it-works" variant="dark" arrow>
              See how it works
            </Button>
          </div>
        </Container>
      </section>

      <section aria-labelledby="journal-heading" className="bg-ink py-20 text-paper sm:py-28">
        <Container>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              align="left"
              eyebrow="Journal"
              title={<span id="journal-heading">Practical cleaning guides and tips</span>}
            />
            <Button href="/journal" variant="ghost" arrow>
              View all
            </Button>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {posts.slice(0, 4).map((p) => (
              <div key={p.slug} className="reveal">
                <BlogCard post={p} variant="wide" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="faq-heading" className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="reveal lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="FAQs"
              align="left"
              title={<span id="faq-heading">Questions? We have answers.</span>}
              text="The basics of booking and working with CleanBricks."
            />
            <Button href="/faqs" variant="outline" arrow className="mt-8">
              All FAQs
            </Button>
          </div>
          <div className="reveal">
            <FAQAccordion items={faqs.slice(0, 5)} />
          </div>
        </Container>
      </section>

      <CTASection variant="photo" title="Make your space sparkle every day." text="Enjoy a spotless home or workplace. Tell us what you need and we will take care of it." />
    </>
  );
}
