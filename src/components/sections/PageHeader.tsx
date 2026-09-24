import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

type Crumb = { label: string; href?: string };
type Props = { tone?: "mint" | "dark"; eyebrow?: string; title: ReactNode; text?: ReactNode; crumbs?: Crumb[]; children?: ReactNode };

/** Inner-page intro band. Accounts for the fixed navbar height. */
export function PageHeader({ tone = "mint", eyebrow, title, text, crumbs, children }: Props) {
  const dark = tone === "dark";
  return (
    <section className={`relative overflow-hidden ${dark ? "bg-ink text-paper" : "bg-mint"} pt-[calc(var(--nav-h)+3rem)] pb-14 sm:pb-20 lg:pt-[calc(var(--nav-h)+4.5rem)]`}>
      <BlockShapes dark={dark} />
      <Container className="relative">
        {crumbs && (
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: crumbs.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: c.label,
                ...(c.href && { item: `${site.url}${c.href === "/" ? "" : c.href}` }),
              })),
            }}
          />
        )}
        {crumbs && (
          <nav aria-label="Breadcrumb" className={`mb-6 animate-fade text-sm ${dark ? "text-paper/70" : "text-ink/70"}`}>
            <ol className="flex flex-wrap items-center gap-2">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {c.href ? (
                    <Link href={c.href} className="underline-offset-4 hover:underline">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && (
          <p className={`mb-4 inline-flex animate-rise items-center gap-2 rounded-full ${dark ? "bg-paper/10" : "bg-paper"} px-3.5 py-1.5 text-xs font-medium tracking-[0.12em] uppercase`}>
            <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl animate-rise font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02] font-bold tracking-[-0.025em] text-balance [animation-delay:60ms]">
          {title}
        </h1>
        {text && (
          <p className={`mt-6 max-w-2xl animate-rise text-lg leading-relaxed ${dark ? "text-paper/75" : "text-ink/75"} [animation-delay:140ms] sm:text-xl`}>
            {text}
          </p>
        )}
        {children && <div className="mt-8 animate-rise [animation-delay:220ms]">{children}</div>}
      </Container>
    </section>
  );
}

/** Soft rounded blocks — a nod to the house/leaf/sun symbol. Decorative only. */
export function BlockShapes({ dark = false }: { dark?: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className={`absolute -top-16 -right-16 size-64 rounded-[3rem] ${dark ? "bg-brand/20" : "bg-brand/15"} sm:size-96`} />
      <div className="absolute top-24 right-24 hidden size-6 rounded-full bg-sun sm:block" />
      <div className={`absolute -right-6 bottom-8 hidden h-24 w-48 rounded-l-full rounded-tr-[3rem] ${dark ? "bg-brand/25" : "bg-lime/40"} md:block`} />
    </div>
  );
}
