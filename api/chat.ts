import Anthropic from "@anthropic-ai/sdk";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { FEATURES } from "../src/utils/pricingData.js";
import { getFeatures, PRICING_T } from "../src/utils/pricingTranslations.js";
import { calcSetup, buildWaMessage } from "../src/utils/pricingCalc.js";
import { FAQS } from "../src/utils/faqsData.js";
import { WA_MSG } from "../src/utils/constants.js";

type Locale = "en" | "es" | "pt";
type ChatMessage = { role: "user" | "assistant"; content: string };

const ALLOWED_ORIGINS = [
  /^http:\/\/localhost:\d+$/,
  /^http:\/\/127\.0\.0\.1:\d+$/,
  /^https:\/\/(www\.)?giulianoconti\.com$/,
];

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGINS.some(re => re.test(origin));
}

// In-memory, per-process rate limit — resets on cold start, not shared across
// concurrent Vercel instances. Deliberate trade-off for a low-traffic portfolio
// site (see docs/superpowers/specs/2026-07-31-pricing-chatbot-design.md); good
// enough to stop casual abuse, not a hard guarantee.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 20;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(ip);
  if (!bucket || now > bucket.resetAt) {
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX;
}

const MAX_MESSAGE_LENGTH = 500;
const MAX_MESSAGES = 20;

function buildSystemPrompt(locale: Locale): string {
  const faqs = FAQS[locale]
    .map(
      ({ q, a }) => `Q: ${q}\nA: ${typeof a === "string" ? a : a.items.map(i => `${i.title}: ${i.text}`).join(" | ")}`,
    )
    .join("\n\n");

  const features = getFeatures(locale)
    .filter(f => !f.locked)
    .map(f => `- id="${f.id}" (${f.group}): ${f.label} - ${f.desc}. +$${f.price}`)
    .join("\n");

  const langName: Record<Locale, string> = { es: "español", en: "English", pt: "português" };

  return `Sos el asistente de cotización de Giuliano Conti, un desarrollador freelance. Respondé siempre en ${langName[locale]}.

Tu trabajo:
1. Entender qué página o app necesita el visitante (cuántas secciones, si necesita login, panel de admin, base de datos, etc).
2. Antes de preguntar algo, releé todo el historial de la conversación: si el usuario ya lo dijo (aunque haya sido de forma implícita, por ejemplo "login y panel de admin" ya implica que sí hay base de datos), no lo vuelvas a preguntar. Hacé como máximo 1-2 preguntas de clarificación en total, solo sobre lo que realmente falta.
3. Cuando tengas info suficiente, llamá SIEMPRE a la tool "get_quote" para calcular el precio, nunca inventes ni calcules números vos mismo.
4. Presentá el precio devuelto por la tool de forma clara y breve, y mencioná que puede seguir la conversación por WhatsApp (el link ya se muestra aparte, no lo repitas en el texto).
5. Giuliano trabaja solo por proyecto con pago único (50% al arrancar, 50% al entregar). No ofrece planes mensuales, suscripciones ni retainers: si preguntan, aclaralo con amabilidad. El proyecto se entrega en cuentas del cliente.
6. También podés responder preguntas generales (plazos, forma de pago, etc.) usando este contexto de FAQ:

${faqs}

Features disponibles y sus precios (USD, pago único):
${features}

Sé breve, directo y amigable. Es un chat, no un email, nada de markdown pesado ni listas largas. Nunca uses la raya "—" en tus respuestas, usá coma o punto en su lugar.`;
}

const GET_QUOTE_TOOL: Anthropic.Tool = {
  name: "get_quote",
  description:
    "Calcula el precio real para un conjunto de features. Llamala siempre antes de mostrarle un precio al usuario.",
  input_schema: {
    type: "object",
    properties: {
      features: {
        type: "array",
        items: { type: "string", enum: FEATURES.filter(f => !f.locked).map(f => f.id) },
        description: "IDs de features elegidas. Para páginas web, elegí exactamente una de: p1, p4, p10.",
      },
      currency: { type: "string", enum: ["usd", "ars"] },
    },
    required: ["features", "currency"],
  },
};

type QuoteInput = { features: string[]; currency: string };

type QuoteResult = {
  currency: "usd" | "ars";
  priceUsd: number;
  selectedFeatures: string[];
  whatsappLink: string;
};

function runQuoteTool(input: QuoteInput, locale: Locale): QuoteResult {
  const features = getFeatures(locale);
  const validIds = new Set(features.map(f => f.id));
  const checked = new Set<string>();
  for (const id of input.features ?? []) if (validIds.has(id)) checked.add(id);
  for (const id of [...checked]) {
    const f = features.find(x => x.id === id);
    f?.triggers?.forEach(tr => checked.add(tr));
  }

  const currency = input.currency === "ars" ? "ars" : "usd";

  const price = calcSetup(checked, features);
  const t = (key: string) => PRICING_T[locale][key] ?? key;
  const waMessage = buildWaMessage(checked, currency, t, features);

  return {
    currency,
    priceUsd: price,
    selectedFeatures: features.filter(f => !f.locked && checked.has(f.id)).map(f => f.label),
    whatsappLink: WA_MSG(waMessage),
  };
}

function getHeader(req: VercelRequest, name: string): string | null {
  const value = req.headers[name];
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const origin = getHeader(req, "origin");
  if (!isAllowedOrigin(origin)) {
    res.status(403).json({ error: "forbidden_origin" });
    return;
  }

  const ip = getHeader(req, "x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    res.status(429).json({ error: "rate_limited" });
    return;
  }

  let body: { messages?: ChatMessage[]; locale?: string };
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body ?? {});
  } catch {
    res.status(400).json({ error: "invalid_json" });
    return;
  }

  const locale: Locale = body.locale === "en" || body.locale === "pt" ? body.locale : "es";
  const messages = (body.messages ?? []).slice(-MAX_MESSAGES).map(m => ({
    role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
    content: String(m.content ?? "").slice(0, MAX_MESSAGE_LENGTH),
  }));

  if (messages.length === 0) {
    res.status(400).json({ error: "empty_messages" });
    return;
  }

  const client = new Anthropic();
  const conversation: Anthropic.MessageParam[] = messages.map(m => ({
    role: m.role,
    content: m.content,
  }));

  let quoteResult: QuoteResult | null = null;

  for (let iteration = 0; iteration < 3; iteration++) {
    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      system: buildSystemPrompt(locale),
      tools: [GET_QUOTE_TOOL],
      messages: conversation,
    });

    conversation.push({ role: "assistant", content: response.content });

    if (response.stop_reason !== "tool_use") {
      const textBlock = response.content.find(b => b.type === "text");
      const reply = textBlock && textBlock.type === "text" ? textBlock.text : "";
      res.status(200).json({ reply, quote: quoteResult });
      return;
    }

    const toolUses = response.content.filter(b => b.type === "tool_use");
    if (toolUses.length === 0) break;

    const toolResults = toolUses.map(toolUse => {
      const result = runQuoteTool(toolUse.input as QuoteInput, locale);
      quoteResult = result;
      return {
        type: "tool_result" as const,
        tool_use_id: toolUse.id,
        content: JSON.stringify(result),
      };
    });

    conversation.push({ role: "user", content: toolResults });
  }

  res.status(502).json({ error: "assistant_incomplete" });
}
