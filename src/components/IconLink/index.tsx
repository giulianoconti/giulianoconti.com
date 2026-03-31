import type { ReactNode } from "react";
import "./styles.scss";

interface IconLinkProps {
  href: string;
  ariaLabel: string;
  title?: string;
  className?: string;
  children: ReactNode;
}

const IconLink = ({ href, ariaLabel, title, className = "", children }: IconLinkProps) => {
  return (
    <a
      className={`icon_link ${className}`.trim()}
      href={href}
      target="_blank"
      aria-label={ariaLabel}
      rel="noopener noreferrer"
      title={title}
    >
      <span className="icon_link_icon">{children}</span>
    </a>
  );
};

export default IconLink;
