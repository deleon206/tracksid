import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Upload, Music, Check, Calendar, ArrowRight, Sparkles } from "lucide-react";
import heroBgNew from "@/assets/hero-bg-new.png";

/* ═══════════════════════════════════════════════════════════
   STORE / PLATFORM CHIPS
   ═══════════════════════════════════════════════════════════ */
const STORES = [
  { id: "spotify", name: "Spotify", color: "#1DB954" },
  { id: "apple", name: "Apple Music", color: "#FA243C" },
  { id: "tiktok", name: "TikTok", color: "#ffffff" },
  { id: "youtube", name: "YouTube", color: "#FF0000" },
  { id: "amazon", name: "Amazon", color: "#00A8E1" },
  { id: "deezer", name: "Deezer", color: "#A238FF" },
];

/* ═══════════════════════════════════════════════════════════
   WORKFLOW PANEL — simulated distribution UI
   ═══════════════════════════════════════════════════════════ */
const WorkflowPanel = () => {
  const [phase, setPhase] = useState<"idle" | "uploading" | "detected">("idle");
  const [progress, setProgress] = useState(0);
  const [selectedStores, setSelectedStores] = useState<string[]>(["spotify", "apple", "tiktok"]);

  // Auto-cycle simulation
  useEffect(() => {
    const run = () => {
      setPhase("idle");
      setProgress(0);
      setTimeout(() => setPhase("uploading"), 1200);
    };
    run();
    const interval = setInterval(run, 9000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase !== "uploading") return;
    let p = 0;
    const id = setInterval(() => {
      p += 4 + Math.random() * 6;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setProgress(100);
        setTimeout(() => setPhase("detected"), 400);
      } else {
        setProgress(p);
      }
    }, 80);
    return () => clearInterval(id);
  }, [phase]);

  const toggleStore = (id: string) =>
    setSelectedStores((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[480px] mx-auto"
    >
      {/* Glow accent behind panel */}
      <div className="absolute -inset-px bg-gradient-to-br from-primary/30 via-transparent to-primary/10 blur-2xl opacity-60 pointer-events-none" />
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

      {/* Glassmorphism panel */}
      <div
        className="relative backdrop-blur-2xl bg-white/[0.03] border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
        style={{ borderRadius: 0 }}
      >
        {/* Top status bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary/80" />
            </div>
            <span className="font-heading text-[9px] tracking-[0.2em] text-white/40 ml-3 uppercase">
              tracks/id · new release
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <span className="font-heading text-[9px] tracking-[0.2em] text-primary font-bold">LIVE</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Step indicator */}
          <div className="flex items-center gap-2 text-[9px] font-heading tracking-[0.2em] text-white/40 uppercase">
            <span className="text-primary">01 Upload</span>
            <span className="flex-1 h-px bg-white/10" />
            <span className={phase === "detected" ? "text-primary" : ""}>02 Metadata</span>
            <span className="flex-1 h-px bg-white/10" />
            <span>03 Distribute</span>
          </div>

          {/* Upload zone */}
          <div className="relative border border-dashed border-white/15 hover:border-primary/50 transition-colors bg-black/30 px-5 py-6">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 shrink-0 border border-white/15 flex items-center justify-center bg-black/40">
                <AnimatePresence mode="wait">
                  {phase === "detected" ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="text-primary"
                    >
                      <Check className="w-5 h-5" strokeWidth={2.5} />
                    </motion.div>
                  ) : phase === "uploading" ? (
                    <motion.div
                      key="music"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-primary"
                    >
                      <Music className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="upload"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, y: [0, -3, 0] }}
                      transition={{ y: { duration: 1.6, repeat: Infinity } }}
                      className="text-white/60"
                    >
                      <Upload className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
                {phase === "uploading" && (
                  <motion.div
                    className="absolute inset-0 border border-primary/50"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <AnimatePresence mode="wait">
                  {phase === "idle" ? (
                    <motion.div key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="font-heading text-xs font-bold text-white uppercase tracking-wider">
                        Drop your track
                      </p>
                      <p className="font-body text-[11px] text-white/40 mt-0.5">WAV · FLAC · MP3 — up to 1GB</p>
                    </motion.div>
                  ) : phase === "uploading" ? (
                    <motion.div key="u" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="font-heading text-xs font-bold text-white uppercase tracking-wider truncate">
                        midnight_drive_master.wav
                      </p>
                      <div className="mt-1.5 h-[3px] bg-white/10 overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                      <p className="font-body text-[10px] text-white/40 mt-1 tabular-nums">
                        {Math.round(progress)}% · analyzing waveform
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div key="d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="font-heading text-xs font-bold text-white uppercase tracking-wider truncate">
                        midnight_drive_master.wav
                      </p>
                      <p className="font-body text-[10px] text-primary mt-0.5 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Metadata detected automatically
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Detected metadata fields */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-heading text-[9px] tracking-[0.2em] text-white/40 uppercase">Track</label>
              <div className="bg-black/30 border border-white/10 px-3 py-2 font-body text-xs text-white/90 truncate">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phase}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: phase === "detected" ? 0.1 : 0 }}
                  >
                    {phase === "detected" ? "Midnight Drive" : "—"}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="font-heading text-[9px] tracking-[0.2em] text-white/40 uppercase">Artist</label>
              <div className="bg-black/30 border border-white/10 px-3 py-2 font-body text-xs text-white/90 truncate">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phase}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: phase === "detected" ? 0.2 : 0 }}
                  >
                    {phase === "detected" ? "Your Name" : "—"}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Stores */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-heading text-[9px] tracking-[0.2em] text-white/40 uppercase">
                Distribute to
              </label>
              <span className="font-heading text-[9px] tracking-[0.15em] text-primary uppercase">
                +180 stores
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {STORES.map((s) => {
                const active = selectedStores.includes(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleStore(s.id)}
                    className={`group flex items-center gap-1.5 px-2.5 py-1.5 border text-[10px] font-heading tracking-wider uppercase transition-all ${
                      active
                        ? "border-primary/60 bg-primary/10 text-white"
                        : "border-white/10 bg-black/20 text-white/50 hover:border-white/30 hover:text-white/80"
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full transition-opacity"
                      style={{
                        backgroundColor: s.color,
                        opacity: active ? 1 : 0.3,
                        boxShadow: active ? `0 0 8px ${s.color}80` : "none",
                      }}
                    />
                    {s.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Release date */}
          <div className="flex items-center justify-between bg-black/30 border border-white/10 px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-3.5 h-3.5 text-white/40" />
              <span className="font-heading text-[10px] tracking-[0.15em] text-white/60 uppercase">
                Release date
              </span>
            </div>
            <span className="font-body text-xs text-white tabular-nums">Friday · May 22</span>
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.99 }}
            className="group w-full bg-primary text-primary-foreground py-3.5 font-heading text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 relative overflow-hidden"
          >
            <span className="relative z-10">Continue distribution</span>
            <ArrowRight className="w-3.5 h-3.5 relative z-10 transition-transform group-hover:translate-x-1" />
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
          <p className="text-center font-body text-[10px] text-white/50">
            Create your free account to publish. <span className="text-primary">No credit card required.</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════════ */
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      {/* Cinematic background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBgNew}
          alt=""
          className="w-full h-full object-cover opacity-50"
          style={{ filter: "blur(2px) grayscale(40%)" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        {/* Gold accent glow */}
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col container px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 pb-12">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT — Headline */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 w-fit"
            >
              <span className="w-8 h-px bg-primary" />
              <span className="font-heading text-[10px] font-bold tracking-[0.25em] text-primary uppercase">
                The Modern Record Label
              </span>
            </motion.div>

            <h1 className="font-heading font-black uppercase tracking-[-0.04em] leading-[0.85] text-[clamp(3rem,9vw,7.5rem)]">
              <motion.span
                className="block text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Upload.
              </motion.span>
              <motion.span
                className="block text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                Distribute.
              </motion.span>
              <motion.span
                className="block text-primary relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Get heard.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="font-body text-sm sm:text-base text-white/60 max-w-md leading-relaxed"
            >
              The hybrid music distribution platform for independent labels and artists. Release in 180+ stores,
              own your masters, scale your catalog.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex flex-wrap items-center gap-3 mt-2"
            >
              <a
                href="#plans"
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-heading text-[11px] font-black uppercase tracking-[0.2em] hover:bg-primary/90 transition-colors"
              >
                Start distributing
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#services"
                className="group inline-flex items-center gap-2 border border-white/20 text-white/80 px-5 py-3 font-heading text-[11px] font-bold uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-colors"
              >
                Explore services
              </a>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex items-center gap-6 pt-6 border-t border-white/10 max-w-md mt-2"
            >
              <div>
                <p className="font-heading text-xl font-black text-white tabular-nums">10K+</p>
                <p className="font-heading text-[9px] tracking-[0.2em] text-white/40 uppercase mt-0.5">Artists</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="font-heading text-xl font-black text-white tabular-nums">1.2K</p>
                <p className="font-heading text-[9px] tracking-[0.2em] text-white/40 uppercase mt-0.5">Labels</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="font-heading text-xl font-black text-white tabular-nums">180+</p>
                <p className="font-heading text-[9px] tracking-[0.2em] text-white/40 uppercase mt-0.5">Stores</p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Workflow */}
          <div className="lg:col-span-6 xl:col-span-5">
            <WorkflowPanel />
          </div>
        </div>
      </div>

      {/* SEO-friendly hidden long-form context (visible to crawlers) */}
      <p className="sr-only">
        TRACKS/ID is the leading hybrid music distribution platform for independent record labels and artists.
        Upload your music, distribute to Spotify, Apple Music, TikTok, YouTube and over 180 stores, and grow your
        catalog with a real record label infrastructure.
      </p>
    </section>
  );
};

export default HeroSection;
