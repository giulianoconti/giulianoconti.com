# Chatbot de cotización Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Process, Pricing, and FAQ sections with a single chat section where visitors describe the page they need in natural language and get a real price estimate (computed by existing pricing logic, never guessed by the LLM), plus answers to FAQ-style questions. The WhatsApp floating button stays untouched.

**Architecture:** A new Vercel Function (`api/chat.ts`, Node runtime) holds the Anthropic API key server-side, validates the request's Origin and a per-IP rate limit, then runs a short tool-use loop against Claude Haiku 4.5: Claude either replies directly or calls a `get_quote` tool, whose handler computes the real price using pricing functions extracted from the existing `QuoteModal.tsx` into a shared `pricingCalc.ts`. The response is a single non-streaming JSON reply (simpler and sufficient for this low-traffic, short-reply use case — see note below). The client is a new `Chat` React section that posts the full message history to `/api/chat` and renders the reply, showing a WhatsApp CTA button when a quote comes back.

**Tech Stack:** React 19 + TypeScript + Vite (existing), `@anthropic-ai/sdk` (new), Vercel Functions (Node runtime, no new config needed — Vercel auto-detects `api/*.ts`).

**Deviation from the design spec:** the spec described streaming responses. This plan uses a single non-streaming JSON response instead — same UX for short chat replies (a "typing" indicator covers the wait), far less code and failure surface (no hand-rolled SSE parsing on either end). If real streaming is wanted later, it's a contained change to `api/chat.ts` + the `send()` function in `Chat/index.tsx`.

## Global Constraints

- Never expose `ANTHROPIC_API_KEY` to the client — it only ever lives in `api/chat.ts`, read from `process.env`.
- `api/chat.ts` must reject requests whose `Origin` header isn't `http://localhost:<port>`, `http://127.0.0.1:<port>`, or `https://giulianoconti.com` (+ `www.` variant) — see spec's anti-abuse requirement.
- Rate limit: 20 messages/hour per IP, in-memory (documented limitation: resets on cold start, not shared across instances — acceptable for this traffic level per the approved spec).
- Per-message cap: 500 characters. Per-conversation cap sent to the API: last 20 messages.
- The bot must never state a price without having called `get_quote` — enforced via the system prompt, not code (the tool result is the only source of numbers).
- All three locales (`en`, `es`, `pt`) must work end-to-end — reuse `PRICING_T`, `FAQS`, and `getFeatures` from the existing localized data files.
- Model: `claude-haiku-4-5` (cheap, fast, appropriate for a short scoped conversational task).

---

### Task 1: Add the Anthropic SDK dependency

**Files:**

- Modify: `package.json`

**Interfaces:**

- Produces: `@anthropic-ai/sdk` importable as `import Anthropic from "@anthropic-ai/sdk"` in Task 3.

- [ ] **Step 1: Install the package**

Run:

```bash
npm install @anthropic-ai/sdk
```

- [ ] **Step 2: Verify it installed correctly**

Run: `node -e "console.log(require('@anthropic-ai/sdk/package.json').version)"`
Expected: prints a version string (e.g. `0.6x.x`), no error.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add @anthropic-ai/sdk dependency"
```

---

### Task 2: Extract pricing calculation functions into a shared module

**Files:**

- Create: `src/utils/pricingCalc.ts`

**Interfaces:**

- Consumes: `ARS_RATE`, `MONTHLY_TIERS`, `INFRA_COSTS` from `src/utils/pricingData.ts`; types `Feature`, `TierId` from the same file.
- Produces: `calcInfra(checked: Set<string>): number`, `calcSetup(checked: Set<string>, model: Model, features: Feature[]): number`, `calcMonthly(model: Model, tier: TierId, checked: Set<string>, features: Feature[]): number`, `fmt(n: number, currency: Currency): string`, `buildWaMessage(checked: Set<string>, model: Model, tier: TierId, currency: Currency, t: (key: string) => string, features: Feature[]): string`, and types `Model = "monthly" | "onetime"`, `Currency = "usd" | "ars"`. These are consumed by Task 3 (`api/chat.ts`).

This is a straight extraction of logic that already exists (and keeps working, unchanged) inside `src/pages/Home/Pricing/QuoteModal.tsx:21-90` — copied here so the new serverless function can reuse the exact same pricing math without duplicating it or depending on a React component file. `QuoteModal.tsx` itself is left untouched for now; it gets deleted wholesale in Task 8 along with the rest of the old Pricing UI.

- [ ] **Step 1: Create the file**

```typescript
// src/utils/pricingCalc.ts
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

