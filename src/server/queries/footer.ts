
import type { FooterProps } from "../../lib/data";

export const getFooterProps = (): FooterProps | null => {
  return {
  "companyName": "Inmobiliaria Sol",
  "description": "Somos tu inmobiliaria de confianza",
  "socialLinks": {

},
  "officeLocations": [],
  "quickLinksVisibility": {
  "inicio": true,
  "vender": false,
  "comprar": false,
  "alquilar": false,
  "contacto": true,
  "nosotros": true,
  "reseñas": true,
  "propiedades": true
},
  "propertyTypesVisibility": {
  "casas": true,
  "pisos": true,
  "garajes": true,
  "locales": true,
  "solares": true
},
  "copyright": "© 2026 Inmobiliaria Sol",
  "legalBadges": [{
  "alt": "Financiado por la Unión Europea — NextGenerationEU",
  "src": "https://vesta-crm-prod-eu-e966e353.s3.eu-west-1.amazonaws.com/accounts/103/website/footer/financiado-union-europea-next-generation.jpeg"
}, {
  "alt": "Plan de Recuperación, Transformación y Resiliencia",
  "src": "https://vesta-crm-prod-eu-e966e353.s3.eu-west-1.amazonaws.com/accounts/103/website/footer/plan-recuperacion-transformacion-resiliencia.jpeg"
}]
};
}
