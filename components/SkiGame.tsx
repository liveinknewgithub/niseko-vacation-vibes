'use client'

import { useEffect, useRef, useState } from 'react'
import { SkiGameProps, GameState } from './ski-game/types'
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  PLAYER_WIDTH,
  MOVE_DISTANCE,
  LERP_SPEED,
  TRAIL_SPAWN_INTERVAL,
} from './ski-game/constants'
import { drawGame } from './ski-game/drawing'
import {
  createInitialSnowParticles,
  spawnObstacle,
  checkCollision,
  updateSnowParticles,
  createSkiTrail,
  updateSkiTrails,
  updateObstacles,
  calculateSpawnInterval,
  calculateSpeed,
  shouldDoubleSpawn,
} from './ski-game/logic'

export function SkiGame({ onWin, onCrash, targetTime }: SkiGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<GameState>({
    playerX: GAME_WIDTH / 2 - PLAYER_WIDTH / 2,
    targetPlayerX: GAME_WIDTH / 2 - PLAYER_WIDTH / 2,
    obstacles: [],
    snowParticles: [],
    skiTrails: [],
    startTime: 0,
    lastSpawnTime: 0,
    animationId: null,
    gameOver: false,
    frame: 0,
  })
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Initialize game state
    const game = gameRef.current
    game.startTime = performance.now()
    game.lastSpawnTime = 0
    game.obstacles = []
    game.snowParticles = createInitialSnowParticles()
    game.skiTrails = []
    game.gameOver = false
    game.frame = 0
    game.playerX = GAME_WIDTH / 2 - PLAYER_WIDTH / 2
    game.targetPlayerX = GAME_WIDTH / 2 - PLAYER_WIDTH / 2

    let lastTrailTime = 0

    // Input handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      if (game.gameOver) return
      if (e.key === 'ArrowLeft') {
        game.targetPlayerX = Math.max(0, game.targetPlayerX - MOVE_DISTANCE)
      } else if (e.key === 'ArrowRight') {
        game.targetPlayerX = Math.min(GAME_WIDTH - PLAYER_WIDTH, game.targetPlayerX + MOVE_DISTANCE)
      }
    }

    const handleTouch = (e: TouchEvent) => {
      if (game.gameOver) return
      const touch = e.touches[0]
      const rect = canvas.getBoundingClientRect()
      const x = touch.clientX - rect.left
      if (x < rect.width / 2) {
        game.targetPlayerX = Math.max(0, game.targetPlayerX - MOVE_DISTANCE)
      } else {
        game.targetPlayerX = Math.min(GAME_WIDTH - PLAYER_WIDTH, game.targetPlayerX + MOVE_DISTANCE)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    canvas.addEventListener('touchstart', handleTouch)

    // Game loop
    const gameLoop = (timestamp: number) => {
      if (game.gameOver) return

      game.frame++
      const elapsed = (timestamp - game.startTime) / 1000
      setCurrentTime(elapsed)

      // Smooth player movement
      game.playerX += (game.targetPlayerX - game.playerX) * LERP_SPEED

      // Check win condition
      if (elapsed >= targetTime) {
        game.gameOver = true
        onWin(elapsed)
        return
      }

      // Update particles and trails
      game.snowParticles = updateSnowParticles(game.snowParticles, game.frame)

      if (timestamp - lastTrailTime > TRAIL_SPAWN_INTERVAL) {
        game.skiTrails.push(createSkiTrail(game.playerX))
        lastTrailTime = timestamp
      }
      game.skiTrails = updateSkiTrails(game.skiTrails)

      // Spawn obstacles
      const spawnInterval = calculateSpawnInterval(elapsed)
      if (timestamp - game.lastSpawnTime > spawnInterval) {
        game.obstacles.push(spawnObstacle())
        if (shouldDoubleSpawn(elapsed)) {
          game.obstacles.push(spawnObstacle())
        }
        game.lastSpawnTime = timestamp
      }

      // Update obstacles
      const speed = calculateSpeed(elapsed)
      game.obstacles = updateObstacles(game.obstacles, speed)

      // Check collisions
      for (const obs of game.obstacles) {
        if (checkCollision(game.playerX, obs)) {
          game.gameOver = true
          onCrash(elapsed)
          return
        }
      }

      // Render
      drawGame(
        ctx,
        game.playerX,
        game.obstacles,
        game.snowParticles,
        game.skiTrails,
        elapsed,
        game.frame,
        targetTime
      )

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
  }, [onWin, onCrash, targetTime])

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        className="rounded-xl shadow-2xl"
        style={{ touchAction: 'none', imageRendering: 'pixelated' }}
      />
      <p className="text-ski-muted text-xs mt-3">
        {currentTime < targetTime ? 'Dodge the obstacles!' : 'You did it!'}
      </p>
    </div>
  )
}
