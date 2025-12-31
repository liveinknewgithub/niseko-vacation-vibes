import { NextResponse } from 'next/server'

export async function POST() {
  const fortunes = [
    'Like water finding its path down the mountain, your year will flow toward unexpected opportunities.',
    'The steam rises and dissipates, but the warmth remains. Your actions this year will have lasting impact.',
    'Deep beneath the snow, the earth prepares for spring. Your patience will yield abundance.',
    'A single hot spring feeds many pools. Your generosity will return to you tenfold.',
    'The mountain does not seek the clouds; they come naturally. Stop chasing and start attracting.',
    'In stillness, the water reflects perfectly. Find moments of quiet to see your true path.',
    'The coldest winters produce the most soothing springs. Your struggles are forging something beautiful.',
    'Steam knows no boundaries. Let your ideas spread freely without attachment to their form.',
    'The onsen heals because it gives without asking. Practice unconditional kindness.',
    'Ancient waters carry ancient wisdom. Listen to those who came before you.',
    'The surface may freeze, but depths remain warm. Protect your inner fire.',
    'Hot springs emerge where pressure meets opportunity. Embrace your challenges.',
    'Water that stays still becomes stagnant. Keep moving, keep growing, keep flowing.',
    'The mountain shares its warmth with all who visit. Be generous with your gifts.',
    'Mist obscures the path but not the destination. Trust your direction even when you cannot see.',
  ]

  const elements = ['Water', 'Fire', 'Earth', 'Wind', 'Void']

  const advices = [
    'Trust the current. Resistance creates turbulence; acceptance brings peace.',
    'Seek not to be remembered, but to create warmth that others carry forward.',
    'Plant seeds now that you cannot yet imagine harvesting.',
    'What you release will return transformed. Let go freely.',
    'Your presence is your greatest gift. Be fully where you are.',
    'The answer you seek is already within you. Be still and listen.',
    'Small acts of courage compound into a life of bravery.',
    'Nurture your relationships like a garden—with patience and daily attention.',
    'Your limitations are invitations to creativity. Embrace constraints.',
    'The universe rewards those who act despite uncertainty.',
  ]

  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
  const randomElement = elements[Math.floor(Math.random() * elements.length)]
  const randomAdvice = advices[Math.floor(Math.random() * advices.length)]
  const randomNumber = Math.floor(Math.random() * 99) + 1

  return NextResponse.json({
    fortune: randomFortune,
    element: randomElement,
    advice: randomAdvice,
    luckyNumber: randomNumber,
  })
}
