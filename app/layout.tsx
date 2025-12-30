import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '2025 in Kanji | Your Year, One Character',
  description: 'Generate a custom kanji character that represents your 2025 intentions. AI-powered, culturally inspired.',
  openGraph: {
    title: '2025 in Kanji',
    description: 'What kanji represents your 2025?',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-stone-100 text-stone-900 min-h-screen">
        {children}
      </body>
    </html>
  )
}
