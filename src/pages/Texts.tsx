import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { textos } from "../data/textos";



export default function Texts() {

  <div>
    <h1>Textos</h1>
  </div>

  const [categoria, setCategoria] = useState("Todos");
  const [selecionado, setSelecionado] = useState<any>(null);

  const categorias = ["Todos", ...new Set(textos.map(t => t.categoria))];

  const textosFiltrados =
    categoria === "Todos"
      ? textos
      : textos.filter(t => t.categoria === categoria);

  const whatsappBase = "https://wa.me/5551984357011";

  return (
    <div className="p-6">

      {/* TÍTULO */}
      <h2 className="text-3xl font-bold text-center mb-6">
        Escolha seu texto 💖
      </h2>

      {/* CATEGORIAS */}
      <div className="flex gap-2 mb-6 flex-wrap justify-center">
        {categorias.map((cat, i) => (
          <button
            key={i}
            onClick={() => setCategoria(cat)}
            className={`px-4 py-2 rounded-full border ${categoria === cat
                ? "bg-white text-black"
                : "bg-white/10 hover:bg-white/20"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* LISTA */}
      <div className="space-y-4">
        {textosFiltrados.map((t, i) => (
          <div
            key={i}
            onClick={() => setSelecionado(t)}
            className="bg-white/10 p-5 rounded-xl cursor-pointer hover:bg-white/20 transition"
          >
            <h3 className="font-bold text-lg">{t.titulo}</h3>
            <p className="text-sm opacity-70">{t.categoria}</p>

            <p className="mt-2 text-sm opacity-60">
              {t.conteudo.slice(0, 100)}...
            </p>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selecionado && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelecionado(null)}
          >
            <motion.div
              className="bg-gradient-to-br from-purple-900 via-pink-800 to-black p-6 rounded-xl max-w-xl w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold">
                {selecionado.titulo}
              </h2>

              <p className="text-sm opacity-70 mb-4">
                {selecionado.categoria}
              </p>

              <p className="text-sm leading-relaxed whitespace-pre-line">
                {selecionado.conteudo}
              </p>

              {/* BOTÃO WHATS */}
              <a
                href={`${whatsappBase}?text=${encodeURIComponent(
                  `Gostei desse texto   (${selecionado.titulo}): ${selecionado.conteudo}`
                )}`}
                target="_blank"
                className="block mt-6 bg-green-500 text-center p-3 rounded-lg font-semibold hover:bg-green-600"
              >
                Usar este texto no WhatsApp 📲
              </a>

              {/* FECHAR */}
              <button
                onClick={() => setSelecionado(null)}
                className="mt-3 w-full text-sm opacity-70 hover:opacity-100"
              >
                Fechar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}