import { motion } from "framer-motion";
import { Music, Headphones, Radio } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserTypeSolutions from "@/components/UserTypeSolutions";
import PlatformShowcase from "@/components/PlatformShowcase";
import SwitchBonusSection from "@/components/SwitchBonusSection";
import artistImg from "@/assets/distribution-hero-artist.jpg";

const platformLogos = [
  "Spotify", "Apple Music", "TikTok", "YouTube Music", "Amazon Music",
  "Deezer", "Tidal", "Beatport", "SoundCloud", "Pandora",
];

const Distribution = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ═══════════════════════════════════════════════════
         HERO SECTION
         ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        {/* Gold glow */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Copy */}
            <div className="max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-heading text-[10px] tracking-[0.3em] text-primary border border-primary/40 inline-block px-3 py-1 mb-8"
              >
                // MUSIC DISTRIBUTION
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-foreground leading-[0.95] mb-6"
              >
                GET YOUR MUSIC{" "}
                <span className="text-primary">EVERYWHERE</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-4"
              >
                TRACKS/ID is the easiest way to get your music on Spotify, Apple Music, TikTok, and 150+ platforms worldwide.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-10"
              >
                Release unlimited music, keep 100% of your royalties, and shine as an independent artist.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="#plans"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading text-[11px] font-bold tracking-[0.15em] px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
                >
                  GET STARTED <span>→</span>
                </a>
                <a
                  href="#how"
                  className="inline-flex items-center justify-center gap-2 border border-border text-foreground font-heading text-[11px] font-bold tracking-[0.15em] px-8 py-4 rounded-full hover:bg-secondary transition-colors"
                >
                  HOW IT WORKS
                </a>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="font-mono text-[10px] tracking-wider text-muted-foreground mt-6"
              >
                No credit card required · Free to start
              </motion.p>
            </div>

            {/* Right — Artist visual */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex justify-center lg:justify-end"
            >
              {/* Card frame */}
              <div className="relative w-[320px] md:w-[380px] rounded-3xl overflow-hidden border border-border/40 shadow-2xl shadow-primary/10">
                {/* Spotify-style badge */}
                <div className="absolute top-4 right-4 z-20 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Music className="w-5 h-5 text-primary-foreground" />
                </div>

                <img
                  src={artistImg}
                  alt="Independent artist distributing music worldwide through TRACKS/ID"
                  className="w-full aspect-[3/4] object-cover"
                />

                {/* Bottom overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/80 to-transparent p-6 pt-16">
                  <p className="font-heading text-xs font-bold tracking-[0.15em] text-primary mb-1">
                    YOUR ARTIST
                  </p>
                  <p className="font-heading text-2xl font-black text-foreground leading-tight">
                    YOUR MUSIC
                  </p>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -left-4 bottom-24 bg-secondary/90 backdrop-blur border border-border/40 rounded-xl px-4 py-3 flex items-center gap-3 shadow-lg"
              >
                <Headphones className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-heading text-[10px] font-bold tracking-wider text-foreground">150+</p>
                  <p className="font-mono text-[9px] text-muted-foreground">Digital Stores</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -right-2 top-20 bg-secondary/90 backdrop-blur border border-border/40 rounded-xl px-4 py-3 flex items-center gap-3 shadow-lg"
              >
                <Radio className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-heading text-[10px] font-bold tracking-wider text-foreground">100%</p>
                  <p className="font-mono text-[9px] text-muted-foreground">Your Royalties</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         PLATFORM TICKER
         ═══════════════════════════════════════════════════ */}
      <section className="border-t border-b border-border py-6 overflow-hidden">
        <div className="flex animate-[scroll_20s_linear_infinite] gap-12 whitespace-nowrap">
          {[...platformLogos, ...platformLogos].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-heading text-xs font-bold tracking-[0.2em] text-muted-foreground/40 uppercase shrink-0"
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      <UserTypeSolutions />
      <PlatformShowcase />
      <div className="w-full border-t border-border" />
      <SwitchBonusSection />
      <Footer />
    </div>
  );
};

export default Distribution;
