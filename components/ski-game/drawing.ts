import { Obstacle, SnowParticle, SkiTrail } from './types'
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_Y,
} from './constants'

export function drawBackground(ctx: CanvasRenderingContext2D, frame: number): void {
  // Sky gradient
  const skyGradient = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT)
  skyGradient.addColorStop(0, '#87CEEB')
  skyGradient.addColorStop(0.3, '#B0E0E6')
  skyGradient.addColorStop(1, '#E8F4F8')
  ctx.fillStyle = skyGradient
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

  // Snow slope
  const slopeY = 60
  const snowGradient = ctx.createLinearGradient(0, slopeY, 0, GAME_HEIGHT)
  snowGradient.addColorStop(0, '#F0F8FF')
  snowGradient.addColorStop(0.5, '#E8F0F8')
  snowGradient.addColorStop(1, '#DCE8F0')
  ctx.fillStyle = snowGradient
  ctx.fillRect(0, slopeY, GAME_WIDTH, GAME_HEIGHT - slopeY)

  // Isometric slope lines (moving for speed effect)
  ctx.strokeStyle = 'rgba(200, 220, 235, 0.6)'
  ctx.lineWidth = 1
  const lineOffset = (frame * 3) % 40

  for (let i = -2; i < 15; i++) {
    const baseY = slopeY + i * 40 + lineOffset
    ctx.beginPath()
    ctx.moveTo(0, baseY)
    ctx.lineTo(GAME_WIDTH, baseY + 20)
    ctx.stroke()
  }

  // Sparkle spots
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
  for (let i = 0; i < 8; i++) {
    const sparkleX = (i * 47 + frame) % GAME_WIDTH
    const sparkleY = 100 + ((i * 73 + frame * 2) % (GAME_HEIGHT - 150))
    ctx.beginPath()
    ctx.arc(sparkleX, sparkleY, 1.5, 0, Math.PI * 2)
    ctx.fill()
  }
}

export function drawTree(ctx: CanvasRenderingContext2D, x: number, y: number, variant: number): void {
  const baseX = x + 20
  const baseY = y + 56

  // Shadow
  ctx.fillStyle = 'rgba(0, 50, 30, 0.2)'
  ctx.beginPath()
  ctx.ellipse(baseX, baseY - 2, 16, 6, 0, 0, Math.PI * 2)
  ctx.fill()

  // Trunk
  ctx.fillStyle = '#5D4037'
  ctx.fillRect(baseX - 4, baseY - 16, 8, 16)
  ctx.fillStyle = '#4E342E'
  ctx.fillRect(baseX - 4, baseY - 16, 3, 16)

  // Tree layers
  const layers = [
    { y: -18, width: 32, height: 16 },
    { y: -30, width: 26, height: 14 },
    { y: -40, width: 20, height: 12 },
    { y: -48, width: 12, height: 10 },
  ]

  layers.forEach((layer, i) => {
    // Dark side (left)
    ctx.fillStyle = i === 0 ? '#1B5E20' : '#2E7D32'
    ctx.beginPath()
    ctx.moveTo(baseX, baseY + layer.y - layer.height)
    ctx.lineTo(baseX - layer.width / 2, baseY + layer.y)
    ctx.lineTo(baseX, baseY + layer.y + 2)
    ctx.closePath()
    ctx.fill()

    // Light side (right)
    ctx.fillStyle = i === 0 ? '#388E3C' : '#4CAF50'
    ctx.beginPath()
    ctx.moveTo(baseX, baseY + layer.y - layer.height)
    ctx.lineTo(baseX + layer.width / 2, baseY + layer.y)
    ctx.lineTo(baseX, baseY + layer.y + 2)
    ctx.closePath()
    ctx.fill()

    // Snow on top
    if (variant !== 2) {
      ctx.fillStyle = '#FFFFFF'
      ctx.beginPath()
      ctx.moveTo(baseX - 2, baseY + layer.y - layer.height + 2)
      ctx.lineTo(baseX - layer.width / 3, baseY + layer.y - 4)
      ctx.lineTo(baseX + layer.width / 4, baseY + layer.y - 6)
      ctx.lineTo(baseX + 2, baseY + layer.y - layer.height + 2)
      ctx.closePath()
      ctx.fill()
    }
  })
}

