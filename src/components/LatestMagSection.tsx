import { motion } from "framer-motion";
import { useMagArticles } from "@/hooks/use-mag-articles";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const LatestMagSection = () => {
  const { articles, loading } = useMagArticles(4);

  if (loading) {
    return (
      <section className="py-24 border-t border-border">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-secondary/30 border border-border/40 aspect-[3/4] animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!articles.length) return null;

  const [hero, ...rest] = articles;

  return (
    <section className="py-24 border-t border-border" aria-labelledby="latest-mag-heading">
      <div className="container">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="font-heading text-[10px] tracking-[0.3em] text-primary mb-4 border border-primary/40 inline-block px-3 py-1">
              // LATEST FROM THE MAG
            </p>
            <h2 id="latest-mag-heading" className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-foreground leading-[0.95]">
              THE MAG
            </h2>
          </div>
          <Link
            to="/mag"
            className="group inline-flex items-center gap-2 font-heading text-[11px] font-bold uppercase tracking-[0.15em] border border-border text-muted-foreground px-5 py-2.5 hover:border-primary hover:text-primary transition-all duration-300 self-start sm:self-auto"
          >
            View All Articles
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Grid: hero left + 3 stacked right */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Hero article */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to={`/mag/${hero.slug}`} className="group block relative overflow-hidden border border-border/40 h-full">
              {hero.image_url && (
                <div className="relative aspect-[4/5] sm:aspect-auto sm:h-full overflow-hidden">
                  <img
                    src={hero.image_url}
                    alt={hero.title || ""}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="font-mono text-[10px] tracking-[0.2em] text-primary">
                  {hero.created_at
                    ? new Date(hero.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                    : ""}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-black text-foreground leading-tight mt-2 group-hover:text-primary transition-colors duration-300">
                  {hero.title}
                </h3>
                <div className="mt-4 w-8 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </Link>
          </motion.div>

          {/* Side articles */}
          <div className="flex flex-col gap-4">
            {rest.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <Link
                  to={`/mag/${article.slug}`}
                  className="group flex gap-4 sm:gap-6 border border-border/40 p-4 hover:border-primary/40 transition-colors duration-300 relative overflow-hidden"
                >
                  {article.image_url && (
                    <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 overflow-hidden">
                      <img
                        src={article.image_url}
                        alt={article.title || ""}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex flex-col justify-center min-w-0">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                      {article.created_at
                        ? new Date(article.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                        : ""}
                    </span>
                    <h3 className="font-heading text-sm sm:text-base font-black text-foreground leading-tight mt-1 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h3>
                  </div>
                  {/* Hover line */}
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestMagSection;
