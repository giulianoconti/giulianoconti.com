# Quote Modal & Feature Builder — Design Spec
**Date:** 2026-05-06  
**Project:** giulianoconti.com (Vite + React + SCSS)

---

## Overview

Replace the existing fixed-plan calculator in `#precios` with a feature-based price builder. Clients pay exactly for what they need — no forced bundles. Two entry points: a guided 4-step quiz, or a direct feature table.

A first-visit modal auto-opens with the quiz flow. Subsequent visits can access both modes from the `#precios` section.

---

## What Changes

| Before | After |
|--------|-------|
| 3 fixed plans (landing / app / app-auth) | Feature-by-feature selection |
| Fixed calculator with locked options | Every feature individually toggleable |
| No direct feature access | Two modes: quiz + direct table |
| No first-visit engagement | Auto-opens modal on first visit (localStorage gate) |

The entire `lp__calc` block (calculator + comparison tables) in `#precios` is **replaced** by two entry-point cards + the modal.

---

## Entry Points — `#precios` Section

The section header stays ("Precios", title, subtitle — updated copy). Below: two side-by-side cards.

### Card 1 — Quiz (recommended)
- Label: "Hacé el quiz"
- Subtitle: "4 preguntas rápidas. Nosotros pre-configuramos la tabla."
- Lists the 4 question titles as preview
- CTA: "Empezar quiz →" (accent color)
- Badge: "Recomendado"

### Card 2 — Direct table
- Label: "Armar directo"
- Subtitle: "Sabés lo que querés. Activá features y ves el precio al instante."
- CTA: "Ver tabla →"

Both open the same `QuoteModal` component at different starting points.

---

## First Visit Auto-Open

- On mount, check `localStorage.getItem("lp-quote-modal-seen")`
- If not set: wait 600ms after page load, open modal in quiz mode
- On close: `localStorage.setItem("lp-quote-modal-seen", "1")`
- Does NOT re-open on subsequent visits

---

## Modal — Quiz Mode (4 steps)

Style: wizard with progress bar (C from visual exploration). Full-width option rows with icon + bold label + description. Selection auto-advances to next step.

### Step 1 — Pages
**Title:** ¿Cuántas páginas necesitás?  
**Sub:** Elegí la opción que mejor describe tu proyecto

| Icon | Label | Description | Maps to |
|------|-------|-------------|---------|
| 📄 | 1 página | Solo necesito una landing page | feature `p1` |
| 📋 | 2–4 páginas | Varias secciones para mi negocio | feature `p4` |
| 🗂️ | 5–10 páginas | Sitio completo con múltiples secciones | feature `p10` |

### Step 2 — Login
**Title:** ¿Tus clientes necesitan iniciar sesión?  
**Sub:** Esto define si hay backend de usuarios

| Icon | Label | Description | Maps to |
|------|-------|-------------|---------|
| 🌐 | No, es público | Solo info, contacto o catálogo | nothing added |
| 🔐 | Sí, necesito login | Registro, perfil, panel propio | features `auth` + `db` + `admin` |

### Step 3 — Timeline
**Title:** ¿Cuándo lo necesitás?  
**Sub:** El timeline afecta el precio de setup

| Icon | Label | Description | Effect |
|------|-------|-------------|--------|
| 📅 | Sin apuro | Entrega estándar | multiplier ×1.0 |
| ⚡ | Express +40% | Prioridad absoluta hasta entregarlo | multiplier ×1.4 |

### Step 4 — Infrastructure
**Title:** ¿Cómo preferís la infraestructura?  
**Sub:** Define si pagás mensual o una sola vez

| Icon | Label | Description | Maps to |
|------|-------|-------------|---------|
| 🛠️ | Giuliano lo gestiona | Setup + mensualidad. Cero dolores de cabeza | model `monthly` |
| 🔑 | Mis propias cuentas | Pago único. El código queda 100% tuyo | model `onetime` |

### Quiz → Feature Table transition
After step 4, the quiz auto-configures checked features and slides to the feature table. The "← Atrás" button from the table returns to the quiz at the last completed step.

**Auto-selection logic from quiz answers:**

```
pages answer  → check that page-tier feature (radio — only one active)
pages = p4|p10 → also check: cms, seo
pages = p1    → check: seo
auth = yes    → check: auth, db, admin, roles
infra answer  → set model (monthly | onetime)
```

---

## Modal — Feature Table Mode

Accessible directly (skips quiz). Opened with `p1` pre-selected (radio group needs a default), all other toggleable features unchecked. Model defaults to `monthly`.

### Layout
- Top: modal title "Tu cotización" + subtitle
- Model toggle tabs: "Mensual (Giuliano gestiona)" / "Pago único (tus cuentas)"
- Feature table (scrollable)
- Sticky bottom bar: total price + currency toggle + CTA button

### Feature Groups & Items

#### Siempre incluido (locked — always checked, can't uncheck)
| Feature | Price |
|---------|-------|
| Deploy en Vercel | inc. |
| SSL / HTTPS gratis | inc. |
| Diseño responsive | inc. |
| Botón WhatsApp flotante | inc. |
| Formulario de contacto | inc. |

