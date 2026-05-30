import type { ReactNode } from "react";
import "./styles.scss";

interface Props {
  label: string;
  children: ReactNode;
  position?: "top" | "bottom";
}

export default function Tooltip({ label, children, position = "top" }: Props) {
  return (
    <span className="tooltip" data-tooltip={label} data-position={position}>
      {children}
    </span>
  );
}
