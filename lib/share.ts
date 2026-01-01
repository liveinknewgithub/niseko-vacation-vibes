/**
 * Share content to Twitter/X
 */
export function shareToTwitter(text: string, url?: string): void {
  const params = new URLSearchParams({ text })
  if (url) {
    params.set('url', url)
  }
  window.open(
    `https://twitter.com/intent/tweet?${params.toString()}`,
    '_blank',
    'width=550,height=420'
  )
}

/**
 * Share using native share API (mobile) with Twitter fallback
 */
export async function share(
  title: string,
  text: string,
  url: string
): Promise<void> {
  if (navigator.share) {
    await navigator.share({ title, text, url })
  } else {
    shareToTwitter(text, url)
  }
}

/**
 * Get current page URL (safe for SSR)
 */
export function getPageUrl(): string {
  return typeof window !== 'undefined' ? window.location.href : ''
}
