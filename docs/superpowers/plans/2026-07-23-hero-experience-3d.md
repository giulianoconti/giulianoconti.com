# Hero & Experience en 3D Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Llevar el contenido de Hero (nombre, tagline, stats, íconos sociales) y Experience (empresas, proyectos, imágenes, stack) al espacio 3D del `<Scene/>` existente, manteniendo HTML real oculto para SEO/accesibilidad y un fallback visible en `liteMode`.

**Architecture:** `Hero/index.tsx` y `Experience/index.tsx` pasan a ser wrappers HTML (sr-only por defecto, visibles en liteMode). El contenido 3D vive en `Hero/HeroContent.tsx` y `Experience/ExperienceContent.tsx`, montados dentro de `Scene/index.tsx` (`SceneInner`), reusando el `scrollRef` global y el sistema de keyframes (`sampleKF`) ya existente para las spirals.

**Tech Stack:** React 19, `@react-three/fiber`, `@react-three/drei` (`Text`, `Text3D`, `useTexture`), `three`, TypeScript, Sass. Sin test runner en el repo — verificación manual con `npm run dev`.

## Global Constraints

- No se rediseña el fallback visual de liteMode: reusa el HTML/CSS que ya existe hoy en `Hero/styles.scss` y `Experience/styles.scss`.
- El material 3D para texto e íconos reusa el mismo look metálico que las spirals (`useMetalMaterial`), no un material nuevo.
- No se toca el sistema de keyframes de las spirals (`G1`/`G2`/`BG`/`SPHERE`) en `Scene/index.tsx` — solo se agregan grupos nuevos.
- Nunca usar `display: none` para el contenido sr-only — debe seguir siendo legible por lectores de pantalla y crawlers.
- Reusar los datos ya existentes: `useLocale()` (`t.home.*`, `t.experience.*`), el array `EXPERIENCE` (hoy en `Experience/index.tsx`), y las constantes de `utils/constants.ts` (URLs, assets de imagen).

---

## Prerequisito manual (antes de Task 3)

`Text3D` de drei necesita una fuente en formato **typeface JSON** (no `.ttf`). El repo solo tiene `.ttf` en `public/fonts/`. Este paso **no se puede automatizar en el agente** (requiere una herramienta web):

1. Ir a https://gero3.github.io/facetype.js/ (facetype.js — convertidor open source de TTF a typeface JSON, usado oficialmente por three.js/drei).
2. Subir `public/fonts/helveticanowdisplay-medium.ttf`.
3. Descargar el `.json` resultante y guardarlo como `public/fonts/helveticanowdisplay-medium.json`.
4. Confirmar que el archivo pesa unos cientos de KB y arranca con `{"glyphs":`.

Task 3 asume que este archivo ya existe en `public/fonts/helveticanowdisplay-medium.json`.

---

### Task 1: Extraer helpers 3D compartidos de Scene a un módulo reusable

**Files:**

- Create: `src/pages/Home/Scene/shared.ts`
- Modify: `src/pages/Home/Scene/index.tsx:1-115` (importar desde `shared.ts` en vez de definir localmente)

**Interfaces:**

- Produces: `shared.ts` exporta:
  - `type Keyframe = { ts: number[]; vs: number[] }`
  - `lerp(a: number, b: number, t: number): number`
  - `sampleKF(kf: Keyframe, t: number): number`
  - `applyMat(scene: THREE.Object3D, mat: THREE.Material): void`
  - `useMetalMaterial(): THREE.MeshStandardMaterial` (hook, reactivo a `useTheme()`)

- [ ] **Step 1: Crear `shared.ts` con el contenido extraído**

```typescript
// src/pages/Home/Scene/shared.ts
import { useMemo } from "react";
import * as THREE from "three";
import { useTheme } from "../../../contexts/ThemeContext";

export interface Keyframe {
  ts: number[];
  vs: number[];
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function sampleKF(kf: Keyframe, t: number): number {
  const { ts, vs } = kf;
  if (t <= ts[0]) return vs[0];
  if (t >= ts[ts.length - 1]) return vs[vs.length - 1];
  for (let i = 0; i < ts.length - 1; i++) {
    if (t < ts[i + 1]) {
      const s = (t - ts[i]) / (ts[i + 1] - ts[i]);
      return lerp(vs[i], vs[i + 1], s);
    }
  }
  return vs[vs.length - 1];
}

export function applyMat(scene: THREE.Object3D, mat: THREE.Material): void {
  scene.traverse(c => {
    if (c instanceof THREE.Mesh) {
      c.material = mat;
    }
  });
}

export function useMetalMaterial(): THREE.MeshStandardMaterial {
  const { theme } = useTheme();

  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: theme === "dark" ? 0x797979 : 0x555555,
        roughness: theme === "dark" ? 0 : 0.85,
        metalness: theme === "dark" ? 1 : 0,
        side: THREE.DoubleSide,
        envMapIntensity: theme === "dark" ? 1 : 0,
      }),
    [theme],
  );
}
```

