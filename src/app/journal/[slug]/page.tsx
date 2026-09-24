import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { BlogCard } from "@/components/sections/BlogCard";
import { CTASection } from "@/components/sections/CTASection";
import { PageHeader } from "@/components/sections/PageHeader";
import { getPost, posts } from "@/lib/journal";
import { JsonLd, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMeta({ title: post.title, description: post.excerpt, path: `/journal/${post.slug}`, image: post.image, type: "article" });
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${site.url}${post.image.src}`,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/journal/${post.slug}`,
  };

  return (
    <>
      <PageHeader
        tone="dark"
        eyebrow={post.category}
        title={post.title}
        crumbs={[{ label: "Home", href: "/" }, { label: "Journal", href: "/journal" }, { label: post.category }]}
      >
        <p className="text-sm text-paper/70">By the CleanBricks team · {post.readMinutes} min read</p>
      </PageHeader>

      <article className="bg-ink pb-16 text-paper sm:pb-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div className="min-w-0">
            <div className="overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
              <Image
                src={post.image.src}
                width={post.image.width}
                height={post.image.height}
                alt={post.image.alt}
                preload
                fetchPriority="high"
                sizes="(min-width: 1200px) 740px, (min-width: 1024px) 60vw, 100vw"
                className="aspect-[16/10] w-full object-cover object-top"
              />
            </div>
            <div className="mt-10 max-w-2xl text-lg leading-[1.75] text-paper/80">
              {post.body.map((b, i) => {
                switch (b.type) {
                  case "h2":
                    return (
                      <h2 key={i} className="mt-10 mb-3 font-display text-2xl font-bold tracking-tight text-paper sm:text-3xl">
                        {b.text}
                      </h2>
                    );
                  case "ul":
                    return (
                      <ul key={i} className="my-5 space-y-2.5">
                        {b.items.map((it) => (
                          <li key={it} className="flex gap-3">
                            <span className="mt-3 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                            {it}
                          </li>
                        ))}
                      </ul>
                    );
                  case "tip":
                    return (
                      <aside key={i} className="my-8 flex gap-4 rounded-3xl bg-paper/10 p-6 text-paper">
                        <Icon name="sparkle" className="mt-1 size-6 shrink-0 text-brand" />
                        <p>
                          <strong className="font-medium">Tip: </strong>
                          {b.text}
                        </p>
                      </aside>
                    );
                  default:
                    return (
                      <p key={i} className="mb-5">
                        {b.text}
                      </p>
                    );
                }
              })}
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl bg-brand p-7 text-ink">
              <h2 className="font-display text-2xl leading-tight font-bold tracking-tight">Want us to take care of it?</h2>
              <p className="mt-3 leading-relaxed">Tell us what you need and we will handle the cleaning.</p>
              <Button href="/book" variant="dark" className="mt-6 w-full" arrow>
                Book a Cleaning
              </Button>
            </div>
          </aside>
        </Container>
      </article>

      <section className="bg-ink pb-20 text-paper sm:pb-28" aria-labelledby="related-heading">
        <Container>
          <div className="mb-10 flex items-end justify-between gap-4 border-t border-paper/15 pt-14">
            <h2 id="related-heading" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Keep reading
            </h2>
            <Button href="/journal" variant="ghost" arrow className="hidden sm:inline-flex">
              View all
            </Button>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {related.slice(0, 2).map((p) => (
              <BlogCard key={p.slug} post={p} variant="wide" />
            ))}
          </div>
        </Container>
      </section>
      <CTASection variant="photo" title="Let us handle the clean." text="Tell us what you need and we will take care of the rest." />
      <JsonLd data={schema} />
    </>
  );
}
