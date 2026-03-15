import { motion } from "framer-motion";

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 2.4 }}
      onAnimationComplete={onComplete}
    >
      {/* Label */}
      <motion.p
        className="absolute top-8 left-8 font-heading text-[10px] tracking-[0.3em] text-muted-foreground uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        Loading
      </motion.p>

      <svg width="280" height="280" viewBox="0 0 280 280" fill="none" className="overflow-visible">
        {/* Outer circle */}
        <motion.circle
          cx="140" cy="140" r="120"
          stroke="hsl(var(--foreground))"
          strokeWidth="0.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />

        {/* Cross lines */}
        {[45, 135, 200, 320].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 140 + 30 * Math.cos(rad);
          const y1 = 140 + 30 * Math.sin(rad);
          const x2 = 140 + 120 * Math.cos(rad);
          const y2 = 140 + 120 * Math.sin(rad);
          return (
            <motion.line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="hsl(var(--foreground))"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
            />
          );
        })}

        {/* Center green circle (eye outer) */}
        <motion.circle
          cx="140" cy="140" r="40"
          stroke="hsl(var(--primary))"
          strokeWidth="1.2"
          fill="none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ transformOrigin: "140px 140px" }}
        />

        {/* Center green ellipse (eye inner) */}
        <motion.ellipse
          cx="140" cy="140" rx="18" ry="12"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          fill="none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          style={{ transformOrigin: "140px 140px" }}
        />

        {/* Small orbital circles with green dots */}
        {[
          { cx: 90, cy: 95, r: 16 },
          { cx: 210, cy: 190, r: 16 },
        ].map((orb, i) => (
          <g key={i}>
            <motion.circle
              cx={orb.cx} cy={orb.cy} r={orb.r}
              stroke="hsl(var(--foreground))"
              strokeWidth="1.5"
              fill="none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.2 + i * 0.15 }}
              style={{ transformOrigin: `${orb.cx}px ${orb.cy}px` }}
            />
            <motion.circle
              cx={orb.cx} cy={orb.cy} r="2"
              fill="hsl(var(--primary))"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.4 + i * 0.15 }}
            />
          </g>
        ))}

        {/* Node dots on outer circle */}
        {[0, 90, 180, 270].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 140 + 120 * Math.cos(rad);
          const cy = 140 + 120 * Math.sin(rad);
          return (
            <motion.circle
              key={i}
              cx={cx} cy={cy} r="3"
              stroke="hsl(var(--foreground))"
              strokeWidth="1"
              fill="hsl(var(--background))"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.6 + i * 0.08 }}
            />
          );
        })}

        {/* Rotating ring animation */}
        <motion.circle
          cx="140" cy="140" r="120"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeDasharray="20 700"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "140px 140px" }}
        />
      </svg>
    </motion.div>
  );
};

export default Loader;