- [ ] **Step 2: Actualizar `Scene/index.tsx` para importar desde `shared.ts` y borrar las definiciones locales duplicadas**

En `src/pages/Home/Scene/index.tsx`:

- Borrar las líneas 7-28 (interfaz `Keyframe`, `lerp`, `sampleKF`) y las líneas 74-111 (`applyMat`, `useMetalMaterial`) — ya viven en `shared.ts`.
- Agregar el import al tope del archivo, después de los imports existentes:

```typescript
import { sampleKF, applyMat, useMetalMaterial, type Keyframe } from "./shared";
```

- El resto del archivo (`PrimaryModel`, `SecondaryModel`, `CausticsBackground`, `Sphere`, `SceneInner`, `CameraTilt`, `useScrollProgress`, `ScrollSmoother`, `Scene`) queda igual, solo referenciando los símbolos importados.

- [ ] **Step 3: Verificar que compila y el sitio se ve igual que antes**

Run: `npm run dev`
Expected: sin errores en consola/terminal; abrir `http://localhost:5173`, scrollear — las spirals se mueven exactamente igual que antes del refactor (regresión cero, este task no cambia comportamiento visual).

- [ ] **Step 4: Commit**

```bash
git add src/pages/Home/Scene/shared.ts src/pages/Home/Scene/index.tsx
git commit -m "refactor: extract shared 3D helpers from Scene for reuse in Hero/Experience"
```

---

### Task 2: Utilidad `.sr-only` global + wrapper de Hero (sr-only / liteMode) sin cambiar el 3D todavía

**Files:**

- Modify: `src/index.scss` (agregar clase `.sr-only`)
- Modify: `src/pages/Home/Hero/index.tsx` (envolver el JSX existente con la clase condicional)
- Modify: `src/pages/Home/Hero/styles.scss:1` (asegurar que `.hero` sigue funcionando visible cuando no tiene `.sr-only`)

**Interfaces:**

- Consumes: `useLiteMode()` de `src/contexts/LiteModeContext.tsx` (ya existe, expone `{ liteMode: boolean }`).
- Produces: clase CSS `.sr-only` reusable por `Experience/index.tsx` en Task 6.

- [ ] **Step 1: Agregar `.sr-only` a `src/index.scss`**

Insertar después del bloque `*, *::before, *::after { ... }` (antes del `:root`):

```scss
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

- [ ] **Step 2: Modificar `Hero/index.tsx` para envolver el `<section>` según `liteMode`**

Reemplazar la línea `import "./styles.scss";` por:

```typescript
import { useLiteMode } from "../../../contexts/LiteModeContext";
import "./styles.scss";
```

Y en el `export default function Hero()`, agregar `const { liteMode } = useLiteMode();` junto a la línea existente `const { t } = useLocale();`, y cambiar la línea del `<section>`:

```typescript
<section className={`hero${liteMode ? "" : " sr-only"}`} id="home">
```

(el resto del JSX de `Hero` queda exactamente igual — no se toca nada más del archivo).

- [ ] **Step 3: Verificar en el navegador**

Run: `npm run dev`, abrir `http://localhost:5173`.
Expected:

- Con `liteMode` apagado (default): el Hero visual desaparece de pantalla (el 3D de fondo sigue viéndose igual que siempre — todavía no hay `HeroContent` 3D, eso es Task 3-4), pero inspeccionando el DOM (`document.getElementById("home")`) el texto sigue ahí.
- Activar `liteMode` (toggle existente en la UI, o `localStorage.setItem("liteMode", "true")` + reload): el Hero se ve exactamente igual que antes de este cambio.

- [ ] **Step 4: Commit**

```bash
git add src/index.scss src/pages/Home/Hero/index.tsx
git commit -m "feat: add sr-only utility and liteMode-aware Hero wrapper"
```

---

### Task 3: `HeroContent.tsx` — texto 3D del nombre/tagline/stats

**Files:**

- Create: `src/pages/Home/Hero/HeroContent.tsx`

**Interfaces:**

