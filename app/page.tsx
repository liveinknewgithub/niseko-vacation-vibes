'use client'

import { useState } from 'react'
import { SnowEffect } from '@/components/SnowEffect'
import { HaikuForm } from '@/components/HaikuForm'
import { HaikuDisplay } from '@/components/HaikuDisplay'

export default function Home() {
  const [haiku, setHaiku] = useState<{
    lines: [string, string, string]
    vibe: string
  } | null>(null)
  const [loading, setLoading] = useState(false)

  const generateHaiku = async (vibe: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/haiku', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vibe }),
      })
      const data = await response.json()
      setHaiku({ ...data, vibe })
    } catch (error) {
      console.error('Failed to generate haiku:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen mountain-bg flex flex-col items-center justify-center p-8">
      <SnowEffect />

      <div className="relative z-10 max-w-lg w-full text-center space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            Ski Haiku
          </h1>
          <p className="text-xl text-white/80">
            Your 2025 in three lines
          </p>
        </header>

        {!haiku ? (
          <HaikuForm onSubmit={generateHaiku} loading={loading} />
        ) : (
          <HaikuDisplay haiku={haiku} onReset={() => setHaiku(null)} />
        )}

        <footer className="text-sm text-white/60 pt-8">
          Written on the slopes of Niseko
        </footer>
      </div>
    </main>
  )
}
