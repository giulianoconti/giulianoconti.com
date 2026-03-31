import type { IconProps } from "../../utils/interfaces";

const MonadIcon = ({ className = "", height = 24, title = "monad", width = 24 }: IconProps) => (
  <svg
    className={className}
    fill="none"
    height={height}
    viewBox="0 0 24 24"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{title}</title>
    <path
      d="M11.9999 2C9.11219 2 2 9.11202 2 11.9999C2 14.8879 9.11219 22 11.9999 22C14.8877 22 22 14.8877 22 11.9999C22 9.11215 14.8878 2 11.9999 2ZM10.4416 17.7182C9.22389 17.3864 5.94989 11.6594 6.28177 10.4416C6.61366 9.22379 12.3406 5.94987 13.5584 6.28175C14.7761 6.61358 18.0501 12.3406 17.7182 13.5583C17.3864 14.7762 11.6594 18.0501 10.4416 17.7182Z"
      fill="currentColor"
    />
  </svg>
);

export default MonadIcon;
