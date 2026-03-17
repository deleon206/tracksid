import { motion } from "framer-motion";
import { Globe, Headphones, Film, Wrench, Newspaper } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Global Distribution",
    kicker: "150+ STORES",
    description:
      "Distribute your music to over 150 digital stores worldwide — Spotify, Apple Music, Beatport, Amazon, Deezer, and more. Full catalog management with real-time analytics.",
    highlights: ["Spotify", "Apple Music", "Beatport", "Amazon", "150+ stores"],
  },
  {
    icon: Headphones,
    title: "Artist Bookings",
    kicker: "WORLDWIDE",
    description:
      "Book artists for events, festivals, and clubs around the world. Our booking agency connects talent with promoters across Europe, LATAM, Asia, and beyond.",
    highlights: ["Festivals", "Clubs", "Global tours", "Event management"],
  },
  {
    icon: Film,
    title: "Music Licensing",
    kicker: "SYNC & PLACEMENT",
    description:
      "License your music for films, TV shows, commercials, retail stores, and digital content. We handle sync deals, mechanical rights, and placement negotiations.",
    highlights: ["Film & TV sync", "Commercial use", "Retail placement", "Rights management"],
  },
  {
    icon: Wrench,
    title: "Artist Tools",
    kicker: "ALL-IN-ONE",
    description:
      "Everything you need in one platform: pre-save campaigns, marketing tools, playlist pitching, artwork generation, smart links, and release planning.",
    highlights: ["Pre-save", "Playlist pitching", "Artwork generator", "Smart links"],
  },
  {
    icon: Newspaper,
    title: "Press & PR",
    kicker: "MEDIA NETWORK",
    description:
      "Leverage our network of media partners including DJ Mag, We Rave You, MixMag, and more. Get featured editorial coverage, reviews, and premiere placements.",
    highlights: ["DJ Mag", "MixMag", "We Rave You", "Editorial premieres"],
  },
];

const ServiceCard = ({ service, index }: { service: (typeof services)[0]; index: number }) => {
  const Icon = service.icon;
  return (
    <motion.article
      className="group relative bg-secondary/30 border border-border/40 p-6 sm:p-8 flex flex-col gap-4 hover:border-primary/40 transition-colors duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 border border-primary/30 rounded-full flex items-center justify-center group-hover:border-primary/60 transition-colors duration-300">
          <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
        </div>
        <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">0{index + 1}</span>
      </div>
      <span className="font-heading text-[10px] tracking-[0.3em] text-primary font-bold">// {service.kicker}</span>
      <h3 className="font-heading text-xl sm:text-2xl font-black text-foreground leading-tight uppercase">{service.title}</h3>
      <p className="font-body text-sm text-muted-foreground leading-relaxed">{service.description}</p>
      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/30">
        {service.highlights.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-muted-foreground border border-border/60 rounded-full px-3 py-1 bg-secondary/60">
            <span className="w-1 h-1 rounded-full bg-primary" />
            {tag}
          </span>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.article>
  );
};

const CapabilitiesSection = () => (
  <section id="services" className="py-24 border-t border-border" aria-labelledby="what-we-do-heading">
    <div className="container">
      <motion.div
        className="mb-16 max-w-3xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="font-heading text-[10px] tracking-[0.3em] text-primary mb-6 border border-primary/40 inline-block px-3 py-1">
          // OUR SERVICES
        </p>
        <h2 id="what-we-do-heading" className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-foreground leading-[0.95]">
          WHAT WE DO
        </h2>
        <p className="font-body text-sm md:text-base text-muted-foreground mt-6 max-w-2xl leading-relaxed">
          From <strong className="text-foreground">music distribution</strong> across 150+ digital stores to{" "}
          <strong className="text-foreground">artist bookings</strong>,{" "}
          <strong className="text-foreground">sync licensing</strong>, and a full suite of{" "}
          <strong className="text-foreground">artist tools</strong> — we provide the complete infrastructure
          for independent artists and record labels to grow globally.
        </p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {services.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default CapabilitiesSection;
