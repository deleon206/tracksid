import { motion } from "framer-motion";
import { Radio, Megaphone, Headphones, BarChart3, Disc3, ArrowUpRight } from "lucide-react";
import distributionImg from "@/assets/services/distribution.jpg";
import marketingImg from "@/assets/services/marketing.jpg";
import studioImg from "@/assets/services/studio.jpg";
import labelImg from "@/assets/services/label.jpg";
import analyticsImg from "@/assets/services/analytics.jpg";

/* ────────────────────────────────────────────────────────────
   SERVICES SECTION — Bento-style services for artists & labels
   SEO: distribution, marketing, recording studio, analytics
   ──────────────────────────────────────────────────────────── */

type Service = {
  id: string;
  title: string;
  tag: string;
  description: string;
  keywords: string[];
  href: string;
  Icon: typeof Radio;
  image: string;
  span: string;
  accent?: boolean;
};

const SERVICES: Service[] = [
  {
    id: "distribution",
    tag: "01 · Distribution",
    title: "Global music distribution",
    description:
      "Deliver your releases to Spotify, Apple Music, Beatport, YouTube Music, SoundCloud and 180+ digital stores worldwide. Keep 100% of your royalties with priority delivery in 24 hours.",
    keywords: ["Spotify", "Apple Music", "180+ stores", "100% royalties"],
    href: "/distribution",
    Icon: Radio,
    image: distributionImg,
    span: "lg:col-span-2 lg:row-span-2",
    accent: true,
  },
  {
    id: "marketing",
    tag: "02 · Marketing",
    title: "Playlist & editorial pitching",
    description:
      "Pre-save links, playlist pitching, Spotify Editorial submissions and radio promo built into your release workflow.",
    keywords: ["Pre-save", "Playlist pitch", "Spotify Editorial"],
    href: "/distribution",
    Icon: Megaphone,
    image: marketingImg,
    span: "lg:col-span-1 lg:row-span-2",
  },
  {
    id: "studio",
    tag: "03 · Studio",
    title: "Recording & mastering",
    description:
      "In-house studio sessions, professional mixing and mastering engineered for streaming-ready loudness and clarity.",
    keywords: ["Recording", "Mixing", "Mastering"],
    href: "/demos",
    Icon: Headphones,
    image: studioImg,
    span: "lg:col-span-1",
  },
  {
    id: "label",
    tag: "04 · Label Services",
    title: "Label infrastructure",
    description:
      "Royalty splits, multi-artist catalog management, demo intake and A&R tools — the operating system behind your label.",
    keywords: ["Royalty splits", "Catalog", "A&R"],
    href: "/distribution",
    Icon: Disc3,
    image: labelImg,
    span: "lg:col-span-1",
  },
  {
    id: "analytics",
    tag: "05 · Analytics",
    title: "Real-time analytics",
    description:
      "Streams, saves, revenue and audience insights across every DSP, unified in one cinematic dashboard.",
    keywords: ["Streams", "Revenue", "Audience"],
    href: "/distribution",
    Icon: BarChart3,
    image: analyticsImg,
    span: "lg:col-span-1",
  },
];

const Card = ({ service, index }: { service: Service; index: number }) => {
  const { Icon } = service;
  return (
    <motion.a
      href={service.href}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-black flex flex-col justify-between transition-all duration-500 hover:border-primary/50 hover:-translate-y-1 min-h-[260px] ${service.span}`}
    >
      {/* Background image */}
      <img
        src={service.image}
        alt=""
        loading="lazy"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-[1.04] transition-all duration-[1200ms] ease-out"
      />

      {/* Gradient overlays — bottom-up readability + gold tint */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.18),transparent_60%)] mix-blend-screen opacity-80"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_70%)]"
        aria-hidden="true"
      />
      {/* Top scan line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        aria-hidden="true"
      />

      {/* Header */}
      <header className="relative p-5 sm:p-6 flex items-start justify-between gap-4 z-10">
        <span className="font-heading text-[10px] tracking-[0.28em] uppercase text-primary font-bold">
          {service.tag}
        </span>
        <div className="flex items-center justify-center w-9 h-9 rounded-full border border-primary/40 bg-black/40 backdrop-blur-sm text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </header>

      {/* Footer content */}
      <div className="relative p-5 sm:p-6 z-10">
        <div className="flex items-center gap-2.5 mb-3">
          <Icon className="w-4 h-4 text-primary" strokeWidth={1.8} />
          <span className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
        </div>
        <h3 className={`font-heading font-black uppercase tracking-tight text-foreground leading-[1.05] ${service.accent ? "text-2xl sm:text-3xl lg:text-4xl" : "text-lg sm:text-xl lg:text-2xl"}`}>
          {service.title}
        </h3>
        <p className={`mt-2.5 font-body text-white/70 leading-relaxed ${service.accent ? "text-sm sm:text-[15px] max-w-md" : "text-xs sm:text-[13px] line-clamp-3"}`}>
          {service.description}
        </p>
        {service.accent && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {service.keywords.map((k) => (
              <li
                key={k}
                className="font-heading text-[9px] tracking-[0.18em] uppercase text-white/80 border border-white/20 rounded-full px-2.5 py-1 bg-black/40 backdrop-blur-sm"
              >
                {k}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bottom hairline grow */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-[width] duration-700 ease-out z-10"
        aria-hidden="true"
      />
    </motion.a>
  );
};

const ServicesSection = () => {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative border-t border-border bg-background py-20 sm:py-28 overflow-hidden"
    >
      {/* Ambient backdrop */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/3 w-[40rem] h-[40rem] bg-primary/[0.06] rounded-full blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(hsl(var(--primary)/0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative container px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-heading text-[10px] tracking-[0.3em] text-primary mb-5 border border-primary/40 inline-block px-3 py-1 uppercase"
          >
            // SERVICES FOR ARTISTS & LABELS
          </motion.p>
          <motion.h2
            id="services-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading font-black uppercase tracking-[-0.02em] leading-[0.95] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground"
          >
            One hybrid platform.
            <br />
            <span className="text-primary">Every release service.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 font-body text-base text-white/65 leading-relaxed max-w-2xl"
          >
            From music distribution and marketing to studio sessions, label
            infrastructure and real-time analytics — TRACKS/ID is the operating
            system independent artists and record labels use to release, promote
            and grow their catalog.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[230px] gap-4 sm:gap-5">
          {SERVICES.map((s, i) => (
            <Card key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;