export function drawRock(ctx: CanvasRenderingContext2D, x: number, y: number, variant: number): void {
  const baseX = x + 18
  const baseY = y + 24

  // Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'
  ctx.beginPath()
  ctx.ellipse(baseX, baseY + 2, 14, 5, 0, 0, Math.PI * 2)
  ctx.fill()

  // Rock base (dark)
  ctx.fillStyle = '#546E7A'
  ctx.beginPath()
  ctx.moveTo(baseX - 14, baseY - 4)
  ctx.lineTo(baseX - 8, baseY - 16)
  ctx.lineTo(baseX + 4, baseY - 18)
  ctx.lineTo(baseX + 14, baseY - 8)
  ctx.lineTo(baseX + 12, baseY)
  ctx.lineTo(baseX - 10, baseY)
  ctx.closePath()
  ctx.fill()

  // Rock top (light)
  ctx.fillStyle = '#78909C'
  ctx.beginPath()
  ctx.moveTo(baseX - 8, baseY - 16)
  ctx.lineTo(baseX + 4, baseY - 18)
  ctx.lineTo(baseX + 6, baseY - 12)
  ctx.lineTo(baseX - 4, baseY - 10)
  ctx.closePath()
  ctx.fill()

  // Highlight
  ctx.fillStyle = '#90A4AE'
  ctx.beginPath()
  ctx.moveTo(baseX - 6, baseY - 14)
  ctx.lineTo(baseX + 2, baseY - 16)
  ctx.lineTo(baseX + 4, baseY - 12)
  ctx.lineTo(baseX - 2, baseY - 10)
  ctx.closePath()
  ctx.fill()

  // Snow patches
  if (variant !== 1) {
    ctx.fillStyle = '#FFFFFF'
    ctx.beginPath()
    ctx.ellipse(baseX - 4, baseY - 14, 4, 2, -0.3, 0, Math.PI * 2)
    ctx.fill()
  }
}

