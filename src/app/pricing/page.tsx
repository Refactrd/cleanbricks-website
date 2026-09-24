import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHeader } from "@/components/sections/PageHeader";
import { PricingTiers } from "@/components/sections/PricingTiers";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/Button";
import { JsonLd, pageMeta } from "@/lib/seo";
import { naira, tiers } from "@/lib/pricing";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Pricing: Light, Standard & Deep Cleaning",
  description:
    "CleanBricks cleaning prices by property size, from self-contained to 5 bedroom. Light, Standard and Deep Cleaning in Lagos.",
  path: "/pricing",
});

const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "CleanBricks residential cleaning prices",
  itemListElement: tiers.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: t.name,
      provider: { "@type": "Organization", name: site.name },
      areaServed: "Lagos, Nigeria",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "NGN",
        lowPrice: Math.min(...t.prices),
        highPrice: Math.max(...t.prices),
      },
    },
  })),
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Keep your space fresh, clean and stress-free."
        text="Three cleaning services, one trusted team. Choose the level of clean, then find your property size."
        crumbs={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
      />
      <section className="bg-mint py-20 sm:py-28" aria-label="Price list">
        <Container>
          <PricingTiers />
          <p className="reveal mx-auto mt-10 max-w-2xl text-center text-ink/75">
            Prices are in naira ({naira(12000)} and up) and are shown by property size. Not sure which clean you need? Tell us
            about your space and we will point you to the right one.
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            align="left"
            eyebrow="Offices & short-lets"
            title="Need something else?"
            text="Commercial spaces, short-let turnovers and one-off jobs are different for every property. Send us the details and we will get back to you with a quote."
          />
          <div className="reveal flex flex-wrap gap-3 lg:justify-end">
            <Button href="/contact" variant="dark" arrow>
              Get a Quote
            </Button>
            <Button href="/book" variant="outline">
              Book a Cleaning
            </Button>
          </div>
        </Container>
      </section>
      <CTASection variant="photo" />
      <JsonLd data={schema} />
    </>
  );
}
