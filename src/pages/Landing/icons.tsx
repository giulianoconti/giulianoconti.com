interface IconProps {
  className?: string;
  height?: number;
  width?: number;
}

export function CloseIcon({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      height={height}
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width={width}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function BackIcon({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      height={height}
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width={width}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

export function CheckIcon({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      height={height}
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
      width={width}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function SunIcon({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      height={height}
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width={width}
    >
      <circle cx="12" cy="12" r="4" />
      <path
        strokeLinecap="round"
        d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
      />
    </svg>
  );
}

export function MoonIcon({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      height={height}
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width={width}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

export function Check({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      height={height}
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
      width={width}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function Cross({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      height={height}
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
      width={width}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function SparklesIcon({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      height={height}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
      <path d="M20 2v4" />
      <path d="M22 4h-4" />
      <circle cx={4} cy={20} r={2} />
    </svg>
  );
}

export function SlidersHorizontalIcon({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      height={height}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 5H3" />
      <path d="M12 19H3" />
      <path d="M14 3v4" />
      <path d="M16 17v4" />
      <path d="M21 12h-9" />
      <path d="M21 19h-5" />
      <path d="M21 5h-7" />
      <path d="M8 10v4" />
      <path d="M8 12H3" />
    </svg>
  );
}
