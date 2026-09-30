import { ARS_RATE } from "./pricingData.js";
import type { Feature } from "./pricingData.js";

export type Currency = "usd" | "ars";

export function calcSetup(checked: Set<string>, features: Feature[]): number {
  let total = 0;
  for (const f of features) {
    if (f.locked || checked.has(f.id)) total += f.price;
  }
  return total;
}

export function fmt(n: number, currency: Currency): string {
  if (currency === "ars") return "$" + Math.round(n * ARS_RATE).toLocaleString("es-AR");
  return "$" + n.toLocaleString("en-US");
}

export function buildWaMessage(
  checked: Set<string>,
  currency: Currency,
  t: (key: string) => string,
  features: Feature[],
): string {
  const setup = calcSetup(checked, features);
  const selectedLabels = features.filter(f => !f.locked && checked.has(f.id)).map(f => `• ${f.label}`);
  const lines = [
    t("wa_greeting"),
    t("wa_name_line"),
    "",
    t("wa_intro"),
    "",
    `${t("wa_setup_label")} ${fmt(setup, currency)}`,
    "",
    t("wa_features_label"),
    ...selectedLabels,
    "",
    t("wa_closing"),
  ];
  return lines.join("\n");
}
