# CLAUDE.md

# CleanBricks Website

You are working on the official website for **CleanBricks**, a modern cleaning and property-care company launching in Lagos, Nigeria.

Your job is to build a polished, production-ready website that feels like a real modern brand, not a generic cleaning-company template.

The website must closely follow the provided design references while adapting the visual language, content, colours, typography, imagery and brand personality to CleanBricks.

---

# 1. PROJECT OVERVIEW

## Brand

**Name:** CleanBricks

**Category:** Cleaning & Property Care

**Launch Market:** Lagos, Nigeria

**Brand Position:**

Modern, reliable cleaning and property-care company.

## Brand Essence

**Cleaner spaces. Better living.**

## Brand Promise

**We make spaces feel clean, fresh and ready.**

CleanBricks provides professional cleaning services for:

- Homes
- Offices
- Short-let properties
- Airbnb spaces
- Businesses

The company starts with cleaning but is designed to grow into a broader property-care and home-services brand.

Future areas may include:

- Property care
- Facility services
- Property maintenance
- Home services
- Estate services
- Commercial facility services

Do not position CleanBricks as a temporary or generic cleaning company.

The website should establish CleanBricks as a modern property-care brand that starts with professional cleaning.

---

# 2. BRAND PERSONALITY

Every part of the website should feel:

- Clean
- Human
- Modern
- Reliable
- Fresh
- Confident
- Approachable
- Professional
- Premium but accessible

The website should feel:

**Professional without feeling corporate.**

**Premium without feeling expensive.**

**Friendly without feeling childish.**

**Modern without feeling like a technology company.**

Never make the website feel:

- Cheap
- Cartoonish
- Old-fashioned
- Generic
- Overly corporate
- Excessively luxurious
- Like a construction company
- Like a traditional janitorial service

---

# 3. SOURCE OF TRUTH

Before writing code or making design decisions, inspect the project files.

There are three important sources of truth:

## 1. Brand Bible

The CleanBricks Brand Bible contains the approved brand strategy, positioning, voice, colours, typography, logo guidance, photography direction, messaging and website principles.

Treat it as the primary source of truth for the brand.

Do not invent brand guidelines that conflict with it.

## 2. Design Folder

Inspect the project's `design` folder before implementing the website.

The design folder contains the Figma/design reference images for the website.

These designs are the primary visual references for:

- Layout
- Section structure
- Spacing
- Typography hierarchy
- Card layouts
- Navigation
- Hero sections
- CTA sections
- Blog layouts
- Service layouts
- Contact layouts
- Footer structure
- Image placement
- Overall visual rhythm

Study the references carefully before implementing each page.

Do NOT blindly copy another brand's identity.

The references are for layout, interaction and visual direction.

Adapt them into the CleanBricks brand.

The final website must look like **CleanBricks**, not ClearNest, CleanHub or any other reference brand.

## 3. Media / Assets

Inspect the project's `media` folder and all relevant asset folders.

Look specifically for:

- CleanBricks logo
- CleanBricks app icon
- White logo
- Dark logo
- Brand imagery
- Photography
- Icons
- Illustrations
- Any approved graphics
- Any other CleanBricks-specific assets

Use the provided CleanBricks assets wherever appropriate.

Do not recreate or replace the approved logo.

Do not generate a new logo.

Do not use a random logo from the design references.

---

# 4. IMPORTANT: INSPECT FIRST

Before writing the first component:

1. Inspect the entire project structure.
2. Inspect the `design` folder.
3. Inspect the `media` folder.
4. Inspect the CleanBricks Brand Bible.
5. Identify all available CleanBricks logos and assets.
6. Review the design references page by page.
7. Identify reusable design patterns.
8. Identify which reference elements need to be adapted for CleanBricks.
9. Plan the component architecture.
10. Then begin implementation.

Do not start coding immediately without inspecting the available sources.

---

# 5. TECHNOLOGY STACK

Use:

- Next.js
- TypeScript
- Tailwind CSS

Use the latest stable project-compatible versions already configured in the repository unless there is a specific reason to change them.

Prefer the Next.js App Router.

