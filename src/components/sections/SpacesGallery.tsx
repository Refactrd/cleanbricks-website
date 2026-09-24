import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { photos, type Img } from "@/lib/images";

type Tile = { title: string; href: string; img: Img; span: string; pos: string };

const tiles: Tile[] = [
  { title: "Homes and living spaces", href: "/services/residential-cleaning", img: photos.livingRoomWiping, span: "lg:col-span-7", pos: "object-center" },
  { title: "Offices and workplaces", href: "/services/commercial-cleaning", img: photos.office, span: "lg:col-span-5", pos: "object-center" },
  { title: "Kitchens and bathrooms", href: "/services/residential-cleaning", img: photos.cleanerBathroom, span: "lg:col-span-5", pos: "object-top" },
  { title: "Short-lets and guest rooms", href: "/services/short-let-airbnb-cleaning", img: photos.bedroom, span: "lg:col-span-7", pos: "object-center" },
];

/** Mosaic of the spaces we clean, after the reference's project grid. */
export function SpacesGallery() {
  return (
    <ul className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-12">
      {tiles.map((t) => (
        <li key={t.title} className={`reveal group relative ${t.span}`}>
          <div className="aspect-[4/3] overflow-hidden rounded-3xl sm:aspect-[16/11] lg:aspect-auto lg:h-[22rem]">
            <Image
              src={t.img.src}
              width={t.img.width}
              height={t.img.height}
              alt={t.img.alt}
              sizes={t.span.includes("7") ? "(min-width: 1024px) 660px, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 460px, (min-width: 640px) 50vw, 100vw"}
              className={`size-full object-cover ${t.pos} transition-transform duration-700 ease-out-soft group-hover:scale-105`}
            />
          </div>
          <div className="mt-3 flex items-center justify-between gap-4 px-1">
            <h3 className="font-medium">
              <Link href={t.href} className="after:absolute after:inset-0">
                {t.title}
              </Link>
            </h3>
            <span className="grid size-8 place-items-center rounded-full bg-ink text-paper transition-colors group-hover:bg-brand group-hover:text-ink" aria-hidden="true">
              <Icon name="arrow" className="size-4 -rotate-45" />
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
