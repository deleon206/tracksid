import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, Fragment } from "react";
import { Upload, Store, Rocket, CreditCard } from "lucide-react";

/* ─── Animated progress bar ─── */
const ProgressBar = ({ delay, duration }: { delay: number; duration: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="w-full h-1 bg-border/40 rounded-full overflow-hidden mt-4">
      <motion.div
        className="h-full bg-primary rounded-full"
        initial={{ width: "0%" }}
        animate={inView ? { width: "100%" } : {}}
        transition={{ delay, duration, ease: "easeInOut" }}
      />
    </div>
  );
};

/* ─── Typing legend labels ─── */
const TypingLegends = ({ legends, delay }: { legends: string[]; delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex flex-wrap gap-2 mt-4">
      {legends.map((text, i) => (
        <motion.span
          key={text}
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: delay + i * 0.25, duration: 0.4, ease: "easeOut" }}
          className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-muted-foreground border border-border/60 rounded-full px-3 py-1 bg-secondary/60"
        >
          <span className="w-1 h-1 rounded-full bg-primary" aria-hidden="true" />
          {text}
        </motion.span>
      ))}
    </div>
  );
};

/* ─── Countdown timer ─── */
const CountdownTimer = ({ delay }: { delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [hours, setHours] = useState(48);

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setHours((h) => {
          if (h <= 0) {
            clearInterval(interval);
            return 0;
          }
          return h - 1;
        });
      }, 40);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [inView, delay]);

  return (
    <div ref={ref} className="mt-4 flex items-baseline gap-2">
      <span className="font-heading text-2xl sm:text-3xl font-black text-primary tabular-nums">
        {hours}h
      </span>
      <span className="text-xs text-muted-foreground font-mono tracking-wider">
        estimated delivery
      </span>
    </div>
  );
};

const steps = [
  {
    icon: Upload,
    number: "01",
    title: "Upload Your Track for Free",
    description:
      "Upload your music in high-quality formats. No upfront fees, no hidden costs — just drag, drop, and go.",
    renderExtra: () => <ProgressBar delay={0.5} duration={1.8} />,
  },
  {
    icon: Store,
    number: "02",
    title: "Choose Your Stores & Campaign",
    description:
      "Select from 150+ digital stores worldwide and set up your marketing campaign in one place.",
    renderExtra: () => (
      <TypingLegends
        legends={["150+ digital stores", "Spotify", "Apple Music", "Playlist pitching", "Marketing campaign"]}
        delay={0.8}
      />
    ),
  },
  {
    icon: Rocket,
    number: "03",
    title: "Live in Under 48 Hours",
    description:
      "Your track goes live across all selected platforms in less than 48 hours. Fast, reliable, global.",
    renderExtra: () => <CountdownTimer delay={0.6} />,
  },
];

const UserTypeSolutions = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const stepDelays = [0, 1.6, 3.2];
  const connectorDelays = [1.0, 2.6];

  return (
    <section
      ref={sectionRef}
      id="how"
      className="py-16 sm:py-24 border-t border-border"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 sm:mb-16 text-center"
        >
          <p className="font-heading text-[10px] tracking-[0.3em] text-muted-foreground mb-4">
            // HOW IT WORKS
          </p>
          <h2
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-foreground"
          >
            OUR 3-STEP
            <br />
            <span className="text-primary">DISTRIBUTION INFRASTRUCTURE</span>
          </h2>
        </motion.div>

        {/* Steps — stacked on mobile, 5-col grid on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr_40px_1fr] lg:grid-cols-[1fr_60px_1fr_60px_1fr] gap-4 md:gap-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const delay = stepDelays[i];
            return (
              <Fragment key={step.number}>
                <motion.article
                  className="bg-secondary/30 border border-border/40 rounded-xl p-6 sm:p-8 lg:p-10 flex flex-col"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={sectionInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.7, delay, ease: "easeOut" }}
                >
                  {/* Icon */}
                  <motion.div
                    className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-primary/40 rounded-full flex items-center justify-center mb-5 sm:mb-6 relative"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={sectionInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ delay: delay + 0.3, duration: 0.5, type: "spring" }}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" strokeWidth={1.5} />
                    <span className="absolute -top-2 -right-2 font-mono text-[10px] text-primary bg-background border border-primary/30 rounded-full w-6 h-6 flex items-center justify-center">
                      {step.number}
                    </span>
                  </motion.div>

                  {/* Content */}
                  <motion.h3
                    className="font-heading text-lg sm:text-xl md:text-2xl font-black text-foreground mb-2 sm:mb-3 leading-tight uppercase"
                    initial={{ opacity: 0, x: -10 }}
                    animate={sectionInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: delay + 0.5, duration: 0.4 }}
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p
                    className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={sectionInView ? { opacity: 1 } : {}}
                    transition={{ delay: delay + 0.7, duration: 0.4 }}
                  >
                    {step.description}
                  </motion.p>

                  {/* Animated Extra */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={sectionInView ? { opacity: 1 } : {}}
                    transition={{ delay: delay + 0.9, duration: 0.4 }}
                  >
                    {step.renderExtra()}
                  </motion.div>
                </motion.article>

                {/* Connector line between steps (hidden on mobile) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:flex items-center px-1">
                    <div className="w-full h-[2px] bg-border/30 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: "0%" }}
                        animate={sectionInView ? { width: "100%" } : {}}
                        transition={{ delay: connectorDelays[i], duration: 1.2, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>

        {/* No Credit Card Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 4.2, duration: 0.6 }}
          className="mt-8 sm:mt-10 flex justify-center"
        >
          <div className="flex items-start sm:items-center gap-3 border border-border/60 rounded-full px-4 sm:px-6 py-3 bg-secondary/30 max-w-2xl">
            <CreditCard className="w-4 h-4 text-primary shrink-0 mt-0.5 sm:mt-0" />
            <p className="font-body text-xs sm:text-sm text-muted-foreground">
              <strong className="text-foreground">No credit card required.</strong>{" "}
              Try our service for free — start distributing music with zero risk.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UserTypeSolutions;
