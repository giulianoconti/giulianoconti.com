type FaqItem = { title: string; text: string };
export type FaqAnswer = string | { items: FaqItem[] };

export const FAQS: Record<"en" | "es" | "pt", { q: string; a: FaqAnswer }[]> = {
  es: [
    {
      q: "¿Cuál es la diferencia entre Mensual y Pago Único?",
      a: {
        items: [
          {
            title: "Mensual",
            text: "Manejo toda la infraestructura en mis cuentas — Vercel, GitHub, Supabase, dominio. Vos solo pagás una mensualidad fija. Cero dolores de cabeza técnicos.",
          },
          {
            title: "Pago Único",
            text: "Te entrego el proyecto completo en tus propias cuentas. Sos dueño absoluto del código, la infra y los accesos desde el día uno.",
          },
        ],
      },
    },
    {
      q: "¿Cuánto tarda un proyecto?",
      a: {
        items: [
          { title: "Landing", text: "Una sola sección o página de presentación. Entrega en 3–5 días hábiles." },
          { title: "Hasta 4 páginas", text: "Sitio con varias secciones, blog o CMS incluido. Entrega en 1–2 semanas." },
          { title: "Hasta 10 páginas", text: "App web completa con login, panel admin y base de datos. Entrega en 2–3 semanas." },
        ],
      },
    },
    {
      q: "¿Qué pasa si quiero salir del plan Mensual?",
      a: "Sin problema. Si llevás más de 1 año en el plan Mensual, la migración a tus propias cuentas tiene un costo del 50% del precio de pago único equivalente. Si todavía no llegaste al año, se cobra el precio completo de pago único. En ambos casos te entrego todo: código, accesos y documentación.",
    },
    {
      q: "¿Cómo se hace el pago?",
      a: {
        items: [
          { title: "Pago Único", text: "50% adelantado para arrancar, 50% al momento de la entrega. Acepto USD (crypto USDT/USDC) y ARS (Mercadopago o transferencia)." },
          { title: "Mensual", text: "Se abona mes a mes sin costo de setup inicial. Mismos métodos de pago." },
        ],
      },
    },
    {
      q: "¿Puedo pedirte cambios después de la entrega?",
      a: {
        items: [
          { title: "Mensual", text: "Los cambios de contenido están incluidos cada mes según el nivel de mantenimiento elegido." },
          { title: "Pago Único", text: "Incluye rondas de revisión antes del cierre. Cambios posteriores se presupuestan por separado o acordamos un retainer mensual." },
        ],
      },
    },
    {
      q: "¿Trabajás con clientes de otros países?",
      a: "Sí. Trabajo 100% remoto desde Resistencia, Argentina. Tengo experiencia colaborando con equipos de EEUU, Europa y América Latina. Coordinamos por WhatsApp, email o videollamada según tu zona horaria.",
    },
  ],
  en: [
    {
      q: "What's the difference between Monthly and One-time?",
      a: {
        items: [
          {
            title: "Monthly",
            text: "I manage all infrastructure in my accounts — Vercel, GitHub, Supabase, domain. You just pay a fixed monthly fee. Zero technical headaches.",
          },
          {
            title: "One-time",
            text: "I deliver the complete project to your own accounts. You own the code, infrastructure and access 100% from day one.",
          },
        ],
      },
    },
    {
      q: "How long does a project take?",
      a: {
        items: [
          { title: "Landing", text: "Single section or presentation page. Delivered in 3–5 business days." },
          { title: "Up to 4 pages", text: "Multi-section site, blog or CMS included. Delivered in 1–2 weeks." },
          { title: "Up to 10 pages", text: "Full web app with login, admin panel and database. Delivered in 2–3 weeks." },
        ],
      },
    },
    {
      q: "What happens if I want to leave the Monthly plan?",
      a: "No problem. If you've been on the Monthly plan for over 1 year, migration to your own accounts costs 50% of the equivalent one-time project price. Under 1 year, the full one-time price applies. Either way you get everything: code, access and documentation.",
    },
    {
      q: "How is payment made?",
      a: {
        items: [
          { title: "One-time", text: "50% upfront to start, 50% at delivery. I accept USD (crypto USDT/USDC) and ARS (Mercadopago or bank transfer)." },
          { title: "Monthly", text: "Billed month to month with no initial setup fee. Same payment methods." },
        ],
      },
    },
    {
      q: "Can I request changes after delivery?",
      a: {
        items: [
          { title: "Monthly", text: "Content changes are included each month according to the chosen maintenance level." },
          { title: "One-time", text: "Includes revision rounds before closing. Later changes are budgeted separately or we arrange a monthly retainer." },
        ],
      },
    },
    {
      q: "Do you work with clients from other countries?",
      a: "Yes. I work 100% remotely from Resistencia, Argentina. I have experience collaborating with teams from the US, Europe and Latin America. We coordinate via WhatsApp, email or video call depending on your timezone.",
    },
  ],
  pt: [
    {
      q: "Qual é a diferença entre Mensal e Pagamento Único?",
      a: {
        items: [
          {
            title: "Mensal",
            text: "Gerencio toda a infraestrutura nas minhas contas — Vercel, GitHub, Supabase, domínio. Você só paga uma mensalidade fixa. Zero dores de cabeça técnicas.",
          },
          {
            title: "Pagamento Único",
            text: "Entrego o projeto completo nas suas próprias contas. Você é dono absoluto do código, da infra e dos acessos desde o primeiro dia.",
          },
        ],
      },
    },
    {
      q: "Quanto tempo leva um projeto?",
      a: {
        items: [
          { title: "Landing", text: "Uma seção ou página de apresentação. Entrega em 3–5 dias úteis." },
          { title: "Até 4 páginas", text: "Site com várias seções, blog ou CMS incluído. Entrega em 1–2 semanas." },
          { title: "Até 10 páginas", text: "App web completo com login, painel admin e banco de dados. Entrega em 2–3 semanas." },
        ],
      },
    },
    {
      q: "O que acontece se eu quiser sair do plano Mensal?",
      a: "Sem problema. Se você tiver mais de 1 ano no plano Mensal, a migração para suas próprias contas custa 50% do preço equivalente de pagamento único. Com menos de 1 ano, cobra-se o preço completo de pagamento único. Em ambos os casos você recebe tudo: código, acessos e documentação.",
    },
    {
      q: "Como é feito o pagamento?",
      a: {
        items: [
          { title: "Pagamento Único", text: "50% adiantado para começar, 50% na entrega. Aceito USD (cripto USDT/USDC) e ARS (Mercadopago ou transferência bancária)." },
          { title: "Mensal", text: "Cobrado mês a mês sem taxa de setup inicial. Mesmos métodos de pagamento." },
        ],
      },
    },
    {
      q: "Posso pedir alterações após a entrega?",
      a: {
        items: [
          { title: "Mensal", text: "As alterações de conteúdo estão incluídas todo mês conforme o nível de manutenção escolhido." },
          { title: "Pagamento Único", text: "Inclui rodadas de revisão antes do fechamento. Alterações posteriores são orçadas separadamente ou combinamos um retainer mensal." },
        ],
      },
    },
    {
      q: "Você trabalha com clientes de outros países?",
      a: "Sim. Trabalho 100% remoto de Resistência, Argentina. Tenho experiência colaborando com equipes dos EUA, Europa e América Latina. Nos coordenamos por WhatsApp, e-mail ou videochamada conforme seu fuso horário.",
    },
  ],
};
