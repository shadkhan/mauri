import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: {
    default: 'Mauri | Integrative PCOS, PCOD & Hormonal Health Support',
    template: '%s | Mauri',
  },
  description:
    'A gentle hormonal health journey for PCOS, PCOD, painful periods, phenotype awareness, and care team conversation preparation.',
  icons: {
    icon: [
      {
        url: '/brand/mauri-mark.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/brand/mauri-mark.svg',
    apple: '/brand/mauri-app-icon-1024.svg',
  },
  openGraph: {
    title: 'Mauri | Integrative PCOS, PCOD & Hormonal Health Support',
    description:
      'Understand your hormonal pattern, prepare for better Mauri care team conversations, and move from confusion to clarity.',
    type: 'website',
    images: ['/brand/mauri-logo-primary.svg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-inter">{children}</body>
    </html>
  )
}
