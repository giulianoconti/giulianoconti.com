// Vercel Edge Middleware: serves the pre-rendered locale HTML for /?lang=en|pt.
// vercel.json rewrites can't do this because "/" matches the static index.html first.
export const config = { matcher: "/" };

const LOCALES = ["en", "pt"];

export default function middleware(request) {
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang")?.toLowerCase();
  if (!LOCALES.includes(lang)) return;

  const target = new URL(`/index-${lang}.html`, url);
  target.search = url.search;
  return new Response(null, { headers: { "x-middleware-rewrite": target.toString() } });
}
