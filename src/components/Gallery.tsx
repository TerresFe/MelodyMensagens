import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const images = Array.from({ length: 12 }, (_, index) => `/img${index + 1}.jpg`);

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const move = (direction: number) => {
    setCurrentIndex((current) => (current + direction + images.length) % images.length);
  };

  useEffect(() => {
    if (isPaused || reduceMotion || selected !== null) return;
    const interval = window.setInterval(() => move(1), 3500);
    return () => window.clearInterval(interval);
  }, [isPaused, reduceMotion, selected]);

  useEffect(() => {
    if (selected === null) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") setSelected((selected + 1) % images.length);
      if (event.key === "ArrowLeft") setSelected((selected - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected]);

  return (
    <section id="momentos" className="section-block gallery-section" aria-labelledby="gallery-title">
      <div className="section-heading">
        <span className="eyebrow">Momentos reais</span>
        <h2 id="gallery-title">Uma galeria que quase conta a história sozinha</h2>
        <p>Arraste o olhar, escolha uma foto e entre no momento.</p>
      </div>

      <div
        className="carousel-stage"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button className="carousel-arrow carousel-arrow-left" onClick={() => move(-1)} aria-label="Foto anterior">←</button>
        <div className="carousel-perspective">
          {images.map((image, index) => {
            let offset = index - currentIndex;
            if (offset > images.length / 2) offset -= images.length;
            if (offset < -images.length / 2) offset += images.length;
            if (Math.abs(offset) > 2) return null;
            const isCenter = offset === 0;

            return (
              <motion.button
                className={`gallery-card ${isCenter ? "is-center" : ""}`}
                key={image}
                onClick={() => isCenter ? setSelected(index) : setCurrentIndex(index)}
                animate={{
                  x: `${offset * 62}%`,
                  scale: isCenter ? 1 : 0.78,
                  rotateY: offset * -28,
                  z: isCenter ? 80 : -80,
                  opacity: Math.abs(offset) === 2 ? 0.25 : isCenter ? 1 : 0.55,
                }}
                transition={{ type: "spring", stiffness: 180, damping: 24 }}
                aria-label={isCenter ? `Ampliar foto ${index + 1}` : `Selecionar foto ${index + 1}`}
              >
                <img src={image} alt={`Momento especial registrado pela Melody, foto ${index + 1}`} loading={index > 2 ? "lazy" : "eager"} />
                {isCenter && <span className="gallery-hint">Clique para ampliar</span>}
              </motion.button>
            );
          })}
        </div>
        <button className="carousel-arrow carousel-arrow-right" onClick={() => move(1)} aria-label="Próxima foto">→</button>
      </div>

      <div className="carousel-dots" aria-label="Selecionar foto">
        {images.map((image, index) => (
          <button
            key={image}
            className={index === currentIndex ? "active" : ""}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir para foto ${index + 1}`}
            aria-current={index === currentIndex ? "true" : undefined}
          />
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="image-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Foto ampliada"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="Fechar foto">×</button>
            <button className="modal-arrow modal-prev" onClick={(event) => { event.stopPropagation(); setSelected((selected - 1 + images.length) % images.length); }} aria-label="Foto anterior">←</button>
            <motion.img
              key={images[selected]}
              src={images[selected]}
              alt={`Momento especial registrado pela Melody, foto ${selected + 1}`}
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            />
            <button className="modal-arrow modal-next" onClick={(event) => { event.stopPropagation(); setSelected((selected + 1) % images.length); }} aria-label="Próxima foto">→</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
