export const processSteps = [
  { title: "Tell us what you need", text: "Share your space, the type of clean and where you are in Lagos. It takes a couple of minutes." },
  { title: "Pick a convenient time", text: "Choose a date that suits you. We confirm the details so you know what to expect." },
  { title: "We get to work", text: "Our team arrives in CleanBricks uniform and cleans your space properly." },
  { title: "Enjoy the difference", text: "Come back to a space that feels fresh and ready. Tell us how it went, and rebook when you like." },
] as const;

export const journey = ["Discover", "Enquire", "Book", "Confirm", "Clean", "Review", "Return"] as const;

export const values = [
  { title: "Reliability", text: "If we say we will be there, we show up." },
  { title: "Care", text: "We treat every space with respect." },
  { title: "Quality", text: "We do not clean just to finish. We clean to a standard." },
  { title: "Trust", text: "You should feel comfortable giving us access to your space." },
  { title: "Simplicity", text: "We keep the whole experience straightforward." },
  { title: "Professionalism", text: "Our people, communication and service reflect the brand." },
] as const;

export const whyPoints = [
  { title: "Reliable", text: "We show up when we say we will." },
  { title: "Careful", text: "We treat your home, office or property with respect." },
  { title: "Simple to book", text: "A short form, a clear confirmation, no chasing." },
  { title: "Professional", text: "Uniformed people, clear communication, consistent standards." },
] as const;

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What types of cleaning do you offer?",
    a: "Residential cleaning (regular, deep, move-in, move-out, post-renovation, one-off and recurring), short-let and Airbnb cleaning, and commercial cleaning for offices, retail spaces, studios and small business premises.",
  },
  {
    q: "How do I book a cleaning?",
    a: "Use the Book a Cleaning form. Tell us your service, location and preferred date. We will get back to you to confirm the details before anything is final.",
  },
  {
    q: "How much does cleaning cost?",
    a: "Residential prices depend on the type of clean (Light, Standard or Deep) and your property size, from self-contained to 5 bedroom. See the Pricing page. For offices, short-lets and anything not listed, contact us and we will send a quote.",
  },
  {
    q: "Which areas of Lagos do you cover?",
    a: "We are launching across Lagos. Add your location to the booking form and we will confirm we can reach you.",
  },
  {
    q: "Can you clean my Airbnb between guests?",
    a: "Yes. Guest turnover cleaning, apartment resets, linen and basic room preparation, restocking support and pre-arrival cleaning are all part of our short-let service.",
  },
  {
    q: "Can I set up regular cleaning?",
    a: "Yes. Choose a one-off visit or a recurring schedule when you book. If your needs change, tell us and we will adjust.",
  },
  {
    q: "What if something is not right after a clean?",
    a: "Tell us as soon as you notice. Putting things right is part of how we work.",
  },
  {
    q: "Do I need to be at home?",
    a: "Not always. Tell us how you would like to handle access when you book and we will agree it with you before the day.",
  },
];

export const categories = [
  "Cleaning Tips",
  "Home Care",
  "Short-Let & Airbnb",
  "Property Care",
  "Business",
] as const;
export type Category = (typeof categories)[number];
