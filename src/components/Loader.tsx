import { motion } from "framer-motion";
import logoWhite from "@/assets/logo-white.png";

const BRAND_TEXT = "TRACKS / ID";

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2.8 }}
      onAnimationComplete={onComplete}
    >
      <div className="loader-wrapper">
        {/* Spinning dot */}
        <div className="loader-dot" />

        {/* Brand letters */}
        <div className="letter-wrapper">
          {BRAND_TEXT.split("").map((char, i) => (
            <span
              key={i}
              className="loader-letter font-heading text-sm tracking-[0.25em] uppercase text-foreground"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      </div>

      {/* Logo below */}
      <motion.img
        src={logoWhite}
        alt="TRACKS/ID"
        className="absolute bottom-12 w-8 h-8 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      />
    </motion.div>
  );
};

export default Loader;
