import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'
import { projectSlugsQuery, neighborhoodGuideSlugsQuery } from '@/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

  // Fetch all project slugs
  const projectSlugs = await client.fetch<string[]>(projectSlugsQuery).catch(() => [])

  // Fetch all neighborhood guide slugs
  const neighborhoodSlugs = await client
    .fetch<string[]>(neighborhoodGuideSlugsQuery)
    .catch(() => [])

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/legacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  // Project pages
  const projectPages = projectSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Neighborhood guide pages
  const neighborhoodPages = neighborhoodSlugs.map((slug) => ({
    url: `${baseUrl}/nashik-advantage/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...projectPages, ...neighborhoodPages]
}
