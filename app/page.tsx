'use client'

import { useState } from 'react'
import { KanjiDisplay } from '@/components/KanjiDisplay'
import { IntentionForm } from '@/components/IntentionForm'

export default function Home() {
  const [kanji, setKanji] = useState<{
    character: string
    reading: string
    meaning: string
    explanation: string
  } | null>(null)
  const [loading, setLoading] = useState(false)

  const generateKanji = async (intention: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intention }),
      })
      const data = await response.json()
      setKanji(data)
    } catch (error) {
      console.error('Failed to generate kanji:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold">2025 in Kanji</h1>
          <p className="text-stone-600">
            Your year, distilled into one character
          </p>
        </header>

        {!kanji ? (
          <IntentionForm onSubmit={generateKanji} loading={loading} />
        ) : (
          <KanjiDisplay
            kanji={kanji}
            onReset={() => setKanji(null)}
          />
        )}

        <footer className="text-sm text-stone-500 pt-8">
          Made with vacation vibes in Niseko, Japan
        </footer>
      </div>
    </main>
  )
}
