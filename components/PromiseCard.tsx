'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'

interface PromiseCardProps {
  promise: {
    commitment: string
    name: string
    witness?: string
    date: string
  }
  onReset: () => void
}

export function PromiseCard({ promise, onReset }: PromiseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const shareText = `My 2025 Powder Promise: "${promise.commitment}" - What's yours?`
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Powder Promise',
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

  const handleDownload = async () => {
    // TODO: Use html-to-image to capture the card
    // For now, just alert
    alert('Download feature coming soon!')
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="space-y-6"
    >
      <div
        ref={cardRef}
        className="promise-card rounded-2xl p-8 relative overflow-hidden"
      >
        {/* Decorative header */}
        <div className="text-center mb-6 pb-6 border-b border-slate-200">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-2">
            Certificate of Commitment
          </div>
          <div className="font-display text-2xl font-bold text-slate-800">
            Powder Promise
          </div>
          <div className="text-sm text-slate-500">2025</div>
        </div>

        {/* Promise content */}
        <div className="text-center space-y-4 mb-6">
          <p className="text-sm text-slate-500 uppercase tracking-wide">
            I solemnly promise to
          </p>
          <blockquote className="text-xl font-display text-slate-800 leading-relaxed">
            "{promise.commitment}"
          </blockquote>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-200">
          <div className="text-center">
            <div className="font-display text-lg text-slate-800 italic mb-1">
              {promise.name}
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-wide">
              Signed
            </div>
          </div>
          <div className="text-center">
            <div className="font-display text-lg text-slate-800 italic mb-1">
              {promise.witness || '—'}
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-wide">
              Witnessed
            </div>
          </div>
        </div>

        {/* Date and seal */}
        <div className="flex justify-between items-end mt-6">
          <div className="text-sm text-slate-500">{promise.date}</div>
          <div className="seal w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xs">
            2025
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <motion.button
          onClick={handleDownload}
          className="py-2 px-6 rounded-lg bg-slate-800 text-white font-medium
                     hover:bg-slate-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Download
        </motion.button>
        <motion.button
          onClick={handleShare}
          className="py-2 px-6 rounded-lg bg-red-600 text-white font-medium
                     hover:bg-red-500 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Share
        </motion.button>
        <motion.button
          onClick={onReset}
          className="py-2 px-6 rounded-lg border border-slate-300 text-slate-600
                     hover:bg-slate-100 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          New Promise
        </motion.button>
      </div>
    </motion.div>
  )
}
