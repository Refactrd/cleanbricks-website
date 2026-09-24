export type Img = { src: string; width: number; height: number; alt: string };

const p = (name: string, width: number, height: number, alt: string): Img => ({
  src: `/images/photography/${name}`,
  width,
  height,
  alt,
});

export const photos = {
  cleanerCounter: p("cleaner-marble-counter-portrait.webp", 1024, 1536, "A CleanBricks cleaner wiping a marble kitchen counter in a bright apartment"),
  cleanerBed: p("cleaner-bed-turndown-portrait.webp", 1024, 1536, "A CleanBricks cleaner smoothing fresh linen on a made bed"),
  cleanerHob: p("cleaner-kitchen-hob-portrait.webp", 1024, 1536, "A CleanBricks cleaner cleaning around a kitchen hob"),
  cleanerBathroom: p("cleaner-bathroom-sink-portrait.webp", 1024, 1536, "A CleanBricks cleaner wiping a bathroom vanity"),
  cleanerCaddy: p("cleaner-carrying-caddy-portrait.webp", 1024, 1536, "A CleanBricks cleaner arriving with a cleaning caddy"),
  cleanerWindow: p("cleaner-window-city-skyline-square.webp", 1254, 1254, "A CleanBricks cleaner polishing a window with a city skyline behind"),
  cleanerLinen: p("cleaner-fresh-bed-linen-square.webp", 1254, 1254, "A CleanBricks cleaner preparing a bed with fresh linen"),
  teamBreak: p("cleaners-taking-a-break-square.webp", 1254, 1254, "Two CleanBricks cleaners chatting between jobs"),
  homeownerRelaxing: p("homeowner-relaxing-living-room-square.webp", 1254, 1254, "A homeowner relaxing in a clean living room while a cleaner finishes up"),
  homeownerArriving: p("homeowner-arriving-home-square.webp", 1254, 1254, "A homeowner arriving home to a freshly cleaned living room"),
  livingRoomDusting: p("cleaner-dusting-sofa-living-room-wide.webp", 1672, 941, "A CleanBricks cleaner dusting a sofa while a colleague vacuums"),
  livingRoomWiping: p("cleaner-wiping-coffee-table-living-room-wide.webp", 1774, 887, "A CleanBricks cleaner wiping a coffee table in a bright living room"),
  livingRoomEmpty: p("living-room-city-view-wide.webp", 1774, 887, "A bright, freshly cleaned living room with a city view"),
  bedroom: p("cleaner-making-bed-bedroom-wide.webp", 1774, 887, "A CleanBricks cleaner making a bed in a light, airy bedroom"),
  office: p("cleaners-open-plan-office-wide.webp", 1774, 887, "CleanBricks cleaners at work in a modern open-plan office"),
  teamDesk: p("team-of-three-office-desk-wide.webp", 1774, 887, "Three CleanBricks cleaners in uniform with their equipment"),
  teamLiving: p("team-of-three-living-room-wide.webp", 1774, 887, "Three CleanBricks cleaners in an apartment living room"),
};

export const logos = {
  horizontal: { src: "/images/logos/cleanbricks-logo-horizontal.webp", width: 2172, height: 724 },
  horizontalWhite: { src: "/images/logos/cleanbricks-logo-horizontal-white.webp", width: 2172, height: 724 },
  stacked: { src: "/images/logos/cleanbricks-logo-stacked.webp", width: 1536, height: 1024 },
  icon: { src: "/images/logos/cleanbricks-app-icon.webp", width: 1254, height: 1254 },
};
