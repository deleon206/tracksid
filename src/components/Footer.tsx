import { motion } from "framer-motion";

const Footer = () => (
  <footer className="border-t border-border py-16">
    <div className="container">
      <div className="grid md:grid-cols-3 gap-12">
        <div>
          <span className="font-heading text-sm font-bold tracking-widest text-foreground">TRACKS/ID MUSIC GROUP</span>
          <p className="font-body text-sm text-muted-foreground mt-4 leading-relaxed max-w-xs">
            Manufacturing software built for ambitious producers who refuse to be held back.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <span className="font-heading text-xs font-bold tracking-wider text-muted-foreground mb-2">COMPANY</span>
          {["About", "Careers", "Contact", "Blog"].map((l) => (
            <a key={l} href="#" className="font-body text-sm text-foreground hover:text-primary transition-colors">
              {l}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <span className="font-heading text-xs font-bold tracking-wider text-muted-foreground mb-2">PRODUCT</span>
          {["Planning", "Production", "Inventory", "Analytics"].map((l) => (
            <a key={l} href="#" className="font-body text-sm text-foreground hover:text-primary transition-colors">
              {l}
            </a>
          ))}
        </div>
      </div>
      <motion.div
        className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="font-body text-xs text-muted-foreground">© 2026 Elevated Signals. All rights reserved.</p>
        <a
          href="#"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading text-xs font-bold tracking-wider px-8 py-4 hover:brightness-110 transition-all"
        >
          BOOK A DEMO <span>→</span>
        </a>
      </motion.div>
    </div>
  </footer>
);

export default Footer;
