import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAboutProps } from "~/server/queries/about";
import Footer from "~/components/footer";
import { ExtendedServicesGrid } from "~/components/about/ExtendedServicesGrid";
import { PageHeroBanner } from "~/components/page-hero-banner";
import {
  ACCOUNT_129_SERVICIOS,
  isAccount129,
} from "~/lib/account-overrides/129";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Asesoramiento integral en compraventa, alquileres, valoraciones, obras y proyectos.",
  alternates: { canonical: `${baseUrl}/servicios` },
  robots: { index: true, follow: true },
};

export default async function ServiciosPage() {
  // Account 129: hardcoded content, immune to DB edits.
  // Other accounts: fall back to DB-driven about_props.extendedServices, or 404.
  const useOverride = isAccount129();

  let pageTitle: string;
  let pageSubtitle: string;
  let heroVideoUrl: string | undefined;
  let heroImageUrl: string | undefined;
  let services: Array<{
    title: string;
    description: string;
    icon: string;
    bullets?: readonly string[] | string[];
    ctaLabel?: string;
    ctaHref?: string;
  }>;

  if (useOverride) {
    const o = ACCOUNT_129_SERVICIOS;
    pageTitle = o.hero.title;
    pageSubtitle = o.hero.subtitle;
    heroVideoUrl = o.hero.videoUrl;
    heroImageUrl = o.hero.imageUrl;
    services = o.services.map((s) => ({ ...s }));
  } else {
    const aboutProps = await getAboutProps();
    if (!aboutProps?.extendedServices || aboutProps.extendedServices.length === 0) {
      notFound();
    }
    pageTitle = aboutProps.servicesPageTitle ?? "Nuestros Servicios";
    pageSubtitle =
      aboutProps.servicesPageSubtitle ??
      "Soluciones integrales para cualquier necesidad inmobiliaria, técnica o de obra.";
    heroVideoUrl = aboutProps.servicesHeroVideo;
    heroImageUrl = aboutProps.servicesHeroImage;
    services = aboutProps.extendedServices;
  }

  const hasHero = !!(heroVideoUrl || heroImageUrl);

  return (
    <main className="min-h-screen bg-background">
      {hasHero ? (
        <PageHeroBanner
          eyebrow="Servicios"
          title={pageTitle}
          subtitle={pageSubtitle}
          backgroundType={heroVideoUrl ? "video" : "image"}
          backgroundVideo={heroVideoUrl}
          backgroundImage={heroImageUrl}
        />
      ) : (
        <div className="container mx-auto px-4 pt-28 sm:pt-32">
          <header className="mx-auto max-w-3xl py-12 text-center sm:py-16">
            <span className="mb-5 block text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
              Servicios
            </span>
            <h1 className="mb-6 text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {pageTitle}
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {pageSubtitle}
            </p>
          </header>
        </div>
      )}

      <div className="container mx-auto px-4 pt-10 sm:pt-12">
        <nav className="mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center text-xs font-medium uppercase tracking-eyebrow">
            <li>
              <Link
                href="/"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Inicio
              </Link>
            </li>
            <li className="mx-3 text-muted-foreground/50">/</li>
            <li className="text-foreground" aria-current="page">
              Servicios
            </li>
          </ol>
        </nav>
      </div>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <ExtendedServicesGrid
            services={services.map((s) => ({
              ...s,
              bullets: s.bullets ? Array.from(s.bullets) : undefined,
            }))}
          />
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              ¿Qué servicio necesitas?
            </h2>
            <p className="mb-8 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Escríbenos y te orientamos sin compromiso.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-medium uppercase tracking-eyebrow text-background transition-colors hover:bg-foreground/90"
            >
              Contáctanos
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
