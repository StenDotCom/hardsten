import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 20, rest: SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
  ...rest,
});

export const ArrowUpRight = ({ size, ...r }: P) => (
  <svg {...base(size, r)}><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const ArrowRight = ({ size, ...r }: P) => (
  <svg {...base(size, r)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowLeft = ({ size, ...r }: P) => (
  <svg {...base(size, r)}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
);
export const ChevronLeft = ({ size, ...r }: P) => (
  <svg {...base(size, r)}><path d="m15 6-6 6 6 6" /></svg>
);
export const ChevronRight = ({ size, ...r }: P) => (
  <svg {...base(size, r)}><path d="m9 6 6 6-6 6" /></svg>
);
export const ChevronDown = ({ size, ...r }: P) => (
  <svg {...base(size, r)}><path d="m6 9 6 6 6-6" /></svg>
);
export const Close = ({ size, ...r }: P) => (
  <svg {...base(size, r)}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const Mail = ({ size, ...r }: P) => (
  <svg {...base(size, r)}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></svg>
);
export const Moon = ({ size, ...r }: P) => (
  <svg {...base(size, r)}><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" /></svg>
);
export const Sun = ({ size, ...r }: P) => (
  <svg {...base(size, r)}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
);
export const MapPin = ({ size, ...r }: P) => (
  <svg {...base(size, r)}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
export const DocumentIcon = ({ size, ...r }: P) => (
  <svg {...base(size, r)}><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5M10 13h6M10 17h6" /></svg>
);
export const Expand = ({ size, ...r }: P) => (
  <svg {...base(size, r)}><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" /></svg>
);
export const ImageIcon = ({ size, ...r }: P) => (
  <svg {...base(size, r)}><rect x="3" y="4" width="18" height="16" rx="2.5" /><circle cx="9" cy="10" r="2" /><path d="m21 16-5-5-9 9" /></svg>
);
export const Plus = ({ size, ...r }: P) => (
  <svg {...base(size, r)}><path d="M12 5v14M5 12h14" /></svg>
);
export const Cap = ({ size, ...r }: P) => (
  <svg {...base(size, r)}><path d="M2 9.5 12 5l10 4.5-10 4.5z" /><path d="M6 11.5V16c3.5 2.5 8.5 2.5 12 0v-4.5M22 9.5V15" /></svg>
);
export const Copy = ({ size, ...r }: P) => (
  <svg {...base(size, r)}><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>
);
export const Check = ({ size, ...r }: P) => (
  <svg {...base(size, r)}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);

/** Decorative identity badge shown next to the display name. */
export const IdentityBadge = ({ size = 18, ...r }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...r}>
    <path
      fill="currentColor"
      d="M12 1.8 14.6 4l3.4-.2.9 3.3 2.9 1.8-1.2 3.1 1.2 3.1-2.9 1.8-.9 3.3-3.4-.2L12 22.2 9.4 20l-3.4.2-.9-3.3-2.9-1.8L3.4 12 2.2 8.9l2.9-1.8.9-3.3 3.4.2z"
    />
    <path d="m7.8 12.2 2.8 2.8 5.6-5.8" fill="none" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
