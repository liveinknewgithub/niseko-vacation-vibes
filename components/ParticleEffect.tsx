'use client'

import { useState, useEffect } from 'react'

interface ParticleEffectProps {
  count: number
  direction: 'up' | 'down'
  sizeRange: [number, number]
  durationRange: [number, number]
  className: string
  containerClassName: string
}

interface Particle {
  id: number
  left: number
  size: number
  delay: number
  duration: number
}

export function ParticleEffect({
  count,
  direction,
  sizeRange,
  durationRange,
  className,
  containerClassName,
}: ParticleEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const [minSize, maxSize] = sizeRange
    const [minDuration, maxDuration] = durationRange

    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: minSize + Math.random() * (maxSize - minSize),
      delay: Math.random() * maxDuration,
      duration: minDuration + Math.random() * (maxDuration - minDuration),
    }))
    setParticles(newParticles)
  }, [count, sizeRange, durationRange])

  return (
    <div className={containerClassName}>
      {particles.map((p) => (
        <div
          key={p.id}
          className={className}
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
