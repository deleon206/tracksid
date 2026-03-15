import { motion } from "framer-motion";

const partners = [
  "Beatport",
  "DJ Mag",
  "We Rave You",
  "Mixmag",
  "Spinnin' Records",
  "Hexagon",
  "Protocol Recordings",
  "Smash The House",
];

const TrustBar = () => (
  <section className="border-t border-b border-border py-8 overflow-hidden" aria-label="Industry relationships">
    <div className="container">
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
        <p className="font-heading text-[10px] tracking-[0.3em] text-muted-foreground shrink-0 uppercase">
          // Industry Network
        </p>
        <motion.div
          className="flex items-center gap-8 overflow-x-auto scrollbar-hide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {partners.map((name) => (
            <span
              key={name}
              className="font-heading text-xs font-bold tracking-wider text-muted-foreground whitespace-nowrap hover:text-foreground transition-colors duration-200"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default TrustBar;
