import { motion } from "framer-motion";
import { Check, ArrowRight, Minus } from "lucide-react";

type FeatureValue = string | boolean;
type Feature = { name: string; value: FeatureValue };

type Plan = {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  price: string;
  priceNote: string;
  cta: { label: string; url: string };
  features: Feature[];
  seoContent: { title: string; paragraph: string };
  highlight?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "artist",
    badge: "Free Starter",
    title: "Artist",
    subtitle: "Independent artists starting or growing their catalog.",
    price: "Free",
    priceNote: "Credit-based releases",
    cta: { label: "Start Free", url: "https://app.tracks.id" },
    features: [
      { name: "Royalty Split", value: "100% Royalties" },
      { name: "Global Distribution", value: "All Major DSPs" },
      { name: "Release Credits", value: "2 Included" },
      { name: "Pre-Save Links", value: true },
      { name: "Advanced Statistics", value: true },
      { name: "Playlist Pitching", value: true },
      { name: "Press Articles", value: true },
      { name: "Radio Pitching", value: true },
      { name: "Publishing Administration", value: true },
      { name: "Dolby Atmos", value: true },
      { name: "Apple Digital Masters", value: true },
      { name: "Artwork Design", value: true },
      { name: "Sync Opportunities", value: true },
      { name: "Concierge Support", value: true },
      { name: "Delivery Speed", value: "24–72 Hours" },
    ],
    seoContent: {
      title: "Distribution for Independent Artists",
      paragraph:
        "Built for independent artists looking for professional music distribution with 100% royalties, playlist pitching, publishing administration, Dolby Atmos support, and release tools without requiring a label deal.",
    },
  },
  {
    id: "label-manager",
    badge: "Best Value",
    title: "Label Manager",
    subtitle: "For labels, teams, and artists managing multiple releases.",
    price: "Custom Access",
    priceNote: "Application required",
    cta: { label: "Apply Now", url: "https://app.tracks.id" },
    highlight: true,
    features: [
      { name: "Royalty Split", value: "100% Royalties" },
      { name: "Global Distribution", value: "All Major DSPs" },
      { name: "Release Credits", value: "5 Included" },
      { name: "Artist Management", value: "Multi-Artist Access" },
      { name: "Label Creation", value: "1 Label Included" },
      { name: "WhatsApp Concierge", value: true },
      { name: "Playlist Pitching", value: "Priority" },
      { name: "Press Campaigns", value: true },
      { name: "Publishing Administration", value: true },
      { name: "Dolby Atmos", value: true },
      { name: "Apple Digital Masters", value: true },
      { name: "Advanced Statistics", value: true },
      { name: "Sync Opportunities", value: true },
      { name: "Artwork Design", value: true },
      { name: "Delivery Speed", value: "24–72 Hours" },
    ],
    seoContent: {
      title: "Music Distribution for Record Labels",
      paragraph:
        "Professional label distribution built for labels and management teams that need artist management tools, priority support, royalty flexibility, playlist campaigns, and scalable release infrastructure.",
    },
  },
  {
    id: "signed-artist",
    badge: "Invite Only",
    title: "Signed Artist",
    subtitle: "For artists working directly with DENAR RCRDS & Tracks/ID.",
    price: "Partnership",
    priceNote: "Contract-adjusted terms",
    cta: { label: "Become a Partner", url: "https://tracks.id/demos" },
    features: [
      { name: "Royalty Structure", value: "Adjusted Per Contract" },
      { name: "Unlimited Distribution", value: true },
      { name: "Global DSP Delivery", value: true },
      { name: "Playlist Pitching", value: "Priority" },
      { name: "Publishing Administration", value: true },
      { name: "Press & Media Campaigns", value: true },
      { name: "Radio Promotion", value: true },
      { name: "Dolby Atmos", value: true },
      { name: "Apple Digital Masters", value: true },
      { name: "Concierge Support", value: "Direct Team Access" },
      { name: "Artwork Design", value: true },
      { name: "Sync Opportunities", value: true },
      { name: "Fast Delivery", value: "Priority Processing" },
    ],
    seoContent: {
      title: "Artist Partnership Distribution",
      paragraph:
        "A partnership-focused distribution model for artists seeking long-term growth, advanced support, promotional strategy, and one of the highest payout structures available in the market.",
    },
  },
];

const ADVANTAGES = [
  {
    title: "One of the Highest Pay Rates in the Market",
    description:
      "Keep more of your royalties while maintaining access to professional-level distribution and promotional infrastructure.",
  },
  {
    title: "More Than a Distributor",
    description:
      "Unlike traditional distribution services, Tracks/ID combines promotion, publishing, support, and artist development in one ecosystem.",
  },
  {
    title: "Built for Long-Term Growth",
    description:
      "Our platform was designed to help artists grow beyond a single release through strategy, support, and scalable infrastructure.",
  },
  {
    title: "Professional Services Included",
    description:
      "Access playlist pitching, press support, artwork design, sync opportunities, Dolby Atmos, and Apple Digital Masters.",
  },
];

const renderValue = (value: FeatureValue, highlight = false) => {
  if (value === true) {
    return (
      <Check
        className={highlight ? "w-4 h-4 text-primary" : "w-4 h-4 text-white/80"}
        strokeWidth={3}
      />
    );
  }
  if (value === false) {
    return <Minus className="w-4 h-4 text-white/25" />;
  }
  return (
    <span
      className={[
        "font-body text-[13px] leading-snug text-right",
        highlight ? "text-primary" : "text-white/85",
      ].join(" ")}
    >
      {value}
    </span>
  );
};

