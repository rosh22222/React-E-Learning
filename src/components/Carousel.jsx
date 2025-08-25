import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    title: 'Design Excellence',
    subtitle: 'UX/UI that delights and converts.',
    img: 'UI UX.jpg',
    
  },
  {
    title: 'Java FullStack',
    subtitle: 'SQL, Backend , ML — step by step.',
    img: 'JAVA[1].png', // 👈 example of another local image
  },
  {
    title: 'Digital Marketing',
    subtitle: 'Hands-on projects, real-world skills.',
    img: 'Digital Marketing.jpg', // 👈 local image from public folder
  },
  {
    title: 'Prompt Engineer',
    subtitle: 'Generative AI Models.',
    img: 'prompt1.jpg',
  },
  {
    title: 'Devops Built it & Run it',
    subtitle: 'Culture and Principals.',
    img: 'Devops.jpg', // 👈 local image from public folder
  }
  
]

export default function Carousel() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % slides.length), 5000)
    return () => clearInterval(id)
  }, [])

  const current = slides[idx]

  return (
    <div className="relative h-[420px] sm:h-[520px] lg:h-[560px] overflow-hidden rounded-3xl shadow-soft">
      <AnimatePresence mode="wait">
        <motion.img
          key={current.img}
          src={current.img}
          alt={current.title}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 text-white">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl sm:text-5xl font-black"
        >
          {current.title}
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-lg sm:text-2xl opacity-90"
        >
          {current.subtitle}
        </motion.p>
        <div className="mt-6 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-2 w-6 rounded-full ${i === idx ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
