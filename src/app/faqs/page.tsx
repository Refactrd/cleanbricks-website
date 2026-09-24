import { Container } from "@/components/ui/Container";
import { CTASection } from "@/components/sections/CTASection";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { PageHeader } from "@/components/sections/PageHeader";
import { faqs } from "@/lib/content";
import { JsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "FAQs",
  description: "Answers to common questions about booking, pricing, coverage and services at CleanBricks.",
  path: "/faqs",
});

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqsPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQs"
        title="Questions we get asked."
        text="Can't find what you're looking for? Send us a message and we will help."
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQs" }]}
      />
      <section className="py-20 sm:py-28">
        <Container className="max-w-3xl">
          <div className="reveal">
            <FAQAccordion items={faqs} />
          </div>
        </Container>
      </section>
      <CTASection title="Still have a question?" text="Talk to us and we will get back to you." primary={{ label: "Contact Us", href: "/contact" }} secondary={{ label: "Book a Cleaning", href: "/book" }} />
      <JsonLd data={schema} />
    </>
  );
}
