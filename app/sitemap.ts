import { MetadataRoute } from 'next';

const BASE_URL = 'https://dvnlog.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/blog',
    '/tracking',
    '/services',
    '/services/ocean-freight',
    '/services/air-freight',
    '/services/road-transport',
    '/services/rail-freight',
    '/services/warehousing',
    '/services/project-cargo',
    '/services/multimodal',
    '/services/customs',
    '/careers',
    '/news',
    '/privacy',
    '/terms',
    '/cookies',
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPages.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : route.startsWith('/services') ? 0.9 : 0.8,
  }));

  return staticRoutes;
}
