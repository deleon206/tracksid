import { motion } from "framer-motion";

const CircleGraphic = () => (
  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="opacity-60">
    <circle cx="80" cy="100" r="60" stroke="hsl(152, 100%, 50%)" strokeWidth="1" />
    <circle cx="120" cy="100" r="60" stroke="hsl(152, 100%, 50%)" strokeWidth="1" />
    <circle cx="100" cy="80" r="60" stroke="hsl(152, 100%, 50%)" strokeWidth="1" />
    <circle cx="100" cy="120" r="60" stroke="hsl(152, 100%, 50%)" strokeWidth="1" />
  </svg>
);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background grid lines */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
        backgroundSize: "80px 80px"
      }} />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Main headline */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-heading text-xs tracking-[0.3em] text-muted-foreground mb-6">
              // READ YOUR &gt;
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black leading-[0.9] text-foreground mb-12">
              BREAK FREE
              <br />
              FROM BROKEN
              <br />
              MANUFACTURING
              <br />
              SOFTWARE
            </h1>
          </motion.div>

          {/* Circle graphic + tagline */}
          <motion.div
            className="lg:col-span-4 flex flex-col items-end gap-4"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="font-heading text-[10px] tracking-[0.2em] text-muted-foreground text-right">
              // YOU SEE A NODE. WE SEE A NEXUS.
            </p>
            <CircleGraphic />
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="mt-8 lg:mt-0 flex flex-col lg:flex-row items-stretch border-t border-border"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="bg-primary text-primary-foreground p-6 lg:p-8 lg:w-1/2 flex items-center gap-6">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-8 h-8 border-2 border-primary-foreground rounded-full flex items-center justify-center">
                <span className="font-heading text-xs font-bold">ES</span>
              </div>
            </div>
            <p className="font-heading text-sm font-bold tracking-wider leading-tight">
              MANUFACTURING SOFTWARE TO PLAN,
              <br />
              PRODUCE, AND FULFILL YOUR ORDERS
            </p>
          </div>

          <div className="p-6 lg:p-8 lg:w-1/2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l border-border">
            <p className="font-body text-sm text-muted-foreground max-w-xs leading-relaxed">
              Elevated Signals is built for ambitious manufacturers who refuse to be held back.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading text-xs font-bold tracking-wider px-8 py-4 hover:brightness-110 transition-all duration-200 shrink-0"
            >
              BOOK A DEMO <span>→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
