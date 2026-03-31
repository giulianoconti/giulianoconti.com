import type { AnchorHTMLAttributes, ReactNode } from "react";
import "./styles.scss";

interface GreenButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  className?: string;
}

function GreenButton({ children, className = "", ...anchorProps }: GreenButtonProps) {
  return (
    <a className={`green_button ${className}`.trim()} {...anchorProps}>
      {children}
    </a>
  );
}

export default GreenButton;