- Consumes: `sampleKF`, `useMetalMaterial` de `../Scene/shared`; `useLocale()` (`t.home.title`, `t.home.subheader`, `t.home.statYearsLabel`, `t.home.statProjectsLabel`, `t.home.statCurrentLabel`).
- Produces: `export default function HeroContent({ scrollRef }: { scrollRef: RefObject<number> }): JSX.Element` — se monta desde `Scene/index.tsx` en Task 4.

- [ ] **Step 1: Crear el componente**

```typescript
// src/pages/Home/Hero/HeroContent.tsx
import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Text3D } from "@react-three/drei";
import * as THREE from "three";
import { useLocale } from "../../../contexts/LocaleContext";
import { sampleKF, useMetalMaterial, type Keyframe } from "../Scene/shared";

// Hero ocupa el primer tramo del scroll global (0 → 0.15).
// Entra centrado, se aleja/atenúa levemente al empezar a scrollear hacia Experience.
const HERO_KF = {
  opacity: { ts: [0, 0.1, 0.15], vs: [1, 1, 0] } as Keyframe,
  posZ: { ts: [0, 0.15], vs: [0, -2] } as Keyframe,
};

interface HeroContentProps {
  scrollRef: RefObject<number>;
}

export default function HeroContent({ scrollRef }: HeroContentProps) {
  const { t } = useLocale();
  const mat = useMetalMaterial();
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    const sp = scrollRef.current;
    group.current.visible = sp < 0.16;
    if (!group.current.visible) return;
    group.current.position.z = sampleKF(HERO_KF.posZ, sp);
    const op = sampleKF(HERO_KF.opacity, sp);
    group.current.traverse((c) => {
      if (c instanceof THREE.Mesh && c.material instanceof THREE.Material) {
        c.material.transparent = true;
        c.material.opacity = op;
      }
    });
  });

  const stats: [string, string][] = [
    ["+3", t.home.statYearsLabel],
    ["+5", t.home.statProjectsLabel],
    ["Freelance", t.home.statCurrentLabel],
  ];

  return (
    <group ref={group} position={[0, 0.6, 0]}>
      <Text3D font="/fonts/helveticanowdisplay-medium.json" size={0.5} height={0.08} bevelEnabled bevelThickness={0.01} bevelSize={0.01} material={mat} position={[-1.9, 0.6, 0]}>
        {t.home.title}
      </Text3D>
      <Text font="/fonts/helveticanowdisplay-regular.ttf" fontSize={0.22} material={mat} position={[-1.9, 0.05, 0]} anchorX="left" anchorY="top" maxWidth={4}>
        {t.home.subheader}
      </Text>
      {stats.map(([v, l], i) => (
        <group key={l} position={[-1.9 + i * 1.3, -0.7, 0]}>
          <Text font="/fonts/helveticanowdisplay-medium.ttf" fontSize={0.24} material={mat} anchorX="left" anchorY="bottom">
            {v}
          </Text>
          <Text font="/fonts/helveticanowdisplay-regular.ttf" fontSize={0.12} material={mat} anchorX="left" anchorY="top" position={[0, -0.05, 0]} maxWidth={1.1}>
            {l}
          </Text>
        </group>
      ))}
    </group>
  );
}
```

