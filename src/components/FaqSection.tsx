import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect } from "react";

const faqs = [
  {
    q: "What does your music distribution platform include?",
    a: "Our platform includes worldwide digital music distribution to all major streaming services and stores, Content ID management, licensing support, playlist pitching, promo tools, pre-save links, royalty splits, catalog management, and dedicated support for artists and labels.",
  },
  {
    q: "Do you offer Content ID and licensing services?",
    a: "Yes. We provide automated Content ID registration and management across YouTube and other platforms, as well as sync licensing support for film, TV, advertising, and digital content placements.",
  },
  {
    q: "Do you work with both artists and record labels?",
    a: "Absolutely. We offer tailored solutions for independent artists, producers, and record labels of all sizes — from single-artist projects to multi-catalog label operations with dedicated account management.",
  },
  {
    q: "Do you help with playlist pitching and promo?",
    a: "Yes. Our team provides curated playlist pitching to editorial and independent playlists on Spotify, Apple Music, and other platforms, alongside broader promo campaign support including press, media outreach, and editorial features.",
  },
  {
    q: "What makes your platform different from a typical music distributor?",
    a: "We are a hybrid music infrastructure platform. Beyond basic distribution, we integrate licensing, Content ID, promo tools, press and media support, booking connections, and artist tools into a single platform — giving artists and labels the full infrastructure they need to grow, not just deliver.",
  },
];

const FaqSection = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    script.id = "faq-schema";
    document.head.appendChild(script);
    return () => { document.getElementById("faq-schema")?.remove(); };
  }, []);

  return (
    <section className="py-24 border-t border-border">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="font-heading text-[10px] tracking-[0.3em] text-muted-foreground mb-4">
            // FAQ
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground">
            FREQUENTLY
            <br />
            ASKED
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-border">
              <AccordionTrigger className="font-heading text-sm font-bold tracking-wider text-foreground text-left hover:text-primary hover:no-underline py-6">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
