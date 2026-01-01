'use client'

import { shareToTwitter, getPageUrl } from '@/lib/share'

interface GameOverProps {
  time: number
  onPlayAgain: () => void
}

export function GameOver({ time, onPlayAgain }: GameOverProps) {
  const handleShare = () => {
    const text = `I survived ${time.toFixed(2)}s in A16Z Speedrun but Andrew Chen still has me beat. Can you do better?`
    shareToTwitter(text, getPageUrl())
  }

  const percentComplete = Math.min((time / 69) * 100, 100).toFixed(0)

  return (
    <div className="fortune-reveal text-center">
      <div className="py-6">
        <div className="text-6xl mb-4">🌲</div>
        <h2 className="text-2xl font-bold text-white mb-2">Crashed!</h2>
        <p className="text-ski-light mb-4">
          Andrew Chen still beats you
        </p>

        <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
          <div className="text-4xl font-bold text-ski-orange mb-1">
            {time.toFixed(2)}s
          </div>
          <p className="text-ski-muted text-sm">
            {percentComplete}% of the way there
          </p>
          <div className="mt-3 bg-gray-700 rounded-full h-2">
            <div
              className="bg-ski-orange rounded-full h-2 transition-all"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
          <p className="text-ski-muted text-xs mt-2">
            Target: 69.00s
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onPlayAgain}
          className="btn-ski flex-1"
        >
          Try Again
        </button>
        <button
          onClick={handleShare}
          className="btn-ski-secondary flex-1 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Share Attempt
        </button>
      </div>
    </div>
  )
}
