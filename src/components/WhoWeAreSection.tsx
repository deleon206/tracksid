import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ─── Partner badges ─── */
const partners = [
  "DJ Mag", "Beatport", "Hexagon", "Spinnin' Records",
  "Protocol Records", "Insomniac", "Creamfields", "One World Radio",
];

/* ─── Hexagon SVG ─── */
const Hexagon = ({ className, strokeColor, children }: { className?: string; strokeColor: string; children?: React.ReactNode }) => (
  <div className={className}>
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

/* ─── Data Transfer Cable — animated particles traveling along a curved path ─── */
const DataCable = ({ direction, inView }: { direction: "left" | "right"; inView: boolean }) => {
  const isLeft = direction === "left";
  // Long organic wave curve spanning the full gap
  const cablePath = "M 0,30 C 40,30 60,10 100,18 S 160,40 200,25 S 260,10 300,30";
  const particlePath = isLeft
    ? cablePath
    : "M 300,30 C 260,30 240,10 200,18 S 140,40 100,25 S 40,10 0,30";

  return (
    <div className="hidden lg:flex items-center relative h-[60px] min-w-[140px]">
      <svg viewBox="0 0 300 60" className="w-full h-full overflow-visible" preserveAspectRatio="xMidYMid meet">
        {/* Base cable (dim) */}
        <motion.path
          d={cablePath}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        />
        {/* Glowing cable overlay */}
        <motion.path
          d={cablePath}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1, delay: 1.0 }}
          style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary)))" }}
        />
        {/* Traveling data particles */}
        {inView && [0, 1, 2].map((i) => (
          <circle
            key={i}
            r="3"
            fill="hsl(var(--primary))"
            style={{ filter: "drop-shadow(0 0 8px hsl(var(--primary)))" }}
          >
            <animateMotion
              dur="2.2s"
              begin={`${1.4 + i * 0.7}s`}
              repeatCount="indefinite"
              path={particlePath}
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
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-heading text-[10px] tracking-[0.3em] text-primary mb-4 border border-primary/40 inline-block px-3 py-1">
            // WHO WE ARE
          </p>
          <h2
            id="who-we-are-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-foreground leading-[0.95]"
          >
            TWO FORCES.
            <br />
            <span className="text-primary">ONE INFRASTRUCTURE.</span>
          </h2>
        </motion.div>

        {/* ─── Merge visual: 3 columns ─── */}
        <div className="relative flex flex-col lg:grid lg:grid-cols-[1fr_auto_1.2fr_auto_1fr] items-center gap-8 lg:gap-0 mb-20">

          {/* ── DENAR RCRDS (Left) ── */}
          <motion.div
            className="relative flex flex-col items-center text-center lg:w-1/3 z-10"
            initial={{ opacity: 0, x: -80 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-28 h-32 sm:w-32 sm:h-36 mb-6">
              <Hexagon strokeColor="hsl(var(--muted-foreground))" className="relative w-full h-full">
                <span className="font-heading text-base sm:text-lg font-black text-muted-foreground tracking-tight">
                  DENAR
                </span>
              </Hexagon>
            </div>
            <h3 className="font-heading text-lg sm:text-xl font-black text-foreground">DENAR RCRDS</h3>
            <p className="font-body text-xs sm:text-sm text-muted-foreground mt-2 max-w-[260px] leading-relaxed">
              A legacy record label with <strong className="text-foreground">+1,000 artists signed worldwide</strong>, backed by the industry's biggest names.
            </p>
          </motion.div>

          {/* ── Left data cable ── */}
          <DataCable direction="left" inView={inView} />

          {/* ── FUSION CENTER ── */}
          <motion.div
            className="relative flex flex-col items-center text-center lg:w-1/3 z-20"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 1.2, type: "spring", stiffness: 120 }}
          >
            {/* Outer glow pulse — "receiving data" */}
            <motion.div
              className="absolute w-44 h-48 sm:w-52 sm:h-56 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)",
              }}
              animate={inView ? {
                scale: [1, 1.25, 1],
                opacity: [0.5, 1, 0.5],
              } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Secondary receiving ring */}
            <motion.div
              className="absolute w-36 h-40 sm:w-44 sm:h-48 border border-primary/20 rounded-full pointer-events-none"
              animate={inView ? {
                scale: [1, 1.3, 1],
                opacity: [0.4, 0, 0.4],
              } : {}}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
            />
            <div className="relative w-32 h-36 sm:w-40 sm:h-44 mb-6">
              {/* Outer hex with glow */}
              <motion.div
                className="absolute inset-0"
                animate={inView ? {
                  filter: [
                    "drop-shadow(0 0 4px hsl(var(--primary) / 0.3))",
                    "drop-shadow(0 0 12px hsl(var(--primary) / 0.6))",
                    "drop-shadow(0 0 4px hsl(var(--primary) / 0.3))",
                  ],
                } : {}}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Hexagon strokeColor="hsl(var(--primary))" className="w-full h-full">
                  <span className="font-heading text-lg sm:text-xl font-black text-primary tracking-tight">
                    T/ID
                  </span>
                </Hexagon>
              </motion.div>
              {/* Inner hex pulse */}
              <motion.div
                className="absolute inset-3"
                animate={inView ? { opacity: [0.2, 0.6, 0.2] } : {}}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Hexagon strokeColor="hsl(var(--primary) / 0.4)" className="relative w-full h-full" />
              </motion.div>
              {/* Innermost hex — fast pulse */}
              <motion.div
                className="absolute inset-6"
                animate={inView ? { opacity: [0, 0.5, 0], scale: [0.8, 1.05, 0.8] } : {}}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              >
                <Hexagon strokeColor="hsl(var(--primary) / 0.25)" className="relative w-full h-full" />
              </motion.div>
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-black text-primary">THE MERGE</h3>
            <p className="font-body text-xs sm:text-sm text-muted-foreground mt-2 max-w-[280px] leading-relaxed">
              The fusion that created the industry's first <strong className="text-foreground">all-in-one hybrid label infrastructure</strong>.
            </p>
          </motion.div>

          {/* ── Right data cable ── */}
          <DataCable direction="right" inView={inView} />

          {/* ── TRACKS/ID (Right) ── */}
          <motion.div
            className="relative flex flex-col items-center text-center lg:w-1/3 z-10"
            initial={{ opacity: 0, x: 80 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-28 h-32 sm:w-32 sm:h-36 mb-6">
              <Hexagon strokeColor="hsl(var(--muted-foreground))" className="relative w-full h-full">
                <span className="font-heading text-base sm:text-lg font-black text-muted-foreground tracking-tight">
                  T/
                </span>
              </Hexagon>
            </div>
            <h3 className="font-heading text-lg sm:text-xl font-black text-foreground">TRACKS/ID</h3>
            <p className="font-body text-xs sm:text-sm text-muted-foreground mt-2 max-w-[260px] leading-relaxed">
              Next-generation <strong className="text-foreground">music technology infrastructure</strong> — distribution, tools, and analytics in one platform.
            </p>
          </motion.div>
        </div>

        {/* ─── Narrative paragraph ─── */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed [&_strong]:text-foreground [&_strong]:font-semibold">
            Born from the <strong>strategic merger between DENAR RCRDS and TRACKS/ID</strong>, we built an infrastructure
            designed to give artists the best of both worlds. DENAR's legacy — with <strong>over 1,000 artists signed globally</strong> and
            the backing of renowned brands in the scene like <strong>DJ Mag</strong>, <strong>Beatport</strong>,{" "}
            <strong>Hexagon</strong>, <strong>Spinnin' Records</strong>, <strong>Protocol Records</strong>,{" "}
            <strong>Insomniac</strong>, <strong>Creamfields</strong>, and <strong>One World Radio</strong> — provides
            unmatched credibility and industry connections. Combined with TRACKS/ID's{" "}
            <strong>cutting-edge technology platform</strong>, artists now have a single all-in-one panel to distribute,
            monetize, promote, and manage their entire catalog.
          </p>
        </motion.div>

        {/* ─── Partner trust bar ─── */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-8 border-t border-border/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {partners.map((name, i) => (
            <motion.span
              key={name}
              className="font-heading text-[10px] sm:text-xs font-bold tracking-[0.15em] text-muted-foreground/40 uppercase hover:text-primary transition-colors duration-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.6 + i * 0.06 }}
            >
              {name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