Nota: `Text` de drei acepta directamente archivos `.ttf`/`.woff` (usa `troika-three-text`, no necesita el JSON) — solo `Text3D` necesita el typeface JSON del prerequisito.

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sin errores nuevos relacionados a este archivo (puede haber preexistentes no relacionados; si los hay, ignorarlos, no son parte de este task).

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home/Hero/HeroContent.tsx
git commit -m "feat: add HeroContent 3D component with metallic Text3D headline"
```

---

### Task 4: Montar `HeroContent` en `Scene.tsx`

**Files:**

- Modify: `src/pages/Home/Scene/index.tsx`

**Interfaces:**

- Consumes: `HeroContent` de `../Hero/HeroContent` (Task 3).

- [ ] **Step 1: Importar y montar dentro de `SceneInner`**

Agregar el import junto a los demás imports de `Scene/index.tsx`:

```typescript
import HeroContent from "../Hero/HeroContent";
```

En `SceneInner`, agregar `<HeroContent scrollRef={scrollRef} />` dentro del `<>` que retorna, junto a `<PrimaryModel .../>` etc:

```typescript
function SceneInner({ scrollRef }: SceneInnerProps) {
  const { theme } = useTheme();
  const mat = useMetalMaterial();
  const videoTex = useCausticsTexture();

  return (
    <>
      <Environment files="/assets/studio-small-07-2k-1-.hdr" />
      <fog attach="fog" args={[theme === "dark" ? "#000000" : "#ffffff", 11, 22]} />
      <CausticsBackground tex={videoTex} scrollRef={scrollRef} />
      <HeroContent scrollRef={scrollRef} />
      <PrimaryModel mat={mat} scrollRef={scrollRef} />
      <SecondaryModel mat={mat} scrollRef={scrollRef} />
      <Sphere mat={mat} scrollRef={scrollRef} />
    </>
  );
}
```

- [ ] **Step 2: Verificar en el navegador**

Run: `npm run dev`, abrir `http://localhost:5173` con `liteMode` apagado.
Expected: el nombre "Giuliano Conti" aparece como texto 3D metálico centrado sobre el fondo, con subhead y stats debajo, visible al cargar la página. Al scrollear un poco, el bloque se aleja/desvanece (deja de bloquear la vista de las spirals).

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home/Scene/index.tsx
git commit -m "feat: mount HeroContent inside Scene"
```

---

### Task 5: Íconos sociales como planos texturados clickeables en `HeroContent`

**Files:**

- Create: `src/pages/Home/Scene/svgTexture.ts`
- Modify: `src/pages/Home/Hero/HeroContent.tsx`

**Interfaces:**

- Produces: `svgTexture.ts` exporta `useSvgTexture(svgMarkup: string): THREE.Texture` — hook que rasteriza un string SVG a una `CanvasTexture`, reusable por Task 8 (íconos de stack tech).

- [ ] **Step 1: Crear el hook de rasterizado SVG → textura**

```typescript
// src/pages/Home/Scene/svgTexture.ts
import { useMemo } from "react";
import * as THREE from "three";

const cache = new Map<string, THREE.Texture>();

