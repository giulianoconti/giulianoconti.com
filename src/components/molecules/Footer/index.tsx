import type { ReactElement } from "react";
import { useLocale } from "../../../contexts/LocaleContext.tsx";
import { trackProjectClick, trackSocialClick } from "../../../utils/analytics.ts";
import {
  BlenderIcon,
  CssIcon,
  FirebaseIcon,
  GithubIcon,
  LinkedInIcon,
  MailIcon,
  MongodbIcon,
  ReactIcon,
  TailwindIcon,
  ThreejsIcon,
  WhatsAppIcon,
  WorldIcon,
} from "../../../icons";
import {
  MAIN_PROJECTS,
  SOCIAL_GITHUB_URL,
  SOCIAL_LINKEDIN_URL,
  SOCIAL_MAIL,
  WA_MSG,
} from "../../../utils/constants.ts";
import type { IconProps } from "../../../utils/interfaces.ts";
import "./styles.scss";
import { useTheme } from "../../../contexts/ThemeContext.tsx";

interface IconComponent {
  (props: IconProps): ReactElement;
}

const iconMap: Record<string, IconComponent> = {
  react: ReactIcon,
  firebase: FirebaseIcon,
  mongodb: MongodbIcon,
  tailwind: TailwindIcon,
  css: CssIcon,
  threejs: ThreejsIcon,
  blender: BlenderIcon,
};

export default function Footer() {
  const { t, locale } = useLocale();
  const { theme } = useTheme();

  const projectMap: Record<string, { name: string; desc: string }> = {
    blackjack: { name: t.projects.blackjack, desc: t.projects.blackjackDesc },
    sokoban: { name: t.projects.sokoban, desc: t.projects.sokobanDesc },
    copicti: { name: t.projects.copicti, desc: t.projects.copictiDesc },
    portfolio3d: { name: t.projects.portfolio3d, desc: t.projects.portfolio3dDesc },
    createResume: { name: t.projects.createResume, desc: t.projects.createResumeDesc },
    removeBg: { name: t.projects.removeBg, desc: t.projects.removeBgDesc },
    giulianNews: { name: t.projects.giulianNews, desc: t.projects.giulianNewsDesc },
    pokemonFinder: { name: t.projects.pokemonFinder, desc: t.projects.pokemonFinderDesc },
    weatherTI: { name: t.projects.weatherTI, desc: t.projects.weatherTIDesc },
  };

  return (
    <footer className="footer" id="footer">
      <a href="#home" className="footer_logo">
        <img
          alt="Logo"
          className="footer_logo_img"
          src={theme === "light" ? "/assets/favicon_light.svg" : "/assets/favicon_dark.svg"}
          height={32}
          width={32}
        />
      </a>

      <div className="footer_actions">
        <a className="footer_actions_link" href={`mailto:${SOCIAL_MAIL}`} aria-label="Email" data-tooltip="Email">
          <MailIcon />
        </a>
        <a
          className="footer_actions_link footer_actions_link--wa"
          href={WA_MSG(t.contact.waMsg)}
          rel="noopener noreferrer"
          target="_blank"
          aria-label="WhatsApp"
          data-tooltip="WhatsApp"
        >
          <WhatsAppIcon colorless />
        </a>
        <a
          className="footer_actions_link"
          href={SOCIAL_LINKEDIN_URL}
          rel="noopener noreferrer"
          target="_blank"
          aria-label="LinkedIn"
          data-tooltip="LinkedIn"
          onClick={() => trackSocialClick("linkedin", "footer")}
        >
          <LinkedInIcon />
        </a>
        <a
          className="footer_actions_link"
          href={SOCIAL_GITHUB_URL}
          rel="noopener noreferrer"
          target="_blank"
          aria-label="GitHub"
          data-tooltip="GitHub"
          onClick={() => trackSocialClick("github", "footer")}
        >
          <GithubIcon />
        </a>
      </div>
    </footer>
  );
}
