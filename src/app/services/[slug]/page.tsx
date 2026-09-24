import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { JsonLd, pageMeta } from "@/lib/seo";
import { getService, services } from "@/lib/services";
import { site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMeta({ title: s.metaTitle, description: s.metaDescription, path: s.href, image: s.image });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.metaDescription,
    url: `${site.url}${s.href}`,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: { "@type": "City", name: "Lagos" },
  };

  return (
    <>
      <PageHeader
        eyebrow={s.title}
        title={s.headline}
        text={s.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: s.title }]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/book" arrow>
            Book a Cleaning
          </Button>
          <Button href={s.slug === "residential-cleaning" ? "/pricing" : "/contact"} variant="outline">
            {s.slug === "residential-cleaning" ? "See Pricing" : "Get a Quote"}
          </Button>
        </div>
      </PageHeader>

      <section className="py-16 sm:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="reveal lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
              <Image
                src={s.image.src}
                width={s.image.width}
                height={s.image.height}
                alt={s.image.alt}
                sizes="(min-width: 1200px) 520px, (min-width: 1024px) 45vw, 100vw"
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>
            <div className="mt-6">
              <h2 className="text-sm font-medium tracking-[0.12em] uppercase">Who it is for</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {s.forWho.map((w) => (
                  <li key={w} className="rounded-full bg-mint px-4 py-1.5 text-sm">
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <SectionHeading align="left" title="What is included" text={s.note} className="mb-8" />
            <ul className="grid gap-4 sm:grid-cols-2">
              {s.includes.map((inc) => (
                <li key={inc.title} className="reveal rounded-3xl bg-mint p-6">
                  <span className="grid size-9 place-items-center rounded-full bg-brand text-ink">
                    <Icon name="check" className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-xl leading-snug font-bold tracking-tight">{inc.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/75">{inc.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-mint py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="How it works" title="Simple from start to finish" className="mb-12" />
          <ProcessSteps />
        </Container>
      </section>

      <div className="pt-20 sm:pt-28">
        <CTASection title={`Book your ${s.title.toLowerCase()}`} />
      </div>
      <JsonLd data={schema} />
    </>
  );
}
