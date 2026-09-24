"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { logos } from "@/lib/images";
import { nav } from "@/lib/site";
import { Button } from "@/components/ui/Button";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the menu whenever the route changes (link tap, back button).
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, make the page inert, trap focus, close on Escape.
  useEffect(() => {
    if (!open) return;
    const page = document.getElementById("page");
    const toggle = toggleRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    page?.setAttribute("inert", "");

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !headerRef.current) return;
      const items = Array.from(headerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      page?.removeAttribute("inert");
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  // Leaving the mobile breakpoint while open would strand the lock.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const solid = scrolled && !open;

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="relative mx-auto max-w-[1200px]">
        {/* Background lives on its own layer: backdrop-filter on the header itself would trap the fixed mobile panel. */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 -z-10 rounded-full transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-out-soft ${
            solid
              ? "bg-paper/90 shadow-[0_0_0_1px_rgba(31,41,55,0.06),0_12px_32px_-12px_rgba(31,41,55,0.25)] backdrop-blur-xl"
              : "bg-paper/90 shadow-[0_0_0_1px_rgba(31,41,55,0.05)] backdrop-blur-md"
          }`}
        />
        <div
          className={`flex w-full items-center justify-between gap-4 pr-2 pl-5 transition-[height] duration-300 ease-out-soft sm:pl-6 ${
            scrolled ? "h-14" : "h-16"
          }`}
        >
        <Link href="/" aria-label="CleanBricks home" className="relative z-10 shrink-0">
          <Image
            src={logos.horizontal.src}
            width={logos.horizontal.width}
            height={logos.horizontal.height}
            alt="CleanBricks"
            sizes="160px"
            className="h-auto w-36 sm:w-40"
          />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="relative rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors duration-200 hover:bg-mint aria-[current=page]:bg-mint"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block">
            <Button href="/book" className="h-11">
              Book a Cleaning
            </Button>
          </span>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-10 grid size-11 place-items-center rounded-full bg-ink text-paper transition-transform duration-200 active:scale-95 xl:hidden"
          >
            <span className="relative block h-3.5 w-5" aria-hidden="true">
              <span className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out-soft ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute top-1.5 left-0 h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out-soft ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        inert={!open}
        aria-hidden={!open}
        className={`fixed inset-0 -z-20 flex flex-col overflow-y-auto bg-mint px-5 pt-[calc(var(--nav-h)+1.5rem)] pb-8 transition-[clip-path,opacity] duration-500 ease-out-soft sm:px-8 xl:hidden ${
          open ? "opacity-100 [clip-path:circle(150%_at_calc(100%-2.75rem)_2.75rem)]" : "pointer-events-none opacity-0 [clip-path:circle(0%_at_calc(100%-2.75rem)_2.75rem)]"
        }`}
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {nav.map((item, i) => {
              const active = isActive(pathname, item.href);
              return (
                <li
                  key={item.href}
                  style={{ transitionDelay: open ? `${120 + i * 45}ms` : "0ms" }}
                  className={`border-b border-ink/10 transition-all duration-500 ease-out-soft ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="flex items-center justify-between py-4 font-display text-3xl font-bold tracking-tight"
                  >
                    {item.label}
                    {active && <span className="size-2.5 rounded-full bg-brand" aria-hidden="true" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div
          style={{ transitionDelay: open ? "420ms" : "0ms" }}
          className={`mt-auto pt-8 transition-all duration-500 ease-out-soft ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <Button href="/book" arrow className="w-full">
            Book a Cleaning
          </Button>
          <p className="mt-4 text-center text-sm text-ink/70">Cleaner spaces. Better living.</p>
        </div>
      </div>
    </header>
  );
}
