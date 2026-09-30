type FaqItem = { title: string; text: string };
export type FaqAnswer = string | { items: FaqItem[] };

export const FAQS: Record<"en" | "es" | "pt", { q: string; a: FaqAnswer }[]> = {
  es: [
    {
      q: "¿Cómo trabajás?",
      a: "Trabajo por proyecto con pago único, sin mensualidades. Te entrego todo en tus propias cuentas (Vercel, GitHub, Supabase, dominio) y sos dueño absoluto del código, la infra y los accesos desde el día uno.",
    },
    {
      q: "¿Cuánto tarda un proyecto?",
      a: {
        items: [
          {
            title: "Landing",
            text: "Una sola sección o página de presentación. Entrega en 3–5 días hábiles.",
          },
          {
            title: "Hasta 4 páginas",
            text: "Sitio con varias secciones, blog o CMS incluido. Entrega en 1–2 semanas.",
          },
          {
            title: "Hasta 10 páginas",
            text: "App web completa con login, panel admin y base de datos. Entrega en 2–3 semanas.",
          },
        ],
      },
    },
    {
      q: "¿Cómo se hace el pago?",
      a: "50% adelantado para arrancar, 50% al momento de la entrega. Acepto USD (crypto USDT/USDC) y ARS (Mercadopago o transferencia).",
    },
    {
      q: "¿Puedo pedirte cambios después de la entrega?",
      a: "Sí. El proyecto incluye rondas de revisión antes del cierre y 14 días de garantía para bugs. Cambios o funcionalidades nuevas después de la entrega se presupuestan por separado como un proyecto nuevo.",
    },
    {
      q: "¿Trabajás con clientes de otros países?",
      a: "Sí. Trabajo 100% remoto desde Resistencia, Argentina. Tengo experiencia colaborando con equipos de EEUU, Europa y América Latina. Coordinamos por WhatsApp, email o videollamada según tu zona horaria.",
    },
  ],
  en: [
    {
      q: "How do you work?",
      a: "I work per project with a one-time payment, no monthly fees. I deliver everything to your own accounts (Vercel, GitHub, Supabase, domain) and you fully own the code, infrastructure and access from day one.",
    },
    {
      q: "How long does a project take?",
      a: {
        items: [
          {
            title: "Landing",
            text: "Single section or presentation page. Delivered in 3–5 business days.",
          },
          {
            title: "Up to 4 pages",
            text: "Multi-section site, blog or CMS included. Delivered in 1–2 weeks.",
          },
          {
            title: "Up to 10 pages",
            text: "Full web app with login, admin panel and database. Delivered in 2–3 weeks.",
          },
        ],
      },
    },
    {
      q: "How is payment made?",
      a: "50% upfront to start, 50% at delivery. I accept USD (crypto USDT/USDC) and ARS (Mercadopago or bank transfer).",
    },
    {
      q: "Can I request changes after delivery?",
      a: "Yes. The project includes revision rounds before closing and a 14-day bug warranty. Changes or new features after delivery are quoted separately as a new project.",
    },
    {
      q: "Do you work with clients from other countries?",
      a: "Yes. I work 100% remotely from Resistencia, Argentina. I have experience collaborating with teams from the US, Europe and Latin America. We coordinate via WhatsApp, email or video call depending on your timezone.",
    },
  ],
  pt: [
    {
      q: "Como você trabalha?",
      a: "Trabalho por projeto com pagamento único, sem mensalidades. Entrego tudo nas suas próprias contas (Vercel, GitHub, Supabase, domínio) e você é dono absoluto do código, da infra e dos acessos desde o primeiro dia.",
    },
    {
      q: "Quanto tempo leva um projeto?",
      a: {
        items: [
          {
            title: "Landing",
            text: "Uma seção ou página de apresentação. Entrega em 3–5 dias úteis.",
          },
          {
            title: "Até 4 páginas",
            text: "Site com várias seções, blog ou CMS incluído. Entrega em 1–2 semanas.",
          },
          {
            title: "Até 10 páginas",
            text: "App web completo com login, painel admin e banco de dados. Entrega em 2–3 semanas.",
          },
        ],
      },
    },
    {
      q: "Como é feito o pagamento?",
      a: "50% adiantado para começar, 50% na entrega. Aceito USD (cripto USDT/USDC) e ARS (Mercadopago ou transferência bancária).",
    },
    {
      q: "Posso pedir alterações após a entrega?",
      a: "Sim. O projeto inclui rodadas de revisão antes do fechamento e 14 dias de garantia para bugs. Alterações ou novas funcionalidades após a entrega são orçadas separadamente como um novo projeto.",
    },
    {
      q: "Você trabalha com clientes de outros países?",
      a: "Sim. Trabalho 100% remoto de Resistência, Argentina. Tenho experiência colaborando com equipes dos EUA, Europa e América Latina. Nos coordenamos por WhatsApp, e-mail ou videochamada conforme seu fuso horário.",
    },
  ],
};
