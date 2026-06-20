/**
 * Surface-area helpers.
 *
 * Properties carry two surface fields:
 *   - `square_meter`         → the "useful"/plot surface (integer m²)
 *   - `built_surface_area`   → the built surface (decimal m², stored as string)
 *
 * Many listings only have the built surface filled in. To keep the displayed
 * surface consistent across the whole website, fall back to the built surface
 * (rounded) whenever `square_meter` is missing.
 */
export function resolveSquareMeter(
  squareMeter: number | null | undefined,
  builtSurfaceArea: string | number | null | undefined,
): number | null {
  if (squareMeter != null && squareMeter > 0) return squareMeter;
  if (builtSurfaceArea != null) {
    const built = Number(builtSurfaceArea);
    if (Number.isFinite(built) && built > 0) return Math.round(built);
  }
  return squareMeter ?? null;
}
