import type { IconName } from "@/components/ui/Icon";

export const propertySizes = ["Self-contained", "Room & Parlour", "2 Bedroom", "3 Bedroom", "4 Bedroom", "5 Bedroom"] as const;

export type Tier = {
  id: string;
  name: string;
  icon: IconName;
  badge?: string;
  summary: string;
  tagline: string;
  lead?: string;
  includes: string[];
  /** Naira, aligned with propertySizes. */
  prices: [number, number, number, number, number, number];
};

/** Source: designs/CleanBricks-Price-list.png */
export const tiers: Tier[] = [
  {
    id: "light",
    name: "Light Cleaning",
    icon: "sparkle",
    summary: "Perfect for maintaining a clean and tidy home.",
    tagline: "For a clean and healthy space.",
    includes: [
      "Sweeping & dusting",
      "Wiping surfaces",
      "Trash removal",
      "Basic bathroom cleaning",
      "Kitchen surface cleaning",
      "General tidying",
    ],
    prices: [12000, 18000, 25000, 30000, 45000, 55000],
  },
  {
    id: "standard",
    name: "Standard Cleaning",
    icon: "home",
    badge: "Most popular",
    summary: "Our most popular service.",
    tagline: "For a more thorough clean and fresher home.",
    lead: "Everything in Light Cleaning, plus:",
    includes: [
      "Thorough dusting of furniture and shelves",
      "Proper mopping of floors",
      "Cleaning kitchen surfaces & sink",
      "Bathroom cleaning, including toilet and sink",
      "Wiping appliance exteriors",
      "Light interior microwave cleaning",
    ],
    prices: [18000, 22000, 35000, 45000, 55000, 65000],
  },
  {
    id: "deep",
    name: "Deep Cleaning",
    icon: "key",
    summary: "Ideal for first-time cleaning, move-in/move-out or when your space needs extra care.",
    tagline: "A detailed clean for a fresher and healthier space.",
    lead: "Everything in Standard Cleaning, plus:",
    includes: [
      "Scrubbing tiles and grout",
      "Cleaning behind and under furniture",
      "Cleaning inside appliances",
      "Detailed bathroom descaling",
      "Washing doors, frames, skirting and vents",
      "Removing built-up dirt and stains",
    ],
    prices: [35000, 45000, 60000, 80000, 120000, 170000],
  },
];

export const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;
