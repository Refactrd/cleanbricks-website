import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { naira, propertySizes, tiers } from "@/lib/pricing";

/** Three tier cards: what is included, then the price for each property size. */
export function PricingTiers() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {tiers.map((t) => {
        const featured = !!t.badge;
        return (
          <article
            key={t.id}
            aria-labelledby={`tier-${t.id}`}
            className={`reveal relative flex flex-col rounded-[2rem] p-7 sm:p-8 ${featured ? "bg-ink text-paper" : "bg-paper"}`}
          >
            {t.badge && (
              <span className="absolute -top-3 left-7 rounded-full bg-sun px-3.5 py-1 text-xs font-medium text-ink">{t.badge}</span>
            )}
            <span className={`grid size-14 place-items-center rounded-2xl ${featured ? "bg-brand" : "bg-mint"} text-ink`}>
              <Icon name={t.icon} className="size-7" />
            </span>
            <h2 id={`tier-${t.id}`} className="mt-6 font-display text-3xl font-bold tracking-tight">
              {t.name}
            </h2>
            <p className={`mt-2 leading-relaxed ${featured ? "text-paper/75" : "text-ink/75"}`}>{t.summary}</p>

            <div className="mt-7">
              {t.lead && <p className="mb-3 text-sm font-medium">{t.lead}</p>}
              <ul className="space-y-2.5">
                {t.includes.map((i) => (
                  <li key={i} className="flex gap-3">
                    <Icon name="check" className="mt-0.5 size-5 shrink-0 text-brand" />
                    <span className={featured ? "text-paper/90" : "text-ink/85"}>{i}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-8">
            <dl className={`rounded-2xl p-5 ${featured ? "bg-paper/10" : "bg-mint/70"}`}>
              {propertySizes.map((size, idx) => (
                <div key={size} className="flex items-baseline justify-between gap-4 py-1.5">
                  <dt className={featured ? "text-paper/80" : "text-ink/75"}>{size}</dt>
                  <dd className="font-display text-lg font-bold tracking-tight">{naira(t.prices[idx])}</dd>
                </div>
              ))}
            </dl>
            <p className={`mt-4 text-sm ${featured ? "text-paper/70" : "text-ink/75"}`}>{t.tagline}</p>
            <Button href="/book" variant={featured ? "primary" : "dark"} arrow className="mt-6 w-full">
              Book {t.name}
            </Button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
