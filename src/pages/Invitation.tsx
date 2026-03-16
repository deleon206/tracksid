import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════
   DOT GRID BACKGROUND — subtle encrypted-node aesthetic
   ═══════════════════════════════════════════════════════════ */
const DotGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    const GAP = 32;

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const cols = Math.ceil(w / GAP) + 1;
      const rows = Math.ceil(h / GAP) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          ctx.beginPath();
          ctx.arc(c * GAP, r * GAP, 0.6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.04)";
          ctx.fill();
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" aria-hidden="true" />;
};

/* ═══════════════════════════════════════════════════════════
   PULSING HEXAGON LOCK ICON
   ═══════════════════════════════════════════════════════════ */
const HexLockIcon = () => (
  <motion.svg
    width="64"
    height="72"
    viewBox="0 0 64 72"
    fill="none"
    className="mb-8"
    animate={{ filter: ["drop-shadow(0 0 8px hsl(152 100% 50% / 0.3))", "drop-shadow(0 0 20px hsl(152 100% 50% / 0.6))", "drop-shadow(0 0 8px hsl(152 100% 50% / 0.3))"] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Hexagon outline */}
    <motion.path
      d="M32 2L60 19V53L32 70L4 53V19L32 2Z"
      stroke="hsl(152 100% 50%)"
      strokeWidth="1.5"
      fill="none"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    {/* Lock body */}
    <rect x="22" y="34" width="20" height="16" rx="2" stroke="hsl(152 100% 50%)" strokeWidth="1.2" fill="none" />
    {/* Lock shackle */}
    <path d="M26 34V28C26 24.7 28.7 22 32 22C35.3 22 38 24.7 38 28V34" stroke="hsl(152 100% 50%)" strokeWidth="1.2" fill="none" />
    {/* Keyhole */}
    <circle cx="32" cy="41" r="2" fill="hsl(152 100% 50%)" />
    <rect x="31.2" y="42" width="1.6" height="4" rx="0.8" fill="hsl(152 100% 50%)" />
  </motion.svg>
);

/* ═══════════════════════════════════════════════════════════
   HEXAGONAL SEAL for the Carta
   ═══════════════════════════════════════════════════════════ */
const HexSeal = () => (
  <motion.div
    className="relative w-20 h-20 mx-auto mb-6"
    animate={{ filter: ["drop-shadow(0 0 12px hsl(152 100% 50% / 0.4))", "drop-shadow(0 0 24px hsl(152 100% 50% / 0.7))", "drop-shadow(0 0 12px hsl(152 100% 50% / 0.4))"] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    <svg width="80" height="88" viewBox="0 0 80 88" fill="none">
      <path
        d="M40 2L76 22V66L40 86L4 66V22L40 2Z"
        stroke="hsl(152 100% 50%)"
        strokeWidth="2"
        fill="hsl(152 100% 50% / 0.08)"
      />
      <text x="40" y="50" textAnchor="middle" fill="hsl(152 100% 50%)" fontFamily="Montserrat" fontWeight="800" fontSize="14">
        T/ID
      </text>
    </svg>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════
   LOCK SCREEN — Part 1: The Digital Handshake
   ═══════════════════════════════════════════════════════════ */
const LockScreen = ({
  artistAlias,
  onUnlock,
}: {
  artistAlias: string;
  onUnlock: () => void;
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (inputValue.trim().length > 0) onUnlock();
    },
    [inputValue, onUnlock]
  );

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0, filter: "blur(12px)" }}
      transition={{ duration: 0.8 }}
    >
      <DotGrid />

      <motion.div
        className="relative z-10 flex flex-col items-center max-w-md w-full px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <HexLockIcon />

        {/* Kicker */}
        <motion.p
          className="font-heading text-[10px] tracking-[0.3em] text-muted-foreground mb-10 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          [ Confidential Access Required ]
        </motion.p>

        {/* Input */}
        <form onSubmit={handleSubmit} className="w-full">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Insert Artist Alias to Decrypt for ${artistAlias}`}
              className="w-full bg-transparent border border-primary/60 text-foreground font-heading text-sm font-bold tracking-wider px-5 py-4 text-center placeholder:text-muted-foreground placeholder:font-normal placeholder:text-xs placeholder:tracking-widest focus:outline-none focus:border-primary focus:shadow-[0_0_20px_hsl(152_100%_50%_/_0.15)] transition-all duration-500"
              autoFocus
            />
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/80" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/80" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/80" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/80" />
          </motion.div>

          <motion.p
            className="font-body text-[10px] text-muted-foreground text-center mt-4 tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.4 }}
          >
            Press ENTER to decrypt
          </motion.p>
        </form>

        {/* Brand */}
        <motion.div
          className="absolute bottom-[-120px] flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.8 }}
        >
          <span className="font-heading text-[9px] tracking-[0.3em] text-muted-foreground">
            TRACKS/ID GATEWAY
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   THE ELEGANT CARTA — Part 2: The Unlocked Proposal
   ═══════════════════════════════════════════════════════════ */
const ProposalCarta = ({ artistAlias }: { artistAlias: string }) => {
  const displayName = artistAlias.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <motion.div
      className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <DotGrid />

      <motion.article
        className="relative z-10 w-full max-w-2xl border border-border/40 bg-card/40 backdrop-blur-sm"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {/* Top border accent */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="px-8 sm:px-14 py-10 sm:py-14">
          {/* Header info strip */}
          <motion.div
            className="flex items-center justify-between mb-10 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="font-heading text-[9px] tracking-[0.2em]">// PRIVATE INVITATION</span>
            <span className="font-heading text-[9px] tracking-[0.2em]">REF: T/ID-2026</span>
          </motion.div>

          {/* Hexagonal Seal */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          >
            <HexSeal />
          </motion.div>

          {/* Green ribbon line */}
          <div className="w-12 h-[1px] bg-primary mx-auto mb-10" />

          {/* Greeting */}
          <motion.h1
            className="font-heading text-2xl sm:text-3xl font-black tracking-tight text-foreground text-center mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            DEAR {displayName.toUpperCase()},
          </motion.h1>

          <motion.p
            className="font-body text-[10px] tracking-[0.2em] text-muted-foreground text-center mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            A PRIVATE INVITATION TO THE HYBRID ECOSYSTEM
          </motion.p>

          {/* Body */}
          <motion.div
            className="space-y-5 mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
          >
            <p className="font-body text-sm leading-relaxed text-muted-foreground [&_strong]:text-foreground [&_strong]:font-semibold hover:[&_strong]:text-primary [&_strong]:transition-colors [&_strong]:duration-300">
              You have been selected to join an exclusive network founded on the{" "}
              <strong>strategic merge with DENAR RCRDS</strong>. TRACKS/ID is the industry's first{" "}
              <strong>hybrid distribution network</strong>, unifying the legacy of a powerhouse label—
              <strong>backed by DJ Mag and Beatport</strong>—with a next-generation, all-in-one digital music
              infrastructure.
            </p>

            <p className="font-body text-sm leading-relaxed text-muted-foreground [&_strong]:text-foreground [&_strong]:font-semibold hover:[&_strong]:text-primary [&_strong]:transition-colors [&_strong]:duration-300">
              Whether you choose a <strong>conventional label deal</strong> or prefer to{" "}
              <strong>distribute independently</strong>, you maintain{" "}
              <strong>full control of your catalog</strong>—monetizing, protecting, and promoting your music on your
              terms.
            </p>

            <p className="font-body text-sm leading-relaxed text-muted-foreground [&_strong]:text-foreground [&_strong]:font-semibold hover:[&_strong]:text-primary [&_strong]:transition-colors [&_strong]:duration-300">
              Join a community of <strong>+10,000 artists</strong> already scaling their vision through our{" "}
              <strong>hybrid model</strong>.
            </p>
          </motion.div>

          {/* Proposition bullets */}
          <motion.div
            className="grid grid-cols-3 gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            {[
              { label: "MONETIZE", desc: "Revenue streams optimized" },
              { label: "PROTECT", desc: "Copyright & catalog secured" },
              { label: "PROMOTE", desc: "Global reach amplified" },
            ].map((item) => (
              <div key={item.label} className="text-center border border-border/30 py-4 px-2 group hover:border-primary/50 transition-colors duration-300">
                <p className="font-heading text-[10px] tracking-[0.2em] text-primary mb-1 font-bold">
                  {item.label}
                </p>
                <p className="font-body text-[10px] text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Signature area */}
          <motion.div
            className="flex items-end justify-between mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            <div>
              <p className="font-body text-xs text-muted-foreground mb-1">Best regards,</p>
              <p className="font-heading text-sm font-bold text-foreground">TRACKS/ID Team</p>
              <p className="font-body text-[10px] text-muted-foreground">powered by DENAR RCRDS</p>
            </div>
            <div className="text-right">
              <p className="font-heading text-[9px] tracking-[0.15em] text-muted-foreground">
                tracksid.com
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA — solid green bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4 }}
        >
          <a
            href="/#plans"
            className="block w-full bg-primary py-5 text-center group hover:brightness-110 transition-all duration-300"
          >
            <span className="font-heading text-sm font-black tracking-[0.2em] text-primary-foreground">
              SEND YOUR DEMO →
            </span>
          </a>
          <div className="py-3 text-center">
            <span className="font-body text-[10px] text-muted-foreground">
              <a href="/#services" className="hover:text-foreground transition-colors">Explore Services</a>
              <span className="mx-2 text-border">|</span>
              No credit card required
            </span>
          </div>
        </motion.div>

        {/* Trust badges footer */}
        <motion.div
          className="border-t border-border/30 px-8 sm:px-14 py-4 flex items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
        >
          <span className="font-heading text-[9px] tracking-[0.15em] text-muted-foreground/40 font-bold">DJ MAG</span>
          <span className="font-heading text-[9px] tracking-[0.15em] text-muted-foreground/40 font-bold">BEATPORT</span>
          <span className="font-heading text-[9px] tracking-[0.15em] text-muted-foreground/40 font-bold">+10K ARTISTS</span>
        </motion.div>
      </motion.article>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════ */
const Invitation = () => {
  const { artistAlias } = useParams<{ artistAlias: string }>();
  const [unlocked, setUnlocked] = useState(false);
  const alias = artistAlias || "Artist";

  return (
    <>
      <AnimatePresence mode="wait">
        {!unlocked && (
          <LockScreen
            key="lock"
            artistAlias={alias}
            onUnlock={() => setUnlocked(true)}
          />
        )}
      </AnimatePresence>
      {unlocked && <ProposalCarta artistAlias={alias} />}
    </>
  );
};

export default Invitation;
