import "~/styles/globals.css";

import { type Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "~/components/theme-provider";
import { WhatsAppButton } from "~/components/ui/whatsapp-button";
import Navbar from "~/components/navbar";
import { HeaderStyleProvider } from "~/components/header-style-context";
import { getLogo } from "~/server/queries/logo";
import { getSEOConfig, getFeaturesProps } from "~/server/queries/website-config";
import { getSocialLinks } from "~/server/queries/social";
import { getContactProps } from "~/server/queries/contact";
import { getAboutProps } from "~/server/queries/about";
import { isAccount129 } from "~/lib/account-overrides/129";
import {
  isAccount139,
  ACCOUNT_139_WHITE_BRAND_FOREGROUND,
  ACCOUNT_139_BRAND_DARKEN,
} from "~/lib/account-overrides/139";
import { getAccountInfo } from "~/server/queries/account";
import { getColorProps } from "~/server/queries/color";
import { getFontProps } from "~/server/queries/font";
import { fontCatalog, allFontVariables } from "~/app/fonts";
import { hexToHsl, readableForegroundHsl, mixWithBlack } from "~/lib/utils";
import { env } from "~/env";

export async function generateMetadata(): Promise<Metadata> {
  const seoConfig = await getSEOConfig();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

  return {
    metadataBase: new URL(siteUrl),
    title: seoConfig.title,
    description: seoConfig.description,
    keywords: seoConfig.keywords,
    openGraph: {
      title: seoConfig.ogTitle || seoConfig.title,
      description: seoConfig.ogDescription || seoConfig.description,
      url: seoConfig.ogUrl,
      siteName: seoConfig.ogSiteName,
      images: [
        {
          url: seoConfig.ogImage || "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: seoConfig.ogSiteName || seoConfig.name || "Real Estate",
        },
      ],
      locale: seoConfig.ogLocale || "es_ES",
      type: (seoConfig.ogType || "website") as "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [logoUrl, socialLinks, contactProps, accountInfo, colorProps, fontProps, features, aboutProps] = await Promise.all([
    getLogo(),
    getSocialLinks(),
    getContactProps(),
    getAccountInfo(env.NEXT_PUBLIC_ACCOUNT_ID),
    getColorProps(),
    getFontProps(),
    getFeaturesProps(),
    getAboutProps(),
  ]);
  // Page availability: explicit features_props flag wins; otherwise fall back to
  // today's behavior (account 129 enriched pages / DB content presence).
  const hasNosotrosPage =
    features.pages?.nosotros ?? (isAccount129() || !!aboutProps?.originsContent);
  const hasServiciosPage =
    features.pages?.servicios ??
    (isAccount129() ||
      (!!aboutProps?.extendedServices && aboutProps.extendedServices.length > 0));
  const defaultOffice = contactProps?.offices?.find(office => office.isDefault) || contactProps?.offices?.[0];
  // WhatsApp must use a Spanish MOBILE number (starts with 6 or 7), never a
  // landline (starts with 8/9). Prefer the office's main number, then the sales
  // line; pick the first that is a mobile. Returns wa.me format (34 + 9 digits).
  const whatsappPhone = (() => {
    const candidates = [
      defaultOffice?.phoneNumbers?.main,
      defaultOffice?.phoneNumbers?.sales,
    ];
    for (const raw of candidates) {
      const digits = raw?.replace(/\D/g, "") ?? "";
      // Drop Spain's country code to inspect the 9-digit national number.
      const national =
        digits.length === 11 && digits.startsWith("34")
          ? digits.slice(2)
          : digits;
      if (national.length === 9 && /^[67]/.test(national)) {
        return `34${national}`;
      }
    }
    return null;
  })();

  const sansKey = fontProps?.sansFamily ?? "dmSans";
  const headingKey = fontProps?.headingFamily ?? sansKey;
  const DEFAULT_SANS_VAR = fontCatalog.dmSans?.cssVar ?? "var(--font-dm-sans)";
  const sansVar = fontCatalog[sansKey]?.cssVar ?? DEFAULT_SANS_VAR;
  const headingVar = fontCatalog[headingKey]?.cssVar ?? sansVar;
  const displaySerifVar = fontCatalog.cormorant?.cssVar ?? "var(--font-cormorant)";
  // Account 139 keeps its configured secondaryColor but lays a subtle dark tint
  // over the brand-coloured labels so the white text stands out a bit more.
  const brandSourceHex = colorProps?.secondaryColor
    ? isAccount139()
      ? mixWithBlack(colorProps.secondaryColor, ACCOUNT_139_BRAND_DARKEN)
      : colorProps.secondaryColor
    : null;
  const brandHsl = brandSourceHex ? hexToHsl(brandSourceHex) : null;
  // Account 139 forces white text on brand-coloured labels regardless of the
  // auto-contrast pick (its brand colour is light, so the picker would choose
  // dark text). Other accounts keep the readable auto-computed foreground.
  const forceWhiteBrandForeground =
    isAccount139() && ACCOUNT_139_WHITE_BRAND_FOREGROUND;
  const brandForegroundHsl = colorProps?.secondaryColor
    ? forceWhiteBrandForeground
      ? "0 0% 98%"
      : readableForegroundHsl(colorProps.secondaryColor)
    : null;
  const rootStyle = {
    ["--font-geist-sans" as string]: sansVar,
    ["--font-cinzel" as string]: headingVar,
    ["--font-display-serif" as string]: displaySerifVar,
    ...(brandHsl ? { ["--brand" as string]: brandHsl } : {}),
    ...(brandForegroundHsl ? { ["--brand-foreground" as string]: brandForegroundHsl } : {}),
  } as React.CSSProperties;

  return (
    <html lang="es" suppressHydrationWarning>
      {env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
      <body
        className={`${allFontVariables} font-sans antialiased`}
        style={rootStyle}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col overflow-x-hidden">
            <Navbar
              shortName={accountInfo?.shortName || accountInfo?.name || "Inmobiliaria"}
              logoUrl={logoUrl}
              socialLinks={socialLinks}
              primaryColor={colorProps?.primaryColor ?? null}
              promotionsEnabled={features.pages?.promociones === true}
              hasNosotrosPage={hasNosotrosPage}
              hasServiciosPage={hasServiciosPage}
              menuLabels={features.menuLabels}
              logoSize={features.logoSize}
              directListingLinks={features.navDirectLinks === true}
              referenceSearch={features.referenceSearch !== false}
            />
            <HeaderStyleProvider
              minimal={features.headerStyle === "minimal"}
              descriptionAlign={features.descriptionAlign}
            >
              <main className="flex-1 pt-20">{children}</main>
            </HeaderStyleProvider>
            <WhatsAppButton phoneNumber={whatsappPhone} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
