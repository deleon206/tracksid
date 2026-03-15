import { motion } from "framer-motion";

const Footer = () => (
  <footer className="border-t border-border py-16">
    <div className="container">
      <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
        {/* Column 1 - Visit / Contact */}
        <div>
          <div className="bg-primary px-4 py-2 mb-8 inline-block">
            <span className="font-heading text-[11px] font-bold tracking-[0.2em] text-primary-foreground">
              CONTACT:
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <p className="font-heading text-[11px] tracking-[0.15em] text-primary mb-2">Email:</p>
              <p className="font-body text-sm text-foreground">info@tracksid.com</p>
            </div>
            <div>
              <p className="font-heading text-[11px] tracking-[0.15em] text-primary mb-2">Social:</p>
              <div className="flex gap-4">
                {["Instagram", "Twitter/X", "YouTube"].map((s) => (
                  <a key={s} href="#" className="font-body text-sm text-foreground hover:text-primary transition-colors">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <a
              href="#plans"
              className="inline-flex items-center gap-2 border border-foreground/80 text-foreground font-heading text-[10px] font-bold tracking-[0.15em] px-5 py-3 hover:bg-foreground hover:text-background transition-all duration-200"
            >
              GET IN TOUCH <span>→</span>
            </a>
            <a
              href="#plans"
              className="inline-flex items-center gap-2 border border-foreground/80 text-foreground font-heading text-[10px] font-bold tracking-[0.15em] px-5 py-3 hover:bg-foreground hover:text-background transition-all duration-200"
            >
              VIEW PLANS <span>→</span>
            </a>
          </div>
        </div>

        {/* Column 2 - Platform */}
        <div>
          <div className="bg-primary px-4 py-2 mb-8 inline-block">
            <span className="font-heading text-[11px] font-bold tracking-[0.2em] text-primary-foreground">
              PLATFORM:
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {[
              "DISTRIBUTION",
              "LICENSING",
              "COPYRIGHT & CONTENT ID",
              "PLANNING & PROMOTION",
              "PLAYLIST PITCHING",
              "EDITORIAL & PROMO",
              "PRESS & MEDIA",
              "ARTIST TOOLS",
            ].map((item) => (
              <a
                key={item}
                href="#services"
                className="font-heading text-[12px] font-bold tracking-[0.1em] text-foreground hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Column 3 - Visit Us */}
        <div>
          <div className="bg-primary px-4 py-2 mb-8 inline-block">
            <span className="font-heading text-[11px] font-bold tracking-[0.2em] text-primary-foreground">
              VISIT US:
            </span>
          </div>

          {/* Country map silhouettes */}
          <div className="flex gap-6 mb-8">
            {/* Mexico */}
            <svg viewBox="0 0 120 80" className="w-16 h-10 text-foreground/80">
              <path d="M10,15 L25,10 L40,8 L55,5 L70,8 L85,12 L95,18 L100,25 L105,35 L108,45 L105,52 L98,58 L88,62 L80,65 L72,68 L65,70 L55,72 L48,68 L42,60 L38,55 L32,52 L25,48 L20,42 L15,35 L12,28 L10,22 Z" fill="currentColor" />
            </svg>
            {/* Spain */}
            <svg viewBox="0 0 100 80" className="w-14 h-10 text-foreground/80">
              <path d="M15,20 L30,15 L50,12 L70,15 L85,20 L90,30 L88,42 L82,52 L75,58 L65,62 L50,65 L35,62 L22,55 L15,45 L12,35 L13,25 Z" fill="currentColor" />
            </svg>
            {/* UK */}
            <svg viewBox="0 0 60 100" className="w-8 h-12 text-foreground/80">
              <path d="M25,5 L35,8 L40,15 L42,25 L38,32 L42,38 L45,48 L43,55 L40,62 L35,70 L30,78 L25,85 L22,90 L20,82 L18,72 L15,62 L12,52 L10,42 L12,32 L15,22 L18,15 L22,8 Z" fill="currentColor" />
            </svg>
          </div>

          <div className="space-y-6">
            <div>
              <p className="font-heading text-[11px] tracking-[0.15em] text-primary mb-2">México:</p>
              <p className="font-body text-sm text-foreground leading-relaxed">
                Ciudad de México, CDMX
              </p>
            </div>
            <div>
              <p className="font-heading text-[11px] tracking-[0.15em] text-primary mb-2">España:</p>
              <p className="font-body text-sm text-foreground leading-relaxed">
                Madrid, España
              </p>
            </div>
            <div>
              <p className="font-heading text-[11px] tracking-[0.15em] text-primary mb-2">United Kingdom:</p>
              <p className="font-body text-sm text-foreground leading-relaxed">
                London, UK
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <motion.div
        className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="font-body text-xs text-muted-foreground">© 2026 TRACKS/ID. All rights reserved.</p>
        <p className="font-heading text-[10px] tracking-[0.15em] text-muted-foreground">
          BUILT FOR ARTISTS & LABELS
        </p>
      </motion.div>
    </div>
  </footer>
);

export default Footer;
