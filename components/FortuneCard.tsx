'use client'

import { motion } from 'framer-motion'

interface FortuneCardProps {
  fortune: {
    fortune: string
    element: string
    advice: string
    luckyNumber: number
  }
  onReset: () => void
}

export function FortuneCard({ fortune, onReset }: FortuneCardProps) {
  const shareText = `The Onsen Oracle spoke: "${fortune.fortune}" My element is ${fortune.element}. What's your 2025 fortune?`
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'The Onsen Oracle',
        text: shareText,
        url: shareUrl,
      })
    } else {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        '_blank'
      )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -20 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="space-y-6"
    >
      <div className="fortune-card rounded-2xl p-8 text-slate-800 max-w-md mx-auto">
        <div className="text-sm uppercase tracking-widest text-amber-700 mb-4">
          Your 2025 Fortune
        </div>

        <blockquote className="text-2xl font-medium leading-relaxed mb-6">
          "{fortune.fortune}"
        </blockquote>

        <div className="grid grid-cols-2 gap-4 text-sm border-t border-amber-300 pt-4">
          <div>
            <div className="text-amber-600 uppercase tracking-wide">Element</div>
            <div className="font-medium">{fortune.element}</div>
          </div>
          <div>
            <div className="text-amber-600 uppercase tracking-wide">Lucky Number</div>
            <div className="font-medium">{fortune.luckyNumber}</div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-amber-300">
          <div className="text-amber-600 uppercase tracking-wide text-sm">Guidance</div>
          <p className="text-sm mt-1">{fortune.advice}</p>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <motion.button
          onClick={handleShare}
          className="py-2 px-6 rounded-full bg-amber-500 text-white font-medium
                     hover:bg-amber-400 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Share Fortune
        </motion.button>
        <motion.button
          onClick={onReset}
          className="py-2 px-6 rounded-full border border-slate-500 text-slate-300
                     hover:bg-slate-800 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Seek Again
        </motion.button>
      </div>
    </motion.div>
  )
}
