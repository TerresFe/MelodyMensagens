import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";
import { textos } from "../data/textos";

type TextItem = (typeof textos)[number];

export default function Texts() {
  const [category, setCategory] = useState("Todos");
  const [selected, setSelected] = useState<TextItem | null>(null);
  const reduceMotion = useReducedMotion();
  const categories = ["Todos", ...new Set(textos.map((text) => text.categoria))];
  const filteredTexts = category === "Todos" ? textos : textos.filter((text) => text.categoria === category);

  return (
    <section className="page-section texts-page" aria-labelledby="texts-title">
      <div className="section-heading page-heading">
        <span className="eyebrow">Palavras que emocionam</span>
        <h1 id="texts-title">Encontre o texto certo para o momento</h1>
        <p>Escolha uma inspiração e personalize a mensagem para contar a sua história.</p>
      </div>

      <div className="category-list" aria-label="Filtrar textos por categoria">
        {categories.map((item) => (
          <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)} aria-pressed={category === item}>
            {item}
          </button>
        ))}
      </div>

      <motion.div className="texts-list" layout>
        <AnimatePresence mode="popLayout">
          {filteredTexts.map((text, index) => (
            <motion.button
              layout
              key={`${text.categoria}-${text.titulo}`}
              className="text-card"
              onClick={() => setSelected(text)}
              initial={{ opacity: 0, scale: reduceMotion ? 1 : .96, y: reduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: .15 }}
              whileHover={reduceMotion ? undefined : { y: -8, scale: 1.012, boxShadow: "0 24px 50px rgba(0,0,0,.34)" }}
              whileTap={reduceMotion ? undefined : { scale: .99 }}
              exit={{ opacity: 0, scale: .96 }}
              transition={{ delay: reduceMotion ? 0 : Math.min(index * .035, .3), duration: reduceMotion ? .01 : .42, ease: "easeOut" }}
            >
              <h3>{text.titulo}</h3>
              <small>{text.categoria}</small>
              <p>{text.conteudo.slice(0, 120)}…</p>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {createPortal(
        <AnimatePresence>
          {selected && (
            <motion.div className="image-modal" role="dialog" aria-modal="true" aria-labelledby="selected-text-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
              <motion.div className="text-modal-panel" initial={{ opacity: 0, scale: .9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .94 }} onClick={(event) => event.stopPropagation()}>
                <button className="modal-close text-modal-close" onClick={() => setSelected(null)} aria-label="Fechar texto">×</button>
                <span className="eyebrow">{selected.categoria}</span>
                <h2 id="selected-text-title">{selected.titulo}</h2>
                <p>{selected.conteudo}</p>
                <a className="primary-button" href={`https://wa.me/5551984357011?text=${encodeURIComponent(`Gostei deste texto (${selected.titulo}): ${selected.conteudo}`)}`} target="_blank" rel="noreferrer">Usar no WhatsApp <span>↗</span></a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  );
}
