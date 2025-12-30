import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ski Haiku | Your 2025 in Three Lines',
  description: 'Generate a beautiful AI haiku for your 2025 intentions. Snow, mountains, and poetry.',
  openGraph: {
    title: 'Ski Haiku',
    description: 'Your 2025 in three lines',
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
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}
