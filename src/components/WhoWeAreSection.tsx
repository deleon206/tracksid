import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ─── Partner badges ─── */
const partners = [
  "DJ Mag", "Beatport", "Hexagon", "Spinnin' Records",
  "Protocol Records", "Insomniac", "Creamfields", "One World Radio",
];

/* ─── Hexagon SVG ─── */
const Hexagon = ({ className, strokeColor, size = "md", children }: {
  className?: string;
  strokeColor: string;
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
}) => {
  const sizes = { sm: "w-20 h-24", md: "w-28 h-32", lg: "w-36 h-40" };
  return (
    <div className={`relative ${sizes[size]} ${className ?? ""}`}>
      <svg viewBox="0 0 120 140" className="w-full h-full">
        <polygon
          points="60,5 115,37.5 115,102.5 60,135 5,102.5 5,37.5"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

/* ─── Diagonal cable connecting a top node to the center merge node ─── */
const DiagonalCable = ({ inView, delay = 0, direction }: { inView: boolean; delay?: number; direction: "left" | "right" }) => {
  // Left cable goes from top-right to bottom-left; right cable mirrors
  const path = direction === "left"
    ? "M 45,0 C 40,25 20,50 5,80"
    : "M 5,0 C 10,25 30,50 45,80";

  return (
    <div className="w-[50px] h-[80px]">
      <svg viewBox="0 0 50 80" className="w-full h-full overflow-visible">
        <motion.path
          d={path}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.8, delay: delay + 0.4 }}
        />
        <motion.path
          d={path}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.8, delay: delay + 0.6 }}
          style={{ filter: "drop-shadow(0 0 4px hsl(var(--primary)))" }}
        />
        {inView && [0, 1].map((i) => (
          <circle
            key={i}
            r="2.5"
            fill="hsl(var(--primary))"
            style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary)))" }}
          >
            <animateMotion
              dur="1.6s"
              begin={`${delay + 1 + i * 0.8}s`}
              repeatCount="indefinite"
              path={path}
            />
          </circle>
        ))}
      </svg>
    </div>
  );
};

const WhoWeAreSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="py-24 border-t border-border overflow-hidden"
      aria-labelledby="who-we-are-heading"
    >
      <div className="container">
        {/* ─── 2-column layout: text left, visual right ─── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">

          {/* ── LEFT: Text content ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-heading text-[10px] tracking-[0.3em] text-primary mb-6 border border-primary/40 inline-block px-3 py-1">
              // WHO WE ARE
            </p>
            <h2
              id="who-we-are-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-foreground leading-[0.95] mb-8"
            >
              TWO FORCES.
              <br />
              <span className="text-primary">ONE INFRASTRUCTURE.</span>
            </h2>
            <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed [&_strong]:text-foreground [&_strong]:font-semibold">
              Born from the <strong>strategic merger between DENAR RCRDS and TRACKS/ID</strong>, we built an infrastructure
              designed to give artists the best of both worlds. DENAR's legacy — with <strong>over 1,000 artists signed globally</strong> and
              the backing of renowned brands like <strong>DJ Mag</strong>, <strong>Beatport</strong>,{" "}
              <strong>Hexagon</strong>, <strong>Spinnin' Records</strong>, <strong>Protocol Records</strong>,{" "}
              <strong>Insomniac</strong>, <strong>Creamfields</strong>, and <strong>One World Radio</strong> — provides
              unmatched credibility and industry connections. Combined with TRACKS/ID's{" "}
              <strong>cutting-edge technology platform</strong>, artists now have a single all-in-one panel to distribute,
              monetize, promote, and manage their entire catalog.
            </p>

            {/* Partner trust bar */}
            <motion.div
              className="flex flex-wrap gap-x-6 gap-y-2 mt-8 pt-6 border-t border-border/30"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {partners.map((name, i) => (
                <motion.span
                  key={name}
                  className="font-heading text-[10px] font-bold tracking-[0.15em] text-muted-foreground/40 uppercase hover:text-primary transition-colors duration-300"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
                >
                  {name}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Compact triangle layout ── */}
          <div className="flex items-center justify-center">
            <div className="relative w-[280px] h-[320px] sm:w-[320px] sm:h-[360px]">

              {/* Top-left: DENAR */}
              <motion.div
                className="absolute top-0 left-0 flex flex-col items-center text-center"
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <Hexagon strokeColor="hsl(var(--muted-foreground))" size="sm">
                  <span className="font-heading text-xs font-black text-muted-foreground">DENAR</span>
                </Hexagon>
                <h3 className="font-heading text-[11px] font-black text-foreground mt-2">DENAR RCRDS</h3>
                <p className="font-body text-[10px] text-muted-foreground mt-0.5 max-w-[120px] leading-snug">
                  <strong className="text-foreground">+1,000 artists</strong> signed
                </p>
              </motion.div>

              {/* Top-right: TRACKS/ID */}
              <motion.div
                className="absolute top-0 right-0 flex flex-col items-center text-center"
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <Hexagon strokeColor="hsl(var(--muted-foreground))" size="sm">
                  <span className="font-heading text-xs font-black text-muted-foreground">T/</span>
                </Hexagon>
                <h3 className="font-heading text-[11px] font-black text-foreground mt-2">TRACKS/ID</h3>
                <p className="font-body text-[10px] text-muted-foreground mt-0.5 max-w-[120px] leading-snug">
                  Next-gen <strong className="text-foreground">music tech</strong>
                </p>
              </motion.div>

              {/* Cables from each node converging to center bottom */}
              <div className="absolute top-[100px] left-[40px] sm:left-[50px]">
                <VerticalCable inView={inView} delay={0} />
              </div>
              <div className="absolute top-[100px] right-[40px] sm:right-[50px]">
                <VerticalCable inView={inView} delay={0.3} />
              </div>

              {/* Center-bottom: THE MERGE */}
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 1.2, type: "spring", stiffness: 120 }}
              >
                {/* Glow pulse */}
                <motion.div
                  className="absolute w-36 h-40 rounded-full pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)",
                  }}
                  animate={inView ? { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative w-28 h-32 mb-2">
                  <motion.div
                    className="absolute inset-0"
                    animate={inView ? {
                      filter: [
                        "drop-shadow(0 0 4px hsl(var(--primary) / 0.3))",
                        "drop-shadow(0 0 14px hsl(var(--primary) / 0.6))",
                        "drop-shadow(0 0 4px hsl(var(--primary) / 0.3))",
                      ],
                    } : {}}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Hexagon strokeColor="hsl(var(--primary))" className="w-full h-full" size="md">
                      <span className="font-heading text-lg font-black text-primary tracking-tight">T/ID</span>
                    </Hexagon>
                  </motion.div>
                  <motion.div
                    className="absolute inset-3"
                    animate={inView ? { opacity: [0.2, 0.6, 0.2] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Hexagon strokeColor="hsl(var(--primary) / 0.35)" className="w-full h-full" size="md" />
                  </motion.div>
                </div>
                <h3 className="font-heading text-base sm:text-lg font-black text-primary">THE MERGE</h3>
                <p className="font-body text-[10px] text-muted-foreground mt-0.5 max-w-[200px] leading-snug">
                  The industry's first <strong className="text-foreground">all-in-one hybrid label</strong> infrastructure
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
