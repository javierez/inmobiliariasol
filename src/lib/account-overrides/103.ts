// Hardcoded label overrides for account 103.
// Renames a few navigation/category labels without touching the underlying
// routes or data model.

export const ACCOUNT_103_ID = "103";

export function isAccount103(): boolean {
  return process.env.NEXT_PUBLIC_ACCOUNT_ID === ACCOUNT_103_ID;
}
