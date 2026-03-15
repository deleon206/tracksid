import { motion } from "framer-motion";

const tools = [
  { label: "Pre-Save Links", desc: "Generate pre-save pages for upcoming releases to build momentum before launch day." },
  { label: "Promo Landing Pages", desc: "Create branded smart links and landing pages for your releases and campaigns." },
  { label: "Metadata & Release Readiness", desc: "Validate and optimize your release metadata for maximum discoverability across platforms." },
  { label: "Royalty Splits", desc: "Manage collaborator splits and transparent royalty distribution directly within the platform." },
  { label: "Catalog Management", desc: "Organize, update, and maintain your full catalog with centralized rights and asset management." },
  { label: "Campaign Analytics", desc: "Track release performance, streaming data, and campaign results in real time." },
];

const ArtistToolsSection = () => (
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
          // BUILT-IN TOOLS
        </p>
        <h2 className="text-4xl md:text-6xl font-heading font-black text-foreground mb-6">
          ARTIST &amp; LABEL
          <br />
          TOOLS
        </h2>
        <p className="font-body text-base text-muted-foreground max-w-lg leading-relaxed">
          Every tool you need to launch, promote, and manage your music — integrated into the platform, not bolted on as add-ons.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.label}
            className="bg-background p-8 group hover:bg-secondary transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <h3 className="font-heading text-sm font-bold tracking-wider text-primary mb-3 uppercase">
              {tool.label}
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {tool.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ArtistToolsSection;