export function useSvgTexture(svgMarkup: string, size = 128): THREE.Texture {
  return useMemo(() => {
    const cached = cache.get(svgMarkup);
    if (cached) return cached;

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    const img = new Image();
    const blob = new Blob([svgMarkup], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      texture.needsUpdate = true;
      URL.revokeObjectURL(url);
    };
    img.src = url;

    cache.set(svgMarkup, texture);
    return texture;
  }, [svgMarkup, size]);
}
```

- [ ] **Step 2: Agregar los 4 íconos sociales a `HeroContent.tsx` como planos clickeables**

El proyecto tiene los íconos como componentes React (`MailIcon`, etc. en `src/icons/index.tsx`), no como strings SVG crudos — para reusar `useSvgTexture` sin reescribir cada ícono, se renderiza el componente a un string vía `renderToStaticMarkup` (ya disponible en `react-dom/server`, sin instalar nada nuevo).

Agregar a `HeroContent.tsx`, después de los imports existentes:

```typescript
import { renderToStaticMarkup } from "react-dom/server";
import { GithubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from "../../../icons";
import {
  SOCIAL_GITHUB_URL,
  SOCIAL_LINKEDIN_URL,
  SOCIAL_MAIL,
  WA_MSG,
} from "../../../utils/constants";
import { useSvgTexture } from "../Scene/svgTexture";
```

Agregar el subcomponente de ícono clickeable (antes de `export default function HeroContent`):

```typescript
interface SocialIconMeshProps {
  svg: string;
  url: string;
  position: [number, number, number];
}

function SocialIconMesh({ svg, url, position }: SocialIconMeshProps) {
  const tex = useSvgTexture(svg);
  return (
    <mesh
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        window.open(url, "_blank", "noopener,noreferrer");
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      <planeGeometry args={[0.3, 0.3]} />
      <meshBasicMaterial map={tex} transparent />
    </mesh>
  );
}
```

Dentro de `HeroContent`, después de la línea `const stats: ... = [...]`, agregar:

```typescript
  const socials: { svg: string; url: string }[] = [
    { svg: renderToStaticMarkup(<MailIcon />), url: `mailto:${SOCIAL_MAIL}` },
    { svg: renderToStaticMarkup(<WhatsAppIcon />), url: WA_MSG(t.contact.waMsg) },
    { svg: renderToStaticMarkup(<LinkedInIcon />), url: SOCIAL_LINKEDIN_URL },
    { svg: renderToStaticMarkup(<GithubIcon />), url: SOCIAL_GITHUB_URL },
  ];
```

Y en el JSX del `return`, después del `.map` de `stats`, agregar:

```typescript
      {socials.map((s, i) => (
        <SocialIconMesh key={s.url} svg={s.svg} url={s.url} position={[-1.9 + i * 0.45, -1.3, 0]} />
      ))}
```

- [ ] **Step 3: Verificar en el navegador**

Run: `npm run dev`
Expected: 4 íconos aparecen debajo de los stats en el Hero 3D; hover cambia el cursor a pointer; click en cada uno abre el link correspondiente (mail, WhatsApp, LinkedIn, GitHub) en una pestaña nueva.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Home/Scene/svgTexture.ts src/pages/Home/Hero/HeroContent.tsx
git commit -m "feat: add clickable social icons as textured planes in HeroContent"
```

---

### Task 6: Wrapper sr-only / liteMode para Experience (mismo patrón que Task 2)

**Files:**

- Modify: `src/pages/Home/Experience/index.tsx`

**Interfaces:**

- Consumes: `useLiteMode()` (igual que Task 2).

- [ ] **Step 1: Aplicar el mismo patrón que en `Hero/index.tsx`**

Agregar el import:

```typescript
import { useLiteMode } from "../../../contexts/LiteModeContext";
```

Dentro de `export default function Experience()`, agregar `const { liteMode } = useLiteMode();` junto a `const { t } = useLocale();`, y cambiar la línea de apertura de la sección:

```typescript
<section className={`experience${liteMode ? "" : " sr-only"}`} id="experience">
```

El resto del archivo (el array `EXPERIENCE`, el JSX de cards) no cambia.

- [ ] **Step 2: Verificar en el navegador**

Run: `npm run dev`.
Expected: con `liteMode` apagado, la sección Experience desaparece visualmente (queda en el DOM, sr-only); con `liteMode` prendido, se ve exactamente igual que antes de este cambio.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home/Experience/index.tsx
git commit -m "feat: add liteMode-aware Experience wrapper"
```

---

### Task 7: `ExperienceContent.tsx` — entries de empresa/rol en texto 3D

**Files:**

- Create: `src/pages/Home/Experience/ExperienceContent.tsx`

**Interfaces:**

- Consumes: `sampleKF`, `useMetalMaterial` de `../Scene/shared`; `useLocale()` (`t.experience.*`).
- Produces: `export default function ExperienceContent({ scrollRef }: { scrollRef: RefObject<number> }): JSX.Element`, montado en Task 9 junto a `ProjectCard3D` (Task 8).

Este task cubre solo los tres entries de tipo `CompanyEntry` (Freelance, xLabs x2 aparece dos veces en el array original — ver `Experience/index.tsx:50-73`, son 2 entries de compañía: Freelance y xLabs). Los 4 proyectos con imagen van en Task 8 dentro del mismo archivo.

- [ ] **Step 1: Crear el componente con los entries de compañía**

```typescript
// src/pages/Home/Experience/ExperienceContent.tsx
import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useLocale } from "../../../contexts/LocaleContext";
import { sampleKF, useMetalMaterial, type Keyframe } from "../Scene/shared";

// Experience ocupa el segundo tramo del scroll global (0.15 → 0.5).
const EXP_KF = {
  opacity: { ts: [0.15, 0.2, 0.45, 0.5], vs: [0, 1, 1, 0] } as Keyframe,
  posY: { ts: [0.15, 0.2], vs: [1.5, 0] } as Keyframe,
};

interface ExperienceContentProps {
  scrollRef: RefObject<number>;
}

export default function ExperienceContent({ scrollRef }: ExperienceContentProps) {
  const { t } = useLocale();
  const mat = useMetalMaterial();
  const group = useRef<THREE.Group>(null);

  const companies: { company: string; role: string; dates: string }[] = [
    { company: t.experience.freelanceCompany, role: t.experience.freelancerJobRole, dates: t.experience.freelancerJobDate },
    { company: t.experience.xlabsCompany, role: t.experience.xlabsRole, dates: t.experience.xlabsDate },
  ];

  useFrame(() => {
    if (!group.current) return;
    const sp = scrollRef.current;
    group.current.visible = sp > 0.14 && sp < 0.51;
    if (!group.current.visible) return;
    group.current.position.y = sampleKF(EXP_KF.posY, sp);
    const op = sampleKF(EXP_KF.opacity, sp);
    group.current.traverse((c) => {
      if (c instanceof THREE.Mesh && c.material instanceof THREE.Material) {
        c.material.transparent = true;
        c.material.opacity = op;
      }
    });
  });

  return (
    <group ref={group} position={[-2.5, 1.2, -1]}>
      <Text font="/fonts/helveticanowdisplay-medium.ttf" fontSize={0.35} material={mat} anchorX="left" anchorY="top">
        {t.experience.jobTitle}
      </Text>
      {companies.map((c, i) => (
        <group key={c.company} position={[0, -0.7 - i * 0.9, 0]}>
          <Text font="/fonts/helveticanowdisplay-medium.ttf" fontSize={0.22} material={mat} anchorX="left" anchorY="top">
            {c.company}
          </Text>
          <Text font="/fonts/helveticanowdisplay-regular.ttf" fontSize={0.15} material={mat} anchorX="left" anchorY="top" position={[0, -0.28, 0]}>
            {c.role}
          </Text>
          <Text font="/fonts/helveticanowdisplay-regular.ttf" fontSize={0.13} material={mat} anchorX="left" anchorY="top" position={[0, -0.5, 0]}>
            {c.dates}
          </Text>
        </group>
      ))}
    </group>
  );
}
```

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sin errores nuevos en este archivo.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home/Experience/ExperienceContent.tsx
git commit -m "feat: add ExperienceContent 3D component with company entries"
```

