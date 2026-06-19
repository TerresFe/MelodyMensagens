import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { PointerEvent } from "react";

interface HeroProps {
  onContact: () => void;
}

export default function Hero({ onContact }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 22 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 22 });
  const imageX = useTransform(smoothX, [-1, 1], [18, -18]);
  const imageY = useTransform(smoothY, [-1, 1], [12, -12]);
  const contentX = useTransform(smoothX, [-1, 1], [-9, 9]);
  const contentY = useTransform(smoothY, [-1, 1], [-7, 7]);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.section
      className="hero-scene"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      aria-labelledby="hero-title"
    >
      <motion.div className="hero-photo-layer" style={reduceMotion ? undefined : { x: imageX, y: imageY }}>
        <img src="/carro.jpg" alt="Carro iluminado da Melody Mensagens" />
      </motion.div>
      <div className="hero-overlay" />
      <div className="hero-grid" aria-hidden="true" />
      <motion.div
        className="hero-orb hero-orb-one"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { y: [-10, 14, -10], x: [-5, 8, -5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hero-orb hero-orb-two"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { y: [12, -12, 12], x: [7, -6, 7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div className="hero-copy" style={reduceMotion ? undefined : { x: contentX, y: contentY }}>
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          ✦ Emoção ao vivo em Porto Alegre e região
        </motion.span>
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Transformamos sentimentos em <span>momentos inesquecíveis.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Mensagens ao vivo, música, luzes e surpresas feitas para emocionar quem você ama.
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button className="primary-button" onClick={onContact}>
            Criar uma surpresa <span aria-hidden="true">→</span>
          </button>
          <a className="ghost-button" href="#momentos">
            Ver momentos
          </a>
        </motion.div>
      </motion.div>

      <div className="hero-proof glass-panel" aria-label="Experiência Melody">
        <strong>Desde 2000</strong>
        <span>criando memórias que ficam</span>
      </div>
      <div className="scroll-cue" aria-hidden="true"><span /></div>
    </motion.section>
  );
}
