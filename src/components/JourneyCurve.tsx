import { motion, useMotionValue, useMotionValueEvent, type MotionValue } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

interface JourneyCurveProps {
  progress: MotionValue<number>;
}

const curveHeight = 4700;
const curve = "M 80 0 C 80 250 250 250 250 500 C 250 950 750 1050 750 1500 C 750 1950 250 2050 250 2500 C 250 2950 750 3050 750 3500 C 750 3800 500 3850 500 4000 C 500 4200 250 4300 250 4450 C 250 4580 500 4630 500 4700";

const points = [
  { x: 250, y: 500, label: "Bem-vindo" },
  { x: 750, y: 1500, label: "Momentos" },
  { x: 250, y: 2500, label: "Nossa história" },
  { x: 750, y: 3500, label: "Memórias" },
] as const;

export default function JourneyCurve({ progress }: JourneyCurveProps) {
  const curveRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const travelerProgress = useMotionValue(0);
  const travelerX = useMotionValue(80);
  const travelerY = useMotionValue(0);

  const updateTraveler = useCallback(() => {
    const curveElement = curveRef.current;
    const path = pathRef.current;
    if (!curveElement || !path) return;

    const bounds = curveElement.getBoundingClientRect();
    if (bounds.height <= 0) return;

    const centerTarget = window.innerHeight * 0.52;
    const endBlend = Math.min(1, Math.max(0, (progress.get() - 0.9) / 0.1));
    const viewportTarget = centerTarget + (bounds.bottom - centerTarget) * endBlend;
    const localProgress = Math.min(1, Math.max(0, (viewportTarget - bounds.top) / bounds.height));
    const targetY = localProgress * curveHeight;
    const totalLength = path.getTotalLength();
    let start = 0;
    let end = totalLength;

    for (let index = 0; index < 16; index += 1) {
      const middle = (start + end) / 2;
      if (path.getPointAtLength(middle).y < targetY) start = middle;
      else end = middle;
    }

    const currentLength = (start + end) / 2;
    const point = path.getPointAtLength(currentLength);
    travelerProgress.set(currentLength / totalLength);
    travelerX.set(point.x);
    travelerY.set(point.y);
  }, [progress, travelerProgress, travelerX, travelerY]);

  useMotionValueEvent(progress, "change", updateTraveler);

  useEffect(() => {
    updateTraveler();
    window.addEventListener("resize", updateTraveler);
    return () => window.removeEventListener("resize", updateTraveler);
  }, [updateTraveler]);

  return (
    <div ref={curveRef} className="journey-curve" aria-hidden="true">
      <svg viewBox={`0 0 1000 ${curveHeight}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="journey-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8b5cf6" />
            <stop offset="0.48" stopColor="#ff4fa3" />
            <stop offset="1" stopColor="#ffd1e7" />
          </linearGradient>
          <filter id="journey-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <path ref={pathRef} className="journey-curve-base" d={curve} pathLength="1" />
        <motion.path className="journey-curve-progress journey-curve-progress-traveler" d={curve} pathLength="1" style={{ pathLength: travelerProgress }} />
        <motion.path className="journey-curve-progress journey-curve-progress-scroll" d={curve} pathLength="1" style={{ pathLength: progress }} />

        {points.map((point, index) => (
          <g className="journey-curve-point" key={`${point.x}-${point.y}`}>
            <circle cx={point.x} cy={point.y} r="24" />
            <circle cx={point.x} cy={point.y} r="8" />
            <text
              x={point.x + (index % 2 === 0 ? -42 : 42)}
              y={point.y - 34}
              textAnchor={index % 2 === 0 ? "end" : "start"}
            >
              0{index + 1} · {point.label}
            </text>
          </g>
        ))}

        <motion.circle className="journey-curve-traveler-halo" cx={travelerX} cy={travelerY} r="34" />
        <motion.circle className="journey-curve-traveler" cx={travelerX} cy={travelerY} r="13" />
      </svg>
    </div>
  );
}