export function calcMonthly(model: Model, tier: TierId, checked: Set<string>, features: Feature[]): number {
  if (model !== "monthly") return 0;
  const featureSum = features.filter(f => !f.locked && checked.has(f.id)).reduce((sum, f) => sum + f.price, 0);
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
  const selectedLabels = features.filter(f => !f.locked && checked.has(f.id)).map(f => `• ${f.label}`);
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
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no errors mentioning `pricingCalc.ts`. (Pre-existing unrelated errors, if any, are not this task's concern.)

- [ ] **Step 3: Manual sanity check of the math**

Run a throwaway check to confirm the extracted function produces the same output as the original quiz flow for a known case:

```bash
node --input-type=module -e "
import { calcMonthly, calcSetup } from './src/utils/pricingCalc.ts';
const checked = new Set(['p1', 'auth', 'db', 'roles']);
console.log('monthly standard:', calcMonthly('monthly', 'standard', checked, [
  { id: 'p1', label: '', desc: '', price: 200, group: 'paginas' },
  { id: 'auth', label: '', desc: '', price: 200, group: 'backend' },
  { id: 'db', label: '', desc: '', price: 100, group: 'backend' },
  { id: 'roles', label: '', desc: '', price: 100, group: 'backend' },
]));
"
```

Expected: prints a number (infra 10 + supabase 20 + round(600/20)=30 + tier extra 60 = 120). If Node's TS support via `--input-type=module` errors out on your Node version, skip this and rely on Step 2's type-check plus the end-to-end manual test in Task 9 instead — this step is a nice-to-have sanity check, not a hard gate.

- [ ] **Step 4: Commit**

```bash
git add src/utils/pricingCalc.ts
git commit -m "feat: extract pricing calculation logic into shared module"
```

---

### Task 3: Create the `/api/chat` Vercel Function

**Files:**

- Create: `api/chat.ts`
- Modify: `tsconfig.json` (add `"api"` to `include` so this file gets type-checked)

**Interfaces:**

- Consumes: `FEATURES`, `TierId` from `src/utils/pricingData.ts`; `getFeatures`, `PRICING_T` from `src/utils/pricingTranslations.ts`; `calcSetup`, `calcMonthly`, `buildWaMessage` from `src/utils/pricingCalc.ts` (Task 2); `FAQS` from `src/utils/faqsData.ts`; `WA_MSG` from `src/utils/constants.ts`.
- Produces: a POST endpoint at `/api/chat` accepting `{ messages: {role: "user"|"assistant", content: string}[], locale: "en"|"es"|"pt", currency: "usd"|"ars" }` and returning `{ reply: string, quote: QuoteResult | null }` on success — consumed by Task 5 (`Chat/index.tsx`).

- [ ] **Step 1: Add `api` to the TypeScript project's included paths**

In `tsconfig.json`, change:

```json
  "include": ["src"]
```

to:

```json
  "include": ["src", "api"]
```

- [ ] **Step 2: Create `api/chat.ts`**

```typescript
// api/chat.ts
import Anthropic from "@anthropic-ai/sdk";
import { FEATURES } from "../src/utils/pricingData";
import type { TierId } from "../src/utils/pricingData";
import { getFeatures, PRICING_T } from "../src/utils/pricingTranslations";
import { calcSetup, calcMonthly, buildWaMessage } from "../src/utils/pricingCalc";
import { FAQS } from "../src/utils/faqsData";
import { WA_MSG } from "../src/utils/constants";

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
    .map(f => `- id="${f.id}" (${f.group}): ${f.label} — ${f.desc}. +$${f.price}`)
    .join("\n");

  const langName: Record<Locale, string> = { es: "español", en: "English", pt: "português" };

  return `Sos el asistente de cotización de Giuliano Conti, un desarrollador freelance. Respondé siempre en ${langName[locale]}.

Tu trabajo:
1. Entender qué página o app necesita el visitante (cuántas secciones, si necesita login, panel de admin, base de datos, etc).
2. Hacé como máximo 1-2 preguntas de clarificación si falta info clave. No interrogues de más.
3. Cuando tengas info suficiente, llamá SIEMPRE a la tool "get_quote" para calcular el precio — nunca inventes ni calcules números vos mismo.
4. Presentá el precio devuelto por la tool de forma clara y breve, y mencioná que puede seguir la conversación por WhatsApp (el link ya se muestra aparte, no lo repitas en el texto).
5. También podés responder preguntas generales (plazos, forma de pago, diferencia entre planes, etc.) usando este contexto de FAQ:

${faqs}

Features disponibles y sus precios base (USD, plan mensual estándar):
${features}

Sé breve, directo y amigable. Es un chat, no un email — nada de markdown pesado ni listas largas.`;
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
      model: { type: "string", enum: ["monthly", "onetime"], description: "Modelo de pago" },
      tier: {
        type: "string",
        enum: ["basic", "standard", "premium"],
        description: "Solo aplica si model=monthly",
      },
      currency: { type: "string", enum: ["usd", "ars"] },
    },
    required: ["features", "model", "currency"],
  },
};

type QuoteInput = { features: string[]; model: string; tier?: string; currency: string };

type QuoteResult = {
  model: "monthly" | "onetime";
  tier: TierId;
  currency: "usd" | "ars";
  setupPriceUsd: number | null;
  monthlyPriceUsd: number | null;
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

  const model = input.model === "onetime" ? "onetime" : "monthly";
  const tier: TierId = (["basic", "standard", "premium"] as const).includes(input.tier as TierId)
    ? (input.tier as TierId)
    : "standard";
  const currency = input.currency === "ars" ? "ars" : "usd";

  const setup = calcSetup(checked, model, features);
  const monthly = calcMonthly(model, tier, checked, features);
  const t = (key: string) => PRICING_T[locale][key] ?? key;
  const waMessage = buildWaMessage(checked, model, tier, currency, t, features);

  return {
    model,
    tier,
    currency,
    setupPriceUsd: model === "onetime" ? setup : null,
    monthlyPriceUsd: model === "monthly" ? monthly : null,
    selectedFeatures: features.filter(f => !f.locked && checked.has(f.id)).map(f => f.label),
    whatsappLink: WA_MSG(waMessage),
  };
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), { status: 405 });
  }

  const origin = req.headers.get("origin");
  if (!isAllowedOrigin(origin)) {
    return new Response(JSON.stringify({ error: "forbidden_origin" }), { status: 403 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: "rate_limited" }), { status: 429 });
  }

  let body: { messages?: ChatMessage[]; locale?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "invalid_json" }), { status: 400 });
  }

  const locale: Locale = body.locale === "en" || body.locale === "pt" ? body.locale : "es";
  const messages = (body.messages ?? []).slice(-MAX_MESSAGES).map(m => ({
    role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
    content: String(m.content ?? "").slice(0, MAX_MESSAGE_LENGTH),
  }));

  if (messages.length === 0) {
    return new Response(JSON.stringify({ error: "empty_messages" }), { status: 400 });
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
      return new Response(JSON.stringify({ reply, quote: quoteResult }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    const toolUse = response.content.find(b => b.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") break;

    const result = runQuoteTool(toolUse.input as QuoteInput, locale);
    quoteResult = result;

    conversation.push({
      role: "user",
      content: [{ type: "tool_result", tool_use_id: toolUse.id, content: JSON.stringify(result) }],
    });
  }

  return new Response(JSON.stringify({ error: "assistant_incomplete" }), { status: 502 });
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no errors in `api/chat.ts`.

- [ ] **Step 4: Commit**

```bash
git add api/chat.ts tsconfig.json
git commit -m "feat: add /api/chat Vercel Function with quote tool"
```

---

### Task 4: Add chat translations and update the nav/section translation types

**Files:**

- Modify: `src/contexts/LocaleContext.tsx`

**Interfaces:**

- Produces: `t.chat.{label,h2pre,h2em,p,placeholder,send,greeting,rateLimited,networkError,waFallback}` and `t.nav.chat` — consumed by Task 5 (`Chat/index.tsx`) and Task 7 (`Navbar`).

This task removes the now-unused `nav.process`/`nav.pricing`/`nav.faq` and the `process`/`pricing`/`faq` translation blocks (their only consumers, the old section components, are deleted in Task 8), and adds a `chat` block plus `nav.chat` in all three locales.

- [ ] **Step 1: Update the `Translations` type**

In `src/contexts/LocaleContext.tsx`, replace the `nav` type (around line 6-15):

```typescript
nav: {
  chat: string;
  experience: string;
  tooltipLight: string;
  tooltipDark: string;
  tooltipLiteOn: string;
  tooltipLiteOff: string;
}
```

Replace the `process`/`pricing`/`faq` type blocks (around line 44-68) with a single `chat` block:

```typescript
chat: {
  label: string;
  h2pre: string;
  h2em: string;
  p: string;
  placeholder: string;
  send: string;
  greeting: string;
  rateLimited: string;
  networkError: string;
  waFallback: string;
}
```

- [ ] **Step 2: Update the `es` translations**

Replace `nav.process`/`nav.pricing`/`nav.faq` (in the `es` block) with `nav.chat: "CHAT"`.

Replace the `es` block's `process`/`pricing`/`faq` objects with:

```typescript
    chat: {
      label: "Chat",
      h2pre: "Contame qué",
      h2em: "necesitás",
      p: "Describí tu proyecto y te tiro un precio aproximado. Cualquier otra duda, seguimos por WhatsApp.",
      placeholder: "Ej: necesito una landing con botón de WhatsApp...",
      send: "Enviar",
      greeting:
        "Hola! Contame qué página necesitás — cuántas secciones, si lleva login, panel de admin, etc. — y te doy un precio aproximado.",
      rateLimited: "Mandaste muchos mensajes seguidos. Esperá un toque o escribime directo por WhatsApp.",
      networkError: "Uy, algo falló. Probá de nuevo o escribime directo por WhatsApp.",
      waFallback: "Hablar por WhatsApp",
    },
```

- [ ] **Step 3: Update the `en` translations**

Replace `nav.process`/`nav.pricing`/`nav.faq` with `nav.chat: "CHAT"`.

Replace the `en` block's `process`/`pricing`/`faq` objects with:

```typescript
    chat: {
      label: "Chat",
      h2pre: "Tell me what",
      h2em: "you need",
      p: "Describe your project and I'll give you a rough price. Anything else, we can keep talking on WhatsApp.",
      placeholder: "E.g: I need a landing page with a WhatsApp button...",
      send: "Send",
      greeting:
        "Hi! Tell me what page you need — how many sections, login, admin panel, etc. — and I'll give you a rough estimate.",
      rateLimited: "You've sent a lot of messages in a row. Wait a bit or message me directly on WhatsApp.",
      networkError: "Something went wrong. Try again or message me directly on WhatsApp.",
      waFallback: "Chat on WhatsApp",
    },
```

- [ ] **Step 4: Update the `pt` translations**

Replace `nav.process`/`nav.pricing`/`nav.faq` with `nav.chat: "CHAT"`.

Replace the `pt` block's `process`/`pricing`/`faq` objects with:

```typescript
    chat: {
      label: "Chat",
      h2pre: "Me conta o que",
      h2em: "você precisa",
      p: "Descreva seu projeto e te dou um preço aproximado. Qualquer outra dúvida, seguimos pelo WhatsApp.",
      placeholder: "Ex: preciso de uma landing com botão de WhatsApp...",
      send: "Enviar",
      greeting:
        "Oi! Me conta que página você precisa — quantas seções, login, painel admin, etc. — e te dou um preço aproximado.",
      rateLimited: "Você mandou muitas mensagens seguidas. Espera um pouco ou fala direto comigo no WhatsApp.",
      networkError: "Algo deu errado. Tenta de novo ou fala direto comigo no WhatsApp.",
      waFallback: "Falar no WhatsApp",
    },
```

- [ ] **Step 5: Type-check**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no errors about missing/extra `Translations` properties in `LocaleContext.tsx`. (Errors in `Navbar`/`Process`/`Pricing`/`FAQ` referencing the removed `t.nav.process` etc. are expected here and get fixed in Tasks 6-8 — don't treat those as this task's failure.)

- [ ] **Step 6: Commit**

```bash
git add src/contexts/LocaleContext.tsx
git commit -m "feat: replace process/pricing/faq translations with chat translations"
```

---

### Task 5: Build the Chat section component

**Files:**

- Create: `src/pages/Home/Chat/index.tsx`
- Create: `src/pages/Home/Chat/styles.scss`

**Interfaces:**

- Consumes: `useLocale()` from `src/contexts/LocaleContext.tsx` (for `t.chat.*`, `t.nav.chat`, `locale`); `WA_MSG` from `src/utils/constants.ts`; `WhatsAppIcon` from `src/icons/index.tsx`; POSTs to `/api/chat` (Task 3), expecting `{ reply: string, quote: QuoteResult | null }`.
- Produces: default export `Chat` — a `<section id="chat">` — consumed by Task 6 (`Home/index.tsx`).

- [ ] **Step 1: Create `src/pages/Home/Chat/index.tsx`**

```tsx
import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { useLocale } from "../../../contexts/LocaleContext";
import { WA_MSG } from "../../../utils/constants";
import { WhatsAppIcon } from "../../../icons";
import "./styles.scss";

type QuoteResult = {
  model: "monthly" | "onetime";
  tier: "basic" | "standard" | "premium";
  currency: "usd" | "ars";
  setupPriceUsd: number | null;
  monthlyPriceUsd: number | null;
  selectedFeatures: string[];
  whatsappLink: string;
} | null;

type ChatMessage = { role: "user" | "assistant"; content: string; quote?: QuoteResult };

const AR_SHORT = [
  "America/Cordoba",
  "America/Buenos_Aires",
  "America/Mendoza",
  "America/Jujuy",
  "America/Catamarca",
  "America/Rosario",
];
function isArgentina(): boolean {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return tz.startsWith("America/Argentina/") || AR_SHORT.includes(tz);
}

export default function Chat() {
  const { t, locale } = useLocale();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<"rate_limited" | "network" | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, error]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setError(null);
    setInput("");
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(m => ({ role: m.role, content: m.content })),
          locale,
          currency: isArgentina() ? "ars" : "usd",
        }),
      });

      if (res.status === 429) {
        setError("rate_limited");
        return;
      }
      if (!res.ok) throw new Error("bad_response");

      const data: { reply: string; quote: QuoteResult } = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply, quote: data.quote }]);
    } catch {
      setError("network");
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <section className="chat" id="chat">
      <div className="chat_inner">
        <div className="chat_header">
          <p className="chat_header_eyebrow">{t.chat.label.toUpperCase()}</p>
          <div className="chat_header_rule" />
        </div>

        <div className="chat_content">
          <h2 className="chat_content_title">
            {t.chat.h2pre} <em>{t.chat.h2em}</em>
          </h2>
          <p className="chat_content_desc">{t.chat.p}</p>

          <div className="chat_panel">
            <div className="chat_panel_list" ref={listRef}>
              {messages.length === 0 && <p className="chat_panel_greeting">{t.chat.greeting}</p>}

              {messages.map((m, i) => (
                <div key={i} className={`chat_msg chat_msg--${m.role}`}>
                  <p>{m.content}</p>
                  {m.quote && (
                    <a className="chat_msg_cta" href={m.quote.whatsappLink} target="_blank" rel="noopener noreferrer">
                      <WhatsAppIcon width={16} height={16} /> {t.chat.waFallback}
                    </a>
                  )}
                </div>
              ))}

              {loading && (
                <div className="chat_msg chat_msg--assistant chat_msg--loading">
                  <span />
                  <span />
                  <span />
                </div>
              )}

              {error && (
                <div className="chat_panel_error">
                  <p>{error === "rate_limited" ? t.chat.rateLimited : t.chat.networkError}</p>
                  <a href={WA_MSG(t.contact.waMsg)} target="_blank" rel="noopener noreferrer">
                    {t.chat.waFallback}
                  </a>
                </div>
              )}
            </div>

            <div className="chat_panel_input">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={t.chat.placeholder}
                rows={1}
                maxLength={500}
              />
              <button type="button" onClick={send} disabled={loading || !input.trim()}>
                {t.chat.send}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/pages/Home/Chat/styles.scss`**

```scss
@use "../../../styles/breakpoints" as *;
@use "../../../styles/layout" as *;
@use "../../../styles/typography" as *;

.chat {
  @include section-padding-x;
  padding-top: max(8vw, 80px);
  padding-bottom: max(6vw, 60px);

  .chat_inner {
    display: flex;
    flex-direction: column;
    gap: max(3vw, 48px);

    .chat_header {
      display: flex;
      flex-direction: column;
      gap: max(1vw, 16px);

      .chat_header_eyebrow {
        @include text-eyebrow;
        color: var(--eyebrow);
      }

      .chat_header_rule {
        background-color: var(--rule);
        height: 1px;
        width: 100%;
      }
    }

    .chat_content {
      display: flex;
      flex-direction: column;
      gap: max(2vw, 32px);

      .chat_content_title {
        @include text-h2;
        color: var(--text);
        font-style: normal;

        em {
          color: var(--muted);
          font-style: italic;
        }
      }

      .chat_content_desc {
        @include text-body;
        color: var(--body-text);
      }

      .chat_panel {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        max-width: 720px;
        overflow: hidden;

        .chat_panel_list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: 420px;
          min-height: 240px;
          overflow-y: auto;
          padding: 24px;

          .chat_panel_greeting {
            @include text-body;
            color: var(--body-text);
          }

          .chat_msg {
            border-radius: 12px;
            max-width: 85%;
            padding: 10px 14px;

            p {
              @include text-body;
              color: var(--text);
              margin: 0;
              white-space: pre-wrap;
            }

            &--user {
              align-self: flex-end;
              background: var(--accent-dim);
            }

            &--assistant {
              align-self: flex-start;
              background: var(--step-bg);
              border: 1px solid var(--step-border);
            }

            &--loading {
              align-items: center;
              display: flex;
              gap: 4px;
              padding: 14px 16px;

              span {
                animation: chat-dot 1.2s infinite ease-in-out;
                background: var(--muted);
                border-radius: 50%;
                height: 6px;
                width: 6px;

                &:nth-child(2) {
                  animation-delay: 0.2s;
                }
                &:nth-child(3) {
                  animation-delay: 0.4s;
                }
              }
            }

            .chat_msg_cta {
              align-items: center;
              background: var(--accent);
              border-radius: 999px;
              color: var(--accent-badge-text);
              display: inline-flex;
              font-weight: 600;
              gap: 6px;
              margin-top: 10px;
              padding: 8px 16px;
              text-decoration: none;
            }
          }

          .chat_panel_error {
            background: var(--step-bg);
            border: 1px solid var(--step-border);
            border-radius: 12px;
            padding: 12px 16px;

            p {
              @include text-body;
              color: var(--body-text);
              margin: 0 0 8px;
            }

            a {
              color: var(--accent);
            }
          }
        }

        .chat_panel_input {
          border-top: 1px solid var(--border);
          display: flex;
          gap: 12px;
          padding: 16px;

          textarea {
            background: transparent;
            border: none;
            color: var(--text);
            flex: 1;
            font: inherit;
            max-height: 120px;
            outline: none;
            resize: none;

            &::placeholder {
              color: var(--muted);
            }
          }

          button {
            background: var(--accent);
            border: none;
            border-radius: 999px;
            color: var(--accent-badge-text);
            cursor: pointer;
            font-weight: 600;
            padding: 10px 20px;

            &:disabled {
              cursor: not-allowed;
              opacity: 0.5;
            }
          }
        }
      }
    }
  }
}

