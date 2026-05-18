import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Upload, Music, Check, Calendar, ArrowRight, Sparkles, X } from "lucide-react";
import heroBgNew from "@/assets/hero-bg-new.png";

/* ─── Stores ─── */
const STORES = [
  { id: "spotify", name: "Spotify", color: "#1DB954" },
  { id: "apple", name: "Apple Music", color: "#FA243C" },
  { id: "tiktok", name: "TikTok", color: "#ffffff" },
  { id: "youtube", name: "YouTube", color: "#FF0000" },
  { id: "amazon", name: "Amazon", color: "#00A8E1" },
  { id: "deezer", name: "Deezer", color: "#A238FF" },
];

type Phase = "idle" | "uploading" | "detected" | "stores" | "schedule" | "ready";

/* ═══════════════════════════════════════════════════════════
   WORKFLOW PANEL — cinematic interactive distribution UI
   ═══════════════════════════════════════════════════════════ */
const WorkflowPanel = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string>("");
  const [trackTitle, setTrackTitle] = useState<string>("");
  const [selectedStores, setSelectedStores] = useState<string[]>(["spotify", "apple", "tiktok"]);

  const openPicker = () => fileInputRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    // strictly client-side, never uploaded
    const raw = f.name.replace(/\.[^.]+$/, "");
    setFileName(f.name);
    setTrackTitle(
      raw
        .replace(/[_\-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase())
        .slice(0, 40),
    );
    setProgress(0);
    setPhase("uploading");
  };

  // Simulated upload progress
  useEffect(() => {
    if (phase !== "uploading") return;
    let p = 0;
    const id = setInterval(() => {
      p += 3 + Math.random() * 7;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setProgress(100);
        setTimeout(() => setPhase("detected"), 500);
      } else {
        setProgress(p);
      }
    }, 90);
    return () => clearInterval(id);
  }, [phase]);

  // Auto-advance: detected → stores
  useEffect(() => {
    if (phase === "detected") {
      const t = setTimeout(() => setPhase("stores"), 1800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const reset = () => {
    setPhase("idle");
    setProgress(0);
    setFileName("");
    setTrackTitle("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const toggleStore = (id: string) =>
    setSelectedStores((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const hasFile = phase !== "idle";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
    className="relative w-full max-w-[920px] mx-auto"
    >
      {/* Floating soft glow halo */}
      <motion.div
        className="absolute -inset-10 pointer-events-none"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary/[0.06] rounded-full blur-[80px]" />
      </motion.div>

      {/* Floating layered shadow card */}
      <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[28px] bg-primary/5 blur-xl" />

      {/* Main floating panel */}
      <motion.div
        className="relative rounded-[28px] overflow-hidden backdrop-blur-2xl bg-white/[0.04] border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)]"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Inner subtle highlight */}
        <div className="absolute inset-0 rounded-[28px] pointer-events-none bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />

        {/* Header */}
        <div className="relative flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full border border-primary/40 flex items-center justify-center bg-primary/10">
              <span className="font-heading text-[9px] font-black text-primary">T/</span>
            </div>
            <div>
              <p className="font-heading text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase">
                New release
              </p>
              <p className="font-body text-[9px] text-white/40 -mt-0.5">tracks/id studio</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            <span className="font-heading text-[9px] tracking-[0.25em] text-primary font-bold">LIVE</span>
          </div>
        </div>

        {/* Body */}
        <div className="relative p-6 space-y-5">
          {/* Step rail */}
          <div className="flex items-center gap-2">
            {["Upload", "Metadata", "Stores", "Release"].map((s, i) => {
              const states: Phase[] = ["uploading", "detected", "stores", "schedule"];
              const reached = states.indexOf(phase) >= i || phase === "ready";
              return (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div
                    className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                      reached ? "bg-primary" : "bg-white/10"
                    }`}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between -mt-3 px-0.5">
            {["Upload", "Metadata", "Stores", "Release"].map((s) => (
              <span
                key={s}
                className="font-heading text-[8px] tracking-[0.18em] text-white/40 uppercase"
              >
                {s}
              </span>
            ))}
          </div>

          {/* Upload zone */}
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*,.wav,.mp3,.flac,.aiff"
              onChange={onFileChange}
              className="hidden"
            />

            <AnimatePresence mode="wait">
              {!hasFile && (
                <motion.button
                  key="dropzone"
                  type="button"
                  onClick={openPicker}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="group w-full rounded-2xl border border-dashed border-white/15 hover:border-primary/60 bg-black/30 hover:bg-primary/[0.03] transition-all px-6 py-7 text-left"
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/70 group-hover:text-primary group-hover:border-primary/40 transition-colors"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Upload className="w-5 h-5" strokeWidth={1.8} />
                    </motion.div>
                    <div>
                      <p className="font-heading text-sm font-bold text-white tracking-wide">
                        Upload your track
                      </p>
                      <p className="font-body text-xs text-white/45 mt-1">
                        WAV · FLAC · MP3 · AIFF — drop a file to start your release
                      </p>
                    </div>
                  </div>
                </motion.button>
              )}

              {hasFile && (
                <motion.div
                  key="file"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                      <AnimatePresence mode="wait">
                        {phase === "uploading" ? (
                          <motion.div
                            key="m"
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.6, opacity: 0 }}
                          >
                            <Music className="w-5 h-5 text-primary" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="c"
                            initial={{ scale: 0.4, rotate: -30, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                          >
                            <Check className="w-5 h-5 text-primary" strokeWidth={2.5} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {phase === "uploading" && (
                        <motion.div
                          className="absolute inset-0 rounded-xl border border-primary/50"
                          animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.08, 1] }}
                          transition={{ duration: 1.4, repeat: Infinity }}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading text-xs font-bold text-white truncate tracking-wide">
                        {fileName}
                      </p>
                      {phase === "uploading" ? (
                        <>
                          <div className="mt-2 h-[3px] rounded-full bg-white/10 overflow-hidden">
                            <motion.div
                              className="h-full bg-primary rounded-full"
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.1 }}
                            />
                          </div>
                          <p className="font-body text-[10px] text-white/45 mt-1 tabular-nums">
                            {Math.round(progress)}% · analyzing waveform
                          </p>
                        </>
                      ) : (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="font-body text-[10px] text-primary mt-1 flex items-center gap-1.5"
                        >
                          <Sparkles className="w-3 h-3" />
                          Metadata detected · ready to distribute
                        </motion.p>
                      )}
                    </div>
                    <button
                      onClick={reset}
                      className="p-1.5 rounded-full text-white/30 hover:text-white/80 hover:bg-white/5 transition-colors shrink-0"
                      aria-label="Remove file"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Metadata fields */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-heading text-[9px] tracking-[0.22em] text-white/40 uppercase">
                Track
              </label>
              <div className="rounded-xl bg-white/[0.03] border border-white/10 px-3.5 py-2.5 font-body text-xs text-white/90 truncate min-h-[38px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={trackTitle || "empty"}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={trackTitle ? "" : "text-white/30"}
                  >
                    {trackTitle || "—"}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="font-heading text-[9px] tracking-[0.22em] text-white/40 uppercase">
                Artist
              </label>
              <div className="rounded-xl bg-white/[0.03] border border-white/10 px-3.5 py-2.5 font-body text-xs text-white/90 truncate min-h-[38px] flex items-center">
                <span className={hasFile ? "" : "text-white/30"}>
                  {hasFile ? "Your Name" : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Stores */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="font-heading text-[9px] tracking-[0.22em] text-white/40 uppercase">
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
                    className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-heading tracking-wider uppercase transition-all ${
                      active
                        ? "border-primary/50 bg-primary/10 text-white"
                        : "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/25 hover:text-white/80"
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full transition-all"
                      style={{
                        backgroundColor: s.color,
                        opacity: active ? 1 : 0.3,
                        boxShadow: active ? `0 0 8px ${s.color}99` : "none",
                      }}
                    />
                    {s.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Release date */}
          <div className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-3.5 h-3.5 text-white/40" />
              <span className="font-heading text-[10px] tracking-[0.18em] text-white/60 uppercase">
                Release
              </span>
            </div>
            <span className="font-body text-xs text-white tabular-nums">Friday · May 22</span>
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={openPicker}
            className="group relative w-full rounded-full bg-primary text-primary-foreground py-3.5 font-heading text-[11px] font-black uppercase tracking-[0.22em] flex items-center justify-center gap-2 overflow-hidden shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.6)]"
          >
            <span className="relative z-10">
              {phase === "idle" ? "Start your release" : "Continue distribution"}
            </span>
            <ArrowRight className="w-3.5 h-3.5 relative z-10 transition-transform group-hover:translate-x-1" />
            <motion.span
              className="absolute inset-0 bg-white/25"
              initial={{ x: "-110%" }}
              whileHover={{ x: "110%" }}
              transition={{ duration: 0.7 }}
            />
          </motion.button>
          <p className="text-center font-body text-[10px] text-white/55">
            Create your free account to publish.{" "}
            <span className="text-primary">No credit card required.</span>
          </p>
        </div>
      </motion.div>
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
          className="w-full h-full object-cover opacity-40"
          style={{ filter: "blur(2px) grayscale(45%) contrast(1.05)" }}
          aria-hidden="true"
        />
        {/* Cinematic dark gradients — symmetrical for centered comp */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/40 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,hsl(var(--background))_85%)]" />
        {/* Soft gold glow centered */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/[0.07] rounded-full blur-[160px] pointer-events-none" />
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col container px-4 sm:px-6 md:px-8 pt-28 sm:pt-32 pb-20">
        {/* CENTERED EDITORIAL COMPOSITION */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm px-4 py-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-heading text-[10px] font-bold tracking-[0.28em] text-white/70 uppercase">
              Hybrid Distribution · Built for Labels
            </span>
          </motion.div>

          <h1 className="mt-8 font-heading font-black uppercase tracking-[-0.035em] leading-[0.92] text-[clamp(2.5rem,8vw,6.75rem)] text-foreground">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Start your next release
            </motion.span>
            <motion.span
              className="block text-primary italic font-light normal-case tracking-tight mt-1"
              style={{ fontFamily: "'Inter', serif" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              without friction.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-7 font-body text-base sm:text-lg text-white/65 max-w-xl leading-relaxed"
          >
            The hybrid distribution platform engineered for independent labels and artists.
            Upload, distribute to 180+ stores, and grow your catalog with real record-label infrastructure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#plans"
              className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 font-heading text-[11px] font-black uppercase tracking-[0.2em] hover:bg-primary/90 transition-all shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.6)]"
            >
              Start distributing
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.02] backdrop-blur-sm text-white/80 px-6 py-3.5 font-heading text-[11px] font-bold uppercase tracking-[0.2em] hover:border-white/40 hover:text-white transition-all"
            >
              Explore platform
            </a>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-10 flex items-center justify-center gap-8 sm:gap-10"
          >
            {[
              { v: "10K+", l: "Artists" },
              { v: "1.2K", l: "Labels" },
              { v: "180+", l: "Stores" },
            ].map((s, i) => (
              <div key={s.l} className="flex items-center gap-8 sm:gap-10">
                {i > 0 && <div className="w-px h-8 bg-white/10" />}
                <div className="text-center">
                  <p className="font-heading text-lg sm:text-xl font-black text-white tabular-nums">{s.v}</p>
                  <p className="font-heading text-[9px] tracking-[0.22em] text-white/40 uppercase mt-0.5">
                    {s.l}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* FLOATING WORKFLOW PANEL — embedded into the scene */}
        <div className="mt-16 sm:mt-20 w-full">
          <WorkflowPanel />
        </div>
      </div>

      {/* SEO long-form */}
      <p className="sr-only">
        TRACKS/ID is the leading hybrid music distribution platform for independent record labels and artists.
        Upload your music, distribute to Spotify, Apple Music, TikTok, YouTube and over 180 stores, and grow your
        catalog with a real record label infrastructure.
      </p>
    </section>
  );
};

export default HeroSection;
