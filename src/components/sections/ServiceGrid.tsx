import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { photos } from "@/lib/images";
import { homeServiceCards } from "@/lib/services";
import { ServiceCard } from "./ServiceCard";

/** Feature card + four service cards, following the reference's asymmetric grid. */
export function ServiceGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
      <div className="reveal relative flex flex-col overflow-hidden rounded-3xl bg-ink text-paper md:col-span-2 lg:col-span-1 lg:row-span-2">
        <div className="p-8 text-center lg:pt-10">
          <h3 className="font-display text-3xl leading-tight font-bold tracking-tight text-balance">
            Ready for a cleaner, calmer space?
          </h3>
          <p className="mx-auto mt-4 max-w-sm leading-relaxed text-paper/75">
            Homes, offices, short-lets and businesses. Tell us what you need and we will handle the rest.
          </p>
          <Button href="/services" className="mt-6" arrow>
            Explore Services
          </Button>
        </div>
        <div className="relative min-h-72 flex-1">
          <Image
            src={photos.teamBreak.src}
            width={photos.teamBreak.width}
            height={photos.teamBreak.height}
            alt={photos.teamBreak.alt}
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 100vw, 100vw"
            className="absolute inset-0 size-full object-cover object-top"
          />
        </div>
      </div>
      {homeServiceCards.map((s) => (
        <div key={s.title} className="reveal">
          <ServiceCard {...s} />
        </div>
      ))}
    </div>
  );
}
