import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ReadingProgress";
import { useMagArticle } from "@/hooks/use-mag-articles";

const MagArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { article, loading } = useMagArticle(slug);

  // JSON-LD Schema
  const jsonLd = article
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        image: article.image_url,
        datePublished: article.created_at,
        author: { "@type": "Organization", name: "TRACKS/ID" },
      }
    : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <div className="font-mono text-xs text-muted-foreground tracking-widest animate-pulse">
          // LOADING...
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="font-heading text-4xl font-black text-foreground mb-4">ARTICLE NOT FOUND</h1>
          <Link to="/mag" className="font-mono text-sm text-primary hover:underline">
            ← BACK TO MAG
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = article.created_at
    ? new Date(article.created_at).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).toUpperCase()
    : "";

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />
      <Navbar />

      {/* Dot grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* JSON-LD */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <main className="relative z-10 pt-28 pb-24">
        <div className="container">
          {/* Breadcrumbs */}
          <motion.nav
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ol className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">HOME</Link></li>
              <li>/</li>
              <li><Link to="/mag" className="hover:text-primary transition-colors">MAG</Link></li>
              <li>/</li>
              <li className="text-foreground truncate max-w-[200px]">{article.title}</li>
            </ol>
          </motion.nav>

          {/* Hero header */}
          <motion.header
            className="mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-foreground leading-[0.9] mb-8">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 font-mono text-[10px] tracking-widest text-muted-foreground">
              <span>{formattedDate}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span>TRACKS/ID</span>
            </div>
          </motion.header>

          {/* Cover image */}
          {article.image_url && (
            <motion.figure
              className="mb-12 max-w-[800px] mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <img
                src={article.image_url}
                alt={article.title || "Article cover"}
                className="w-full object-cover"
                loading="eager"
              />
            </motion.figure>
          )}

          {/* Article body — renders HTML content from Supabase */}
          <motion.article
            className="max-w-[800px] mx-auto prose-mag"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            dangerouslySetInnerHTML={{ __html: article.content || "" }}
          />

          {/* Back link */}
          <div className="max-w-[800px] mx-auto mt-16 pt-8 border-t border-border">
            <Link
              to="/mag"
              className="inline-flex items-center gap-2 font-heading text-xs font-bold tracking-wider text-primary hover:brightness-110 transition-all"
            >
              ← BACK TO MAG
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MagArticle;
