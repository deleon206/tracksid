import { motion } from "framer-motion";

const HybridPlatformSection = () => (
  <section className="py-24 border-t border-border">
    <div className="container">
      <div className="grid lg:grid-cols-2 min-h-[500px]">
        <motion.div
          className="flex flex-col justify-between p-8 lg:p-12"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p className="font-heading text-[10px] tracking-[0.3em] text-muted-foreground mb-6">
              // BEYOND AGGREGATION
            </p>
            <h2 className="text-4xl md:text-6xl font-heading font-black leading-[0.9] text-foreground mb-8">
              A HYBRID
              <br />
              PLATFORM FOR
              <br />
              ARTISTS AND
              <br />
              LABELS
            </h2>
          </div>
          <a
            href="#plans"
            className="inline-flex items-center gap-2 font-heading text-xs font-bold tracking-wider text-primary hover:brightness-110 transition-all"
          >
            VIEW PLANS <span>→</span>
          </a>
        </motion.div>

        <motion.div
          className="bg-primary text-primary-foreground p-8 lg:p-12 flex flex-col justify-between"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="flex justify-between items-start">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="opacity-40" aria-hidden="true">
              <circle cx="35" cy="50" r="30" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="65" cy="50" r="30" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className="font-heading text-6xl font-black opacity-20">∞</span>
          </div>

          <div className="mt-auto">
            <h3 className="font-heading text-xl md:text-2xl font-black mb-4 uppercase">
              Connected Infrastructure
            </h3>
            <p className="font-body text-sm leading-relaxed opacity-80 max-w-sm">
              This is not a simple upload-and-deliver service. It is a connected infrastructure
              for releasing music, managing rights, activating monetization, and supporting growth
              across distribution, promo, licensing, and industry access.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HybridPlatformSection;
