import { Container } from "@/components/ui/Container";
import { BlogCard } from "@/components/sections/BlogCard";
import { CTASection } from "@/components/sections/CTASection";
import { PageHeader } from "@/components/sections/PageHeader";
import { categories } from "@/lib/content";
import { posts } from "@/lib/journal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Journal: Cleaning Tips & Property Care",
  description: "Practical cleaning tips, home care advice and guidance for hosts and businesses from the CleanBricks team.",
  path: "/journal",
});

export default function JournalPage() {
  return (
    <>
      <PageHeader
        tone="dark"
        eyebrow="Journal"
        title="Cleaning made simple, one story at a time."
        text="Practical guides to help you clean smarter, save time and keep your space fresh."
        crumbs={[{ label: "Home", href: "/" }, { label: "Journal" }]}
      >
        <ul className="flex flex-wrap gap-2" aria-label="Topics">
          {categories.map((c) => (
            <li key={c} className="rounded-full border border-paper/25 px-4 py-1.5 text-sm">
              {c}
            </li>
          ))}
        </ul>
      </PageHeader>
      <section className="bg-ink pb-20 text-paper sm:pb-28">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            {posts.map((p) => (
              <div key={p.slug} className="reveal">
                <BlogCard post={p} variant="wide" headingLevel="h2" />
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CTASection variant="photo" title="Make your space sparkle every day." text="Enjoy a spotless home or workplace. Tell us what you need and we will take care of it." />
    </>
  );
}
