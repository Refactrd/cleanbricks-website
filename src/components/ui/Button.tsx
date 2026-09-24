import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon } from "./Icon";

type Variant = "primary" | "dark" | "outline" | "light" | "ghost";

const base =
  "group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-medium whitespace-nowrap transition duration-300 ease-out-soft active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-ink hover:bg-lime hover:shadow-[0_8px_24px_-8px_rgba(16,185,129,0.7)]",
  dark: "bg-ink text-paper hover:bg-ink/85",
  outline: "border-2 border-ink/80 text-ink hover:bg-ink hover:text-paper",
  light: "bg-paper text-ink hover:bg-mint",
  ghost: "border-2 border-paper/70 text-paper hover:bg-paper hover:text-ink",
};

const chip: Record<Variant, string> = {
  primary: "bg-paper text-ink",
  dark: "bg-brand text-ink",
  outline: "bg-ink text-paper group-hover:bg-brand group-hover:text-ink",
  light: "bg-brand text-ink",
  ghost: "bg-paper text-ink",
};

type Common = { variant?: Variant; arrow?: boolean; className?: string; children: ReactNode };

type LinkProps = Common & { href: string };
type BtnProps = Common & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & { href?: undefined };

export function Button(props: LinkProps | BtnProps) {
  const {
    variant = "primary",
    arrow = false,
    className = "",
    children,
    href,
    ...rest
  } = props as Common & { href?: string } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;
  const cls = `${base} ${variants[variant]} ${arrow ? "pr-2" : ""} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && (
        <span className={`grid size-8 place-items-center overflow-hidden rounded-full transition-colors duration-300 ${chip[variant]}`}>
          <Icon name="arrow" className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5" />
        </span>
      )}
    </>
  );

  if (href !== undefined) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );
}
