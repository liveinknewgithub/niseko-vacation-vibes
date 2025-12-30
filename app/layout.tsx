import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hatsuhinode | Your First Sunrise of 2025',
  description: 'Generate a personalized AI artwork of your first sunrise of 2025. Based on the Japanese tradition of watching the first sunrise.',
  openGraph: {
    title: 'Hatsuhinode - First Sunrise 2025',
    description: 'What does your first sunrise look like?',
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
      <body className="bg-gradient-to-b from-indigo-950 via-purple-900 to-orange-600 min-h-screen">
        {children}
      </body>
    </html>
  )
}
