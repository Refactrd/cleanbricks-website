import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { PageHeader } from "@/components/sections/PageHeader";
import { values } from "@/lib/content";
import { photos } from "@/lib/images";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About CleanBricks",
  description:
    "CleanBricks is a modern cleaning and property-care brand launching in Lagos. Learn why we exist and what we believe.",
  path: "/about",
  image: photos.teamDesk,
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Clean spaces make life better."
        text="CleanBricks is a modern cleaning and property-care brand, launching in Lagos."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section className="py-20 sm:py-28" aria-labelledby="story-heading">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="reveal">
            <SectionHeading as="h2" align="left" eyebrow="Our story" title={<span id="story-heading">Why CleanBricks exists</span>} />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/80">
              <p>We started with a simple observation: the spaces we live and work in affect how we feel.</p>
              <p>A clean home feels different. A clean office feels different. A clean Airbnb feels different.</p>
              <p>CleanBricks exists to make that difference easier to achieve, so you can spend your time on what matters to you.</p>
            </div>
          </div>
          <div className="reveal overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
            <Image
              src={photos.teamDesk.src}
              width={photos.teamDesk.width}
              height={photos.teamDesk.height}
              alt={photos.teamDesk.alt}
              sizes="(min-width: 1200px) 560px, (min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="bg-mint py-20 sm:py-28" aria-labelledby="name-heading">
        <Container>
          <SectionHeading eyebrow="The name" title={<span id="name-heading">Clean + Bricks</span>} text="Two ideas, one brand." className="mb-12" />
          <div className="grid gap-5 md:grid-cols-2">
            <div className="reveal rounded-3xl bg-paper p-8 sm:p-10">
              <h3 className="font-display text-3xl font-bold tracking-tight">Clean</h3>
              <p className="mt-3 text-lg leading-relaxed text-ink/75">Freshness, hygiene, order and care.</p>
            </div>
            <div className="reveal rounded-3xl bg-paper p-8 sm:p-10">
              <h3 className="font-display text-3xl font-bold tracking-tight">Bricks</h3>
              <p className="mt-3 text-lg leading-relaxed text-ink/75">Homes, buildings, structure and strong foundations.</p>
            </div>
          </div>
          <p className="reveal mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed text-ink/80">
            Together, they describe what we do: building better spaces through cleanliness and care.
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-28" aria-labelledby="mission-heading">
        <Container className="grid gap-5 md:grid-cols-2">
          <div className="reveal rounded-3xl bg-brand p-8 sm:p-10">
            <h2 id="mission-heading" className="text-sm font-medium tracking-[0.12em] uppercase">Our mission</h2>
            <p className="mt-5 font-display text-2xl leading-snug font-bold tracking-tight sm:text-3xl">
              To deliver reliable, professional and thoughtful cleaning services that make every space feel better.
            </p>
          </div>
          <div className="reveal rounded-3xl bg-ink p-8 text-paper sm:p-10">
            <h2 className="text-sm font-medium tracking-[0.12em] text-paper/70 uppercase">Our ambition</h2>
            <p className="mt-5 font-display text-2xl leading-snug font-bold tracking-tight sm:text-3xl">
              To become one of Africa&rsquo;s most trusted modern property-care brands, starting with cleaning.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-mint py-20 sm:py-28" aria-labelledby="values-heading">
        <Container>
          <SectionHeading eyebrow="Values" title={<span id="values-heading">What we stand for</span>} className="mb-12" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <li key={v.title} className="reveal rounded-3xl bg-paper p-7 sm:p-8">
                <span className="block h-1.5 w-10 rounded-full bg-brand" aria-hidden="true" />
                <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-ink/75">{v.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 sm:py-28" aria-labelledby="people-heading">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="reveal overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] lg:order-2">
            <Image
              src={photos.teamBreak.src}
              width={photos.teamBreak.width}
              height={photos.teamBreak.height}
              alt={photos.teamBreak.alt}
              sizes="(min-width: 1200px) 560px, (min-width: 1024px) 45vw, 100vw"
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="reveal">
            <SectionHeading as="h2" align="left" eyebrow="The people" title={<span id="people-heading">Real people who care</span>} />
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              You should feel like you are dealing with people who care about your space. Our team is professional,
              approachable and confident, and they treat your home or workplace with respect.
            </p>
          </div>
        </Container>
      </section>

      <CTASection title="Let us take care of it." />
    </>
  );
}
