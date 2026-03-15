import { motion } from "framer-motion";

const events = [
  {
    date: "9 JULY",
    title: "HEMP BEVERAGE EXPO",
    location: "ATLANTA, GEORGIA",
    description: "Join us at the leading hemp beverage industry event.",
  },
  {
    date: "19 SEPTEMBER",
    title: "FOOD & BEVERAGE MANUFACTURING SUMMIT",
    location: "TORONTO",
    description: "Connect with manufacturers pushing boundaries in food production.",
  },
  {
    date: "12 OCTOBER",
    title: "PACK EXPO",
    location: "LAS VEGAS",
    description: "The world's largest packaging and processing trade show.",
  },
  {
    date: "5 NOVEMBER",
    title: "CANNABIS CONFERENCE",
    location: "LAS VEGAS",
    description: "Industry leaders share insights on manufacturing innovation.",
  },
];

const EventsSection = () => {
  return (
    <section className="py-24 border-t border-border">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-heading text-[10px] tracking-[0.3em] text-muted-foreground mb-4">
            // UPCOMING EVENTS
          </p>
          <h2 className="text-4xl md:text-6xl font-heading font-black text-foreground mb-16">
            LET'S CHAT
            <br />
            IN PERSON!
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              className="bg-background p-8 lg:p-10 flex flex-col justify-between min-h-[280px] group hover:bg-secondary transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div>
                <div className="flex items-start justify-between mb-6">
                  <span className="font-heading text-3xl md:text-4xl font-black text-primary">
                    {event.date}
                  </span>
                  <span className="font-heading text-[10px] tracking-[0.2em] text-muted-foreground">
                    {event.location}
                  </span>
                </div>
                <h3 className="font-heading text-lg md:text-xl font-bold text-foreground mb-3">
                  {event.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
              </div>
              <div className="mt-6">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 font-heading text-xs font-bold tracking-wider text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  LEARN MORE <span>→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
