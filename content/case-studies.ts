/*
 * Case studies. Each one becomes a page at /work/<slug>.
 * The page is built from `blocks`, top to bottom — add, remove or reorder
 * them to change the page.
 */

type Image = {
  /** Path inside public/ */
  src: string;
  /** The image file's real size in pixels. */
  width: number;
  height: number;
  /** The size it should appear on the page, in pixels. */
  displayWidth: number;
  alt: string;
};

/** Small grey text under an image, on the left and (optionally) right. */
type Caption = { start: string; end?: string };

type Subsection = { title: string; paragraphs: string[] };

export type CaseStudyBlock = (
  | {
      type: "section";
      title: string;
      paragraphs: string[];
      /** Smaller headed parts inside the section, after the paragraphs. */
      subsections?: Subsection[];
      /** Tighter space between paragraphs. */
      compact?: boolean;
      /** Grey, slightly smaller intro text instead of body text. */
      muted?: boolean;
    }
  | {
      type: "highlight";
      value: string;
      text: string;
      /** Let the value wrap onto two short lines, e.g. "2 core / services". */
      wrap?: boolean;
    }
  | {
      type: "image";
      image: Image;
      caption?: Caption;
      /** Leave extra breathing room below the image. */
      extraSpaceBelow?: boolean;
    }
  /** Images side by side; `size` sets each one's share of the width. */
  | {
      type: "gallery";
      items: {
        image: Image;
        caption: Caption;
        size: number;
        /** Extra transparent space in the image on each side, as a share of
            the visible part (e.g. 0.25), so the visible part fills the column. */
        bleed?: number;
      }[];
    }
  /** A line of text with a link on the right, between two dividers.
      Hidden until `href` is filled in. */
  | { type: "link"; text: string; label: string; href?: string }
  | { type: "quote"; text: string }
  /** A tilted, pinned photo. The caption is part of the image. */
  | { type: "polaroid"; image: Image; caption: string }
) & {
  /** Override the space above this block, in pixels. */
  spaceAbove?: number;
};

