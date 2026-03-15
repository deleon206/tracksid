import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

const faqs = [
  {
    q: "WHAT DOES YOUR MUSIC DISTRIBUTION PLATFORM INCLUDE?",
    a: "Our platform includes worldwide digital music distribution to all major streaming services and stores, Content ID management, licensing support, playlist pitching, promo tools, pre-save links, royalty splits, catalog management, and dedicated support for artists and labels.",
  },
  {
    q: "DO YOU OFFER CONTENT ID AND LICENSING SERVICES?",
    a: "Yes. We provide automated Content ID registration and management across YouTube and other platforms, as well as sync licensing support for film, TV, advertising, and digital content placements.",
  },
  {
    q: "DO YOU WORK WITH BOTH ARTISTS AND RECORD LABELS?",
    a: "Absolutely. We offer tailored solutions for independent artists, producers, and record labels of all sizes — from single-artist projects to multi-catalog label operations with dedicated account management.",
  },
  {
    q: "DO YOU HELP WITH PLAYLIST PITCHING AND PROMO?",
    a: "Yes. Our team provides curated playlist pitching to editorial and independent playlists on Spotify, Apple Music, and other platforms, alongside broader promo campaign support including press, media outreach, and editorial features.",
  },
  {
    q: "WHAT MAKES TRACKS/ID DIFFERENT FROM A TYPICAL DISTRIBUTOR?",
    a: "We are a hybrid music infrastructure platform. Beyond basic distribution, we integrate licensing, Content ID, promo tools, press and media support, booking connections, and artist tools into a single platform — giving artists and labels the full infrastructure they need to grow, not just deliver.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    script.id = "faq-schema";
    document.head.appendChild(script);
    return () => { document.getElementById("faq-schema")?.remove(); };
  }, []);

  return (
    <section className="py-24 border-t border-border relative overflow-hidden">
      {/* Dot grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          {/* Left - Title + graphic */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <div className="absolute -left-1 top-0 w-[2px] h-8 bg-primary" />
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-foreground leading-[0.9]">
                GOT
                <br />
                QUESTIONS?
              </h2>
            </div>

            {/* Geometric icon */}
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                {/* Icosphere wireframe */}
                <circle cx="60" cy="60" r="50" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" />
                <ellipse cx="60" cy="60" rx="50" ry="20" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" />
                <ellipse cx="60" cy="60" rx="20" ry="50" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" />
                <ellipse cx="60" cy="60" rx="50" ry="35" stroke="hsl(var(--primary))" strokeWidth="0.8" fill="none" transform="rotate(30 60 60)" />
                <ellipse cx="60" cy="60" rx="50" ry="35" stroke="hsl(var(--primary))" strokeWidth="0.8" fill="none" transform="rotate(-30 60 60)" />
                {/* Question mark */}
                <text x="60" y="68" textAnchor="middle" fill="hsl(var(--primary))" fontSize="28" fontWeight="bold" fontFamily="inherit">?</text>
              </svg>
            </motion.div>
          </motion.div>

          {/* Right - FAQ items */}
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full text-left group"
                  >
                    <div
                      className="flex items-center justify-between px-6 py-5 border border-border bg-card/50 backdrop-blur-sm transition-all duration-300"
                      style={{
                        borderColor: isOpen ? "hsl(var(--primary))" : undefined,
                        backgroundColor: isOpen ? "hsl(var(--primary) / 0.05)" : undefined,
                      }}
                    >
                      <span className="font-heading text-xs md:text-sm font-bold tracking-[0.05em] text-foreground pr-4">
                        {faq.q}
                      </span>
                      <ChevronRight
                        className="w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:text-primary"
                        style={{
                          transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                          color: isOpen ? "hsl(var(--primary))" : undefined,
                        }}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 py-5 border border-t-0 border-primary/30 bg-primary/5">
                          <p className="font-body text-sm text-muted-foreground leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
