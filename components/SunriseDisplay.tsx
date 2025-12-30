'use client'

import { motion } from 'framer-motion'

interface SunriseDisplayProps {
  sunrise: {
    imageUrl: string
    intention: string
    poem: string
  }
  onReset: () => void
}

export function SunriseDisplay({ sunrise, onReset }: SunriseDisplayProps) {
  const shareText = `My first sunrise of 2025: "${sunrise.intention}" - What does yours look like?`
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Hatsuhinode - First Sunrise 2025',
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

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = sunrise.imageUrl
    link.download = `hatsuhinode-2025-${sunrise.intention.toLowerCase().replace(/\s+/g, '-')}.png`
    link.click()
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-lg mx-auto">
        {/* Placeholder for AI-generated image */}
        <div className="aspect-square bg-gradient-to-b from-indigo-900 via-purple-700 to-orange-500 flex items-center justify-center">
          <div className="sun-orb w-32 h-32 rounded-full" />
        </div>

        {/* Overlay with intention */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
          <p className="text-white text-xl font-medium">
            {sunrise.intention}
          </p>
          <p className="text-white/70 text-sm mt-1">
            2025
          </p>
        </div>
      </div>

      {sunrise.poem && (
        <p className="text-white/80 italic max-w-md mx-auto">
          "{sunrise.poem}"
        </p>
      )}

      <div className="flex gap-4 justify-center flex-wrap">
        <motion.button
          onClick={handleDownload}
          className="py-2 px-6 rounded-full bg-white text-purple-900 font-medium
                     hover:bg-white/90 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Download
        </motion.button>
        <motion.button
          onClick={handleShare}
          className="py-2 px-6 rounded-full bg-gradient-to-r from-orange-500 to-pink-500
                     text-white font-medium hover:from-orange-400 hover:to-pink-400
                     transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Share
        </motion.button>
        <motion.button
          onClick={onReset}
          className="py-2 px-6 rounded-full border border-white/30 text-white
                     hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Another
        </motion.button>
      </div>
    </motion.div>
  )
}
