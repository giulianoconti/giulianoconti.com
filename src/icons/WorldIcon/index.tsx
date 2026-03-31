import type { IconProps } from "../../utils/interfaces";

const WorldIcon = ({ className = "", height = 24, title = "world", width = 24 }: IconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <title>{title}</title>
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
      d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M3.6 9h16.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.6 15h16.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M11.5 3a17 17 0 0 0 0 18"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 3a17 17 0 0 1 0 18"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default WorldIcon;
