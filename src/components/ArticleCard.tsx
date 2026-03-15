import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Article } from "@/data/articles";

interface ArticleCardProps {
  article: Article;
  index: number;
}

const ArticleCard = ({ article, index }: ArticleCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/mag/${article.slug}`}
        className="group grid grid-cols-1 md:grid-cols-[180px_1fr_1.5fr] lg:grid-cols-[200px_280px_1fr] gap-4 md:gap-6 lg:gap-8 py-8 border-b border-border hover:border-primary/30 transition-colors duration-300"
      >
        {/* Metadata column */}
        <div className="flex flex-row md:flex-col gap-3 items-start">
          <span className="inline-block bg-primary text-primary-foreground font-mono text-[10px] font-bold tracking-wider px-3 py-1">
            {article.category}
          </span>
          <div>
            <p className="font-heading text-2xl md:text-3xl font-black text-foreground leading-none">
              {article.date}
            </p>
            <p className="font-mono text-[10px] text-muted-foreground tracking-widest mt-1">
              {article.location}
            </p>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="relative overflow-hidden aspect-video md:aspect-[16/10]">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            loading="lazy"
          />
          {/* Scanline overlay */}
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
          <h3 className="font-heading text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-2 leading-tight">
            {article.title}
          </h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>
          <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-wider text-primary mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            READ ARTICLE <span>→</span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ArticleCard;
