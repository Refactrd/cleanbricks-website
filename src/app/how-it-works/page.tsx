import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { journey } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "How It Works",
  description: "Booking a CleanBricks clean is simple: tell us what you need, pick a time, and we get to work.",
  path: "/how-it-works",
});

const expectations = [
  { title: "Before your clean", items: ["A clear description of the service", "A quote you understand", "A confirmation message", "Arrival expectations"] },
  { title: "During your clean", items: ["Professional, uniformed staff", "Respect for your property", "Consistent cleaning standards", "Clear communication"] },
  { title: "After your clean", items: ["Confirmation that we are done", "A request for your feedback", "Issue resolution if anything is missed", "Easy rebooking"] },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="Getting a cleaner space should be easy."
        text="Four steps, no fuss. Here is what to expect from the first message to the final clean."
        crumbs={[{ label: "Home", href: "/" }, { label: "How it works" }]}
      />

      <section className="bg-mint py-20 sm:py-28">
        <Container>
          <ProcessSteps variant="logo" />
        </Container>
      </section>

      <section className="py-20 sm:py-28" aria-labelledby="journey-heading">
        <Container>
          <SectionHeading
            eyebrow="The journey"
            title={<span id="journey-heading">From first enquiry to your next clean</span>}
            className="mb-12"
          />
          <ol className="reveal flex flex-wrap justify-center gap-2 sm:gap-3">
            {journey.map((step, i) => (
              <li key={step} className="flex items-center gap-2 rounded-full bg-mint py-2 pr-5 pl-2 sm:gap-3">
                <span className="grid size-8 place-items-center rounded-full bg-brand text-sm font-medium">{i + 1}</span>
                <span className="font-display text-lg font-bold tracking-tight">{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {expectations.map((g) => (
              <section key={g.title} className="reveal rounded-3xl bg-mint p-8">
                <h3 className="font-display text-2xl font-bold tracking-tight">{g.title}</h3>
                <ul className="mt-5 space-y-3">
                  {g.items.map((it) => (
                    <li key={it} className="flex gap-3 text-ink/80">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Container>
      </section>

      <CTASection variant="photo" title="Ready when you are." />
    </>
  );
}
