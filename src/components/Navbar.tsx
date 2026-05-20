import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Label", href: "#", hasDropdown: true },
  { label: "Roster", href: "#", hasDropdown: true },
  { label: "Mag", href: "/mag", accent: true },
  { label: "Demos", href: "/demos" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-5"
    >
      <div className="flex items-center gap-2">
        {/* MAIN PILL — arrow notch on right edge */}
        <div
          className="relative hidden lg:flex items-center bg-[#141414] border border-white/[0.06] pl-1.5 pr-9 py-1.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]"
          style={{
            clipPath:
              "polygon(20px 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 20px 100%, 0 50%)",
            borderRadius: "999px",
          }}
        >
          {/* Logo */}
          <a
            href="/"
            aria-label="TRACKS/ID home"
            className="flex items-center justify-center w-9 h-9 rounded-[10px] bg-primary text-primary-foreground font-heading text-base font-black tracking-tight shrink-0 -rotate-[8deg] shadow-[0_4px_12px_-2px_hsl(var(--primary)/0.4)]"
          >
            T
          </a>

          {/* Center nav */}
          <nav className="flex items-center ml-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`group flex items-center gap-1 font-heading text-[13px] font-semibold tracking-tight px-4 py-2 rounded-full transition-colors duration-200 ${
                  link.accent
                    ? "text-primary hover:text-primary"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
                {link.accent && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary -mt-3" />
                )}
                {link.hasDropdown && (
                  <ChevronDown className="w-3 h-3 opacity-40 transition-transform group-hover:translate-y-0.5" />
                )}
              </a>
            ))}
          </nav>
        </div>

        {/* SIGN UP — separate yellow pill */}
        <a
          href="https://app.tracks.id/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center justify-center rounded-full px-6 py-2.5 font-heading text-[13px] font-bold tracking-tight text-primary-foreground bg-primary hover:brightness-110 transition-all shadow-[0_10px_30px_-8px_hsl(var(--primary)/0.55)]"
        >
          Sign Up
        </a>

        {/* MOBILE pill */}
        <div className="lg:hidden flex items-center gap-2 bg-[#141414] border border-white/[0.06] rounded-full pl-1.5 pr-2 py-1.5 shadow-lg shadow-black/40">
          <a
            href="/"
            className="flex items-center justify-center w-9 h-9 rounded-[10px] bg-primary text-primary-foreground font-heading text-base font-black tracking-tight shrink-0 -rotate-[8deg]"
          >
            T
          </a>
          <a
            href="https://app.tracks.id/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full px-4 py-2 font-heading text-[12px] font-bold tracking-tight text-primary-foreground bg-primary"
          >
            Sign Up
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white/90 w-9 h-9 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-4 right-4 lg:hidden bg-[#141414] border border-white/[0.06] rounded-2xl shadow-lg shadow-black/40 overflow-hidden"
        >
          <div className="py-4 px-5 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-1 font-heading text-sm font-semibold tracking-tight px-3 py-2.5 rounded-lg transition-colors hover:bg-white/5 ${
                  link.accent ? "text-primary" : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
                {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 opacity-50" />}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;