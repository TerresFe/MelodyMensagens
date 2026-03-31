import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <div className="relative h-[75vh] flex items-center justify-center text-center overflow-hidden">
      <img src="/hero.jpg" className="absolute w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-5xl font-bold text-white drop-shadow-lg">A surpresa perfeita começa aqui 💖</h2>
        <p className="mt-4">Mais de 30 anos criando emoções</p>
      </motion.div>
    </div>
  )
}
