import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Onsen Oracle | Your 2026 Fortune Awaits',
  description: 'Soak in your destiny. Let the ancient wisdom of the hot springs reveal your 2026 fortune.',
  openGraph: {
    title: 'The Onsen Oracle',
    description: 'Soak in your destiny',
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
      <body className="min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
