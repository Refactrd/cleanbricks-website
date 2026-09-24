import { photos, type Img } from "./images";
import type { Category } from "./content";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "tip"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  readMinutes: number;
  image: Img;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "keep-your-home-fresh-between-professional-cleans",
    title: "How to keep your home fresh between professional cleans",
    excerpt: "A professional clean sets the standard. A few small habits keep it there.",
    category: "Home Care",
    readMinutes: 4,
    image: photos.homeownerRelaxing,
    body: [
      { type: "p", text: "A professional clean gives you a proper reset. What you do in the days after decides how long it lasts. You do not need a big routine. You need a few small habits you will actually keep." },
      { type: "h2", text: "Clear surfaces first" },
      { type: "p", text: "Clutter makes a clean home feel messy. Give everyday items a home: keys in a bowl, post in a tray, shoes by the door. Clear surfaces are quicker to wipe and easier to keep tidy." },
      { type: "h2", text: "Wipe as you go" },
      { type: "p", text: "A quick wipe of the kitchen counter after cooking takes a minute. Left for a week, the same spill takes far longer. Do the same for bathroom sinks and mirrors." },
      { type: "h2", text: "Let fresh air in" },
      { type: "p", text: "Open windows for a few minutes each day if you can. Moving air keeps rooms fresher and helps damp spots dry." },
      { type: "h2", text: "Deal with the floor little and often" },
      { type: "p", text: "Sweep or vacuum the busiest areas every couple of days. Dust and grit stay on the surface, so a short pass keeps them from spreading through the rest of the house." },
      { type: "tip", text: "Pick one habit and stick to it for a week before adding another. Small routines last longer than big plans." },
    ],
  },
  {
    slug: "how-often-should-you-deep-clean-your-home",
    title: "How often should you deep clean your home?",
    excerpt: "Regular cleaning keeps things tidy. Deep cleaning reaches what regular cleaning misses.",
    category: "Cleaning Tips",
    readMinutes: 4,
    image: photos.cleanerHob,
    body: [
      { type: "p", text: "Regular cleaning keeps a home tidy day to day. A deep clean goes further, into the places that build up slowly and rarely get attention." },
      { type: "h2", text: "What a deep clean covers" },
      { type: "ul", items: ["Behind and under furniture and appliances", "Inside ovens, fridges and cupboards", "Skirting boards, door frames and light fittings", "Bathroom grout, taps and shower screens"] },
      { type: "h2", text: "A sensible rhythm" },
      { type: "p", text: "For most homes, a deep clean two to four times a year works well. Homes with children, pets, or lots of daily use may want it more often. If you already have regular cleaning in place, you may need it less." },
      { type: "h2", text: "Times to book one sooner" },
      { type: "ul", items: ["Before or after moving home", "After building or renovation work", "When you are starting a new cleaning routine", "Before hosting family or guests"] },
      { type: "tip", text: "Not sure what your home needs? Tell us about it when you book and we will suggest the right kind of clean." },
    ],
  },
  {
    slug: "getting-your-airbnb-ready-for-the-next-guest",
    title: "Getting your Airbnb ready for the next guest",
    excerpt: "A simple turnover checklist that helps guests feel welcome from the moment they arrive.",
    category: "Short-Let & Airbnb",
    readMinutes: 5,
    image: photos.cleanerLinen,
    body: [
      { type: "p", text: "Guests notice the details the moment they walk in. A clear turnover routine helps you get them right every time, even when check-out and check-in are close together." },
      { type: "h2", text: "Start with the beds" },
      { type: "p", text: "Strip and replace linen, check for marks, and make the bed neatly. Fresh, well-made beds set the tone for the whole stay." },
      { type: "h2", text: "Kitchen and bathroom" },
      { type: "ul", items: ["Wipe counters, hob and sink", "Check the fridge and empty any leftovers", "Clean the toilet, shower and basin", "Replace towels and top up toiletries"] },
      { type: "h2", text: "Do a guest's-eye walk-through" },
      { type: "p", text: "Before you leave, walk in as if you were arriving. Check for smells, stray items, dust and anything that needs restocking. Ten minutes here can save you a poor review." },
      { type: "h2", text: "Plan for tight turnarounds" },
      { type: "p", text: "Keep spare linen and supplies on site, and share your check-out and check-in times with your cleaner early so they can plan around your bookings." },
      { type: "tip", text: "A short checklist you use every time beats a perfect one you forget." },
    ],
  },
  {
    slug: "seven-small-cleaning-habits-that-save-you-time",
    title: "7 small cleaning habits that save you time",
    excerpt: "Little routines that stop mess building up, so big cleaning days become smaller.",
    category: "Cleaning Tips",
    readMinutes: 3,
    image: photos.cleanerWindow,
    body: [
      { type: "p", text: "Most of the time we spend cleaning goes on catching up. These habits keep you ahead of it." },
      { type: "ul", items: ["Make the bed each morning.", "Wash up or load the dishwasher straight after meals.", "Wipe the kitchen counters before bed.", "Put things back where they belong as you finish with them.", "Give bathroom surfaces a quick wipe after use.", "Take rubbish out before it overflows.", "Spend ten minutes on a tidy-up before you go to sleep."] },
      { type: "p", text: "None of these takes long. Together, they mean less to do when you want a proper clean." },
      { type: "tip", text: "Attach a new habit to something you already do, like wiping the counter while the kettle boils." },
    ],
  },
  {
    slug: "preparing-your-office-for-a-fresh-start",
    title: "Preparing your office for a fresh start",
    excerpt: "Small steps that make a workplace easier to clean and nicer to be in.",
    category: "Business",
    readMinutes: 4,
    image: photos.livingRoomDusting,
    body: [
      { type: "p", text: "A tidy workplace helps people focus and makes a good impression on visitors. A little preparation also makes professional cleaning more effective." },
      { type: "h2", text: "Clear desks at the end of the day" },
      { type: "p", text: "When surfaces are clear, they can be cleaned properly. Ask your team to put away papers, cups and personal items before they leave." },
      { type: "h2", text: "Look after shared spaces" },
      { type: "p", text: "Kitchens, meeting rooms and entrances get the most use. Agree simple rules, like washing your own mug and clearing the fridge weekly." },
      { type: "h2", text: "Agree a schedule that fits" },
      { type: "p", text: "Cleaning outside working hours means fewer interruptions. Tell your cleaning provider when the office is quiet and which areas matter most." },
      { type: "tip", text: "Walk through your office as a visitor would. Whatever you notice first is a good place to start." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
