import { motion } from "framer-motion";
import { useState } from "react";

const categories = [
  { key: "I", label: "Inventory" },
  { key: "D", label: "Distribution" },
  { key: "P", label: "Planning" },
  { key: "A", label: "Analytics" },
  { key: "M", label: "Manufacturing" },
  { key: "P2", label: "Production" },
];

const FeaturedSection = () => {
  const [active, setActive] = useState("P");

  return (
    <section className="py-24 border-t border-border">
      <div className="container">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          {/* Left - Black column */}
          <motion.div
            className="flex flex-col justify-between p-8 lg:p-12"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div>
              <p className="font-heading text-[10px] tracking-[0.3em] text-muted-foreground mb-6">
                // NEXT-GEN PLANNING & SCHEDULING
              </p>
              <h2 className="text-4xl md:text-6xl font-heading font-black leading-[0.9] text-foreground mb-8">
                BUILT FOR
                <br />
                MODERN
                <br />
                PRODUCERS
              </h2>
              <a
                href="#"
                className="inline-flex items-center gap-2 font-heading text-xs font-bold tracking-wider text-primary hover:brightness-110 transition-all"
              >
                LEARN MORE ABOUT PLANNING <span>→</span>
              </a>
            </div>

            <div className="flex items-center gap-3 mt-12">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActive(cat.key)}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-heading text-xs font-bold transition-all duration-300 ${
                    active === cat.key
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {cat.key === "P2" ? "P" : cat.key}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right - Green column */}
          <motion.div
            className="bg-primary text-primary-foreground p-8 lg:p-12 flex flex-col justify-between"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex justify-between items-start">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="opacity-40">
                <circle cx="35" cy="50" r="30" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="65" cy="50" r="30" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className="font-heading text-6xl font-black opacity-20">04</span>
            </div>

            <div className="mt-auto">
              <div className="w-12 h-12 border-2 border-primary-foreground rounded-full flex items-center justify-center mb-6">
                <span className="font-heading text-lg font-bold">P</span>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-black mb-4">
                PLANNING &<br />SCHEDULING
              </h3>
              <p className="font-body text-sm leading-relaxed opacity-80 max-w-sm">
                Plan smarter and stay ahead — real-time production schedules built to flex with your operation.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
