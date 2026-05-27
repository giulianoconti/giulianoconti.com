import { useLocale } from "../../../contexts/LocaleContext";
import "./styles.scss";

const PROCESS_STEPS: Record<"en" | "es" | "pt", { n: string; title: string; desc: string }[]> = {
  es: [
    { n: "01", title: "Hablamos",   desc: "Me contás el proyecto, qué necesitás y en qué plazo. Sin rodeos." },
    { n: "02", title: "Propongo",   desc: "Te mando un presupuesto detallado con alcance, tiempo de entrega y precio." },
    { n: "03", title: "Desarrollo", desc: "Trabajo en sprints y te muestro avances. Podés dar feedback en cada etapa." },
    { n: "04", title: "Lanzamos",   desc: "Deploy en producción, te entrego accesos y documentación. Queda todo funcionando." },
  ],
  en: [
    { n: "01", title: "We talk",     desc: "Tell me about the project, what you need and by when. No detours." },
    { n: "02", title: "I propose",   desc: "I send a detailed quote with scope, delivery time and price." },
    { n: "03", title: "Development", desc: "I work in sprints and show you progress. You can give feedback at each stage." },
    { n: "04", title: "We launch",   desc: "Deploy to production, I hand over access and documentation. Everything working." },
  ],
  pt: [
    { n: "01", title: "Conversamos",    desc: "Me conta o projeto, o que precisa e em que prazo. Sem rodeios." },
    { n: "02", title: "Proponho",       desc: "Envio um orçamento detalhado com escopo, prazo de entrega e preço." },
    { n: "03", title: "Desenvolvimento",desc: "Trabalho em sprints e mostro progresso. Você pode dar feedback a cada etapa." },
    { n: "04", title: "Lançamos",       desc: "Deploy em produção, entrego acessos e documentação. Tudo funcionando." },
  ],
};

export default function Process() {
  const { t, locale } = useLocale();
  const steps = PROCESS_STEPS[locale];

  return (
    <section className="process" id="proceso">
      <div className="process_inner">
        <div className="process_header">
          <h5 className="process_header_eyebrow" id="process">
            {t.process.label.toUpperCase()}
          </h5>
          <div className="process_header_rule" />
        </div>

        <div className="process_content">
          <h2 className="process_content_title">
            {t.process.h2pre} <em>{t.process.h2em}</em>
          </h2>
          <p className="process_content_desc">{t.process.p}</p>

          <div className="process_steps">
            {steps.map((step) => (
              <div key={step.n} className="process_step">
                <div className="process_step_n">{step.n}</div>
                <h3 className="process_step_title">{step.title}</h3>
                <p className="process_step_desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
