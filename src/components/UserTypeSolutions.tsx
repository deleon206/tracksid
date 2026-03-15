import { motion } from "framer-motion";

const UserTypeSolutions = () => (
  <section className="py-24 border-t border-border">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        <p className="font-heading text-[10px] tracking-[0.3em] text-muted-foreground mb-4">
          // SOLUTIONS
        </p>
        <h2 className="text-4xl md:text-6xl font-heading font-black text-foreground">
          BUILT FOR YOUR
          <br />
          WORKFLOW
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-px bg-border">
        {/* For Artists */}
        <motion.div
          className="bg-background p-8 lg:p-12 flex flex-col justify-between min-h-[400px]"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center mb-6">
              <span className="font-heading text-lg font-bold text-primary">A</span>
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-black text-foreground mb-6 uppercase">
              For Artists
            </h3>
            <ul className="space-y-3">
              {[
                "Launch releases across all major platforms",
                "Monetize your catalog with Content ID and licensing",
                "Access playlist pitching and promo support",
                "Use pre-save links, smart pages, and campaign tools",
                "Get editorial, press, and media opportunities",
                "Receive dedicated artist support and guidance",
              ].map((item) => (
                <li key={item} className="font-body text-sm text-muted-foreground flex items-start gap-3">
                  <span className="text-primary mt-0.5 shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <a
            href="#plans"
            className="inline-flex items-center gap-2 font-heading text-xs font-bold tracking-wider text-primary hover:brightness-110 transition-all mt-8"
          >
            EXPLORE ARTIST SOLUTIONS <span>→</span>
          </a>
        </motion.div>

        {/* For Labels */}
        <motion.div
          className="bg-secondary p-8 lg:p-12 flex flex-col justify-between min-h-[400px]"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div>
            <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center mb-6">
              <span className="font-heading text-lg font-bold text-primary">L</span>
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-black text-foreground mb-6 uppercase">
              For Labels
            </h3>
            <ul className="space-y-3">
              {[
                "Manage multi-artist catalog distribution at scale",
                "Centralized rights, royalty splits, and reporting",
                "Streamlined release workflows and metadata management",
                "Content ID protection across your full catalog",
                "Label-wide promo, playlist pitching, and media access",
                "Dedicated label operations support and account management",
              ].map((item) => (
                <li key={item} className="font-body text-sm text-muted-foreground flex items-start gap-3">
                  <span className="text-primary mt-0.5 shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <a
            href="#plans"
            className="inline-flex items-center gap-2 font-heading text-xs font-bold tracking-wider text-primary hover:brightness-110 transition-all mt-8"
          >
            EXPLORE LABEL SOLUTIONS <span>→</span>
          </a>
        </motion.div>
      </div>
    </div>
  </section>
);

export default UserTypeSolutions;
