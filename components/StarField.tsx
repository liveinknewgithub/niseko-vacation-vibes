'use client'

import { useEffect, useState } from 'react'

export function StarField() {
  const [stars, setStars] = useState<Array<{ id: number; left: number; top: number; delay: number; size: number }>>([])

  useEffect(() => {
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 60, // Only in upper 60% of screen
      delay: Math.random() * 2,
      size: Math.random() * 2 + 1,
    }))
    setStars(newStars)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDelay: `${star.delay}s`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
        />
      ))}
    </div>
  )
}
