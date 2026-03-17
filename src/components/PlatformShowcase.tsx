import { motion } from "framer-motion";

const PlatformShowcase = () => (
  <section className="py-24 border-t border-border bg-background">
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left - Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-heading text-[10px] tracking-[0.3em] text-primary mb-6 border border-primary/40 inline-block px-3 py-1">
            // YOUR DISTRIBUTION HUB
          </p>

          <div className="relative mt-4">
            <div className="absolute -left-2 top-0 bottom-0 w-[1px] bg-border" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-black leading-[0.9] text-foreground pl-6">
              WE'RE NOT
              <br />
              ANOTHER
              <br />
              DISTRIBUTOR.
              <br />
              <span className="text-primary">WE'RE THE</span>
              <br />
              <span className="text-primary">ALTERNATIVE.</span>
            </h2>
          </div>

          <motion.p
            className="font-body text-sm md:text-base text-muted-foreground max-w-lg leading-relaxed mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Traditional systems are slow, expensive, and closed by design. They lock you in, confuse your team, and bury you in spreadsheets. We believe technology should free your operations — not exploit them. From your dashboard you can manage releases, real-time analytics, royalty splits, playlist pitching, and much more.
          </motion.p>
        </motion.div>

        {/* Right - Dashboard mockup */}
        <motion.div
          className="flex items-center justify-center lg:justify-end"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full max-w-[480px]">
            {/* Dashboard wireframe */}
            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-2xl">
              {/* Top bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-accent/60" />
                <div className="w-3 h-3 rounded-full bg-primary/60" />
                <div className="ml-4 h-2 w-32 bg-muted rounded" />
              </div>

              <div className="flex">
                {/* Sidebar */}
                <div className="w-12 border-r border-border bg-muted/20 py-4 flex flex-col items-center gap-4">
                  <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-sm bg-primary/60" />
                  </div>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 rounded-full bg-muted" />
                  ))}
                </div>

                {/* Main content */}
                <div className="flex-1 p-4 space-y-4">
                  {/* Header row */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="h-2.5 w-28 bg-muted rounded" />
                      <div className="h-2 w-20 bg-muted/60 rounded" />
                    </div>
                    <div className="h-6 w-16 bg-primary/20 rounded border border-primary/30" />
                  </div>

                  {/* Progress bar */}
                  <div className="h-3 w-full bg-muted/40 rounded overflow-hidden">
                    <div className="h-full w-3/5 bg-primary rounded" />
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2">
                    {["Streams", "Revenue", "Saves"].map((label) => (
                      <div key={label} className="bg-muted/20 border border-border rounded p-2">
                        <div className="h-1.5 w-10 bg-muted/60 rounded mb-1.5" />
                        <div className="h-2.5 w-14 bg-foreground/20 rounded" />
                      </div>
                    ))}
                  </div>

                  {/* Table rows */}
                  <div className="space-y-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center gap-3 py-1.5 border-b border-border/50">
                        <div className="w-7 h-7 rounded bg-muted/40" />
                        <div className="flex-1 space-y-1">
                          <div className="h-2 w-24 bg-muted rounded" />
                          <div className="h-1.5 w-16 bg-muted/50 rounded" />
                        </div>
                        <div className="h-5 w-12 bg-primary/10 border border-primary/20 rounded text-[8px] flex items-center justify-center text-primary font-heading">
                          LIVE
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative corner marks */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-primary/40" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-primary/40" />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default PlatformShowcase;
