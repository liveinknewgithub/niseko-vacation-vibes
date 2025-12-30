import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic()

export async function POST(request: NextRequest) {
  const { intention } = await request.json()

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are a Japanese language and culture expert. Given the following intention or theme for 2026: "${intention}"

Select a single, real kanji character that best represents this intention. Choose thoughtfully - pick a kanji that truly embodies the spirit of what they're expressing.

Respond with ONLY valid JSON in this exact format (no markdown, no code blocks):
{
  "character": "the single kanji character",
  "reading": "the reading in hiragana and romaji, e.g. 夢 = ゆめ (yume)",
  "meaning": "the core meaning in 2-4 words",
  "explanation": "2-3 sentences explaining why this kanji captures the essence of their intention for 2026. Make it personal and inspiring."
}`
        }
      ]
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type')
    }

    const result = JSON.parse(content.text)
    return NextResponse.json(result)

  } catch (error) {
    console.error('Error generating kanji:', error)

    // Fallback responses if API fails
    const fallbacks = [
      {
        character: '夢',
        reading: 'ゆめ (yume)',
        meaning: 'Dream, Vision',
        explanation: 'This kanji represents the dreams and aspirations you hold for 2026. Like fresh powder on a mountain peak, your vision for the future is pure and full of possibility.',
      },
      {
        character: '力',
        reading: 'ちから (chikara)',
        meaning: 'Strength, Power',
        explanation: 'This kanji embodies the inner strength you\'ll cultivate in 2026. Like a mountain standing firm against winter storms, you have the power to overcome any challenge.',
      },
      {
        character: '和',
        reading: 'わ (wa)',
        meaning: 'Harmony, Peace',
        explanation: 'This kanji captures the balance and harmony you seek in 2026. Like the stillness of a snow-covered forest, true peace comes from finding equilibrium within.',
      },
      {
        character: '挑',
        reading: 'いどむ (idomu)',
        meaning: 'Challenge, Venture',
        explanation: 'This kanji represents your spirit of adventure for 2026. Like a skier facing an untouched slope, you\'re ready to embrace new challenges with courage.',
      },
      {
        character: '結',
        reading: 'むすぶ (musubu)',
        meaning: 'Connect, Bond',
        explanation: 'This kanji symbolizes the meaningful connections you\'ll forge in 2026. Like trails that weave through mountains, your relationships will create beautiful patterns.',
      },
    ]

    const randomFallback = fallbacks[Math.floor(Math.random() * fallbacks.length)]
    return NextResponse.json(randomFallback)
  }
}
