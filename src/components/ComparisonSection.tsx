import { motion } from "framer-motion";
import { Check, X, Crown, Zap, Shield } from "lucide-react";

type FeatureValue = boolean | string;

interface ComparisonFeature {
  category: string;
  feature: string;
  tracksId: FeatureValue;
  distrokid: FeatureValue;
  tunecore: FeatureValue;
  cdbaby: FeatureValue;
  traditionalLabel: FeatureValue;
}

const features: ComparisonFeature[] = [
  {
    category: "Distribution",
    feature: "Distribution to 150+ platforms",
    tracksId: true,
    distrokid: true,
    tunecore: true,
    cdbaby: true,
    traditionalLabel: true,
  },
  {
    category: "Distribution",
    feature: "Dolby Atmos & Spatial Audio support",
    tracksId: "Free",
    distrokid: "$12.99/yr extra",
    tunecore: "Premium plans only",
    cdbaby: false,
    traditionalLabel: "Varies",
  },
  {
    category: "Distribution",
    feature: "Highest royalty pay-rate",
    tracksId: "100%",
    distrokid: "100%*",
    tunecore: "100%*",
    cdbaby: "91% (9% fee)",
    traditionalLabel: "15-25%",
  },
  {
    category: "Licensing",
    feature: "Sync & Licensing (TV, Film, Netflix, HBO)",
    tracksId: true,
    distrokid: false,
    tunecore: "Limited",
    cdbaby: "Basic",
    traditionalLabel: true,
  },
  {
    category: "Licensing",
    feature: "Major label licensing (Sony, UMG, Warner) for Covers & Remixes",
    tracksId: true,
    distrokid: false,
    tunecore: false,
    cdbaby: false,
    traditionalLabel: "Varies",
  },
  {
    category: "Press",
    feature: "PR & Press (DJ Mag, MixMag, etc.)",
    tracksId: true,
    distrokid: false,
    tunecore: false,
    cdbaby: false,
    traditionalLabel: true,
  },
  {
    category: "Press",
    feature: "Playlist & Editorial pitching",
    tracksId: true,
    distrokid: false,
    tunecore: "Extra $",
    cdbaby: false,
    traditionalLabel: true,
  },
  {
    category: "Press",
    feature: "Radio pitching",
    tracksId: true,
    distrokid: false,
    tunecore: false,
    cdbaby: false,
    traditionalLabel: true,
  },
  {
    category: "Tools",
    feature: "Full catalog management platform",
    tracksId: true,
    distrokid: true,
    tunecore: true,
    cdbaby: "Limited",
    traditionalLabel: false,
  },
  {
    category: "Tools",
    feature: "Pre-save campaigns",
    tracksId: "Included",
    distrokid: "$0.99/song extra",
    tunecore: "Premium plans only",
    cdbaby: false,
    traditionalLabel: "Varies",
  },
  {
    category: "Tools",
    feature: "Marketing tools & Smart Links",
    tracksId: "Included",
    distrokid: "HyperFollow (limited)",
    tunecore: "Extra $",
    cdbaby: "Basic",
    traditionalLabel: false,
  },
  {
    category: "Tools",
    feature: "Official chart registration",
    tracksId: true,
    distrokid: false,
    tunecore: true,
    cdbaby: true,
    traditionalLabel: true,
  },
  {
    category: "Pricing",
    feature: "No subscription — Pay-per-use with credits",
    tracksId: true,
    distrokid: false,
    tunecore: false,
    cdbaby: "One-time fee",
    traditionalLabel: false,
  },
  {
    category: "Pricing",
    feature: "Tracks stay published forever — No subscription needed",
    tracksId: true,
    distrokid: false,
    tunecore: false,
    cdbaby: true,
    traditionalLabel: "Contract-dependent",
  },
  {
    category: "Tools",
    feature: "Mechanical royalty collection (ASCAP, BMI & other PROs)",
    tracksId: true,
    distrokid: false,
    tunecore: "Extra $",
    cdbaby: "Publishing add-on",
    traditionalLabel: true,
  },
  {
    category: "Tools",
    feature: "Blockchain-powered authorship & copyright registration",
    tracksId: true,
    distrokid: false,
    tunecore: false,
    cdbaby: false,
    traditionalLabel: false,
  },
  {
    category: "Support",
    feature: "Concierge support — Real humans, no bots",
    tracksId: true,
    distrokid: false,
    tunecore: "Premium plans only",
    cdbaby: "Basic email",
    traditionalLabel: true,
  },
];

