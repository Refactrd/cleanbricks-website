import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { BookingForm } from "@/components/forms/BookingForm";
import { PageHeader } from "@/components/sections/PageHeader";
import { photos } from "@/lib/images";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Book a Cleaning",
  description: "Request a cleaning with CleanBricks in Lagos. Tell us what you need and pick a date. We will confirm the details.",
  path: "/book",
});

const reassurance = [
  "Takes about two minutes",
  "We confirm details with you before anything is final",
  "Homes, short-lets and businesses",
];

export default function BookPage() {
  return (
    <>
      <PageHeader
        eyebrow="Book a Cleaning"
        title="Tell us what you need."
        text="A few details is all we need to get started."
        crumbs={[{ label: "Home", href: "/" }, { label: "Book a Cleaning" }]}
      />
      <section className="py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          <div className="reveal rounded-[2rem] bg-paper p-6 shadow-[0_30px_60px_-40px_rgba(31,41,55,0.35)] ring-1 ring-ink/5 sm:p-10">
            <BookingForm />
          </div>
          <aside className="reveal space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-3xl">
              <Image
                src={photos.homeownerArriving.src}
                width={photos.homeownerArriving.width}
                height={photos.homeownerArriving.height}
                alt={photos.homeownerArriving.alt}
                sizes="(min-width: 1024px) 380px, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="rounded-3xl bg-mint p-7">
              <h2 className="font-display text-2xl font-bold tracking-tight">What happens next</h2>
              <ul className="mt-5 space-y-3">
                {reassurance.map((r) => (
                  <li key={r} className="flex gap-3">
                    <Icon name="check" className="mt-0.5 size-5 shrink-0 text-brand" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
