'use client'

import { useState, useEffect } from 'react'
import { KanjiDisplay } from '@/components/KanjiDisplay'
import { IntentionForm } from '@/components/IntentionForm'

function SnowParticles() {
  const [particles, setParticles] = useState<Array<{
    id: number
    left: number
    delay: number
    duration: number
    size: number
  }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 12,
      size: 2 + Math.random() * 4,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="snow-particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="snow-particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

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
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative">
      <SnowParticles />
      <div className="mountain-silhouette" />

      <div className="w-full max-w-md mx-auto relative z-10">
        {/* Header */}
        <header className="text-center mb-10 sm:mb-12 fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-white/50" />
            <span className="text-xs sm:text-sm tracking-[0.2em] text-white/80 uppercase font-medium">
              New Year
            </span>
            <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-white/50" />
          </div>

          <h1 className="font-japanese text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-lg">
            2026 in Kanji
          </h1>

          <p className="text-white/70 text-base sm:text-lg max-w-md mx-auto">
            Your year ahead, distilled into one character
          </p>

          {/* Gold accent line */}
          <div className="gold-accent w-24 mx-auto mt-6" />
        </header>

        {/* Main Content */}
        <div className="fade-in" style={{ animationDelay: '0.1s' }}>
          {!kanji ? (
            <IntentionForm onSubmit={generateKanji} loading={loading} />
          ) : (
            <KanjiDisplay
              kanji={kanji}
              onReset={() => setKanji(null)}
            />
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 sm:mt-16 fade-in" style={{ animationDelay: '0.2s' }}>
          <p className="text-sm text-white/50">
            Made with vacation vibes in Niseko, Japan
          </p>
        </footer>
      </div>
    </main>
  )
}
