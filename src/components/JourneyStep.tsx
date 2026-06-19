import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface JourneyStepProps {
  children: ReactNode;
  side?: "left" | "right";
  label: string;
}

export default function JourneyStep({ children, side = "left", label }: JourneyStepProps) {
  const stepRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stepRef,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 95, damping: 24, restDelta: 0.001 });
  const opacity = useTransform(progress, [0, 0.2, 0.78, 1], [0.08, 1, 1, 0.42]);
  const y = useTransform(progress, [0, 0.24, 0.76, 1], [140, 0, 0, -55]);
  const tone = useTransform(
    progress,
    [0, 0.28, 0.43, 0.57, 0.72, 1],
    [
      "brightness(.72) saturate(.8)",
      "brightness(.9) saturate(.94)",
      "brightness(1.14) saturate(1.12)",
      "brightness(1.14) saturate(1.12)",
      "brightness(.9) saturate(.94)",
      "brightness(.72) saturate(.8)",
    ],
  );

  return (
    <motion.div
      ref={stepRef}
      className={`journey-step journey-step-${side}`}
      style={reduceMotion ? undefined : { opacity, y, filter: tone }}
    >
      <span className="journey-step-label" aria-hidden="true">{label}</span>
      {children}
    </motion.div>
  );
}
