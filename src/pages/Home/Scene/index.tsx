import { useRef, useMemo, useEffect, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Environment } from "@react-three/drei";
import * as THREE from "three";

// ── Keyframe helpers ──────────────────────────────────────────────────
interface Keyframe {
  ts: number[];
  vs: number[];
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function sampleKF(kf: Keyframe, t: number): number {
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

// ── GROUP 1 — espiral primaria (spiral-shape-v3) ──────────────────────
// Empieza cerca de cámara, centrada. Sale por la derecha al scrollear.
const PI2 = Math.PI / 2; // 90° in radians
const G1 = {
  // scroll:   START G1_MID G1_END
  posX: { ts: [0, 0.25, 0.35], vs: [ 0,    2,     5 ] },
  posY: { ts: [0, 0.25, 0.35], vs: [-1.4,  0,     0 ] },
  posZ: { ts: [0, 0.25, 0.35], vs: [ 4.2,  5,     5 ] },
  rotY: { ts: [0, 0.25, 0.35], vs: [ PI2, -PI2,  -1 ] },
  // scl:  { ts: [0, 0.1, 0.2], vs: [ 2,    3,   3 ] },
};

// ── GROUP 2 — espiral secundaria (spiral-staight-v2) ─────────────────
// Entra desde detrás de la niebla (posZ=-20), llega al centro,
// luego en el footer se vuelca 90° y se agranda hasta llenar la pantalla como túnel.
const G2 = {
  posZ: { ts: [0.2, 0.3, 0.45, 0.85, 0.851, 0.851001, 0.98], vs: [-20, -14, 0.7, -14, -20, -80,  0.7 ]},
  rotX: { ts: [0.2, 0.3, 0.45, 0.85, 0.851, 0.851001, 0.98], vs: [  0,   0, 0,    0,   0,   PI2, PI2 ]},
  rotY: { ts: [0.2, 0.3, 0.45, 0.85, 0.851, 0.851001, 0.98], vs: [  0,   0, 3,    6,   3,   3,   3   ]},
  scl:  { ts: [0.2, 0.3, 0.45, 0.85, 0.851, 0.851001, 0.98], vs: [  6,   6, 2,    6,   9,   40,  5   ]},
};


// ── Fondo — plano con video de caustics ───────────────────────────────
// Se aleja rápido de la cámara cuando G1 sale de pantalla.
const BG = {
  posZ: { ts: [0, 0.2, 0.3], vs: [-10, -10, -20] },
  sclX: { ts: [0, 0.2, 0.3], vs: [ 27,  27,  40] },
  sclY: { ts: [0, 0.2, 0.3], vs: [ 15,  15,  23] },
  sclZ: { ts: [0, 0.2, 0.3], vs: [ 15,  15,  23] },
};

// ── Background color ──────────────────────────────────────────────────
const BG_COL = {
  r: { ts: [0, 0.45, 0.5], vs: [0.18, 0.5, 0] },
  g: { ts: [0, 0.45, 0.5], vs: [0.15, 0.5, 0] },
  b: { ts: [0, 0.45, 0.5], vs: [0.12, 0.5, 0] },
};

// ── Esfera metálica ───────────────────────────────────────────────────
const SPHERE = {
  posZ: { ts: [0.85, 0.98], vs: [-14, -5] },
};

// ── Apply metal material to all meshes in GLTF ────────────────────────
function applyMat(scene: THREE.Object3D, mat: THREE.Material): void {
  scene.traverse((c) => {
    if (c instanceof THREE.Mesh) {
      c.material = mat;
    }
  });
}

// ── Caustics video texture ────────────────────────────────────────────
function useCausticsTexture(): THREE.VideoTexture {
  return useMemo(() => {
    const vid = document.createElement("video");
    vid.src = "/assets/video-caustics-2-480p.mp4";
    vid.loop = true;
    vid.muted = true;
    vid.playsInline = true;
    vid.autoplay = true;
    vid.play().catch(() => {});
    const tex = new THREE.VideoTexture(vid);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

// ── Metal material ────────────────────────────────────────────────────
// env map comes from <Environment> in the scene (HDR via scene.environment)
function useMetalMaterial(): THREE.MeshStandardMaterial {
  return useMemo(() => new THREE.MeshStandardMaterial({
    color: 0x797979,
    roughness: 0,
    metalness: 1,
    side: THREE.DoubleSide,
    envMapIntensity: 1,
  }), []);
}

// ── Primary model ─────────────────────────────────────────────────────
interface ModelProps {
  mat: THREE.MeshStandardMaterial;
  scrollRef: RefObject<number>;
}

function PrimaryModel({ mat, scrollRef }: ModelProps) {
  const { scene, animations } = useGLTF("/model/spiral-shape-v3-optimize.glb");
  const { actions } = useAnimations(animations, scene);
  const g = useRef<THREE.Group>(null);

  useEffect(() => {
    applyMat(scene, mat);
    scene.scale.setScalar(1.0323);
    scene.rotation.set(-Math.PI, 0, -Math.PI);
    Object.values(actions).forEach((a) => {
      a!.timeScale = 0.6;
      a!.play();
    });
  }, [scene, actions, mat]);

  useFrame(() => {
    if (!g.current) return;
    const sp = scrollRef.current;
    // Hide when G2 takes over (scroll > 20.1%)
    g.current.visible = sp < 0.5;
    if (!g.current.visible) return;

    g.current.position.x = sampleKF(G1.posX, sp);
    g.current.position.y = sampleKF(G1.posY, sp);
    g.current.position.z = sampleKF(G1.posZ, sp);
    g.current.rotation.y = sampleKF(G1.rotY, sp);
    // g.current.scale.setScalar(sampleKF(G1.scl, sp));
  });

  return (
    <group ref={g} position={[0.03, -1, 3]} rotation={[0, 1.7, 0]} scale={1.5}>
      <primitive object={scene} />
    </group>
  );
}

// ── Secondary model (static, fogged out behind G1) ───────────────────
function SecondaryModel({ mat, scrollRef }: ModelProps) {
  const { scene, animations } = useGLTF("/model/spiral-staight-v2-optimize.glb");
  const { actions } = useAnimations(animations, scene);
  const g = useRef<THREE.Group>(null);

  useEffect(() => {
    applyMat(scene, mat);
    scene.scale.setScalar(1.0317);
    scene.position.set(0, -1.944, 0);
    Object.values(actions).forEach((a) => {
      a!.timeScale = 0.8;
      a!.play();
    });
  }, [scene, actions, mat]);

  useFrame(() => {
    if (!g.current) return;
    const sp = scrollRef.current;
    g.current.position.x  =   0;
    g.current.position.y  =   0;
    g.current.position.z  =   sampleKF(G2.posZ, sp);
    g.current.rotation.x  =   sampleKF(G2.rotX, sp);
    g.current.rotation.y  =   sampleKF(G2.rotY, sp);
    g.current.scale.setScalar(sampleKF(G2.scl , sp));
  });

  return (
    <group ref={g} position={[0, -2, 0]} scale={1}>
      <primitive object={scene} />
    </group>
  );
}

// ── Background plane with caustics video ─────────────────────────────
interface BackgroundProps {
  tex: THREE.VideoTexture;
  scrollRef: RefObject<number>;
}

function CausticsBackground({ tex, scrollRef }: BackgroundProps) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const sp = scrollRef.current;
    if (matRef.current) {
      matRef.current.color.setRGB(
        sampleKF(BG_COL.r, sp),
        sampleKF(BG_COL.g, sp),
        sampleKF(BG_COL.b, sp),
      );
    }
    if (meshRef.current) {
      // Before first BG keyframe, stay at base z
      meshRef.current.position.z = sp < BG.posZ.ts[0] ? -10 : sampleKF(BG.posZ, sp);

      meshRef.current.scale.set(
        sampleKF(BG.sclX, sp),
        sampleKF(BG.sclY, sp),
        sampleKF(BG.sclZ, sp),
      );
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]}>
      <planeGeometry args={[27, 15]} />
      <meshStandardMaterial
        ref={matRef}
        map={tex}
        roughness={0.8}
        metalness={0}
        side={THREE.FrontSide}
        toneMapped={false}
      />
    </mesh>
  );
}

// ── Metallic sphere (rises from below into footer view) ───────────────
interface SphereProps {
  scrollRef: RefObject<number>;
}

function Sphere({ scrollRef }: SphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    const sp = scrollRef.current;
    meshRef.current.position.x = 0;
    meshRef.current.position.y = 0;
    meshRef.current.position.z = sampleKF(SPHERE.posZ, sp);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshPhysicalMaterial
        color={0x8d8d8d}
        roughness={0.5}
        metalness={1}
        sheen={1}
        sheenRoughness={0.3}
        sheenColor="#ffffff"
        envMapIntensity={0.2}
      />
    </mesh>
  );
}

// ── Inner scene (has gl + scene access) ───────────────────────────────
interface SceneInnerProps {
  scrollRef: RefObject<number>;
}

function SceneInner({ scrollRef }: SceneInnerProps) {
  const mat = useMetalMaterial();
  const videoTex = useCausticsTexture();

  return (
    <>
      <Environment files="/assets/studio-small-07-2k-1-.hdr" />
      <fog attach="fog" args={["#000000", 11, 22]} />
      <CausticsBackground tex={videoTex} scrollRef={scrollRef} />
      <PrimaryModel mat={mat} scrollRef={scrollRef} />
      <SecondaryModel mat={mat} scrollRef={scrollRef} />
      <Sphere scrollRef={scrollRef} />
    </>
  );
}

// ── Camera tilt (follows mouse, max 1°) ──────────────────────────────
// Matches the real site's TILT control: maxRotation x/y = 0.0175 rad (1°)
function CameraTilt() {
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const MAX = 0.01745; // 1° in radians

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  useFrame(({ camera }, dt) => {
    const k = 1 - Math.exp(-dt / 0.15); // ~0.6s easing
    camera.rotation.y += (mouse.current.x * MAX - camera.rotation.y) * k;
    camera.rotation.x += (-mouse.current.y * MAX - camera.rotation.x) * k;
  });
  return null;
}

// ── Scroll tracker ────────────────────────────────────────────────────
function useScrollProgress() {
  const scrollRef = useRef(0);
  const targetRef = useRef(0);
  useEffect(() => {
    const fn = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      targetRef.current = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return { scrollRef, targetRef };
}

interface ScrollSmootherProps {
  scrollRef: RefObject<number>;
  targetRef: RefObject<number>;
}

function ScrollSmoother({ scrollRef, targetRef }: ScrollSmootherProps) {
  useFrame(() => {
    scrollRef.current += (targetRef.current - scrollRef.current) * 0.06;
  });
  return null;
}


// ── Public component ──────────────────────────────────────────────────
export default function Scene() {
  const { scrollRef, targetRef } = useScrollProgress();

  return (
    <Canvas
      camera={{ fov: 30, position: [0, -0.2, 8.4], near: 0.1, far: 1000 }}
      gl={{
        alpha: false,
        antialias: true,
        outputColorSpace: THREE.SRGBColorSpace,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.4,
      }}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    >
      <ScrollSmoother scrollRef={scrollRef} targetRef={targetRef} />
      <CameraTilt />
      <SceneInner scrollRef={scrollRef} />
    </Canvas>
  );
}

useGLTF.preload("/model/spiral-shape-v3-optimize.glb");
useGLTF.preload("/model/spiral-staight-v2-optimize.glb");
