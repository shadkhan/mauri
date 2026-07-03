import type { MetadataRoute } from 'next'
import { absoluteUrl, siteConfig } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mauri',
    short_name: 'Mauri',
    description: siteConfig.description,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#F7F6F2',
    theme_color: '#1D9E75',
    icons: [
      {
        src: absoluteUrl('/brand/mauri-mark.svg'),
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: absoluteUrl('/brand/mauri-app-icon-1024.svg'),
        sizes: '1024x1024',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: absoluteUrl('/brand/mauri-app-icon-1024.svg'),
        sizes: '1024x1024',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  }
}
