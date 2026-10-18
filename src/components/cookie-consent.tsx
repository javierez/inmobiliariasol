"use client";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";

// The name the cookies policy lists under "Cookies Técnicas".
const COOKIE = "cookieConsent";
type Choice = "granted" | "denied";

function readChoice(): Choice | null {
  const match = new RegExp(`(?:^|; )${COOKIE}=(granted|denied)`).exec(
    document.cookie,
  );
  return (match?.[1] as Choice | undefined) ?? null;
}

/**
 * LSSI 22.2: Google Analytics / Tag Manager load only after the visitor
 * accepts. Mounted only when the agency has a tag: without one the site sets
 * no cookie that needs asking for, so there is no banner either.
 */
export function ConsentAnalytics({
  tagId,
  isTagManager,
}: {
  tagId: string;
  isTagManager: boolean;
}) {
  // undefined = not read yet (server render), so nothing flashes.
  const [choice, setChoice] = useState<Choice | null | undefined>(undefined);
  useEffect(() => setChoice(readChoice()), []);

  const decide = (next: Choice) => {
    document.cookie = `${COOKIE}=${next}; Max-Age=31536000; Path=/; SameSite=Lax; Secure`;
    setChoice(next);
  };

  if (choice === "granted") {
    return isTagManager ? (
      <GoogleTagManager gtmId={tagId} />
    ) : (
      <GoogleAnalytics gaId={tagId} />
    );
  }
  if (choice !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookies"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-lg border border-border bg-background p-4 shadow-lg sm:flex sm:items-center sm:gap-4"
    >
      <p className="text-sm text-muted-foreground">
        Usamos cookies de análisis para saber cómo se usa la web. Solo se
        activan si las aceptas.{" "}
        <Link href="/cookies" className="underline underline-offset-4">
          Más información
        </Link>
      </p>
      <div className="mt-3 flex shrink-0 gap-2 sm:mt-0">
        <Button variant="outline" size="sm" onClick={() => decide("denied")}>
          Rechazar
        </Button>
        <Button size="sm" onClick={() => decide("granted")}>
          Aceptar
        </Button>
      </div>
    </div>
  );
}

/** Withdrawing consent: forget the choice so the banner asks again. */
export function ResetConsentButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        document.cookie = `${COOKIE}=; Max-Age=0; Path=/`;
        window.location.reload();
      }}
    >
      Cambiar mis preferencias
    </Button>
  );
}
