import { useLocale } from "../../contexts/LocaleContext.tsx";
import { LinkedInIcon, GithubIcon, InstagramIcon } from "../../icons";
import IconLink from "../IconLink";
import { SOCIAL_GITHUB_URL, SOCIAL_INSTAGRAM_URL, SOCIAL_LINKEDIN_URL } from "../../utils/constants.ts";
import "./styles.scss";

function Footer() {
  const { t } = useLocale();

  return (
    <footer className="footer">
      <a
        className="footer_link"
        href={SOCIAL_LINKEDIN_URL}
        target="_blank"
        aria-label="LinkedIn"
        rel="noopener noreferrer"
      >
        {t.footer.name}
      </a>
      <div className="footer_social">
        <IconLink href={SOCIAL_LINKEDIN_URL} ariaLabel="LinkedIn" title="LinkedIn">
          <LinkedInIcon />
        </IconLink>
        <IconLink href={SOCIAL_GITHUB_URL} ariaLabel="Github" title="Github">
          <GithubIcon />
        </IconLink>
        <IconLink href={SOCIAL_INSTAGRAM_URL} ariaLabel="Instagram" title="Instagram">
          <InstagramIcon />
        </IconLink>
      </div>
    </footer>
  );
}

export default Footer;
