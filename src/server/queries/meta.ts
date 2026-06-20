import type { MetadataProps } from "../../lib/data";

// Using React cache to memoize the query
export const getMetadataProps = (): MetadataProps | null => {
  return {
  "modules": {
  "promotions": true
},
  "mainpage": {
  "title": "Inmobiliaria Sol",
  "robots": {
  "index": 1,
  "follow": 1,
  "googleBot": {
  "index": 1,
  "follow": 1,
  "max-snippet": -1,
  "max-image-preview": "large"
}
},
  "twitter": {
  "card": "summary_large_image",
  "title": "",
  "images": [""],
  "description": ""
},
  "keywords": ["inmobiliaria", "León", "pisos", "venta", "alquiler", "casas", "habitaciones"],
  "openGraph": {
  "type": "website",
  "title": "",
  "images": [{
  "alt": "",
  "url": "",
  "width": 1200,
  "height": 630
}],
  "locale": "es_ES",
  "siteName": "",
  "description": ""
},
  "alternates": {
  "canonical": "/"
},
  "description": "Pisos y Casas en León"
}
};
}