---

### Task 8: Cards de proyecto con imagen texturada + stack tech en `ExperienceContent`

**Files:**

- Modify: `src/pages/Home/Experience/ExperienceContent.tsx`

**Interfaces:**

- Consumes: `useSvgTexture` de `../Scene/svgTexture` (Task 5); `EXPERIENCE_CLINIS_ASSET`, `EXPERIENCE_WORMHOLESCAN_ASSET`, `EXPERIENCE_PORTAL_ASSET`, `EXPERIENCE_XLABS_ASSET`, `CLINIS_WEBSITE_URL`, `WORMHOLESCAN_WEBSITE_URL`, `PORTAL_WEBSITE_URL`, `XLABS_WEBSITE_URL` de `../../../utils/constants`.

- [ ] **Step 1: Agregar el subcomponente `ProjectCard3D`**

Agregar imports al tope de `ExperienceContent.tsx`:

```typescript
import { useTexture } from "@react-three/drei";
import {
  CLINIS_WEBSITE_URL,
  EXPERIENCE_CLINIS_ASSET,
  EXPERIENCE_PORTAL_ASSET,
  EXPERIENCE_WORMHOLESCAN_ASSET,
  EXPERIENCE_XLABS_ASSET,
  PORTAL_WEBSITE_URL,
  WORMHOLESCAN_WEBSITE_URL,
  XLABS_WEBSITE_URL,
} from "../../../utils/constants";
```

Agregar antes de `export default function ExperienceContent`:

```typescript
interface ProjectCard3DProps {
  name: string;
  desc: string;
  image: string;
  link: string;
  position: [number, number, number];
  mat: THREE.MeshStandardMaterial;
}

function ProjectCard3D({ name, desc, image, link, position, mat }: ProjectCard3DProps) {
  const tex = useTexture(image);

  return (
    <group position={position}>
      <mesh
        position={[0, 0.6, 0]}
        onClick={(e) => {
          e.stopPropagation();
          window.open(link, "_blank", "noopener,noreferrer");
        }}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      >
        <planeGeometry args={[1.6, 0.9]} />
        <meshBasicMaterial map={tex} />
      </mesh>
      <Text font="/fonts/helveticanowdisplay-medium.ttf" fontSize={0.16} material={mat} anchorX="left" anchorY="top" position={[-0.8, 0.05, 0]}>
        {name}
      </Text>
      <Text font="/fonts/helveticanowdisplay-regular.ttf" fontSize={0.1} material={mat} anchorX="left" anchorY="top" maxWidth={1.6} position={[-0.8, -0.15, 0]}>
        {desc}
      </Text>
    </group>
  );
}
```

- [ ] **Step 2: Montar los 4 proyectos dentro de `ExperienceContent`**

Dentro de `export default function ExperienceContent`, después del array `companies`, agregar:

```typescript
const projects: { name: string; desc: string; image: string; link: string }[] = [
  {
    name: t.experience.clinis,
    desc: t.experience.clinisDesc,
    image: EXPERIENCE_CLINIS_ASSET,
    link: CLINIS_WEBSITE_URL,
  },
  {
    name: t.experience.wormholescan,
    desc: t.experience.wormholescanDesc,
    image: EXPERIENCE_WORMHOLESCAN_ASSET,
    link: WORMHOLESCAN_WEBSITE_URL,
  },
  {
    name: t.experience.portal,
    desc: t.experience.portalDesc,
    image: EXPERIENCE_PORTAL_ASSET,
    link: PORTAL_WEBSITE_URL,
  },
  {
    name: t.experience.xlabsCompany,
    desc: t.experience.xlabsDesc,
    image: EXPERIENCE_XLABS_ASSET,
    link: XLABS_WEBSITE_URL,
  },
];
```

