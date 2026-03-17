import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ═══════════════════════════════════════════════════════════
   FUSION HEXAGON CANVAS — two clusters merging into one
   ═══════════════════════════════════════════════════════════ */
const FusionHexagonGraphic = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animId = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const hoverRef = useRef(false);

  useEffect(() => {
    hoverRef.current = isHovered;
  }, [isHovered]);

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

    const drawHex = (
      cx: number, cy: number, r: number,
      strokeColor: string, fillColor: string,
      lineWidth: number, dashArray?: number[]
    ) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
      }
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = lineWidth;
      if (dashArray) ctx.setLineDash(dashArray);
      else ctx.setLineDash([]);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const drawNode = (x: number, y: number, r: number, color: string) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    };

    const drawLine = (x1: number, y1: number, x2: number, y2: number, color: string, width: number) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.stroke();
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const baseR = Math.min(w, h) * 0.14;
      const hover = hoverRef.current;

      // Pulse factor for "alive" system
      const pulse = 0.85 + 0.15 * Math.sin(t * 1.5);
      const glowPulse = hover ? 0.7 + 0.3 * Math.sin(t * 2) : 0.4 + 0.2 * Math.sin(t * 1.5);

      // === LEFT CLUSTER (DENAR RCRDS) — faded ===
      const lx = cx - baseR * 2.8;
      const ly = cy - baseR * 0.3;
      const denarAlpha = 0.2 + 0.05 * Math.sin(t * 0.8);

      // Outer dashed hex
      drawHex(lx, ly, baseR * 1.3, `rgba(128,128,128,${denarAlpha})`, "", 0.8, [4, 4]);
      // Inner hex
      drawHex(lx, ly, baseR * 0.8, `rgba(128,128,128,${denarAlpha + 0.1})`, "", 1);
      // Small satellite hexes
      drawHex(lx - baseR * 1.1, ly + baseR * 0.9, baseR * 0.45, `rgba(128,128,128,${denarAlpha})`, "", 0.6);
      drawHex(lx + baseR * 0.2, ly - baseR * 1.3, baseR * 0.4, `rgba(128,128,128,${denarAlpha})`, "", 0.6);

      // Nodes
      drawNode(lx, ly, 3, `rgba(128,128,128,${denarAlpha + 0.2})`);
      drawNode(lx - baseR * 1.1, ly + baseR * 0.9, 2, `rgba(128,128,128,${denarAlpha + 0.1})`);

      // Label
      ctx.font = `bold ${Math.max(8, baseR * 0.22)}px 'Montserrat', sans-serif`;
      ctx.fillStyle = `rgba(128,128,128,${denarAlpha + 0.15})`;
      ctx.textAlign = "center";
      ctx.fillText("DENAR", lx, ly + baseR * 0.05);

      // === RIGHT CLUSTER (T/ID original) — faded ===
      const rx = cx + baseR * 2.8;
      const ry = cy + baseR * 0.3;
      const tidAlpha = 0.2 + 0.05 * Math.sin(t * 0.8 + 1);

      drawHex(rx, ry, baseR * 1.3, `rgba(128,128,128,${tidAlpha})`, "", 0.8, [4, 4]);
      drawHex(rx, ry, baseR * 0.8, `rgba(128,128,128,${tidAlpha + 0.1})`, "", 1);
      drawHex(rx + baseR * 1.0, ry - baseR * 0.8, baseR * 0.4, `rgba(128,128,128,${tidAlpha})`, "", 0.6);
      drawHex(rx - baseR * 0.3, ry + baseR * 1.3, baseR * 0.45, `rgba(128,128,128,${tidAlpha})`, "", 0.6);

      drawNode(rx, ry, 3, `rgba(128,128,128,${tidAlpha + 0.2})`);
      drawNode(rx + baseR * 1.0, ry - baseR * 0.8, 2, `rgba(128,128,128,${tidAlpha + 0.1})`);

      ctx.fillStyle = `rgba(128,128,128,${tidAlpha + 0.15})`;
      ctx.fillText("T/ID", rx, ry + baseR * 0.05);

      // === CONNECTING LINES from clusters to center ===
      const lineAlpha = 0.15 + 0.1 * Math.sin(t * 1.2);
      drawLine(lx + baseR * 1.3, ly, cx - baseR * 1.1, cy, `rgba(230,180,17,${lineAlpha})`, 0.8);
      drawLine(rx - baseR * 1.3, ry, cx + baseR * 1.1, cy, `rgba(230,180,17,${lineAlpha})`, 0.8);

      // Data flow particles along connection lines
      for (let p = 0; p < 3; p++) {
        const prog = ((t * 0.3 + p * 0.33) % 1);
        // Left to center
        const px1 = (lx + baseR * 1.3) + ((cx - baseR * 1.1) - (lx + baseR * 1.3)) * prog;
        const py1 = ly + (cy - ly) * prog;
        drawNode(px1, py1, 1.5, `rgba(230,180,17,${0.6 * (1 - Math.abs(prog - 0.5) * 2)})`);
        // Right to center
        const px2 = (rx - baseR * 1.3) + ((cx + baseR * 1.1) - (rx - baseR * 1.3)) * prog;
        const py2 = ry + (cy - ry) * prog;
        drawNode(px2, py2, 1.5, `rgba(230,180,17,${0.6 * (1 - Math.abs(prog - 0.5) * 2)})`);
      }

      // === CENTRAL FUSION HEXAGON — vibrant ===
      // Outer glow
      if (hover) {
        const grad = ctx.createRadialGradient(cx, cy, baseR * 0.5, cx, cy, baseR * 2);
        grad.addColorStop(0, `rgba(230,180,17,${glowPulse * 0.15})`);
        grad.addColorStop(1, "rgba(230,180,17,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(cx - baseR * 2, cy - baseR * 2, baseR * 4, baseR * 4);
      }

      // Large center hex
      const centerR = baseR * 1.1;
      drawHex(cx, cy, centerR, `rgba(230,180,17,${glowPulse})`, `rgba(230,180,17,${0.06 + (hover ? 0.06 : 0)})`, 2);

      // Inner detail hex
      drawHex(cx, cy, centerR * 0.6, `rgba(230,180,17,${glowPulse * 0.6})`, "", 1);

      // Inner crosshairs
      drawLine(cx - centerR * 0.3, cy, cx + centerR * 0.3, cy, `rgba(230,180,17,${glowPulse * 0.4})`, 0.5);
      drawLine(cx, cy - centerR * 0.3, cx, cy + centerR * 0.3, `rgba(230,180,17,${glowPulse * 0.4})`, 0.5);

      // T/ID logo text in center
      ctx.font = `900 ${Math.max(10, baseR * 0.35)}px 'Montserrat', sans-serif`;
      ctx.fillStyle = `rgba(230,180,17,${pulse})`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("T/ID", cx, cy);
      ctx.textBaseline = "alphabetic";

      // Corner node dots on center hex
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const nx = cx + centerR * Math.cos(angle);
        const ny = cy + centerR * Math.sin(angle);
        drawNode(nx, ny, 3.5 * pulse, `rgba(230,180,17,${glowPulse})`);
      }

      // Orbiting small hexes around center
      for (let i = 0; i < 4; i++) {
        const orbitAngle = (Math.PI / 2) * i + t * 0.15;
        const orbitR = centerR * 1.7;
        const ox = cx + orbitR * Math.cos(orbitAngle);
        const oy = cy + orbitR * Math.sin(orbitAngle);
        drawHex(ox, oy, baseR * 0.3, `rgba(0,255,136,${0.15 + 0.1 * Math.sin(t + i)})`, "", 0.6);
        drawLine(cx + centerR * Math.cos(orbitAngle) * 0.95, cy + centerR * Math.sin(orbitAngle) * 0.95, ox, oy, `rgba(0,255,136,${0.1})`, 0.5);
      }

      t += 0.015;
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
      className="w-full h-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    />
  );
};

