import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { vibe } = await request.json()

  // TODO: Integrate with Claude API for dynamic haiku generation
  // For now, return placeholder haikus

  const haikuTemplates: Record<string, [string, string, string]> = {
    adventure: [
      'Fresh tracks in the snow',
      'Mountain peaks call to the brave',
      'New paths await me',
    ],
    peace: [
      'Stillness on the slope',
      'Only wind whispers my name',
      'Mind like fallen snow',
    ],
    growth: [
      'Seeds beneath the ice',
      'Patient through the coldest months',
      'Spring will find me changed',
    ],
    joy: [
      'Laughter echoes far',
      'Dancing down the mountainside',
      'Heart full of white light',
    ],
    freedom: [
      'No maps guide me now',
      'Wind and snow my only friends',
      'I choose my own way',
    ],
    default: [
      'Two thousand twenty',
      'Five begins with hope renewed',
      'Each moment, a gift',
    ],
  }

  const normalizedVibe = vibe.toLowerCase().trim()
  const lines = haikuTemplates[normalizedVibe] || haikuTemplates.default

  return NextResponse.json({ lines })
}
