import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import logoWhite from "@/assets/logo-white.png";

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
    animate={{ filter: ["drop-shadow(0 0 8px hsl(48 90% 50% / 0.3))", "drop-shadow(0 0 20px hsl(48 90% 50% / 0.6))", "drop-shadow(0 0 8px hsl(48 90% 50% / 0.3))"] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Hexagon outline */}
    <motion.path
      d="M32 2L60 19V53L32 70L4 53V19L32 2Z"
      stroke="hsl(48 90% 50%)"
      strokeWidth="1.5"
      fill="none"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    {/* Lock body */}
    <rect x="22" y="34" width="20" height="16" rx="2" stroke="hsl(48 90% 50%)" strokeWidth="1.2" fill="none" />
    {/* Lock shackle */}
    <path d="M26 34V28C26 24.7 28.7 22 32 22C35.3 22 38 24.7 38 28V34" stroke="hsl(48 90% 50%)" strokeWidth="1.2" fill="none" />
    {/* Keyhole */}
    <circle cx="32" cy="41" r="2" fill="hsl(48 90% 50%)" />
    <rect x="31.2" y="42" width="1.6" height="4" rx="0.8" fill="hsl(48 90% 50%)" />
  </motion.svg>
);

/* ═══════════════════════════════════════════════════════════
   HEXAGONAL SEAL for the Carta
   ═══════════════════════════════════════════════════════════ */
const HexSeal = () => (
  <motion.div
    className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center"
    animate={{ filter: ["drop-shadow(0 0 12px hsl(48 90% 50% / 0.4))", "drop-shadow(0 0 24px hsl(48 90% 50% / 0.7))", "drop-shadow(0 0 12px hsl(48 90% 50% / 0.4))"] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    <svg width="96" height="106" viewBox="0 0 80 88" fill="none" className="absolute inset-0 w-full h-full">
      <path
        d="M40 2L76 22V66L40 86L4 66V22L40 2Z"
        stroke="hsl(48 90% 50%)"
        strokeWidth="2"
        fill="hsl(48 90% 50% / 0.08)"
      />
    </svg>
    <img src={logoWhite} alt="DENAR RCRDS" className="relative z-10 w-14 h-14 object-contain" />
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
              className="w-full bg-transparent border border-primary/60 text-foreground font-heading text-sm font-bold tracking-wider px-5 py-4 text-center placeholder:text-muted-foreground placeholder:font-normal placeholder:text-xs placeholder:tracking-widest focus:outline-none focus:border-primary focus:shadow-[0_0_20px_hsl(48_90%_50%_/_0.15)] transition-all duration-500"
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

          {/* Notes */}
          <motion.div
            className="mt-8 space-y-4 text-center max-w-sm mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.8 }}
          >
            <p className="font-body text-[10px] text-foreground/90 leading-relaxed flex items-start gap-2 text-left">
              <svg className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M12 3v12"/><path d="m8 11 4 4 4-4"/></svg>
              To view the content of this proposal, please enter the visible artist name you have on LabelRadar.
            </p>
            <p className="font-body text-[10px] text-foreground/90 leading-relaxed flex items-start gap-2 text-left">
              <svg className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              If this is a collaboration involving more than one artist on the track, the proposal and benefits will apply equitably to all parties.
            </p>
            <p className="font-body text-[10px] text-foreground/90 leading-relaxed flex items-start gap-2 text-left">
              <svg className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              If you experience any issues accessing this proposal, please contact your assigned A&R representative via LabelRadar.
            </p>
          </motion.div>
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
   TYPEWRITER HOOK
   ═══════════════════════════════════════════════════════════ */
const useTypewriter = (text: string, speed = 18, delay = 0) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);
  return { displayed, done };
};

/* ═══════════════════════════════════════════════════════════
   BENEFIT ITEM
   ═══════════════════════════════════════════════════════════ */
const BenefitItem = ({ title, desc, index }: { title: string; desc: string; index: number }) => (
  <motion.li
    className="flex gap-3 items-start"
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 2.4 + index * 0.08 }}
  >
    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
    <p className="font-body text-sm leading-relaxed text-muted-foreground">
      <strong className="text-foreground font-semibold transition-colors duration-300 hover:text-primary">{title}:</strong>{" "}
      <span dangerouslySetInnerHTML={{ __html: desc }} />
    </p>
  </motion.li>
);

