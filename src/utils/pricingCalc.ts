import { ARS_RATE, MONTHLY_TIERS, INFRA_COSTS } from "./pricingData";
import type { Feature, TierId } from "./pricingData";

export type Model = "monthly" | "onetime";
export type Currency = "usd" | "ars";

export function calcInfra(checked: Set<string>): number {
  return INFRA_COSTS.base + (checked.has("db") ? INFRA_COSTS.supabase : 0);
}

export function calcSetup(checked: Set<string>, model: Model, features: Feature[]): number {
  if (model === "monthly") return 0;
  let total = 0;
  for (const f of features) {
    if (f.locked || checked.has(f.id)) total += f.price;
  }
  return total;
}

export function calcMonthly(
  model: Model,
  tier: TierId,
  checked: Set<string>,
  features: Feature[],
): number {
  if (model !== "monthly") return 0;
  const featureSum = features
    .filter(f => !f.locked && checked.has(f.id))
    .reduce((sum, f) => sum + f.price, 0);
  const extra = MONTHLY_TIERS.find(t => t.id === tier)!.extra;
  return calcInfra(checked) + Math.round(featureSum / 20) + extra;
}

export function fmt(n: number, currency: Currency): string {
  if (currency === "ars") return "$" + Math.round(n * ARS_RATE).toLocaleString("es-AR");
  return "$" + n.toLocaleString("en-US");
}

export function buildWaMessage(
  checked: Set<string>,
  model: Model,
  tier: TierId,
  currency: Currency,
  t: (key: string) => string,
  features: Feature[],
): string {
  const setup = calcSetup(checked, model, features);
  const monthly = calcMonthly(model, tier, checked, features);
  const selectedLabels = features
    .filter(f => !f.locked && checked.has(f.id))
    .map(f => `• ${f.label}`);
  const tierLabel = t(`qm_tier_${tier}_label`);
  const lines = [t("wa_greeting"), t("wa_name_line"), "", t("wa_intro"), ""];
  if (model === "monthly") {
    lines.push(`${t("wa_monthly_label")} ${fmt(monthly, currency)}/mes`);
    lines.push(`${t("wa_plan_label")} ${tierLabel}`);
  } else {
    lines.push(`${t("wa_setup_label")} ${fmt(setup, currency)}`);
    lines.push(t("wa_no_monthly"));
  }
  lines.push(
    "",
    t("wa_features_label"),
    ...selectedLabels,
    "",
    `${t("wa_model_label")} ${model === "monthly" ? t("wa_model_monthly") : t("wa_model_onetime")}`,
    "",
    t("wa_closing"),
  );
  return lines.join("\n");
}
