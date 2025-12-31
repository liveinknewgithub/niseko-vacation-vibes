'use client'

import { useState, useEffect } from 'react'
import { FortuneCard } from '@/components/FortuneCard'

function SteamEffect() {
  const [particles, setParticles] = useState<Array<{
    id: number
    left: number
    size: number
    delay: number
    duration: number
  }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 30 + Math.random() * 60,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 6,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="steam-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="steam-particle"
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
  const [fortune, setFortune] = useState<{
    fortune: string
    element: string
    advice: string
    luckyNumber: number
  } | null>(null)
  const [loading, setLoading] = useState(false)

  const seekFortune = async () => {
    setLoading(true)

    // Dramatic pause
    await new Promise(resolve => setTimeout(resolve, 2000))

    try {
      const response = await fetch('/api/fortune', {
        method: 'POST',
      })
      const data = await response.json()
      setFortune(data)
    } catch (error) {
      console.error('The oracle is silent:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative">
      <SteamEffect />
      <div className="water-surface" />

      <div className="w-full max-w-md mx-auto relative z-10">
        {/* Header */}
        <header className="text-center mb-10 fade-in">
          <h1 className="font-japanese text-4xl sm:text-5xl font-bold text-glow mb-3" style={{ color: '#fde68a' }}>
            The Onsen Oracle
          </h1>
          <p className="text-lg" style={{ color: '#fcd34d' }}>
            Soak in your destiny
          </p>
        </header>

        {/* Main Content */}
        {!fortune ? (
          <div className="fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="oracle-card rounded-2xl p-6 sm:p-8 mb-8">
              <div className="space-y-4 text-center">
                <p className="leading-relaxed" style={{ color: '#fef3c7' }}>
                  The ancient waters hold the wisdom of a thousand winters.
                </p>
                <p className="leading-relaxed" style={{ color: '#fde68a' }}>
                  Close your eyes. Take a breath. Let the warmth embrace you.
                </p>
                <p className="leading-relaxed" style={{ color: '#fef3c7' }}>
                  When you are ready, submerge yourself and receive your fortune for 2026.
                </p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={seekFortune}
                disabled={loading}
                className="btn-oracle text-lg"
              >
                {loading ? (
                  <span className="loading-pulse">The oracle stirs...</span>
                ) : (
                  'Enter the Waters'
                )}
              </button>
            </div>
          </div>
        ) : (
          <FortuneCard
            fortune={fortune}
            onReset={() => setFortune(null)}
          />
        )}

        {/* Footer */}
        <footer className="text-center mt-12 fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-sm" style={{ color: '#d97706' }}>
            Wisdom from the hot springs of Niseko
          </p>
        </footer>
      </div>
    </main>
  )
}