export function drawSkier(ctx: CanvasRenderingContext2D, x: number, frame: number): void {
  const baseX = x + PLAYER_WIDTH / 2
  const baseY = PLAYER_Y + PLAYER_HEIGHT

  // Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
  ctx.beginPath()
  ctx.ellipse(baseX, baseY - 2, 12, 4, 0, 0, Math.PI * 2)
  ctx.fill()

  // Skis
  const skiWobble = Math.sin(frame * 0.3)
  ctx.fillStyle = '#E53935'
  ctx.save()
  ctx.translate(baseX - 10, baseY - 4)
  ctx.rotate(-0.1 + skiWobble * 0.02)
  ctx.fillRect(-2, -2, 20, 4)
  ctx.fillStyle = '#C62828'
  ctx.fillRect(-2, 0, 20, 2)
  ctx.restore()

  ctx.fillStyle = '#E53935'
  ctx.save()
  ctx.translate(baseX + 2, baseY - 4)
  ctx.rotate(0.1 - skiWobble * 0.02)
  ctx.fillRect(-2, -2, 20, 4)
  ctx.fillStyle = '#C62828'
  ctx.fillRect(-2, 0, 20, 2)
  ctx.restore()

  // Legs
  ctx.fillStyle = '#1565C0'
  ctx.fillRect(baseX - 7, baseY - 18, 6, 14)
  ctx.fillRect(baseX + 1, baseY - 18, 6, 14)

  // Body/Jacket
  ctx.fillStyle = '#1E88E5'
  ctx.beginPath()
  ctx.moveTo(baseX - 10, baseY - 18)
  ctx.lineTo(baseX - 8, baseY - 34)
  ctx.lineTo(baseX + 8, baseY - 34)
  ctx.lineTo(baseX + 10, baseY - 18)
  ctx.closePath()
  ctx.fill()

  // Jacket highlight
  ctx.fillStyle = '#42A5F5'
  ctx.beginPath()
  ctx.moveTo(baseX - 8, baseY - 18)
  ctx.lineTo(baseX - 6, baseY - 32)
  ctx.lineTo(baseX, baseY - 32)
  ctx.lineTo(baseX - 2, baseY - 18)
  ctx.closePath()
  ctx.fill()

  // Arms with poles
  const armSwing = Math.sin(frame * 0.4) * 2

  // Left arm
  ctx.fillStyle = '#1E88E5'
  ctx.save()
  ctx.translate(baseX - 8, baseY - 30)
  ctx.rotate(-0.4 + armSwing * 0.05)
  ctx.fillRect(-3, 0, 5, 12)
  ctx.fillStyle = '#424242'
  ctx.fillRect(0, 8, 2, 24)
  ctx.fillStyle = '#757575'
  ctx.beginPath()
  ctx.arc(1, 30, 3, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  // Right arm
  ctx.fillStyle = '#1E88E5'
  ctx.save()
  ctx.translate(baseX + 8, baseY - 30)
  ctx.rotate(0.4 - armSwing * 0.05)
  ctx.fillRect(-2, 0, 5, 12)
  ctx.fillStyle = '#424242'
  ctx.fillRect(-1, 8, 2, 24)
  ctx.fillStyle = '#757575'
  ctx.beginPath()
  ctx.arc(0, 30, 3, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  // Head
  ctx.fillStyle = '#FFCC80'
  ctx.beginPath()
  ctx.arc(baseX, baseY - 40, 7, 0, Math.PI * 2)
  ctx.fill()

  // Helmet
  ctx.fillStyle = '#F44336'
  ctx.beginPath()
  ctx.arc(baseX, baseY - 42, 8, Math.PI, 0)
  ctx.fill()
  ctx.fillStyle = '#D32F2F'
  ctx.beginPath()
  ctx.arc(baseX - 2, baseY - 42, 8, Math.PI, Math.PI * 1.5)
  ctx.fill()

  // Goggles
  ctx.fillStyle = '#263238'
  ctx.fillRect(baseX - 6, baseY - 42, 12, 4)
  ctx.fillStyle = '#00BCD4'
  ctx.fillRect(baseX - 5, baseY - 41, 4, 2)
  ctx.fillRect(baseX + 1, baseY - 41, 4, 2)
}

export function drawSnowParticles(ctx: CanvasRenderingContext2D, particles: SnowParticle[]): void {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
  particles.forEach((p) => {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fill()
  })
}

export function drawSkiTrails(ctx: CanvasRenderingContext2D, trails: SkiTrail[]): void {
  trails.forEach((trail) => {
    ctx.fillStyle = `rgba(180, 200, 220, ${trail.opacity})`
    ctx.fillRect(trail.x - 8, trail.y, 3, 8)
    ctx.fillRect(trail.x + 5, trail.y, 3, 8)
  })
}

export function drawUI(ctx: CanvasRenderingContext2D, time: number, targetTime: number): void {
  // Timer background
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
  ctx.beginPath()
  ctx.roundRect(GAME_WIDTH / 2 - 50, 10, 100, 50, 8)
  ctx.fill()

  // Timer text
  ctx.fillStyle = '#FFFFFF'
  ctx.font = 'bold 24px "SF Pro", system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(`${time.toFixed(2)}s`, GAME_WIDTH / 2, 40)

  // Progress bar background
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
  ctx.beginPath()
  ctx.roundRect(30, 52, GAME_WIDTH - 60, 6, 3)
  ctx.fill()

  // Progress bar fill
  const progress = Math.min(time / targetTime, 1)
  const progressGradient = ctx.createLinearGradient(30, 0, GAME_WIDTH - 30, 0)
  if (progress >= 1) {
    progressGradient.addColorStop(0, '#4CAF50')
    progressGradient.addColorStop(1, '#8BC34A')
  } else {
    progressGradient.addColorStop(0, '#FF9800')
    progressGradient.addColorStop(1, '#FFC107')
  }
  ctx.fillStyle = progressGradient
  ctx.beginPath()
  ctx.roundRect(30, 52, (GAME_WIDTH - 60) * progress, 6, 3)
  ctx.fill()
}

export function drawGame(
  ctx: CanvasRenderingContext2D,
  playerX: number,
  obstacles: Obstacle[],
  snowParticles: SnowParticle[],
  skiTrails: SkiTrail[],
  time: number,
  frame: number,
  targetTime: number
): void {
  drawBackground(ctx, frame)
  drawSkiTrails(ctx, skiTrails)

  // Sort obstacles by Y for proper layering
  const sortedObstacles = [...obstacles].sort((a, b) => a.y - b.y)

  // Draw obstacles behind the player
  sortedObstacles
    .filter((obs) => obs.y + obs.height < PLAYER_Y + PLAYER_HEIGHT / 2)
    .forEach((obs) => {
      if (obs.type === 'tree') {
        drawTree(ctx, obs.x, obs.y, obs.variant)
      } else {
        drawRock(ctx, obs.x, obs.y, obs.variant)
      }
    })

  drawSkier(ctx, playerX, frame)

  // Draw obstacles in front of player
  sortedObstacles
    .filter((obs) => obs.y + obs.height >= PLAYER_Y + PLAYER_HEIGHT / 2)
    .forEach((obs) => {
      if (obs.type === 'tree') {
        drawTree(ctx, obs.x, obs.y, obs.variant)
      } else {
        drawRock(ctx, obs.x, obs.y, obs.variant)
      }
    })

  drawSnowParticles(ctx, snowParticles)
  drawUI(ctx, time, targetTime)
}
