import { useLocale } from "../../../contexts/LocaleContext.tsx";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  LinkedInIcon,
  GithubIcon,
  InstagramIcon,
  WaveBlueColorIcon,
  WavePurpleColorIcon,
  WaveSkyColorIcon,
} from "../../../icons";
import IconLink from "../../../components/IconLink";
import GreenButton from "../../../components/GreenButton";
import {
  ASSET_WAVE_BLUR,
  ASSET_WAVE_PROFILE,
  SOCIAL_GITHUB_URL,
  SOCIAL_INSTAGRAM_URL,
  SOCIAL_LINKEDIN_URL,
  getCvAssetByLocale,
} from "../../../utils/constants.ts";
import "./styles.scss";

const revealUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const Hero = () => {
  const { locale, t } = useLocale();
  const { scrollY } = useScroll();
  const wavesOpacity = useTransform(scrollY, [0, 420, 580], [1, 0.45, 0]);
  const wavesY = useTransform(scrollY, [0, 420], [0, -28]);

  return (
    <section className="home" id="home">
      <motion.div
        className="home_container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={revealUp}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="home_container_subheader">{t.home.subheader}</div>
        <h1 className="home_container_title">{t.home.title}</h1>
        <p className="home_container_text">{t.home.bio}</p>
        <p className="home_container_skills">{t.home.skills}</p>
        <div className="home_container_social">
          <GreenButton href={getCvAssetByLocale(locale)} target="_blank" rel="noopener noreferrer">
            {t.home.resume}
          </GreenButton>
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
      </motion.div>

      <motion.div className="home_waves" style={{ opacity: wavesOpacity, y: wavesY }}>
        <img className="home_waves_blurs" src={ASSET_WAVE_BLUR} alt="blur background" />
        <WaveSkyColorIcon className="home_waves_sky_wave" height={1000} width={1000} aria-label="wave sky" />
        <WaveBlueColorIcon className="home_waves_blue_wave" height={1000} width={1000} aria-label="wave blue" />
        <WavePurpleColorIcon className="home_waves_purple_wave" height={1000} width={1000} aria-label="wave purple" />
        <img className="home_waves_profile" src={ASSET_WAVE_PROFILE} alt="profile picture" />
      </motion.div>
    </section>
  );
};

export default Hero;
