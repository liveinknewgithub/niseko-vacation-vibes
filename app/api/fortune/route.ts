import { NextResponse } from 'next/server'

export async function POST() {
  // TODO: Integrate with Claude API for dynamic fortune generation

  const fortunes = [
    {
      fortune: 'Like water finding its path down the mountain, your year will flow toward unexpected opportunities.',
      element: 'Water',
      advice: 'Trust the current. Resistance creates turbulence; acceptance brings peace.',
      luckyNumber: 7,
    },
    {
      fortune: 'The steam rises and dissipates, but the warmth remains. Your actions this year will have lasting impact.',
      element: 'Fire',
      advice: 'Seek not to be remembered, but to create warmth that others carry forward.',
      luckyNumber: 3,
    },
    {
      fortune: 'Deep beneath the snow, the earth prepares for spring. Your patience will yield abundance.',
      element: 'Earth',
      advice: 'Plant seeds now that you cannot yet imagine harvesting.',
      luckyNumber: 8,
    },
  ]

  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]

  return NextResponse.json(randomFortune)
}
