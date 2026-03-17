import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Globe, Headphones, Film, Wrench, Newspaper } from "lucide-react";

/* ─── Service data ─── */
const services = [
  {
    key: "D",
    icon: Globe,
    title: "Distribution",
    kicker: "150+ STORES",
    description:
      "Deliver your music to 150+ platforms worldwide. Real-time analytics, release scheduling, and automated delivery — built to scale without chaos.",
    highlights: ["Spotify", "Apple Music", "Beatport", "Amazon", "Deezer"],
  },
  {
    key: "B",
    icon: Headphones,
    title: "Bookings",
    kicker: "WORLDWIDE",
    description:
      "Book artists for festivals, clubs, and events around the world. Our agency connects talent with promoters across Europe, LATAM, Asia, and beyond.",
    highlights: ["Festivals", "Clubs", "Global tours", "Event management"],
  },
  {
    key: "L",
    icon: Film,
    title: "Licensing",
    kicker: "SYNC & PLACEMENT",
    description:
      "License your music for films, TV, commercials, and retail stores. We handle sync deals, mechanical rights, and placement negotiations globally.",
    highlights: ["Film & TV sync", "Commercial use", "Retail placement"],
  },
  {
    key: "T",
    icon: Wrench,
    title: "Artist Tools",
    kicker: "ALL-IN-ONE",
    description:
      "Everything you need in one platform: pre-save campaigns, marketing tools, playlist pitching, artwork generation, smart links, and release planning.",
    highlights: ["Pre-save", "Playlist pitching", "Artwork generator", "Smart links"],
  },
  {
    key: "P",
    icon: Newspaper,
    title: "Press & PR",
    kicker: "MEDIA NETWORK",
    description:
      "Leverage our network of media partners including DJ Mag, We Rave You, MixMag and more. Get editorial coverage, reviews, and premiere placements.",
    highlights: ["DJ Mag", "MixMag", "We Rave You", "Editorial premieres"],
  },
];

/* ─── Geometric graphic per service ─── */
const ServiceGraphic = ({ serviceKey }: { serviceKey: string }) => {
  const Icon = services.find((s) => s.key === serviceKey)!.icon;
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Decorative lines */}
      <div className="absolute w-32 h-32 sm:w-40 sm:h-40 border border-primary-foreground/20 rotate-12" />
      <div className="absolute w-24 h-24 sm:w-32 sm:h-32 border border-primary-foreground/15 -rotate-6 translate-x-4 translate-y-4" />
      <div className="absolute w-16 h-16 sm:w-20 sm:h-20 border border-primary-foreground/10 rotate-45 -translate-x-6 translate-y-8" />
      {/* Dot accents */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-primary-foreground/40" />
      <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-primary-foreground/30" />
      {/* Center icon */}
      <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 border-2 border-primary-foreground/30 rounded-full flex items-center justify-center bg-primary/80">
        <Icon className="w-7 h-7 sm:w-9 sm:h-9 text-primary-foreground" strokeWidth={1.5} />
      </div>
    </div>
  );
};

const CapabilitiesSection = () => {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section id="services" className="border-t border-border" aria-labelledby="what-we-do-heading">
      <div className="grid lg:grid-cols-2 min-h-[600px] lg:min-h-[700px]">
        {/* ─── LEFT: Black panel ─── */}
        <motion.div
          className="flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-background"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            {/* Kicker */}
            <motion.p
              className="font-heading text-[10px] tracking-[0.3em] text-primary mb-8 border border-primary/40 inline-block px-3 py-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              // WHAT WE DO
            </motion.p>

            {/* Headline */}
            <h2
              id="what-we-do-heading"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-foreground leading-[0.9]"
            >
              BUILT FOR
              <br />
              MODERN
              <br />
              ARTISTS
            </h2>

            {/* CTA */}
            <motion.a
              href="/distribution"
              className="inline-flex items-center gap-2 mt-10 font-heading text-[11px] font-bold uppercase tracking-[0.15em] border border-primary text-primary px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              Learn More About Distribution
              <span>→</span>
            </motion.a>
          </div>

          {/* Tab circles */}
          <div className="flex items-center gap-3 mt-12">
            {services.map((s, i) => (
              <button
                key={s.key}
                onClick={() => setActive(i)}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-heading text-xs font-bold transition-all duration-300 ${
                  active === i
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border/60 text-muted-foreground hover:border-muted-foreground"
                }`}
                aria-label={s.title}
              >
                {s.key}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ─── RIGHT: Gold panel with active service ─── */}
        <div className="relative bg-primary overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.key}
              className="flex flex-col h-full p-8 sm:p-12 lg:p-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              {/* Geometric graphic */}
              <div className="flex-1 flex items-center justify-center min-h-[180px] lg:min-h-[250px]">
                <ServiceGraphic serviceKey={current.key} />
              </div>

              {/* Service info */}
              <div className="mt-8">
                <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-primary-foreground leading-tight uppercase">
                  {current.title}
                </h3>
                <p className="font-body text-sm sm:text-base text-primary-foreground/70 mt-4 max-w-lg leading-relaxed">
                  {current.description}
                </p>

                {/* Highlight tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {current.highlights.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-primary-foreground/60 border border-primary-foreground/20 rounded-full px-3 py-1"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary-foreground/50" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
