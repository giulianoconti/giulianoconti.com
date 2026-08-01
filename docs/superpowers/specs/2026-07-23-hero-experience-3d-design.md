# Hero & Experience en 3D — Design

## Contexto

El sitio ya tiene un `<Scene/>` global (fondo fijo, WebGL) con dos modelos GLTF (spirals) animados por scroll vía sistema de keyframes (`sampleKF`, grupos `G1`/`G2`), material metálico (`useMetalMaterial`, reactivo a `ThemeContext`), y niebla/fondo con video de caustics. `Hero` y `Experience` hoy son secciones HTML puras superpuestas al Canvas.

Objetivo: llevar el **contenido** de Hero (nombre, tagline, stats, íconos sociales) y Experience (empresas, proyectos, imágenes, stack tech) al espacio 3D, integrado con la cámara/scroll ya existente — no solo el fondo, sino la info misma.

## Alcance

- Cubre únicamente `Hero` y `Experience` (Process, Pricing, FAQ quedan fuera, ya están comentados en `Home/index.tsx`).
- No se toca el sistema de keyframes existente de las spirals (G1/G2/BG/SPHERE) — se agregan grupos nuevos siguiendo el mismo patrón.

## Arquitectura

Componentes 3D por sección, orquestados por `Scene.tsx` (no un Canvas nuevo por sección, no todo metido directo en `Scene.tsx`).

```
Hero/
  index.tsx              → wrapper: contenido HTML real (sr-only u visible en liteMode)
  HeroContent.tsx         → grupo 3D montado dentro de Scene: nombre, subhead, stats, íconos sociales
  styles.scss             → estilos del fallback/sr-only

Experience/
  index.tsx               → wrapper: contenido HTML real (sr-only u visible en liteMode)
  ExperienceContent.tsx   → grupo 3D: entries de empresa/rol, cards de proyecto (texto + imagen + stack)
  styles.scss
```

`Scene.tsx` importa `HeroContent` y `ExperienceContent` y los monta en `SceneInner` junto a `PrimaryModel` / `SecondaryModel`, pasándoles el mismo `scrollRef` global (0→1). Cada componente mapea internamente su rango de scroll (ej. Hero ≈ 0→0.15, Experience ≈ 0.15→0.5) a sus propios keyframes, reusando `sampleKF`.

Se descartan: (a) meter todo en `Scene.tsx` directo — ya tiene ~370 líneas, se vuelve inmanejable; (b) un `<Canvas>` por sección — rompe la cámara continua que ya recorre toda la página.

## Contenido y materiales

- **Headline/nombre** (pocas palabras): `Text3D` de `@react-three/drei` — geometría extruida real con bevel, usa `useMetalMaterial()` (mismo material que las spirals) para que el reflejo/profundidad se note.
- **Subhead, bio, descripciones de proyecto, stats** (texto largo): `Text` de drei (SDF, geometría plana) con el mismo `MeshStandardMaterial` metálico. Extruir párrafos enteros con `Text3D` es demasiado costoso en geometría sin ganancia de legibilidad.
- **Imágenes de proyecto** (Clinis, Wormholescan, Portal, xLabs): planos (`planeGeometry` + `meshBasicMaterial`) con `useTexture` de drei, reusando los assets ya existentes (`EXPERIENCE_*_ASSET`). Click con raycasting (`onClick`, `stopPropagation()`) abre el link del proyecto, igual que hoy.
- **Íconos** (sociales: mail/WhatsApp/LinkedIn/GitHub; stack tech: React/TS/Next.js/etc.): SVG existentes rasterizados a textura, aplicados sobre planos pequeños en la escena. Reusa los assets de `icons/index.tsx` sin rehacer cada ícono como geometría 3D a mano.

## Accesibilidad y SEO

Los wrappers `Hero/index.tsx` y `Experience/index.tsx` siguen renderizando el contenido real en HTML (mismo texto/datos que ya usan hoy — `t.home.*`, array `EXPERIENCE`), pero:

- Por defecto, oculto visualmente vía clase `sr-only` (`position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0,0,0,0)` — nunca `display:none`), para que lectores de pantalla y crawlers de buscadores lo sigan leyendo aunque visualmente todo pase por WebGL.
- Los links (proyecto, redes sociales) quedan como `<a href>` reales dentro de ese bloque, navegables por teclado.

## LiteMode (fallback)

`LiteModeContext` ya existe y hoy apaga `<Scene/>` completo. Se extiende el mismo criterio:

- Si `liteMode` es `true`: el wrapper de Hero/Experience saca la clase `sr-only` y muestra ese mismo contenido HTML **visible**, reusando el diseño/CSS que ya existe hoy en `styles.scss` (no se rediseña nada nuevo para este caso).
- `HeroContent` / `ExperienceContent` (3D) solo se montan si `!liteMode`, igual que `<Scene/>` ya hace.

## Performance

- `Text3D` extruido limitado a headline/nombre (1-2 palabras) — costo de geometría acotado.
- Texturas de imágenes/íconos cacheadas vía `useTexture`, dentro de `Suspense` (mismo patrón que ya usa `lazy(() => import("./Scene"))` en `Home/index.tsx`).
- Raycasting solo en meshes clickeables (imágenes de proyecto, íconos con link), no en texto plano.

## Error handling

- Fuente tipográfica para `Text3D` (typeface JSON) en `/public/fonts/`, precargada con `Font.preload()`. Si falla la carga, el `Suspense` ya existente en `Home/index.tsx` cubre sin romper la página.
- `useTexture` dentro de `Suspense`; si un asset falla, no crashea el Canvas completo (drei loguea warning, el plano queda con textura vacía en vez de tirar la escena).
- Click en mesh superpuesto: `stopPropagation()` en el evento de puntero para evitar que dos meshes solapados disparen el mismo click.

## Testing (manual — no hay test suite en el repo)

- Con `liteMode` off: Hero y Experience se ven en 3D, integrados al scroll, sin romper el timing de G1/G2 existentes.
- Con `liteMode` on (o simulando dispositivo flojo): se ve el HTML normal de siempre, sin Canvas para estas secciones.
- Inspección de accesibilidad: el bloque sr-only está en el DOM, es legible por lector de pantalla/crawler.
- Click en imágenes de proyecto e íconos sociales abre el link correcto.
- Revisión de FPS en scroll (Chrome DevTools) dado el agregado de texto extruido + texturas sobre una escena ya pesada.
