const productionUrl = 'https://www.mauri.in'

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, '')
}

export const appUrl = trimTrailingSlash(
  process.env.NEXT_PUBLIC_APP_URL || productionUrl,
)

export const apiUrl = trimTrailingSlash(
  process.env.NEXT_PUBLIC_API_URL || '/api',
)

export function absoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${appUrl}${normalizedPath}`
}

export function apiEndpoint(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${apiUrl}${normalizedPath}`
}

export const siteConfig = {
  name: 'Mauri',
  url: appUrl,
  apiUrl,
  title: 'Mauri | PCOS, PCOD and Hormonal Health Support',
  description:
    'Mauri helps women understand PCOS, PCOD, painful periods, and hormonal patterns with educational wellness guidance and supportive body literacy.',
  ogImage: absoluteUrl('/brand/mauri-logo-primary.svg'),
}
