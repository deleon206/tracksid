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
    <section className="relative min-h-screen flex flex-col pt-20 overflow-hidden">
      {/* Dot pattern background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "32px 32px"
      }} aria-hidden="true" />

      <div className="container relative z-10 flex flex-col flex-1">
        {/* Top right: tagline + circle graphic */}
        <motion.div
          className="flex justify-end items-start pt-4"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex flex-col items-end gap-2">
            <p className="font-heading text-[10px] tracking-[0.2em] text-muted-foreground text-right">
              // YOU SEE A NODE. WE SEE A NEXUS.
            </p>
            <CircleGraphic />
          </div>
        </motion.div>

        {/* Main headline — large, filling the middle */}
        <motion.div
          className="flex-1 flex items-center"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] xl:text-[8rem] font-heading font-black leading-[0.9] tracking-tight text-foreground">
            MUSIC
            <br />
            DISTRIBUTION
            <br />
            FOR ARTISTS
            <br />
            <span className="text-primary">&amp; LABELS</span>
          </h1>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="mt-auto flex flex-col lg:flex-row items-stretch border-t border-border"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {/* Right side: description + error-log style text */}
          <div className="p-6 lg:p-8 lg:flex-1 flex flex-col justify-center gap-4">
            <p className="font-heading text-[10px] tracking-[0.2em] text-muted-foreground">
              ERROR LOGS: 0
            </p>
            <p className="font-body text-sm md:text-base text-muted-foreground max-w-lg leading-relaxed">
              Launch, monetize, and scale your catalog with a platform built for
              artists, labels, and electronic music projects that need more than a basic aggregator.
            </p>
          </div>

          {/* CTA button area */}
          <div className="flex items-center gap-4 p-6 lg:p-8">
            <a
              href="#plans"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading text-xs font-bold tracking-wider px-8 py-4 hover:opacity-90 transition-all duration-200"
            >
              VIEW PLANS <span>→</span>
            </a>
          </div>
        </motion.div>

        {/* Bottom strip with logo mark + service description */}
        <motion.div
          className="flex flex-col sm:flex-row items-stretch border-t border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="bg-primary text-primary-foreground p-4 lg:p-6 flex items-center gap-4">
            <div className="w-8 h-8 border-2 border-primary-foreground rounded-full flex items-center justify-center shrink-0">
              <span className="font-heading text-xs font-bold">T/</span>
            </div>
            <p className="font-heading text-[10px] md:text-xs tracking-wider font-bold uppercase">
              Music infrastructure to distribute, monetize, and grow your catalog
            </p>
          </div>
          <div className="p-4 lg:p-6 flex items-center flex-1">
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
