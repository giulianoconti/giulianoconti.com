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

export const CLOSE_MS = 220;
export const ARS_RATE = 1500;

// prettier-ignore
export const FEATURES: Feature[] = [
  { id: "deploy",      label: "", desc: "", price: 0,   group: "base",    locked: true              },
  { id: "ssl",         label: "", desc: "", price: 0,   group: "base",    locked: true              },
  { id: "responsive",  label: "", desc: "", price: 0,   group: "base",    locked: true              },
  { id: "whatsapp",    label: "", desc: "", price: 0,   group: "base",    locked: true              },
  { id: "p1",          label: "", desc: "", price: 200, group: "paginas", radio: "pages"            },
  { id: "p4",          label: "", desc: "", price: 300, group: "paginas", radio: "pages"            },
  { id: "p10",         label: "", desc: "", price: 450, group: "paginas", radio: "pages"            },
  { id: "auth",        label: "", desc: "", price: 200, group: "backend", triggers: ["db"]          },
  { id: "cms",         label: "", desc: "", price: 200, group: "backend", triggers: ["db"]          },
  { id: "db",          label: "", desc: "", price: 100, group: "backend"                            },
  { id: "roles",       label: "", desc: "", price: 100,  group: "backend", triggers: ["auth", "db"] },
  { id: "bookings",    label: "", desc: "", price: 200, group: "extras",  triggers: ["db", "auth"]  },
  { id: "seo",         label: "", desc: "", price: 100,  group: "extras"                            },
  { id: "multilang",   label: "", desc: "", price: 150, group: "extras"                             },
  { id: "animations",  label: "", desc: "", price: 100,  group: "extras"                            },
];
