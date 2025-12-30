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
  const shareText = `My 2026 kanji is ${kanji.character} (${kanji.meaning}). What's yours?`
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: '2026 in Kanji',
        text: shareText,
        url: shareUrl,
      })
    } else {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        '_blank'
      )
    }
  }

  return (
    <div className="space-y-6">
      {/* Main kanji card */}
      <div className="washi-paper rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden">
        {/* Year badge */}
        <div className="inline-flex items-center gap-2 mb-8">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--color-frost)]" />
          <span className="text-xs tracking-[0.2em] text-[var(--color-mountain)] uppercase font-medium">
            Your 2026 Kanji
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--color-frost)]" />
        </div>

        {/* The kanji character */}
        <div className="kanji-character mb-6">
          {kanji.character}
        </div>

        {/* Reading */}
        <div className="font-japanese text-xl sm:text-2xl text-[var(--color-mountain)] mb-2">
          {kanji.reading}
        </div>

        {/* Meaning */}
        <div className="font-japanese text-lg sm:text-xl font-semibold text-[var(--color-deep)]">
          {kanji.meaning}
        </div>

        {/* Red seal */}
        <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10">
          <div className="hanko">
            2026
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="washi-paper rounded-xl p-5 sm:p-6">
        <p className="text-[var(--color-deep)] leading-relaxed text-center text-sm sm:text-base">
          {kanji.explanation}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={handleShare}
          className="btn-primary flex-1 text-center"
        >
          Share Your Kanji
        </button>
        <button
          onClick={onReset}
          className="btn-secondary flex-1 text-center"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
