import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/data/articles";

const MagFeed = () => {
  const latestArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>The Mag — Events & Insights | TracksID</title>
        <meta name="description" content="Industry events, product insights, and the latest news from the TracksID team. Stay updated with our magazine." />
        <link rel="canonical" href="https://tracksid.lovable.app/mag" />
      </Helmet>

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

      {/* Hero — Latest Article */}
      <Link to={`/mag/${latestArticle.slug}`} className="group block relative z-10">
        <section className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
          {/* Background image */}
          <img
            src={latestArticle.image}
            alt={latestArticle.title}
            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            loading="eager"
            fetchPriority="high"
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

          {/* Content */}
          <motion.div
            className="relative z-10 container pb-16 md:pb-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-primary text-primary-foreground font-mono text-[10px] font-bold tracking-wider px-3 py-1 mb-4">
              {latestArticle.category}
            </span>
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground mb-3">
              // LATEST — {latestArticle.date} {latestArticle.year} — {latestArticle.location}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-foreground leading-[0.9] mb-4 max-w-3xl">
              {latestArticle.title}
            </h1>
            <p className="font-body text-sm md:text-base text-muted-foreground max-w-xl mb-6">
              {latestArticle.excerpt}
            </p>
            <span className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-primary group-hover:gap-4 transition-all duration-300">
              READ ARTICLE <span>→</span>
            </span>
          </motion.div>
        </section>
      </Link>

      <main className="relative z-10 pb-24">
        <div className="container">
          {/* Remaining articles */}
          <div className="pt-12">
            {remainingArticles.map((article, i) => (
              <ArticleCard key={article.slug} article={article} index={i} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MagFeed;
