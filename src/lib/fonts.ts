import localFont from "next/font/local";

/**
 * GT Walsheim — secondary typeface (body, navigation, UI).
 * NOTE: these are the *trial* cuts supplied with the project. Swap for the
 * licensed files in src/fonts before launch.
 */
export const walsheim = localFont({
  src: [
    { path: "../fonts/GTWalsheim-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/GTWalsheim-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/GTWalsheim-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/GTWalsheim-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-walsheim",
  display: "swap",
});

/**
 * ABC Diatype — primary display typeface.
 * TODO: no ABC Diatype files exist in the project yet. When licensed files are
 * added to src/fonts, load them here with localFont({ variable: "--font-diatype" }),
 * add its variable to the <html> className in the root layout, and put
 * var(--font-diatype) first in --font-display (globals.css). Until then display
 * text falls back to GT Walsheim.
 */
