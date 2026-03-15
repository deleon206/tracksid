import { motion } from "framer-motion";

const FinalCta = () => (
  <section id="plans" className="py-24 border-t border-border">
    <div className="container">
      <motion.div
        className="bg-primary text-primary-foreground p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div>
          <h2 className="text-3xl md:text-5xl font-heading font-black leading-[0.9] mb-4">
            READY TO RELEASE
            <br />
            WITH MORE THAN
            <br />
            JUST DISTRIBUTION?
          </h2>
          <p className="font-body text-sm opacity-80 max-w-md leading-relaxed">
            Join artists and labels building their careers with real infrastructure — distribution, licensing, promo, tools, and industry support.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-heading text-xs font-bold tracking-wider px-8 py-4 hover:opacity-90 transition-all duration-200"
          >
            VIEW PLANS <span>→</span>
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 border-2 border-primary-foreground text-primary-foreground font-heading text-xs font-bold tracking-wider px-8 py-4 hover:bg-primary-foreground hover:text-primary transition-all duration-200"
          >
            TALK TO THE TEAM
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FinalCta;
