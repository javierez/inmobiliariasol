"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Building2,
  Store,
  LandPlot,
  Car,
  PlusCircle,
  Search,
  Sparkles,
  TrendingUp,
  Map as MapIcon,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState, useCallback, memo, useEffect, useRef } from "react";
import { cn } from "~/lib/utils";
import { SocialLinks } from "~/components/ui/social-links";

// Types
type SocialPlatform =
  | "facebook"
  | "twitter"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "tiktok";

interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

interface NavbarProps {
  socialLinks?: SocialLink[];
  shortName?: string;
  logoUrl?: string | null;
  primaryColor?: string | null;
  promotionsEnabled?: boolean;
  hasNosotrosPage?: boolean;
  hasServiciosPage?: boolean;
}

type MegaKey = "segundamano" | "alquilar" | null;

const BUY_ITEMS = [
  { text: "Pisos", href: "/venta-pisos/todas-ubicaciones", icon: Home },
  { text: "Casas", href: "/venta-casas/todas-ubicaciones", icon: Building2 },
  { text: "Locales", href: "/venta-locales/todas-ubicaciones", icon: Store },
  { text: "Solares", href: "/venta-solares/todas-ubicaciones", icon: LandPlot },
  { text: "Garajes", href: "/venta-garajes/todas-ubicaciones", icon: Car },
];

const RENT_ITEMS = [
  { text: "Pisos", href: "/alquiler-pisos/todas-ubicaciones", icon: Home },
  { text: "Casas", href: "/alquiler-casas/todas-ubicaciones", icon: Building2 },
  { text: "Locales", href: "/alquiler-locales/todas-ubicaciones", icon: Store },
  { text: "Solares", href: "/alquiler-solares/todas-ubicaciones", icon: LandPlot },
  { text: "Garajes", href: "/alquiler-garajes/todas-ubicaciones", icon: Car },
];

// Memoized Social Links Section
const MobileSocialLinks = memo(({ links }: { links: SocialLink[] }) => (
  <div className="border-t bg-muted/50 backdrop-blur-sm">
    <div className="px-4 py-4">
      <div className="mb-3 text-xs font-medium text-muted-foreground">
        Síguenos en redes sociales
      </div>
      <SocialLinks links={links} />
    </div>
  </div>
));

MobileSocialLinks.displayName = "MobileSocialLinks";

