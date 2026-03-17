import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useMagArticles } from "@/hooks/use-mag-articles";

const FinalCta = () => {
  const { articles, loading } = useMagArticles(4);

  if (loading || articles.length === 0) return null;

  return (
    <section className="py-24 border-t border-border">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground mb-4">
            // EDM — LATEST NEWS
          </p>
          <h2 className="text-4xl md:text-6xl font-heading font-black text-foreground leading-[0.9]">
            MAG
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={`/mag/${article.slug}`}
                className="group flex gap-5 p-6 bg-background hover:bg-card/80 transition-colors duration-300 h-full"
              >
                {/* Date column */}
                <div className="flex flex-col items-start shrink-0 w-28">
                  <p className="font-heading text-xl font-black text-foreground leading-none">
                    {article.created_at
                      ? new Date(article.created_at).toLocaleDateString("en-US", { day: "numeric", month: "short" }).toUpperCase()
                      : ""}
                  </p>
                </div>

                {/* Thumbnail */}
                <div className="relative overflow-hidden w-28 h-20 shrink-0">
                  {article.image_url && (
                    <img
                      src={article.image_url}
                      alt={article.title || "Article"}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      loading="lazy"
                    />
                  )}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center min-w-0">
                  <h3 className="font-heading text-sm md:text-base font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight mb-1 line-clamp-2">
                    {article.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/mag"
            className="inline-flex items-center gap-2 border border-border text-foreground font-heading text-xs font-bold tracking-wider px-8 py-4 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
          >
            VIEW ALL ARTICLES <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCta;
