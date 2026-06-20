"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  CITY_PLACEHOLDER,
  extractCityTemplate,
} from "~/lib/city-template";
import { HeroSearch } from "~/components/hero-search";
import { VENTA_HREF, ALQUILER_HREF } from "~/lib/listing-links";

interface HeroClientProps {
  title: string;
  subtitle: string;
  findPropertyButton: string;
  contactButton: string;
  backgroundType?: "image" | "video";
  backgroundVideo?: string;
  backgroundImage?: string;
  cities?: string[];
  logoUrl?: string | null;
  heroSize?: "standard" | "full";
  heroDirectAccess?: boolean;
}

// Accounts that show their logo in the hero instead of a text title.
const LOGO_HERO_ACCOUNTS = new Set<string>();
const USE_LOGO_HERO =
  !!process.env.NEXT_PUBLIC_ACCOUNT_ID &&
  LOGO_HERO_ACCOUNTS.has(process.env.NEXT_PUBLIC_ACCOUNT_ID);

const ROTATION_INTERVAL_MS = 4000;

function useRotatingCity(cities: string[] | undefined) {
  const rotatableCities = useMemo(
    () => (cities ?? []).filter((c) => c && c.trim().length > 0),
    [cities],
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (rotatableCities.length < 2) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatableCities.length);
    }, ROTATION_INTERVAL_MS);
    return () => clearInterval(id);
  }, [rotatableCities.length]);

  const safeIndex =
    rotatableCities.length > 0 ? index % rotatableCities.length : 0;
  return {
    currentCity: rotatableCities[safeIndex] ?? null,
    rotatableCities,
  };
}

function renderWithRotatingCity(
  text: string,
  knownCities: string[],
  currentCity: string | null,
) {
  const { template, foundCity } = extractCityTemplate(text, knownCities);
  if (!foundCity || !currentCity || knownCities.length < 2) {
    return <>{text}</>;
  }

  const segments = template.split(CITY_PLACEHOLDER);
  return (
    <>
      {segments.map((segment, i) => (
        <span key={`seg-${i}`}>
          {segment}
          {i < segments.length - 1 && (
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={currentCity}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="inline-block"
              >
                {currentCity}
              </motion.span>
            </AnimatePresence>
          )}
        </span>
      ))}
    </>
  );
}

export function HeroClient({
  title,
  // subtitle / findPropertyButton / contactButton intentionally unused
  // — hero is now title-only with a single-line search.
  backgroundType = "image",
  backgroundVideo,
  backgroundImage,
  cities = [],
  logoUrl,
  heroSize = "standard",
  heroDirectAccess = false,
}: HeroClientProps) {
  const { currentCity, rotatableCities } = useRotatingCity(cities);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Keep the background video playing — recover from low-power mode, tab
  // switches, autoplay hiccups so the iOS play-button overlay never lingers.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const ensurePlaying = () => {
      if (document.hidden) return;
      if (!video.paused && !video.ended) return;
      void video.play().catch(() => {
        // Autoplay can still be blocked; nothing useful to do here.
      });
    };

    video.addEventListener("pause", ensurePlaying);
    document.addEventListener("visibilitychange", ensurePlaying);
    window.addEventListener("pageshow", ensurePlaying);
    void video.play().catch(() => {
      // Initial autoplay may be blocked; the listeners below will retry.
    });

    return () => {
      video.removeEventListener("pause", ensurePlaying);
      document.removeEventListener("visibilitychange", ensurePlaying);
      window.removeEventListener("pageshow", ensurePlaying);
    };
  }, [backgroundType, backgroundVideo]);

  const animatedTitle = renderWithRotatingCity(
    title,
    rotatableCities,
    currentCity,
  );

  return (
    <section
      className={`relative -mt-20 flex overflow-hidden sm:-mt-24 ${
        heroSize === "full"
          ? "min-h-[calc(100svh_+_5rem)] sm:min-h-[calc(100svh_+_6rem)]"
          : "min-h-[88vh]"
      } ${heroDirectAccess ? "items-end" : "items-center"}`}
    >
      {/* Video or Image Background — fixed to viewport so it stays put while
          the hero scrolls past. The next section (page.tsx) has an opaque
          `bg-background` to cover the fixed layer once you scroll out of the hero. */}
      {backgroundType === "video" && backgroundVideo ? (
        <>
          <div className="fixed inset-0 -z-20 h-screen w-screen">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
              className="hero-bg-video h-full w-full object-cover"
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
            {/* Hide the iOS/Safari play-button overlay that flashes on autoplay hiccups. */}
            <style jsx>{`
              .hero-bg-video::-webkit-media-controls-start-playback-button {
                display: none !important;
                -webkit-appearance: none;
              }
              .hero-bg-video::-webkit-media-controls-overlay-play-button {
                display: none !important;
                -webkit-appearance: none;
              }
              .hero-bg-video::-webkit-media-controls {
                display: none !important;
              }
            `}</style>
          </div>
          <div className="fixed inset-0 -z-10 h-screen w-screen bg-black/35" />
        </>
      ) : backgroundImage ? (
        <>
          <div className="fixed inset-0 -z-20 h-screen w-screen">
            <Image
              src={backgroundImage}
              alt="Hero background"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="fixed inset-0 -z-10 h-screen w-screen bg-black/35" />
        </>
      ) : (
        <div className="absolute inset-0 -z-10 bg-foreground/90" />
      )}

      {/* Soft bottom fade for editorial feel */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />

      <div className="container mx-auto w-full px-4 pb-20 pt-40 sm:px-6 sm:pb-24 sm:pt-48 md:pb-28 md:pt-56">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          {heroDirectAccess ? (
            <motion.div
              className="mx-auto flex w-full max-w-3xl items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Link
                href={VENTA_HREF}
                className="flex h-14 flex-1 items-center justify-center rounded-full border border-white/40 bg-white/25 text-sm font-medium uppercase tracking-eyebrow text-white backdrop-blur-md transition-colors hover:bg-white/40"
              >
                Venta
              </Link>
              <Link
                href={ALQUILER_HREF}
                className="flex h-14 flex-1 items-center justify-center rounded-full border border-white/40 bg-white/25 text-sm font-medium uppercase tracking-eyebrow text-white backdrop-blur-md transition-colors hover:bg-white/40"
              >
                Alquiler
              </Link>
            </motion.div>
          ) : USE_LOGO_HERO && logoUrl ? (
            <motion.div
              className="relative mb-12 aspect-[3019/745] w-full max-w-[34rem] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Image
                src={logoUrl}
                alt={title}
                fill
                sizes="(max-width: 640px) 34rem, (max-width: 1024px) 56rem, 64rem"
                className="object-contain brightness-0 invert"
                priority
              />
            </motion.div>
          ) : (
            <motion.h1
              className="mb-12 min-h-[2.1em] text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl md:text-7xl lg:text-[5.5rem]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {animatedTitle}
            </motion.h1>
          )}

          {!heroDirectAccess && (
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <HeroSearch />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
