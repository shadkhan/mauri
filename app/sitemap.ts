import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site'
import { articles } from '@/lib/articles'

const staticRoutes = [
  '',
  '/about',
  '/blog',
  '/phenotype',
  '/learning-library',
  '/recovery-roadmap',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route || '/'),
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))

  const blogRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(`/blog/${article.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...routes, ...blogRoutes]
}