/* ═══════════════════════════════════════════════════════════
   THE ELEGANT CARTA — Part 2: The Unlocked Proposal
   ═══════════════════════════════════════════════════════════ */
const ProposalCarta = ({ artistAlias }: { artistAlias: string }) => {
  const displayName = artistAlias.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const introText = `Our A&R team has recently discovered your work, and we were truly impressed by the exceptional production quality and unique sound design displayed in your latest tracks. Your artistic identity aligns perfectly with the high standards of our ecosystem, which is why you have been hand-picked for this exclusive invitation.`;
  const intro2Text = `We want to formally invite you to sign your music under DENAR RCRDS. By joining our roster of over 1,000 artists worldwide, you gain access to a hybrid infrastructure designed to take your career to the next level.`;

  const { displayed: intro1, done: intro1Done } = useTypewriter(introText, 12, 1800);
  const { displayed: intro2, done: intro2Done } = useTypewriter(intro2Text, 12, intro1Done ? 0 : 99999);

  // Re-trigger intro2 when intro1 finishes
  const [startIntro2, setStartIntro2] = useState(false);
  useEffect(() => { if (intro1Done) setStartIntro2(true); }, [intro1Done]);

  const benefits = [
    { title: "Premium Royalties", desc: 'You will retain <span class="text-primary font-semibold">65%</span> of all royalties, with the opportunity to increase to <span class="text-primary font-semibold">70%</span> based on your continued activity and future releases within the label.' },
    { title: "Full Protection", desc: "Professional Licensing and Copyright protection for your work." },
    { title: "Monetization", desc: "Dedicated Content ID licensing for YouTube and SoundCloud." },
    { title: "Editorial Pitching", desc: 'Direct pitching to editorial teams at <span class="text-primary font-semibold">Spotify</span>, <span class="text-primary font-semibold">Beatport</span>, and <span class="text-primary font-semibold">iTunes</span> (subject to store approval).' },
    { title: "Press & Exposure", desc: 'Opportunities for press articles and features under <span class="text-primary font-semibold">DJMAG</span>, <span class="text-primary font-semibold">Mixmag</span>, or <span class="text-primary font-semibold">We Rave You</span> (subject to approval).' },
    { title: "A&R Network Feedback", desc: "Constructive feedback and networking with our extended circle of partner labels." },
    { title: "Marketing & Curation", desc: "Strategic promotion focused on specialized playlists and top-tier curators." },
    { title: "Professional Design", desc: "Custom artwork and promotional assets tailored specifically for your release." },
    { title: "Artist Portal Access", desc: "100% free access to our proprietary dashboard, including statistics management, support ticketing, and exclusive release tools." },
    { title: "Live Opportunities", desc: "Eligibility for our global artist roster, with the possibility of participating in future events, festivals, and international venues." },
  ];

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
          <div className="w-12 h-[1px] bg-primary mx-auto mb-6" />

          {/* Title */}
          <motion.h1
            className="font-heading text-lg sm:text-xl font-black tracking-[0.15em] text-primary text-center mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            DENAR RCRDS: RELEASE PROPOSAL
          </motion.h1>

          <div className="w-8 h-[1px] bg-border/40 mx-auto mb-8" />

          {/* Greeting */}
          <motion.h2
            className="font-heading text-2xl sm:text-3xl font-black tracking-tight text-foreground text-center mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            DEAR {displayName.toUpperCase()},
          </motion.h2>

          {/* Typewriter intro */}
          <motion.div
            className="space-y-5 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
          >
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              {intro1}
              {!intro1Done && <span className="inline-block w-[2px] h-4 bg-primary ml-0.5 animate-pulse align-middle" />}
            </p>
            {startIntro2 && (
              <TypewriterParagraph text={intro2Text} speed={12} />
            )}
          </motion.div>

          {/* Section: THE OFFER & BENEFITS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: intro1Done ? 1 : 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] flex-1 bg-border/30" />
              <h3 className="font-heading text-xs tracking-[0.3em] text-primary font-bold">THE OFFER & BENEFITS</h3>
              <div className="h-[1px] flex-1 bg-border/30" />
            </div>

            <ul className="space-y-3 mb-10">
              {benefits.map((b, i) => (
                <BenefitItem key={b.title} title={b.title} desc={b.desc} index={i} />
              ))}
            </ul>

            {/* Section: NEXT STEPS */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] flex-1 bg-border/30" />
              <h3 className="font-heading text-xs tracking-[0.3em] text-primary font-bold">NEXT STEPS</h3>
              <div className="h-[1px] flex-1 bg-border/30" />
            </div>

            <motion.div
              className="space-y-4 mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2 }}
            >
              <p className="font-body text-sm leading-relaxed text-muted-foreground italic">
                We don't want you to just lose control; we want you to <strong className="text-foreground not-italic font-semibold">gain infrastructure</strong>. If you are ready to be part of the next generation of artists redefining the industry, please follow these steps:
              </p>

              <ol className="space-y-3 pl-1">
                <li className="flex gap-3 items-start">
                  <span className="font-heading text-primary font-bold text-sm mt-0.5">1.</span>
                  <p className="font-body text-sm text-muted-foreground">
                    Notify your assigned A&R on the <strong className="text-foreground font-semibold">LabelRadar</strong> platform to confirm your interest.
                  </p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="font-heading text-primary font-bold text-sm mt-0.5">2.</span>
                  <p className="font-body text-sm text-muted-foreground">
                    Share your email through the chat so we can send the formal contract and legal proposal directly to your inbox.
                  </p>
                </li>
              </ol>
            </motion.div>

            {/* Excitement line */}
            <motion.p
              className="font-heading text-center text-sm tracking-[0.2em] text-foreground font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5 }}
            >
              WE ARE EXCITED TO WORK WITH YOU.
            </motion.p>

            {/* Signature area */}
            <motion.div
              className="flex items-end justify-between mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.6 }}
            >
              <div>
                <p className="font-body text-[10px] text-muted-foreground mb-1">— THE</p>
                <p className="font-heading text-sm font-bold text-foreground">DENAR RCRDS & TRACKS/ID TEAM</p>
              </div>
              <div className="text-right">
                <p className="font-heading text-[9px] tracking-[0.15em] text-muted-foreground">tracksid.com</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* CTA — solid green bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8 }}
        >
          <a
            href="https://www.labelradar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-primary py-5 text-center group hover:brightness-110 transition-all duration-300"
          >
            <span className="font-heading text-sm font-black tracking-[0.2em] text-primary-foreground">
              GO TO LABELRADAR TO CONFIRM →
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
          transition={{ delay: 4 }}
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
   TYPEWRITER PARAGRAPH (standalone, triggers on mount)
   ═══════════════════════════════════════════════════════════ */
