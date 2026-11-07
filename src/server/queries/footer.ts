
import type { FooterProps } from "../../lib/data";

export const getFooterProps = (_accountIdArg?: bigint): FooterProps | null => {
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
  "alt": "Programa Kit Digital financiado por los fondos Next Generation del Mecanismo de Recuperación y Resiliencia. Financiado por la Unión Europea NextGenerationEU, Gobierno de España, Red.es, Plan de Recuperación, Transformación y Resiliencia, Kit Digital",
  "src": "https://vesta-crm-prod-eu-e966e353.s3.eu-west-1.amazonaws.com/accounts/103/website/footer/kit-digital-logos.png",
  "wide": true
}]
};
}
