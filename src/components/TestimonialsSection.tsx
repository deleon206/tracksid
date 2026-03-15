import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "The team helped us secure sync placements and scale our catalog distribution across 30+ stores. The licensing workflow alone saved us months of back-and-forth.",
    name: "Marco V.",
    role: "Label Manager, Independent Electronic Label",
    rating: 5,
  },
  {
    quote: "As an independent artist, I needed more than just uploads. TRACKS/ID gave me playlist pitching, promo support, and a team that actually understands the electronic music space.",
    name: "Kira Santos",
    role: "Independent Artist & Producer",
    rating: 5,
  },
  {
    quote: "We moved our entire catalog here. The Content ID management, royalty split tools, and dedicated support made our label operations significantly smoother.",
    name: "Daniel K.",
    role: "Operations Director, Multi-Genre Label",
    rating: 4,
  },
  {
    quote: "Finally a platform that treats independent labels like real partners. The analytics dashboard alone changed how we plan our releases and marketing campaigns.",
    name: "Sofia R.",
    role: "A&R Director, Boutique Label",
    rating: 5,
  },
  {
    quote: "Content ID claims used to be a nightmare. Now everything is tracked, transparent, and resolved fast. Game changer for catalog owners.",
    name: "Liam T.",
    role: "Catalog Manager & Rights Holder",
    rating: 4,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [paused, next]);

  // Show 3 cards at a time on desktop
  const getVisible = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(testimonials[(current + i) % testimonials.length]);
    }
    return items;
  };

  return (
    <section className="py-24 border-t border-border overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex items-end justify-between"
        >
          <div>
            <p className="font-heading text-[10px] tracking-[0.3em] text-muted-foreground mb-4">
              // TRUSTED BY ARTISTS &amp; LABELS
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground">
              WHAT THEY SAY
            </h2>
          </div>

          {/* Dots indicator */}
          <div className="hidden md:flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === current ? "hsl(var(--primary))" : "hsl(var(--border))",
                  transform: i === current ? "scale(1.4)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Slider */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="grid md:grid-cols-3 gap-px bg-border"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {getVisible().map((t, i) => (
                <blockquote
                  key={`${t.name}-${i}`}
                  className="bg-background p-8 lg:p-10 flex flex-col justify-between min-h-[280px]"
                >
                  {/* Stars */}
                  <div>
                    <div className="flex items-center gap-1 mb-5">
                      {[...Array(5)].map((_, s) => (
                        <Star
                          key={s}
                          className="w-4 h-4"
                          fill={s < t.rating ? "hsl(var(--primary))" : "transparent"}
                          stroke={s < t.rating ? "hsl(var(--primary))" : "hsl(var(--border))"}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                    <p className="font-body text-sm text-foreground leading-relaxed italic border-l-2 border-primary pl-4">
                      "{t.quote}"
                    </p>
                  </div>
                  <footer className="mt-6">
                    <p className="font-heading text-xs font-bold tracking-wider text-foreground">{t.name}</p>
                    <p className="font-body text-xs text-muted-foreground mt-1">{t.role}</p>
                  </footer>
                </blockquote>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