const TypewriterParagraph = ({ text, speed = 12 }: { text: string; speed?: number }) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(interval); setDone(true); }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return (
    <p className="font-body text-sm leading-relaxed text-muted-foreground">
      {displayed}
      {!done && <span className="inline-block w-[2px] h-4 bg-primary ml-0.5 animate-pulse align-middle" />}
    </p>
  );
};

/* ═══════════════════════════════════════════════════════════
   WELCOME SCREEN — Transition between lock and proposal
   ═══════════════════════════════════════════════════════════ */
const WelcomeScreen = ({
  artistAlias,
  onComplete,
}: {
  artistAlias: string;
  onComplete: () => void;
}) => {
  const displayName = artistAlias.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  useEffect(() => {
    const timer = setTimeout(onComplete, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 2.5, filter: "blur(20px)" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.h1
        className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-foreground text-center"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        WELCOME, <span className="text-primary">{displayName.toUpperCase()}</span>
      </motion.h1>
      <motion.p
        className="font-body text-base sm:text-lg text-muted-foreground mt-4 tracking-wide"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
      >
        Glad to see you :)
      </motion.p>
      <motion.div
        className="w-12 h-[1px] bg-primary mt-6"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      />
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════ */
const Invitation = () => {
  const { artistAlias } = useParams<{ artistAlias: string }>();
  const [phase, setPhase] = useState<"lock" | "welcome" | "proposal">("lock");
  const alias = artistAlias || "Artist";

  return (
    <>
      <AnimatePresence mode="wait">
        {phase === "lock" && (
          <LockScreen
            key="lock"
            artistAlias={alias}
            onUnlock={() => setPhase("welcome")}
          />
        )}
        {phase === "welcome" && (
          <WelcomeScreen
            key="welcome"
            artistAlias={alias}
            onComplete={() => setPhase("proposal")}
          />
        )}
      </AnimatePresence>
      {phase === "proposal" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <ProposalCarta artistAlias={alias} />
        </motion.div>
      )}
    </>
  );
};

export default Invitation;
