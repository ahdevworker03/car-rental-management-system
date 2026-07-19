/**
 * Shared formatting helpers.
 * Import these instead of redefining per-page.
 */

/** Format a number as Lebanese Pounds: 1,500,000 ل.ل */
export function formatLBP(n: number): string {
  return new Intl.NumberFormat("en-US").format(n) + " ل.ل";
}

/** Full Arabic date with year: ١٥ يناير ٢٠٢٥ */
export function formatDateAr(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("ar-LB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Short Arabic date without year: ١٥ يناير */
export function formatDateShort(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("ar-LB", {
    day: "numeric",
    month: "long",
  });
}
