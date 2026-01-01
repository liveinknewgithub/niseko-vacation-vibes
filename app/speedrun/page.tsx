'use client'

import { useState, useEffect } from 'react'
import { SkiGame } from '@/components/SkiGame'
import { TermSheet } from '@/components/TermSheet'
import { GameOver } from '@/components/GameOver'
import Link from 'next/link'

type GameState = 'idle' | 'playing' | 'won' | 'crashed'

function SnowEffect() {
  const [particles, setParticles] = useState<Array<{
    id: number
    left: number
    size: number
    delay: number
    duration: number
  }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="snow-container">
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

export default function SpeedrunPage() {
  const [gameState, setGameState] = useState<GameState>('idle')
  const [finalTime, setFinalTime] = useState(0)

  const handleStart = () => {
    setGameState('playing')
  }

  const handleWin = (time: number) => {
    setFinalTime(time)
    setGameState('won')
  }

  const handleCrash = (time: number) => {
    setFinalTime(time)
    setGameState('crashed')
  }

  const handleReset = () => {
    setGameState('idle')
    setFinalTime(0)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative ski-bg">
      <SnowEffect />
      <div className="mountain-overlay" />

      <div className="w-full max-w-lg mx-auto relative z-10">
        {/* Header */}
        <header className="text-center mb-6 fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
            A16Z <span className="text-ski-orange">Speedrun</span>
          </h1>
          <p className="text-ski-light text-sm">
            Beat Andrew Chen&apos;s 10s run. Get a term sheet.
          </p>
        </header>

        {/* Game Container */}
        <div className="ski-card rounded-2xl p-4 sm:p-6 mb-6 fade-in" style={{ animationDelay: '0.1s' }}>
          {gameState === 'idle' && (
            <div className="text-center space-y-6">
              <div className="space-y-3">
                <p className="text-ski-light">
                  Dodge the trees. Survive 10 seconds.
                </p>
                <p className="text-ski-muted text-sm">
                  Use <span className="text-white">← →</span> arrow keys or tap left/right
                </p>
              </div>
              <div className="py-8">
                <div className="text-6xl mb-4">⛷️</div>
                <p className="text-ski-muted text-sm">
                  Andrew Chen&apos;s best: <span className="text-ski-orange font-bold">10.00s</span>
                </p>
              </div>
              <button
                onClick={handleStart}
                className="btn-ski text-lg"
              >
                Start Run
              </button>
            </div>
          )}

          {gameState === 'playing' && (
            <SkiGame
              onWin={handleWin}
              onCrash={handleCrash}
              targetTime={10}
            />
          )}

          {gameState === 'won' && (
            <TermSheet
              time={finalTime}
              onPlayAgain={handleReset}
            />
          )}

          {gameState === 'crashed' && (
            <GameOver
              time={finalTime}
              onPlayAgain={handleReset}
            />
          )}
        </div>

        {/* Footer */}
        <footer className="text-center fade-in" style={{ animationDelay: '0.2s' }}>
          <Link href="/" className="text-ski-muted text-sm hover:text-ski-light transition-colors">
            ← Back to Onsen Oracle
          </Link>
        </footer>
      </div>
    </main>
  )
}
