import type { IconProps } from "../../utils/interfaces";

const InstagramIcon = ({ className = "", height = 24, title = "instagram", width = 24 }: IconProps) => (
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
      d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M16.5 7.5l0 .01" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default InstagramIcon;
