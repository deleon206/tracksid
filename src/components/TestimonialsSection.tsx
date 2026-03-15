import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "The team helped us secure sync placements and scale our catalog distribution across 30+ stores. The licensing workflow alone saved us months of back-and-forth.",
    name: "Marco V.",
    role: "Label Manager, Independent Electronic Label",
  },
  {
    quote: "As an independent artist, I needed more than just uploads. TRACKS/ID gave me playlist pitching, promo support, and a team that actually understands the electronic music space.",
    name: "Kira Santos",
    role: "Independent Artist & Producer",
  },
  {
    quote: "We moved our entire catalog here. The Content ID management, royalty split tools, and dedicated support made our label operations significantly smoother.",
    name: "Daniel K.",
    role: "Operations Director, Multi-Genre Label",
  },
];

const TestimonialsSection = () => (
  <section className="py-24 border-t border-border">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        <p className="font-heading text-[10px] tracking-[0.3em] text-muted-foreground mb-4">
          // TRUSTED BY ARTISTS &amp; LABELS
        </p>
        <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground">
          WHAT THEY SAY
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-px bg-border">
        {testimonials.map((t, i) => (
          <motion.blockquote
            key={t.name}
            className="bg-background p-8 lg:p-10 flex flex-col justify-between min-h-[280px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <p className="font-body text-sm text-foreground leading-relaxed italic mb-6 border-l-2 border-primary pl-4">
              "{t.quote}"
            </p>
            <footer>
              <p className="font-heading text-xs font-bold tracking-wider text-foreground">{t.name}</p>
              <p className="font-body text-xs text-muted-foreground mt-1">{t.role}</p>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
