import type { Metadata, Viewport } from "next";
import { walsheim } from "@/lib/fonts";
import { logos } from "@/lib/images";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { tiers } from "@/lib/pricing";
import { JsonLd } from "@/lib/seo";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Cleaning & Property Care in Lagos`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: { siteName: site.name, locale: site.locale, type: "website" },
};

export const viewport: Viewport = { themeColor: "#F8FAF7", width: "device-width", initialScale: 1 };

const siteSchema = [
  {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    logo: `${site.url}${logos.stacked.src}`,
    image: `${site.url}${logos.stacked.src}`,
    description: site.description,
    slogan: site.tagline,
    ...(site.contact.phone && { telephone: site.contact.phone }),
    ...(site.contact.email && { email: site.contact.email }),
    address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
    areaServed: { "@type": "City", name: "Lagos" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cleaning services",
      itemListElement: [...services.map((s) => s.title), ...tiers.map((t) => t.name)].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "en-GB",
    publisher: { "@id": `${site.url}/#business` },
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={walsheim.variable}>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Navbar />
        <div id="page">
          <main id="main">{children}</main>
          <Footer />
        </div>
        <JsonLd data={siteSchema} />
      </body>
    </html>
  );
}
