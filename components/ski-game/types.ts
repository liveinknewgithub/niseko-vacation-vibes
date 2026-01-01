export interface SkiGameProps {
  onWin: (time: number) => void
  onCrash: (time: number) => void
  targetTime: number
}

export interface Obstacle {
  x: number
  y: number
  type: 'tree' | 'rock'
  width: number
  height: number
  variant: number
}

export interface SnowParticle {
  x: number
  y: number
  size: number
  speed: number
}

export interface SkiTrail {
  x: number
  y: number
  opacity: number
}

export interface GameState {
  playerX: number
  targetPlayerX: number
  obstacles: Obstacle[]
  snowParticles: SnowParticle[]
  skiTrails: SkiTrail[]
  startTime: number
  lastSpawnTime: number
  animationId: number | null
  gameOver: boolean
  frame: number
}
