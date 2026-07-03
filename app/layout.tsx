import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { absoluteUrl, siteConfig } from '@/lib/site'
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
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.title,
    template: '%s | Mauri',
  },
  description: siteConfig.description,
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.json',
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
    title: siteConfig.title,
    description: siteConfig.description,
    url: absoluteUrl('/'),
    siteName: siteConfig.name,
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        alt: 'Mauri hormonal health support',
      },
    ],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
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
