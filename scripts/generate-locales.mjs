import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const dist = resolve(process.cwd(), "dist");

const locales = {
  en: {
    htmlLang: "en",
    title: "Giuliano Conti - Software Engineer",
    description:
      "Software Engineer based in Resistencia, Argentina. I build websites and web apps for businesses — landing pages, login and admin panels. Available for projects.",
    ogDescription:
      "I build websites and web apps for businesses that want to grow online — fast, modern, and no technical hassle. Available for new projects.",
    ogImage: "https://giulianoconti.com/assets/og-image-en.jpg",
    ogLocale: "en_US",
    ogAlt: "Giuliano Conti - Software Engineer — portfolio preview",
    jobTitle: "Software Engineer",
    jsonLdDescription:
      "Software Engineer based in Resistencia, Argentina. I build websites and web apps for businesses — landing pages, login and admin panels. Available for projects.",
  },
  pt: {
    htmlLang: "pt-BR",
    title: "Giuliano Conti - Engenheiro de Software",
    description:
      "Engenheiro de Software em Resistência, Argentina. Construo sites e apps para negócios — landing pages, login e painel admin. Disponível para novos projetos.",
    ogDescription:
      "Construo sites e aplicações para negócios que querem crescer online — rápidos, modernos e sem complicações técnicas. Disponível para novos projetos.",
    ogImage: "https://giulianoconti.com/assets/og-image-pt.jpg",
    ogLocale: "pt_BR",
    ogAlt: "Giuliano Conti - Engenheiro de Software — prévia do portfólio",
    jobTitle: "Engenheiro de Software",
    jsonLdDescription:
      "Engenheiro de Software em Resistência, Argentina. Construo sites e apps para negócios — landing pages, login e painel admin. Disponível para novos projetos.",
  },
};

const base = readFileSync(resolve(dist, "index.html"), "utf-8");

for (const [lang, meta] of Object.entries(locales)) {
  let html = base;

  html = html.replace(/(<html[^>]*lang=")[^"]*"/, `$1${meta.htmlLang}"`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);
  html = html.replace(/(<meta name="description" content=")[^"]*"/, `$1${meta.description}"`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*"/, `$1${meta.title}"`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*"/, `$1${meta.ogDescription}"`);
  html = html.replace(/(<meta property="og:image" content=")[^"]*"/, `$1${meta.ogImage}"`);
  html = html.replace(/(<meta property="og:image:alt" content=")[^"]*"/, `$1${meta.ogAlt}"`);
  html = html.replace(/(<meta property="og:locale" content=")[^"]*"/, `$1${meta.ogLocale}"`);
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${meta.title}"`);
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*"/, `$1${meta.ogDescription}"`);
  html = html.replace(/(<meta name="twitter:image" content=")[^"]*"/, `$1${meta.ogImage}"`);
  html = html.replace(/(<meta name="twitter:image:alt" content=")[^"]*"/, `$1${meta.ogAlt}"`);
  // JSON-LD: jobTitle
  html = html.replace(/"jobTitle": "[^"]*"/, `"jobTitle": "${meta.jobTitle}"`);
  // JSON-LD: Person.description (first "description" key in the LD block)
  html = html.replace(/("description": ")[^"]*Resistencia[^"]*/, `$1${meta.jsonLdDescription}`);
  // JSON-LD: Person.image
  html = html.replace(/("image": "https:\/\/giulianoconti\.com\/assets\/og-image)[^"]*/, `$1-${lang}.jpg`);

  writeFileSync(resolve(dist, `index-${lang}.html`), html);
  console.log(`✓ dist/index-${lang}.html`);
}

console.log("✓ locale HTML files generated");
