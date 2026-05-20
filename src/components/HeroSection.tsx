import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Upload, Music, Check, ArrowRight, Sparkles, X, Radio, Zap, Link2 } from "lucide-react";

const HERO_VIDEO_SRC = "https://veulvgnxunfnkjwzdxxu.supabase.co/storage/v1/object/public/magazine-media/other/download.mp4";

const HeroVideoBg = () => {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      src={HERO_VIDEO_SRC}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
};

/* ─── Stores ─── */
const STORES = [
  { id: "spotify", name: "Spotify", color: "#1DB954" },
  { id: "beatport", name: "Beatport", color: "#A4FF00" },
  { id: "apple", name: "Apple Music", color: "#FA243C" },
  { id: "youtube", name: "YouTube", color: "#FF0000" },
  { id: "soundcloud", name: "SoundCloud", color: "#FF5500" },
];

/* ─── Marketing options ─── */
type MarketingKey = "presave" | "playlist" | "radio" | "editorial";
const MARKETING: { id: MarketingKey; label: string; desc: string }[] = [
  { id: "presave", label: "Pre-save link", desc: "Auto-generate a smart pre-save URL" },
  { id: "playlist", label: "Pitch to playlists", desc: "Submit to curated editorial lists" },
  { id: "radio", label: "Pitch to radios", desc: "Push to global radio networks" },
  { id: "editorial", label: "Spotify Editorial", desc: "Submit for Spotify editorial review" },
];

type Phase = "idle" | "uploading" | "detected" | "stores" | "ready";

