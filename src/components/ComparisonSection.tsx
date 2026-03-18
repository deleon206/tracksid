import { motion } from "framer-motion";
import { Check, X, Minus, Crown, Zap, Shield } from "lucide-react";

type FeatureValue = boolean | string;

interface ComparisonFeature {
  category: string;
  feature: string;
  tracksId: FeatureValue;
  distrokid: FeatureValue;
  tunecore: FeatureValue;
  cdbaby: FeatureValue;
  traditionalLabel: FeatureValue;
}

const features: ComparisonFeature[] = [
  {
    category: "Distribution",
    feature: "Distribución a 150+ plataformas",
    tracksId: true,
    distrokid: true,
    tunecore: true,
    cdbaby: true,
    traditionalLabel: true,
  },
  {
    category: "Distribution",
    feature: "Soporte Dolby Atmos & Spatial Audio",
    tracksId: "Gratis",
    distrokid: "$12.99/año extra",
    tunecore: "Solo planes premium",
    cdbaby: false,
    traditionalLabel: "Depende",
  },
  {
    category: "Distribution",
    feature: "Mayor pay-rate de regalías",
    tracksId: "100%",
    distrokid: "100%*",
    tunecore: "100%*",
    cdbaby: "91% (9% comisión)",
    traditionalLabel: "15-25%",
  },
  {
    category: "Licensing",
    feature: "Sync & Licensing (TV, Film, Netflix, HBO)",
    tracksId: true,
    distrokid: false,
    tunecore: "Limitado",
    cdbaby: "Básico",
    traditionalLabel: true,
  },
  {
    category: "Licensing",
    feature: "Licenciamiento con Majors (Sony, UMG, Warner) para Covers & Remixes",
    tracksId: true,
    distrokid: false,
    tunecore: false,
    cdbaby: false,
    traditionalLabel: "Depende",
  },
  {
    category: "Press",
    feature: "PR & Prensa (DJ Mag, MixMag, etc.)",
    tracksId: true,
    distrokid: false,
    tunecore: false,
    cdbaby: false,
    traditionalLabel: true,
  },
  {
    category: "Press",
    feature: "Pitch a Playlists & Editoriales",
    tracksId: true,
    distrokid: false,
    tunecore: "Extra $",
    cdbaby: false,
    traditionalLabel: true,
  },
  {
    category: "Press",
    feature: "Pitch a Radios",
    tracksId: true,
    distrokid: false,
    tunecore: false,
    cdbaby: false,
    traditionalLabel: true,
  },
  {
    category: "Tools",
    feature: "Plataforma propia para gestionar catálogo",
    tracksId: true,
    distrokid: true,
    tunecore: true,
    cdbaby: "Limitado",
    traditionalLabel: false,
  },
  {
    category: "Tools",
    feature: "Campañas de Pre-save",
    tracksId: "Incluido",
    distrokid: "$0.99/canción extra",
    tunecore: "Solo planes premium",
    cdbaby: false,
    traditionalLabel: "Depende",
  },
  {
    category: "Tools",
    feature: "Herramientas de Marketing & Smart Links",
    tracksId: "Incluido",
    distrokid: "HyperFollow (limitado)",
    tunecore: "Extra $",
    cdbaby: "Básico",
    traditionalLabel: false,
  },
  {
    category: "Tools",
    feature: "Inclusión en Charts oficiales",
    tracksId: true,
    distrokid: false,
    tunecore: true,
    cdbaby: true,
    traditionalLabel: true,
  },
  {
    category: "Pricing",
    feature: "Sin suscripción — Paga por uso con créditos",
    tracksId: true,
    distrokid: false,
    tunecore: false,
    cdbaby: "One-time fee",
    traditionalLabel: false,
  },
  {
    category: "Support",
    feature: "Servicio Concierge — Soporte humano, no bots",
    tracksId: true,
    distrokid: false,
    tunecore: "Solo planes premium",
    cdbaby: "Email básico",
    traditionalLabel: true,
  },
];

