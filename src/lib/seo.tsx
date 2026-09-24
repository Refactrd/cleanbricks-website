import type { Metadata } from "next";
import { photos } from "./images";
import { site } from "./site";

type Options = { title: string; description: string; path: string; image?: { src: string; width: number; height: number; alt: string }; type?: "website" | "article" };

/** Consistent per-page metadata: title, description, canonical, Open Graph, Twitter. */
export function pageMeta({ title, description, path, image = photos.livingRoomWiping, type = "website" }: Options): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      locale: site.locale,
      type,
      images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: [image.src] },
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
