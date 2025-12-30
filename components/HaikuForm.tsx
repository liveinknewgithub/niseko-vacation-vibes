'use client'

import { useState } from 'react'

interface HaikuFormProps {
  onSubmit: (vibe: string) => void
  loading: boolean
}

export function HaikuForm({ onSubmit, loading }: HaikuFormProps) {
  const [vibe, setVibe] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (vibe.trim()) {
      onSubmit(vibe)
    }
  }

  const suggestions = [
    'Adventure',
    'Peace',
    'Growth',
    'Joy',
    'Freedom',
    'Love',
    'Courage',
    'Balance',
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="haiku-card rounded-2xl p-8 space-y-4">
        <label htmlFor="vibe" className="block text-lg text-slate-700">
          What's your 2025 vibe?
        </label>

        <input
          id="vibe"
          type="text"
          value={vibe}
          onChange={(e) => setVibe(e.target.value)}
          placeholder="Enter a word or feeling..."
          className="w-full p-4 text-center text-xl border-b-2 border-slate-200
                     focus:border-slate-400 outline-none bg-transparent
                     placeholder:text-slate-400"
          disabled={loading}
        />

        <div className="flex flex-wrap gap-2 justify-center pt-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setVibe(suggestion)}
              className="px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-600
                         hover:bg-slate-200 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !vibe.trim()}
        className="w-full py-4 rounded-xl bg-white text-slate-800 font-medium text-lg
                   hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors shadow-lg"
      >
        {loading ? 'Composing...' : 'Generate Haiku'}
      </button>
    </form>
  )
}
