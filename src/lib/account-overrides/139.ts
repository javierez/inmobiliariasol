// Hardcoded brand overrides for account 139 (Domus Aurea Capital).
// Lives in code (not DB) so admin UI edits to website_config can't wipe it.

export const ACCOUNT_139_ID = "139";

export function isAccount139(): boolean {
  return process.env.NEXT_PUBLIC_ACCOUNT_ID === ACCOUNT_139_ID;
}

// 139's brand (secondary) colour is a light taupe (#CBC3BB). The automatic
// contrast picker would put dark text on it, but the brand wants WHITE text on
// every brand/secondary-coloured label, badge and button. When set, layout
// forces `--brand-foreground` to white instead of the auto-computed value.
export const ACCOUNT_139_WHITE_BRAND_FOREGROUND = true;

// Keeps the DB secondaryColor (#CBC3BB) but lays a very subtle dark tint over
// it — like a low-opacity black overlay — so the white text stands out a bit
// more without changing the configured colour. 0 = unchanged, 1 = black.
export const ACCOUNT_139_BRAND_DARKEN = 0.18;
