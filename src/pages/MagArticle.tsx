import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ReadingProgress";
import { useMagArticle, useMagArticles } from "@/hooks/use-mag-articles";

import beatportLogo from "@/assets/partners/beatport.png";
import djmagLogo from "@/assets/partners/djmag.png";

const MagArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { article, loading } = useMagArticle(slug);
  const { articles: latestArticles } = useMagArticles(4);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Back-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setShowBackToTop(docHeight > 0 && window.scrollY / docHeight > 0.5);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic document title & meta
  useEffect(() => {
    if (!article) return;
    document.title = `${article.title} — TRACKS/ID MAG`;
    const metaDesc = document.querySelector('meta[name="description"]');
    const excerpt = article.content
      ? article.content.replace(/<[^>]*>/g, "").slice(0, 155) + "…"
      : "";
    if (metaDesc) metaDesc.setAttribute("content", excerpt);
    else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = excerpt;
      document.head.appendChild(meta);
    }
    return () => { document.title = "TRACKS/ID"; };
  }, [article]);

  // JSON-LD NewsArticle Schema
  const jsonLd = article
    ? {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: article.title,
        image: article.image_url,
        datePublished: article.created_at,
        author: { "@type": "Organization", name: "TRACKS/ID" },
        publisher: {
          "@type": "Organization",
          name: "TRACKS/ID",
          logo: { "@type": "ImageObject", url: "https://tracksid.lovable.app/favicon.ico" },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://tracksid.lovable.app/mag/${slug}`,
        },
      }
    : null;

  const sidebarArticles = latestArticles.filter((a) => a.slug !== slug).slice(0, 3);

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
    ? new Date(article.created_at)
        .toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })
        .toUpperCase()
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

      {/* ═══ Full-width Hero with title overlaid ═══ */}
      <motion.section
        className="relative w-full min-h-[60vh] md:min-h-[80vh] flex items-end overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {article.image_url && (
          <img
            src={article.image_url}
            alt={article.title || "Article cover"}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            style={{ aspectRatio: "16/9" }}
          />
        )}
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />

        {/* Title overlay */}
        <div className="relative z-10 container pb-12 md:pb-16">
          <div className="max-w-4xl">
            <div className="font-mono text-[10px] tracking-widest text-muted-foreground mb-4">
              // LATEST — {formattedDate}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-foreground leading-[0.92] mb-6 tracking-tight">
              {article.title}
            </h1>
            <Link
              to="/mag"
              className="inline-flex items-center gap-2 font-heading text-xs font-bold tracking-wider text-primary hover:brightness-110 transition-all"
            >
              READ ARTICLE →
            </Link>
          </div>
        </div>
      </motion.section>

      <main className="relative z-10">
        <div className="container">
          <div className="flex gap-16 justify-center">
            {/* ═══ Main Article Column ═══ */}
            <article className="w-full max-w-[720px] pb-24">
              {/* Breadcrumbs */}
              <motion.nav
                className="mt-10 mb-10"
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


              {/* Article body — renders HTML from Supabase */}
              <motion.section
                className="prose-mag"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                dangerouslySetInnerHTML={{ __html: article.content || "" }}
              />

              {/* Back link */}
              <footer className="mt-20 pt-10 border-t border-border">
                <Link
                  to="/mag"
                  className="inline-flex items-center gap-2 font-heading text-xs font-bold tracking-wider text-primary hover:brightness-110 transition-all"
                >
                  ← BACK TO MAG
                </Link>
              </footer>
            </article>

            {/* ═══ Sticky Sidebar (Desktop) ═══ */}
            <aside className="hidden xl:block w-[220px] shrink-0">
              <div className="sticky top-28 space-y-10">
                {/* Search icon */}
                <button
                  className="w-10 h-10 border border-primary/30 flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-all group"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                </button>

                {/* Latest Logs */}
                <div>
                  <h3 className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground mb-4">
                    [ LATEST_LOGS ]
                  </h3>
                  <div className="space-y-4">
                    {sidebarArticles.map((a) => (
                      <Link
                        key={a.id}
                        to={`/mag/${a.slug}`}
                        className="block group"
                      >
                        <p className="font-mono text-[11px] leading-snug text-foreground/60 group-hover:text-primary transition-colors line-clamp-2">
                          {a.title}
                        </p>
                        <span className="font-mono text-[9px] text-muted-foreground mt-1 block">
                          {a.created_at
                            ? new Date(a.created_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })
                            : ""}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="space-y-4 pt-4 border-t border-border/40">
                  <p className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground">
                    AS SEEN ON
                  </p>
                  <div className="flex items-center gap-4 opacity-30">
                    <img src={djmagLogo} alt="DJ Mag" className="h-5 w-auto object-contain" loading="lazy" />
                    <img src={beatportLogo} alt="Beatport" className="h-5 w-auto object-contain" loading="lazy" />
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Back-to-Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-50 w-10 h-10 border border-primary/40 bg-background/80 backdrop-blur-sm flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 text-primary" />
          </motion.button>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default MagArticle;
