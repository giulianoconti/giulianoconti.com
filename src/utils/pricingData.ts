import type { ComponentType } from "react";
import {
  FileIcon,
  LayoutIcon,
  LayersIcon,
  GlobeIcon,
  LockIcon,
  ClockIcon,
  ZapIcon,
  WrenchIcon,
  KeyIcon,
  PenToolIcon,
  MonitorIcon,
} from "../icons";

export interface Feature {
  id: string;
  label: string;
  desc: string;
  price: number;
  group: string;
  locked?: boolean;
  radio?: string;
  triggers?: string[];
}

export interface QuizStep {
  title: string;
  sub: string;
  key: string;
  options: {
    value: string;
    icon: ComponentType<{ className?: string; height?: number; width?: number }>;
    label: string;
    desc: string;
  }[];
}

export const CLOSE_MS = 220;
export const ARS_RATE = 1400;
export const MULTIPLIER_EXPRESS = 1.4;

export const INFRA_COSTS = {
  base: 10, // Vercel hosting + domain (~$18/yr)
  supabase: 20, // Supabase Pro
};

export const MONTHLY_TIERS = [
  { id: "basic", extra: 0 }, // infra only
  { id: "standard", extra: 60 }, // infra + 8h/mo
  { id: "premium", extra: 140 }, // infra + 24h/mo
] as const;
export type TierId = (typeof MONTHLY_TIERS)[number]["id"];

// prettier-ignore
export const FEATURES: Feature[] = [
  { id: "deploy",      label: "", desc: "", price: 0,   group: "base",    locked: true              },
  { id: "ssl",         label: "", desc: "", price: 0,   group: "base",    locked: true              },
  { id: "responsive",  label: "", desc: "", price: 0,   group: "base",    locked: true              },
  { id: "whatsapp",    label: "", desc: "", price: 0,   group: "base",    locked: true              },
  { id: "contact",     label: "", desc: "", price: 0,   group: "base",    locked: true              },
  { id: "p1",          label: "", desc: "", price: 200, group: "paginas", radio: "pages"            },
  { id: "p4",          label: "", desc: "", price: 290, group: "paginas", radio: "pages"            },
  { id: "p10",         label: "", desc: "", price: 420, group: "paginas", radio: "pages"            },
  { id: "auth",        label: "", desc: "", price: 200, group: "backend", triggers: ["db"]          },
  { id: "cms",         label: "", desc: "", price: 180, group: "backend", triggers: ["db"]          },
  { id: "db",          label: "", desc: "", price: 100, group: "backend"                            },
  { id: "roles",       label: "", desc: "", price: 80,  group: "backend", triggers: ["auth", "db"]  },
  { id: "bookings",    label: "", desc: "", price: 200, group: "extras",  triggers: ["db", "auth"]  },
  { id: "seo",         label: "", desc: "", price: 80,  group: "extras"                             },
  { id: "maps",        label: "", desc: "", price: 30,  group: "extras"                             },
  { id: "mercadopago", label: "", desc: "", price: 120, group: "extras"                             },
  { id: "multilang",   label: "", desc: "", price: 150, group: "extras"                             },
  { id: "animations",  label: "", desc: "", price: 80,  group: "extras"                             },
];

// prettier-ignore
export const QUIZ_STEPS_BASE: Omit<QuizStep, "title" | "sub" | "options">[] = [
  { key: "pages" },
  { key: "auth" },
  { key: "cms" },
  { key: "timeline" },
  { key: "infra" },
];

export const QUIZ_STEP_ICONS = [
  [FileIcon, LayoutIcon, LayersIcon],
  [GlobeIcon, LockIcon],
  [MonitorIcon, PenToolIcon],
  [ClockIcon, ZapIcon],
  [WrenchIcon, KeyIcon],
] as const;
