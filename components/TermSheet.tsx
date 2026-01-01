'use client'

interface TermSheetProps {
  time: number
  onPlayAgain: () => void
}

export function TermSheet({ time, onPlayAgain }: TermSheetProps) {
  const shareOnTwitter = () => {
    const text = `I beat Andrew Chen in A16Z Speedrun! Survived ${time.toFixed(2)}s on the slopes. Secured the bag. ⛷️🏔️`
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, '_blank', 'width=550,height=420')
  }

  return (
    <div className="fortune-reveal">
      <div className="term-sheet rounded-lg p-6 mb-6">
        {/* Header */}
        <div className="text-center border-b-2 border-gray-300 pb-4 mb-4">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Andreessen Horowitz</p>
          <h2 className="text-2xl font-bold text-gray-900">TERM SHEET</h2>
          <p className="text-xs text-gray-500 mt-1">A16Z Speedrun Fund I</p>
        </div>

        {/* Content */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Issuer:</span>
            <span className="font-semibold text-gray-900">You, Shredder of Slopes</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time Survived:</span>
            <span className="font-semibold text-green-600">{time.toFixed(2)}s</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Andrew Chen&apos;s Time:</span>
            <span className="font-semibold text-gray-900">10.00s</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className="font-bold text-green-600">BEATEN ✓</span>
          </div>
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Investment:</span>
              <span className="font-bold text-gray-900">$100M @ $1B valuation</span>
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-gray-500">Approved by</p>
              <p className="font-serif italic text-lg text-gray-700">Andrew Chen</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Date</p>
              <p className="text-sm text-gray-700">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={shareOnTwitter}
          className="btn-ski flex-1 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Share Victory
        </button>
        <button
          onClick={onPlayAgain}
          className="btn-ski-secondary flex-1"
        >
          Run Again
        </button>
      </div>
    </div>
  )
}