const WorkflowPanel = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string>("");
  const [trackTitle, setTrackTitle] = useState<string>("");
  const [artistName, setArtistName] = useState<string>("Your Name");
  const [releaseDate, setReleaseDate] = useState<string>("2026-05-22");
  const [selectedStores, setSelectedStores] = useState<string[]>(["spotify", "apple", "beatport"]);
  const [marketing, setMarketing] = useState<Record<MarketingKey, boolean>>({
    presave: true,
    playlist: true,
    radio: false,
    editorial: true,
  });
  const [keepRoyalties, setKeepRoyalties] = useState<boolean>(true);

  const openPicker = () => fileInputRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
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

  const toggleMarketing = (id: MarketingKey) =>
    setMarketing((m) => ({ ...m, [id]: !m[id] }));

  const hasFile = phase !== "idle";
  const isUploading = phase === "uploading";
  const showMeta = phase === "detected";
  const showMarketing = phase === "stores";
  const showDistribute = phase === "ready";

  const stepIndex =
    phase === "idle" || phase === "uploading"
      ? 0
      : phase === "detected"
        ? 1
        : phase === "stores"
          ? 2
          : 3;

  const STEPS = ["Upload", "Metadata", "Marketing", "Distribute"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[920px] mx-auto"
    >
      {/* Static glow halo — no animation to keep paints cheap */}
      <div className="absolute -inset-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[28rem] h-[28rem] bg-primary/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/[0.06] rounded-full blur-[100px]" />
      </div>

      <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[28px] bg-black/40 blur-xl" aria-hidden="true" />

      <div className="relative rounded-[28px] overflow-hidden bg-white text-zinc-900 border border-zinc-200 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] will-change-transform">
        <div className="absolute inset-0 rounded-[28px] pointer-events-none bg-gradient-to-b from-zinc-50 via-transparent to-transparent" />

        {/* Header */}
        <div className="relative flex items-center justify-between px-6 py-4 border-b border-zinc-200">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full border border-primary/50 flex items-center justify-center bg-primary/10 shrink-0">
              {hasFile && !isUploading ? (
                <Check className="w-3.5 h-3.5 text-zinc-900" strokeWidth={2.5} />
              ) : (
                <span className="font-heading text-[9px] font-black text-zinc-900">T/</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-heading text-[10px] font-bold tracking-[0.2em] text-zinc-900 uppercase truncate max-w-[260px] sm:max-w-[420px]">
                {hasFile ? (trackTitle || fileName) : "New release"}
              </p>
              <p className="font-body text-[9px] text-zinc-500 -mt-0.5 truncate max-w-[260px] sm:max-w-[420px]">
                {hasFile ? fileName : "tracks/id studio"}
              </p>
            </div>
            {hasFile && (
              <button
                onClick={reset}
                className="ml-1 p-1 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                aria-label="Remove file"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          <span className="font-heading text-[9px] tracking-[0.25em] text-zinc-500 font-bold uppercase">
            Step {String(stepIndex + 1).padStart(2, "0")} / 04
          </span>
        </div>

        {/* Body */}
        <div className="relative p-6 sm:p-7 space-y-5 min-h-[380px]">
          {/* Step rail */}
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => {
              const reached = stepIndex >= i;
              return (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div
                    className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                      reached ? "bg-primary" : "bg-zinc-200"
                    }`}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between -mt-3 px-0.5">
            {STEPS.map((s, i) => (
              <span
                key={s}
                className={`font-heading text-[8px] tracking-[0.18em] uppercase transition-colors ${
                  stepIndex === i ? "text-zinc-900 font-bold" : "text-zinc-400"
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
                  className="group relative w-full rounded-2xl border border-dashed border-zinc-300 hover:border-primary bg-zinc-50 hover:bg-primary/[0.05] transition-all px-7 py-10 text-left overflow-hidden"
                >
                  <div
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.10),transparent_70%)] opacity-60"
                    aria-hidden="true"
                  />
                  <div className="relative flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-700 group-hover:text-zinc-900 group-hover:border-primary transition-colors shadow-[0_0_40px_-10px_hsl(var(--primary)/0.4)]">
                      <Upload className="w-6 h-6" strokeWidth={1.6} />
                    </div>
                    <div className="flex-1">
                      <p className="font-heading text-base font-bold text-zinc-900 tracking-wide uppercase">
                        Drop your track to begin
                      </p>
                      <p className="font-body text-xs text-zinc-500 mt-1.5">
                        WAV · FLAC · MP3 · AIFF — up to 96 kHz / 24-bit
                      </p>
                    </div>
                    <div className="hidden sm:flex flex-col items-end gap-1 pr-1">
                      <span className="font-heading text-[9px] tracking-[0.25em] text-zinc-900 uppercase">Step 01</span>
                      <span className="font-body text-[10px] text-zinc-500">of 04</span>
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
                  className="rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-xl bg-primary/15 border border-primary/40 flex items-center justify-center shrink-0">
                      <Music className="w-5 h-5 text-zinc-900" />
                      <motion.div
                        className="absolute inset-0 rounded-xl border border-primary"
                        animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.08, 1] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading text-xs font-bold text-zinc-900 truncate tracking-wide">
                        {fileName}
                      </p>
                      <div className="mt-2 h-[3px] rounded-full bg-zinc-200 overflow-hidden">
                        <motion.div
                          className="h-full bg-zinc-900 rounded-full"
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                      <p className="font-body text-[10px] text-zinc-500 mt-1 tabular-nums">
                        {Math.round(progress)}% · analyzing waveform
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Metadata */}
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
                  <label className="font-heading text-[9px] tracking-[0.22em] text-zinc-500 uppercase flex items-center gap-1.5">
                    <Sparkles className="w-2.5 h-2.5 text-zinc-900" /> Track title
                  </label>
                  <input
                    type="text"
                    value={trackTitle}
                    onChange={(e) => setTrackTitle(e.target.value)}
                    placeholder="Untitled"
                    className="w-full rounded-xl bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white outline-none px-3.5 py-2.5 font-body text-xs text-zinc-900 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-heading text-[9px] tracking-[0.22em] text-zinc-500 uppercase flex items-center gap-1.5">
                    <Sparkles className="w-2.5 h-2.5 text-zinc-900" /> Artist
                  </label>
                  <input
                    type="text"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    placeholder="Artist name"
                    className="w-full rounded-xl bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white outline-none px-3.5 py-2.5 font-body text-xs text-zinc-900 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-heading text-[9px] tracking-[0.22em] text-zinc-500 uppercase flex items-center gap-1.5">
                    <Sparkles className="w-2.5 h-2.5 text-zinc-900" /> Release date
                  </label>
                  <input
                    type="date"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    className="w-full rounded-xl bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white outline-none px-3.5 py-2.5 font-body text-xs text-zinc-900 transition-colors"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Marketing */}
          <AnimatePresence initial={false}>
            {showMarketing && (
              <motion.div
                key="marketing"
                initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <label className="font-heading text-[9px] tracking-[0.22em] text-zinc-500 uppercase flex items-center gap-1.5">
                    <Sparkles className="w-2.5 h-2.5 text-zinc-900" /> Marketing boost
                  </label>
                  <span className="font-heading text-[9px] tracking-[0.15em] text-zinc-900 uppercase">
                    Optional
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {MARKETING.map((m, i) => {
                    const active = marketing[m.id];
                    const Icon = m.id === "presave" ? Link2 : m.id === "playlist" ? Sparkles : m.id === "radio" ? Radio : Music;
                    return (
                      <motion.button
                        key={m.id}
                        type="button"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.06 }}
                        onClick={() => toggleMarketing(m.id)}
                        className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border transition-all text-left ${
                          active
                            ? "border-zinc-900 bg-zinc-50"
                            : "border-zinc-200 bg-white hover:border-zinc-400"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${active ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-500"}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-heading text-[10px] tracking-[0.12em] uppercase text-zinc-900 font-bold truncate">{m.label}</p>
                            <p className="font-body text-[10px] text-zinc-500 truncate">{m.desc}</p>
                          </div>
                        </div>
                        <span
                          className={`relative inline-flex w-8 h-4 rounded-full transition-colors shrink-0 ${
                            active ? "bg-primary" : "bg-zinc-300"
                          }`}
                          aria-hidden
                        >
                          <span
                            className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${
                              active ? "translate-x-[1.05rem]" : "translate-x-0.5"
                            }`}
                          />
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Distribute */}
          <AnimatePresence initial={false}>
            {showDistribute && (
              <motion.div
                key="distribute"
                initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3 pt-1"
              >
                <div className="flex items-center justify-between">
                  <label className="font-heading text-[9px] tracking-[0.22em] text-zinc-500 uppercase flex items-center gap-1.5">
                    <Radio className="w-2.5 h-2.5 text-zinc-900" /> Distribute to
                  </label>
                  <span className="font-heading text-[9px] tracking-[0.15em] text-zinc-900 uppercase">
                    +180 stores
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {STORES.map((s, i) => {
                    const active = selectedStores.includes(s.id);
                    return (
                      <motion.button
                        key={s.id}
                        type="button"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12 + i * 0.05 }}
                        onClick={() => toggleStore(s.id)}
                        className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-heading tracking-wider uppercase transition-all ${
                          active
                            ? "border-zinc-900 bg-zinc-900 text-white"
                            : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-400 hover:text-zinc-900"
                        }`}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full transition-all"
                          style={{
                            backgroundColor: s.color,
                            opacity: active ? 1 : 0.4,
                            boxShadow: active ? `0 0 8px ${s.color}99` : "none",
                          }}
                        />
                        {s.name}
                      </motion.button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setKeepRoyalties((v) => !v)}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border transition-all text-left ${
                    keepRoyalties ? "border-zinc-900 bg-zinc-50" : "border-zinc-200 bg-white hover:border-zinc-400"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${keepRoyalties ? "bg-primary text-zinc-900" : "bg-zinc-100 text-zinc-500"}`}>
                      <Zap className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-heading text-[10px] tracking-[0.12em] uppercase text-zinc-900 font-bold truncate">Keep 100% royalties</p>
                      <p className="font-body text-[10px] text-zinc-500 truncate">Priority distribution within 24 hours</p>
                    </div>
                  </div>
                  <span
                    className={`relative inline-flex w-8 h-4 rounded-full transition-colors shrink-0 ${
                      keepRoyalties ? "bg-primary" : "bg-zinc-300"
                    }`}
                    aria-hidden
                  >
                    <span
                      className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${
                        keepRoyalties ? "translate-x-[1.05rem]" : "translate-x-0.5"
                      }`}
                    />
                  </span>
                </button>

                <motion.a
                  href="https://app.tracks.id/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="group relative w-full rounded-full bg-zinc-900 text-white py-3.5 font-heading text-[11px] font-black uppercase tracking-[0.22em] flex items-center justify-center gap-2 overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)] hover:bg-zinc-800 transition-colors"
                >
                  <span className="relative z-10">Create account to publish</span>
                  <ArrowRight className="w-3.5 h-3.5 relative z-10 transition-transform group-hover:translate-x-1" />
                </motion.a>
                <p className="text-center font-body text-[10px] text-zinc-500">
                  Free to start · <span className="text-zinc-900 font-bold">No credit card required.</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step navigation */}
          {(phase === "detected" || phase === "stores") && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex items-center justify-between pt-1"
            >
              <span className="font-body text-[10px] text-zinc-500">
                {phase === "detected"
                  ? "Review metadata and continue"
                  : "Select marketing add-ons and continue"}
              </span>
              <button
                type="button"
                onClick={goNext}
                className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white px-5 py-2 font-heading text-[10px] font-black uppercase tracking-[0.22em] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.4)] hover:bg-zinc-800 transition-colors"
              >
                Next
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PROMO STRIP — yellow urgency band with countdown
   ═══════════════════════════════════════════════════════════ */
const PromoStrip = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 59, s: 59 });

  useEffect(() => {
    // Reset target to ~24h from now, recalculated each mount/day-cycle
    const target = new Date();
    target.setHours(target.getHours() + 24);

    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      if (diff <= 0) {
        // soft reset — gives a "paulatino" rolling countdown feel
        target.setHours(target.getHours() + 24);
      }
      const total = Math.floor(diff / 1000);
      const h = Math.floor(total / 3600);
      const m = Math.floor((total % 3600) / 60);
      const s = total % 60;
      setTimeLeft({ h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="relative z-10 w-full bg-primary text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,hsl(var(--primary-foreground)/0.08),transparent)] animate-[shimmer_6s_linear_infinite]" />
      <div className="container px-4 sm:px-6 md:px-8 py-2.5 flex items-center justify-center gap-3 sm:gap-5 flex-wrap text-center">
        <span className="font-heading text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em]">
          🎁 Get 7-day free trial + 5 free credits
        </span>
        <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-primary-foreground/50" />
        <span className="font-heading text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] inline-flex items-center gap-2">
          Offer ends in
          <span className="inline-flex items-center gap-1 rounded-md bg-primary-foreground/10 border border-primary-foreground/20 px-2 py-0.5 font-mono tabular-nums text-[11px] sm:text-[12px] font-black">
            {pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}
          </span>
        </span>
        <a
          href="https://app.tracks.id/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="font-heading text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] underline underline-offset-4 hover:no-underline"
        >
          Claim now →
        </a>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   MUSIC ICON BLOCKS — colored cutout tiles (reference style)
   ═══════════════════════════════════════════════════════════ */
type IconShape = "circle" | "square" | "arrow";
type IconKey = "note" | "vinyl" | "headphones" | "play" | "mic";

const ICON_BLOCKS: {
  key: IconKey;
  shape: IconShape;
  color: string;
  label: string;
  svg: JSX.Element;
}[] = [
  {
    key: "note",
    shape: "circle",
    color: "hsl(var(--block-purple))",
    label: "Music distribution icon — upload your songs to streaming platforms",
    svg: (
      <svg viewBox="0 0 64 64" className="w-1/2 h-1/2" fill="currentColor" aria-hidden="true">
        <path d="M44 8 22 14v30.2A10 10 0 1 0 28 53.6V24l16-4.4V38a10 10 0 1 0 6 9.1V8z" />
      </svg>
    ),
  },
  {
    key: "vinyl",
    shape: "square",
    color: "hsl(var(--block-green))",
    label: "Vinyl and digital catalog distribution for record labels",
    svg: (
      <svg viewBox="0 0 64 64" className="w-[58%] h-[58%]" fill="currentColor" aria-hidden="true">
        <circle cx="32" cy="32" r="26" />
        <circle cx="32" cy="32" r="18" fill="hsl(var(--block-green))" />
        <circle cx="32" cy="32" r="12" />
        <circle cx="32" cy="32" r="4" fill="hsl(var(--block-green))" />
      </svg>
    ),
  },
  {
    key: "play",
    shape: "arrow",
    color: "hsl(var(--block-orange))",
    label: "Streaming and pre-save links for Spotify and Apple Music",
    svg: (
      <svg viewBox="0 0 64 64" className="w-1/2 h-1/2" fill="currentColor" aria-hidden="true">
        <path d="M16 10v44l38-22z" />
      </svg>
    ),
  },
  {
    key: "headphones",
    shape: "square",
    color: "hsl(var(--block-yellow))",
    label: "Studio mastering and audio engineering for independent artists",
    svg: (
      <svg viewBox="0 0 64 64" className="w-[58%] h-[58%]" fill="currentColor" aria-hidden="true">
        <path d="M32 8a22 22 0 0 0-22 22v18a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V36a4 4 0 0 0-4-4h-6v-2a18 18 0 0 1 36 0v2h-6a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V30A22 22 0 0 0 32 8z" />
      </svg>
    ),
  },
  {
    key: "mic",
    shape: "circle",
    color: "hsl(var(--block-blue))",
    label: "Recording studio microphone for music production",
    svg: (
      <svg viewBox="0 0 64 64" className="w-[55%] h-[55%]" fill="currentColor" aria-hidden="true">
        <rect x="24" y="6" width="16" height="30" rx="8" />
        <path d="M16 30a16 16 0 0 0 32 0h-4a12 12 0 0 1-24 0h-4z" />
        <rect x="30" y="46" width="4" height="10" />
        <rect x="22" y="54" width="20" height="4" rx="2" />
      </svg>
    ),
  },
];

const shapeClass = (shape: IconShape) => {
  switch (shape) {
    case "circle":
      return "rounded-full";
    case "arrow":
      return "rounded-[28%] [clip-path:polygon(0_0,75%_0,100%_50%,75%_100%,0_100%)]";
    default:
      return "rounded-[28%]";
  }
};

const IconBlocks = ({ onPick }: { onPick: () => void }) => (
  <div
    className="grid grid-cols-5 gap-3 sm:gap-5 md:gap-7 w-full max-w-6xl mx-auto px-2"
    role="list"
    aria-label="Music distribution services"
  >
    {ICON_BLOCKS.map((b, i) => (
      <motion.button
        key={b.key}
        type="button"
        role="listitem"
        aria-label={b.label}
        onClick={onPick}
        initial={{ opacity: 0, y: 40, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -6, scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        className={`relative aspect-square w-full flex items-center justify-center text-black overflow-hidden ${shapeClass(b.shape)} shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] transition-shadow hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]`}
        style={{ backgroundColor: b.color }}
      >
        {b.svg}
      </motion.button>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════
   HERO — reference-style massive centered headline
   ═══════════════════════════════════════════════════════════ */
const HeroSection = () => {
  const [showWorkflow, setShowWorkflow] = useState(false);
  const open = () => setShowWorkflow(true);
  const close = () => setShowWorkflow(false);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#0a0a0a]">
      {/* Ambient background — gold-tinted music visual + overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <HeroVideoBg />
        {/* Readability overlay so video doesn't compete with hero content */}
        <div className="absolute inset-0 bg-black/55" />
        {/* Vignette + readability overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_55%,#0a0a0a_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-transparent to-[#0a0a0a]" />
        {/* Gold glow halo */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[hsl(var(--lime)/0.10)] rounded-full blur-[160px]" />
        {/* Subtle grain */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col container px-4 sm:px-6 md:px-8 pt-28 sm:pt-32 pb-10">
        {/* Headline + sub + CTA (hidden once workflow opens) */}
        <AnimatePresence mode="wait">
        {!showWorkflow ? (
        <motion.div
          key="intro"
          initial={false}
          exit={{ opacity: 0, y: -30, filter: "blur(10px)", scale: 0.96 }}
          transition={{ duration: 0.55, ease: [0.7, 0, 0.84, 0] }}
          className="flex-1 flex flex-col items-center justify-center text-center max-w-6xl mx-auto w-full"
        >
          {/* Shadow/glow backdrop behind title and CTAs for contrast against video */}
          <div className="relative px-6 py-10 sm:px-12 sm:py-14 rounded-[32px] bg-black/35 backdrop-blur-md border border-white/5 shadow-[0_0_80px_-20px_rgba(0,0,0,0.8)]">
            <h1 className="font-heading font-black tracking-[-0.04em] leading-[0.9] text-white text-[clamp(2.8rem,9vw,8.5rem)] normal-case">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Your sound
              </motion.span>
              <motion.span
                className="block italic font-normal tracking-[-0.02em] text-[hsl(var(--lime))]"
                style={{ fontFamily: "'Instrument Serif', serif" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                runs the world
              </motion.span>
            </h1>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 font-body normal-case font-normal tracking-normal text-sm sm:text-base text-white/60 max-w-xl leading-relaxed mx-auto"
            >
              Music distribution platform for independent artists and record labels. Upload your music to Spotify, Apple Music, TikTok and 180+ stores in minutes.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                type="button"
                onClick={open}
                aria-label="Upload your music to all major streaming platforms"
                className="group relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-heading text-[12px] font-black uppercase tracking-[0.22em] text-[hsl(var(--lime-foreground))] bg-[hsl(var(--lime))] hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 transition-all duration-200 ring-1 ring-black/10"
              >
                Upload your music
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="/distribution"
                className="group inline-flex items-center gap-2 font-heading text-[11px] font-bold uppercase tracking-[0.22em] text-white/60 hover:text-white transition-colors"
              >
                <span className="relative">
                  Explore the platform
                  <span className="absolute left-0 -bottom-1 h-px w-full bg-[hsl(var(--lime))] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                </span>
              </a>
            </motion.div>
          </div>
        </motion.div>
        ) : (
          <motion.div
            key="workflow-title"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pt-4 pb-2 text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[hsl(var(--lime)/0.35)] bg-[hsl(var(--lime)/0.08)] font-heading text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--lime))]">
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--lime))] animate-pulse" />
              Live session
            </span>
            <h2 className="mt-4 font-heading font-black tracking-[-0.03em] leading-[0.95] text-white text-[clamp(1.6rem,4vw,2.6rem)] normal-case">
              Start the <span className="italic font-normal text-[hsl(var(--lime))]" style={{ fontFamily: "'Instrument Serif', serif" }}>distribution</span>
            </h2>
            <p className="mt-2 font-body text-xs sm:text-sm text-white/55 max-w-md mx-auto">
              Upload your track, set the metadata, and ship to 180+ stores in minutes.
            </p>
          </motion.div>
        )}
        </AnimatePresence>

        {/* Icon blocks row */}
        <div className="mt-8 sm:mt-12 lg:mt-8 relative min-h-[120px]">
          <AnimatePresence mode="wait">
            {!showWorkflow && (
              <motion.div
                key="blocks"
                exit={{ opacity: 0, scale: 0.6, y: 60, filter: "blur(8px)" }}
                transition={{ duration: 0.55, ease: [0.7, 0, 0.84, 0] }}
              >
                <IconBlocks onPick={open} />
              </motion.div>
            )}

            {showWorkflow && (
              <motion.div
                key="workflow"
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <button
                  type="button"
                  onClick={close}
                  className="absolute -top-4 right-2 sm:right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-md border border-white/10"
                  aria-label="Close upload workflow"
                >
                  <X className="w-4 h-4" />
                </button>
                <WorkflowPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom urgency strip */}
      <PromoStrip />

      <p className="sr-only">
        TRACKS/ID is the leading hybrid music distribution platform for independent record labels and artists.
        Upload your music, distribute to Spotify, Apple Music, TikTok, YouTube and over 180 stores, and grow your
        catalog with a real record label infrastructure.
      </p>
    </section>
  );
};

export default HeroSection;
