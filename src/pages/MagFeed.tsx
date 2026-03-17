import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useMagArticles } from "@/hooks/use-mag-articles";

const MagFeed = () => {
  const { articles, loading } = useMagArticles();

  const latestArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Dot grid background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {loading && (
        <div className="flex items-center justify-center min-h-[60vh] relative z-10">
          <div className="font-mono text-xs text-muted-foreground tracking-widest animate-pulse">
            // LOADING ARTICLES...
          </div>
        </div>
      )}

      {!loading && articles.length === 0 && (
        <div className="flex items-center justify-center min-h-[60vh] relative z-10">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-black text-foreground mb-4">NO ARTICLES YET</h1>
            <p className="font-mono text-xs text-muted-foreground">// CHECK BACK SOON</p>
          </div>
        </div>
      )}

      {/* Hero — Latest Article */}
      {latestArticle && (
        <Link to={`/mag/${latestArticle.slug}`} className="group block relative z-10">
          <section className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
            {latestArticle.image_url && (
              <img
                src={latestArticle.image_url}
                alt={latestArticle.title || "Article cover"}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                loading="eager"
                fetchPriority="high"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

            <motion.div
              className="relative z-10 container pb-16 md:pb-24"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground mb-3">
                // LATEST — {latestArticle.created_at
                  ? new Date(latestArticle.created_at).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }).toUpperCase()
                  : ""}
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-foreground leading-[0.9] mb-4 max-w-3xl">
                {latestArticle.title}
              </h1>
              <span className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-primary group-hover:gap-4 transition-all duration-300">
                READ ARTICLE <span>→</span>
              </span>
            </motion.div>
          </section>
        </Link>
      )}

      {/* Remaining articles */}
      {remainingArticles.length > 0 && (
        <main className="relative z-10 pb-24">
          <div className="container">
            <div className="pt-12">
              {remainingArticles.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link
                    to={`/mag/${article.slug}`}
                    className="group grid grid-cols-1 md:grid-cols-[200px_280px_1fr] gap-4 md:gap-8 py-8 border-b border-border hover:border-primary/30 transition-colors duration-300"
                  >
                    {/* Date */}
                    <div className="flex flex-col items-start">
                      <p className="font-heading text-2xl md:text-3xl font-black text-foreground leading-none">
                        {article.created_at
                          ? new Date(article.created_at).toLocaleDateString("en-US", { day: "numeric", month: "short" }).toUpperCase()
                          : ""}
                      </p>
                      <p className="font-mono text-[10px] text-muted-foreground tracking-widest mt-1">
                        {article.created_at ? new Date(article.created_at).getFullYear() : ""}
                      </p>
                    </div>

                    {/* Thumbnail */}
                    <div className="relative overflow-hidden aspect-video md:aspect-[16/10]">
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
                    <div className="flex flex-col justify-center">
                      <h2 className="font-heading text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-2 leading-tight">
                        {article.title}
                      </h2>
                      <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-wider text-primary mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        READ ARTICLE <span>→</span>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
};

export default MagFeed;
