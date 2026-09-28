import type { CleaningType } from "./types";

export type ScopeSection = { title: string; items: string[] };
export type TierScope = { lead?: string; sections: ScopeSection[]; excludes?: string[] };

/**
 * Exact scope of work per cleaning type, as supplied by the business.
 * Shown to customers so Light Cleaning is never mistaken for "Standard at a
 * discount" — the exclusions matter operationally as much as the inclusions.
 */
export const tierScope: Record<CleaningType, TierScope> = {
  light: {
    sections: [
      {
        title: "Living room",
        items: [
          "Dust visible surfaces",
          "Wipe tables and accessible surfaces",
          "Dust TV stand and entertainment surfaces",
          "Wipe high-touch areas",
          "Straighten cushions",
          "Sweep/vacuum floor",
          "Mop hard floors",
          "Empty accessible bins",
        ],
      },
      {
        title: "Bedrooms",
        items: [
          "Make/straighten beds",
          "Dust accessible surfaces",
          "Wipe bedside tables",
          "Dust visible furniture",
          "Sweep/vacuum",
          "Mop hard floors",
          "Empty bins",
        ],
      },
      {
        title: "Kitchen",
        items: [
          "Wipe countertops",
          "Clean kitchen sink",
          "Wipe cooker/stovetop",
          "Wipe accessible cabinet exteriors",
          "Wipe dining/table surfaces",
          "Sweep/vacuum",
          "Mop floor",
          "Empty bin",
        ],
      },
      {
        title: "Bathroom",
        items: [
          "Clean toilet",
          "Wipe sink and countertop",
          "Clean mirror",
          "Wipe taps and visible fixtures",
          "Lightly clean shower/bath area",
          "Sweep/mop floor",
          "Empty bin",
        ],
      },
      { title: "General", items: ["Remove visible rubbish", "Dust accessible surfaces", "Clean high-touch points", "Basic room reset"] },
    ],
    excludes: [
      "Inside oven",
      "Inside refrigerator",
      "Inside cabinets",
      "Inside wardrobes",
      "Heavy grease removal",
      "Heavy limescale/descaling",
      "Detailed grout cleaning",
      "Baseboards/skirting boards",
      "Windows",
      "Window frames",
      "Deep bathroom scrubbing",
      "Upholstery cleaning",
      "Carpet washing",
      "Wall washing",
      "Heavy stain removal",
      "Under-heavy-furniture cleaning",
      "Post-construction cleaning",
      "Move-in/move-out cleaning",
    ],
  },
  standard: {
    lead: "Everything in Light Cleaning, plus:",
    sections: [
      {
        title: "Living room",
        items: [
          "Detailed dusting",
          "Dust furniture",
          "Clean tables",
          "Clean TV stand",
          "Clean accessible shelves",
          "Clean mirrors",
          "Wipe doors and handles",
          "Wipe light switches",
          "Vacuum rugs/carpets",
          "Sweep and mop floors",
          "Clean corners",
          "Reset furniture and cushions",
        ],
      },
      {
        title: "Bedrooms",
        items: [
          "Change bed linen where provided",
          "Make beds properly",
          "Dust furniture",
          "Clean bedside tables",
          "Dust headboards",
          "Clean mirrors",
          "Wipe doors and handles",
          "Clean switches",
          "Vacuum rugs/carpets",
          "Sweep and mop floors",
          "Clean accessible corners",
        ],
      },
      {
        title: "Kitchen",
        items: [
          "Clean countertops",
          "Clean sink",
          "Clean taps",
          "Clean stovetop",
          "Clean backsplash",
          "Wipe cabinet exteriors",
          "Wipe appliance exteriors",
          "Clean microwave exterior and interior",
          "Clean dining surfaces",
          "Sweep/vacuum",
          "Mop",
          "Empty bin",
        ],
      },
      {
        title: "Bathroom",
        items: [
          "Toilet bowl, exterior and base",
          "Sink, counter and mirror",
          "Shower area and bath area",
          "Taps and fixtures",
          "Bathroom doors",
          "High-touch surfaces",
          "Floor scrubbing and mopping",
          "Hair/debris removal",
          "Bin emptying",
        ],
      },
      {
        title: "Whole home",
        items: [
          "Dust accessible surfaces",
          "Clean high-touch points, handles and switches",
          "Vacuum and mop",
          "Remove rubbish",
          "Basic odour control",
          "General room reset",
        ],
      },
    ],
  },
  deep: {
    lead: "Everything in Standard Cleaning, plus:",
    sections: [
      {
        title: "Living room",
        items: [
          "Detailed skirting/baseboard cleaning",
          "Clean behind and under accessible furniture",
          "Detailed corners",
          "Detailed door cleaning, door frames, window sills and frames",
          "Detailed dust removal",
          "Detailed wall spot cleaning",
          "Curtain/blind dusting",
          "Detailed floor treatment",
          "Rug and upholstery vacuuming where appropriate",
        ],
      },
      {
        title: "Bedrooms",
        items: [
          "Detailed headboard and bed frame cleaning",
          "Under-bed cleaning where accessible",
          "Skirting boards, door frames and window sills",
          "Wardrobe exterior (interior if included in the package)",
          "Detailed corners and wall spot cleaning",
          "Detailed floor cleaning",
        ],
      },
      {
        title: "Kitchen",
        items: [
          "Deep stovetop cleaning and degreasing",
          "Backsplash scrubbing",
          "Cabinet exterior detailing (interior where included)",
          "Microwave interior and exterior",
          "Appliance exterior detailing",
          "Sink descaling and tap detailing",
          "Wall spot cleaning, floor scrubbing and corners",
          "Behind/under accessible appliances",
          "Refrigerator exterior (interior if included)",
          "Bin cleaning",
        ],
      },
      {
        title: "Bathroom",
        items: [
          "Heavy toilet cleaning, including the base",
          "Shower walls, shower floor and bath",
          "Tile and grout detailing",
          "Limescale removal where suitable",
          "Tap descaling and showerhead exterior",
          "Mirrors and cabinet exterior (interior where included)",
          "Floor scrubbing, corners and drain area",
          "Door and frame cleaning",
          "Mould treatment where appropriate and safely treatable",
        ],
      },
      {
        title: "Whole home",
        items: [
          "Detailed dusting, skirting boards and door frames",
          "Light switches and handles",
          "Corners and accessible high areas",
          "Window sills and accessible furniture gaps",
          "Detailed floor treatment",
          "Odour assessment and final inspection",
        ],
      },
    ],
  },
};
