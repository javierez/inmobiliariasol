
import {
  type CardDisplayConfig,
  DEFAULT_CARD_DISPLAY,
  resolveCardDisplay,
} from "~/lib/card-display";

export type LinkItem = {
  title: string;
  url: string;
};

export type LinkCategory = {
  name: string;
  links: LinkItem[];
};

export const getLinksProps = (): LinkCategory[] => {
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

export const getFaqsProps = (): FaqCategory[] => {
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
  };
  menuLabels?: {
    segundaMano?: string;
    alquilar?: string;
    inversion?: string;
    inversionSubtitle?: string;
    inversionHref?: string;
    vender?: string;
    /** Label for the contact CTA / titles (e.g. "Contacto"). Default "Contáctanos". */
    contacto?: string;
  };
  /** Hero shows direct Venta/Alquiler access buttons instead of the search bar. */
  heroDirectAccess?: boolean;
  /** Navbar Venta/Alquiler are direct links (no property-type mega-menu). */
  navDirectLinks?: boolean;
  /** Show the "Buscar por referencia" search in the navbar. Default true. */
  referenceSearch?: boolean;
  /** Show the bottom call-to-action on the /servicios page. Default true. */
  serviciosCta?: boolean;
  /** Contact CTA shows only the button (no heading/blurb). Default false. */
  contactCtaMinimal?: boolean;
  logoSize?: "standard" | "large" | "xlarge";
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
};

/** Read the legacy `metadata.modules.promotions` flag (older accounts gated /promociones here). */
function readLegacyPromotions(metadata: string | null | undefined): boolean | undefined {
  if (!metadata) return undefined;
  try {
    const raw =
      typeof metadata === "string" ? (JSON.parse(metadata) as unknown) : metadata;
    const modules =
      raw && typeof raw === "object" && "modules" in raw
        ? (raw as { modules?: { promotions?: unknown } }).modules
        : undefined;
    return modules?.promotions === true ? true : undefined;
  } catch {
    return undefined;
  }
}

export const getFeaturesProps = (): FeaturesProps => {
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
  defaultSort?: string;
  showDescription?: boolean;
  showReference?: boolean;
  cardDisplay: CardDisplayConfig;
};

export const getPropertiesConfig = (): PropertiesConfig => {
  return {
  "title": "Propiedades Destacadas",
  "subtitle": "Descubre nuestra selección de propiedades disponibles",
  "buttonText": "Ver Todas las Propiedades",
  "cardDisplay": {
  "cardTitle": "listing",
  "cardEyebrow": "location",
  "cardLocationField": "province"
}
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
};

export const getSEOConfig = (): SEOConfig => {
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
