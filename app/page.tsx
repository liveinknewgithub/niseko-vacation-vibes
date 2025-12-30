'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IntentionInput } from '@/components/IntentionInput'
import { SunriseDisplay } from '@/components/SunriseDisplay'
import { StarField } from '@/components/StarField'

export default function Home() {
  const [sunrise, setSunrise] = useState<{
    imageUrl: string
    intention: string
    poem: string
  } | null>(null)
  const [loading, setLoading] = useState(false)

  const generateSunrise = async (intention: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intention }),
      })
      const data = await response.json()
      setSunrise({ ...data, intention })
    } catch (error) {
      console.error('Failed to generate sunrise:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden">
      <StarField />

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-5xl font-bold text-white">
            初日の出
          </h1>
          <p className="text-2xl text-orange-200">
            Hatsuhinode
          </p>
          <p className="text-lg text-white/70">
            Your first sunrise of 2025
          </p>
        </motion.header>

        <AnimatePresence mode="wait">
          {!sunrise ? (
            <IntentionInput
              onSubmit={generateSunrise}
              loading={loading}
            />
          ) : (
            <SunriseDisplay
              sunrise={sunrise}
              onReset={() => setSunrise(null)}
            />
          )}
        </AnimatePresence>

        <footer className="text-sm text-white/50 pt-8">
          A Japanese tradition, reimagined with AI
        </footer>
      </div>

      {/* Horizon silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-32 mountain-silhouette" />
    </main>
  )
}
