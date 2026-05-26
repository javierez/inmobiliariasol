"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Bed, Bath, SquareIcon as SquareFoot, MapPin } from "lucide-react";
import { formatPrice, formatNumber, formatPriceOrConsult } from "~/lib/utils";
import type { ListingCardData, FeedImage } from "~/server/queries/listings";
import { getWatermarkedImageUrl } from "~/lib/image-url";
import { getBankOwnedLabel } from "~/lib/data";
import { buildPropertySlug, buildPropertyImageAlt } from "~/lib/property-slug";

interface PropertyFeedCardProps {
  listing: ListingCardData;
  images: FeedImage[];
  watermarkEnabled: boolean;
}

const formatListingType = (type: string) => {
  switch (type) {
    case "Sale":
      return "Venta";
    case "Rent":
      return "Alquiler";
    case "RentWithOption":
      return "Alquiler";
    case "RoomSharing":
      return "Habitación";
    default:
      return type;
  }
};

export function PropertyFeedCard({
  listing,
  images,
  watermarkEnabled,
}: PropertyFeedCardProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Build image list: use fetched images, fallback to listing's 2 images
  const imageUrls =
    images.length > 0
      ? images.map((img) =>
          getWatermarkedImageUrl(img.imageUrl, watermarkEnabled),
        )
      : [
          getWatermarkedImageUrl(listing.imageUrl, watermarkEnabled),
          getWatermarkedImageUrl(listing.imageUrl2, watermarkEnabled),
        ].filter(Boolean);

  const totalImages = imageUrls.length;

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || totalImages <= 1) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setCurrentIndex(Math.min(index, totalImages - 1));
  }, [totalImages]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const {
    title,
    street,
    price,
    listingType,
    propertyType,
    bedrooms,
    bathrooms,
    squareMeter,
    city,
    province,
    isBankOwned,
    isOportunidad,
    listingId,
  } = listing;

  const displayTitle = title ?? street ?? "Propiedad";
  const isRental = listingType === "Rent" || listingType === "RentWithOption";
  const imageAlt = buildPropertyImageAlt({
    title,
    propertyType,
    city,
    bedrooms,
    squareMeter,
    listingType,
  });
  const showBeds =
    propertyType !== "solar" &&
    propertyType !== "garaje" &&
    propertyType !== "trastero" &&
    (bedrooms ?? 0) > 0;
  const showBaths =
    propertyType !== "solar" &&
    propertyType !== "garaje" &&
    propertyType !== "trastero" &&
    parseFloat(bathrooms ?? "0") > 0;

  return (
    <div className="relative h-[100dvh] w-full snap-start snap-always">
      {/* Horizontal photo scroller */}
      <div
        ref={scrollRef}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-scroll"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
      >
        {imageUrls.length > 0 ? (
          imageUrls.map((url, i) => (
            <div
              key={i}
              className="relative h-full w-full flex-shrink-0 snap-start snap-always"
            >
              <Image
                src={url}
                alt={`${imageAlt} - Foto ${i + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-foreground">
            <span className="text-xs font-medium uppercase tracking-eyebrow text-white/60">Sin fotos</span>
          </div>
        )}
      </div>

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Dot indicators */}
      {totalImages > 1 && (
        <div className="absolute bottom-56 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {imageUrls.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${
                i === currentIndex
                  ? "h-2 w-2 bg-white"
                  : "h-1.5 w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}

      {/* Property info overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6 pb-10">
        {/* Badges */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {propertyType && (
            <Badge variant="secondary" className="rounded-full border-white/20 bg-white/15 px-3 py-1 text-[11px] font-medium uppercase tracking-eyebrow text-white backdrop-blur-md">
              {propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}
            </Badge>
          )}
          <Badge variant="secondary" className="rounded-full border-white/20 bg-white/15 px-3 py-1 text-[11px] font-medium uppercase tracking-eyebrow text-white backdrop-blur-md">
            {formatListingType(listingType)}
          </Badge>
          {isBankOwned && (
            <Badge className="rounded-full bg-amber-50/95 px-3 py-1 text-[10px] font-medium uppercase tracking-eyebrow text-amber-900 backdrop-blur-sm">
              {getBankOwnedLabel(propertyType)}
            </Badge>
          )}
          {isOportunidad && (
            <Badge className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-[11px] font-medium uppercase tracking-eyebrow text-white">
              Oportunidad
            </Badge>
          )}
        </div>

        {/* Location eyebrow */}
        {(city ?? province) && (
          <div className="mb-2 flex items-center text-[11px] font-medium uppercase tracking-eyebrow text-white/70">
            <MapPin className="mr-1 h-3 w-3" />
            <span>{[city, province].filter(Boolean).join(", ")}</span>
          </div>
        )}

        {/* Title - tappable link */}
        <Link
          href={`/propiedades/${buildPropertySlug({
            listingId,
            title,
            propertyType,
            city,
            bedrooms,
            listingType,
          })}`}
        >
          <h2 className="mb-3 text-2xl font-medium leading-tight tracking-tight text-white">
            {displayTitle}
          </h2>
        </Link>

        {/* Price */}
        <p className="mb-4 text-3xl font-medium tracking-tight text-white">
          {(() => {
            const num = Number(price);
            if (!num || isNaN(num)) return "A consultar";
            return (
              <>
                {formatPrice(num)}€
                {isRental && (
                  <span className="text-base font-normal text-white/80">
                    /mes
                  </span>
                )}
              </>
            );
          })()}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-5 border-t border-white/15 pt-4 text-sm text-white/85">
          {showBeds && (
            <div className="flex items-center gap-1.5">
              <Bed className="h-4 w-4" />
              <span>{bedrooms} Hab</span>
            </div>
          )}
          {showBaths && (
            <div className="flex items-center gap-1.5">
              <Bath className="h-4 w-4" />
              <span>{bathrooms} Baños</span>
            </div>
          )}
          {(squareMeter ?? 0) > 0 && (
            <div className="flex items-center gap-1.5">
              <SquareFoot className="h-4 w-4" />
              <span>{formatNumber(squareMeter!)} m²</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
