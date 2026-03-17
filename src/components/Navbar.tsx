import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, CircleHelp } from "lucide-react";

const navLinks = [
  { label: "LABEL", href: "#", hasDropdown: true },
  { label: "ROOSTER", href: "#", hasDropdown: true },
  { label: "MAG", href: "/mag", accent: true },
  { label: "SEND YOUR DEMO", href: "/demos" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
    >
      <div className="flex items-center gap-1 bg-secondary/80 backdrop-blur-xl border border-border/40 rounded-full px-2 py-1.5 shadow-lg shadow-black/30">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground font-heading text-sm font-black tracking-tight shrink-0"
        >
          T
        </a>

        {/* Center nav */}
        <nav className="hidden lg:flex items-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`flex items-center gap-1 font-heading text-[11px] font-semibold tracking-[0.12em] px-4 py-2 rounded-full transition-colors duration-200 hover:bg-muted/60 ${
                link.accent
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              {link.accent && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary ml-0.5 -mt-2" />
              )}
              {link.hasDropdown && (
                <ChevronDown className="w-3 h-3 opacity-50" />
              )}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-1 ml-1">
          <a
            href="#"
            className="flex items-center justify-center w-8 h-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            aria-label="Help"
          >
            <CircleHelp className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-foreground ml-2 mr-1"
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-16 left-4 right-4 lg:hidden bg-secondary/95 backdrop-blur-xl border border-border/40 rounded-2xl shadow-lg shadow-black/30 overflow-hidden"
        >
          <div className="py-4 px-5 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-1 font-heading text-sm font-semibold tracking-wider px-3 py-2 rounded-lg transition-colors hover:bg-muted/60 ${
                  link.accent
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 opacity-50" />}
              </a>
            ))}
            <a
              href="#plans"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading text-[11px] font-bold tracking-[0.15em] px-6 py-2.5 mt-2 rounded-full transition-all hover:opacity-90"
            >
              GET STARTED <span>→</span>
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
