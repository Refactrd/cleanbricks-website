"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { WhatsAppButton } from "./WhatsAppButton";

// The booking wizard keeps the main nav (so people can still get around the
// site) but drops the footer and floating WhatsApp bubble — the wizard's own
// fixed bottom bar and header already cover "leave" and "get help".
const noFooterRoutes = ["/book"];

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const noFooter = noFooterRoutes.some((r) => pathname === r || pathname.startsWith(`${r}/`));

  if (noFooter) {
    return (
      <>
        <Navbar />
        <main id="main">{children}</main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div id="page">
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
