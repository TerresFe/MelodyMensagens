import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { PointerEvent } from "react";

const services = [
  { title: "A melhor experiência", img: "/ex.jpg", tag: "Experiência completa", desc: "Tradição, música, luzes e emoção para aniversários, declarações, formaturas, pedidos de casamento, bodas e muito mais." },
  { title: "Pacote digital", img: "/digital.jpg", tag: "Guarde para sempre", desc: "Receba no celular as fotos, o áudio e os registros feitos durante a homenagem." },
  { title: "Fotos ao vivo", img: "/fotos.jpg", tag: "Registro instantâneo", desc: "Registramos a reação em cada mensagem e as fotos aparecem na tela durante a surpresa." },
  { title: "Videoclipe de fotos", img: "/video.jpg", tag: "Sua história na tela", desc: "Envie até 40 fotos marcantes para criarmos um clipe exibido com as músicas escolhidas por você." },
  { title: "DJ e locução ao vivo", img: "/dj.jpg", tag: "O espetáculo", desc: "Locução profissional, música, show de luzes e tela em uma experiência realmente inesquecível." },
  { title: "Texto emoldurado", img: "/quadro.jpg", tag: "Opcional", desc: "Uma foto e um texto especial impressos em papel fotográfico para entregar ao final da homenagem." },
  { title: "Sputnik", img: "/fogo.jpg", tag: "Efeito especial", desc: "O efeito de fogo de chão acrescenta brilho, elegância e impacto visual ao grande momento." },
  { title: "Buquê de bombons", img: "/bombom.jpg", tag: "Opcional", desc: "Um delicioso buquê de bombons para deixar a surpresa ainda mais doce." },
  { title: "Buquê de flores", img: "/flores.jpg", tag: "Opcional", desc: "Escolha a cor das rosas e nós entregamos um lindo buquê durante a homenagem." },
] as const;

interface ServiceCardProps {
  service: (typeof services)[number];
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 180, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 180, damping: 20 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);

  const handleMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left) / bounds.width - 0.5);
    y.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  return (
    <motion.article
      className="service-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.5 }}
      onPointerMove={handleMove}
      onPointerLeave={() => { x.set(0); y.set(0); }}
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
    >
      <div className="service-image">
        <img src={service.img} alt={service.title} loading="lazy" />
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="service-copy">
        <small>{service.tag}</small>
        <h3>{service.title}</h3>
        <p>{service.desc}</p>
      </div>
    </motion.article>
  );
}

export default function Packages() {
  return (
    <section className="page-section" aria-labelledby="services-title">
      <div className="section-heading page-heading">
        <span className="eyebrow">Tudo para o grande momento</span>
        <h1 id="services-title">Experiências pensadas em cada detalhe</h1>
        <p>Combine música, imagem, presentes e efeitos para criar uma surpresa com a sua história.</p>
      </div>
      <div className="services-grid">
        {services.map((service, index) => <ServiceCard key={service.title} service={service} index={index} />)}
      </div>
    </section>
  );
}
