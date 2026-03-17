import { motion } from "framer-motion";
import { useMagArticles } from "@/hooks/use-mag-articles";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const LatestMagSection = () => {
  const { articles, loading } = useMagArticles(4);

  if (loading) {
    return (
      <section className="py-24 border-t border-border">
        <div className="container max-w-4xl mx-auto">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-secondary/30 border-b border-border/40 animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (!articles.length) return null;

  return (
    <section className="py-24 border-t border-border" aria-labelledby="latest-mag-heading">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="latest-mag-heading"
            className="text-3xl md:text-4xl font-heading font-black text-foreground italic"
          >
            LATEST FROM THE MAG
          </h2>
          <Link
            to="/mag"
            className="group inline-flex items-center gap-2 font-heading text-[11px] font-bold uppercase tracking-[0.15em] border border-border text-muted-foreground px-5 py-2.5 hover:border-primary hover:text-primary transition-all duration-300 self-start sm:self-auto"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Article rows */}
        <div className="flex flex-col">
          {articles.map((article, i) => {
            const date = article.created_at
              ? new Date(article.created_at)
              : null;
            const day = date?.getDate();
            const month = date
              ?.toLocaleDateString("en-US", { month: "long" })
              .toUpperCase();

            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <Link
                  to={`/mag/${article.slug}`}
                  className="group grid grid-cols-[80px_1fr] sm:grid-cols-[120px_auto_1fr] gap-4 sm:gap-6 items-center py-5 border-b border-border/40 hover:border-primary/40 transition-colors duration-300 relative"
                >
                  {/* Date */}
                  <div className="flex flex-col">
                    <span className="font-heading text-xs sm:text-sm font-black text-primary leading-none">
                      {day} {month}
                    </span>
                  </div>

                  {/* Thumbnail */}
                  {article.image_url && (
                    <div className="hidden sm:block w-28 h-20 overflow-hidden shrink-0">
                      <img
                        src={article.image_url}
                        alt={article.title || ""}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Title + excerpt */}
                  <div className="min-w-0">
                    <h3 className="font-heading text-sm sm:text-base md:text-lg font-black text-foreground leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h3>
                    {article.content && (
                      <p className="hidden md:block font-body text-xs text-muted-foreground mt-1 line-clamp-1">
                        {article.content.replace(/<[^>]*>/g, "").slice(0, 120)}...
                      </p>
                    )}
                  </div>

                  {/* Hover accent line */}
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LatestMagSection;
