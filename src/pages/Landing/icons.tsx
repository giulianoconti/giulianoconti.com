interface IconProps {
  className?: string;
  height?: number;
  width?: number;
}

export function BackIcon({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg className={className} fill="none" height={height} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" width={width}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

export function CheckIcon({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg className={className} fill="none" height={height} stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" width={width}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function ClockIcon({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg className={className} fill="none" height={height} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} viewBox="0 0 24 24" width={width}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function CloseIcon({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg className={className} fill="none" height={height} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" width={width}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function FileIcon({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg className={className} fill="none" height={height} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} viewBox="0 0 24 24" width={width}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}

export function GlobeIcon({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg className={className} fill="none" height={height} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} viewBox="0 0 24 24" width={width}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export function KeyIcon({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg className={className} fill="none" height={height} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} viewBox="0 0 24 24" width={width}>
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  );
}

export function LayersIcon({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg className={className} fill="none" height={height} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} viewBox="0 0 24 24" width={width}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

export function LayoutIcon({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg className={className} fill="none" height={height} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} viewBox="0 0 24 24" width={width}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  );
}

export function LockIcon({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg className={className} fill="none" height={height} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} viewBox="0 0 24 24" width={width}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export function MoonIcon({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg className={className} fill="none" height={height} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" width={width}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

export function SlidersHorizontalIcon({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg className={className} fill="none" height={height} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={width} xmlns="http://www.w3.org/2000/svg">
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

export function SparklesIcon({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg className={className} fill="none" height={height} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={width} xmlns="http://www.w3.org/2000/svg">
      <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
      <path d="M20 2v4" />
      <path d="M22 4h-4" />
      <circle cx={4} cy={20} r={2} />
    </svg>
  );
}

export function SunIcon({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg className={className} fill="none" height={height} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" width={width}>
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

export function MonitorIcon({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg className={className} fill="none" height={height} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} viewBox="0 0 24 24" width={width}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

export function PenToolIcon({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg className={className} fill="none" height={height} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} viewBox="0 0 24 24" width={width}>
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}

export function WrenchIcon({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg className={className} fill="none" height={height} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} viewBox="0 0 24 24" width={width}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

export function ZapIcon({ className, height = 20, width = 20 }: IconProps) {
  return (
    <svg className={className} fill="none" height={height} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} viewBox="0 0 24 24" width={width}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
