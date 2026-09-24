import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { photos } from "@/lib/images";

type Props = {
  variant?: "panel" | "photo";
  title?: string;
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function CTASection({
  variant = "panel",
  title = "Ready for a cleaner space?",
  text = "Tell us what you need and we will take care of the rest.",
  primary = { label: "Book a Cleaning", href: "/book" },
  secondary = { label: "Talk to Us", href: "/contact" },
}: Props) {
  if (variant === "photo") {
    const img = photos.livingRoomEmpty;
    return (
      <section aria-label="Book a cleaning" className="relative isolate overflow-hidden bg-ink text-paper">
        <Image
          src={img.src}
          width={img.width}
          height={img.height}
          alt=""
          sizes="100vw"
          className="absolute inset-0 -z-20 size-full object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/70" />
        <Container className="grid min-h-[26rem] place-items-center py-20 sm:min-h-[32rem]">
          <div className="reveal mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.03] font-bold tracking-[-0.02em] text-balance">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-paper/80">{text}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href={primary.href} arrow>
                {primary.label}
              </Button>
              <Button href={secondary.href} variant="ghost">
                {secondary.label}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="pb-20 sm:pb-28">
      <Container>
        <div className="reveal relative overflow-hidden rounded-[2rem] bg-brand text-ink sm:rounded-[2.5rem]">
          <div aria-hidden="true" className="absolute -top-24 -right-16 size-72 rounded-[4rem] bg-lime/40" />
          <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:p-16">
            <div>
              <h2 className="font-display text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.03] font-bold tracking-[-0.02em] text-balance">
                {title}
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed">{text}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={primary.href} variant="dark" arrow>
                  {primary.label}
                </Button>
                <Button href={secondary.href} variant="outline">
                  {secondary.label}
                </Button>
              </div>
            </div>
            <div className="relative hidden aspect-[4/3] overflow-hidden rounded-3xl lg:block">
              <Image
                src={photos.teamLiving.src}
                width={photos.teamLiving.width}
                height={photos.teamLiving.height}
                alt={photos.teamLiving.alt}
                sizes="(min-width: 1024px) 480px, 100vw"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
