'use client'

import { useEffect, useState } from 'react'

export function SnowEffect() {
  const [snowflakes, setSnowflakes] = useState<Array<{
    id: number
    left: number
    size: number
    delay: number
    duration: number
  }>>([])

  useEffect(() => {
    const flakes = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
    }))
    setSnowflakes(flakes)
  }, [])

  return (
    <div className="snow">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
