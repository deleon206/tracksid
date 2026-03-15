import { motion } from "framer-motion";

const serviceChips = [
  "Distribution",
  "Content ID",
  "Licensing",
  "Playlist Pitching",
  "Promo Tools",
  "Press Support",
];

const CircleGraphic = () => (
  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="opacity-60" aria-hidden="true">
    <circle cx="80" cy="100" r="60" stroke="hsl(var(--primary))" strokeWidth="1" />
    <circle cx="120" cy="100" r="60" stroke="hsl(var(--primary))" strokeWidth="1" />
    <circle cx="100" cy="80" r="60" stroke="hsl(var(--primary))" strokeWidth="1" />
    <circle cx="100" cy="120" r="60" stroke="hsl(var(--primary))" strokeWidth="1" />
  </svg>
);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "32px 32px"
      }} aria-hidden="true" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-heading text-xs tracking-[0.3em] text-muted-foreground mb-6">
              // MUSIC INFRASTRUCTURE &gt;
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-heading font-black leading-[0.9] text-foreground mb-8">
              MUSIC DISTRIBUTION
              <br />
              FOR ARTISTS
              <br />
              AND LABELS
              <br />
              <span className="text-primary">WITH REAL</span>
              <br />
              <span className="text-primary">INFRASTRUCTURE</span>
            </h1>
            <p className="font-body text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-8">
              Launch, monetize, and scale your catalog with a platform that combines
              digital music distribution, Content ID, licensing, playlist pitching, promo tools, and
              support for artists, labels, and electronic music projects that need more than a basic aggregator.
            </p>
          </motion.div>

          <motion.div
            className="lg:col-span-4 flex flex-col items-end gap-4"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="font-heading text-[10px] tracking-[0.2em] text-muted-foreground text-right">
              // YOU SEE A NODE. WE SEE A NEXUS.
            </p>
            <CircleGraphic />
          </motion.div>
        </div>

        <motion.div
          className="mt-8 lg:mt-0 flex flex-col lg:flex-row items-stretch border-t border-border"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="bg-primary text-primary-foreground p-6 lg:p-8 lg:w-1/2 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-8 h-8 border-2 border-primary-foreground rounded-full flex items-center justify-center">
                <span className="font-heading text-xs font-bold">T/</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="#plans"
                className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-heading text-xs font-bold tracking-wider px-8 py-4 hover:opacity-90 transition-all duration-200 shrink-0"
              >
                VIEW PLANS <span>→</span>
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 border-2 border-primary-foreground text-primary-foreground font-heading text-xs font-bold tracking-wider px-8 py-4 hover:bg-primary-foreground hover:text-primary transition-all duration-200 shrink-0"
              >
                EXPLORE SERVICES
              </a>
            </div>
          </div>

          <div className="p-6 lg:p-8 lg:w-1/2 flex items-center border-l border-border">
            <div className="flex flex-wrap gap-2">
              {serviceChips.map((chip) => (
                <span
                  key={chip}
                  className="font-heading text-[10px] tracking-wider text-muted-foreground border border-border px-3 py-1.5"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
