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
    <section className="relative h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "32px 32px"
      }} aria-hidden="true" />

      <div className="relative z-10 flex flex-col flex-1 h-full px-6 md:px-12 lg:px-16">
        {/* Main content area — headline left, circles top-right */}
        <div className="flex-1 flex items-end relative pt-20">
          {/* Circles positioned absolute top-right */}
          <motion.div
            className="absolute top-20 right-0 flex flex-col items-end gap-2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="font-heading text-[10px] tracking-[0.2em] text-muted-foreground">
              // YOU SEE A NODE. WE SEE A NEXUS.
            </p>
            <CircleGraphic />
          </motion.div>

          {/* Headline at bottom-left */}
          <motion.h1
            className="text-[clamp(2.5rem,7vw,6rem)] font-heading font-black leading-[0.9] tracking-tighter text-foreground pb-4"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            MUSIC
            <br />
            DISTRIBUTION
            <br />
            FOR ARTISTS
            <br />
            <span className="text-primary">&amp; LABELS</span>
          </motion.h1>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="flex flex-col sm:flex-row items-stretch border-t border-border -mx-6 md:-mx-12 lg:-mx-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="bg-primary text-primary-foreground px-6 md:px-12 lg:px-16 py-4 flex items-center gap-4 sm:max-w-[55%]">
            <div className="w-8 h-8 border-2 border-primary-foreground rounded-full flex items-center justify-center shrink-0">
              <span className="font-heading text-xs font-bold">T/</span>
            </div>
            <p className="font-heading text-[10px] md:text-xs tracking-wider font-bold uppercase">
              Music infrastructure to distribute, monetize, and grow your catalog
            </p>
          </div>

          <div className="flex-1 px-6 md:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-l border-border">
            <p className="font-body text-xs text-muted-foreground max-w-sm leading-relaxed">
              Launch, monetize, and scale your catalog with a platform built for artists, labels, and electronic music projects.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {serviceChips.map((chip) => (
                <span
                  key={chip}
                  className="font-heading text-[9px] tracking-wider text-muted-foreground border border-border px-2.5 py-1"
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
