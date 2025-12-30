'use client'

interface KanjiDisplayProps {
  kanji: {
    character: string
    reading: string
    meaning: string
    explanation: string
  }
  onReset: () => void
}

export function KanjiDisplay({ kanji, onReset }: KanjiDisplayProps) {
  const shareText = `My 2025 kanji is ${kanji.character} (${kanji.meaning}). What's yours?`
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: '2025 in Kanji',
        text: shareText,
        url: shareUrl,
      })
    } else {
      // Fallback to Twitter
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        '_blank'
      )
    }
  }

  return (
    <div className="space-y-8">
      <div className="washi-texture bg-stone-50 rounded-2xl p-8 shadow-lg">
        <div className="kanji-display text-stone-800 mb-4">
          {kanji.character}
        </div>
        <div className="text-2xl text-stone-600 mb-2">
          {kanji.reading}
        </div>
        <div className="text-xl font-medium text-stone-700">
          {kanji.meaning}
        </div>
      </div>

      <p className="text-stone-600 leading-relaxed">
        {kanji.explanation}
      </p>

      <div className="flex gap-4 justify-center">
        <button
          onClick={handleShare}
          className="py-2 px-6 rounded-lg bg-stone-800 text-white font-medium
                     hover:bg-stone-700 transition-colors"
        >
          Share Your Kanji
        </button>
        <button
          onClick={onReset}
          className="py-2 px-6 rounded-lg border border-stone-300 text-stone-600
                     hover:bg-stone-100 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
