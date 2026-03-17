import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface MagArticle {
  id: number;
  title: string | null;
  content: string | null;
  image_url: string | null;
  slug: string | null;
  is_published: boolean | null;
  created_at: string | null;
}

export function useMagArticles(limit?: number) {
  const [articles, setArticles] = useState<MagArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      let query = supabase
        .from("Mag")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (limit) query = query.limit(limit);

      const { data, error } = await query;
      if (!error && data) setArticles(data);
      setLoading(false);
    };
    fetch();
  }, [limit]);

  return { articles, loading };
}

export function useMagArticle(slug: string | undefined) {
  const [article, setArticle] = useState<MagArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) { setLoading(false); return; }
    const fetch = async () => {
      const { data, error } = await supabase
        .from("Mag")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (!error && data) setArticle(data);
      setLoading(false);
    };
    fetch();
  }, [slug]);

  return { article, loading };
}
