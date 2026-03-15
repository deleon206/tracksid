import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/data/articles";

const MagFeed = () => {
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

      <main className="relative z-10 pt-28 pb-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground mb-4">
              // THE MAG — EVENTS & INSIGHTS
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-foreground leading-[0.9] mb-6">
              LET'S CHAT
              <br />
              IN PERSON!
            </h1>
            <p className="font-body text-base text-muted-foreground max-w-lg mb-16">
              Industry events, product insights, and manufacturing intelligence from the Elevated Signals team.
            </p>
          </motion.div>

          {/* Article list */}
          <div>
            {articles.map((article, i) => (
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
