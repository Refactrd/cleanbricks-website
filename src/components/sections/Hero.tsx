import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { logos, photos } from "@/lib/images";
import { phoneHref, site } from "@/lib/site";

const audiences = ["Homes", "Offices", "Short-lets", "Businesses"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper pt-[calc(var(--nav-h)+2rem)] pb-16 sm:pb-24 lg:pt-[calc(var(--nav-h)+3.5rem)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 right-0 hidden w-[46%] rounded-bl-[6rem] bg-mint lg:block" />
      </div>
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
        <div>
          <p className="inline-flex animate-rise items-center gap-2 rounded-full bg-paper px-4 py-2 text-sm font-medium">
            <Icon name="pin" className="size-4" />
            Cleaning &amp; property care across Lagos
          </p>
          <h1 className="mt-6 animate-lift font-display text-[clamp(2.9rem,7vw,4.6rem)] leading-[0.95] font-bold tracking-[-0.03em] text-balance [animation-delay:70ms]">
            A cleaner space starts here.
          </h1>
          <p className="mt-6 max-w-xl animate-rise text-lg leading-relaxed text-ink/80 [animation-delay:150ms] sm:text-xl">
            Professional cleaning for homes, offices, short-lets and businesses across Lagos. We clean your space
            properly, so you can get on with your day.
          </p>
          <div className="mt-9 flex animate-rise flex-wrap gap-3 [animation-delay:230ms]">
            <Button href="/book" arrow>
              Book a Cleaning
            </Button>
            <Button href="/services" variant="outline">
              Explore Services
            </Button>
          </div>
          {site.contact.phone && (
            <p className="mt-8 flex animate-rise flex-wrap items-center gap-x-4 gap-y-1 [animation-delay:280ms]">
              <span className="text-sm text-ink/70">Prefer to talk?</span>
              <a
                href={phoneHref(site.contact.phone)}
                className="inline-flex items-center gap-2 font-display text-xl font-bold tracking-tight underline-offset-4 hover:underline"
              >
                <Icon name="phone" className="size-5 text-brand" />
                {site.contact.phone}
              </a>
            </p>
          )}
          <ul className="mt-6 flex animate-rise flex-wrap gap-2 [animation-delay:310ms]" aria-label="Who we clean for">
            {audiences.map((a) => (
              <li key={a} className="rounded-full border border-ink/15 bg-paper/70 px-4 py-1.5 text-sm">
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md animate-lift lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-paper shadow-[0_30px_60px_-30px_rgba(31,41,55,0.4)] sm:rounded-[2.5rem]">
            <Image
              src={photos.cleanerCounter.src}
              width={photos.cleanerCounter.width}
              height={photos.cleanerCounter.height}
              alt={photos.cleanerCounter.alt}
              preload
              fetchPriority="high"
              sizes="(min-width: 1024px) 500px, (min-width: 448px) 448px, 100vw"
              className="size-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-4 flex animate-rise items-center gap-3 rounded-2xl bg-paper py-3 pr-5 pl-3 shadow-[0_18px_40px_-18px_rgba(31,41,55,0.4)] [animation-delay:450ms] sm:-left-6">
            <Image src={logos.icon.src} width={48} height={48} alt="" className="size-12 rounded-xl" />
            <p className="font-display text-lg leading-tight font-bold tracking-tight">
              Cleaner spaces.
              <br />
              Better living.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
