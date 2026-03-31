import { motion } from 'framer-motion'

export default function WhatsButton() {
  return (
    <motion.a
      href="https://wa.me/5551984357011"
      className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 1 }}
    >
      💬
    </motion.a>
  )
}