#### Páginas del sitio (radio — exactly one must be selected)
| Feature ID | Label | Price (monthly model) |
|------------|-------|----------------------|
| `p1` | 1 página (landing) | $150 |
| `p4` | Hasta 4 páginas | $220 |
| `p10` | Hasta 10 páginas | $350 |

#### Contenido y marketing (toggleable)
| Feature ID | Label | Price |
|------------|-------|-------|
| `cms` | CMS editable | +$80 |
| `blog` | Blog / Noticias | +$80 |
| `seo` | SEO + Google Analytics | +$60 |

#### Backend / Usuarios (toggleable, with dependencies)
| Feature ID | Label | Price | Auto-triggers |
|------------|-------|-------|---------------|
| `auth` | Login / Usuarios | +$200 | checks `db` |
| `admin` | Panel admin protegido | +$150 | checks `auth`, `db` |
| `db` | Base de datos (Supabase) | +$100 | — |
| `roles` | Roles y permisos | +$80 | — |

#### Extras opcionales (toggleable)
| Feature ID | Label | Price |
|------------|-------|-------|
| `maps` | Google Maps integrado | +$30 |
| `multilang` | Multi-idioma (ES + EN) | +$150 |
| `animations` | Animaciones premium | +$60 |
| `gdpr` | Banner GDPR / Cookies | +$40 |

---

## Pricing Logic

### Setup price
```
base = sum of prices for all locked + checked features
if model === 'onetime': base = base × 1.20
if timeline === 'express': base = base × 1.4
setupTotal = Math.round(base)
```

The 1.20× onetime multiplier reflects the additional cost of ownership transfer and infrastructure setup in client accounts.

### Monthly fee (only shown when model = monthly)
```
fee = $20 base hosting
+ $10 if cms or blog is checked
+ $20 if auth is checked
```
Displayed as "desde $X/mes" in the price bar.

### Currency toggle
- Default: detect timezone → Argentina = ARS, else USD
- `localStorage` persists choice as `lp-currency` (shared with existing site toggle)
- ARS = USD × 1400

---

## Modal UI Details

### Progress bar
- 3px height, accent color fill, smooth CSS transition
- Step counter: "X de 4" right-aligned below bar
- `← Atrás` button top-left (hidden on step 1)

### Option rows (quiz steps)
- Full width, dark card style
- Icon in 40×40 rounded square
- Bold label + description text
- Radio indicator right side
- Selected state: green border + green-tinted background + filled radio
- Click auto-advances (300ms delay for visual feedback)

### Feature rows (table)
- 16×16 checkbox left
- Feature name (bold) + description (muted) center
- Price right (green when checked, muted when unchecked)
- Locked rows: dimmed, checkbox shows green check but can't toggle
- Click anywhere on row to toggle

### Sticky price bar
- Sticks to bottom of modal card
- Background matches modal bg (`#0d0d0d`) with top border
- Left: "TOTAL ESTIMADO" label + large price + currency toggle + monthly fee line
- Right: "Consultar este plan →" button (accent bg, dark text)

### Close behavior
- X button top-right (circle style)
- Click outside modal (overlay) also closes
- Escape key closes
- On close: saves `lp-quote-modal-seen` to localStorage

---

## WhatsApp CTA Message

Pre-filled message when "Consultar este plan →" is clicked:

```
Hola Giuliano!
Mi nombre es [Tu Nombre].

Armé esta cotización en la calculadora:

💰 Setup: $[total] [USD/ARS]
📅 [Mensualidad: $X/mes | Sin cargo mensual]

📋 Features seleccionadas:
• [feature 1]
• [feature 2]
...

Modelo: [Mensual / Pago único]
Timeline: [Sin apuro / Express]

Quedo a la espera. ¡Gracias!
```

---

## File Structure

```
src/pages/Landing/
├── index.tsx              ← import QuoteModal, manage quoteOpen state, replace lp__calc block
├── landing.scss           ← remove calculator/comparison table styles, add entry-card styles
├── QuoteModal.tsx         ← new component (quiz + feature table + all logic)
└── quote-modal.scss       ← new styles for modal
```

`QuoteModal` is rendered inside the `.lp` div so it inherits CSS variables (`--accent`, `--card`, `--border`, etc.).

---

## What Gets Removed

- `lp__calc` and all child classes from `landing.scss`
- `lp__pricing-comparison` table styles
- `CALC_BUILD`, `CALC_ONE_TIME`, `CALC_MONTHLY`, `CALC_TIMES`, `calcResult`, `fmtPrice`, `CalcState`, `CALC_INIT` constants/functions from `index.tsx`
- `comparisonOpen` state
- The Tooltip component can stay (reused in QuoteModal if needed)

---

## Out of Scope

- No routing changes (site stays single-page)
- No backend — all pricing is client-side
- No "app-payments" tier (stays disabled/coming soon — can be added later)
- No authentication or form submission (WhatsApp link only)
- Light theme support: QuoteModal inherits CSS vars from parent `.lp` div — works automatically
