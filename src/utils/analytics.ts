import type { Locale } from "../contexts/LocaleContext";

declare global {
  function gtag(...args: unknown[]): void;
}

function track(event: string, params: Record<string, string>): void {
  if (typeof gtag === "undefined") return;
  gtag("event", event, params);
}

export function trackLanguageChange(language: Locale): void {
  track("language_change", { language });
}

export function trackResumeClick(language: Locale): void {
  track("resume_click", { language });
}

export function trackSectionView(section: string, language: Locale): void {
  track("section_view", { section, language });
}

export function trackSocialClick(platform: string, location: "hero" | "footer"): void {
  track("social_click", { platform, location });
}

export function trackProjectClick(project: string, language: Locale): void {
  track("project_click", { project, language });
}

export function trackContactClick(language: Locale): void {
  track("contact_click", { language });
}