Use TypeScript throughout the project.

Do not introduce unnecessary frameworks or dependencies.

Keep the implementation clean and maintainable.

---

# 6. DESIGN SYSTEM

## Colour Palette

Only use the approved CleanBricks colour palette.

### Primary Green

```text
#10B981

Use as the dominant brand colour.

Represents:

Freshness
Growth
Cleanliness
Energy
Care
Secondary Green
#84CC16

Use as a supporting accent.

Accent Yellow
#F59E0B

Use sparingly for warmth, highlights and emphasis.

Light Mint
#E3F5E9

Use for:

Backgrounds
Cards
Sections
Subtle highlights
Supporting surfaces
Charcoal
#1F2937

Use primarily for:

Headlines
Body text
Navigation
Important information
Off White
#F8FAF7

Use as a soft neutral background.

7. COLOUR RULES

Green should dominate the visual system.

Lime should support.

Yellow should be used as an accent.

Mint and off-white should create breathing room.

Charcoal should provide contrast and readability.

Do not introduce random colours.

Do not create a rainbow-like interface.

Do not use excessive gradients.

Do not overload sections with green.

Use colour intentionally.

8. TYPOGRAPHY

CleanBricks has two approved typefaces.

Primary Typeface

ABC Diatype

Use for:

Hero headlines
Major headlines
Campaign headlines
Large statements
Large numbers
Marketing messages
High-impact CTAs
Brand-led communication

ABC Diatype provides the personality of the brand.

Secondary Typeface

GT Walsheim

Use for:

Body text
Navigation
Supporting text
Service descriptions
Forms
UI elements
Longer paragraphs

GT Walsheim provides readability and warmth.

Critical Typography Rule

Do NOT use:

Inter
Manrope
Random Google Fonts
Other replacement fonts

Unless the actual approved font files are available in the project, inspect the available assets and implement the correct font-loading strategy.

Do not silently substitute the CleanBricks typography system with another font.

9. LOGO

Use the approved CleanBricks logo from the project's media/assets.

The CleanBricks symbol represents:

Home
Nature
Freshness
Care
Light

The logo must not be:

Stretched
Squashed
Rotated
Redesigned
Recoloured arbitrarily
Given a shadow
Given an outline
Given unnecessary effects
Combined with an unapproved slogan

Use the correct logo variant depending on the background.

Maintain sufficient clear space around the logo.

10. PHOTOGRAPHY

Photography should feel:

Real
Bright
Warm
Clean
Human

Prioritise:

Real homes
Modern apartments
Well-lit interiors
Clean kitchens
Clean bathrooms
Comfortable living spaces
Professional cleaners
Human interactions
Before-and-after transformations
Property details

Avoid:

Obvious stock photography
Overly staged corporate photography
Unrealistically spotless environments
Excessively luxurious homes
Generic cleaning stock imagery
Images dominated by cleaning equipment

The space should be the hero.

When CleanBricks assets exist, prefer them over generic external images.

11. DESIGN REFERENCE RULE

The attached reference designs should guide the structure and visual quality of the website.

Study them carefully.

Take inspiration from:

Their spacing
Grid systems
Typography hierarchy
Section composition
Image treatment
Card layouts
Navigation
CTA placement
Footer structure
Page rhythm
Responsive behaviour
Editorial layouts
Service presentation

Do NOT copy:

Their logos
Their brand colours
Their brand names
Their fake statistics
Their fake testimonials
Their fictional team members
Their contact information
Their addresses
Their company claims
Their exact copy
Their visual identity

Borrow principles, not identities.

The final implementation must feel unmistakably like CleanBricks.

12. WEBSITE PAGES

Build the website around the following pages:

Home
Services
Residential Cleaning
Short-Let / Airbnb Cleaning
Commercial Cleaning
About
How It Works
FAQs
Journal / Blog
Single Blog Post
Contact
Book a Cleaning

Create reusable components wherever appropriate.

13. HOME PAGE

The Home page must communicate within seconds:

What CleanBricks does.
Who it serves.
Why customers should trust it.
How to book.

The core messaging direction is:

Hero

A cleaner space starts here.

Supporting message:

Professional cleaning for homes, offices, short-lets and businesses across Lagos.

Primary CTA:

Book a Cleaning

Secondary CTA:

Explore Services

The copy should feel natural, concise and human.

Do not use exaggerated claims.

14. SERVICES

CleanBricks services include:

Residential Cleaning

Regular home cleaning, deep cleaning, move-in, move-out, one-off and recurring cleaning.

Deep Cleaning

Detailed cleaning for spaces that need more time and attention.

Move-In Cleaning

Cleaning a space before moving in.

Move-Out Cleaning

Preparing a property after moving out.

Short-Let & Airbnb Cleaning

Guest turnover cleaning, apartment resets, basic room preparation, linen support, restocking support and pre-arrival cleaning.

Commercial Cleaning

Office cleaning, retail spaces, studios, small business premises and common areas.

Keep service descriptions short and customer-focused.

15. ABOUT PAGE

The About page should communicate:

Why CleanBricks exists
The brand story
Mission
Values
Long-term ambition
The people behind the brand

Core idea:

Clean spaces make life better.

The story should feel human.

Do not write corporate "About Us" filler.

16. HOW IT WORKS

Use a simple process:

01

Tell us what you need.

02

Pick a convenient time.

03

We get to work.

04

Enjoy the difference.

The journey should feel simple:

Discover → Enquire → Book → Confirm → Clean → Review → Return

17. CONTACT PAGE

The Contact page should make it very easy for users to reach CleanBricks.

Include:

Phone
WhatsApp where available
Email
Location
Working hours if confirmed
Contact form
Service selector
Preferred date
Location
Message

Do not invent contact information.

Use placeholders if the real information is not yet available.

18. BOOKING EXPERIENCE

The booking journey should feel simple.

The user should not have to fight through a complicated form.

Collect only information necessary to start the booking.

Potential fields:

Name
Phone
Email
Service
Property type
Location
Preferred date
Frequency
Additional information

Make the CTA obvious.

Use:

Request a Booking

or

Book a Cleaning

depending on the final booking flow.

19. BLOG / JOURNAL

The blog should feel editorial and useful.

Content categories may include:

Cleaning Tips
Home Care
Short-Let & Airbnb
Property Care
Business

Use real, useful article titles.

Avoid generic SEO spam.

Examples:

How to Keep Your Home Fresh Between Professional Cleans
How Often Should You Deep Clean Your Home?
Getting Your Airbnb Ready for the Next Guest
7 Small Cleaning Habits That Save You Time
Preparing Your Office for a Fresh Start
20. COPY STYLE

Write in British English.

The copy must be:

Clear
Short
Natural
Human
Warm
Confident
Professional

Use:

Short sentences
Simple words
Active voice
Clear CTAs
Natural expressions

Avoid:

Corporate jargon
Buzzwords
Long sentences
Empty marketing language
Aggressive sales language
Excessive exclamation marks
Fake statistics
Generic AI-sounding copy

Write like a professional who genuinely wants to help.

The tone should feel like:

"We know cleaning can be a lot. Let us take care of it."

Not:

"We provide comprehensive, world-class cleaning solutions tailored to our esteemed clientele."

21. NO FAKE CLAIMS

This is extremely important.

Never invent:

Number of customers
Years of experience
Reviews
Ratings
Guarantees
Certifications
Insurance claims
Team members
Offices
Addresses
Service coverage
Testimonials
Statistics
Partnerships
Awards

If the design reference contains something that CleanBricks has not provided, do not copy it.

Use a visually appropriate placeholder or remove the element.

22. ANIMATION & INTERACTION

The website should feel polished and modern.

Animations should enhance the experience rather than distract from the content.

Use subtle animations for:

Page entrances
Hero elements
Section reveals
Cards
Images
Buttons
Navigation
Mobile menu
Hover states
CTA interactions

Animations should feel:

Smooth
Natural
Premium
Fast
Intentional

Avoid:

Excessive bouncing
Random animations
Slow page transitions
Large distracting movement
Animation on every element
Anything that hurts usability

Prefer subtle movement with appropriate easing.

Respect:

prefers-reduced-motion

Users who prefer reduced motion should receive an accessible experience without unnecessary animation.

23. NAVBAR

The navbar must be fixed/sticky while scrolling.

It must NOT block content.

Implement the navbar carefully so that:

It remains visible while scrolling.
It has an appropriate background treatment.
Content never disappears underneath it.
Sections have enough scroll offset.
Anchor navigation accounts for navbar height.
It works correctly across desktop and mobile.
It remains readable over different backgrounds.

Use an appropriate sticky/fixed implementation rather than simply placing it over the page.

The navbar should subtly animate when the user scrolls.

For example:

Slight background transition
Backdrop blur where appropriate
Shadow or border transition
Compact height transition if it fits the design
Smooth visual state change

Do not make the navbar unnecessarily large.

24. MOBILE NAVIGATION

The mobile navbar needs a thoughtful animation.

The mobile menu should:

Open smoothly.
Close smoothly.
Animate the menu icon.
Prevent accidental background interaction.
Keep navigation readable.
Work correctly with keyboard navigation.
Trap focus appropriately when necessary.
Close when a navigation item is selected.
Close when the user presses Escape.

The mobile menu should feel like part of the brand experience.

Do not use a basic unstyled dropdown.

25. RESPONSIVE DESIGN

The website must be fully responsive.

Design for:

Large desktop
Desktop
Tablet
Mobile

Do not simply shrink the desktop design.

Adapt layouts intelligently.

Pay special attention to:

Hero sections
Navigation
Service grids
CTA sections
Blog cards
Forms
Images
Footer
Typography
Spacing

Mobile should feel intentionally designed.

26. ACCESSIBILITY

Accessibility is a requirement, not an optional improvement.

Implement:

Semantic HTML
Correct heading hierarchy
Accessible buttons
Accessible links
Keyboard navigation
Visible focus states
Proper form labels
Useful form error messages
Sufficient colour contrast
Alt text for meaningful images
Decorative image handling
Reduced motion support
Accessible mobile navigation

Do not rely on colour alone to communicate meaning.

27. SEO

Implement strong technical SEO.

Every page should have:

Unique title
Unique meta description
Correct heading hierarchy
Canonical URL where appropriate
Open Graph metadata
Twitter/social metadata where appropriate
Semantic HTML
Descriptive URLs

Add appropriate structured data where useful.

For a local cleaning business, consider appropriate LocalBusiness / service-related structured data, but do not invent business information.

28. PERFORMANCE

Performance is a major requirement.

Optimise for:

Fast initial load
Optimised images
Proper image sizing
Lazy loading where appropriate
Minimal JavaScript
Code splitting
Efficient animations
Good Core Web Vitals
Avoiding layout shift

Use Next.js image optimisation where appropriate.

Do not load massive images when smaller assets are available.

Avoid unnecessary dependencies.

Do not use heavy animation libraries unless genuinely necessary.

29. COMPONENT ARCHITECTURE

Create reusable components.

Potential components include:

Navbar
MobileMenu
Footer
Button
SectionHeading
Hero
ServiceCard
ServiceGrid
TestimonialCard
BlogCard
BlogGrid
CTASection
ContactForm
BookingForm
FAQAccordion
ProcessStep
StatCard
Container

Do not duplicate large blocks of JSX unnecessarily.

Keep components readable and focused.

30. CODE QUALITY

Use clean TypeScript.

Avoid:

any unless absolutely necessary
Massive components
Repeated code
Hardcoded repeated values
Unnecessary state
Unnecessary client components
Poor accessibility
Console errors
Unused imports
Dead code

Prefer server components by default where possible.

Only use "use client" when client-side interactivity actually requires it.

31. DATA & CONTENT

Keep repeated content structured where appropriate.

For example, service data can be represented as structured objects and mapped into reusable components.

Do not hardcode the same content in multiple places unless there is a good reason.

This will make future content updates easier.

32. ICONS

Use a consistent icon system.

Icons should be:

Simple
Rounded
Minimal
Geometric
Friendly
Easy to understand

Avoid overly detailed icons.

Avoid generic cleaning icons as the main visual identity.

The CleanBricks logo should remain the primary visual identifier.

33. DESIGN DETAILS

Pay attention to:

Border radius
Card proportions
Grid alignment
Image cropping
Section spacing
Button height
Button radius
Typography scale
Line height
Letter spacing
Visual hierarchy
Hover states
Focus states
Mobile spacing

Do not make everything rounded just because it is a modern website.

Follow the design references and CleanBricks visual language.

34. SPACING

The website should feel spacious.

Use generous whitespace.

Do not overcrowd sections.

Content should breathe.

The overall feeling should be:

Clean. Spacious. Structured. Modern. Human.

35. CTA PRINCIPLES

CTAs should be clear and direct.

Preferred CTAs:

Book a Cleaning
Explore Services
Get a Quote
Talk to Us
Request a Booking
Contact Us
Learn More

Avoid aggressive CTAs like:

BUY NOW
ACT NOW
DON'T MISS OUT
CLAIM YOUR OFFER

CleanBricks should feel confident, not pushy.

36. BRAND MESSAGING

Core message:

Clean spaces make life better.

Supporting messages:

Convenience

You do not have to spend your day cleaning.

Quality

A proper clean should feel like a proper clean.

Trust

Your space deserves people you can trust.

Professionalism

Cleaning is a service. It should be treated professionally.

Experience

The goal is not just a clean space.

It is the feeling that comes after.

37. IMPORTANT DESIGN PRINCIPLE

Do not build a generic cleaning website.

The website must feel like a modern Nigerian brand.

CleanBricks is launching in Lagos.

Where appropriate, reflect the local market naturally through:

Language
Service structure
Locations
Booking experience
Customer needs
Property types
Short-let/Airbnb context

Do not force Nigerian references into every section.

Keep the website globally polished while remaining relevant to Lagos.

38. DO NOT OVERDESIGN

The goal is not to demonstrate how many animations or effects can be added.

The goal is to create a website people enjoy using.

Prioritise:

Brand consistency
Customer clarity
Professionalism
Distinctiveness
Simplicity

If an effect does not improve the experience, remove it.

If a section does not help the customer understand or trust CleanBricks, reconsider it.

39. FINAL QUALITY CHECK

Before considering the website complete, verify:

Brand
 Correct CleanBricks logo
 Correct brand colours
 ABC Diatype used appropriately
 GT Walsheim used appropriately
 No unapproved fonts
 No invented brand claims
 CleanBricks feels distinct from reference brands
Design
 Design references have been studied
 Layouts closely follow the intended visual direction
 Good whitespace
 Strong typography hierarchy
 Consistent cards
 Consistent buttons
 Strong image treatment
 Responsive layouts
Navigation
 Fixed/sticky navbar
 Navbar never blocks content
 Correct scroll offset
 Animated scroll state
 Animated mobile menu
 Escape closes mobile menu
 Keyboard accessible
Animation
 Smooth entrance animations
 Subtle hover states
 Smooth mobile menu
 Smooth navbar behaviour
 No excessive animation
 Reduced motion supported
Accessibility
 Semantic HTML
 Keyboard accessible
 Focus states
 Proper labels
 Alt text
 Good colour contrast
 Reduced motion support
Performance
 Images optimised
 No unnecessary dependencies
 Minimal client-side JavaScript
 No unnecessary re-renders
 No layout shift
 Good Core Web Vitals
SEO
 Page titles
 Meta descriptions
 Open Graph metadata
 Semantic headings
 Clean URLs
 Structured data where appropriate
Code
 TypeScript
 No unnecessary any
 Reusable components
 No duplicated large components
 No unused code
 No console errors
 Production build succeeds
40. WORKING PRINCIPLE

When making a design decision, ask:

Does this feel like CleanBricks?

If the answer is no, reconsider it.

The website should communicate:

Cleaner spaces. Better living.

It should make a potential customer feel:

"These people understand what I need."

And after interacting with the website, the customer experience should feel:

"That was easy."

Build the website with that principle at the centre of every decision.