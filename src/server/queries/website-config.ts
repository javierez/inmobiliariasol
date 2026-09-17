
import {
  type CardDisplayConfig,
  DEFAULT_CARD_DISPLAY,
  resolveCardDisplay,
} from "~/lib/card-display";
// Sólo el tipo: `listings.ts` importa de aquí en tiempo de ejecución, y un
// import de valor cerraría el ciclo.
import type { SortOption } from "./listings";
import {
  isAccount139,
  ACCOUNT_139_DESCRIPTION_ALIGN,
} from "~/lib/account-overrides/139";
import {
  isAccount155,
  ACCOUNT_155_FEATURED_MODE,
  ACCOUNT_155_FEATURED_GRID_COUNT,
} from "~/lib/account-overrides/155";
import { parseGoogleTag } from "~/lib/google-tag";

export type LinkItem = {
  title: string;
  url: string;
};

export type LinkCategory = {
  name: string;
  links: LinkItem[];
};

export const getLinksProps = (_accountIdArg?: bigint): LinkCategory[] => {
  return [{
  "name": "Organismos Nacionales",
  "links": [{
  "title": "Catastro",
  "url": "https://www1.sedecatastro.gob.es/CYCBienInmueble/OVCBusqueda.aspx"
}, {
  "title": "INE (Instituto Nacional de Estadística)",
  "url": "https://www.ine.es/"
}, {
  "title": "Calculadora IPC",
  "url": "https://www.ine.es/calcula/?lang=es"
}, {
  "title": "AEMET (El Tiempo)",
  "url": "https://www.aemet.es/es/eltiempo/prediccion/municipios"
}, {
  "title": "DGT (Dirección General de Tráfico)",
  "url": "https://www.dgt.es/"
}, {
  "title": "Sigpac",
  "url": "https://sigpac.mapa.es/fega/visor/"
}, {
  "title": "Ponle Freno",
  "url": "https://www.antena3.com/ponlefreno/"
}]
}, {
  "name": "Organismos Regionales",
  "links": [{
  "title": "Boletín Oficial Castilla y León",
  "url": "https://bocyl.jcyl.es/"
}, {
  "title": "Boletín Oficial Bizkaia",
  "url": "https://apps.bizkaia.eus/BT00/"
}, {
  "title": "Catastro Bizkaia",
  "url": "https://web.bizkaia.eus/es/catastro-de-bizkaia"
}, {
  "title": "Valoración Urbana (Castilla y León)",
  "url": "https://servicios4.jcyl.es/ora_iguiaexp/pac_ubicacion.proc_1"
}, {
  "title": "Valoración Rústica (Castilla y León)",
  "url": "https://servicios4.jcyl.es/ora_iguiaexp/iguia.rus_ubica_rustica"
}, {
  "title": "Valoración Urbana (Bizkaia)",
  "url": "https://apps.bizkaia.net/KUPW/servlet/webAgentKUPW"
}, {
  "title": "Valoración Rústica (Bizkaia)",
  "url": "https://apps.bizkaia.net/KUPW/servlet/webAgentKUPW"
}, {
  "title": "Ayuntamiento de León",
  "url": "https://www.aytoleon.es/es/Paginas/home.aspx"
}, {
  "title": "Ayuntamiento de Valladolid",
  "url": "https://www.valladolid.es/es"
}]
}, {
  "name": "Organismos Provinciales",
  "links": [{
  "title": "Diputación de León",
  "url": "https://www.dipuleon.es/"
}, {
  "title": "Diputación de Zamora",
  "url": "https://www.diputaciondezamora.es/"
}, {
  "title": "Diputación de Bizkaia",
  "url": "https://web.bizkaia.eus/es/"
}]
}, {
  "name": "Organismos Locales",
  "links": [{
  "title": "Ayuntamiento de Benavente",
  "url": "https://www.benavente.es/aytobenavente"
}, {
  "title": "Ayuntamiento de León",
  "url": "https://www.aytoleon.es/es/Paginas/home.aspx"
}, {
  "title": "Ayuntamiento de Bilbao",
  "url": "https://www.bilbao.eus/"
}]
}, {
  "name": "Buscadores",
  "links": [{
  "title": "Google",
  "url": "https://www.google.es/"
}, {
  "title": "Yahoo",
  "url": "https://es.yahoo.com/"
}, {
  "title": "Bing",
  "url": "https://www.bing.com/"
}, {
  "title": "Guía Repsol",
  "url": "https://www.guiarepsol.com/"
}, {
  "title": "Vía Michelin",
  "url": "https://www.viamichelin.es/"
}]
}, {
  "name": "Vídeos",
  "links": [{
  "title": "YouTube",
  "url": "https://www.youtube.com/"
}, {
  "title": "Google Vídeos",
  "url": "https://www.google.es/videohp"
}]
}, {
  "name": "Prensa Diaria",
  "links": [{
  "title": "La Opinión de Zamora",
  "url": "https://www.laopiniondezamora.es/"
}, {
  "title": "El Diario de León",
  "url": "https://www.diariodeleon.es/"
}, {
  "title": "El Correo Bizkaia",
  "url": "https://www.elcorreo.com/bizkaia/"
}, {
  "title": "ABC",
  "url": "https://www.abc.es/"
}, {
  "title": "El País",
  "url": "https://www.elpais.com/"
}, {
  "title": "El Mundo",
  "url": "https://www.elmundo.es/"
}, {
  "title": "Marca",
  "url": "https://www.marca.com/"
}, {
  "title": "AS",
  "url": "https://www.as.com/"
}, {
  "title": "Sport",
  "url": "https://www.sport.es/"
}, {
  "title": "Información Alicante",
  "url": "https://www.diarioinformacion.com/alicante/"
}, {
  "title": "El Periódico Mediterráneo",
  "url": "https://www.elperiodicomediterraneo.com/"
}, {
  "title": "La Opinión de Murcia",
  "url": "https://www.laopiniondemurcia.es/"
}]
}, {
  "name": "Prensa Digital",
  "links": [{
  "title": "Estrella Digital",
  "url": "https://www.estrelladigital.es/"
}, {
  "title": "EuropaPress",
  "url": "https://www.europapress.es/"
}]
}, {
  "name": "Emisoras de Radio",
  "links": [{
  "title": "Cadena Dial",
  "url": "https://www.cadenadial.com/"
}, {
  "title": "Radio Milles",
  "url": "https://www.sintoniafm.es/"
}, {
  "title": "Cadena Ser",
  "url": "https://www.cadenaser.com/"
}, {
  "title": "Cope",
  "url": "https://www.cope.es/"
}, {
  "title": "Radio Nacional",
  "url": "https://www.rtve.es/radio/"
}, {
  "title": "Radio Nacional 5",
  "url": "https://www.rtve.es/radio/radio5/"
}, {
  "title": "Cadena 100",
  "url": "https://www.cadena100.es/"
}, {
  "title": "M80 Radio",
  "url": "https://www.m80radio.com/"
}, {
  "title": "Onda Cero",
  "url": "https://www.ondacero.es/"
}, {
  "title": "Kiss FM",
  "url": "https://www.kissfm.es/"
}, {
  "title": "Los 40 Principales",
  "url": "https://www.los40.com/"
}, {
  "title": "Europa FM",
  "url": "https://www.europafm.com/"
}]
}, {
  "name": "Televisión",
  "links": [{
  "title": "La 1 (RTVE)",
  "url": "https://www.rtve.es/"
}, {
  "title": "Antena 3",
  "url": "https://www.antena3.com/"
}, {
  "title": "Cuatro",
  "url": "https://www.cuatro.com/"
}, {
  "title": "Telecinco",
  "url": "https://www.telecinco.es/"
}, {
  "title": "La Sexta",
  "url": "https://www.lasexta.com/"
}, {
  "title": "ETB",
  "url": "https://www.eitb.eus/es/television/"
}, {
  "title": "Benavente Te Ve",
  "url": "https://www.tvbenavente.es/"
}, {
  "title": "RTVCYL",
  "url": "https://www.rtvcyl.es/"
}, {
  "title": "La 8 TV León",
  "url": "https://www.rtvcyl.es/Leon"
}]
}, {
  "name": "Revistas del Motor",
  "links": [{
  "title": "Car and Driver",
  "url": "https://www.caranddriverthef1.com/coches"
}, {
  "title": "Motociclismo",
  "url": "https://www.motociclismo.es/"
}, {
  "title": "Solo Moto",
  "url": "https://solomoto.es/"
}]
}, {
  "name": "Revistas del Corazón",
  "links": [{
  "title": "Semana",
  "url": "https://www.semana.es/"
}, {
  "title": "Hola",
  "url": "https://www.hola.com/"
}, {
  "title": "Diez Minutos",
  "url": "https://www.diezminutos.es/"
}, {
  "title": "AR",
  "url": "https://www.ar-revista.com/"
}]
}, {
  "name": "Revistas Varias",
  "links": [{
  "title": "Solo Nieve",
  "url": "https://www.solonieve.com/"
}]
}, {
  "name": "Bancos",
  "links": [{
  "title": "La Caixa",
  "url": "https://www.caixabank.es/"
}, {
  "title": "Bankia",
  "url": "https://www.bankia.es/"
}, {
  "title": "Unicaja",
  "url": "https://www.unicajabanco.es/"
}, {
  "title": "Sabadell",
  "url": "https://www.bancsabadell.com/"
}, {
  "title": "Cajamar",
  "url": "https://www.cajamar.es/"
}, {
  "title": "Caja Rural",
  "url": "https://www.cajaruraldigital.com/"
}, {
  "title": "Santander",
  "url": "https://www.bancosantander.es/"
}]
}, {
  "name": "Comercio",
  "links": [{
  "title": "El Corte Inglés",
  "url": "https://www.elcorteingles.es/"
}, {
  "title": "Carrefour",
  "url": "https://www.carrefour.es/"
}, {
  "title": "Leclerc",
  "url": "https://www.e-leclerc.es/"
}, {
  "title": "Lidl",
  "url": "https://www.lidl.es/"
}, {
  "title": "Dia",
  "url": "https://www.dia.es/"
}, {
  "title": "MediaMarkt",
  "url": "https://www.mediamarkt.es/"
}, {
  "title": "Ikea",
  "url": "https://www.ikea.com/es/es/"
}]
}, {
  "name": "Páginas de Benavente",
  "links": [{
  "title": "Interbenavente",
  "url": "https://www.interbenavente.es/"
}, {
  "title": "Toro Enmaromado",
  "url": "https://toroenmaromado.com/"
}, {
  "title": "Leonoticias",
  "url": "https://www.leonoticias.com/"
}, {
  "title": "La Nueva Crónica de León",
  "url": "https://www.lanuevacronica.com/"
}]
}];
}

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  category: string;
  questions: FaqItem[];
};

