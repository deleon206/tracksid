import { motion } from "framer-motion";

const CapabilitiesSection = () => (
  <section id="services" className="py-24 border-t border-border">
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left - Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-heading text-[10px] tracking-[0.3em] text-primary mb-8 border border-primary/40 inline-block px-3 py-1">
            // BUILT FOR THE BOLD
          </p>

          <div className="space-y-0">
            {[
              "A HYBRID",
              "PLATFORM",
              "FOR THE NEXT",
              "GENERATION",
              "OF ARTISTS",
            ].map((line, i) => (
              <motion.div
                key={line}
                className="border-l-2 border-border pl-4 py-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-black leading-[0.95] text-foreground">
                  {line}
                </h2>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="font-body text-sm md:text-base text-muted-foreground max-w-lg leading-relaxed mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We work with forward-thinking artists, musicians, and independent labels — providing a solid infrastructure that goes beyond distribution. Licensing, promotion, content protection, and tools — all under one roof, built for those who demand more.
          </motion.p>
        </motion.div>

        {/* Right - Geometric Graphic */}
        <motion.div
          className="flex items-center justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full max-w-[420px] aspect-square border border-border/50 p-4">
            {/* Dashed outer border */}
            <div className="absolute inset-0 border border-dashed border-border/30" />

            <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
              {/* Hexagonal grid - top row */}
              <polygon points="200,40 260,75 260,145 200,180 140,145 140,75" stroke="hsl(var(--muted-foreground))" strokeWidth="1" fill="none" />
              <polygon points="140,75 200,40 200,110 140,145" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" fill="none" />
              <line x1="200" y1="40" x2="200" y2="180" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
              <line x1="140" y1="75" x2="260" y2="145" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
              <line x1="260" y1="75" x2="140" y2="145" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />

              {/* Left hex */}
              <polygon points="140,145 80,180 80,250 140,285 200,250 200,180" stroke="hsl(var(--muted-foreground))" strokeWidth="1" fill="none" />
              <line x1="140" y1="145" x2="140" y2="285" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
              <line x1="80" y1="180" x2="200" y2="250" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
              <line x1="200" y1="180" x2="80" y2="250" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />

              {/* Right hex - PRIMARY colored / filled */}
              <polygon points="260,145 200,180 200,250 260,285 320,250 320,180" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" />
              <polygon points="260,145 320,180 320,250 260,285 200,250 200,180" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="hsl(var(--primary))" fillOpacity="0.12" />
              <line x1="260" y1="145" x2="260" y2="285" stroke="hsl(var(--primary))" strokeWidth="0.8" />
              <line x1="200" y1="180" x2="320" y2="250" stroke="hsl(var(--primary))" strokeWidth="0.8" />
              <line x1="320" y1="180" x2="200" y2="250" stroke="hsl(var(--primary))" strokeWidth="0.8" />

              {/* Bottom hex */}
              <polygon points="200,250 140,285 140,355 200,390 260,355 260,285" stroke="hsl(var(--muted-foreground))" strokeWidth="1" fill="none" />
              <line x1="200" y1="250" x2="200" y2="390" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
              <line x1="140" y1="285" x2="260" y2="355" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
              <line x1="260" y1="285" x2="140" y2="355" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />

              {/* Node dots - muted */}
              {[
                [200, 40], [140, 75], [260, 75], [140, 145], [200, 180],
                [80, 180], [80, 250], [140, 285], [200, 250],
                [140, 355], [200, 390], [260, 355], [260, 285],
              ].map(([cx, cy], i) => (
                <circle key={`m-${i}`} cx={cx} cy={cy} r="4" fill="hsl(var(--muted-foreground))" fillOpacity="0.6" />
              ))}

              {/* Node dots - primary (right hex) */}
              {[
                [260, 145], [320, 180], [320, 250], [260, 285],
              ].map(([cx, cy], i) => (
                <circle key={`p-${i}`} cx={cx} cy={cy} r="5" fill="hsl(var(--primary))" />
              ))}

              {/* Center dot */}
              <circle cx="260" cy="215" r="7" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
              <circle cx="260" cy="215" r="3" fill="hsl(var(--primary))" />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default CapabilitiesSection;
