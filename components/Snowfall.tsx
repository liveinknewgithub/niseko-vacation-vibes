'use client'

import { useEffect, useState } from 'react'

export function Snowfall() {
  const [snowflakes, setSnowflakes] = useState<Array<{
    id: number
    left: number
    delay: number
    duration: number
    size: number
  }>>([])

  useEffect(() => {
    const flakes = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 10,
      size: 10 + Math.random() * 15,
    }))
    setSnowflakes(flakes)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.size}px`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
          }}
        >
          *
        </div>
      ))}
    </div>
  )
}
