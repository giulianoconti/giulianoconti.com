// Single source of truth for the "availability" badge on the hero.
// Update this one date whenever your availability changes — everything
// else (label, months remaining, badge color) derives from it.
export const AVAILABLE_FROM = new Date("2026-07-07");

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const DAYS_PER_MONTH = 30;

/** Months remaining until AVAILABLE_FROM, rounded up. 0 means available now. */
export function getMonthsUntilAvailable(now: Date = new Date()): number {
  const diffDays = (AVAILABLE_FROM.getTime() - now.getTime()) / MS_PER_DAY;
  if (diffDays <= 0) return 0;
  return Math.max(1, Math.round(diffDays / DAYS_PER_MONTH));
}
