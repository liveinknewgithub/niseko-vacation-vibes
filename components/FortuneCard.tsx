'use client'

interface FortuneCardProps {
  fortune: {
    fortune: string
    element: string
    advice: string
    luckyNumber: number
  }
  onReset: () => void
}

export function FortuneCard({ fortune, onReset }: FortuneCardProps) {
  const shareText = `The Onsen Oracle spoke: "${fortune.fortune}" My element is ${fortune.element}. What's your 2026 fortune?`
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'The Onsen Oracle',
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
    <div className="fortune-reveal">
      <div className="fortune-card rounded-2xl p-6 sm:p-8 text-amber-900 mb-6">
        <div className="text-center mb-6">
          <div className="text-xs uppercase tracking-[0.2em] text-amber-700/70 mb-2">
            Your 2026 Fortune
          </div>
          <div className="h-px w-16 mx-auto bg-gradient-to-r from-transparent via-amber-600/40 to-transparent" />
        </div>

        <blockquote className="font-japanese text-xl sm:text-2xl font-medium leading-relaxed mb-8 text-center">
          "{fortune.fortune}"
        </blockquote>

        <div className="grid grid-cols-2 gap-4 text-sm border-t border-amber-400/30 pt-5">
          <div className="text-center">
            <div className="text-amber-700/60 uppercase tracking-wider text-xs mb-1">Element</div>
            <div className="font-japanese font-semibold text-amber-900">{fortune.element}</div>
          </div>
          <div className="text-center">
            <div className="text-amber-700/60 uppercase tracking-wider text-xs mb-1">Lucky Number</div>
            <div className="font-japanese font-semibold text-amber-900">{fortune.luckyNumber}</div>
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-amber-400/30">
          <div className="text-amber-700/60 uppercase tracking-wider text-xs mb-2 text-center">Guidance</div>
          <p className="text-sm text-amber-800 text-center leading-relaxed">{fortune.advice}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={handleShare}
          className="btn-share"
        >
          Share Fortune
        </button>
        <button
          onClick={onReset}
          className="btn-secondary"
        >
          Seek Again
        </button>
      </div>
    </div>
  )
}
