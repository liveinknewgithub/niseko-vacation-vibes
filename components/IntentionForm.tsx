'use client'

import { useState } from 'react'

interface IntentionFormProps {
  onSubmit: (intention: string) => void
  loading: boolean
}

export function IntentionForm({ onSubmit, loading }: IntentionFormProps) {
  const [intention, setIntention] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (intention.trim()) {
      onSubmit(intention)
    }
  }

  const suggestions = [
    'Find balance between work and adventure',
    'Build something meaningful',
    'Embrace uncertainty with courage',
    'Connect deeply with others',
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="intention" className="block text-lg">
          What do you want 2025 to be about?
        </label>
        <textarea
          id="intention"
          value={intention}
          onChange={(e) => setIntention(e.target.value)}
          placeholder="Describe your intentions, goals, or the energy you want to bring into the new year..."
          className="w-full p-4 rounded-lg border border-stone-300 bg-white/80 backdrop-blur
                     focus:ring-2 focus:ring-stone-500 focus:border-transparent
                     min-h-[120px] resize-none"
          disabled={loading}
        />
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => setIntention(suggestion)}
            className="text-sm px-3 py-1 rounded-full bg-stone-200 hover:bg-stone-300
                       transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading || !intention.trim()}
        className="w-full py-3 px-6 rounded-lg bg-stone-800 text-white font-medium
                   hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors"
      >
        {loading ? 'Finding your kanji...' : 'Reveal My 2025 Kanji'}
      </button>
    </form>
  )
}
