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

/** A bullet; `term` is shown in bold before the text, e.g. "Booking completion:". */
type ListItem = string | { term: string; text: string };

/** One piece of a section's body: a paragraph, a bullet list, or a small table. */
export type SectionContent =
  | string
  | { list: ListItem[] }
  | { table: { head: string[]; rows: string[][] } };

/** A region of an image, in percent of its width and height. */
type Highlight = { x: number; y: number; w: number; h: number };

/** One flat app screen in a sequence. */
type PhoneScreen = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Short step name under the screen, e.g. "Choose a slot". */
  label: string;
  /** One line under the label saying what to notice. */
  note?: string;
  /** Pink outlines drawing the eye to part of the screen. */
  highlights?: Highlight[];
};

/** A small pink handwritten heading with a grey line, above a visual. */
type VisualLabel = { title: string; text: string };

export type CaseStudyBlock = (
  | {
      type: "section";
      /** Small pink uppercase label, e.g. "Problem" or "Decision 1". */
      title: string;
      /** Optional heading under the label that says what the section shows. */
      heading?: string;
      paragraphs: SectionContent[];
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
  /** App screens in numbered steps, optionally split into groups (e.g. before and after). */
  | {
      type: "screens";
      label?: VisualLabel;
      groups: {
        title?: string;
        /** Screens per row on larger screens (always 2 on phones). */
        columns: 2 | 3;
        screens: PhoneScreen[];
      }[];
    }
  /** An animated scene in place of a still image; `name` picks which one. */
  | { type: "animation"; name: "surechargex-journey"; alt: string }
  /** One screen with numbered markers explained in a list beside it. */
  | {
      type: "annotated";
      label?: VisualLabel;
      image: Omit<Image, "displayWidth">;
      markers: { x: number; y: number; title: string; text: string }[];
      /** A short honest note under the list, e.g. what the screen doesn't show yet. */
      note?: string;
    }
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
      "A mobile app and website for Ashipa Electric that let EV drivers find a station, reserve a charging slot, pay and charge in one journey, with every cost shown before they commit.",
    facts: [
      { label: "Role", value: "Product designer" },
      { label: "Timeline", value: "6 months" },
      { label: "Platform", value: "Mobile & Web" },
    ],
    status: "Live",
    website: "https://surecharge.us/",
    hero: {
      src: "/images/case-studies/surechargex/hero-v3.png",
      width: 1328,
      height: 664,
      displayWidth: 844,
      alt: "The SureChargeX website on a laptop, with the app’s slot booking screen on a phone beside it.",
    },
    blocks: [
      {
        type: "section",
        title: "In short",
        paragraphs: [
          "Ashipa Electric’s brief was clear on features and open on the hard questions: should drivers need a code to confirm payment, should pricing be by time or energy, do drivers have to be at the station for their whole slot? I answered those in the design: slot-based booking with a full cost breakdown before payment, a wallet secured by a 4-digit PIN, and charging screens built for a driver standing at the charger.",
          "When a private EV owner and his fleet drivers tested the app, they found the cancellation information wasn’t good enough, so I made the fee, refund eligibility and timing explicit, and showed the fee before and during cancelling.",
        ],
      },
      {
        type: "section",
        title: "The brief",
        heading: "The brief left the hard questions open",
        paragraphs: [
          "The brief from Ashipa Electric was for Phase 1 of a charging platform: a driver app and a web console for operators. For drivers, it asked for search within a set radius, station details, time-slot booking, wallet payment for the slot, payment for energy used, and starting and stopping a charge from the app.",
          "It also listed five open questions, and those are where the design work was:",
          {
            list: [
              "Do drivers charge by themselves or with attendants?",
              "If by themselves, should they need a code to confirm identity and payment?",
              "Should pricing be by time, energy used, or charger type?",
              "Do metrics matter, and to whom?",
              "Does a driver have to be at the station for their whole slot?",
            ],
          },
          "Finding a charging station is only the beginning. Drivers also need to check station details, book a session, pay, and follow their charging progress, and the journey has to hold up when they cancel, change plans, or come back.",
        ],
      },
      {
        type: "animation",
        name: "surechargex-journey",
        alt: "Three app screens: navigating to a station, the map of stations near you, and a charging session for a KIA EV6.",
      },
      {
        type: "section",
        title: "Research",
        heading: "Learning from international products and standards",
        paragraphs: [
          "I hadn’t found a local equivalent to learn from, so I looked at international products and standards.",
          "The US National Electric Vehicle Infrastructure (NEVI) standards for public chargers require real-time station status, uptime, real-time pricing with any extra costs “displayed and explained”, hours of availability, port and connector types, and multiple payment methods. I used them as a checklist for what each station screen must answer.",
          "I also reviewed the leading US driver apps:",
          {
            table: {
              head: ["App", "Strong at", "Where the journey breaks"],
              rows: [
                ["PlugShare", "Discovery: map, plug filters, reliability scores", "No booking"],
                ["ChargePoint", "A Waitlist queue at busy stations", "No advance booking"],
                ["Electrify America", "Live availability and in-session progress", "No reservations; you find out on arrival"],
                ["EVgo", "Reservations and a vehicle garage", "Select locations only, with late cancellation and no-show fees"],
              ],
            },
          },
          "The pattern: booking is usually an add-on at a few sites, and where it exists, its rules (fees, hold windows, no-shows) are where drivers’ trust is won or lost. SureChargeX needed booking as the backbone, with its rules visible before anyone pays. These references could not tell me how our own drivers would behave, which is why testing with real drivers mattered later.",
        ],
      },
      {
        type: "annotated",
        label: {
          title: "The station screen, checked against NEVI",
          text: "Each number marks a requirement the screen answers before a driver books.",
        },
        image: {
          src: "/images/case-studies/surechargex/screens/station-detail-annotated-v3.png",
          width: 784,
          height: 2578,
          alt: "The Technicolor EV Station detail screen: open hours and uptime, chargers available, each charger’s slots with connector and power, Available and In use statuses, amenities with the parking fee, photos and reviews, and the price with a Book now button.",
        },
        markers: [
          { x: 51, y: 15.0, title: "Hours of availability", text: "“Open | 24hrs” sits in the header." },
          { x: 90, y: 17.6, title: "Uptime", text: "“98% uptime” sits next to the hours, so drivers can judge reliability before the trip." },
          { x: 39, y: 23.0, title: "Real-time availability", text: "Chargers available out of the total, “6/12”." },
          { x: 67.5, y: 29.8, title: "Connector types", text: "Each slot names the connector it supports." },
          { x: 67.5, y: 33.0, title: "Power", text: "Each slot shows its charging power." },
          { x: 69, y: 50.0, title: "Real-time status", text: "Every charger is marked Available or In use." },
          { x: 79, y: 68.5, title: "Extra costs, displayed", text: "The parking fee and amenities, before booking." },
          { x: 36.5, y: 95.4, title: "Real-time pricing", text: "The price per kWh sits on the booking bar." },
        ],
      },
      {
        type: "quote",
        text: "Finding a charger is one step. The experience needs to carry you through the whole charge.",
      },
      {
        type: "section",
        title: "Decision 1",
        heading: "Book a slot, see every cost before paying",
        paragraphs: [
          "The brief asked for slots in time ranges, so booking is built around a day and hour picker. Each slot shows its state: taken, selected, or “Tap to book this slot”. Above the slots, one line answers whether drivers must stay for the whole slot: “Charging slots are only valid for the specified time. Overstaying beyond the allotted time may incur additional charges.”",
          "On pricing, the design uses both models the brief described: a booking fee reserves the slot, and the driver pays for the energy they use. Before confirming, the booking summary shows the charger and slot, connector and power, date, time and duration, parking fee, booking fee, tax and an estimated total, and drivers can change their vehicle or payment method from there. The first time a driver sees a price is not at the charger.",
        ],
      },
      {
        type: "screens",
        label: {
          title: "From station to confirmed booking",
          text: "Every cost appears before the driver pays.",
        },
        groups: [
          {
            columns: 2,
            screens: [
            {
              src: "/images/case-studies/surechargex/screens/station-detail-phone-v3.png",
              width: 784,
              height: 1704,
              alt: "Station detail with Charger 1 expanded, showing two slots with their connector and power.",
              label: "Pick a charger",
              note: "Connector and power on each slot",
            },
            {
              src: "/images/case-studies/surechargex/screens/booking.png",
              width: 786,
              height: 1704,
              alt: "Booking screen with a date strip, taken slots, a selected 13:00 to 14:00 slot, and the booking fee and overstay notes.",
              label: "Choose a slot",
              note: "The fee and the overstay rule, up front",
              highlights: [{ x: 4, y: 15.2, w: 92, h: 5.4 }, { x: 2, y: 43.2, w: 96, h: 6.2 }],
            },
            {
              src: "/images/case-studies/surechargex/screens/booking-summary-v2.png",
              width: 786,
              height: 1966,
              alt: "Booking summary showing wallet payment, vehicle, station, charger, and the date, time, fees, estimate and tax.",
              label: "Review every cost",
              note: "Fees, tax and the estimate before confirming",
              highlights: [{ x: 4, y: 64, w: 92, h: 25 }],
            },
            {
              src: "/images/case-studies/surechargex/screens/booking-confirmed-v3.png",
              width: 786,
              height: 1966,
              alt: "Booking Confirmed overlay over the booking summary, with a View Booking button.",
              label: "Booked",
              note: "Confirmed, with the booking one tap away",
            },
            ],
          },
        ],
      },
      {
        type: "section",
        title: "Decision 2",
        heading: "Make the cost of changing plans clear, because drivers told us it wasn’t",
        paragraphs: [
          "Booking asks drivers to commit early, and plans change. A private EV owner tested the app and involved his fleet drivers, and they pointed out that the booking experience did not provide proper cancellation information.",
          "In response, I added details covering cancellation fees, refund eligibility and cancellation timing, and made the fee impossible to miss. The design states it at two points: on the slot screen before payment, and again in the cancel confirmation (“Your booking fee will not be refunded. Are you sure you want to cancel your reserved slot?”). No one finds out afterwards.",
          "Cancelling asks for a reason from a short list: change of plans, high charging cost, station too far away, charging time not suitable, weather, technical issues at the station, found another station, or other. Drivers get a quick exit, and operators learn why slots go unused, which answers the brief’s “metrics, to whom?” with something actionable. Cancelled bookings keep their reason and offer “Book again”.",
        ],
      },
      {
        type: "screens",
        label: {
          title: "Before and after testing",
          text: "What changed after the fleet drivers said cancellation wasn’t clear.",
        },
        groups: [
          {
            title: "Before and after",
            columns: 2,
            screens: [
            {
              src: "/images/case-studies/surechargex/screens/booking-before-testing.png",
              width: 786,
              height: 1704,
              alt: "The booking screen before testing, with no mention of cancellation.",
              label: "Before testing",
              note: "No cancellation information",
            },
            {
              src: "/images/case-studies/surechargex/screens/booking.png",
              width: 786,
              height: 1704,
              alt: "The revised booking screen with the booking fee note at the top.",
              label: "After",
              note: "The fee is stated before payment",
              highlights: [{ x: 4, y: 15.2, w: 92, h: 5.4 }],
            },
            ],
          },
          {
            title: "Cancelling, after testing",
            columns: 2,
            screens: [
            {
              src: "/images/case-studies/surechargex/screens/upcoming-v2.png",
              width: 786,
              height: 1704,
              alt: "My Booking, Upcoming tab, with a booking card and Cancel and Get directions buttons.",
              label: "Upcoming booking",
              note: "Cancel sits next to directions",
              highlights: [{ x: 8, y: 46.2, w: 31, h: 4.6 }],
            },
            {
              src: "/images/case-studies/surechargex/screens/cancel-overlay-v2.png",
              width: 786,
              height: 1704,
              alt: "Cancel Booking sheet: Your booking fee will not be refunded. Are you sure you want to cancel your reserved slot?",
              label: "Confirm",
              note: "The fee, stated again",
              highlights: [{ x: 4, y: 75.8, w: 92, h: 13.6 }],
            },
            {
              src: "/images/case-studies/surechargex/screens/cancel-reasons.png",
              width: 786,
              height: 1704,
              alt: "Cancel Booking reason list with Change of plans selected.",
              label: "Say why",
              note: "Operators learn why slots go unused",
              highlights: [{ x: 4, y: 16.3, w: 92, h: 51.4 }],
            },
            {
              src: "/images/case-studies/surechargex/screens/cancelled-v2.png",
              width: 786,
              height: 1704,
              alt: "Cancelled tab with booking cards showing the reason for cancellation and Book again.",
              label: "Cancelled",
              note: "The reason is kept, with Book again",
              highlights: [{ x: 8, y: 45.2, w: 84, h: 7.1 }],
            },
            ],
          },
        ],
      },
      {
        type: "section",
        title: "Decision 3",
        heading: "A wallet, protected by a PIN",
        paragraphs: [
          "The brief raised the question of a code to confirm identity and payment. I answered with a 4-digit wallet PIN, set up once and entered to authorise each transaction, so a phone left unlocked at a charger cannot spend the driver’s balance. Mismatched entries get a plain message: “PINs do not match. Please try again.”",
          "Drivers must fund their wallet before booking, so adding money had to connect to making a reservation. When the balance is too low, the payment screen says so and offers a top-up in place, rather than failing at confirmation. The wallet can be topped up by card, bank transfer, PayPal, Apple Pay or Google Pay.",
        ],
      },
      {
        type: "screens",
        label: {
          title: "Securing the wallet",
          text: "Set up once; low balance is caught before paying, not at confirmation.",
        },
        groups: [
          {
            columns: 3,
            screens: [
            {
              src: "/images/case-studies/surechargex/screens/pin-setup.png",
              width: 786,
              height: 1704,
              alt: "Set Up PIN screen explaining secure transactions, quick access and encrypted storage.",
              label: "Why a PIN",
              note: "The benefits, before asking",
              highlights: [{ x: 4, y: 48.2, w: 92, h: 31.5 }],
            },
            {
              src: "/images/case-studies/surechargex/screens/pin-create.png",
              width: 786,
              height: 1704,
              alt: "Create your 4-digit PIN screen with a number pad.",
              label: "Create PIN",
            },
            {
              src: "/images/case-studies/surechargex/screens/pin-wrong.png",
              width: 786,
              height: 1704,
              alt: "Confirm PIN screen showing PINs do not match. Please try again.",
              label: "Mismatch",
              note: "A plain message",
              highlights: [{ x: 4, y: 51, w: 92, h: 5.4 }],
            },
            {
              src: "/images/case-studies/surechargex/screens/wallet-insufficient.png",
              width: 786,
              height: 1704,
              alt: "Select Payment Method with the wallet at zero balance and a Top up button, plus card, bank transfer, PayPal, Apple Pay and Google Pay.",
              label: "Low balance",
              note: "Top up, right where you pay",
              highlights: [{ x: 4, y: 15.8, w: 92, h: 9.4 }],
            },
            {
              src: "/images/case-studies/surechargex/screens/wallet-top-up-v2.png",
              width: 786,
              height: 1704,
              alt: "Add Money screen with the current balance, an amount field, quick amounts and top-up methods.",
              label: "Add money",
            },
            {
              src: "/images/case-studies/surechargex/screens/wallet-top-up-success.png",
              width: 786,
              height: 1704,
              alt: "Top-Up Successful screen with the amount, date, method and status, and Proceed to Payment.",
              label: "Topped up",
              note: "Straight back to paying",
            },
            ],
          },
        ],
      },
      {
        type: "section",
        title: "Decision 4",
        heading: "Design for the driver at the charger",
        paragraphs: [
          "Drivers add their vehicle once, including its charging port type, and station details show the connector on each charger slot, so the driver books a charger their car can use.",
          "At the charger, the driver is holding a cable, not studying a screen. The charge screen starts with one instruction, “Plug in first to start charging”, then a single “Charge vehicle” action. While charging, the battery percentage is the largest thing on screen, with time remaining and the running total below it, and a clear stop control. The session ends on a “Charging complete” screen that lists any idle fee, so overstaying has a visible cost.",
        ],
      },
      {
        type: "screens",
        label: {
          title: "At the charger",
          text: "One instruction, one action, then progress readable at a glance.",
        },
        groups: [
          {
            columns: 2,
            screens: [
            {
              src: "/images/case-studies/surechargex/screens/charge-plug-in.png",
              width: 786,
              height: 1704,
              alt: "Charge screen: Plug in first to start charging, with the vehicle card and a Charge vehicle button.",
              label: "Plug in first",
              note: "One instruction, one action",
              highlights: [{ x: 11.5, y: 12.2, w: 66, h: 3.6 }],
            },
            {
              src: "/images/case-studies/surechargex/screens/charge-start.png",
              width: 786,
              height: 1704,
              alt: "KIA EV6 at 23% battery with time left to complete the charge and a Start charging button.",
              label: "Start",
              note: "Battery level is the largest thing on screen",
              highlights: [{ x: 4, y: 45, w: 92, h: 10.3 }],
            },
            {
              src: "/images/case-studies/surechargex/screens/charge-stop.png",
              width: 786,
              height: 1704,
              alt: "Charging at 51% with time remaining, the running total and a Stop charging button.",
              label: "Charging",
              note: "Time left, running total, a clear stop",
              highlights: [{ x: 4, y: 88.6, w: 92, h: 6 }],
            },
            {
              src: "/images/case-studies/surechargex/screens/charge-complete.png",
              width: 786,
              height: 1704,
              alt: "Charging complete sheet with the energy used, the idle fee and a Pay button.",
              label: "Complete",
              note: "The idle fee, before paying",
              highlights: [{ x: 4, y: 77.1, w: 92, h: 7.4 }],
            },
            ],
          },
        ],
      },
      {
        type: "section",
        title: "Where it stands",
        paragraphs: [
          "SureChargeX is live on mobile and web; the website’s job is to explain booking-first charging and get people into the app. I don’t have post-launch data yet, and no measured usability or adoption improvement is claimed here. The brief asked whether metrics matter and to whom; these are the ones I’d use to judge the design:",
          {
            list: [
              { term: "Booking completion:", text: "drivers who start a booking and confirm it." },
              { term: "Cancellation reasons:", text: "which reasons dominate, from the data the cancel flow collects." },
              { term: "Overstay and idle fees:", text: "whether the slot rules are understood." },
              { term: "Repeat bookings:", text: "drivers who tap “Book again”." },
            ],
          },
        ],
      },
      {
        type: "section",
        title: "Reflection",
        heading: "What I’d do differently",
        paragraphs: [
          "Completing the main flow is not enough. Drivers also need clear information when plans change, money is involved, or a session ends.",
          "Next, I would check the revised cancellation details with drivers, and test the transitions (confirmation, cancellation, completion) at a charging station, where attention is split between the phone and the charger. I would also revisit how a booking-first, account-based model fits NEVI’s expectation that public charging should not require membership, for example a guest or pay-at-charger path.",
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
      displayWidth: 844,
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
              displayWidth: 567,
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
              displayWidth: 381,
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
      displayWidth: 844,
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
          displayWidth: 844,
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
          displayWidth: 844,
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
    summary: "The console behind SureChargeX, AshAudit, and AshGridX.",
    platform: "Web",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function getUpcomingCaseStudy(slug: string) {
  return upcomingCaseStudies.find((study) => study.slug === slug);
}
