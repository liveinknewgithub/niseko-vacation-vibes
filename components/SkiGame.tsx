'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface SkiGameProps {
  onWin: (time: number) => void
  onCrash: (time: number) => void
  targetTime: number
}

interface Obstacle {
  x: number
  y: number
  type: 'tree' | 'rock'
  width: number
  height: number
}

const GAME_WIDTH = 320
const GAME_HEIGHT = 480
const PLAYER_WIDTH = 30
const PLAYER_HEIGHT = 40
const PLAYER_Y = GAME_HEIGHT - 80

export function SkiGame({ onWin, onCrash, targetTime }: SkiGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<{
    playerX: number
    obstacles: Obstacle[]
    startTime: number
    lastSpawnTime: number
    animationId: number | null
    gameOver: boolean
  }>({
    playerX: GAME_WIDTH / 2 - PLAYER_WIDTH / 2,
    obstacles: [],
    startTime: 0,
    lastSpawnTime: 0,
    animationId: null,
    gameOver: false,
  })
  const [currentTime, setCurrentTime] = useState(0)

  const spawnObstacle = useCallback(() => {
    const types: Array<'tree' | 'rock'> = ['tree', 'tree', 'tree', 'rock']
    const type = types[Math.floor(Math.random() * types.length)]
    const width = type === 'tree' ? 25 : 30
    const height = type === 'tree' ? 35 : 20

    return {
      x: Math.random() * (GAME_WIDTH - width),
      y: -height,
      type,
      width,
      height,
    }
  }, [])

  const checkCollision = useCallback((playerX: number, obstacle: Obstacle) => {
    const playerLeft = playerX + 5
    const playerRight = playerX + PLAYER_WIDTH - 5
    const playerTop = PLAYER_Y + 5
    const playerBottom = PLAYER_Y + PLAYER_HEIGHT - 5

    const obsLeft = obstacle.x
    const obsRight = obstacle.x + obstacle.width
    const obsTop = obstacle.y
    const obsBottom = obstacle.y + obstacle.height

    return (
      playerRight > obsLeft &&
      playerLeft < obsRight &&
      playerBottom > obsTop &&
      playerTop < obsBottom
    )
  }, [])

  const drawGame = useCallback((ctx: CanvasRenderingContext2D, playerX: number, obstacles: Obstacle[], time: number) => {
    // Clear canvas
    ctx.fillStyle = '#f0f4f8'
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    // Draw ski tracks (subtle lines)
    ctx.strokeStyle = '#e2e8f0'
    ctx.lineWidth = 2
    for (let i = 0; i < 5; i++) {
      const x = 40 + i * 60
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, GAME_HEIGHT)
      ctx.stroke()
    }

    // Draw obstacles
    obstacles.forEach((obs) => {
      if (obs.type === 'tree') {
        // Tree trunk
        ctx.fillStyle = '#8B4513'
        ctx.fillRect(obs.x + 10, obs.y + 20, 5, 15)
        // Tree foliage
        ctx.fillStyle = '#228B22'
        ctx.beginPath()
        ctx.moveTo(obs.x + 12.5, obs.y)
        ctx.lineTo(obs.x, obs.y + 25)
        ctx.lineTo(obs.x + 25, obs.y + 25)
        ctx.closePath()
        ctx.fill()
      } else {
        // Rock
        ctx.fillStyle = '#6B7280'
        ctx.beginPath()
        ctx.ellipse(obs.x + 15, obs.y + 10, 15, 10, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#9CA3AF'
        ctx.beginPath()
        ctx.ellipse(obs.x + 12, obs.y + 8, 5, 3, -0.3, 0, Math.PI * 2)
        ctx.fill()
      }
    })

    // Draw skier
    ctx.fillStyle = '#1E40AF'
    // Body
    ctx.beginPath()
    ctx.ellipse(playerX + 15, PLAYER_Y + 15, 10, 12, 0, 0, Math.PI * 2)
    ctx.fill()
    // Head
    ctx.fillStyle = '#FBBF24'
    ctx.beginPath()
    ctx.arc(playerX + 15, PLAYER_Y + 2, 8, 0, Math.PI * 2)
    ctx.fill()
    // Skis
    ctx.fillStyle = '#EF4444'
    ctx.fillRect(playerX + 2, PLAYER_Y + 28, 26, 4)

    // Draw timer
    ctx.fillStyle = '#1F2937'
    ctx.font = 'bold 24px Inter, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(`${time.toFixed(2)}s`, GAME_WIDTH / 2, 35)

    // Progress bar
    const progress = Math.min(time / targetTime, 1)
    ctx.fillStyle = '#E5E7EB'
    ctx.fillRect(20, 50, GAME_WIDTH - 40, 8)
    ctx.fillStyle = progress >= 1 ? '#22C55E' : '#F97316'
    ctx.fillRect(20, 50, (GAME_WIDTH - 40) * progress, 8)
  }, [targetTime])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const game = gameRef.current
    game.startTime = performance.now()
    game.lastSpawnTime = 0
    game.obstacles = []
    game.gameOver = false
    game.playerX = GAME_WIDTH / 2 - PLAYER_WIDTH / 2

    // Handle keyboard input
    const handleKeyDown = (e: KeyboardEvent) => {
      if (game.gameOver) return
      if (e.key === 'ArrowLeft') {
        game.playerX = Math.max(0, game.playerX - 20)
      } else if (e.key === 'ArrowRight') {
        game.playerX = Math.min(GAME_WIDTH - PLAYER_WIDTH, game.playerX + 20)
      }
    }

    // Handle touch input
    const handleTouch = (e: TouchEvent) => {
      if (game.gameOver) return
      const touch = e.touches[0]
      const rect = canvas.getBoundingClientRect()
      const x = touch.clientX - rect.left
      if (x < rect.width / 2) {
        game.playerX = Math.max(0, game.playerX - 20)
      } else {
        game.playerX = Math.min(GAME_WIDTH - PLAYER_WIDTH, game.playerX + 20)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    canvas.addEventListener('touchstart', handleTouch)

    // Game loop
    const gameLoop = (timestamp: number) => {
      if (game.gameOver) return

      const elapsed = (timestamp - game.startTime) / 1000
      setCurrentTime(elapsed)

      // Check win condition
      if (elapsed >= targetTime) {
        game.gameOver = true
        onWin(elapsed)
        return
      }

      // Spawn obstacles (more frequent as time passes)
      const spawnInterval = Math.max(400, 1000 - elapsed * 60)
      if (timestamp - game.lastSpawnTime > spawnInterval) {
        game.obstacles.push(spawnObstacle())
        game.lastSpawnTime = timestamp
      }

      // Move obstacles (faster as time passes)
      const speed = 4 + elapsed * 0.5
      game.obstacles = game.obstacles
        .map((obs) => ({ ...obs, y: obs.y + speed }))
        .filter((obs) => obs.y < GAME_HEIGHT + 50)

      // Check collisions
      for (const obs of game.obstacles) {
        if (checkCollision(game.playerX, obs)) {
          game.gameOver = true
          onCrash(elapsed)
          return
        }
      }

      // Draw
      drawGame(ctx, game.playerX, game.obstacles, elapsed)

      game.animationId = requestAnimationFrame(gameLoop)
    }

    game.animationId = requestAnimationFrame(gameLoop)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      canvas.removeEventListener('touchstart', handleTouch)
      if (game.animationId) {
        cancelAnimationFrame(game.animationId)
      }
    }
  }, [onWin, onCrash, targetTime, spawnObstacle, checkCollision, drawGame])

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        className="rounded-lg shadow-lg border-2 border-gray-200"
        style={{ touchAction: 'none' }}
      />
      <p className="text-ski-muted text-xs mt-3">
        {currentTime < targetTime ? 'Dodge the obstacles!' : 'You did it!'}
      </p>
    </div>
  )
}