/* ═══════════════════════════════════════════════════════════
   TRUST BADGES — DJ Mag, Beatport, +10k Artists
   ═══════════════════════════════════════════════════════════ */
const TrustBadges = () => (
  <motion.div
    className="flex items-center justify-start gap-8 md:gap-12 mt-6 py-4 border-t border-border/30"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.8, duration: 0.6 }}
  >
    {/* DJ Mag */}
    <span className="font-heading text-[11px] md:text-xs font-bold tracking-[0.15em] text-muted-foreground/40 uppercase">
      DJ Mag
    </span>
    {/* Beatport */}
    <span className="font-heading text-[11px] md:text-xs font-bold tracking-[0.15em] text-muted-foreground/40 uppercase">
      Beatport
    </span>
    {/* Counter */}
    <span className="font-heading text-[11px] md:text-xs font-bold tracking-[0.15em] text-muted-foreground/40 uppercase">
      +10k Artists
    </span>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════
   CAPABILITIES SECTION — main component
   ═══════════════════════════════════════════════════════════ */
const CapabilitiesSection = () => (
  <section id="services" className="py-24 border-t border-border">
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left — Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Kicker */}
          <p className="font-heading text-[10px] tracking-[0.3em] text-primary mb-8 border border-primary/40 inline-block px-3 py-1">
            // ORIGINATING THE HYBRID LABEL MODEL
          </p>

          {/* H2 Title */}
          <div className="space-y-0">
            {[
              "WHERE LEGACY",
              "MEETS",
              "INFRASTRUCTURE:",
              "REDEFINING",
              "THE ARTIST",
              "EXPERIENCE",
            ].map((line, i) => (
              <motion.div
                key={line}
                className="border-l-2 border-border pl-4 py-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-black leading-[0.95] text-foreground">
                  {line}
                </h2>
              </motion.div>
            ))}
          </div>

          {/* Narrative paragraph with <strong> for SEO */}
          <motion.p
            className="font-body text-sm md:text-base text-muted-foreground max-w-lg leading-relaxed mt-10 [&_strong]:text-foreground [&_strong]:font-semibold hover:[&_strong]:text-primary [&_strong]:transition-colors [&_strong]:duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Founded on a <strong>strategic merge with DENAR RCRDS</strong>, TRACKS/ID offers the industry's first true{" "}
            <strong>hybrid distribution network</strong>. We unify the legacy of a powerhouse label—backed by{" "}
            <strong>DJ Mag</strong> and <strong>Beatport</strong>—with a next-gen, all-in-one{" "}
            <strong>digital music infrastructure</strong>. Whether you sign a conventional deal or choose to distribute
            independently, you maintain <strong>full control</strong> of your catalog, monetizing, protecting, and
            promoting your music. Join <strong>+10,000 artists</strong> already scaling their vision.
          </motion.p>

          {/* Trust Badges */}
          <TrustBadges />
        </motion.div>

        {/* Right — Fusion Hexagon Graphic */}
        <motion.div
          className="flex items-center justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full max-w-[480px] aspect-square border border-border/50 p-2">
            {/* Dashed outer border */}
            <div className="absolute inset-0 border border-dashed border-border/30" />
            <FusionHexagonGraphic />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default CapabilitiesSection;
