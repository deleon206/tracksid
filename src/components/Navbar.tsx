import { motion } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { label: "PRODUCT", href: "#" },
  { label: "INDUSTRIES", href: "#" },
  { label: "WHO WE ARE", href: "#" },
  { label: "MAG", href: "/mag" },
  { label: "RESOURCES", href: "#" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md"
    >
      <div className="container flex items-center justify-between py-4">
        <a href="/" className="font-heading text-sm font-bold tracking-widest text-foreground uppercase">
          Elevated Signals
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-heading text-xs font-semibold tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#"
          className="hidden lg:inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading text-xs font-bold tracking-wider px-6 py-3 hover:brightness-110 transition-all duration-200"
        >
          BOOK A DEMO <span>→</span>
        </a>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-foreground"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="lg:hidden border-t border-border bg-background"
        >
          <div className="container py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="font-heading text-sm font-semibold tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                {link}
              </a>
            ))}
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading text-xs font-bold tracking-wider px-6 py-3 mt-2"
            >
              BOOK A DEMO <span>→</span>
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
