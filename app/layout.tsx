import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Powder Promise | Your 2025 Commitment',
  description: 'Make a beautiful commitment for 2025. Fresh powder, fresh start. Create a shareable promise card.',
  openGraph: {
    title: 'Powder Promise',
    description: 'Fresh powder, fresh start. What do you promise for 2025?',
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
      <body className="bg-slate-50 text-slate-900 min-h-screen">
        {children}
      </body>
    </html>
  )
}
