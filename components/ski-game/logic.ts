import { Obstacle, SnowParticle, SkiTrail } from './types'
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_Y,
  TREE_WIDTH,
  TREE_HEIGHT,
  ROCK_WIDTH,
  ROCK_HEIGHT,
  SNOW_PARTICLE_COUNT,
} from './constants'

export function createInitialSnowParticles(): SnowParticle[] {
  return Array.from({ length: SNOW_PARTICLE_COUNT }, () => ({
    x: Math.random() * GAME_WIDTH,
    y: Math.random() * GAME_HEIGHT,
    size: 1 + Math.random() * 2,
    speed: 1 + Math.random() * 2,
  }))
}

export function spawnObstacle(): Obstacle {
  const types: Array<'tree' | 'rock'> = ['tree', 'tree', 'tree', 'rock']
  const type = types[Math.floor(Math.random() * types.length)]
  const width = type === 'tree' ? TREE_WIDTH : ROCK_WIDTH
  const height = type === 'tree' ? TREE_HEIGHT : ROCK_HEIGHT

  return {
    x: Math.random() * (GAME_WIDTH - width - 20) + 10,
    y: -height,
    type,
    width,
    height,
    variant: Math.floor(Math.random() * 3),
  }
}

export function checkCollision(playerX: number, obstacle: Obstacle): boolean {
  // Tighter collision box for fairness
  const playerLeft = playerX + 8
  const playerRight = playerX + PLAYER_WIDTH - 8
  const playerTop = PLAYER_Y + 12
  const playerBottom = PLAYER_Y + PLAYER_HEIGHT - 4

  const obsLeft = obstacle.x + 8
  const obsRight = obstacle.x + obstacle.width - 8
  const obsTop = obstacle.y + obstacle.height - 20
  const obsBottom = obstacle.y + obstacle.height

  return (
    playerRight > obsLeft &&
    playerLeft < obsRight &&
    playerBottom > obsTop &&
    playerTop < obsBottom
  )
}

export function updateSnowParticles(particles: SnowParticle[], frame: number): SnowParticle[] {
  return particles.map((p) => {
    const newY = p.y + p.speed
    const newX = p.x + Math.sin(frame * 0.05 + p.x) * 0.3

    // Wrap around screen
    if (newY > GAME_HEIGHT) {
      return { ...p, y: -5, x: Math.random() * GAME_WIDTH }
    }

    return { ...p, y: newY, x: newX }
  })
}

export function createSkiTrail(playerX: number): SkiTrail {
  return {
    x: playerX + PLAYER_WIDTH / 2,
    y: PLAYER_Y + PLAYER_HEIGHT - 4,
    opacity: 0.4,
  }
}

export function updateSkiTrails(trails: SkiTrail[]): SkiTrail[] {
  return trails
    .map((t) => ({ ...t, y: t.y + 2, opacity: t.opacity - 0.008 }))
    .filter((t) => t.opacity > 0 && t.y < GAME_HEIGHT)
}

export function updateObstacles(obstacles: Obstacle[], speed: number): Obstacle[] {
  return obstacles
    .map((obs) => ({ ...obs, y: obs.y + speed }))
    .filter((obs) => obs.y < GAME_HEIGHT + 50)
}

export function calculateSpawnInterval(elapsed: number): number {
  return Math.max(250, 800 - elapsed * 8)
}

export function calculateSpeed(elapsed: number): number {
  return 3.5 + elapsed * 0.4
}

export function shouldDoubleSpawn(elapsed: number): boolean {
  return elapsed > 15 && Math.random() < 0.3
}
