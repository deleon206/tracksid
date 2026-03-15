import { motion } from "framer-motion";

const capabilities = [
  {
    key: "D",
    title: "Music Distribution",
    description: "Deliver your releases to all major streaming platforms and digital stores worldwide with reliable, fast distribution infrastructure.",
  },
  {
    key: "L",
    title: "Licensing",
    description: "Access sync licensing opportunities and manage rights clearance for film, TV, advertising, and content placements.",
  },
  {
    key: "C",
    title: "Content ID",
    description: "Protect and monetize your catalog across YouTube and other platforms with automated Content ID management.",
  },
  {
    key: "P",
    title: "Playlist Pitching",
    description: "Get curated playlist pitching support to increase your streaming presence on Spotify, Apple Music, and more.",
  },
  {
    key: "E",
    title: "Editorial & Promo",
    description: "Receive editorial features, promo campaign support, and visibility across targeted music media channels.",
  },
  {
    key: "M",
    title: "Press & Media",
    description: "Access press coverage opportunities, media outreach, and PR support to amplify your releases and brand.",
  },
  {
    key: "B",
    title: "Booking Support",
    description: "Strategic booking support and industry connections to help artists and labels access live performance opportunities.",
  },
  {
    key: "T",
    title: "Artist Tools",
    description: "Pre-save links, promo landing pages, release metadata management, royalty splits, and campaign analytics built into the platform.",
  },
];

const CapabilitiesSection = () => (
  <section id="services" className="py-24 border-t border-border">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        <p className="font-heading text-[10px] tracking-[0.3em] text-muted-foreground mb-4">
          // CAPABILITIES
        </p>
        <h2 className="text-4xl md:text-6xl font-heading font-black text-foreground mb-6">
          MORE THAN
          <br />
          DISTRIBUTION
        </h2>
        <p className="font-body text-base text-muted-foreground max-w-lg leading-relaxed">
          Built for artists, labels, and teams that need distribution as the starting point — not the limit.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
        {capabilities.map((cap, i) => (
          <motion.div
            key={cap.key}
            className="bg-background p-8 flex flex-col justify-between min-h-[260px] group hover:bg-secondary transition-colors duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <div>
              <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center mb-6">
                <span className="font-heading text-xs font-bold text-primary">{cap.key}</span>
              </div>
              <h3 className="font-heading text-sm font-bold tracking-wider text-foreground mb-3 uppercase">
                {cap.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {cap.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CapabilitiesSection;