export const getFaqsProps = (_accountIdArg?: bigint): FaqCategory[] => {
  return [];
}

/**
 * Per-account website feature flags + light config. Stored as a JSON string in
 * `website_config.features_props`. Every field is optional; when undefined the
 * caller falls back to the historical default, so a null column = today's behavior.
 */
export type FeaturesProps = {
  pages?: {
    promociones?: boolean;
    servicios?: boolean;
    nosotros?: boolean;
  };
  sections?: {
    socialFamily?: boolean;
    /**
     * Where the social-family (Instagram) section renders on the homepage:
     * "top" (default, right below the hero) or "bottom" (just above Contacto).
     */
    socialFamilyPosition?: "top" | "bottom";
    /**
     * Subtitle under the social-family heading. Set to "" to hide it, mirroring
     * the menuLabels convention. Unset → the historical default copy.
     */
    socialFamilySubtitle?: string;
    /**
     * Which networks appear as cards in the social-family section. Unset → all
     * configured networks. The navbar/footer always show everything, so an
     * account can run four icons but feature only three as cards.
     */
    socialFamilyPlatforms?: (
      | "facebook"
      | "twitter"
      | "instagram"
      | "linkedin"
      | "youtube"
      | "tiktok"
    )[];
    /** Show the "Sobre Nosotros" section (services + mission + KPIs) on the homepage. Default true. */
    about?: boolean;
  };
  menuLabels?: {
    segundaMano?: string;
    alquilar?: string;
    inversion?: string;
    inversionSubtitle?: string;
    inversionHref?: string;
    vender?: string;
    /** Label for the navbar Nosotros link (e.g. "Sobre GO4"). Default "Nosotros". */
    nosotros?: string;
    /** Label for the contact CTA / titles (e.g. "Contacto"). Default "Contáctanos". */
    contacto?: string;
  };
  /** Hero shows direct-access buttons instead of the search bar. */
  heroDirectAccess?: boolean;
  /**
   * Copy and destination of each direct-access button. Read and validated by
   * `getHeroDirectButtons`, not from here — an empty or absent list falls back
   * to the two built-in Venta/Alquiler pills.
   */
  heroDirectButtons?: unknown[];
  /**
   * Placeholder inside the hero search bar. Unset → "¿Dónde quieres vivir?".
   * Only read when `heroDirectAccess` is off.
   */
  heroSearchPlaceholder?: string;
  /** Navbar Venta/Alquiler are direct links (no property-type mega-menu). */
  navDirectLinks?: boolean;
  /**
   * Order of the navbar entries, as keys ("venta", "alquiler", …), dragged from
   * the CRM. Unset → the order this template ships with. An entry the list
   * doesn't mention keeps its place; see `~/lib/nav-order`.
   */
  navOrder?: string[];
  /**
   * Show the navbar "Busca" search box (free text: reference, address, city,
   * title). Kept under the original key so existing site configs keep working.
   * Default true.
   */
  referenceSearch?: boolean;
  /** Show the bottom call-to-action on the /servicios page. Default true. */
  serviciosCta?: boolean;
  /**
   * Show the Servicios link in the navbar. Default true. Set false to keep the
   * /servicios page reachable (e.g. via a promo card) without a top-nav link.
   */
  serviciosInNav?: boolean;
  /**
   * Declared so the generated literal type-checks, not because the site reads
   * it: the CRM stores a `serviciosLayout` that this template never
   * implemented. Anything `features_props` holds has to exist here — the baked
   * literal is checked against this interface, and an undeclared key fails the
   * whole build. Account 122 could not publish at all because of this one.
   */
  serviciosLayout?: string;
  /**
   * Show the Contacto link in the navbar. Default true. Set false to drop the
   * top-nav entry while /contacto stays reachable (footer, CTAs, direct link) —
   * same split as `serviciosInNav`, for agencies whose bar ends elsewhere.
   */
  contactoInNav?: boolean;
  /** Contact CTA shows only the button (no heading/blurb). Default false. */
  contactCtaMinimal?: boolean;
  /** Navbar logo size. Unset → "standard". */
  logoSize?: "standard" | "medium" | "large" | "xlarge";
  /** Invert the logo colors on light backgrounds (navbar when scrolled) — for white logos. */
  logoInvertOnLight?: boolean;
  /** Darkness of the overlay over the hero background (0–1). Default 0.35. */
  heroOverlayOpacity?: number;
  /**
   * Dark-to-transparent gradient behind the navbar on the hero, so white nav
   * links stay legible over bright skies without dimming the whole media.
   */
  heroTopScrim?: boolean;
  /** Hero section height: "standard" (~88vh) or "full" (fills the screen). */
  heroSize?: "standard" | "full";
  /**
   * Hero banner height on the inner pages (/servicios, /nosotros):
   * "short" (~50vh) | "standard" (~75vh, default) | "full" (fills the screen).
   */
  pageHeroSize?: "short" | "standard" | "full";
  /**
   * "minimal" hides the small uppercase kicker above section titles and the
   * subtitle below them, site-wide, for a cleaner look. Defaults to "standard".
   */
  headerStyle?: "standard" | "minimal";
  /** When true, footer navigation renders as cards and the property-types column is hidden. */
  footerCards?: boolean;
  /**
   * /nosotros page layout. "default" (centered origins → values grid → team
   * grid) | "split" (origins left, values cards right, compact team below).
   * Unset → "default". Both variants render entirely from about_props.
   */
  nosotrosLayout?: "default" | "split";
  /**
   * Text alignment for description/paragraph blocks (service-card descriptions,
   * About/Nosotros body, property descriptions). Unset → keep each block's
   * existing alignment; "justify"/"center" override it site-wide.
   */
  descriptionAlign?: "justify" | "center";
  /**
   * Property-detail "Características" section layout.
   * "sections" (default) → grouped with section titles and the
   * "Ver más características" toggle. "flat" → every detail row in one block
   * and every feature chip in another, with no section titles or toggle.
   */
  characteristicsLayout?: "sections" | "flat";
  /**
   * Visual style of the property-detail characteristics.
   * "default" (today) | "boxed" (stat cards) | "emphasized" (stacked rows with
   * stronger hierarchy) | "twotone" (filled panel with alternating row shading).
   */
  characteristicsStyle?: "default" | "boxed" | "emphasized" | "twotone";
  /**
   * Homepage "Propiedades destacadas" behavior.
   * "grid" (default) → the full card grid, button navigates to the search page.
   * "feed" → a short teaser grid whose button opens the full-screen vertical
   * property feed (TikTok style) in place, without leaving the homepage.
   */
  featuredMode?: "grid" | "feed";
  /**
   * How many cards the "Propiedades destacadas" grid shows. Unset → every
   * listing fetched (12) in "grid" mode, 3 in "feed" mode.
   */
  featuredGridCount?: number;
};

