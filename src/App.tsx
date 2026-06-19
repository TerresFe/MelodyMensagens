import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import JourneyCurve from "./components/JourneyCurve";
import JourneyStep from "./components/JourneyStep";
import Reviews from "./components/Reviews";
import Packages from "./pages/Packages";
import Texts from "./pages/Texts";

type Tab = "home" | "texts" | "packages";

const whatsappNumber = "5551984357011";

function openWhatsApp(message: string) {
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}

function Home() {
  return (
    <>
      <Hero onContact={() => openWhatsApp("Olá! Vim pelo site e quero criar uma surpresa especial 💖")} />

      <JourneyStep side="left" label="01 · Bem-vindo">
        <section className="intro-section section-block" aria-labelledby="intro-title">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <span className="eyebrow">Bem-vindo à Melody</span>
          <h2 id="intro-title">Você imagina a surpresa.<br />Nós damos vida a ela.</h2>
          <p>Declarações, aniversários e homenagens criadas com emoção, criatividade e aquele friozinho bom na barriga.</p>
        </motion.div>
        <div className="experience-strip glass-panel">
          <div><strong>25+</strong><span>anos emocionando</span></div>
          <div><strong>100%</strong><span>personalizado</span></div>
          <div><strong>Ao vivo</strong><span>música e locução</span></div>
        </div>
        </section>
      </JourneyStep>

      <JourneyStep side="right" label="02 · Momentos">
        <Gallery />
      </JourneyStep>

      <JourneyStep side="left" label="03 · Nossa história">
        <section className="story-section section-block" aria-labelledby="story-title">
        <motion.div
          className="story-card glass-panel"
          initial={{ opacity: 0, rotateX: 8, y: 30 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
        >
          <div className="story-mark" aria-hidden="true">M</div>
          <div className="story-content">
            <span className="eyebrow">Nossa história</span>
            <h2 id="story-title">O começo de tudo</h2>
            <p>A Melody Mensagens nasceu nos anos 2000 com uma ideia simples e poderosa: transformar palavras em lembranças. Desde então, levamos mensagens ao vivo, música e emoção a Porto Alegre, Viamão e arredores.</p>
            <p>Nosso carro transmite locução profissional, fotos, músicas e um show de luzes que transforma cada homenagem em uma experiência única — sempre com carinho e profissionalismo.</p>
            <button className="text-button" onClick={() => openWhatsApp("Olá! Quero conhecer melhor a experiência da Melody Mensagens.")}>Conversar com a Melody <span aria-hidden="true">↗</span></button>
          </div>
        </motion.div>
        </section>
      </JourneyStep>

      <JourneyStep side="right" label="04 · Memórias">
        <section className="reviews-section section-block" aria-labelledby="reviews-title">
        <div className="section-heading">
          <span className="eyebrow">Quem viveu, conta</span>
          <h2 id="reviews-title">Momentos que deixaram marca</h2>
          <p>Histórias reais de quem escolheu transformar carinho em espetáculo.</p>
        </div>
        <Reviews />
        </section>
      </JourneyStep>
    </>
  );
}

export default function App() {
  const [tab, setTab] = useState<Tab>("home");
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  const journeyRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress: pageScrollYProgress } = useScroll();
  const { scrollYProgress: journeyScrollYProgress } = useScroll({
    target: journeyRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(pageScrollYProgress, { stiffness: 110, damping: 25, restDelta: 0.001 });
  const progressCarPosition = useTransform(progress, (value) => `${Math.min(1, Math.max(0, value)) * 100}%`);

  useEffect(() => {
    const updateHeader = () => setIsHeaderCompact(window.scrollY > 42);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  const changeTab = (nextTab: Tab) => {
    setTab(nextTab);
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <div className="site-shell">
      <div className="scroll-progress-track" aria-hidden="true">
        <motion.div className="scroll-progress" style={{ scaleX: progress }} />
        <motion.img className="scroll-progress-car" src="/Carro Logo.png" alt="" style={{ left: progressCarPosition }} />
      </div>
      <div className="ambient-background" aria-hidden="true">
        <div className="ambient-orb ambient-one" />
        <div className="ambient-orb ambient-two" />
        <div className="noise" />
      </div>

      <header className={`site-header ${isHeaderCompact ? "is-compact" : ""}`}>
        <div className="header-inner">
          <button className="brand-button" onClick={() => changeTab("home")} aria-label="Ir para o início">
            <img src="/Logo Melody.png" alt="Melody Mensagens" className="logo-image" />
          </button>
          <nav className="main-nav" aria-label="Navegação principal">
            {([
              ["home", "Início"],
              ["texts", "Textos"],
              ["packages", "Serviços"],
            ] as const).map(([value, label]) => (
              <button key={value} className={tab === value ? "active" : ""} onClick={() => changeTab(value)}>
                {label}
                {tab === value && <motion.span layoutId="nav-indicator" />}
              </button>
            ))}
          </nav>
          <button className="header-cta" onClick={() => openWhatsApp("Olá! Vim pelo site e quero mais informações sobre as telemensagens 💖")}>
            <span>Falar agora</span><span aria-hidden="true">↗</span>
          </button>
        </div>
      </header>

      <div ref={journeyRef} className={tab === "home" ? "home-journey" : undefined}>
        {tab === "home" && <JourneyCurve progress={journeyScrollYProgress} />}

        <main className="main-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, filter: "blur(7px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, filter: "blur(5px)" }}
              transition={{ duration: reduceMotion ? 0.15 : 0.4 }}
            >
              {tab === "home" && <Home />}
              {tab === "texts" && <Texts />}
              {tab === "packages" && <Packages />}
            </motion.div>
          </AnimatePresence>
        </main>

        <section className="social-section section-block" aria-labelledby="social-title">
          <div>
            <span className="eyebrow">Continue perto</span>
            <h2 id="social-title">Siga a Melody</h2>
          </div>
          <div className="social-links">
            <a href="https://www.instagram.com/melodymensagens" target="_blank" rel="noreferrer"><img src="/instagram.png" alt="" />Instagram <span>↗</span></a>
            <a href="https://www.facebook.com/share/18YwZZrspA/" target="_blank" rel="noreferrer"><img src="/facebook.png" alt="" />Facebook <span>↗</span></a>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer"><img src="/whatsapp.png" alt="" />WhatsApp <span>↗</span></a>
          </div>
        </section>

        <section className="final-cta">
          <div className="final-cta-glow" aria-hidden="true" />
          <span className="eyebrow">O próximo momento pode ser seu</span>
          <h2>Pronto para emocionar<br />alguém especial?</h2>
          <button className="primary-button" onClick={() => openWhatsApp("Olá! Quero planejar uma surpresa inesquecível com a Melody 💖")}>Planejar minha surpresa <span>→</span></button>
        </section>

        <footer className="site-footer">
          <div><strong>Melody Mensagens</strong><span>Porto Alegre e região • (51) 98435-7011</span></div>
          <blockquote>“E desceu a chuva, e correram rios, e assopraram ventos, e combateram aquela casa, e não caiu, porque estava edificada sobre a rocha.” <cite>Mateus 7:25</cite></blockquote>
        </footer>
      </div>

      <motion.a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Vim pelo site e quero mais informações sobre as telemensagens 💖")}`}
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp"
        whileHover={{ scale: 1.06, y: -3 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Conversar pelo WhatsApp"
      >
        <span className="whatsapp-pulse" aria-hidden="true" />
        <img src="/whatsapp.png" alt="" />
        <span>WhatsApp</span>
      </motion.a>
    </div>
  );
}