@keyframes chat-dot {
  0%,
  60%,
  100% {
    opacity: 0.3;
  }
  30% {
    opacity: 1;
  }
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no errors in `Chat/index.tsx`.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Home/Chat
git commit -m "feat: add Chat section component"
```

---

### Task 6: Wire the Chat section into the Home page

**Files:**

- Modify: `src/pages/Home/index.tsx`

**Interfaces:**

- Consumes: default export `Chat` from `./Chat` (Task 5).

- [ ] **Step 1: Replace the Process/Pricing/FAQ imports and usage**

In `src/pages/Home/index.tsx`, replace:

```typescript
import Process from "./Process";
import Pricing from "./Pricing";
import FAQ from "./FAQ";
```

with:

```typescript
import Chat from "./Chat";
```

Replace the commented-out render block:

```tsx
{
  /* <Process /> */
}
{
  /* <Pricing /> */
}
{
  /* <FAQ /> */
}
```

with:

```tsx
<Chat />
```

- [ ] **Step 2: Update the section-view analytics IDs**

In the same file, find:

```typescript
const sections = ["experience", "process", "pricing", "faq"];
```

Replace with:

```typescript
const sections = ["experience", "chat"];
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no errors in `Home/index.tsx`. Errors from `Navbar` (still referencing `t.nav.process` etc.) are expected until Task 7 — not this task's concern.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Home/index.tsx
git commit -m "feat: replace Process/Pricing/FAQ with Chat in Home page"
```

---

### Task 7: Update the Navbar to link to the Chat section

**Files:**

- Modify: `src/components/molecules/Navbar/index.tsx`

**Interfaces:**

- Consumes: `t.nav.chat` (Task 4).

- [ ] **Step 1: Replace the three nav links with one**

In `src/components/molecules/Navbar/index.tsx`, replace:

```typescript
const navLinks = [
  { href: "#experience", label: t.nav.experience },
  { href: "#process", label: t.nav.process },
  { href: "#pricing", label: t.nav.pricing },
  { href: "#faq", label: t.nav.faq },
];
```

with:

```typescript
const navLinks = [
  { href: "#experience", label: t.nav.experience },
  { href: "#chat", label: t.nav.chat },
];
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no errors in `Navbar/index.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/molecules/Navbar/index.tsx
git commit -m "feat: update nav links for the Chat section"
```

---

### Task 8: Delete the old Process, Pricing, and FAQ section directories

**Files:**

- Delete: `src/pages/Home/Process/` (entire directory)
- Delete: `src/pages/Home/Pricing/` (entire directory, including `QuoteModal.tsx` / `QuoteModal.scss`)
- Delete: `src/pages/Home/FAQ/` (entire directory)

**Interfaces:**

- None — these are unused after Tasks 6-7 removed their only references. `src/utils/pricingData.ts`, `src/utils/pricingTranslations.ts`, `src/utils/pricingLocale.ts`, and `src/utils/faqsData.ts` are **not** deleted — they're still used by `api/chat.ts` (Task 3).

- [ ] **Step 1: Confirm nothing else references these directories**

Run:

```bash
grep -rn "from \"\.\./Process\"\|from \"\.\./Pricing\"\|from \"\.\./FAQ\"\|Home/Process\|Home/Pricing\|Home/FAQ\"" src
```

Expected: no output (all references were removed in Task 6).

- [ ] **Step 2: Delete the directories**

```bash
git rm -r src/pages/Home/Process src/pages/Home/Pricing src/pages/Home/FAQ
```

- [ ] **Step 3: Type-check and build**

Run: `npx tsc --noEmit -p tsconfig.json && npm run build`
Expected: both succeed with no errors.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: remove old Process/Pricing/FAQ sections"
```

---

### Task 9: Manual end-to-end verification

**Files:** none (verification only).

No automated test framework exists in this project (`package.json` has no `test` script). Verification is manual, using the Vercel CLI to run the serverless function locally — Vite alone does not execute `api/`.

- [ ] **Step 1: Set up local env var**

Create `.env.local` in the project root (already gitignored — confirm via `git check-ignore .env.local`) with:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Get a real key from `console.anthropic.com` if you don't have one, or run `ant auth status` to check for an existing profile-based credential (see the Claude API skill's Authentication section) — if a profile is active, `ANTHROPIC_API_KEY` can be omitted locally.

- [ ] **Step 2: Install the Vercel CLI if not present**

Run: `npm i -g vercel`

- [ ] **Step 3: Run the dev server via Vercel**

Run: `vercel dev`
Follow the prompts to link the project (first run only). This serves both the Vite app and `api/chat.ts` together, unlike `npm run dev`.

- [ ] **Step 4: Manual smoke tests in the browser**

Open the local URL `vercel dev` prints, scroll to the Chat section, and check:

- Cotización simple: escribir "necesito una landing page" → el bot pregunta lo mínimo y devuelve un precio + botón de WhatsApp.
- Cotización con features: "quiero un sitio con login y panel de administración" → el precio refleja auth+cms+db.
- Pregunta FAQ pura: "¿cuánto tarda un proyecto?" → responde usando el contenido de FAQ, sin llamar a la tool de precio.
- Cambiar idioma en el nav (ES/EN/PT) y repetir una cotización simple → el bot responde en el idioma correcto.
- El botón de WhatsApp del mensaje con cotización abre `wa.me` con el mensaje precargado correcto.

- [ ] **Step 5: Verify anti-abuse behavior**

Rate limit — mandar más de 20 mensajes seguidos en la misma sesión de navegador y confirmar que a partir del mensaje 21 el chat muestra el mensaje de `rateLimited` con el link de WhatsApp de emergencia.

Origin check — con el server de `vercel dev` corriendo, desde otra terminal:

```bash
curl -i -X POST http://localhost:3000/api/chat \
  -H "content-type: application/json" \
  -H "origin: https://evil.example.com" \
  -d '{"messages":[{"role":"user","content":"hola"}],"locale":"es"}'
```

Expected: `403` con `{"error":"forbidden_origin"}`.

- [ ] **Step 6: Set the production env var on Vercel**

Run (or do it via the Vercel dashboard → Project → Settings → Environment Variables):

```bash
vercel env add ANTHROPIC_API_KEY production
vercel env add ANTHROPIC_API_KEY preview
```

Paste the same API key when prompted for each.

- [ ] **Step 7: Final build check**

Run: `npm run build`
Expected: succeeds with no errors (this compiles the Vite app; `api/chat.ts` is built separately by Vercel at deploy time, already covered by `tsc --noEmit` in earlier tasks).
