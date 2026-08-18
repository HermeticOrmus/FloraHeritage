import { Helmet } from 'react-helmet-async';

const SITE = 'https://casadelpuente.site';
const SITE_NAME = 'Casa Del Puente';
const DEFAULT_IMAGE = `${SITE}/og.jpg`;
const PHONE = '+50764160902';

const LODGING_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': ['VacationRental', 'LodgingBusiness'],
  name: SITE_NAME,
  url: SITE,
  image: DEFAULT_IMAGE,
  description:
    'Century-old heritage home in Boquete, Panama. Whole-house rental, four botanical bedrooms, gardens, and river access. Four generations of family stewardship since 1920.',
  telephone: PHONE,
  email: 'info@casadelpuente.com',
  priceRange: 'USD 550',
  currenciesAccepted: 'USD',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Boquete',
    addressRegion: 'Chiriquí',
    addressCountry: 'PA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 8.783454651241962,
    longitude: -82.42905447930899,
  },
  numberOfRooms: 4,
  occupancy: {
    '@type': 'QuantitativeValue',
    maxValue: 10,
    unitText: 'guests',
  },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Whole-house exclusive use', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Full kitchen', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Washer and dryer', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Private garden', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Open terrace', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'WiFi', value: true },
  ],
  checkinTime: '15:00',
  checkoutTime: '11:00',
  petsAllowed: false,
  sameAs: [
    'https://instagram.com/casadelpuente_bqt',
    'https://tiktok.com/@casadelpuentepanama',
  ],
};

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  path?: string;
  type?: 'website' | 'article';
}

export default function SEO({
  title = 'Casa Del Puente | Heritage Whole-House Rental in Boquete, Panama',
  description = 'Rent the entire century-old Casa Del Puente in Boquete, Panama. Four botanical bedrooms, gardens, and river access. $550/night, minimum 2 nights, sleeps 10. Book on WhatsApp.',
  keywords = 'Casa Del Puente, Boquete vacation rental, heritage home Panama, whole house rental Boquete, Chiriqui, geisha coffee region, flower capital Panama',
  image = DEFAULT_IMAGE,
  path = '/',
  type = 'website',
}: SEOProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const url = `${SITE}${path === '/' ? '/' : path}`;
  const ogImage = image.startsWith('http') ? image : `${SITE}${image}`;

  return (
    <Helmet>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="es_PA" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <meta name="author" content={SITE_NAME} />
      <meta name="robots" content="index, follow" />
      <meta name="geo.region" content="PA-4" />
      <meta name="geo.placename" content="Boquete, Panama" />
      <meta name="geo.position" content="8.78345;-82.42905" />
      <meta name="ICBM" content="8.78345, -82.42905" />

      <script type="application/ld+json">{JSON.stringify(LODGING_JSON_LD)}</script>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'VideoObject',
          name: 'Casa Del Puente property tour',
          description:
            'Drone tour of Casa Del Puente in Boquete: the namesake bridge, the house in its gardens, and a close flyover of the turquoise roof.',
          thumbnailUrl: `${SITE}/videos/hero-poster.jpg`,
          contentUrl: `${SITE}/videos/hero-tour.mp4`,
          uploadDate: '2026-08-17',
          duration: 'PT15S',
        })}
      </script>
    </Helmet>
  );
}
