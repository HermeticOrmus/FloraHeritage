import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export default function SEO({
  title = 'Casa Del Puente - Heritage Vacation Rental in Boquete, Panama',
  description = 'Experience four generations of heritage at Casa Del Puente, a century-old vacation home in Boquete, Panama. Four botanical bedrooms, lush gardens, and authentic Panamanian hospitality.',
  keywords = 'vacation rental Panama, Boquete accommodation, heritage home, botanical bedrooms, Panama vacation, cloud forest, coffee region',
  image = '/og-image.jpg',
  url = 'https://casadelpuente.com',
  type = 'website'
}: SEOProps) {
  const siteTitle = 'Casa Del Puente';
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="author" content="Casa Del Puente" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      {/* Geo Tags */}
      <meta name="geo.region" content="PA-4" />
      <meta name="geo.placename" content="Boquete, Panama" />
      <meta name="geo.position" content="8.7833;-82.4333" />
      <meta name="ICBM" content="8.7833, -82.4333" />

      {/* Canonical Link */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