export default function Navbar({
  socialLinks,
  shortName,
  logoUrl,
  promotionsEnabled = false,
  hasNosotrosPage = false,
  hasServiciosPage = false,
}: NavbarProps): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchRef, setSearchRef] = useState("");
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState<MegaKey>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Hero-backed pages can show the transparent navbar at the very top.
  // Everywhere else (listings, legal, vender, etc.) the navbar must be opaque
  // so its white-on-image text isn't invisible against a light background.
  const isHeroPage = pathname === "/";

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isOpaque = !isHeroPage || scrolled;
  const isAccount129 = process.env.NEXT_PUBLIC_ACCOUNT_ID === "129";
  const isAccount103 = process.env.NEXT_PUBLIC_ACCOUNT_ID === "103";
  const segundaManoLabel = isAccount103 ? "Propiedades" : "Segunda Mano";
  const inversionLabel = isAccount103 ? "Inversores" : "Inversión";
  const venderLabel = isAccount103 ? "¿Quieres vender?" : "Vender";

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        handleMenuClose();
        setMegaOpen(null);
      }
    },
    [handleMenuClose],
  );

  const handleRefSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = searchRef.trim();
      if (trimmed) {
        router.push(`/propiedades/${trimmed}`);
        setSearchRef("");
      }
    },
    [searchRef, router],
  );

  const openMega = useCallback((key: MegaKey) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setMegaOpen(key);
  }, []);

  const scheduleCloseMega = useCallback(() => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => setMegaOpen(null), 120);
  }, []);

  // Tone of all interactive elements depends on whether navbar is opaque.
  const linkTone = isOpaque
    ? "text-foreground/75 hover:text-foreground hover:bg-accent"
    : "text-white/90 hover:text-white hover:bg-white/15";

  const navLinkClass = cn(
    "rounded-full px-4 py-2 text-[13px] font-medium uppercase tracking-eyebrow transition-colors",
    linkTone,
  );

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-colors duration-300",
        isOpaque
          ? "border-b border-border/60 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/85"
          : "border-b border-transparent bg-transparent",
      )}
      onKeyDown={handleKeyPress}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-2" aria-label="Home">
            <div
              className={cn(
                "relative",
                isAccount103
                  ? "h-16 w-44 sm:h-20 sm:w-52"
                  : "h-12 w-32 sm:h-14 sm:w-36",
              )}
            >
              <Image
                src={logoUrl ?? "/vestazoomin.jpeg"}
                alt={shortName || "Vesta CRM Logo"}
                fill
                className={cn(
                  "object-contain transition-[filter] duration-300",
                  isOpaque ? "" : "brightness-0 invert",
                )}
                priority
              />
            </div>
          </Link>
        </div>

        {/* Center nav */}
        <nav
          className="hidden items-center gap-1 lg:flex xl:gap-2"
          aria-label="Main navigation"
        >
          <button
            type="button"
            className={cn(
              navLinkClass,
              "flex items-center gap-1",
              megaOpen === "segundamano" &&
                (isOpaque ? "bg-accent text-foreground" : "bg-white/15 text-white"),
            )}
            onMouseEnter={() => openMega("segundamano")}
            onMouseLeave={scheduleCloseMega}
            onClick={() => openMega(megaOpen === "segundamano" ? null : "segundamano")}
            aria-expanded={megaOpen === "segundamano"}
            aria-haspopup="true"
          >
            {segundaManoLabel} <ChevronDown className="h-4 w-4" />
          </button>

          {isAccount129 ? (
            <>
              <Link href="/inversiones" className={navLinkClass}>
                {inversionLabel}
              </Link>
              <Link href="/nosotros" className={navLinkClass}>
                Nosotros
              </Link>
              <Link href="/servicios" className={navLinkClass}>
                Servicios
              </Link>
              <Link href="/contacto" className={navLinkClass}>
                Contacto
              </Link>
              <Link href="/vender" className={navLinkClass}>
                {venderLabel}
              </Link>
            </>
          ) : (
            <>
              {promotionsEnabled && (
                <Link href="/promociones" className={navLinkClass}>
                  Promociones
                </Link>
              )}
              <Link href="/inversiones" className={navLinkClass}>
                {inversionLabel}
              </Link>

              <button
                type="button"
                className={cn(
                  navLinkClass,
                  "flex items-center gap-1",
                  megaOpen === "alquilar" &&
                    (isOpaque ? "bg-accent text-foreground" : "bg-white/15 text-white"),
                )}
                onMouseEnter={() => openMega("alquilar")}
                onMouseLeave={scheduleCloseMega}
                onClick={() => openMega(megaOpen === "alquilar" ? null : "alquilar")}
                aria-expanded={megaOpen === "alquilar"}
                aria-haspopup="true"
              >
                Alquilar <ChevronDown className="h-4 w-4" />
              </button>

              <Link href="/vender" className={navLinkClass}>
                {venderLabel}
              </Link>
              {hasNosotrosPage && (
                <Link href="/nosotros" className={navLinkClass}>
                  Nosotros
                </Link>
              )}
              {hasServiciosPage && (
                <Link href="/servicios" className={navLinkClass}>
                  Servicios
                </Link>
              )}
              <Link href="/contacto" className={navLinkClass}>
                Contacto
              </Link>
            </>
          )}
        </nav>

        {/* Right - search + social + burger */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden items-center gap-2 sm:flex">
            <form onSubmit={handleRefSearch}>
              <div className="relative">
                <Search
                  className={cn(
                    "absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 transition-colors",
                    isOpaque ? "text-muted-foreground" : "text-white/70",
                  )}
                />
                <input
                  type="text"
                  value={searchRef}
                  onChange={(e) => setSearchRef(e.target.value)}
                  placeholder="Busca por referencia"
                  aria-label="Buscar por referencia"
                  className={cn(
                    "h-9 w-40 rounded-full border pl-8 pr-3 text-xs transition-all focus:w-48 focus:outline-none focus:ring-1",
                    isOpaque
                      ? "border-input bg-background placeholder:text-muted-foreground focus:ring-ring"
                      : "border-white/30 bg-white/10 text-white backdrop-blur placeholder:text-white/70 focus:ring-white/40",
                  )}
                />
              </div>
            </form>
            <Link
              href="/propiedades?vista=mapa"
              aria-label="Buscar en el mapa"
              title="Buscar en el mapa"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
                isOpaque
                  ? "border-input bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
                  : "border-white/30 bg-white/10 text-white/80 backdrop-blur hover:bg-white/20 hover:text-white",
              )}
            >
              <MapIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="hidden lg:flex">
            {socialLinks && socialLinks.length > 0 && (
              <SocialLinks
                links={socialLinks}
                iconClassName={
                  isOpaque
                    ? "text-foreground/70 hover:text-foreground"
                    : "text-white/85 hover:text-white"
                }
              />
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "lg:hidden",
              isOpaque
                ? ""
                : "text-white hover:bg-white/10 hover:text-white",
            )}
            onClick={handleMenuToggle}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Desktop mega-menu panel */}
      {mounted && megaOpen && (
        <div
          className="absolute left-0 right-0 top-20 hidden border-t border-border/60 bg-background shadow-[0_30px_60px_-15px_rgba(15,23,42,0.35)] lg:block"
          onMouseEnter={() => openMega(megaOpen)}
          onMouseLeave={scheduleCloseMega}
        >
          <div className="container mx-auto px-6 py-16">
            <div className="grid grid-cols-12 gap-12">
              <div className="col-span-4 flex flex-col justify-between border-r border-border/60 pr-12">
                <div>
                  <span className="block text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
                    {megaOpen === "segundamano" ? "Segunda Mano" : "Alquilar"}
                  </span>
                  <h3 className="mt-4 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                    {megaOpen === "segundamano"
                      ? "Encuentra tu nuevo hogar"
                      : "Alquila con tranquilidad"}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {megaOpen === "segundamano"
                      ? "Explora nuestra selección de propiedades en venta — pisos, casas, locales y mucho más."
                      : "Descubre opciones de alquiler en cualquier ubicación, ajustadas a tu estilo de vida."}
                  </p>
                </div>
                <Link
                  href={
                    megaOpen === "segundamano"
                      ? "/venta-propiedades/todas-ubicaciones"
                      : "/alquiler-propiedades/todas-ubicaciones"
                  }
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-eyebrow text-foreground hover:text-foreground/70"
                  onClick={() => setMegaOpen(null)}
                >
                  Ver todo
                  <span aria-hidden>→</span>
                </Link>
              </div>

              <div className="col-span-8 grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3">
                {(megaOpen === "segundamano" ? BUY_ITEMS : RENT_ITEMS).map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMegaOpen(null)}
                      className="group flex items-center gap-4 rounded-lg px-4 py-5 transition-colors hover:bg-accent"
                    >
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-border/60 transition-colors group-hover:border-foreground/40">
                        <Icon className="h-5 w-5 text-foreground/70" />
                      </div>
                      <div>
                        <span className="block text-base font-medium text-foreground">
                          {item.text}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {megaOpen === "segundamano" ? "En venta" : "En alquiler"}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-all duration-300 ease-in-out lg:hidden",
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={handleMenuClose}
        aria-hidden={!isMenuOpen}
      />

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 top-20 h-[calc(100vh-5rem)] w-full bg-background shadow-2xl backdrop-blur-md transition-all duration-300 ease-in-out lg:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-8 px-6 py-8">
              <form onSubmit={handleRefSearch} className="sm:hidden">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchRef}
                    onChange={(e) => setSearchRef(e.target.value)}
                    placeholder="Buscar por referencia..."
                    className="h-11 w-full rounded-full border border-input bg-transparent pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    aria-label="Buscar por referencia"
                  />
                </div>
              </form>

              <div className="space-y-4">
                <h3 className="px-2 text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
                  Segunda Mano
                </h3>
                <div className="space-y-1">
                  {BUY_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleMenuClose}
                        className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-foreground/85 transition-colors hover:bg-accent hover:text-foreground"
                      >
                        <Icon className="h-4 w-4" />
                        {item.text}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="px-2 text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
                  Destacados
                </h3>
                <div className="space-y-1">
                  {!isAccount129 && promotionsEnabled && (
                    <Link
                      href="/promociones"
                      onClick={handleMenuClose}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-foreground/85 transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <Sparkles className="h-4 w-4" />
                      Promociones
                    </Link>
                  )}
                  <Link
                    href="/inversiones"
                    onClick={handleMenuClose}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-foreground/85 transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <TrendingUp className="h-4 w-4" />
                    {inversionLabel}
                  </Link>
                </div>
              </div>

              {!isAccount129 && (
                <div className="space-y-4">
                  <h3 className="px-2 text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
                    Alquilar
                  </h3>
                  <div className="space-y-1">
                    {RENT_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={handleMenuClose}
                          className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-foreground/85 transition-colors hover:bg-accent hover:text-foreground"
                        >
                          <Icon className="h-4 w-4" />
                          {item.text}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="px-2 text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
                  Más
                </h3>
                <div className="space-y-1">
                  <Link
                    href="/vender"
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-foreground/85 transition-colors hover:bg-accent hover:text-foreground"
                    onClick={handleMenuClose}
                  >
                    <PlusCircle className="h-4 w-4" />
                    {venderLabel}
                  </Link>
                  {(hasNosotrosPage || isAccount129) && (
                    <Link
                      href="/nosotros"
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-foreground/85 transition-colors hover:bg-accent hover:text-foreground"
                      onClick={handleMenuClose}
                    >
                      Nosotros
                    </Link>
                  )}
                  {(hasServiciosPage || isAccount129) && (
                    <Link
                      href="/servicios"
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-foreground/85 transition-colors hover:bg-accent hover:text-foreground"
                      onClick={handleMenuClose}
                    >
                      Servicios
                    </Link>
                  )}
                  <Link
                    href="/contacto"
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-foreground/85 transition-colors hover:bg-accent hover:text-foreground"
                    onClick={handleMenuClose}
                  >
                    Contacto
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {socialLinks && socialLinks.length > 0 && (
            <MobileSocialLinks links={socialLinks} />
          )}
        </div>
      </div>
    </header>
  );
}
