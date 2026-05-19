import { motion } from "framer-motion";
import { Radio, Megaphone, Headphones, BarChart3, Disc3, ArrowUpRight } from "lucide-react";

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
  span: string; // tailwind col/row span on lg
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
    span: "lg:col-span-2",
  },
  {
    id: "studio",
    tag: "03 · Studio",
    title: "Recording & mastering studio",
    description:
      "In-house studio sessions, professional mixing and mastering engineered for streaming-ready loudness and clarity.",
    keywords: ["Recording", "Mixing", "Mastering"],
    href: "/demos",
    Icon: Headphones,
    span: "lg:col-span-1",
  },
  {
    id: "label",
    tag: "04 · Label Services",
    title: "A&R and label infrastructure",
    description:
      "Royalty splits, multi-artist catalog management, demo intake and A&R tools — the operating system behind your label.",
    keywords: ["Royalty splits", "Catalog", "A&R"],
    href: "/distribution",
    Icon: Disc3,
    span: "lg:col-span-1",
  },
  {
    id: "analytics",
    tag: "05 · Analytics",
    title: "Real-time release analytics",
    description:
      "Streams, saves, revenue and audience insights across every DSP, unified in one cinematic dashboard.",
    keywords: ["Streams", "Revenue", "Audience"],
    href: "/distribution",
    Icon: BarChart3,
    span: "lg:col-span-2",
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
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 sm:p-7 flex flex-col justify-between transition-all duration-500 hover:border-primary/50 hover:-translate-y-1 ${service.span}`}
    >
      {/* Decorative scan line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        aria-hidden="true"
      />
      {/* Diagonal accent */}
      <div
        className={`pointer-events-none absolute -right-20 -top-20 w-56 h-56 rounded-full blur-3xl transition-opacity duration-700 ${
          service.accent ? "bg-primary/20 opacity-80" : "bg-primary/10 opacity-40 group-hover:opacity-80"
        }`}
        aria-hidden="true"
      />

      <header className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl border border-primary/30 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
            <Icon className="w-5 h-5" strokeWidth={1.6} />
          </div>
          <span className="font-heading text-[10px] tracking-[0.25em] uppercase text-primary/80 font-bold">
            {service.tag}
          </span>
        </div>
        <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
      </header>

      <div className="relative mt-8">
        <h3 className="font-heading text-xl sm:text-2xl lg:text-[1.65rem] font-black uppercase tracking-tight text-foreground leading-[1.05]">
          {service.title}
        </h3>
        <p className="mt-3 font-body text-sm text-white/60 leading-relaxed max-w-xl">
          {service.description}
        </p>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {service.keywords.map((k) => (
            <li
              key={k}
              className="font-heading text-[9px] tracking-[0.18em] uppercase text-white/70 border border-white/15 rounded-full px-2.5 py-1 bg-white/[0.03]"
            >
              {k}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom hair line accent that grows on hover */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-[width] duration-700 ease-out"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[minmax(220px,auto)] gap-4 sm:gap-5">
          {SERVICES.map((s, i) => (
            <Card key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;