const categoryLabels: Record<string, string> = {
  Distribution: "— Distribution",
  Licensing: "— Licensing & Sync",
  Press: "— Press & Promotion",
  Tools: "— Tools & Platform",
  Pricing: "— Pricing Model",
  Support: "— Support",
};

const ValueCell = ({ value, isTracksId = false }: { value: FeatureValue; isTracksId?: boolean }) => {
  if (value === true) {
    return (
      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${isTracksId ? "bg-[hsl(48,90%,50%)] text-black" : "bg-emerald-100 text-emerald-600"}`}>
        <Check className="w-3.5 h-3.5" strokeWidth={3} />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-50 text-red-400">
        <X className="w-3.5 h-3.5" strokeWidth={3} />
      </span>
    );
  }
  return (
    <span className={`text-[11px] font-medium leading-tight text-center ${isTracksId ? "text-[hsl(48,90%,50%)] font-bold" : "text-neutral-500"}`}>
      {value}
    </span>
  );
};

/* ──────────────────────────────────────────────
   Mobile card for a single feature row
   ────────────────────────────────────────────── */
const MobileFeatureCard = ({ f }: { f: ComparisonFeature }) => {
  const competitors = [
    { name: "DistroKid", value: f.distrokid },
    { name: "TuneCore", value: f.tunecore },
    { name: "CD Baby", value: f.cdbaby },
    { name: "Trad. Label", value: f.traditionalLabel },
  ];

  return (
    <div className="border border-neutral-200 rounded-xl p-4 bg-white">
      <p className="font-body text-sm text-neutral-800 font-medium mb-3 leading-snug">{f.feature}</p>

      {/* TRACKS/ID highlight */}
      <div className="flex items-center justify-between bg-neutral-900 rounded-lg px-3 py-2.5 mb-3">
        <span className="font-heading text-[10px] font-black tracking-wider text-white">TRACKS/ID</span>
        <ValueCell value={f.tracksId} isTracksId />
      </div>

      {/* Competitors grid */}
      <div className="grid grid-cols-2 gap-2">
        {competitors.map((c) => (
          <div key={c.name} className="flex items-center justify-between bg-neutral-50 rounded-lg px-2.5 py-2">
            <span className="font-heading text-[9px] font-bold tracking-wider text-neutral-400">{c.name}</span>
            <ValueCell value={c.value} />
          </div>
        ))}
      </div>
    </div>
  );
};

const ComparisonSection = () => {
  const categories = [...new Set(features.map((f) => f.category))];

  return (
    <section className="relative bg-white py-16 sm:py-20 lg:py-28 overflow-hidden">
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container relative z-10 px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="font-heading text-[10px] tracking-[0.3em] text-[hsl(48,90%,50%)] border border-[hsl(48,90%,50%)]/40 inline-block px-3 py-1 mb-6">
            // WHY WE'RE DIFFERENT
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-neutral-900 leading-[0.95] mb-5">
            COMPARE TRACKS/ID VS{" "}
            <span className="text-[hsl(48,90%,50%)]">THE INDUSTRY STANDARDS</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            We're the only option on the market that combines record label services with digital distributor infrastructure and technology. No subscriptions, no hidden fees.
          </p>
        </motion.div>

        {/* Highlight badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10 sm:mb-12"
        >
          {[
            { icon: Crown, text: "Label Services" },
            { icon: Zap, text: "Distributor Technology" },
            { icon: Shield, text: "No Subscriptions" },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-full"
            >
              <Icon className="w-3.5 h-3.5 text-[hsl(48,90%,50%)]" />
              <span className="font-heading text-[10px] font-bold tracking-[0.1em] uppercase">
                {text}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ═══ DESKTOP TABLE (hidden on mobile) ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden md:block overflow-x-auto -mx-4 px-4"
        >
          <table className="w-full min-w-[780px] border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 lg:p-4 font-heading text-[10px] tracking-[0.15em] text-neutral-400 uppercase w-[30%]">
                  Feature
                </th>
                <th className="p-3 lg:p-4 text-center w-[17.5%] border-l-2 border-r-2 border-t-2 border-[hsl(48,90%,50%)]/40 rounded-t-xl bg-[hsl(48,90%,97%)]">
                  <div className="inline-flex flex-col items-center gap-1.5 bg-neutral-900 text-white px-4 py-2.5 rounded-xl -mt-2 shadow-lg shadow-[hsl(48,90%,50%)]/20">
                    <span className="font-heading text-[11px] font-black tracking-[0.1em]">TRACKS/ID</span>
                    <span className="text-[9px] text-[hsl(48,90%,50%)] font-bold tracking-wider">LABEL + DISTRO</span>
                  </div>
                </th>
                <th className="p-3 lg:p-4 text-center w-[13.75%]">
                  <span className="font-heading text-[10px] font-bold tracking-wider text-neutral-500">DistroKid</span>
                  <p className="text-[9px] text-neutral-400 mt-0.5">$22.99/yr</p>
                </th>
                <th className="p-3 lg:p-4 text-center w-[13.75%]">
                  <span className="font-heading text-[10px] font-bold tracking-wider text-neutral-500">TuneCore</span>
                  <p className="text-[9px] text-neutral-400 mt-0.5">$9.99+/yr</p>
                </th>
                <th className="p-3 lg:p-4 text-center w-[13.75%]">
                  <span className="font-heading text-[10px] font-bold tracking-wider text-neutral-500">CD Baby</span>
                  <p className="text-[9px] text-neutral-400 mt-0.5">$9.95+ / 9% fee</p>
                </th>
                <th className="p-3 lg:p-4 text-center w-[13.75%]">
                  <span className="font-heading text-[10px] font-bold tracking-wider text-neutral-500">Trad. Label</span>
                  <p className="text-[9px] text-neutral-400 mt-0.5">75-85% cut</p>
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat) => (
                <>
                  <tr key={`cat-${cat}`}>
                    <td
                      colSpan={6}
                      className="pt-6 pb-2 px-3 lg:px-4 font-heading text-[9px] font-bold tracking-[0.25em] uppercase text-[hsl(48,90%,50%)]"
                    >
                      {categoryLabels[cat]}
                    </td>
                  </tr>
                  {features
                    .filter((f) => f.category === cat)
                    .map((f, i) => (
                      <tr
                        key={f.feature}
                        className={`border-b border-neutral-100 ${i % 2 === 0 ? "bg-neutral-50/50" : ""} hover:bg-[hsl(48,90%,95%)] transition-colors`}
                      >
                        <td className="p-3 lg:p-4 font-body text-xs lg:text-sm text-neutral-700 leading-snug">
                          {f.feature}
                        </td>
                        <td className="p-3 lg:p-4 text-center bg-[hsl(48,90%,97%)]">
                          <div className="flex justify-center">
                            <ValueCell value={f.tracksId} isTracksId />
                          </div>
                        </td>
                        <td className="p-3 lg:p-4 text-center">
                          <div className="flex justify-center"><ValueCell value={f.distrokid} /></div>
                        </td>
                        <td className="p-3 lg:p-4 text-center">
                          <div className="flex justify-center"><ValueCell value={f.tunecore} /></div>
                        </td>
                        <td className="p-3 lg:p-4 text-center">
                          <div className="flex justify-center"><ValueCell value={f.cdbaby} /></div>
                        </td>
                        <td className="p-3 lg:p-4 text-center">
                          <div className="flex justify-center"><ValueCell value={f.traditionalLabel} /></div>
                        </td>
                      </tr>
                    ))}
                </>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* ═══ MOBILE CARDS (hidden on desktop) ═══ */}
        <div className="md:hidden space-y-8">
          {categories.map((cat) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-heading text-[9px] font-bold tracking-[0.25em] uppercase text-[hsl(48,90%,50%)] mb-3">
                {categoryLabels[cat]}
              </p>
              <div className="space-y-3">
                {features
                  .filter((f) => f.category === cat)
                  .map((f) => (
                    <MobileFeatureCard key={f.feature} f={f} />
                  ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footnote */}
        <p className="text-[10px] text-neutral-400 mt-6 text-center font-body">
          * DistroKid & TuneCore require annual subscriptions. If you cancel, your music gets removed. TRACKS/ID uses a credit-based model with no subscriptions.
        </p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <a
            href="#plans"
            className="inline-flex items-center justify-center gap-2 bg-neutral-900 text-white font-heading text-[11px] font-bold tracking-[0.15em] px-8 py-4 rounded-full hover:bg-[hsl(48,90%,50%)] hover:text-black transition-all duration-300"
          >
            GET STARTED FREE <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
