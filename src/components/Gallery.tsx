import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Gallery() {
  const [selected, setSelected] = useState<string | null>(null)

  const images = Array.from({ length: 12 }, (_, i) => `/img${i + 1}.jpg`)

  return (
    <div className="px-4">
      <div className="grid grid-cols-3 md:grid-cols-4 gap-1">
        {images.map((img, i) => (
          <div key={i} onClick={() => setSelected(img)}>
            <img src={img} className="w-full h-32 object-cover" />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 bg-black/90 flex items-center justify-center" onClick={() => setSelected(null)}>
            <img src={selected} className="max-w-[90%] max-h-[80%]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

