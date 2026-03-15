import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ReadingProgress";
import { articles } from "@/data/articles";

const MagArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

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

  // JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    author: { "@type": "Organization", name: article.author },
    datePublished: article.year,
    image: article.image,
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-primary text-primary-foreground font-mono text-[10px] font-bold tracking-wider px-3 py-1">
                {article.category}
              </span>
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                {article.location}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-foreground leading-[0.9] mb-8">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 font-mono text-[10px] tracking-widest text-muted-foreground">
              <span>{article.date}, {article.year}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span>{article.readTime}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span>{article.author}</span>
            </div>
          </motion.header>

          {/* Article body */}
          <motion.article
            className="max-w-[800px] mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {article.content.map((block, i) => {
              switch (block.type) {
                case "paragraph":
                  return (
                    <p key={i} className="font-body text-lg text-foreground/80 leading-[1.7] mb-6">
                      {block.text}
                    </p>
                  );
                case "heading":
                  return (
                    <h2 key={i} className="font-heading text-2xl md:text-3xl font-black text-foreground mt-12 mb-6">
                      {block.text}
                    </h2>
                  );
                case "blockquote":
                  return (
                    <blockquote
                      key={i}
                      className="border-l-4 border-primary pl-6 py-2 my-8 italic font-body text-lg text-foreground/90 leading-relaxed"
                    >
                      {block.text}
                    </blockquote>
                  );
                case "callout":
                  return (
                    <div
                      key={i}
                      className="border border-border bg-secondary/30 p-6 my-8 font-mono text-sm text-foreground/70 leading-relaxed"
                    >
                      <span className="text-primary font-bold">LOG //</span>{" "}
                      {block.text.replace("LOG // ", "")}
                    </div>
                  );
                case "image":
                  return (
                    <figure key={i} className="my-10">
                      <img
                        src={block.src}
                        alt={block.caption}
                        className="w-full object-cover"
                        loading="lazy"
                      />
                      <figcaption className="font-mono text-[10px] tracking-widest text-muted-foreground mt-3">
                        {block.caption}
                      </figcaption>
                    </figure>
                  );
                default:
                  return null;
              }
            })}

            {/* Back link */}
            <div className="mt-16 pt-8 border-t border-border">
              <Link
                to="/mag"
                className="inline-flex items-center gap-2 font-heading text-xs font-bold tracking-wider text-primary hover:brightness-110 transition-all"
              >
                ← BACK TO MAG
              </Link>
            </div>
          </motion.article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MagArticle;
