'use client'

interface HaikuDisplayProps {
  haiku: {
    lines: [string, string, string]
    vibe: string
  }
  onReset: () => void
}

export function HaikuDisplay({ haiku, onReset }: HaikuDisplayProps) {
  const shareText = `My 2025 Haiku:\n\n${haiku.lines.join('\n')}\n\nWhat's yours?`
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Ski Haiku',
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
      <div className="haiku-card rounded-2xl p-8">
        <div className="text-xs uppercase tracking-widest text-slate-500 mb-6">
          {haiku.vibe} • 2025
        </div>

        <div className="haiku-text space-y-3">
          {haiku.lines.map((line, index) => (
            <p
              key={index}
              className="text-2xl text-slate-800 leading-relaxed ink-brush inline-block"
            >
              {line}
            </p>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-slate-200 text-sm text-slate-500">
          5-7-5
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={handleShare}
          className="py-3 px-6 rounded-xl bg-white text-slate-800 font-medium
                     hover:bg-slate-50 transition-colors shadow-lg"
        >
          Share
        </button>
        <button
          onClick={onReset}
          className="py-3 px-6 rounded-xl bg-white/20 text-white font-medium
                     hover:bg-white/30 transition-colors backdrop-blur"
        >
          New Haiku
        </button>
      </div>
    </div>
  )
}
