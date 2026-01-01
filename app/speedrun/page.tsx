'use client'

import { useState } from 'react'
import { SkiGame } from '@/components/SkiGame'
import { TermSheet } from '@/components/TermSheet'
import { GameOver } from '@/components/GameOver'
import { ParticleEffect } from '@/components/ParticleEffect'
import Link from 'next/link'

type GameState = 'idle' | 'playing' | 'won' | 'crashed'

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
      <ParticleEffect
        count={40}
        direction="down"
        sizeRange={[2, 6]}
        durationRange={[3, 7]}
        className="snow-particle"
        containerClassName="snow-container"
      />
      <div className="mountain-overlay" />

      <div className="w-full max-w-lg mx-auto relative z-10">
        {/* Header */}
        <header className="text-center mb-6 fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
            A16Z <span className="text-ski-orange">Speedrun</span>
          </h1>
          <p className="text-ski-light text-sm">
            Beat Andrew Chen&apos;s 69s run. Get a term sheet.
          </p>
        </header>

        {/* Game Container */}
        <div className="ski-card rounded-2xl p-4 sm:p-6 mb-6 fade-in" style={{ animationDelay: '0.1s' }}>
          {gameState === 'idle' && (
            <div className="text-center space-y-6">
              <div className="space-y-3">
                <p className="text-ski-light">
                  Dodge the trees. Survive 69 seconds.
                </p>
                <p className="text-ski-muted text-sm">
                  Use <span className="text-white">← →</span> arrow keys or tap left/right
                </p>
              </div>
              <div className="py-8">
                <div className="text-6xl mb-4">⛷️</div>
                <p className="text-ski-muted text-sm">
                  Andrew Chen&apos;s best: <span className="text-ski-orange font-bold">69.00s</span>
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
              targetTime={69}
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
