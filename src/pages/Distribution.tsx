import { useEffect } from "react";
import { motion } from "framer-motion";
import { Music, Headphones, Radio } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserTypeSolutions from "@/components/UserTypeSolutions";
import PlatformShowcase from "@/components/PlatformShowcase";
import ComparisonSection from "@/components/ComparisonSection";
import SwitchBonusSection from "@/components/SwitchBonusSection";
import artistImg from "@/assets/distribution-hero-artist.jpg";

const platformLogos = [
  "Spotify", "Apple Music", "TikTok", "YouTube Music", "Amazon Music",
  "Deezer", "Tidal", "Beatport", "SoundCloud", "Pandora",
];

const Distribution = () => {
  useEffect(() => {
    document.title = "Music Distribution — Get Your Music on Spotify & 150+ Stores | TRACKS/ID";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Hybrid Music Distribution Platform for Independent Labels | TRACKS/ID</title>
        <meta name="description" content="The leading hybrid music distribution platform combining record label services with distributor technology. 150+ stores, 100% royalties, Dolby Atmos, sync licensing. Free to start." />
        <link rel="canonical" href="https://tracksid.com/distribution" />
        <meta property="og:title" content="Music Distribution — Get Your Music Everywhere | TRACKS/ID" />
        <meta property="og:description" content="Distribute your music to Spotify, Apple Music, TikTok and 150+ stores. Keep 100% royalties. Free to start." />
        <meta property="og:url" content="https://tracksid.com/distribution" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Music Distribution — Get Your Music Everywhere | TRACKS/ID" />
        <meta name="twitter:description" content="Distribute your music to Spotify, Apple Music, TikTok and 150+ stores. Keep 100% royalties. Free to start." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "TRACKS/ID Music Distribution",
          "applicationCategory": "MusicApplication",
          "operatingSystem": "Web",
          "url": "https://tracksid.com/distribution",
          "description": "The leading hybrid music distribution platform combining record label services with digital distributor infrastructure. Distribute to 150+ stores, keep 100% royalties, free Dolby Atmos support, sync licensing for TV/film.",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "priceValidUntil": "2027-12-31",
            "description": "Free to start — commission-based, no subscriptions"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "10000",
            "bestRating": "5",
            "worstRating": "1"
          },
          "provider": {
            "@type": "Organization",
            "name": "TRACKS/ID",
            "url": "https://tracksid.com"
          }
        })}</script>
      </Helmet>

      <Navbar />

      {/* ═══════════════════════════════════════════════════
         HERO SECTION
         ═══════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[80vh] lg:min-h-screen flex items-center overflow-hidden pt-24 pb-16"
        aria-labelledby="distribution-hero-heading"
      >
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        {/* Gold glow */}
        <div className="absolute top-1/4 right-0 w-64 sm:w-[400px] lg:w-[500px] h-64 sm:h-[400px] lg:h-[500px] bg-primary/5 rounded-full blur-[100px] lg:blur-[150px] pointer-events-none" aria-hidden="true" />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Left — Copy */}
            <div className="max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-heading text-[10px] tracking-[0.3em] text-primary border border-primary/40 inline-block px-3 py-1 mb-6 sm:mb-8"
              >
                // MUSIC DISTRIBUTION
              </motion.p>

              <motion.h1
                id="distribution-hero-heading"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-foreground leading-[0.95] mb-5 sm:mb-6"
              >
                THE LEADING HYBRID{" "}
                <span className="text-primary">MUSIC DISTRIBUTION</span>{" "}
                PLATFORM FOR INDEPENDENT LABELS
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-body text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-3 sm:mb-4"
              >
                TRACKS/ID is the easiest way to get your music on Spotify, Apple Music, TikTok, and 150+ platforms worldwide.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="font-body text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-8 sm:mb-10"
              >
                Release unlimited music, keep 100% of your royalties, and shine as an independent artist.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <a
                  href="#plans"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading text-[11px] font-bold tracking-[0.15em] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full hover:opacity-90 transition-opacity"
                >
                  GET STARTED <span aria-hidden="true">→</span>
                </a>
                <a
                  href="#how"
                  className="inline-flex items-center justify-center gap-2 border border-border text-foreground font-heading text-[11px] font-bold tracking-[0.15em] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full hover:bg-secondary transition-colors"
                >
                  HOW IT WORKS
                </a>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="font-mono text-[11px] sm:text-xs tracking-wider text-foreground/70 mt-5 sm:mt-6 font-semibold"
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
              <div className="relative w-[260px] sm:w-[320px] md:w-[380px] rounded-3xl overflow-hidden border border-border/40 shadow-2xl shadow-primary/10">
                {/* Spotify-style badge */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center" aria-hidden="true">
                  <Music className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                </div>

                <img
                  src={artistImg}
                  alt="TRACKS/ID artist dashboard showing 100% royalty analytics and global music distribution to 150+ platforms"
                  className="w-full aspect-[3/4] object-cover"
                  loading="eager"
                  width={380}
                  height={507}
                />

                {/* Bottom overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/80 to-transparent p-4 sm:p-6 pt-12 sm:pt-16">
                  <p className="font-heading text-[10px] sm:text-xs font-bold tracking-[0.15em] text-primary mb-1">
                    YOUR ARTIST
                  </p>
                  <p className="font-heading text-xl sm:text-2xl font-black text-foreground leading-tight">
                    YOUR MUSIC
                  </p>
                </div>
              </div>

              {/* Floating badges — hidden on very small screens to avoid overflow */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="hidden sm:flex absolute -left-2 md:-left-4 bottom-20 md:bottom-24 bg-secondary/90 backdrop-blur border border-border/40 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 items-center gap-2.5 sm:gap-3 shadow-lg"
              >
                <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <div>
                  <p className="font-heading text-[10px] font-bold tracking-wider text-foreground">150+</p>
                  <p className="font-mono text-[9px] text-muted-foreground">Digital Stores</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="hidden sm:flex absolute -right-1 md:-right-2 top-16 md:top-20 bg-secondary/90 backdrop-blur border border-border/40 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 items-center gap-2.5 sm:gap-3 shadow-lg"
              >
                <Radio className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
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
      <section className="border-t border-b border-border py-5 sm:py-6 overflow-hidden" aria-label="Supported platforms">
        <div className="flex animate-ticker gap-8 sm:gap-12 whitespace-nowrap">
          {[...platformLogos, ...platformLogos].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-heading text-[10px] sm:text-xs font-bold tracking-[0.2em] text-muted-foreground/40 uppercase shrink-0"
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      <ComparisonSection />
      <UserTypeSolutions />
      <PlatformShowcase />
      <div className="w-full border-t border-border" aria-hidden="true" />
      <SwitchBonusSection />
      <Footer />
    </div>
  );
};

export default Distribution;
