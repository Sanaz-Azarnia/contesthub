import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://contesthub.sanazazarnia.com',
      lastModified: new Date(),
    },
    {
      url: 'https://contesthub.sanazazarnia.com/contests',
      lastModified: new Date(),
    },
    {
      url: 'https://contesthub.sanazazarnia.com/leaderboard',
      lastModified: new Date(),
    },
   
  ]
}