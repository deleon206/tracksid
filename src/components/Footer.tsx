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

        {/* Column 3 - Company */}
        <div>
          <div className="bg-primary px-4 py-2 mb-8 inline-block">
            <span className="font-heading text-[11px] font-bold tracking-[0.2em] text-primary-foreground">
              COMPANY:
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { label: "ABOUT", href: "#" },
              { label: "MAG", href: "/mag" },
              { label: "EVENTS", href: "#" },
              { label: "PARTNERSHIPS", href: "#" },
              { label: "CAREERS", href: "#" },
              { label: "CONTACT", href: "#" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-heading text-[12px] font-bold tracking-[0.1em] text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
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
