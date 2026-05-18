import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Upload, Music, Check, ArrowRight, Sparkles, X, Radio } from "lucide-react";
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

type Phase = "idle" | "uploading" | "detected" | "stores" | "ready";

/* ═══════════════════════════════════════════════════════════
   WORKFLOW PANEL — cinematic interactive distribution UI
   ═══════════════════════════════════════════════════════════ */
const WorkflowPanel = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string>("");
  const [trackTitle, setTrackTitle] = useState<string>("");
  const [artistName, setArtistName] = useState<string>("Your Name");
  const [releaseDate, setReleaseDate] = useState<string>("2026-05-22");
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

  // Step-by-step: user advances manually via "Next" after upload completes.

  const goNext = () => {
    setPhase((p) => (p === "detected" ? "stores" : p === "stores" ? "ready" : p));
  };

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
  const isUploading = phase === "uploading";
  const showMeta = phase === "detected";
  const showStores = phase === "stores";
  const showReady = phase === "ready";

  const stepIndex =
    phase === "idle" || phase === "uploading"
      ? 0
      : phase === "detected"
        ? 1
        : phase === "stores"
          ? 2
          : 3;

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
        <div className="absolute top-0 right-0 w-[28rem] h-[28rem] bg-primary/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/[0.06] rounded-full blur-[100px]" />
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
            <div className="w-7 h-7 rounded-full border border-primary/40 flex items-center justify-center bg-primary/10 shrink-0">
              {hasFile && !isUploading ? (
                <Check className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
              ) : (
                <span className="font-heading text-[9px] font-black text-primary">T/</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-heading text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase truncate max-w-[260px] sm:max-w-[420px]">
                {hasFile ? (trackTitle || fileName) : "New release"}
              </p>
              <p className="font-body text-[9px] text-white/40 -mt-0.5 truncate max-w-[260px] sm:max-w-[420px]">
                {hasFile ? fileName : "tracks/id studio"}
              </p>
            </div>
            {hasFile && (
              <button
                onClick={reset}
                className="ml-1 p-1 rounded-full text-white/30 hover:text-white/80 hover:bg-white/5 transition-colors"
                aria-label="Remove file"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          <span className="font-heading text-[9px] tracking-[0.25em] text-white/40 font-bold uppercase">
            Step {String(stepIndex + 1).padStart(2, "0")} / 04
          </span>
        </div>

        {/* Body */}
        <div className="relative p-6 sm:p-7 space-y-5 min-h-[360px]">
          {/* Step rail */}
          <div className="flex items-center gap-2">
            {["Upload", "Metadata", "Stores", "Release"].map((s, i) => {
              const reached = stepIndex >= i;
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
            {["Upload", "Metadata", "Stores", "Release"].map((s, i) => (
              <span
                key={s}
                className={`font-heading text-[8px] tracking-[0.18em] uppercase transition-colors ${
                  stepIndex === i ? "text-primary" : "text-white/40"
                }`}
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

            <AnimatePresence mode="wait" initial={false}>
              {!hasFile && (
                <motion.button
                  key="dropzone"
                  type="button"
                  onClick={openPicker}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="group relative w-full rounded-2xl border border-dashed border-white/15 hover:border-primary/60 bg-black/30 hover:bg-primary/[0.03] transition-all px-7 py-10 text-left overflow-hidden"
                >
                  {/* breathing glow */}
                  <motion.div
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.10),transparent_70%)]"
                    animate={{ opacity: [0.35, 0.75, 0.35] }}
                    transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="relative flex items-center gap-5">
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/80 group-hover:text-primary group-hover:border-primary/40 transition-colors shadow-[0_0_40px_-10px_hsl(var(--primary)/0.4)]"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Upload className="w-6 h-6" strokeWidth={1.6} />
                    </motion.div>
                    <div className="flex-1">
                      <p className="font-heading text-base font-bold text-white tracking-wide uppercase">
                        Drop your track to begin
                      </p>
                      <p className="font-body text-xs text-white/45 mt-1.5">
                        WAV · FLAC · MP3 · AIFF — up to 96 kHz / 24-bit
                      </p>
                    </div>
                    <div className="hidden sm:flex flex-col items-end gap-1 pr-1">
                      <span className="font-heading text-[9px] tracking-[0.25em] text-primary uppercase">Step 01</span>
                      <span className="font-body text-[10px] text-white/40">of 04</span>
                    </div>
                  </div>
                </motion.button>
              )}

              {isUploading && (
                <motion.div
                  key="uploading"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-white/10 bg-black/40 px-5 py-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                      <Music className="w-5 h-5 text-primary" />
                      <motion.div
                        className="absolute inset-0 rounded-xl border border-primary/50"
                        animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.08, 1] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading text-xs font-bold text-white truncate tracking-wide">
                        {fileName}
                      </p>
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
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progressive reveal: metadata */}
          <AnimatePresence initial={false}>
            {showMeta && (
              <motion.div
                key="meta"
                initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3"
              >
                <div className="space-y-1.5">
                  <label className="font-heading text-[9px] tracking-[0.22em] text-white/40 uppercase flex items-center gap-1.5">
                    <Sparkles className="w-2.5 h-2.5 text-primary" /> Track title
                  </label>
                  <input
                    type="text"
                    value={trackTitle}
                    onChange={(e) => setTrackTitle(e.target.value)}
                    placeholder="Untitled"
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 focus:border-primary/50 focus:bg-white/[0.05] outline-none px-3.5 py-2.5 font-body text-xs text-white/90 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-heading text-[9px] tracking-[0.22em] text-white/40 uppercase flex items-center gap-1.5">
                    <Sparkles className="w-2.5 h-2.5 text-primary" /> Artist
                  </label>
                  <input
                    type="text"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    placeholder="Artist name"
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 focus:border-primary/50 focus:bg-white/[0.05] outline-none px-3.5 py-2.5 font-body text-xs text-white/90 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-heading text-[9px] tracking-[0.22em] text-white/40 uppercase flex items-center gap-1.5">
                    <Sparkles className="w-2.5 h-2.5 text-primary" /> Release date
                  </label>
                  <input
                    type="date"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 focus:border-primary/50 focus:bg-white/[0.05] outline-none px-3.5 py-2.5 font-body text-xs text-white/90 transition-colors [color-scheme:dark]"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progressive reveal: stores */}
          <AnimatePresence initial={false}>
            {showStores && (
              <motion.div
                key="stores"
                initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <label className="font-heading text-[9px] tracking-[0.22em] text-white/40 uppercase flex items-center gap-1.5">
                    <Radio className="w-2.5 h-2.5 text-primary" /> Distribute to
                  </label>
                  <span className="font-heading text-[9px] tracking-[0.15em] text-primary uppercase">
                    +180 stores
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {STORES.map((s, i) => {
                    const active = selectedStores.includes(s.id);
                    return (
                      <motion.button
                        key={s.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.06 }}
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
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progressive reveal: ready / account prompt */}
          <AnimatePresence initial={false}>
            {showReady && (
              <motion.div
                key="ready"
                initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3 pt-1"
              >
                <div className="flex items-center justify-between rounded-xl bg-primary/[0.06] border border-primary/25 px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
                    <span className="font-heading text-[10px] tracking-[0.18em] text-white uppercase">
                      Release ready
                    </span>
                  </div>
                  <span className="font-body text-xs text-white/70 tabular-nums">
                    {new Date(releaseDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <motion.a
                  href="#plans"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="group relative w-full rounded-full bg-primary text-primary-foreground py-3.5 font-heading text-[11px] font-black uppercase tracking-[0.22em] flex items-center justify-center gap-2 overflow-hidden shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.6)]"
                >
                  <span className="relative z-10">Create account to publish</span>
                  <ArrowRight className="w-3.5 h-3.5 relative z-10 transition-transform group-hover:translate-x-1" />
                </motion.a>
                <p className="text-center font-body text-[10px] text-white/55">
                  Free to start · <span className="text-primary">No credit card required.</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step navigation — manual next */}
          {(phase === "detected" || phase === "stores") && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex items-center justify-between pt-1"
            >
              <span className="font-body text-[10px] text-white/45">
                {phase === "detected"
                  ? "Review metadata and continue"
                  : "Confirm stores to finalize"}
              </span>
              <button
                type="button"
                onClick={goNext}
                className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2 font-heading text-[10px] font-black uppercase tracking-[0.22em] shadow-[0_10px_30px_-12px_hsl(var(--primary)/0.6)] hover:bg-primary/90 transition-colors"
              >
                Next
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </motion.div>
          )}
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

      <div className="relative z-10 flex-1 flex flex-col container px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-16">
        {/* CENTERED EDITORIAL COMPOSITION */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto w-full">
          <h1 className="font-heading font-black uppercase tracking-[-0.03em] leading-[0.95] text-[clamp(2.4rem,5.8vw,4.75rem)] text-foreground">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Start your next release
            </motion.span>
            <motion.span
              className="block text-primary italic font-light normal-case tracking-tight mt-2"
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
            className="mt-5 font-body text-base sm:text-[17px] text-white/65 max-w-xl leading-relaxed"
          >
            Hybrid distribution built for labels and artists who refuse to compromise.
          </motion.p>

          {/* Primary + secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-7 flex items-center gap-3 flex-wrap justify-center"
          >
            <a
              href="#plans"
              className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-heading text-[11px] font-black uppercase tracking-[0.22em] shadow-[0_10px_40px_-12px_hsl(var(--primary)/0.6)] hover:bg-primary/90 transition-colors"
            >
              Start distributing
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="/distribution"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.02] text-white/80 hover:text-white hover:border-white/30 px-5 py-3 font-heading text-[11px] font-black uppercase tracking-[0.22em] transition-colors"
            >
              Explore platform
            </a>
          </motion.div>
        </div>

        {/* FLOATING WORKFLOW PANEL — emotional centerpiece */}
        <div className="mt-10 sm:mt-12 w-full relative">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[80%] h-48 bg-primary/[0.08] rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute -inset-x-10 -top-24 bottom-0 bg-gradient-to-b from-transparent via-background/0 to-background/40 pointer-events-none" />
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
