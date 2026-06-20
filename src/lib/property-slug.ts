import { normalizeForUrl } from "./utils";

const MAX_SLUG_LENGTH = 70;

const PROPERTY_TYPE_DISPLAY: Record<string, string> = {
  piso: "Piso",
  apartamento: "Apartamento",
  casa: "Casa",
  chalet: "Chalet",
  local: "Local",
  solar: "Solar",
  garaje: "Garaje",
  edificio: "Edificio",
  oficina: "Oficina",
  industrial: "Nave industrial",
  trastero: "Trastero",
};

export interface PropertyAltInput {
  title?: string | null;
  propertyType?: string | null;
  city?: string | null;
  bedrooms?: number | null;
  squareMeter?: number | null;
  listingType?: string | null;
}

/**
 * Builds descriptive SEO/accessibility-friendly alt text for property images.
 * Falls back gracefully when fields are missing.
 */
export function buildPropertyImageAlt(
  input: PropertyAltInput,
  index?: number,
): string {
  const typeKey = input.propertyType?.toLowerCase();
  const typeLabel = typeKey
    ? (PROPERTY_TYPE_DISPLAY[typeKey] ?? typeKey)
    : "Propiedad";

  const parts: string[] = [typeLabel];

  if (
    input.listingType === "Rent" ||
    input.listingType === "RentWithOption"
  ) {
    parts.push("en alquiler");
  } else if (input.listingType === "Sale") {
    parts.push("en venta");
  }

  if (input.city) parts.push(`en ${input.city}`);
  if (input.bedrooms && input.bedrooms > 0) {
    parts.push(
      `con ${input.bedrooms} ${input.bedrooms === 1 ? "habitación" : "habitaciones"}`,
    );
  }
  if (input.squareMeter && input.squareMeter > 0) {
    parts.push(`de ${input.squareMeter} m²`);
  }

  const base = input.title?.trim() || parts.join(" ");
  if (typeof index === "number" && index > 0) {
    return `${base} - Foto ${index + 1}`;
  }
  return base;
}

/** Title-case a free-text label ("ático dúplex" → "Ático Dúplex"). */
function titleCaseLabel(s: string): string {
  return s
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export interface PropertyLocalityInput {
  neighborhood?: string | null;
  municipality?: string | null;
  city?: string | null;
}

/**
 * Resolves the most specific available locality for a listing:
 * neighborhood → municipality → city. Used for titles and map pins so the
 * label prefers the barrio, then the municipio, then the city.
 */
export function resolvePropertyLocality(
  input: PropertyLocalityInput,
): string | null {
  return (
    input.neighborhood?.trim() ||
    input.municipality?.trim() ||
    input.city?.trim() ||
    null
  );
}

export interface PropertyDisplayTitleInput extends PropertyLocalityInput {
  title?: string | null;
  propertyType?: string | null;
  propertySubtype?: string | null;
}

/**
 * Human-friendly display title for a listing. Uses the stored title when present,
 * otherwise composes one as "<subtype> en <locality>" (e.g. "Ático en Centro"),
 * falling back to the property type and then to "Propiedad". Guards against null
 * titles leaking into the browser tab / <h1> / breadcrumbs.
 */
export function buildPropertyDisplayTitle(
  input: PropertyDisplayTitleInput,
): string {
  const stored = input.title?.trim();
  if (stored) return stored;

  const subtype = input.propertySubtype?.trim();
  const typeKey = input.propertyType?.toLowerCase();
  const typeLabel = subtype
    ? titleCaseLabel(subtype)
    : typeKey
      ? (PROPERTY_TYPE_DISPLAY[typeKey] ?? titleCaseLabel(typeKey))
      : "Propiedad";

  const locality = resolvePropertyLocality(input);
  return locality ? `${typeLabel} en ${locality}` : typeLabel;
}

const PROPERTY_TYPE_SLUG: Record<string, string> = {
  piso: "piso",
  apartamento: "apartamento",
  casa: "casa",
  chalet: "chalet",
  local: "local",
  solar: "solar",
  garaje: "garaje",
  edificio: "edificio",
  oficina: "oficina",
  industrial: "nave-industrial",
  trastero: "trastero",
};

export interface PropertySlugInput {
  listingId: string | number | bigint;
  title?: string | null;
  propertyType?: string | null;
  city?: string | null;
  bedrooms?: number | null;
  listingType?: string | null;
}

/**
 * Builds a canonical, SEO-friendly slug for a property listing.
 * Format: "<type>-<bedrooms>-hab-<city>-<title>-<id>"
 * Trailing numeric id is the source of truth and what the page uses to resolve.
 */
export function buildPropertySlug(input: PropertySlugInput): string {
  const id = String(input.listingId);
  const parts: string[] = [];

  const typeKey = input.propertyType?.toLowerCase();
  const typeSlug = typeKey ? (PROPERTY_TYPE_SLUG[typeKey] ?? typeKey) : null;
  if (typeSlug) parts.push(typeSlug);

  if (input.bedrooms && input.bedrooms > 0) {
    parts.push(`${input.bedrooms}-hab`);
  }

  if (input.listingType === "Rent" || input.listingType === "RentWithOption") {
    parts.push("alquiler");
  }

  if (input.city) parts.push(input.city);
  if (input.title) parts.push(input.title);

  if (parts.length === 0) return id;

  const slugBody = parts
    .map((p) => normalizeForUrl(p))
    .filter(Boolean)
    .join("-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, MAX_SLUG_LENGTH)
    .replace(/-+$/g, "");

  return slugBody ? `${slugBody}-${id}` : id;
}

/**
 * Extracts the numeric listing ID from the end of a property slug.
 * Accepts both legacy numeric-only slugs ("123") and descriptive ones
 * ("piso-3-hab-madrid-123"). Returns null if no valid trailing id.
 */
export function parsePropertySlug(
  slug: string,
): { id: number; raw: string } | null {
  const raw = decodeURIComponent(slug);
  const match = /(\d+)$/.exec(raw);
  if (!match) return null;
  const id = parseInt(match[1]!, 10);
  if (!Number.isFinite(id) || id <= 0) return null;
  return { id, raw };
}
