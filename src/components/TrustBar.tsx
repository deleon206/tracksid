import { useEffect, useRef } from "react";

import youtubeImg from "@/assets/partners/youtube.png";
import appleMastersImg from "@/assets/partners/apple-masters.png";
import appleMusicImg from "@/assets/partners/apple-music.png";
import beatportImg from "@/assets/partners/beatport.png";
import djmagImg from "@/assets/partners/djmag.png";
import dolbyImg from "@/assets/partners/dolby.png";
import nextGenImg from "@/assets/partners/next-gen-catalunya.png";
import spotifyImg from "@/assets/partners/spotify.png";

const partners = [
  { src: spotifyImg, alt: "Spotify — Music streaming platform" },
  { src: appleMusicImg, alt: "Apple Music — Digital music service" },
  { src: beatportImg, alt: "Beatport — Electronic music store" },
  { src: djmagImg, alt: "DJ Mag — Dance music magazine" },
  { src: youtubeImg, alt: "YouTube — Video and music platform" },
  { src: dolbyImg, alt: "Dolby — Audio technology" },
  { src: appleMastersImg, alt: "Apple Digital Masters — High-quality audio mastering" },
  { src: nextGenImg, alt: "Next Generation Catalunya — Innovation programme" },
];

const TrustBar = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const offset = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const speed = 0.5; // px per frame
    const tick = () => {
      offset.current += speed;
      // Each set is half the scroll width (we duplicate items)
      const halfWidth = el.scrollWidth / 2;
      if (offset.current >= halfWidth) offset.current = 0;
      el.style.transform = `translateX(-${offset.current}px)`;
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);

    const pause = () => cancelAnimationFrame(animRef.current);
    const resume = () => { animRef.current = requestAnimationFrame(tick); };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animRef.current);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, []);

  const allItems = [...partners, ...partners]; // duplicate for seamless loop

  return (
    <section
      className="border-t border-b border-border py-6 overflow-hidden relative"
      aria-label="Industry partners and platforms"
    >
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

      <div className="flex items-center gap-8 px-4">
        <p className="font-heading text-[10px] tracking-[0.3em] text-muted-foreground shrink-0 uppercase z-20">
          // Industry Network
        </p>

        <div className="overflow-hidden flex-1">
          <div ref={scrollRef} className="flex items-center gap-12 will-change-transform">
            {allItems.map((p, i) => (
              <img
                key={`${p.alt}-${i}`}
                src={p.src}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                className="h-5 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
