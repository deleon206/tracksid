import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

type Plan = {
  id: string;
  name: string;
  price: string;
  period?: string;
  tagline: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "member",
    name: "Member",
    price: "Free",
    tagline: "For artists exploring distribution and tools.",
    features: [
      "1 release per year",
      "Basic analytics dashboard",
      "Standard delivery (5–7 days)",
      "85% royalties kept",
      "Community access",
    ],
    cta: "Start free",
  },
  {
    id: "signed",
    name: "Signed Artist",
    price: "$19.99",
    period: "/mo",
    tagline: "Unlimited releases with priority delivery.",
    features: [
      "Unlimited releases",
      "Priority delivery in 24 hours",
      "100% royalties kept",
      "Pre-save, playlist & radio pitch",
      "Spotify Editorial submission",
      "Advanced analytics & royalty splits",
    ],
    cta: "Get Signed",
    featured: true,
  },
  {
    id: "label",
    name: "Record Label",
    price: "$49.99",
    period: "/mo",
    tagline: "Full label infrastructure for catalog & roster.",
    features: [
      "Unlimited artists & releases",
      "Label dashboard & roster management",
      "Priority delivery in 24 hours",
      "100% royalties + custom splits",
      "Dedicated label manager",
      "API access & white-label tools",
    ],
    cta: "Talk to us",
  },
];

const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-[#F4F1EC] text-neutral-900 py-24 md:py-32"
      aria-labelledby="pricing-heading"
    >
      {/* Background — large faded display word + dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        aria-hidden
        className="absolute top-10 left-1/2 -translate-x-1/2 font-heading font-black uppercase text-[18vw] leading-none tracking-tighter text-neutral-900/[0.04] select-none pointer-events-none whitespace-nowrap"
      >
        Pricing
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-neutral-900/15 bg-white/60 backdrop-blur-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-green" />
            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-700">
              Plans & Pricing
            </span>
          </div>
          <h2
            id="pricing-heading"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-neutral-900 leading-[0.95] mb-5"
          >
            Choose the plan
            <br />
            <span className="text-neutral-500">that scales with you.</span>
          </h2>
          <p className="font-body text-base md:text-lg text-neutral-600 max-w-xl mx-auto">
            Distribution, marketing and label infrastructure — built for independent
            artists, signed talent and record labels.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto">
          {PLANS.map((plan, i) => (
            <motion.article
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className={[
                "group relative flex flex-col p-7 lg:p-8 border transition-all duration-300",
                plan.featured
                  ? "bg-neutral-950 text-white border-neutral-950 md:-translate-y-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]"
                  : "bg-white/80 backdrop-blur-sm border-neutral-900/10 hover:border-neutral-900/30 hover:-translate-y-1",
              ].join(" ")}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground font-heading text-[10px] font-black uppercase tracking-[0.2em]">
                  Most popular
                </div>
              )}

              {/* Plan name */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className={[
                    "font-heading text-[11px] font-bold uppercase tracking-[0.25em]",
                    plan.featured ? "text-primary" : "text-neutral-500",
                  ].join(" ")}
                >
                  {plan.name}
                </span>
                <span
                  className={[
                    "w-2 h-2 rounded-full",
                    plan.featured ? "bg-primary" : "bg-neutral-900/30",
                  ].join(" ")}
                />
              </div>

              {/* Price */}
              <div className="mb-2 flex items-baseline gap-1">
                <span
                  className={[
                    "font-heading text-5xl lg:text-6xl font-black tracking-tight",
                    plan.featured ? "text-white" : "text-neutral-900",
                  ].join(" ")}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span
                    className={[
                      "font-body text-sm",
                      plan.featured ? "text-white/60" : "text-neutral-500",
                    ].join(" ")}
                  >
                    {plan.period}
                  </span>
                )}
              </div>
              <p
                className={[
                  "font-body text-sm mb-7 leading-relaxed",
                  plan.featured ? "text-white/70" : "text-neutral-600",
                ].join(" ")}
              >
                {plan.tagline}
              </p>

              {/* Divider */}
              <div
                className={[
                  "h-px w-full mb-6",
                  plan.featured ? "bg-white/15" : "bg-neutral-900/10",
                ].join(" ")}
              />

              {/* Features */}
              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      className={[
                        "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                        plan.featured ? "bg-primary/15" : "bg-neutral-900/5",
                      ].join(" ")}
                    >
                      <Check
                        className={[
                          "h-2.5 w-2.5",
                          plan.featured ? "text-primary" : "text-neutral-900",
                        ].join(" ")}
                        strokeWidth={3}
                      />
                    </span>
                    <span
                      className={[
                        "font-body text-sm leading-snug",
                        plan.featured ? "text-white/85" : "text-neutral-800",
                      ].join(" ")}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="https://app.tracks.id/signup"
                className={[
                  "group/cta inline-flex items-center justify-center gap-2 w-full h-12 font-heading text-[11px] font-black uppercase tracking-[0.25em] transition-all",
                  plan.featured
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-neutral-900 text-white hover:bg-neutral-800",
                ].join(" ")}
              >
                {plan.cta}
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-1" />
              </a>
            </motion.article>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-12 text-center font-body text-xs text-neutral-500 uppercase tracking-[0.2em]">
          No hidden fees · Cancel anytime · 7-day free trial on paid plans
        </p>
      </div>
    </section>
  );
};

export default PricingSection;