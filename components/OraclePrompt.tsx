'use client'

import { motion } from 'framer-motion'

interface OraclePromptProps {
  onSeekFortune: () => void
  loading: boolean
  isSubmerging: boolean
}

export function OraclePrompt({ onSeekFortune, loading, isSubmerging }: OraclePromptProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: 100 }}
      className="space-y-8"
    >
      <div className="text-slate-300 space-y-4 max-w-md mx-auto">
        <p>
          The ancient waters hold the wisdom of a thousand winters.
        </p>
        <p>
          Close your eyes. Take a breath. Let the warmth embrace you.
        </p>
        <p>
          When you are ready, submerge yourself and receive your fortune for 2025.
        </p>
      </div>

      <motion.button
        onClick={onSeekFortune}
        disabled={loading}
        className="relative px-12 py-4 rounded-full bg-gradient-to-r from-amber-600 to-amber-500
                   text-white font-medium text-lg
                   hover:from-amber-500 hover:to-amber-400
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-300 mystical-glow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSubmerging ? (
          <span className="flex items-center gap-2">
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Submerging...
            </motion.span>
          </span>
        ) : (
          'Enter the Waters'
        )}
      </motion.button>

      {isSubmerging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-amber-200 italic"
        >
          The oracle stirs...
        </motion.div>
      )}
    </motion.div>
  )
}
