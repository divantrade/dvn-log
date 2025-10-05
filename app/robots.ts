export default function robots() {
  const host = "https://dvnlog.com";
  return {
    rules: [
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${host}/sitemap.xml`,
    host,
  };
}
