import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Post } from "@/lib/journal";

type Props = { post: Post; variant?: "card" | "feature" | "row" | "wide"; headingLevel?: "h2" | "h3" };

const meta = (p: Post) => `${p.readMinutes} min read`;

export function BlogCard({ post, variant = "card", headingLevel: H = "h3" }: Props) {
  const href = `/journal/${post.slug}`;
  const img = (sizes: string, cls: string) => (
    <Image
      src={post.image.src}
      width={post.image.width}
      height={post.image.height}
      alt={post.image.alt}
      sizes={sizes}
      className={`${cls} object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105`}
    />
  );
  const tag = (
    <span className="inline-flex rounded-full bg-sun px-3 py-1 text-xs font-medium whitespace-nowrap text-ink">{post.category}</span>
  );

  if (variant === "wide") {
    // CleanHub-style horizontal card, made for dark (charcoal) sections.
    return (
      <article className="group relative grid overflow-hidden rounded-3xl text-paper ring-1 ring-paper/15 transition duration-300 ease-out-soft hover:ring-brand sm:grid-cols-[2fr_3fr]">
        <div className="relative aspect-[16/10] overflow-hidden sm:aspect-auto sm:min-h-56">
          <Image
            src={post.image.src}
            width={post.image.width}
            height={post.image.height}
            alt={post.image.alt}
            sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 100vw"
            className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-between gap-6 p-5 sm:p-6">
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              {tag}
              <span className="text-xs whitespace-nowrap text-paper/70">{meta(post)}</span>
            </div>
            <H className="mt-4 font-display text-xl leading-snug font-bold tracking-tight text-balance">
              <Link href={href} className="after:absolute after:inset-0">
                {post.title}
              </Link>
            </H>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-paper/40 px-4 py-1.5 text-sm transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-ink" aria-hidden="true">
            Read full blog
            <Icon name="arrow" className="size-4" />
          </span>
        </div>
      </article>
    );
  }

  if (variant === "row") {
    return (
      <article className="group relative flex gap-4 rounded-3xl bg-paper p-3 transition-shadow duration-300 hover:shadow-[0_16px_32px_-20px_rgba(31,41,55,0.3)]">
        <div className="size-28 shrink-0 overflow-hidden rounded-2xl sm:size-32">{img("128px", "size-full")}</div>
        <div className="flex min-w-0 flex-col justify-center gap-2 pr-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            {tag}
            <span className="text-xs whitespace-nowrap text-ink/75">{meta(post)}</span>
          </div>
          <H className="font-display text-lg leading-snug font-bold tracking-tight text-balance">
            <Link href={href} className="after:absolute after:inset-0 after:rounded-3xl">
              {post.title}
            </Link>
          </H>
        </div>
      </article>
    );
  }

  if (variant === "feature") {
    return (
      <article className="group relative flex h-full min-h-[28rem] flex-col justify-end overflow-hidden rounded-3xl bg-ink">
        <div className="absolute inset-0">{img("(min-width: 1024px) 560px, 100vw", "size-full")}</div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" aria-hidden="true" />
        <div className="relative m-3 rounded-2xl bg-paper p-6 sm:m-4 sm:p-7">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            {tag}
            <span className="text-xs whitespace-nowrap text-ink/75">{meta(post)}</span>
          </div>
          <H className="mt-3 font-display text-2xl leading-tight font-bold tracking-tight text-balance">
            <Link href={href} className="after:absolute after:inset-0 after:rounded-3xl">
              {post.title}
            </Link>
          </H>
          <p className="mt-2 leading-relaxed text-ink/75">{post.excerpt}</p>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-paper transition duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(31,41,55,0.25)]">
      <div className="aspect-[4/3] overflow-hidden">{img("(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw", "size-full")}</div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          {tag}
          <span className="text-xs whitespace-nowrap text-ink/75">{meta(post)}</span>
        </div>
        <H className="mt-4 font-display text-xl leading-snug font-bold tracking-tight text-balance">
          <Link href={href} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </H>
        <p className="mt-2 leading-relaxed text-ink/75">{post.excerpt}</p>
      </div>
    </article>
  );
}
