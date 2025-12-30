'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SteamEffect } from '@/components/SteamEffect'
import { FortuneCard } from '@/components/FortuneCard'
import { OraclePrompt } from '@/components/OraclePrompt'

export default function Home() {
  const [fortune, setFortune] = useState<{
    fortune: string
    element: string
    advice: string
    luckyNumber: number
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [isSubmerging, setIsSubmerging] = useState(false)

  const seekFortune = async () => {
    setIsSubmerging(true)
    setLoading(true)

    // Dramatic pause for the submersion animation
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
      setIsSubmerging(false)
    }
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-8">
      <SteamEffect />

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-5xl font-bold text-amber-100">
            The Onsen Oracle
          </h1>
          <p className="text-xl text-slate-300">
            Soak in your destiny
          </p>
        </motion.header>

        <AnimatePresence mode="wait">
          {!fortune ? (
            <OraclePrompt
              onSeekFortune={seekFortune}
              loading={loading}
              isSubmerging={isSubmerging}
            />
          ) : (
            <FortuneCard
              fortune={fortune}
              onReset={() => setFortune(null)}
            />
          )}
        </AnimatePresence>

        <footer className="text-sm text-slate-500 pt-8">
          Wisdom from the hot springs of Niseko
        </footer>
      </div>
    </main>
  )
}
