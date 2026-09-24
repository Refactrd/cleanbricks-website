/** Central site configuration. Contact details are null until confirmed — never invent them. */
export const site = {
  name: "CleanBricks",
  tagline: "Cleaner spaces. Better living.",
  description:
    "Professional cleaning for homes, offices, short-lets and businesses across Lagos. Cleaner spaces. Better living.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_GB",
  contact: {
    phone: "+234 903 653 7023" as string | null,
    whatsapp: "+234 903 653 7023" as string | null,
    email: "bookings@cleanbricks.us" as string | null,
    address: "Lagos, Nigeria" as string | null,
    hours: null as string | null, // not confirmed yet
  },
  social: [] as { label: string; href: string }[],
};

const digits = (v: string) => v.replace(/\D/g, "");
export const phoneHref = (v: string) => `tel:+${digits(v)}`;
export const whatsappHref = (v: string) => `https://wa.me/${digits(v)}`;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerGroups = [
  {
    title: "Services",
    links: [
      { label: "Residential cleaning", href: "/services/residential-cleaning" },
      { label: "Short-let & Airbnb", href: "/services/short-let-airbnb-cleaning" },
      { label: "Commercial cleaning", href: "/services/commercial-cleaning" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "CleanBricks",
    links: [
      { label: "About", href: "/about" },
      { label: "How it works", href: "/how-it-works" },
      { label: "FAQs", href: "/faqs" },
      { label: "Journal", href: "/journal" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { label: "Book a Cleaning", href: "/book" },
      { label: "Contact us", href: "/contact" },
    ],
  },
] as const;
