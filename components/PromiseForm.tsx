'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface PromiseFormProps {
  onSubmit: (data: { commitment: string; name: string; witness?: string }) => void
}

export function PromiseForm({ onSubmit }: PromiseFormProps) {
  const [commitment, setCommitment] = useState('')
  const [name, setName] = useState('')
  const [witness, setWitness] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (commitment.trim() && name.trim()) {
      onSubmit({
        commitment: commitment.trim(),
        name: name.trim(),
        witness: witness.trim() || undefined,
      })
    }
  }

  const suggestions = [
    'Ship one project every month',
    'Take more breaks in nature',
    'Learn something new every week',
    'Be more present with loved ones',
  ]

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
      className="promise-card rounded-2xl p-8 space-y-6"
    >
      <div className="space-y-2">
        <label htmlFor="commitment" className="block text-sm font-medium text-slate-700">
          I promise to...
        </label>
        <textarea
          id="commitment"
          value={commitment}
          onChange={(e) => setCommitment(e.target.value)}
          placeholder="Write your commitment for 2025..."
          className="w-full p-4 rounded-lg border border-slate-200 bg-white
                     focus:ring-2 focus:ring-slate-400 focus:border-transparent
                     min-h-[100px] resize-none"
          required
        />
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setCommitment(suggestion)}
              className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600
                         hover:bg-slate-200 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Signed by
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full p-3 rounded-lg border border-slate-200 bg-white
                       focus:ring-2 focus:ring-slate-400 focus:border-transparent"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="witness" className="block text-sm font-medium text-slate-700">
            Witnessed by (optional)
          </label>
          <input
            id="witness"
            type="text"
            value={witness}
            onChange={(e) => setWitness(e.target.value)}
            placeholder="A friend or @handle"
            className="w-full p-3 rounded-lg border border-slate-200 bg-white
                       focus:ring-2 focus:ring-slate-400 focus:border-transparent"
          />
        </div>
      </div>

      <motion.button
        type="submit"
        className="w-full py-3 px-6 rounded-lg bg-slate-800 text-white font-medium
                   hover:bg-slate-700 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Seal My Promise
      </motion.button>
    </motion.form>
  )
}
