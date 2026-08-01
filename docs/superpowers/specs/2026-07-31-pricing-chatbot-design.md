# Chatbot de cotización — reemplazo de Proceso + Precios + FAQ

## Objetivo

Reemplazar las secciones **Proceso**, **Precios** (intro + quiz + tabla) y **FAQ** por una única sección de chat donde el visitante describe en lenguaje natural la página que necesita, y el bot responde con una cotización aproximada (usando la lógica de precios ya existente) y responde dudas tipo FAQ. El botón flotante de WhatsApp se mantiene como vía directa de contacto, sin cambios.

## Alcance

- Eliminar los componentes `src/pages/Home/Process`, `src/pages/Home/Pricing` y `src/pages/Home/FAQ` del render de `Home/index.tsx`.
- Agregar una nueva sección `src/pages/Home/Chat` que ocupa ese lugar en el scroll (no es un widget flotante).
- El bot cotiza usando la tabla de features/precios existente (`src/utils/pricingData.ts`) — el LLM nunca inventa números, siempre llama a una función que hace el cálculo real.
- El bot también responde preguntas tipo FAQ usando el contenido de `src/utils/faqsData.ts` como contexto.
- Al llegar a una cotización, el bot ofrece un botón de WhatsApp con el resumen precargado (mismo formato que `buildWaMessage` en `QuoteModal.tsx` hoy).
- Multilenguaje: el bot responde en el idioma activo del sitio (es/en/pt), reutilizando los datos ya traducidos.
- Fuera de alcance: no se toca el diseño 3D del Hero/Scene, ni Experience, ni Contact.

## Arquitectura

```
Browser (Chat section)
   │  POST /api/chat  { messages: [...], locale: "es" }
   ▼
Vercel Function (Node, api/chat.ts)
   │  1. valida Origin/Referer contra allowlist
   │  2. valida rate limit en memoria por IP
   │  3. llama a Anthropic Messages API (streaming) con tool "get_quote"
   │  4. si Claude llama la tool, el servidor calcula el precio real
   │     (pricingCalc.ts) y se lo devuelve a Claude en el mismo loop
   ▼
Respuesta en streaming (SSE/texto) → se renderiza incremental en el chat
```

No hay backend previo en este proyecto (Vite estático + `vercel.json` con rewrites). Se agrega un único archivo `api/chat.ts` como Vercel Function — Vercel lo detecta automáticamente por convención de carpeta `api/`, sin cambios en `vercel.json`.

## Componentes

### 1. `src/utils/pricingCalc.ts` (nuevo, extraído de `QuoteModal.tsx`)

Las funciones `calcSetup`, `calcInfra`, `calcMonthly` y `buildCheckedFromQuiz` hoy viven dentro de `QuoteModal.tsx` y son puro cálculo (sin dependencias de React). Se mueven a un archivo compartido para que tanto `QuoteModal.tsx` (si se conserva) como `api/chat.ts` los reutilicen sin duplicar la lógica de precios. `QuoteModal`/`Pricing` se eliminan del render, pero el archivo `pricingData.ts` y estas funciones puras se conservan como la única fuente de verdad del pricing.

### 2. `api/chat.ts` (nuevo, Vercel Function — Node runtime)