const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-[#090909] text-white py-28"
      aria-labelledby="pricing-heading"
    >
      {/* Background — micro dot grid + grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        aria-hidden
        className="absolute top-10 left-1/2 -translate-x-1/2 font-heading font-black uppercase text-[18vw] leading-none tracking-tighter text-white/[0.025] select-none pointer-events-none whitespace-nowrap"
      >
        Pricing
      </div>

      <div className="container relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-6 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
              For Artists, Labels & Professional Releases
            </span>
          </div>
          <h2
            id="pricing-heading"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95] mb-5"
          >
            More than distribution.
            <br />
            <span className="text-white/40">A complete ecosystem.</span>
          </h2>
          <p className="font-body text-base md:text-lg text-white/60 max-w-2xl mx-auto">
            Release, grow, monetize, and scale without sacrificing royalties or
            ownership. Distribution, publishing, concierge support, playlist
            pitching, press, Dolby Atmos and more — unified in one platform.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 mb-24">
          {PLANS.map((plan, i) => (
            <motion.article
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className={[
                "group relative flex flex-col p-7 lg:p-8 rounded-[28px] border transition-all duration-500",
                plan.highlight
                  ? "bg-gradient-to-b from-[#161310] to-[#0f0f0f] border-primary/30 shadow-[0_20px_60px_-20px_hsl(48_90%_50%/0.25)] lg:-translate-y-3"
                  : "bg-[#111111] border-white/[0.08] hover:border-white/20 hover:-translate-y-1 backdrop-blur-sm",
              ].join(" ")}
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-5">
                <span
                  className={[
                    "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-[0.2em]",
                    plan.highlight
                      ? "bg-primary text-primary-foreground"
                      : "bg-white/[0.06] text-white/60 border border-white/10",
                  ].join(" ")}
                >
                  {plan.badge}
                </span>
                <span
                  className={[
                    "w-2 h-2 rounded-full",
                    plan.highlight ? "bg-primary animate-pulse" : "bg-white/15",
                  ].join(" ")}
                />
              </div>

              {/* Title */}
              <h3 className="font-heading text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-2">
                {plan.title}
              </h3>
              <p className="font-body text-sm text-white/55 mb-7 leading-relaxed min-h-[44px]">
                {plan.subtitle}
              </p>

              {/* Price */}
              <div className="mb-2">
                <span
                  className={[
                    "font-heading text-4xl lg:text-5xl font-black tracking-tight",
                    plan.highlight ? "text-primary" : "text-white",
                  ].join(" ")}
                >
                  {plan.price}
                </span>
              </div>
              <p className="font-body text-xs text-white/45 uppercase tracking-[0.15em] mb-7">
                {plan.priceNote}
              </p>

              {/* CTA */}
              <a
                href={plan.cta.url}
                className={[
                  "group/cta inline-flex items-center justify-center gap-2 w-full h-12 rounded-full font-heading text-[11px] font-black uppercase tracking-[0.25em] transition-all mb-8",
                  plan.highlight
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-white text-black hover:bg-white/90",
                ].join(" ")}
              >
                {plan.cta.label}
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-1" />
              </a>

              {/* Divider */}
              <div className="h-px w-full bg-white/[0.08] mb-6" />

              {/* Features */}
              <ul className="flex-1 space-y-3.5">
                {plan.features.map((f) => (
                  <li
                    key={f.name}
                    className="flex items-start justify-between gap-4 text-sm"
                  >
                    <span className="font-body text-[13px] text-white/55 leading-snug">
                      {f.name}
                    </span>
                    <span className="flex items-center shrink-0">
                      {renderValue(f.value, plan.highlight)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* SEO content */}
              <div className="mt-8 pt-6 border-t border-white/[0.06]">
                <h4 className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 mb-2">
                  {plan.seoContent.title}
                </h4>
                <p className="font-body text-xs text-white/45 leading-relaxed">
                  {plan.seoContent.paragraph}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Competitive advantages */}
        <div className="mb-24">
          <div className="max-w-2xl mb-12">
            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
              The Edge
            </span>
            <h3 className="font-heading text-3xl md:text-4xl font-black uppercase tracking-tight mt-3">
              Why artists choose Tracks/ID
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {ADVANTAGES.map((adv, i) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative p-6 rounded-[20px] bg-[#111111] border border-white/[0.08] hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <span className="font-heading text-xs font-black text-primary">
                    0{i + 1}
                  </span>
                </div>
                <h4 className="font-heading text-base font-bold text-white mb-2 leading-tight">
                  {adv.title}
                </h4>
                <p className="font-body text-sm text-white/55 leading-relaxed">
                  {adv.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom SEO block */}
        <div className="max-w-4xl mx-auto text-center border-t border-white/[0.06] pt-16">
          <h3 className="font-heading text-2xl md:text-3xl font-black uppercase tracking-tight mb-8">
            Independent music distribution for modern artists & labels
          </h3>
          <div className="space-y-5 text-left md:text-center">
            <p className="font-body text-sm md:text-base text-white/55 leading-relaxed">
              Tracks/ID was created for artists and labels looking for a modern
              alternative to traditional music distributors. Our platform combines
              global music distribution, royalty management, publishing
              administration, playlist pitching, and artist support into a single
              ecosystem.
            </p>
            <p className="font-body text-sm md:text-base text-white/55 leading-relaxed">
              Whether you're an independent artist releasing your first track or a
              label managing multiple artists, Tracks/ID provides scalable
              distribution tools while allowing creators to keep ownership and
              maximize revenue.
            </p>
            <p className="font-body text-sm md:text-base text-white/55 leading-relaxed">
              With support for Spotify, Apple Music, TikTok, YouTube Music, Amazon
              Music, Deezer, TIDAL, Dolby Atmos, and Apple Digital Masters,
              Tracks/ID helps artists compete at a professional level from day one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;