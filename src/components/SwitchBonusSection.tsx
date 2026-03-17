import { motion } from "framer-motion";
import { Star } from "lucide-react";

const platforms = [
  { name: "DistroKid", credits: "20 Free Credits", perk: "Plus free catalog migration" },
  { name: "TuneCore", credits: "25 Free Credits", perk: "Plus waived setup fees" },
  { name: "CD Baby", credits: "15 Free Credits", perk: "Plus priority onboarding" },
  { name: "Other Platforms", credits: "10 Free Credits", perk: "Plus migration assistance" },
];

const SwitchBonusSection = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-primary border border-primary/30 rounded-full px-5 py-2 bg-primary/5">
            <Star className="w-3.5 h-3.5 fill-primary" />
            LIMITED TIME OFFER
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-3xl md:text-5xl font-black text-center text-foreground mb-4"
        >
          Switch & Get <span className="text-primary">Bonus Credits</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-14 text-sm md:text-base leading-relaxed"
        >
          Migrating from another distributor? We'll help you switch for free and reward you with release credits. Keep your stream counts and artist profiles intact.
        </motion.p>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {platforms.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="group relative rounded-xl border border-border/60 bg-secondary/50 p-6 hover:border-primary/40 transition-colors duration-300"
            >
              <p className="font-heading text-sm font-bold text-foreground mb-2 tracking-wide">
                {p.name}
              </p>
              <p className="font-heading text-xl font-black text-primary mb-1">
                {p.credits}
              </p>
              <p className="text-muted-foreground text-xs">
                {p.perk}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-xl border border-border/40 bg-secondary/40 px-8 py-6"
        >
          <div>
            <p className="font-heading text-lg md:text-xl font-bold text-foreground">
              Ready to Make the Switch?
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Our migration team will handle everything for you—completely free. Stop paying yearly fees.
            </p>
          </div>
          <a
            href="#plans"
            className="shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading text-[11px] font-bold tracking-[0.15em] px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Claim Your Bonus <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SwitchBonusSection;
