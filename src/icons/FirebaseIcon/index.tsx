import type { IconProps } from "../../utils/interfaces";

const FirebaseIcon = ({ className = "", height = 24, title = "firebase", width = 24 }: IconProps) => (
  <svg
    className={className}
    fill="none"
    height={height}
    viewBox="0 0 15 15"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{title}</title>
    <path
      d="M2.5 11.5L11.5 3.5L12.5 12.5L7.5 14.5L2.5 11.5ZM2.5 11.5L7.5 2.5L9.5 5.5M2.5 11.5L3.5 0.5L6.5 3.5"
      stroke="currentColor"
      strokeLinejoin="round"
    />
  </svg>
);
export default FirebaseIcon;