/** Read the legacy `metadata.modules.promotions` flag (older accounts gated /promociones here). */
function readLegacyPromotions(
  metadata: string | null | undefined,
): boolean | undefined {
  if (!metadata) return undefined;
  try {
    const raw =
      typeof metadata === "string"
        ? (JSON.parse(metadata) as unknown)
        : metadata;
    const modules =
      raw && typeof raw === "object" && "modules" in raw
        ? (raw as { modules?: { promotions?: unknown } }).modules
        : undefined;
    return modules?.promotions === true ? true : undefined;
  } catch {
    return undefined;
  }
}

export const getFeaturesProps = (_accountIdArg?: bigint): FeaturesProps => {
  return {
  "menuLabels": {
  "segundaMano": "Propiedades",
  "inversion": "Inversores",
  "vender": "¿Quieres vender?"
},
  "logoSize": "large",
  "pages": {
  "promociones": true
},
  "heroSize": "full"
};
}

export type ModulesConfig = {
  promotionsEnabled: boolean;
};

// Thin wrapper kept for existing callers; promotions now lives in features_props
// (with legacy metadata.modules.promotions folded in by getFeaturesProps).
export const getModulesConfig = (): ModulesConfig => {
  return {
  "promotionsEnabled": true
};
}

export type PropertiesConfig = {
  title: string;
  subtitle: string;
  buttonText: string;
  itemsPerPage?: number;
  // Ya traducido al vocabulario de esta app por `resolveDefaultSort`: el CRM
  // guarda el suyo (`date-desc`, `date-asc`) y aquí nunca existió.
  defaultSort: SortOption;
  showDescription?: boolean;
  showReference?: boolean;
  // Días que un Vendido/Alquilado sigue en la web tras cerrarse. 0 (el valor
  // por defecto, y el que aplica a cualquier cuenta sin configurar) = sale al
  // instante. Lo consume `visibleStatusCondition` en queries/filters.ts.
  soldVisibilityDays: number;
  cardDisplay: CardDisplayConfig;
};

