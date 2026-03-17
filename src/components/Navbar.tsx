import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const navLinks = [
  { label: "PRODUCT", href: "#services", hasDropdown: true },
  { label: "INDUSTRIES", href: "#plans", hasDropdown: true },
  { label: "WHO WE ARE", href: "#", hasDropdown: true },
  { label: "MAG", href: "/mag", accent: true },
  { label: "RESOURCES", href: "#", hasDropdown: true, accent: true },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/40"
    >
      <div className="container flex items-center justify-between py-3">
        {/* Logo */}
        <a href="/" className="font-heading text-sm font-bold tracking-widest text-foreground uppercase">
          TRACKS/ID
        </a>

        {/* Center nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`flex items-center gap-1 font-heading text-[11px] font-semibold tracking-[0.15em] px-4 py-2 transition-colors duration-200 ${
                link.accent
                  ? "text-primary hover:text-primary/80"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              {link.accent && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary ml-0.5 -mt-2" />
              )}
              {link.hasDropdown && (
                <ChevronDown className="w-3 h-3 opacity-60" />
              )}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#plans"
          className="hidden lg:inline-flex items-center gap-2 border border-foreground/80 text-foreground font-heading text-[11px] font-bold tracking-[0.15em] px-6 py-2.5 hover:bg-foreground hover:text-background transition-all duration-200"
        >
          VIEW PLANS <span>→</span>
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-foreground"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="lg:hidden border-t border-border/40 bg-background/80 backdrop-blur-xl"
        >
          <div className="container py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-1 font-heading text-sm font-semibold tracking-wider transition-colors ${
                  link.accent
                    ? "text-primary hover:text-primary/80"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
              </a>
            ))}
            <a
              href="#plans"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center gap-2 border border-foreground/80 text-foreground font-heading text-[11px] font-bold tracking-[0.15em] px-6 py-2.5 mt-2 hover:bg-foreground hover:text-background transition-all"
            >
              VIEW PLANS <span>→</span>
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
