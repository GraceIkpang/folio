/*
 * All of the site's words and images live here. To change text, add a
 * project or swap a photo, edit this file — the components read from it.
 */

export const profile = {
  name: "Grace Ikpang",
  tagline: "Product Designer · 3+ years designing experiences",
  city: "Abuja",
  timeZone: "Africa/Lagos",
  email: "graceikpang@gmail.com",
  /** Lives in public/ — replace that file to update the resume. */
  resume: "/grace-ikpang-resume.pdf",
  headline: "I design and ship products that people actually love to use.",
  bio: [
    "Hi, I’m Grace. I work across product design, design systems, and interaction design. I like making things feel clear, easy to use, and a little more thoughtful.",
    "Currently exploring how the things I design move, respond, and come to life in the intersection between design and engineering.",
  ],
};

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/graceikpang" },
  { label: "X", href: "https://x.com/grayycee_" },
  { label: "Dribbble", href: "https://dribbble.com/Grace_Ikpang" },
  { label: "GitHub", href: "https://github.com/GraceIkpang" },
];

export const navigation = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "#contact" },
];

export type Project = {
  name: string;
  description: string;
  image: string;
  /** The first tag is shown highlighted in pink. */
  tags: string[];
  /** Add a link to make the whole card clickable. */
  href?: string;
};

export const projects: Project[] = [
  {
    name: "SureChargeX",
    description:
      "Find EV charging stations, book a session, and charge. All from one app.",
    image: "/images/work/surechargex.png",
    tags: ["Product design", "Web", "Mobile"],
    href: "/work/surechargex",
  },
  {
    name: "Algol Solutions",
    description:
      "A company website for a tech consulting startup to introduce the company and its services.",
    image: "/images/work/algol-solutions.png",
    tags: ["Product design", "Web"],
    href: "/work/algol-solutions",
  },
  {
    name: "Urban Women",
    description:
      "Website design for a nonprofit organisation, sharing their mission and work.",
    image: "/images/work/urban-women.png",
    tags: ["Product design", "Web"],
    href: "/work/urban-women",
  },
  {
    name: "KIPA",
    description:
      "A mobile experience that brings escrow payments and errand services together.",
    image: "/images/work/kipa.png",
    tags: ["Product design", "Mobile"],
    href: "/work/kipa",
  },
];

export type LiveProduct = {
  name: string;
  summary: string;
  platform: string;
  /** Link to this product's case study page, e.g. "/work/surechargex". */
  caseStudy?: string;
  /** Link to the live product (opens in a new tab). Used if there's no case study. */
  href?: string;
};

export const workPage = {
  headline: "Six products, live, in the hands of real users.",
  intro:
    "A selection of websites and apps I’ve designed to make everyday tasks easier. Different challenges, with the same care for clarity, usability, and the details.",
};

export const liveProducts: LiveProduct[] = [
  { name: "SureChargeX", summary: "Find stations, book sessions, and charge.", platform: "Web & Mobile", caseStudy: "/work/surechargex" },
  { name: "Algol Solutions", summary: "A digital home for tech consulting.", platform: "Web", caseStudy: "/work/algol-solutions" },
  { name: "Kipa", summary: "Escrow payments and errands, one app.", platform: "Mobile", caseStudy: "/work/kipa" },
  { name: "AshAudit", summary: "GPS-accurate site audits, online or offline.", platform: "Web & Mobile", caseStudy: "/work/ashaudit" },
  { name: "AshGridX", summary: "Track electricity usage and recharge instantly.", platform: "Web & Mobile", caseStudy: "/work/ashgridx" },
  { name: "Urban Women", summary: "A nonprofit’s mission brought to life.", platform: "Web", caseStudy: "/work/urban-women" },
  { name: "AshGridX Workspace", summary: "The console behind SureChargeX, AshAudit, and AshGridX.", platform: "Web", caseStudy: "/work/ashgridx-workspace" },
];

/** A card in the homepage "Selected work" carousel. Images are 8:7 (828 × 724). */
export type SelectedWork = {
  name: string;
  tagline: string;
  image: string;
  /** Link to the project's case study. */
  href?: string;
};

