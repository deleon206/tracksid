import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMagArticles } from "@/hooks/use-mag-articles";

const MagSidebarSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { articles } = useMagArticles();

  const filtered = query.trim().length > 1
    ? articles.filter((a) =>
        a.title?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            if (isOpen) setQuery("");
          }}
          className="w-10 h-10 border border-primary/30 flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-all group shrink-0 z-10"
          aria-label="Search"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="w-4 h-4 text-primary" />
              </motion.div>
            ) : (
              <motion.div key="search" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Search className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 170, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full h-10 bg-card border border-l-0 border-primary/30 px-3 font-mono text-[11px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results dropdown */}
      <AnimatePresence>
        {isOpen && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 left-0 right-0 min-w-[220px] bg-card border border-border z-50"
          >
            {filtered.map((a) => (
              <Link
                key={a.id}
                to={`/mag/${a.slug}`}
                onClick={() => { setIsOpen(false); setQuery(""); }}
                className="flex gap-3 items-center p-3 hover:bg-secondary/50 transition-colors group"
              >
                {a.image_url && (
                  <img src={a.image_url} alt="" className="w-10 h-7 object-cover shrink-0" />
                )}
                <p className="font-mono text-[10px] leading-snug text-foreground/70 group-hover:text-primary transition-colors line-clamp-2">
                  {a.title}
                </p>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* No results */}
      <AnimatePresence>
        {isOpen && query.trim().length > 1 && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-12 left-0 right-0 min-w-[220px] bg-card border border-border z-50 p-3"
          >
            <p className="font-mono text-[10px] text-muted-foreground">No results found.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MagSidebarSearch;
