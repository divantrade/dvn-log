export default function SeoJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DVN Logistics",
    url: "https://dvnlog.com/",
    logo: "https://dvnlog.com/icon.svg",
    sameAs: [
      "https://www.facebook.com/",
      "https://www.linkedin.com/"
    ]
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DVN Logistics",
    url: "https://dvnlog.com/",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://dvnlog.com/track?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  );
}
