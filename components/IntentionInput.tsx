'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface IntentionInputProps {
  onSubmit: (intention: string) => void
  loading: boolean
}

export function IntentionInput({ onSubmit, loading }: IntentionInputProps) {
  const [intention, setIntention] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (intention.trim()) {
      onSubmit(intention)
    }
  }

  const suggestions = [
    'New beginnings',
    'Inner peace',
    'Adventure',
    'Growth',
    'Connection',
    'Creativity',
  ]

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <p className="text-white/80 max-w-md mx-auto">
        In Japan, people watch the first sunrise to set their intentions for the year.
        What word or phrase represents your 2025?
      </p>

      <input
        type="text"
        value={intention}
        onChange={(e) => setIntention(e.target.value)}
        placeholder="Enter your intention..."
        className="w-full max-w-sm mx-auto block px-6 py-4 rounded-full
                   bg-white/10 backdrop-blur border border-white/20
                   text-white text-center text-lg
                   placeholder:text-white/50
                   focus:ring-2 focus:ring-orange-400 focus:border-transparent
                   outline-none"
        disabled={loading}
      />

      <div className="flex flex-wrap gap-2 justify-center max-w-md mx-auto">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => setIntention(suggestion)}
            className="text-sm px-3 py-1 rounded-full bg-white/10 text-white/80
                       hover:bg-white/20 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <motion.button
        type="submit"
        disabled={loading || !intention.trim()}
        className="px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500
                   text-white font-medium text-lg
                   hover:from-orange-400 hover:to-pink-400
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {loading ? 'Creating your sunrise...' : 'Generate My Sunrise'}
      </motion.button>
    </motion.form>
  )
}
