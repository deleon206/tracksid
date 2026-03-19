import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import OnionSkinBackground from "./OnionSkinBackground";
import heroBgNew from "@/assets/hero-bg-new.png";

/* ─── Headline lines ─── */
const headlineLines = ["THE #1", "ALL-IN-ONE", "RECORD LABEL"];
const accentLine = "& DISTRIBUTION";

/* ═══════════════════════════════════════════════════════════
   MUSIC WAVE VISUALIZER — audio-style frequency bars
   ═══════════════════════════════════════════════════════════ */
const MusicWaveGraphic = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animId = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const midY = h / 2;
      const points = 200;

      // Draw smooth audio waveform
      for (let layer = 0; layer < 3; layer++) {
        const layerAlpha = [0.7, 0.35, 0.15][layer];
        const layerScale = [1, 0.6, 0.3][layer];
        const phaseOffset = layer * 1.2;

        ctx.beginPath();
        for (let i = 0; i <= points; i++) {
          const x = (i / points) * w;
          const normX = i / points;
          const envelope = Math.sin(normX * Math.PI); // fade edges

          const wave1 = Math.sin(normX * 8 + t * 1.5 + phaseOffset) * 0.5;
          const wave2 = Math.sin(normX * 14 + t * 2.2 + phaseOffset) * 0.25;
          const wave3 = Math.sin(normX * 20 + t * 0.8 + phaseOffset) * 0.15;
          const combined = (wave1 + wave2 + wave3) * envelope * layerScale;

          const y = midY + combined * h * 0.4;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(230,180,17,${layerAlpha})`;
        ctx.lineWidth = layer === 0 ? 1.5 : 1;
        ctx.stroke();
      }

      // Subtle glow on center line
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(w, midY);
      ctx.strokeStyle = "rgba(230,180,17,0.08)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      t += 0.02;
      animId.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />;
};

/* ═══════════════════════════════════════════════════════════
   GLITCH TEXT — headline entry animation with shimmer
   ═══════════════════════════════════════════════════════════ */
const GlitchLine = ({ text, delay, isAccent }: { text: string; delay: number; isAccent?: boolean }) => (
  <motion.span
    className={`block ${isAccent ? "text-primary" : "text-foreground"}`}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.1, delay }}
  >
    <motion.span
      className="inline-block hero-shimmer"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 0.3, 1, 0.7, 1],
        textShadow: [
          "0 0 0px transparent",
          "2px 0 8px hsl(var(--primary))",
          "-1px 0 4px hsl(var(--primary))",
          "0 0 0px transparent",
        ],
      }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      {text}
    </motion.span>
  </motion.span>
);

/* ═══════════════════════════════════════════════════════════
   LIVE DATA BADGE — blinking indicator
   ═══════════════════════════════════════════════════════════ */
const LiveBadge = () => (
  <motion.div
    className="absolute top-3 left-3 flex items-center gap-1.5 z-10"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.5 }}
  >
    <motion.div
      className="w-1.5 h-1.5 rounded-full bg-primary"
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ duration: 1.2, repeat: Infinity }}
    />
    <span className="font-heading text-[9px] tracking-[0.2em] text-primary font-bold">
      LIVE DATA
    </span>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════
   HERO SECTION — main component
   ═══════════════════════════════════════════════════════════ */
const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col overflow-hidden bg-background"
    >
      {/* Hero background image */}
      <div className="absolute inset-0 z-0">
        <img src={heroBgNew} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
      </div>

      <div className="relative z-10 flex flex-col flex-1 h-full container px-4 sm:px-6 md:px-8">
        {/* Main content — headline left */}
        <div className="flex-1 flex items-end relative pt-20">

          {/* Headline — bottom left */}
          <div className="flex flex-col gap-4 sm:gap-6 pb-4 max-w-full sm:max-w-[70%]">
            {/* Tag badge */}
            <motion.div
              className="inline-flex items-center bg-primary px-3 py-1 mb-4 w-fit"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              <span className="font-heading text-[10px] font-bold tracking-[0.15em] text-primary-foreground italic">
                // SEND YOUR DEMO TO A REAL RECORD LABEL
              </span>
            </motion.div>

            <h1 className="text-[clamp(2rem,6vw,5.5rem)] font-heading font-black leading-[0.9] tracking-tighter">
              {headlineLines.map((line, i) => (
                <GlitchLine key={line} text={line} delay={0.3 + i * 0.25} />
              ))}
              <GlitchLine text={accentLine} delay={0.3 + headlineLines.length * 0.25} isAccent />
            </h1>
            {/* Ghost button + no credit card */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >
              <motion.a
                href="#services"
                className="group inline-flex items-center gap-2 font-heading text-[11px] font-bold uppercase tracking-[0.15em] border border-border text-muted-foreground px-5 py-2.5 hover:border-primary hover:text-primary transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                Explore Services
                <motion.span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </motion.span>
              </motion.a>
              <span className="font-body text-[11px] text-muted-foreground">
                No credit card required.
              </span>
            </motion.div>

            {/* Sub-info */}
            <motion.p
              className="font-heading text-xs tracking-[0.15em] text-muted-foreground uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              ERROR LOGS: 0
            </motion.p>
          </div>
        </div>

        {/* ─── Bottom duo-tone bar ─── */}
        <motion.div
          className="flex flex-col sm:flex-row items-stretch w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          {/* Left side — black with gold border-top */}
          <div className="relative flex-1 sm:flex-[7] border-t border-primary bg-background px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center gap-3 sm:gap-6 min-w-0">
            {/* T/ icon */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-primary rounded-full flex items-center justify-center shrink-0">
              <span className="font-heading text-[10px] sm:text-xs font-bold text-primary">T/</span>
            </div>
            <p className="font-heading text-[9px] sm:text-[10px] md:text-xs tracking-wider font-bold uppercase text-foreground truncate sm:whitespace-normal">
              Music infrastructure to distribute, monetize, and grow your catalog
            </p>
            {/* Micro-copy urgency */}
            <p className="hidden lg:block font-body text-[10px] text-muted-foreground ml-auto shrink-0">
              Join <span className="text-foreground font-medium">+1,200 labels & 10,000 artists</span> today.
            </p>
            {/* Shimmer line */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="hero-bar-shimmer absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>
          </div>

          {/* Right side — solid gold CTA */}
          <div className="sm:flex-[3] bg-primary px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center justify-center">
            <motion.a
              href="#plans"
              className="group inline-flex items-center gap-2 sm:gap-3 font-heading text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-primary-foreground hover:opacity-80 transition-opacity duration-200"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              SEND YOUR DEMO
              <span className="inline-block text-base sm:text-lg">→</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