Y en el JSX del `return`, después del `.map` de `companies`, agregar:

```typescript
      {projects.map((p, i) => (
        <ProjectCard3D key={p.link} name={p.name} desc={p.desc} image={p.image} link={p.link} mat={mat} position={[2.4, 0.5 - i * 1.1, 0]} />
      ))}
```

- [ ] **Step 3: Montar `ExperienceContent` en `Scene.tsx`**

En `src/pages/Home/Scene/index.tsx`, agregar el import:

```typescript
import ExperienceContent from "../Experience/ExperienceContent";
```

Y en `SceneInner`, junto al `<HeroContent .../>` ya agregado en Task 4:

```typescript
      <HeroContent scrollRef={scrollRef} />
      <ExperienceContent scrollRef={scrollRef} />
```

- [ ] **Step 4: Verificar en el navegador**

Run: `npm run dev`, scrollear desde el top hasta pasar el 50% de la página.
Expected: al pasar el Hero, aparecen los entries de compañía (Freelance, xLabs) y las 4 cards de proyecto con su imagen, texto y descripción en 3D; click en cada imagen abre el link del proyecto correspondiente; sigue viéndose la spiral secundaria (G2) sin romperse.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Home/Experience/ExperienceContent.tsx src/pages/Home/Scene/index.tsx
git commit -m "feat: add clickable project cards with textured images to ExperienceContent"
```

---

### Task 9: Íconos de stack tech en las cards de proyecto

**Files:**

- Modify: `src/pages/Home/Experience/ExperienceContent.tsx`

**Interfaces:**

- Consumes: `useSvgTexture` de `../Scene/svgTexture` (Task 5); íconos `ReactIcon`, `TypeScriptIcon`, `SupabaseIcon`, `SassIcon`, `MotionIcon`, `AvalancheIcon`, `SolanaIcon`, `NextJSIcon`, `MonadIcon` de `../../../icons`.

- [ ] **Step 1: Agregar los íconos de stack a cada `ProjectCard3D`**

Agregar imports:

```typescript
import { renderToStaticMarkup } from "react-dom/server";
import {
  AvalancheIcon,
  MonadIcon,
  MotionIcon,
  NextJSIcon,
  ReactIcon,
  SassIcon,
  SolanaIcon,
  SupabaseIcon,
  TypeScriptIcon,
} from "../../../icons";
import { useSvgTexture } from "../Scene/svgTexture";
```

Modificar `ProjectCard3DProps` para aceptar `techSvgs: string[]`, y en el componente agregar debajo de la descripción:

```typescript
interface ProjectCard3DProps {
  name: string;
  desc: string;
  image: string;
  link: string;
  position: [number, number, number];
  mat: THREE.MeshStandardMaterial;
  techSvgs: string[];
}

function TechIcon({ svg, position }: { svg: string; position: [number, number, number] }) {
  const tex = useSvgTexture(svg, 64);
  return (
    <mesh position={position}>
      <planeGeometry args={[0.16, 0.16]} />
      <meshBasicMaterial map={tex} transparent />
    </mesh>
  );
}

