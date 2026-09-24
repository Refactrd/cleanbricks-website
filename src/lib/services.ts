import { photos, type Img } from "./images";
import type { IconName } from "@/components/ui/Icon";

export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: IconName;
  image: Img;
  href: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  forWho: string[];
  includes: { title: string; text: string }[];
  note: string;
};

export const services: Service[] = [
  {
    slug: "residential-cleaning",
    title: "Residential cleaning",
    short: "Regular, deep, move-in, move-out and one-off cleans for your home.",
    icon: "home",
    image: photos.cleanerCounter,
    href: "/services/residential-cleaning",
    metaTitle: "Residential Cleaning in Lagos",
    metaDescription:
      "Regular home cleaning, deep cleaning, move-in and move-out cleans, one-off and recurring visits across Lagos. Book a CleanBricks clean.",
    headline: "Your home, cleaned properly.",
    intro:
      "You do not have to spend your weekend cleaning. Tell us what your home needs and we will clean it properly, once or on a regular schedule.",
    forWho: ["Homeowners", "Renters", "Busy professionals", "Families"],
    includes: [
      { title: "Regular home cleaning", text: "A steady routine that keeps your home fresh, weekly or fortnightly." },
      { title: "Deep cleaning", text: "More time and attention for spaces that need a proper reset." },
      { title: "Move-in cleaning", text: "Walk into a fresh, ready home before the boxes arrive." },
      { title: "Move-out cleaning", text: "Leave a property clean and ready for whoever comes next." },
      { title: "Post-renovation cleaning", text: "Clear the dust and leftovers once the work is finished." },
      { title: "One-off or recurring", text: "Book a single visit, or set a schedule that suits your week." },
    ],
    note: "Prices start from ₦12,000 depending on the clean and your property size. See the pricing page, or tell us about your space and we will confirm what is involved before you book.",
  },
  {
    slug: "short-let-airbnb-cleaning",
    title: "Short-let & Airbnb cleaning",
    short: "Guest turnovers, apartment resets and pre-arrival cleans for hosts.",
    icon: "key",
    image: photos.cleanerBed,
    href: "/services/short-let-airbnb-cleaning",
    metaTitle: "Short-Let & Airbnb Cleaning in Lagos",
    metaDescription:
      "Guest turnover cleaning, apartment resets, linen and room preparation for short-let and Airbnb hosts across Lagos. Book with CleanBricks.",
    headline: "Ready for the next guest.",
    intro:
      "Great reviews start with a spotless arrival. We reset your apartment between stays so you can focus on hosting, not housekeeping.",
    forWho: ["Airbnb hosts", "Short-let owners", "Property managers", "Serviced apartments"],
    includes: [
      { title: "Guest turnover cleaning", text: "A full clean between check-out and the next check-in." },
      { title: "Apartment reset", text: "Every surface, room and detail put back the way guests expect." },
      { title: "Linen and room preparation", text: "Beds made and rooms set up, ready for arrival." },
      { title: "Restocking support", text: "Help keeping essentials topped up between guests." },
      { title: "Pre-arrival cleaning", text: "A final check-and-clean just before guests walk in." },
    ],
    note: "Tell us your check-out and check-in times and we will plan around your bookings.",
  },
  {
    slug: "commercial-cleaning",
    title: "Commercial cleaning",
    short: "Offices, studios, retail spaces and small business premises.",
    icon: "building",
    image: photos.office,
    href: "/services/commercial-cleaning",
    metaTitle: "Commercial & Office Cleaning in Lagos",
    metaDescription:
      "Office cleaning, retail spaces, studios, small business premises and common areas across Lagos. Talk to CleanBricks about a clean workplace.",
    headline: "A workplace people are glad to walk into.",
    intro:
      "A clean workplace helps your team and your visitors feel at ease. We keep your premises tidy so you can get on with the work.",
    forWho: ["Offices", "Retail spaces", "Studios", "Small businesses", "Property managers"],
    includes: [
      { title: "Office cleaning", text: "Desks, floors, kitchens and meeting rooms kept fresh." },
      { title: "Retail spaces", text: "Shopfronts and floors ready for customers." },
      { title: "Studios", text: "Creative and work studios kept clean and clear." },
      { title: "Small business premises", text: "Flexible cleaning that fits how your business runs." },
      { title: "Common areas", text: "Entrances, corridors and shared spaces looked after." },
    ],
    note: "Tell us about your premises and working hours and we will suggest a schedule that fits.",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/** Home page grid also surfaces deep & move cleans, which live under residential. */
export const homeServiceCards: { title: string; text: string; icon: IconName; href: string }[] = [
  { title: services[0].title, text: services[0].short, icon: "home", href: services[0].href },
  { title: services[1].title, text: services[1].short, icon: "key", href: services[1].href },
  { title: services[2].title, text: services[2].short, icon: "building", href: services[2].href },
  {
    title: "Deep & move cleaning",
    text: "Detailed cleans for spaces that need more time, before or after a move.",
    icon: "sparkle",
    href: "/services/residential-cleaning",
  },
];
