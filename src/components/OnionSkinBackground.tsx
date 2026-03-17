import { useCallback, useEffect, useRef, useState } from "react";
import heroBg from "@/assets/hero-bg.png";

/* ─── Easing functions ─── */
const EASES: Record<string, (t: number) => number> = {
  linear: (t) => t,
  easeInSine: (t) => 1 - Math.cos((t * Math.PI) / 2),
  easeOutSine: (t) => Math.sin((t * Math.PI) / 2),
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => 1 - (1 - t) * (1 - t),
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
};

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function easedValue(start: number, end: number, t: number, easeName: string) {
  const ease = EASES[easeName] || EASES.linear;
  return lerp(start, end, ease(clamp(t, 0, 1)));
}
function threePoint(start: number, mid: number, end: number, t: number, easeName: string) {
  if (t < 0.5) return easedValue(start, mid, t / 0.5, easeName);
  return easedValue(mid, end, (t - 0.5) / 0.5, easeName);
}

/* ─── Config ─── */
const CONF = {
  layers: 8,
  spacing: 90,
  perspective: 500,
  focusSpread: 0.5,

  translateX: { start: -200, end: 365, ease: "linear" },
  translateY: { start: -100, end: -65, ease: "easeOutSine" },
  translateZ: { start: -550, end: 200, ease: "linear" },

  opacity: { start: 0.5, mid: 1, end: 0.2, ease: "easeOutSine" },
  blur: { start: 10, mid: 0, end: 3, ease: "easeInCubic" },
  saturation: { start: 50, mid: 100, end: 50, ease: "easeInCubic" },

  borderRadius: 30,
  borderWidth: 0.5,
};

const OnionSkinBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseNormRef = useRef(0.5);
  const rafRef = useRef(0);
  const planesRef = useRef<(HTMLDivElement | null)[]>([]);

  const updatePlanes = useCallback(() => {
    const layers = CONF.layers;
    planesRef.current.forEach((plane, i) => {
      if (!plane || i >= layers) return;

      const t = layers <= 1 ? 0 : i / (layers - 1);

      let tx = easedValue(CONF.translateX.start, CONF.translateX.end, t, CONF.translateX.ease);
      let ty = easedValue(CONF.translateY.start, CONF.translateY.end, t, CONF.translateY.ease);
      const tz = easedValue(CONF.translateZ.start, CONF.translateZ.end, t, CONF.translateZ.ease);

      // Stack offset on X axis, posToNeg direction
      tx += -CONF.spacing * i;

      let opacity: number;
      let blur: number;

      // Focus-driven mode
      const focusIndex = mouseNormRef.current * (layers - 1);
      const dist = Math.abs(i - focusIndex);
      const spreadLayers = CONF.focusSpread * (layers - 1);
      const focus = clamp(1 - dist / spreadLayers, 0, 1);
      const fade = focus * focus;
      opacity = lerp(0.05, 1, fade);
      blur = lerp(12, 0, focus);

      const saturation = threePoint(
        CONF.saturation.start, CONF.saturation.mid, CONF.saturation.end, t, CONF.saturation.ease
      );

      plane.style.opacity = String(opacity);
      plane.style.transform = `translate3d(${tx}px,${ty}px,${tz}px) scale(1)`;
      plane.style.filter = `blur(${blur}px) saturate(${saturation}%) brightness(100%)`;
    });
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const norm = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      mouseNormRef.current = 1 - norm; // posToNeg direction
      updatePlanes();
    };

    window.addEventListener("mousemove", onMove);
    updatePlanes();
    return () => window.removeEventListener("mousemove", onMove);
  }, [updatePlanes]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Scene container with perspective */}
      <div
        className="absolute inset-0 flex items-center justify-end"
        style={{ perspective: `${CONF.perspective}px`, perspectiveOrigin: "right 150px" }}
      >
        {/* Stack */}
        <div
          className="relative w-[420px] mr-[5%]"
          style={{ aspectRatio: "0.7", transformStyle: "preserve-3d" }}
        >
          {Array.from({ length: CONF.layers }).map((_, i) => (
            <div
              key={i}
              ref={(el) => { planesRef.current[i] = el; }}
              className="absolute inset-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              <figure
                className="w-full h-full overflow-hidden m-0"
                style={{
                  borderRadius: `${CONF.borderRadius}px`,
                  borderWidth: `${CONF.borderWidth}px`,
                  borderStyle: "dashed",
                  borderColor: "hsl(var(--border))",
                }}
              >
                <img
                  src={heroBg}
                  alt=""
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </figure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnionSkinBackground;
