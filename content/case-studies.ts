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
  /** For cut-out artwork with a transparent background: draws the quiet
      tile and a soft glow of this brand colour behind it, in both themes. */
  backdrop?: { glow: string };
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
      /** The big number, e.g. "51%". */
      value: string;
      text: string;
      /** Where the number comes from, shown small underneath. */
      source?: string;
      /** For a percentage, also draws it as a bar. */
      percent?: number;
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
      src: "/images/case-studies/surechargex/hero-devices-v3.png",
      width: 2500,
      height: 1250,
      displayWidth: 844,
      alt: "The SureChargeX website in a browser, with the app’s slot booking screen on a phone beside it.",
      backdrop: { glow: "#25d366" },
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
              highlights: [{ x: 4, y: 15.2, w: 92, h: 5.4 }, { x: 2, y: 42.2, w: 96, h: 7.6 }],
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
              note: "Four digits, set once",
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
              note: "Quick amounts and a clear minimum",
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
        title: "In short",
        paragraphs: [
          "Buying from strangers on social media in Nigeria often means paying first and hoping the item arrives. KIPA holds the payment in Kipa Protect until the buyer confirms delivery, and adds rider booking for errands and deliveries in the same app.",
          "I designed the mobile experience around one idea: people should know where their money stands, not have to guess. That meant making every stage of a protected payment explicit, from confirming before paying, to a visible window before funds are released, to a dispute path that freezes the money straight away. KIPA launched in August 2026.",
        ],
      },
      {
        type: "section",
        title: "The problem",
        heading: "Paying first, and hoping it arrives",
        paragraphs: [
          "This project started with complaints. Our client had collected social media posts from people across the board who had been scammed by online vendors. The client had been through it too, and so had I: I once lost ₦40,000 trying to buy a pair of jeans online.",
          "Public data shows how common this is. In Visa’s 2026 Stay Secure study, 51% of consumers in Nigeria said they had experienced a financial scam in the past 12 months, and 57% of them said it happened on social media, the same place 83% had bought products directly.",
          "The trust problem runs both ways. Buyers need confidence that their order will arrive as described. Sellers need to know when they will be paid. Arranging delivery adds another layer of coordination.",
        ],
      },
      {
        type: "highlight",
        value: "51%",
        text: "of consumers in Nigeria reported a financial scam in the past 12 months, most often on social media.",
        source: "Visa Stay Secure study, 2026",
        percent: 51,
      },
      {
        type: "section",
        title: "Approach",
        heading: "Designing for the moments of doubt",
        paragraphs: [
          "The client was on a short timeline, so we worked from what we already had: the complaints, our own experiences, and a review of existing escrow applications. Escrow wasn’t new in Nigeria, services like Vesicash already offered it, but buying through social media still meant paying a stranger first.",
          "I approached the experience through two starting points: someone who wants to transact and someone who needs something picked up or delivered. Separating those intentions gave the flows a clearer purpose. For the payment journey, I brainstormed with stakeholders around the moments where doubt builds:",
          {
            list: [
              "What does the buyer need to know before paying?",
              "What does the seller need to know while waiting?",
              "What happens when delivery is complete, or when something is wrong?",
            ],
          },
          "We set the escrow rules together, and I designed how each one is shown, explained and confirmed. I worked with the product lead and engineers over 4 months.",
        ],
      },
      {
        type: "quote",
        text: "People should know where their money stands, not have to guess.",
      },
      {
        type: "section",
        title: "Decision 1",
        heading: "Confirm before the money moves",
        paragraphs: [
          "Scams start with paying first, so the buyer’s screens focus on what happens before money leaves their account. Opening a payment link shows the item, the fee and the total together, the seller’s details with a way to call them, and how long the seller has to dispatch. If the item isn’t sent in time, the buyer is refunded.",
          "Before paying, the buyer confirms two things: that the item description is what they are ordering, and that the funds will be held in Kipa Protect until they confirm delivery. Reassuring copy alone isn’t enough when someone is deciding whether to commit money, so the rules become part of the action.",
        ],
      },
      {
        type: "image",
        image: {
          src: "/images/case-studies/kipa/screens-buyer.png",
          width: 1316,
          height: 950,
          displayWidth: 844,
          alt: "The buyer’s screens: pasting a payment link, the transaction status with the item, fee and total, and the payment screen with the seller’s details, the processing time and two confirmations before paying.",
        },
      },
      {
        type: "section",
        title: "Decision 2",
        heading: "One timeline both sides can read",
        paragraphs: [
          "Sellers had the opposite worry: when will I be paid? The seller creates a payment link with the rules up front, including that funds are held until delivery is verified and that dispute windows apply after delivery. Then they follow the same transaction timeline as the buyer: link created, payment received with funds in Kipa Protect, rider booked, item picked up.",
          "Once paid, the seller sees exactly what they will receive and a processing window: a maximum of 3 days to send the package, or the money is refunded to the buyer automatically. Both sides read the same state, so neither has to message the other to find out where things stand.",
        ],
      },
      {
        type: "image",
        image: {
          src: "/images/case-studies/kipa/screens-seller.png",
          width: 1316,
          height: 960,
          displayWidth: 844,
          alt: "The seller’s screens: creating a payment link with the important rules up front, the link created and ready to share, and the transaction status with the amount received, the 3 day processing window and the shared timeline.",
        },
      },
      {
        type: "section",
        title: "Decision 3",
        heading: "Make releasing and disputing clearly different",
        paragraphs: [
          "Confirming delivery and opening a dispute carry very different consequences, so they needed to look and feel different. After delivery, the seller sees a dispute window counting down: the buyer has 1 hour to raise a problem before funds are released automatically. If the buyer releases early, a final check tells them the release is irreversible.",
          "Opening a dispute does the opposite. It freezes the funds in Kipa Protect straight away and starts an investigation, and the dispute stays visible next to live chat and call support.",
        ],
      },
      {
        type: "image",
        image: {
          src: "/images/case-studies/kipa/payment-states.png",
          width: 1328,
          height: 2315,
          displayWidth: 844,
          alt: "Three steps of a protected payment. 01, Protection you can see: the item, fees and total stay together. 02, Delivered, with time to review: delivery status and the dispute window, in view. 03, A deliberate release: a final check before the buyer releases payment.",
        },
      },
      {
        type: "image",
        image: {
          src: "/images/case-studies/kipa/screens-dispute.png",
          width: 1316,
          height: 975,
          displayWidth: 844,
          alt: "The dispute screens: opening a dispute with a notice that funds will be frozen, a reason and a description, and the support screen with live chat, calling and the active dispute.",
        },
      },
      {
        type: "section",
        title: "Decision 4",
        heading: "Keep errands just as visible",
        paragraphs: [
          "Errands have a simpler job: request a rider and follow the task. From the home screen, people can request riders for deliveries, pickups and errands. Once a rider is assigned, they see who is coming, when they will arrive and the delivery route, so the request stays connected to what is happening beyond the screen.",
        ],
      },
      {
        type: "section",
        title: "The result",
        heading: "Live since August 2026",
        paragraphs: [
          "KIPA launched on the App Store and Google Play in August 2026. It’s early, and the first App Store reviews are short; one user wrote that it “makes buying and selling so easy and comfortable.”",
          "What I’d measure next: how many transactions end in a dispute, how quickly disputes are resolved, and how long buyers take to release funds after delivery.",
        ],
      },
      {
        type: "section",
        title: "What I’d do differently",
        paragraphs: [
          "Trust is built through understandable states and clear consequences. A polished payment screen matters, but the explanation before a commitment and the feedback after it matter just as much.",
          "With more time, I would have tested with real buyers and sellers before launch; the short timeline meant we relied on complaints and our own experience. Next, I would check whether people can explain the payment status in their own words, and whether the release and dispute paths are easy to tell apart when a delivery goes wrong.",
        ],
      },
      {
        type: "link",
        text: "Try KIPA for yourself.",
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