/** Rango que acepta el formulario del CRM; sanea JSON manipulado o antiguo. */
function resolveSoldVisibilityDays(raw: unknown): number {
  if (typeof raw !== "number" || !Number.isFinite(raw)) return 0;
  return Math.min(365, Math.max(0, Math.trunc(raw)));
}

/**
 * El selector "Orden por defecto" del CRM guarda su propio vocabulario
 * (`date-desc`, `date-asc`), que nunca existió aquí: el valor se leía, no se
 * traducía y no lo consumía ningún ORDER BY, así que la elección de la agencia
 * no llegaba a la web. Esta tabla es el único punto donde los dos vocabularios
 * se encuentran, y es la misma que usa v1 (`vestawebpage`).
 *
 * `price-desc` —el valor por defecto del CRM— cae en `"default"` a propósito:
 * el orden agrupado por tipo ya es precio descendente dentro de cada grupo, y
 * mapearlo al `price-desc` plano cambiaría el listado de las cuentas que nunca
 * tocaron el selector.
 */
const CRM_SORT_ALIASES: Record<string, SortOption> = {
  "price-desc": "default",
  "price-asc": "price-asc",
  "date-desc": "newest",
  "date-asc": "oldest",
};

const VALID_SORTS: readonly SortOption[] = [
  "default",
  "newest",
  "oldest",
  "price-asc",
  "price-desc",
  "size-asc",
  "size-desc",
];

