import magHempExpo from "@/assets/mag-hemp-expo.jpg";
import magChfa from "@/assets/mag-chfa.jpg";
import magCanexec from "@/assets/mag-canexec.jpg";
import magSupplyside from "@/assets/mag-supplyside.jpg";
import magArticleHero from "@/assets/mag-article-hero.jpg";
import magSmartFactory from "@/assets/mag-smart-factory.jpg";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  year: string;
  category: string;
  location: string;
  image: string;
  readTime: string;
  author: string;
  content: ArticleContent[];
}

export type ArticleContent =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "blockquote"; text: string }
  | { type: "callout"; text: string }
  | { type: "image"; src: string; caption: string };

export const articles: Article[] = [
  {
    slug: "hemp-beverage-expo-2026",
    title: "HEMP BEVERAGE EXPO REDEFINES THE INDUSTRY",
    excerpt:
      "Hemp Beverage Expo (HBE) is the first and only executive-level B2B trade show exclusively focused on hemp beverages featuring delta-9 THC.",
    date: "9 JULY",
    year: "2026",
    category: "EVENT",
    location: "ATLANTA, GEORGIA",
    image: magHempExpo,
    readTime: "6 MIN READ",
    author: "ELEVATED SIGNALS TEAM",
    content: [
      { type: "paragraph", text: "The Hemp Beverage Expo has rapidly become the most important gathering for manufacturers in the emerging hemp-infused beverage space. As regulations evolve and consumer demand skyrockets, producers need cutting-edge tools to stay competitive." },
      { type: "heading", text: "WHY THIS MATTERS FOR MANUFACTURERS" },
      { type: "paragraph", text: "With delta-9 THC beverages now legal in over 30 states, the manufacturing complexity has grown exponentially. Batch tracking, compliance documentation, and real-time inventory management are no longer optional — they're survival requirements." },
      { type: "blockquote", text: "The manufacturers who win in this space will be the ones who treat compliance as a competitive advantage, not a burden." },
      { type: "callout", text: "LOG // COMPLIANCE_TRACKING: Modern ERP systems must integrate real-time batch tracking with state-by-state regulatory databases. Manual spreadsheet tracking introduces unacceptable risk vectors." },
      { type: "image", src: magArticleHero, caption: "FIG 01.1 // PRODUCTION_DASHBOARD — Real-time manufacturing analytics" },
      { type: "heading", text: "THE ELEVATED SIGNALS APPROACH" },
      { type: "paragraph", text: "Our platform was purpose-built for manufacturers in regulated industries. From seed-to-sale tracking to automated compliance reporting, every feature is designed to eliminate the friction between production and regulation." },
      { type: "paragraph", text: "At HBE 2026, we'll be demonstrating our latest planning and scheduling module — built to handle the unique challenges of beverage manufacturing including fermentation timelines, quality hold periods, and multi-state distribution logistics." },
    ],
  },
  {
    slug: "chfa-now-2026",
    title: "CHFA NOW: NATURAL PRODUCTS MEET SMART MANUFACTURING",
    excerpt:
      "CHFA NOW is Canada's largest trade show for natural, organic & wellness products.",
    date: "19 SEPTEMBER",
    year: "2026",
    category: "EVENT",
    location: "TORONTO",
    image: magChfa,
    readTime: "5 MIN READ",
    author: "ELEVATED SIGNALS TEAM",
    content: [
      { type: "paragraph", text: "The Canadian Health Food Association's annual trade show brings together thousands of natural product manufacturers, retailers, and industry leaders. For producers, it's the premier venue to discover how technology is reshaping the wellness manufacturing landscape." },
      { type: "heading", text: "SCALING NATURAL PRODUCTS PRODUCTION" },
      { type: "paragraph", text: "Natural product manufacturers face unique challenges: shorter shelf lives, complex ingredient sourcing, and increasingly demanding certification requirements. The gap between artisanal quality and industrial scale has never been wider." },
      { type: "blockquote", text: "Every minute spent on manual data entry is a minute not spent on product innovation." },
      { type: "image", src: magSmartFactory, caption: "FIG 02.1 // SMART_FACTORY — Automated production line integration" },
      { type: "paragraph", text: "Elevated Signals helps natural product manufacturers bridge this gap with intelligent production planning that respects the nuances of organic and natural ingredient handling." },
    ],
  },
  {
    slug: "canexec-summit-2026",
    title: "CANEXEC SUMMIT: WHERE LEADERS CONVERGE",
    excerpt:
      "CanExec offers a platform for decision-makers from the world's leading licenced producers to network and learn.",
    date: "1ST OCTOBER",
    year: "2026",
    category: "SUMMIT",
    location: "TORONTO",
    image: magCanexec,
    readTime: "4 MIN READ",
    author: "ELEVATED SIGNALS TEAM",
    content: [
      { type: "paragraph", text: "The CanExec Summit is the most exclusive gathering of licensed producer executives in the world. This invite-only event focuses on the strategic and operational challenges facing today's leading manufacturers." },
      { type: "heading", text: "EXECUTIVE-LEVEL MANUFACTURING INTELLIGENCE" },
      { type: "paragraph", text: "C-suite leaders need more than dashboards — they need predictive insights that drive strategic decisions. From capacity planning to market expansion modeling, the modern manufacturing executive requires a new class of tools." },
      { type: "callout", text: "LOG // PREDICTIVE_ANALYTICS: Next-generation forecasting engines combine historical production data with market signals to generate 90-day production recommendations with 94% accuracy." },
      { type: "paragraph", text: "At CanExec, our team will present case studies showing how top-tier producers have reduced waste by 34% and increased throughput by 28% using data-driven production scheduling." },
    ],
  },
  {
    slug: "supplyside-global-2026",
    title: "SUPPLYSIDE GLOBAL: THE FUTURE OF SUPPLY CHAIN",
    excerpt:
      "Connecting suppliers & buyers that drive the dietary supplement, food, beverage, animal nutrition, personal care & cosmetic industries.",
    date: "27TH OCTOBER",
    year: "2026",
    category: "EXPO",
    location: "LAS VEGAS",
    image: magSupplyside,
    readTime: "7 MIN READ",
    author: "ELEVATED SIGNALS TEAM",
    content: [
      { type: "paragraph", text: "SupplySide Global is the definitive event for the global supply chain — connecting ingredient suppliers, contract manufacturers, and brand owners across every major CPG category." },
      { type: "heading", text: "END-TO-END SUPPLY CHAIN VISIBILITY" },
      { type: "paragraph", text: "In a post-pandemic world, supply chain resilience isn't a buzzword — it's a business imperative. Manufacturers who can't see their entire supply chain in real-time are flying blind." },
      { type: "blockquote", text: "The best supply chain is the one you can see completely — from raw material sourcing to final mile delivery." },
      { type: "image", src: magArticleHero, caption: "FIG 04.1 // SUPPLY_CHAIN_DASHBOARD — Full pipeline visibility" },
      { type: "callout", text: "LOG // INVENTORY_SYNC: Real-time inventory synchronization across multiple warehouses reduces stockout events by 67% and cuts carrying costs by 23%." },
      { type: "heading", text: "WHAT WE'RE SHOWING AT SUPPLYSIDE" },
      { type: "paragraph", text: "Our latest inventory management module features AI-powered demand forecasting, automated reorder triggers, and multi-location inventory optimization. Visit booth #4412 for a live demo." },
    ],
  },
];