export type CaseStudy = {
  slug: string;
  name: string;
  year: string;
  category: string;
  summary: string;
  facts: { label: string; value: string }[];
  status: string;
  website?: string;
  hero: Image;
  heroCaption?: Caption;
  blocks: CaseStudyBlock[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "surechargex",
    name: "SureChargeX",
    year: "2026",
    category: "Product design · EV Charging",
    summary:
      "Helping EV drivers find a charging station, book a session, and manage their charge in one app.",
    facts: [
      { label: "Role", value: "Product designer" },
      { label: "Timeline", value: "6 months" },
      { label: "Platform", value: "Mobile & Web" },
    ],
    status: "Live",
    website: "https://surecharge.us/",
    hero: {
      src: "/images/case-studies/surechargex/hero.png",
      width: 1328,
      height: 664,
      displayWidth: 664,
      alt: "The SureChargeX website on a laptop, with the app’s station list on a phone beside it.",
    },
    blocks: [
      {
        type: "section",
        title: "Problem",
        compact: true,
        paragraphs: [
          "Finding a charging station is only the beginning. Drivers also need to check station details, book a session, pay, and follow their charging progress.",
          "The challenge was to connect these steps in a clear journey, from finding a charger to getting back on the road. The experience also needed to support cancellations, booking changes, and repeat visits.",
        ],
      },
      {
        type: "highlight",
        value: "2 platforms",
        text: "A mobile app for finding, booking, and managing charging sessions, supported by a website that introduces the service and showcases charging stations.",
      },
      {
        type: "section",
        title: "Role",
        paragraphs: [
          "I designed the SureChargeX mobile app and website. The app covered onboarding, station discovery, booking, payments, and charging. I also designed supporting flows for vehicle details, saved stations, booking history, and help.",
          "For the website, I designed pages that explain the service, highlight its features, and guide visitors towards the app.",
        ],
      },
      {
        type: "image",
        image: {
          src: "/images/case-studies/surechargex/app-screens.png",
          width: 1328,
          height: 747,
          displayWidth: 664,
          alt: "Three app screens: navigating to a station, the map of stations near you, and a charging session for a KIA EV6.",
        },
      },
      {
        type: "quote",
        text: "Finding a charger is one step. The experience needs to carry you through the whole charge.",
      },
      {
        type: "section",
        title: "Solution",
        paragraphs: [
          "I organised the app around three connected tasks: find a station, book a session, and charge.",
          "Drivers can explore stations using map and list views, then narrow their options with search and filters. Station details lead into booking, payment selection, and confirmation. After booking, drivers can review upcoming sessions, manage cancellations, and access their booking history. Dedicated charging screens show how to start, monitor, stop, and complete a session.",
          "The wallet, payment history, saved stations, and vehicle details support future visits. On the website, feature highlights, station listings, FAQs, and a simple introduction explain how the service works before someone opens the app.",
        ],
      },
      {
        type: "polaroid",
        caption: "From choosing a station to completing a charge.",
        image: {
          src: "/images/case-studies/surechargex/charging-flow.png",
          width: 1463,
          height: 1168,
          // Exported at 3x, so it shows at a third of its pixel width.
          displayWidth: 488,
          alt: "The charging flow: a vehicle card for a KIA EV6 leading to a “Charging complete” screen, above a phone showing the car at 51%.",
        },
      },
      {
        type: "section",
        title: "Lessons",
        paragraphs: [
          "A charging experience needs care between the main steps as well as within them. Booking confirmations, cancellations, and completed sessions each need to make the next action clear.",
          "In a future iteration, I would test these transitions with drivers at a charging station. I would focus on whether instructions and status updates remain clear when their attention is split between the phone and the charger.",
        ],
      },
      {
        type: "link",
        text: "See the website in action.",
        label: "Visit SureChargeX",
        href: "https://surecharge.us/",
      },
    ],
  },
  {
    slug: "algol-solutions",
    name: "Algol Solutions",
    year: "2026",
    category: "Product design · Web",
    summary:
      "A company website for a tech consulting startup to introduce the company and its services.",
    facts: [
      { label: "Role", value: "Product designer" },
      { label: "Timeline", value: "1 month" },
      { label: "Platform", value: "Web" },
    ],
    status: "Live",
    website: "https://algolsolution.com/",
    hero: {
      src: "/images/case-studies/algol-solutions/hero.png",
      width: 1328,
      height: 664,
      displayWidth: 664,
      alt: "The Algol Solutions homepage on a desktop browser: “Empowering Businesses. Advancing Careers. Delivering Technology Solutions.”",
    },
    heroCaption: { start: "01 / The homepage", end: "Desktop" },
    blocks: [
      {
        type: "section",
        title: "Overview",
        paragraphs: [
          "Algol Solutions is a tech consulting startup. I designed its company website to introduce the business and present its services, giving visitors a clear starting point to learn about what the team offers.",
        ],
      },
      {
        type: "section",
        title: "The Website",
        muted: true,
        paragraphs: ["A closer look at the homepage and key sections."],
      },
      {
        type: "gallery",
        items: [
          {
            size: 446,
            image: {
              src: "/images/case-studies/algol-solutions/homepage-full.png",
              width: 892,
              height: 3103,
              displayWidth: 446,
              alt: "The full Algol Solutions homepage, from the hero through services, consultation, values and the call to action, down to the footer.",
            },
            caption: { start: "02 / A closer look" },
          },
          {
            size: 200,
            // Exported at 3x with transparent space either side of the card.
            bleed: 0.25,
            image: {
              src: "/images/case-studies/algol-solutions/mobile.png",
              width: 900,
              height: 1017,
              displayWidth: 300,
              alt: "The Algol Solutions homepage on a phone: “Connecting Talent, Technology, and Opportunity”.",
            },
            caption: { start: "03 / On a smaller screen" },
          },
        ],
      },
      {
        type: "link",
        text: "See the website in action.",
        label: "Visit Algol Solutions",
        href: "https://algolsolution.com/",
      },
    ],
  },
  {
    slug: "kipa",
    name: "KIPA",
    year: "2026",
    category: "Product design · Payments & logistics",
    summary:
      "Helping people pay with confidence and manage everyday deliveries in one app.",
    facts: [
      { label: "Role", value: "Product designer" },
      { label: "Timeline", value: "4 months" },
      { label: "Platform", value: "Mobile" },
    ],
    status: "Live",
    website: "https://getkipa.com/",
    hero: {
      src: "/images/case-studies/kipa/hero.png",
      width: 1328,
      height: 664,
      displayWidth: 664,
      alt: "Three KIPA app screens: the home screen with an available balance, the KIPA splash screen, and an errand request with a delivery route.",
    },
    blocks: [
      {
        type: "section",
        title: "Problem",
        compact: true,
        paragraphs: [
          "An online transaction involves more than making a payment. Buyers need confidence that their order will arrive as expected. Sellers need clarity about when they will receive their money. Arranging delivery adds another layer of coordination.",
          "KIPA brings payment protection and errand services into one product. Its design challenge is to make that relationship understandable: what happens to the money, what happens to the item, and what each person needs to do next.",
          "For someone booking an everyday errand, the priority is different. They need a direct way to request a rider and follow the task. Both experiences belong in the same app, but they should remain easy to distinguish.",
        ],
      },
      {
        type: "highlight",
        value: "2 core services",
        wrap: true,
        text: "Protected payments and on-demand errands, connected through one mobile experience.",
      },
      {
        type: "section",
        title: "Role",
        paragraphs: [
          "I designed KIPA’s mobile experience, bringing its escrow and errand services into a shared interface.",
          "The central design consideration was clarity. Payment protection introduces steps that people need to understand before committing money, while errand booking needs to feel straightforward and practical.",
        ],
      },
      {
        type: "section",
        title: "Design process",
        spaceAbove: 36,
        paragraphs: [
          "I approached the experience through two starting points: someone who wants to transact and someone who needs something picked up or delivered. Separating those intentions gave the flows a clearer purpose.",
          "For the payment journey, I focused on the moments where uncertainty could build. What does the buyer need to know before paying? What does the seller need to know while waiting? What happens when delivery is complete, or when something is wrong?",
          "I used those questions to think through the information needed at each stage, the action available to each person, and the confirmation that follows. The aim was to make the process understandable without making every screen carry every rule.",
        ],
      },
      {
        type: "image",
        image: {
          src: "/images/case-studies/kipa/design-process.png",
          width: 1328,
          height: 2990,
          displayWidth: 664,
          alt: "Three rows of KIPA screens: the buyer’s core screens for paying into protection, the seller’s core screens for creating a payment and tracking it, and the dispute screens for reporting a problem and following it with support.",
        },
      },
      {
        type: "quote",
        text: "People should know where their money stands, not have to guess.",
      },
      {
        type: "section",
        title: "Solution",
        paragraphs: [],
        subsections: [
          {
            title: "Make payment protection understandable",
            paragraphs: [
              "Kipa Protect holds payment until delivery is confirmed. That makes the distinction between paying and releasing funds central to the experience.",
              "A clear interface needs to explain what the current payment status means and what must happen before it changes. Reassuring language alone is not enough when someone is deciding whether to commit money.",
            ],
          },
          {
            title: "Keep the delivery journey visible",
            paragraphs: [
              "KIPA supports rider booking for deliveries, pickups, and errands, alongside delivery tracking. These features help connect a request to the activity happening beyond the screen.",
              "The design story is about maintaining continuity. Once a task has been requested, people still need context about its progress and completion.",
            ],
          },
          {
            title: "Make room for problems",
            paragraphs: [
              "The product also provides dispute support. Confirmation and dispute actions carry different consequences, so their meaning needs to be clear before someone chooses. This is an important part of the case study: the experience should account for a transaction that needs attention as well as one that finishes successfully.",
            ],
          },
        ],
      },
      {
        type: "image",
        spaceAbove: 56,
        extraSpaceBelow: true,
        image: {
          src: "/images/case-studies/kipa/payment-states.png",
          width: 1328,
          height: 2315,
          displayWidth: 664,
          alt: "Three steps of a protected payment. 01, Protection you can see: the item, fees and total stay together. 02, Delivered, with time to review: delivery status and the dispute window, in view. 03, A deliberate release: a final check before the buyer releases payment.",
        },
      },
      {
        type: "section",
        title: "Lessons",
        paragraphs: [
          "Trust is built through understandable states and clear consequences. A polished payment screen matters, but the explanation before a commitment and the feedback after it matter just as much.",
          "For a future iteration, I would test whether buyers and sellers can explain the payment status in their own words. I would also look closely at whether the confirmation and dispute paths are easy to distinguish when a delivery does not go as expected.",
        ],
      },
      {
        type: "link",
        text: "See the website in action.",
        label: "Visit KIPA",
        href: "https://getkipa.com/",
      },
    ],
  },
];

/**
 * Projects whose case study isn't designed yet. Each gets a simple
 * "Coming soon" page at /work/<slug>. When a design is ready, move it
 * into `caseStudies` above with its full details.
 */
export type UpcomingCaseStudy = {
  slug: string;
  name: string;
  summary: string;
  platform: string;
};

export const upcomingCaseStudies: UpcomingCaseStudy[] = [
  {
    slug: "ashaudit",
    name: "AshAudit",
    summary: "GPS-accurate site audits, online or offline.",
    platform: "Web & Mobile",
  },
  {
    slug: "ashgridx",
    name: "AshGridX",
    summary: "Track electricity usage and recharge instantly.",
    platform: "Web & Mobile",
  },
  {
    slug: "urban-women",
    name: "Urban Women",
    summary: "A nonprofit’s mission brought to life.",
    platform: "Web",
  },
  {
    slug: "ashgridx-workspace",
    name: "AshGridX Workspace",
    summary: "A nonprofit’s mission brought to life.",
    platform: "Web",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function getUpcomingCaseStudy(slug: string) {
  return upcomingCaseStudies.find((study) => study.slug === slug);
}
