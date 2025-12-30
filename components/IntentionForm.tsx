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
    'Find balance',
    'Build & create',
    'Adventure awaits',
    'Deep connections',
    'Grow stronger',
    'Inner peace',
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card container */}
      <div className="washi-paper rounded-2xl p-6 sm:p-8">
        <label
          htmlFor="intention"
          className="block font-japanese text-lg sm:text-xl text-[var(--color-deep)] mb-5 text-center"
        >
          What do you want 2026 to be about?
        </label>

        <textarea
          id="intention"
          value={intention}
          onChange={(e) => setIntention(e.target.value)}
          placeholder="Describe your intentions, goals, or the energy you want to bring into the new year..."
          className="input-field min-h-[100px] sm:min-h-[110px] text-center text-sm sm:text-base"
          disabled={loading}
        />

        {/* Suggestion chips */}
        <div className="flex flex-wrap gap-2 justify-center mt-5">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setIntention(suggestion)}
              className="chip"
              disabled={loading}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading || !intention.trim()}
        className="btn-primary w-full text-base sm:text-lg"
      >
        {loading ? (
          <span className="loading-dots">Finding your kanji</span>
        ) : (
          'Reveal My 2026 Kanji'
        )}
      </button>
    </form>
  )
}