const ValueCell = ({ value, isTracksId = false }: { value: FeatureValue; isTracksId?: boolean }) => {
  if (value === true) {
    return (
      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${isTracksId ? "bg-[hsl(48,90%,50%)] text-black" : "bg-emerald-100 text-emerald-600"}`}>
        <Check className="w-3.5 h-3.5" strokeWidth={3} />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-50 text-red-400">
        <X className="w-3.5 h-3.5" strokeWidth={3} />
      </span>
    );
  }
  return (
    <span className={`text-[11px] font-medium leading-tight text-center ${isTracksId ? "text-[hsl(48,90%,35%)] font-bold" : "text-neutral-500"}`}>
      {value}
    </span>
  );
};

const ComparisonSection = () => {
  const categories = [...new Set(features.map((f) => f.category))];

  return (
    <section className="relative bg-white py-20 sm:py-28 overflow-hidden">
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="font-heading text-[10px] tracking-[0.3em] text-[hsl(48,90%,40%)] border border-[hsl(48,90%,50%)]/40 inline-block px-3 py-1 mb-6">
            // POR QUÉ SOMOS DIFERENTES
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-neutral-900 leading-[0.95] mb-5">
            LABEL + DISTRIBUIDOR.{" "}
            <span className="text-[hsl(48,90%,40%)]">TODO EN UNO.</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Somos la única opción en el mercado que combina los servicios de un sello discográfico con la infraestructura y tecnología de un distribuidor digital. Sin suscripciones, sin comisiones ocultas.
          </p>
        </motion.div>

        {/* Highlight badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {[
            { icon: Crown, text: "Servicios de Label" },
            { icon: Zap, text: "Tecnología de Distribuidor" },
            { icon: Shield, text: "Sin Suscripciones" },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-full"
            >
              <Icon className="w-3.5 h-3.5 text-[hsl(48,90%,50%)]" />
              <span className="font-heading text-[10px] font-bold tracking-[0.1em] uppercase">
                {text}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="overflow-x-auto -mx-4 px-4"
        >
          <table className="w-full min-w-[800px] border-collapse">
            {/* Header */}
            <thead>
              <tr>
                <th className="text-left p-3 sm:p-4 font-heading text-[10px] tracking-[0.15em] text-neutral-400 uppercase w-[30%]">
                  Característica
                </th>
                <th className="p-3 sm:p-4 text-center w-[17.5%]">
                  <div className="inline-flex flex-col items-center gap-1.5 bg-neutral-900 text-white px-4 py-2.5 rounded-xl -mt-2 shadow-lg shadow-neutral-900/20">
                    <span className="font-heading text-[11px] font-black tracking-[0.1em]">TRACKS/ID</span>
                    <span className="text-[9px] text-[hsl(48,90%,50%)] font-bold tracking-wider">LABEL + DISTRO</span>
                  </div>
                </th>
                <th className="p-3 sm:p-4 text-center w-[13.75%]">
                  <span className="font-heading text-[10px] font-bold tracking-wider text-neutral-500">DistroKid</span>
                  <p className="text-[9px] text-neutral-400 mt-0.5">$22.99/año</p>
                </th>
                <th className="p-3 sm:p-4 text-center w-[13.75%]">
                  <span className="font-heading text-[10px] font-bold tracking-wider text-neutral-500">TuneCore</span>
                  <p className="text-[9px] text-neutral-400 mt-0.5">$9.99+/año</p>
                </th>
                <th className="p-3 sm:p-4 text-center w-[13.75%]">
                  <span className="font-heading text-[10px] font-bold tracking-wider text-neutral-500">CD Baby</span>
                  <p className="text-[9px] text-neutral-400 mt-0.5">$9.95+ / 9% com.</p>
                </th>
                <th className="p-3 sm:p-4 text-center w-[13.75%]">
                  <span className="font-heading text-[10px] font-bold tracking-wider text-neutral-500">Label Tradicional</span>
                  <p className="text-[9px] text-neutral-400 mt-0.5">75-85% comisión</p>
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat) => (
                <>
                  {/* Category separator */}
                  <tr key={`cat-${cat}`}>
                    <td
                      colSpan={6}
                      className="pt-6 pb-2 px-3 sm:px-4 font-heading text-[9px] font-bold tracking-[0.25em] uppercase text-[hsl(48,90%,40%)]"
                    >
                      {cat === "Distribution" && "— Distribución"}
                      {cat === "Licensing" && "— Licenciamiento & Sync"}
                      {cat === "Press" && "— Prensa & Promoción"}
                      {cat === "Tools" && "— Herramientas & Plataforma"}
                      {cat === "Pricing" && "— Modelo de Precio"}
                      {cat === "Support" && "— Soporte"}
                    </td>
                  </tr>
                  {features
                    .filter((f) => f.category === cat)
                    .map((f, i) => (
                      <tr
                        key={f.feature}
                        className={`border-b border-neutral-100 ${i % 2 === 0 ? "bg-neutral-50/50" : ""} hover:bg-[hsl(48,90%,50%)]/[0.04] transition-colors`}
                      >
                        <td className="p-3 sm:p-4 font-body text-xs sm:text-sm text-neutral-700 leading-snug">
                          {f.feature}
                        </td>
                        <td className="p-3 sm:p-4 text-center bg-[hsl(48,90%,50%)]/[0.04]">
                          <div className="flex justify-center">
                            <ValueCell value={f.tracksId} isTracksId />
                          </div>
                        </td>
                        <td className="p-3 sm:p-4 text-center">
                          <div className="flex justify-center">
                            <ValueCell value={f.distrokid} />
                          </div>
                        </td>
                        <td className="p-3 sm:p-4 text-center">
                          <div className="flex justify-center">
                            <ValueCell value={f.tunecore} />
                          </div>
                        </td>
                        <td className="p-3 sm:p-4 text-center">
                          <div className="flex justify-center">
                            <ValueCell value={f.cdbaby} />
                          </div>
                        </td>
                        <td className="p-3 sm:p-4 text-center">
                          <div className="flex justify-center">
                            <ValueCell value={f.traditionalLabel} />
                          </div>
                        </td>
                      </tr>
                    ))}
                </>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Footnote */}
        <p className="text-[10px] text-neutral-400 mt-6 text-center font-body">
          * DistroKid y TuneCore requieren suscripción anual. Si cancelas, tu música se retira de las plataformas. TRACKS/ID usa un modelo de créditos sin suscripción.
        </p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <a
            href="#plans"
            className="inline-flex items-center justify-center gap-2 bg-neutral-900 text-white font-heading text-[11px] font-bold tracking-[0.15em] px-8 py-4 rounded-full hover:bg-[hsl(48,90%,50%)] hover:text-black transition-all duration-300"
          >
            EMPIEZA GRATIS <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
