import type { HeroProps } from "../../lib/data";
import { getContactProps } from "./contact";

export type HeroPropsWithCities = HeroProps & { cities: string[] };

/**
 * Cities used for the homepage rotation and the navbar "Zonas" dropdown.
 * Sourced from the offices configured in `website_config.contact_props`,
 * not from the listings table — this is the authoritative list of cities
 * the agency has a physical presence in.
 */
export const getHeroCities = (): string[] => {
  return ["León"];
}

// Using React cache to memoize the query
export const getHeroProps = (): HeroProps | null => {
  return {
  "title": "Encontramos la casa de tus sueños",
  "subtitle": "Ayudando a personas a encontrar su hogar desde hace más de 35 años",
  "backgroundImage": "",
  "backgroundVideo": "https://inmobiliariaacropolis.s3.us-east-1.amazonaws.com/accounts/103/hero/background_1779812905204_ZHsFL3.mp4",
  "backgroundType": "video",
  "findPropertyButton": "Encuentra tu casa",
  "contactButton": "Ponte en contacto"
};
}
