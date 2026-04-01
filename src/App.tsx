import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Texts from "./pages/Texts";
import Reviews from "./components/Reviews";



const images = Array.from({ length: 12 }).map((_, i) => `/img${i + 1}.jpg`);


export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tab, setTab] = useState("home");
  const [selected, setSelected] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  const whatsappMsg =
    "Olá! Vim pelo site e quero mais informações sobre as tele mensagens 💖";

  const openWhats = (msg: string) => {
    window.open(
      `https://wa.me/5551984357011?text=${encodeURIComponent(msg)}`
    );
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!selected) return;

      const index = images.indexOf(selected);

      if (e.key === "Escape") setSelected(null);

      if (e.key === "ArrowRight") {
        const next = (index + 1) % images.length;
        setSelected(images[next]);
      }

      if (e.key === "ArrowLeft") {
        const prev = (index - 1 + images.length) % images.length;
        setSelected(images[prev]);
      }
    };

    window.addEventListener("keydown", handleKey);


    return () => window.removeEventListener("keydown", handleKey);

  }, [selected]);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev: number) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isHovered]);

  useEffect(() => {
    const handleHeaderState = () => {
      const isDesktop = window.innerWidth > 768;
      setIsHeaderCompact(isDesktop && window.scrollY > 60);
    };

    handleHeaderState();
    window.addEventListener("scroll", handleHeaderState, { passive: true });
    window.addEventListener("resize", handleHeaderState);

    return () => {
      window.removeEventListener("scroll", handleHeaderState);
      window.removeEventListener("resize", handleHeaderState);
    };
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-fuchsia-900 text-white">

      {/* HEADER */}
      <header className={`sticky top-0 z-50 backdrop-blur bg-black/40 site-header ${isHeaderCompact ? "is-compact" : ""}`}>
        <div className="px-4 py-[1.15rem] flex justify-between items-center max-w-5xl mx-auto">

          <h1
            onClick={() => {
              setTab("home");
              goToTop();
            }}
            className="text-3xl font-bold cursor-pointer hover:opacity-80 transition logo-title"
          >
            <img
              src="/Logo Melody.png"
              alt="Melody Mensagens"
              className="logo-image"
            />
          </h1>

          <nav className="flex gap-4 md:gap-6 text-sm md:text-base">
            <button
              onClick={() => {
                setTab("home");
                goToTop();
              }}
            >
              Início
            </button>

            <button
              onClick={() => {
                setTab("texts");
                goToTop();
              }}
            >
              Textos
            </button>

            <button
              onClick={() => {
                setTab("packages");
                goToTop();
              }}
            >
              Serviços
            </button>
          </nav>

        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-4 pt-4 md:pt-5 space-y-10">

        {/* HOME */}
        {tab === "home" && (
          <div>
            <div className="top-branding">
            
              <h2 className="top-branding-title">Melody Mensagens</h2>
              <p className="top-branding-kicker">Telemensagens em Porto Alegre e região</p>
            </div>

            {/* HERO */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-80 flex items-center justify-center rounded-xl overflow-hidden hero-banner"
            >

              {/* IMAGEM */}
              <div className="absolute inset-0">
                <img
                  src="/carro.jpg"
                  className="w-full h-full object-cover opacity-50"
                />
              </div>

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* CONTEÚDO */}
              <div className="relative z-10 w-full flex flex-col items-center text-center px-4 hero-content">

                <h2 className="text-3xl md:text-5xl font-bold text-center hero-title">
                  Surpreenda quem você ama
                </h2>

                <p className="mt-3 opacity-80 max-w-xl text-center hero-subtitle">
                  Mensagens ao vivo, emocionantes e inesquecíveis em Porto Alegre e região.
                </p>

                <button
                  onClick={() => openWhats("Quero fazer uma surpresa especial  ")}
                  className="mt-6 bg-green-500 px-6 py-3 rounded-full text-lg font-semibold hover:scale-105 transition shadow-lg hero-cta"
                >
                  Falar no WhatsApp
                </button>

              </div>
            </motion.div>
            {/* DESCRIÇÃO */}
            <div className="mt-6 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold">Bem Vindo(a) </h2>
              <p className="text-sm mt-3 opacity-80">
                Mensagens ao vivo, declarações, aniversários e surpresas
                inesquecíveis feitas com emoção e criatividade.
              </p>
            </div>

            {/* GALERIA */}
            {/* GALERIA CARROSSEL */}
            <div className="mt-10 relative flex items-center justify-center">

              {/* BOTÃO ESQUERDA */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev: number) => (prev - 1 + images.length) % images.length);
                }}
                className="absolute left-0 z-20 text-3xl px-4"
              >
                ←
              </button>

              {/* CARROSSEL */}
              <div
                className="relative w-full max-w-4xl h-80 flex items-center justify-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >

                {images.map((img, i) => {
                  const centerIndex = currentIndex;

                  const offset = i - centerIndex;

                  // LOOP infinito
                  const position =
                    offset === 0
                      ? "center"
                      : offset === -1 || offset === images.length - 1
                        ? "left"
                        : offset === 1 || offset === -(images.length - 1)
                          ? "right"
                          : "hidden";

                  if (position === "hidden") return null;

                  return (
                    <motion.img
                      key={img}
                      src={img}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(img); // 👈 só aqui abre o modal
                      }}
                      className={`absolute rounded-xl cursor-pointer transition-all duration-500
            ${position === "center"
                          ? "w-80 h-52 z-20 scale-110 shadow-2xl border-2 border-white/20"
                          : "w-60 h-40 opacity-60 scale-90"
                        }
          `}
                      style={{
                        left: "50%",
                        transform:
                          position === "center"
                            ? "translateX(-50%)"
                            : position === "left"
                              ? "translateX(-120%) scale(0.9)"
                              : "translateX(20%) scale(0.9)",
                      }}
                    />
                  );
                })}
              </div>

              {/* BOTÃO DIREITA */}
              <button
                onClick={(_e) => {
                  _e.stopPropagation();
                  setCurrentIndex((prev: number) => (prev + 1 + images.length) % images.length);
                }}
                className="absolute right-0 z-20 text-3xl px-4"
              >
                →
              </button>
            </div>

            {/* QUEM SOMOS */}
            <div className="mt-12 bg-white/10 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-center mb-2">
                O começo de tudo
              </h2>
              <h3 className="text-center text-lg mb-4 opacity-80">
                Quem Somos?
              </h3>

              <p className="text-sm whitespace-pre-line text-center opacity-80">
                {`A Melody Mensagens é uma empresa de telemensagens que está no ramo desde os anos 2000, fazendo mensagens ao vivo, loucuras de amor, declarações, formaturas, aniversários e todo tipo de homenagens.

Atuamos em Porto Alegre, Viamão e arredores, sempre buscando inovação para emocionar e surpreender quem você ama.

Nosso carro de som transmite emoções únicas com locução profissional, músicas e fotos, criando experiências inesquecíveis com show de luzes e som de alta qualidade.

Atendemos com carinho e profissionalismo pelo WhatsApp (51) 98435-7011, ligações e redes sociais @melodymensagens.

A todos que já viveram essa experiência conosco, nosso muito obrigado! E para quem ainda não conhece, fica o convite: estamos prontos para emocionar você.`}
              </p>
            </div>

            {/* MODAL */}
            <AnimatePresence>
              {selected && (
                <motion.div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-6 right-6 text-3xl z-[999] bg-black/50 p-3 rounded-full"
                  >
                    ✕
                  </button>

                  <button
                    onClick={() => {
                      const index = images.indexOf(selected);
                      setSelected(images[(index - 1 + images.length) % images.length]);
                    }}
                    className="absolute left-6 text-4xl"
                  >
                    ←
                  </button>

                  <button
                    onClick={() => {
                      const index = images.indexOf(selected);
                      setSelected(images[(index + 1) % images.length]);
                    }}
                    className="absolute right-6 text-4xl"
                  >
                    →
                  </button>

                  <motion.img
                    key={selected}
                    src={selected}
                    drag="x"
                    transition={{ duration: 0.4 }}
                    onDragEnd={(_e, info) => {
                      const index = images.indexOf(selected);
                      if (info.offset.x < -100)
                        setSelected(images[(index + 1) % images.length]);
                      if (info.offset.x > 100)
                        setSelected(images[(index - 1 + images.length) % images.length]);
                    }}
                    className="max-w-[90%] max-h-[80%] rounded-xl"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="mt-16 text-center">
              <h2 className="text-2xl md:text-3xl font-bold">
                Momentos que Marcaram — Veja o que nossos Clientes dizem
              </h2>
            </div>

            <Reviews />


          </div>


        )}

        {/* SERVIÇOS */}
        {tab === "packages" && (
          <div className="space-y-16">
            <h2 className="text-3xl font-bold text-center">
              Nossos Serviços 💼
            </h2>

            {[
              {
                title: "A Melhor experiencia",
                img: "/ex.jpg",
                desc: "Melody Mensagens é tradição, trazendo o que há de melhor, transformando momentos e celebrando o amor em alto e bom som! Conte conosco em aniversários, declarações, formaturas, pedidos de casamento, bodas, despedidas e muuito mais!",

              },
              {
                title: "Pacote Digital",
                img: "/digital.jpg",
                desc: `Tudo que é gravado na tela, áudio e as fotos tiradas, serão registradas por nós e você irá receber em primeira mão, direto para o seu celular após a mensagem.`,
              },
              {
                title: "Fotos Tiradas ao Vivo",
                img: "/fotos.jpg",
                desc: `O locutor(a) tira fotos em todas as mensagens e estas passam na hora na tela para que vocês confiram.`,
              },
              {
                title: "Vídeo Clipe de Fotos",
                img: "/video.jpg",
                desc: `Envie até 40 fotos com momentos marcantes do homenageado(a), e elas serão exibidas em um vídeo clipe na tela com as músicas escolhidas por você.`,
              },
              {
                title: "DJ e Locução ao Vivo",
                img: "/dj.jpg",
                desc: `Nosso espetáculo base! Com música, locução, show de luzes e tela, criamos uma experiência inesquecível para sua celebração.`,
              },
              {
                title: "Texto Emoldurado (Opcional)",
                img: "/quadro.jpg",
                desc: `Escolha uma foto e um texto especial. Nós imprimimos em papel fotográfico e entregamos como lembrança ao final da homenagem.`,
              },
              {
                title: "Sputinick",
                img: "/fogo.jpg",
                desc: `Um efeito especial com fogo de chão que traz brilho, elegância e impacto visual para sua surpresa.`,
              },
              {
                title: "Buquê de Bombons (Opcional)",
                img: "/bombom.jpg",
                desc: `Adicione um delicioso buquê de bombons e torne o momento ainda mais doce.`,
              },
              {
                title: "Buquê de Flores (Opcional)",
                img: "/flores.jpg",
                desc: `Escolha a cor das rosas e nós entregamos um lindo buquê durante a homenagem.`,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="w-48 h-48 rounded-full overflow-hidden">
                  <img src={item.img} className="w-full h-full object-cover" />
                </div>

                <div className="text-center md:text-left max-w-xl">
                  <h3 className="text-2xl font-bold text-fuchsia-400 mb-2">
                    {item.title}
                  </h3>
                  <div className="w-10 h-[2px] bg-white/40 mb-4 mx-auto md:mx-0"></div>
                  <p className="text-sm opacity-80">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === "texts" && <Texts />}
      </main>
      {/* REDES SOCIAIS */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-6">
          Nos siga nas redes sociais 💖
        </h2>

        <div className="flex flex-col items-center gap-4">

          {/* INSTAGRAM */}
          <a
            href="https://www.instagram.com/melodymensagens?igsh=MWVvN2t2ZnI3cXZ5NA=="
            target="_blank"
            className="flex items-center gap-4 bg-white/10 px-6 py-3 rounded-xl hover:scale-105 transition "
          >
            <img src="/instagram.png" className="w-8 h-8" />
            <span className="text-lg">Instagram</span>
          </a>

          {/* FACEBOOK */}
          <a
            href="https://www.facebook.com/share/18YwZZrspA/"
            target="_blank"
            className="flex items-center gap-4 bg-white/10 px-6 py-3 rounded-xl hover:scale-105 transition"
          >
            <img src="/facebook.png" className="w-8 h-8" />
            <span className="text-lg">Facebook</span>
          </a>

          {/* WHATSAPP */}
          <a
            href="https://wa.me/5551984357011"
            target="_blank"
            className="flex items-center gap-4 bg-white/10 px-6 py-3 rounded-xl hover:scale-105 transition"
          >
            <img src="/whatsapp.png" className="w-8 h-8" />
            <span className="text-lg">WhatsApp</span>
          </a>

        </div>
      </div>

      {/* WHATS */}
      <a
        href={`https://wa.me/5551984357011?text=${encodeURIComponent(whatsappMsg)}`}
        className="fixed bottom-6 right-6 flex items-center gap-2 bg-green-500 px-4 py-3 rounded-full shadow-xl hover:scale-110 transition z-50"
      >
        <img src="/whatsapp.png" className="w-5 h-5" />
        <span className="font-semibold hidden md:block">WhatsApp</span>
      </a>
      <div className="mt-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          Pronto para emocionar alguém especial? 💖

        </h2>
      </div>

      <footer className="p-4 text-center border-t border-white/20 mt-6">

        Porto Alegre • (51) 98435-7011
      </footer>
      {/* FOOTER COM FRASE */}
      <footer className="mt-16 bg-gradient-to-b from-transparent via-white to-white text-black py-10 px-4 text-center">

        {/* ÍCONE */}
        <div className="flex justify-center mb-4">
          <img
            src="/cruz.png"
            alt="ícone"
            className="w-8 h-8 opacity-80"
          />
        </div>

        {/* FRASE */}
        <p className="italic text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          “E desceu a chuva, e correram rios, e assopraram ventos, e combateram aquela casa, e não caiu, porque estava edificada sobre a rocha.”
        </p>

        {/* REFERÊNCIA */}
        <p className="mt-4 font-bold text-sm tracking-wide">
          Mateus 7, 25
        </p>

      </footer>
    </div>
  );
}