export const selectedWork: SelectedWork[] = [
  {
    name: "SureChargeX",
    tagline: "Find stations, book sessions, and charge.",
    image: "/images/carousel/surechargex.png",
    href: "/work/surechargex",
  },
  {
    name: "KIPA",
    tagline: "Escrow payments and errands, one app.",
    image: "/images/carousel/kipa.png",
    href: "/work/kipa",
  },
  {
    name: "Algol Solutions",
    tagline: "A digital home for tech consulting.",
    image: "/images/carousel/algol-solutions.png",
    href: "/work/algol-solutions",
  },
  {
    name: "Urban Women",
    tagline: "A nonprofit’s mission brought to life.",
    image: "/images/carousel/urban-women.png",
    href: "/work/urban-women",
  },
];

export type Screen = {
  /** Path inside public/, e.g. "/images/explorations/dashboard-ui/01.png" */
  src: string;
  /** The image's real size in pixels. */
  width: number;
  height: number;
  alt: string;
};

export type Shot = {
  /** Used in the web address: /explorations/<slug> */
  slug: string;
  name: string;
  /** The small preview shown on the cards. */
  image: string;
  summary: string;
  tags: string[];
  /** Full designs shown on the shot's own page. Empty = "coming soon". */
  screens: Screen[];
};

export const shots: Shot[] = [
  {
    slug: "command-palette",
    name: "Command Pallete",
    image: "/images/shots/command-palette.png",
    summary:
      "A quick-search command palette for jumping between documents, people, and actions.",
    tags: ["Interaction design", "Web"],
    screens: [
      {
        src: "/images/explorations/command-palette/01.png",
        width: 1644,
        height: 1169,
        alt: "A command palette open over a pink landscape wallpaper, searching “Q3 roadmap”, with results grouped into documents, people and projects, messages, and actions.",
      },
    ],
  },
  {
    slug: "private-banking",
    name: "Private Banking",
    image: "/images/shots/private-banking.png",
    summary: "A calm, at-a-glance home screen for a private banking app.",
    tags: ["UI design", "Mobile"],
    screens: [
      {
        src: "/images/explorations/private-banking/01.png",
        width: 1644,
        height: 1169,
        alt: "The Mono banking app home screen: a ₦167,940 total balance, quick actions to send and add money, and a list of recent transactions.",
      },
    ],
  },
  {
    slug: "booking-details",
    name: "Booking Details",
    image: "/images/shots/booking-details.png",
    summary: "A booking page for a villa stay that lets the photography lead.",
    tags: ["UI design", "Web"],
    screens: [
      {
        src: "/images/explorations/booking-details/01.png",
        width: 1644,
        height: 2770,
        alt: "A booking page for Casa Oliva, a villa among the vineyards: a hero photo, villa details, a photo gallery, what the villa offers, and a reservation panel totalling $3,140.",
      },
    ],
  },
  {
    slug: "dashboard-ui",
    name: "Dashboard UI",
    image: "/images/shots/dashboard-ui.png",
    summary: "An analytics dashboard for tracking revenue, users, and top pages.",
    tags: ["Dashboard", "Web"],
    screens: [
      {
        src: "/images/explorations/dashboard-ui/01.png",
        width: 1644,
        height: 1169,
        alt: "The Pulse analytics dashboard: revenue, active users, conversion and churn figures, a monthly revenue bar chart, top pages, and recent events.",
      },
    ],
  },
];

/** Snapshots without an image show a pink-to-dark placeholder. */
export type Snapshot = { caption: string; image?: string };

export const snapshots: Snapshot[] = [
  { caption: "cocktail, evening", image: "/images/snapshots/01.png" },
  { caption: "pink, workspace", image: "/images/snapshots/02.png" },
  { caption: "mirror, me", image: "/images/snapshots/03.png" },
  { caption: "cooking, figma", image: "/images/snapshots/04.png" },
  { caption: "desk setup" },
  { caption: "friends" },
  { caption: "city lights" },
  { caption: "plants" },
];

export type Role = {
  year: string;
  title: string;
  company: string;
  location: string;
};

export const experience: Role[] = [
  {
    year: "2026",
    title: "Product Designer",
    company: "Algol Solutions",
    location: "Manhattan, NY (Remote)",
  },
  {
    year: "2025",
    title: "Product Designer",
    company: "Interdigital Data Networks",
    location: "Abuja, NG (Hybrid)",
  },
  {
    year: "2023",
    title: "Product Designer",
    company: "Ashipa Electric Limited",
    location: "Abuja, NG (Remote)",
  },
  {
    year: "2023",
    title: "Junior Product Designer",
    company: "Karisimbi Tech",
    location: "Kigali, Rwanda (Remote)",
  },
];
