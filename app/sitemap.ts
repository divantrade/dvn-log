export default async function sitemap() {
  const base = "https://dvnlog.com";
  const now = new Date().toISOString();

  const routes = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/track`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  return routes;
}
