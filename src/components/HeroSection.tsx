import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

/* ─── Headline lines ─── */
const headlineLines = [
  "MUSIC",
  "DISTRIBUTION",
  "FOR ARTISTS",
];
const accentLine = "& LABELS";

/* ─── Service chips for bottom bar ─── */
const serviceChips = [
  "Distribution",
  "Content ID",
  "Licensing",
  "Playlist Pitching",
  "Promo Tools",
  "Press Support",
];

/* ═══════════════════════════════════════════════════════════
   TRON DOT GRID CANVAS — dots connect when cursor is near
   ═══════════════════════════════════════════════════════════ */
const TronGridCanvas = ({ mousePos }: { mousePos: React.RefObject<{ x: number; y: number }> }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animId = useRef(0);
  const animId = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    const GAP = 32;
    const RADIUS = 160; // activation radius
    const DOT_R = 1;

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      // Compute grid columns/rows
      const cols = Math.ceil(w / GAP) + 1;
      const rows = Math.ceil(h / GAP) + 1;

      // Collect active dots near cursor
      const activeDots: { x: number; y: number; dist: number }[] = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * GAP;
          const y = r * GAP;
          const dist = Math.hypot(x - mx, y - my);
          const inRange = dist < RADIUS;

          // Base dot
          ctx.beginPath();
          ctx.arc(x, y, DOT_R, 0, Math.PI * 2);
          if (inRange) {
            const alpha = 0.15 + 0.85 * (1 - dist / RADIUS);
            ctx.fillStyle = `rgba(0,255,136,${alpha})`;
            activeDots.push({ x, y, dist });
          } else {
            ctx.fillStyle = "rgba(255,255,255,0.06)";
          }
          ctx.fill();
        }
      }

      // Draw TRON connection lines between nearby active dots
      if (activeDots.length > 1) {
        for (let i = 0; i < activeDots.length; i++) {
          for (let j = i + 1; j < activeDots.length; j++) {
            const a = activeDots[i];
            const b = activeDots[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d <= GAP * 1.5) {
              const alpha = 0.4 * (1 - Math.max(a.dist, b.dist) / RADIUS);
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(0,255,136,${alpha})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }

      // Glitch micro-lines near cursor
      if (mx > 0 && my > 0) {
        for (let i = 0; i < 4; i++) {
          const gx = mx + (Math.random() - 0.5) * 80;
          const gy = my + (Math.random() - 0.5) * 80;
          const gw = 4 + Math.random() * 16;
          ctx.beginPath();
          ctx.moveTo(gx, gy);
          ctx.lineTo(gx + gw, gy);
          ctx.strokeStyle = `rgba(0,255,136,${0.15 + Math.random() * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      animId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

/* ═══════════════════════════════════════════════════════════
   SINUSOIDAL WAVE GRAPHIC — infinite phase-shift animation
   ═══════════════════════════════════════════════════════════ */
const SineWaveGraphic = () => {
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

      const waves = [
        { amp: h * 0.22, freq: 0.012, phase: t * 0.6, alpha: 0.8 },
        { amp: h * 0.18, freq: 0.015, phase: t * 0.8 + 1, alpha: 0.6 },
        { amp: h * 0.25, freq: 0.01, phase: t * 0.4 + 2, alpha: 0.5 },
        { amp: h * 0.15, freq: 0.018, phase: t * 1.0 + 3, alpha: 0.4 },
        { amp: h * 0.2, freq: 0.013, phase: t * 0.7 + 4, alpha: 0.35 },
      ];

      waves.forEach(({ amp, freq, phase, alpha }) => {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 2) {
          const y = h / 2 + Math.sin(x * freq + phase) * amp + Math.sin(x * freq * 2.3 + phase * 1.5) * amp * 0.3;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(0,255,136,${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      t += 0.015;
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
   GLITCH TEXT — headline entry animation
   ═══════════════════════════════════════════════════════════ */
const GlitchLine = ({ text, delay, isAccent }: { text: string; delay: number; isAccent?: boolean }) => (
  <motion.span
    className={`block ${isAccent ? "text-primary" : "text-foreground"}`}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.1, delay }}
  >
    <motion.span
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
   HERO SECTION — main component
   ═══════════════════════════════════════════════════════════ */
const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mousePos.current = { x: -1000, y: -1000 };
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen flex flex-col overflow-hidden bg-background"
    >
      {/* TRON interactive dot grid */}
      <TronGridCanvas mousePos={mousePos} />

      <div className="relative z-10 flex flex-col flex-1 h-full container">
        {/* Main content — headline left, wave graphic right */}
        <div className="flex-1 flex items-end relative pt-20">

          {/* Wave graphic — top right */}
          <motion.div
            className="absolute top-20 right-0 flex flex-col items-end gap-2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <p className="font-heading text-[10px] tracking-[0.2em] text-muted-foreground">
              // YOU SEE A NODE. WE SEE A NEXUS.
            </p>
            {/* Sine wave box */}
            <div className="w-[280px] h-[180px] border border-border/50 relative overflow-hidden">
              <SineWaveGraphic />
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/60" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/60" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/60" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/60" />
            </div>
            {/* Decorative connector line */}
            <svg width="2" height="60" className="mr-8 opacity-40" aria-hidden="true">
              <line x1="1" y1="0" x2="1" y2="60" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3 3" />
            </svg>
          </motion.div>

          {/* Headline — bottom left */}
          <div className="flex flex-col gap-6 pb-4 max-w-[70%]">
            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-heading font-black leading-[0.9] tracking-tighter">
              {headlineLines.map((line, i) => (
                <GlitchLine key={line} text={line} delay={0.3 + i * 0.25} />
              ))}
              <GlitchLine text={accentLine} delay={0.3 + headlineLines.length * 0.25} isAccent />
            </h1>

            {/* Sub-info */}
            <motion.p
              className="font-heading text-xs tracking-[0.15em] text-muted-foreground uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              ERROR LOGS: 0
            </motion.p>
          </div>
        </div>

        {/* ─── Bottom accent bar ─── */}
        <motion.div
          className="flex flex-col sm:flex-row items-stretch -mx-4 md:-mx-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          {/* Green section — left */}
          <div className="bg-primary text-primary-foreground px-6 md:px-8 py-4 flex items-center gap-4 sm:max-w-[55%]">
            <div className="w-8 h-8 border-2 border-primary-foreground rounded-full flex items-center justify-center shrink-0">
              <span className="font-heading text-xs font-bold">T/</span>
            </div>
            <p className="font-heading text-[10px] md:text-xs tracking-wider font-bold uppercase">
              Music infrastructure to distribute, monetize, and grow your catalog
            </p>
          </div>

          {/* Description + CTA — right */}
          <div className="flex-1 px-6 md:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-l border-primary-foreground/20 bg-primary">
            <p className="font-body text-xs text-primary-foreground/80 flex-1">
              Tracks/ID is built for ambitious artists and labels who refuse to be held back.
            </p>
            <motion.a
              href="#plans"
              className="group inline-flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-wider border-2 border-primary-foreground text-primary-foreground px-6 py-3 bg-primary-foreground/0 hover:bg-primary-foreground hover:text-primary transition-all duration-300 shrink-0"
              whileHover={{ scale: 1.02 }}
            >
              EMPIEZA AHORA
              <motion.span
                className="inline-block"
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                →
              </motion.span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