function ProjectCard3D({ name, desc, image, link, position, mat, techSvgs }: ProjectCard3DProps) {
  const tex = useTexture(image);

  return (
    <group position={position}>
      <mesh
        position={[0, 0.6, 0]}
        onClick={(e) => {
          e.stopPropagation();
          window.open(link, "_blank", "noopener,noreferrer");
        }}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      >
        <planeGeometry args={[1.6, 0.9]} />
        <meshBasicMaterial map={tex} />
      </mesh>
      <Text font="/fonts/helveticanowdisplay-medium.ttf" fontSize={0.16} material={mat} anchorX="left" anchorY="top" position={[-0.8, 0.05, 0]}>
        {name}
      </Text>
      <Text font="/fonts/helveticanowdisplay-regular.ttf" fontSize={0.1} material={mat} anchorX="left" anchorY="top" maxWidth={1.6} position={[-0.8, -0.15, 0]}>
        {desc}
      </Text>
      {techSvgs.map((svg, i) => (
        <TechIcon key={i} svg={svg} position={[-0.8 + i * 0.2, -0.35, 0]} />
      ))}
    </group>
  );
}
```

- [ ] **Step 2: Pasar `techSvgs` desde `ExperienceContent` a cada card**

Modificar el array `projects` para incluir los íconos ya rasterizados:

```typescript
  const projects: { name: string; desc: string; image: string; link: string; techSvgs: string[] }[] = [
    { name: t.experience.clinis, desc: t.experience.clinisDesc, image: EXPERIENCE_CLINIS_ASSET, link: CLINIS_WEBSITE_URL, techSvgs: [ReactIcon, TypeScriptIcon, SupabaseIcon, SassIcon, MotionIcon].map((I) => renderToStaticMarkup(<I />)) },
    { name: t.experience.wormholescan, desc: t.experience.wormholescanDesc, image: EXPERIENCE_WORMHOLESCAN_ASSET, link: WORMHOLESCAN_WEBSITE_URL, techSvgs: [ReactIcon, TypeScriptIcon, SassIcon, AvalancheIcon].map((I) => renderToStaticMarkup(<I />)) },
    { name: t.experience.portal, desc: t.experience.portalDesc, image: EXPERIENCE_PORTAL_ASSET, link: PORTAL_WEBSITE_URL, techSvgs: [ReactIcon, TypeScriptIcon, SassIcon, SolanaIcon].map((I) => renderToStaticMarkup(<I />)) },
    { name: t.experience.xlabsCompany, desc: t.experience.xlabsDesc, image: EXPERIENCE_XLABS_ASSET, link: XLABS_WEBSITE_URL, techSvgs: [NextJSIcon, TypeScriptIcon, SassIcon, MonadIcon, MotionIcon].map((I) => renderToStaticMarkup(<I />)) },
  ];
```

Y actualizar el `.map` de proyectos para pasar la prop:

```typescript
      {projects.map((p, i) => (
        <ProjectCard3D key={p.link} name={p.name} desc={p.desc} image={p.image} link={p.link} mat={mat} techSvgs={p.techSvgs} position={[2.4, 0.5 - i * 1.1, 0]} />
      ))}
```

- [ ] **Step 3: Verificar en el navegador**

Run: `npm run dev`, scrollear a la sección de Experience.
Expected: cada card de proyecto muestra sus íconos de stack tech (React, TypeScript, etc.) como pequeños planos debajo de la descripción, mismos íconos que mostraba la versión HTML original.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Home/Experience/ExperienceContent.tsx
git commit -m "feat: add tech stack icons to project cards"
```

---

### Task 10: Verificación final end-to-end

**Files:** ninguno (solo verificación manual, sin cambios de código).

- [ ] **Step 1: Chequeo visual completo con liteMode apagado**

Run: `npm run dev`, abrir `http://localhost:5173`.
Expected: Hero 3D visible al cargar (nombre, subhead, stats, 4 íconos sociales clickeables); al scrollear, Hero se desvanece, aparece Experience 3D (entries de compañía + 4 project cards con imagen, texto, íconos tech); las spirals (G1/G2) siguen animando igual que en el sitio original; toggle de tema (dark/light) cambia el material metálico de todo el texto/íconos nuevo, no solo de las spirals.

- [ ] **Step 2: Chequeo de liteMode**

Activar el toggle de `liteMode` en la UI.
Expected: Canvas 3D no se monta (comportamiento ya existente de `Home/index.tsx:80`), Hero y Experience se ven como HTML normal con el diseño original (`styles.scss` de cada carpeta), scroll normal de página sin Lenis smooth-scroll interfiriendo con contenido crítico.

- [ ] **Step 3: Chequeo de accesibilidad/SEO**

Con `liteMode` apagado, abrir DevTools → Elements, inspeccionar `#home` y `#experience`.
Expected: ambos `<section>` están en el DOM con todo el texto real (nombre, bio, stats, cada proyecto con su descripción) y clase `sr-only` aplicada (no `display:none`). Con un lector de pantalla (VoiceOver/NVDA) o `view-source:`, el contenido es legible.

- [ ] **Step 4: Chequeo de performance**

Chrome DevTools → Performance, grabar mientras se scrollea toda la página.
Expected: FPS se mantiene razonablemente estable (no hay caídas sostenidas por debajo de ~30fps); si las hay, anotar qué mesh/texture las causa para un task de optimización futuro (fuera de este plan).

- [ ] **Step 5: Commit final (si hubo ajustes menores durante la verificación)**

```bash
git add -A
git commit -m "chore: final adjustments after end-to-end verification of Hero/Experience 3D"
```
