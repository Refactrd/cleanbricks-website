import type { SVGProps } from "react";

const paths = {
  home: <path d="M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1z" />,
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="m11 12 8-8m-3 3 2.5 2.5M14 9l2 2" />
    </>
  ),
  building: (
    <>
      <path d="M5 20V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v15M15 10h3a1 1 0 0 1 1 1v9M3 20h18" />
      <path d="M9 8h2M9 12h2M9 16h2" />
    </>
  ),
  sparkle: <path d="M12 3.5c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7ZM19 16.5v3M17.5 18h3" />,
  phone: <path d="M6.5 4h3l1.5 4-2 1.5a10 10 0 0 0 5.5 5.5L16 13l4 1.5v3a2 2 0 0 1-2 2A14 14 0 0 1 4.500 6a2 2 0 0 1 2-2Z" />,
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m4.5 7.5 7.500 5.500 7.500-5.500" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6.500-5.700 6.500-11a6.500 6.500 0 0 0-13 0C5.500 15.300 12 21 12 21Z" />
      <circle cx="12" cy="10" r="2.300" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.500" />
      <path d="M12 7.500V12l3 2" />
    </>
  ),
  chat: <path d="M5 5.500h14a1.500 1.500 0 0 1 1.500 1.500v8.500a1.500 1.500 0 0 1-1.500 1.500h-7l-4.500 3v-3H5A1.500 1.500 0 0 1 3.500 15.500V7A1.500 1.500 0 0 1 5 5.500Z" />,
  arrow: <path d="M5 12h14m-5.500-5.500L19 12l-5.500 5.500" />,
  check: <path d="m5 12.500 4.500 4.500L19 7.500" />,
  plus: <path d="M12 5v14M5 12h14" />,
  calendar: (
    <>
      <rect x="4" y="5.500" width="16" height="14" rx="2.500" />
      <path d="M8 3.500v4M16 3.500v4M4 10h16" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

type Props = SVGProps<SVGSVGElement> & { name: IconName };

/** Rounded, minimal line icons (Brand Bible §17). Decorative by default. */
export function Icon({ name, className = "size-6", ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
