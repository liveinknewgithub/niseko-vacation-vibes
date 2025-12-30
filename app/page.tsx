'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PromiseForm } from '@/components/PromiseForm'
import { PromiseCard } from '@/components/PromiseCard'
import { Snowfall } from '@/components/Snowfall'

export default function Home() {
  const [promise, setPromise] = useState<{
    commitment: string
    name: string
    witness?: string
    date: string
  } | null>(null)

  const handleCreate = (data: { commitment: string; name: string; witness?: string }) => {
    setPromise({
      ...data,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    })
  }

  return (
    <main className="relative min-h-screen snow-bg mountain-pattern">
      <Snowfall />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-16">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-display font-bold text-slate-800 mb-4">
            Powder Promise
          </h1>
          <p className="text-xl text-slate-600">
            Fresh powder, fresh start
          </p>
          <p className="text-slate-500 mt-2">
            Make a commitment for 2025 and share it with the world
          </p>
        </motion.header>

        <AnimatePresence mode="wait">
          {!promise ? (
            <PromiseForm onSubmit={handleCreate} />
          ) : (
            <PromiseCard promise={promise} onReset={() => setPromise(null)} />
          )}
        </AnimatePresence>

        <footer className="text-center text-sm text-slate-500 mt-16">
          Made in Niseko, Japan
        </footer>
      </div>
    </main>
  )
}
