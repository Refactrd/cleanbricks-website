import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";

type Props = { title: string; text: string; icon: IconName; href: string };

export function ServiceCard({ title, text, icon, href }: Props) {
  return (
    <article className="group relative flex h-full flex-col rounded-3xl bg-paper p-7 transition duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(31,41,55,0.25)] sm:p-8">
      <span className="grid size-14 place-items-center rounded-2xl bg-brand text-ink transition-colors duration-300 group-hover:bg-lime">
        <Icon name={icon} className="size-7" />
      </span>
      <h3 className="mt-10 font-display text-2xl leading-tight font-bold tracking-tight">
        <Link href={href} className="after:absolute after:inset-0 after:rounded-3xl">
          {title}
        </Link>
      </h3>
      <p className="mt-3 leading-relaxed text-ink/75">{text}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium" aria-hidden="true">
        Learn more
        <Icon name="arrow" className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1" />
      </span>
    </article>
  );
}