- **Auth de origen**: lee el header `Origin` (fallback `Referer`), permite solo `http://localhost:*` / `http://127.0.0.1:*` (dev) y `https://giulianoconti.com` (+ `https://www.giulianoconti.com` si aplica) en prod. Cualquier otro origen → `403`.
- **Rate limit**: `Map<ip, {count, resetAt}>` en memoria del proceso — ej. 20 mensajes/hora por IP, ventana fija. Al superarse, `429` con mensaje claro. *Limitación conocida y aceptada*: se resetea en cada cold start y no se comparte entre instancias concurrentes de Vercel — corta abuso básico, no es una garantía dura. Documentado en el código con un comentario breve.
- **Validación de input**: cada mensaje del usuario capado a ~500 caracteres; conversación capada a un máximo de mensajes (ej. 20) para no permitir loops de costo ilimitado desde el cliente.
- **Llamada a Claude**: usa el SDK oficial `@anthropic-ai/sdk` (nueva dependencia), modelo `claude-haiku-4-5` (rápido y barato, apropiado para esta tarea conversacional acotada), streaming habilitado.
- **Tool `get_quote`**: input schema con la lista de feature ids elegibles (los `id` de `FEATURES` en `pricingData.ts`), el modelo de pago (`monthly`/`onetime`) y el tier (`basic`/`standard`/`premium` si monthly). El handler del tool ejecuta `calcSetup`/`calcMonthly` de `pricingCalc.ts` y devuelve el precio real + el link de WhatsApp pre-armado (usando `buildWaMessage` movido también a `pricingCalc.ts` o similar) para que el modelo lo incluya en la respuesta.
- **System prompt**: instruye a Claude a (a) charlar en el idioma indicado por `locale`, (b) hacer 1-2 preguntas de clarificación si falta info clave (páginas, login, panel admin, etc.) antes de cotizar, (c) llamar siempre a `get_quote` para cualquier número que muestre — nunca inventar precios, (d) responder preguntas generales (plazos, forma de pago, etc.) usando el contenido de `faqsData.ts` inyectado como contexto, (e) cuando corresponda, cerrar ofreciendo el link de WhatsApp con el resumen.
- **API key**: `ANTHROPIC_API_KEY` como env var de Vercel (production + preview), nunca expuesta al cliente.

### 3. `src/pages/Home/Chat/index.tsx` (nuevo, reemplaza Process+Pricing+FAQ)

- Sección con el mismo tratamiento visual (eyebrow + título + línea) que las secciones actuales, con un panel de chat: lista de mensajes + input de texto + botón enviar.
- Estado: array de mensajes en memoria de React (sin persistencia — se pierde al recargar, aceptable para este caso de uso).
- Envía todo el historial en cada request a `/api/chat` (API stateless, sin sesiones server-side).
- Streaming: consume la respuesta con `fetch` + `ReadableStream`, va pintando el texto incremental.
- Cuando el bot devuelve un precio con link de WhatsApp, se renderiza como botón/CTA visualmente destacado (mismo estilo `qm__price-bar__cta` actual) además del texto.
- Maneja estados de error: rate limit (429) y error de red, con mensaje amigable + link directo a WhatsApp como fallback ("mejor escribime directo").

## Data flow del cálculo

1. Usuario describe su necesidad en texto libre.
2. Claude interpreta y, cuando tiene suficiente info, llama `get_quote({ features: ["p4","auth","db"], model: "monthly", tier: "standard" })`.
3. El servidor calcula con las mismas funciones que usa hoy el quiz (`calcMonthly`, etc.), usando los precios reales de `FEATURES`/`MONTHLY_TIERS`/`INFRA_COSTS`.
4. El resultado (precio + moneda ARS/USD + link WA) vuelve a Claude como tool result.
5. Claude redacta la respuesta final al usuario incluyendo el precio.

Moneda: se determina igual que hoy (timezone Argentina → ARS, resto → USD), enviado como parte del contexto inicial al backend.

## Manejo de errores

- Origen no permitido → 403, el chat muestra "no disponible" (no debería ocurrir en uso normal, es protección anti-abuso).
- Rate limit excedido → 429, mensaje en el chat invitando a esperar o ir directo a WhatsApp.
- Error de la API de Anthropic (5xx, timeout) → mensaje de error genérico + botón WhatsApp de emergencia.
- Input vacío o > límite de caracteres → validado en el cliente antes de enviar.

## Testing

- Verificación manual en dev (`vercel dev` para levantar la función serverless localmente, ya que Vite solo no ejecuta `api/`).
- Casos a probar a mano: cotización simple (landing), cotización con features (login+panel admin), pregunta FAQ pura ("¿cuánto tarda un proyecto?"), mensaje fuera de tema, rate limit (mandar >20 mensajes seguidos), origen no permitido (curl con Origin falso → 403).
- No se agregan tests automatizados — no hay suite de testing en el proyecto actualmente.

## Dependencias nuevas

- `@anthropic-ai/sdk` (paquete npm).
- Env var `ANTHROPIC_API_KEY` en Vercel (production + preview).