// No se exporta: este módulo lleva "use server" y ahí sólo pueden exportarse
// funciones async. Exportar este helper síncrono hace que Next se niegue a
// compilar el módulo entero ("Server Actions must be async functions"), lo que
// tumba todas las páginas que leen website_config. No tiene llamantes fuera de
// este fichero.
function resolveDefaultSort(raw: unknown): SortOption {
  if (typeof raw !== "string") return "default";
  return (
    CRM_SORT_ALIASES[raw] ??
    (VALID_SORTS.includes(raw as SortOption) ? (raw as SortOption) : "default")
  );
}

export const getPropertiesConfig = (_accountIdArg?: bigint): PropertiesConfig => {
  return {
  "title": "Propiedades Destacadas",
  "subtitle": "Descubre nuestra selección de propiedades disponibles",
  "buttonText": "Ver Todas las Propiedades",
  "cardDisplay": {
  "cardTitle": "listing",
  "cardEyebrow": "location",
  "cardLocationField": "province"
},
  "soldVisibilityDays": 0,
  "defaultSort": "default"
};
}

export type SEOConfig = {
  title: string;
  description: string;
  name?: string;
  image?: string;
  url?: string;
  telephone?: string;
  email?: string;
  keywords?: string[] | string; // Support both array and string formats
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogSiteName?: string;
  ogLocale?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  /** Per-account Google Analytics 4 measurement ID (e.g. "G-XXXXXXXXXX"). */
  gaMeasurementId?: string;
};

/**
 * Pull the Google tag id out of `head_props`, the blob the website editor
 * writes. `parseGoogleTag` accepts the whole snippet Google hands out, not just
 * a bare id — see its own notes for why that matters.
 */
function readGoogleAnalyticsId(raw: string | null | undefined): string | undefined {
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(raw) as { googleAnalytics?: unknown };
    return parseGoogleTag(
      typeof parsed?.googleAnalytics === "string" ? parsed.googleAnalytics : null,
    )?.id;
  } catch {
    return undefined;
  }
}

export const getSEOConfig = (_accountIdArg?: bigint): SEOConfig => {
  return {
  "title": "Inmobiliaria Sol - Alquiler y venta de pisos en León",
  "description": "Encuentra las mejores oportunidades del mercado en León",
  "keywords": "león, casas, inmobiliaria, pisos, alquiler, venta",
  "name": "",
  "email": "",
  "telephone": "",
  "url": "",
  "ogTitle": "",
  "ogDescription": "",
  "ogImage": "",
  "ogType": "website",
  "ogUrl": "",
  "ogLocale": "es_ES",
  "ogSiteName": ""
};
}
