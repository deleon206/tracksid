import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const services = [
  {
    id: "distribution",
    key: "D",
    tag: "// GLOBAL DISTRIBUTION",
    title: "DISTRIBUTION",
    description:
      "Deliver your music to 150+ platforms worldwide. Real-time analytics, release scheduling, and automated delivery — built to scale without chaos.",
    color: "hsl(var(--primary))",
    graphic: (
      <svg width="280" height="280" viewBox="0 0 280 280" fill="none" className="w-full h-full max-w-[280px]">
        <rect x="60" y="60" width="70" height="70" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <rect x="120" y="120" width="100" height="100" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <rect x="90" y="90" width="80" height="80" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <line x1="60" y1="60" x2="90" y2="90" stroke="currentColor" strokeWidth="1" />
        <line x1="130" y1="60" x2="170" y2="90" stroke="currentColor" strokeWidth="1" />
        <line x1="130" y1="130" x2="220" y2="220" stroke="currentColor" strokeWidth="1" />
        <circle cx="60" cy="60" r="4" fill="currentColor" />
        <circle cx="130" cy="130" r="4" fill="currentColor" />
        <circle cx="220" cy="220" r="4" fill="currentColor" />
        <circle cx="170" cy="90" r="4" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "bookings",
    key: "B",
    tag: "// ARTIST BOOKINGS",
    title: "BOOKINGS",
    description:
      "Book artists for festivals, clubs, and events around the world. Our booking agency connects talent with promoters across Europe, LATAM, Asia, and beyond.",
    color: "hsl(280, 80%, 60%)",
    graphic: (
      <svg width="280" height="280" viewBox="0 0 280 280" fill="none" className="w-full h-full max-w-[280px]">
        <circle cx="140" cy="140" r="110" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="140" cy="140" r="70" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="140" cy="140" r="30" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <line x1="140" y1="30" x2="140" y2="250" stroke="currentColor" strokeWidth="1" />
        <line x1="30" y1="140" x2="250" y2="140" stroke="currentColor" strokeWidth="1" />
        <circle cx="140" cy="30" r="4" fill="currentColor" />
        <circle cx="250" cy="140" r="4" fill="currentColor" />
        <circle cx="140" cy="250" r="4" fill="currentColor" />
        <circle cx="30" cy="140" r="4" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "licensing",
    key: "L",
    tag: "// SYNC & LICENSING",
    title: "LICENSING",
    description:
      "License your music for films, TV shows, commercials, retail stores, and digital content. We handle sync deals, mechanical rights, and placement negotiations.",
    color: "hsl(200, 90%, 55%)",
    graphic: (
      <svg width="280" height="280" viewBox="0 0 280 280" fill="none" className="w-full h-full max-w-[280px]">
        <rect x="70" y="70" width="140" height="140" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <line x1="70" y1="70" x2="210" y2="210" stroke="currentColor" strokeWidth="1" />
        <line x1="210" y1="70" x2="70" y2="210" stroke="currentColor" strokeWidth="1" />
        <circle cx="140" cy="140" r="60" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="70" cy="70" r="4" fill="currentColor" />
        <circle cx="210" cy="70" r="4" fill="currentColor" />
        <circle cx="70" cy="210" r="4" fill="currentColor" />
        <circle cx="210" cy="210" r="4" fill="currentColor" />
        <circle cx="140" cy="140" r="4" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "tools",
    key: "T",
    tag: "// ALL-IN-ONE TOOLS",
    title: "ARTIST\nTOOLS",
    description:
      "Everything you need in one platform: pre-save campaigns, marketing tools, playlist pitching, artwork generation, smart links, and release planning.",
    color: "hsl(152, 100%, 50%)",
    graphic: (
      <svg width="280" height="280" viewBox="0 0 280 280" fill="none" className="w-full h-full max-w-[280px]">
        <ellipse cx="140" cy="140" rx="100" ry="60" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(-30 140 140)" />
        <ellipse cx="140" cy="140" rx="100" ry="60" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(30 140 140)" />
        <ellipse cx="140" cy="140" rx="100" ry="60" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(90 140 140)" />
        <circle cx="140" cy="50" r="4" fill="currentColor" />
        <circle cx="80" cy="200" r="4" fill="currentColor" />
        <circle cx="200" cy="200" r="4" fill="currentColor" />
        <circle cx="140" cy="140" r="4" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "press",
    key: "P",
    tag: "// PRESS & PR",
    title: "PRESS\n& PR",
    description:
      "Leverage our network of media partners including DJ Mag, We Rave You, MixMag, and more. Get editorial coverage, reviews, and premiere placements.",
    color: "hsl(20, 90%, 55%)",
    graphic: (
      <svg width="280" height="280" viewBox="0 0 280 280" fill="none" className="w-full h-full max-w-[280px]">
        <polygon points="140,40 240,110 210,230 70,230 40,110" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <polygon points="140,80 200,120 180,200 100,200 80,120" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="140" cy="40" r="4" fill="currentColor" />
        <circle cx="240" cy="110" r="4" fill="currentColor" />
        <circle cx="210" cy="230" r="4" fill="currentColor" />
        <circle cx="70" cy="230" r="4" fill="currentColor" />
        <circle cx="40" cy="110" r="4" fill="currentColor" />
        <circle cx="140" cy="140" r="4" fill="currentColor" />
      </svg>
    ),
  },
];

const navLetters = services.map((s) => ({ letter: s.key, color: s.color }));

const HybridPlatformSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const idx = Math.min(Math.floor(v * services.length), services.length - 1);
      setActiveIndex(idx);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const activeService = services[activeIndex];

  return (
    <section ref={sectionRef} className="relative border-t border-border" style={{ height: `${services.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="grid lg:grid-cols-2 h-full">
          {/* Left side */}
          <div className="flex flex-col justify-between p-8 lg:p-12 xl:p-16 bg-background relative">
            <div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeService.tag}
                  className="font-heading text-[10px] tracking-[0.3em] text-primary mb-6 border border-primary/40 inline-block px-3 py-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeService.tag}
                </motion.p>
              </AnimatePresence>

              <div className="relative mt-4">
                <div className="absolute -left-2 top-0 bottom-0 w-[1px] bg-border" />
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black leading-[0.9] text-foreground pl-6">
                  BUILT FOR
                  <br />
                  MODERN
                  <br />
                  ARTISTS
                </h2>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.a
                key={activeService.id}
                href={activeService.id === "distribution" ? "/distribution" : "#plans"}
                className="inline-flex items-center gap-2 font-heading text-[11px] font-bold tracking-[0.15em] px-6 py-3 border transition-all duration-200 mt-8 self-start"
                style={{ borderColor: activeService.color, color: activeService.color }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                whileHover={{ backgroundColor: activeService.color, color: "hsl(0,0%,0%)" }}
              >
                LEARN MORE ABOUT {activeService.title.split("\n")[0]} <span>→</span>
              </motion.a>
            </AnimatePresence>

            {/* Nav letters */}
            <div className="flex items-center gap-8 mt-8">
              {navLetters.map((item, i) => (
                <button
                  key={item.letter}
                  onClick={() => {
                    if (!sectionRef.current) return;
                    const sectionTop = sectionRef.current.offsetTop;
                    const sectionHeight = sectionRef.current.offsetHeight;
                    const targetScroll = sectionTop + (sectionHeight * i) / services.length + 10;
                    window.scrollTo({ top: targetScroll, behavior: "smooth" });
                  }}
                  className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 font-heading text-xs font-bold tracking-wider transition-all duration-300"
                  style={{
                    borderColor: i === activeIndex ? item.color : "hsl(var(--border))",
                    color: i === activeIndex ? item.color : "hsl(var(--muted-foreground))",
                    backgroundColor: i === activeIndex ? `${item.color}15` : "transparent",
                  }}
                >
                  {item.letter}
                </button>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                className="absolute inset-0 flex flex-col justify-between p-8 lg:p-12 xl:p-16"
                style={{ backgroundColor: activeService.color, color: "hsl(0, 0%, 0%)" }}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex justify-center items-center flex-1 opacity-30">
                  {activeService.graphic}
                </div>
                <motion.div
                  className="mt-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-black uppercase whitespace-pre-line mb-4">
                    {activeService.title}
                  </h3>
                  <p className="font-body text-sm md:text-base leading-relaxed opacity-70 max-w-md">
                    {activeService.description}
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HybridPlatformSection;
