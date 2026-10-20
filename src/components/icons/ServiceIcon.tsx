import type { ServiceIconKey } from '../../data/services';

/** Schematic-style line illustrations for the five service areas. */
export function ServiceIcon({ name, size = 28 }: { name: ServiceIconKey; size?: number }) {
  const p = {
    width: size,
    height: size,
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
  };
  switch (name) {
    case 'prototype':
      return (
        <svg {...p}>
          <rect x="4" y="9" width="24" height="16" rx="2" />
          <path d="M9 9V6h14v3M9 15h4M9 19h2" />
          <circle cx="20" cy="17" r="3" />
          <path d="M20 14v-1M20 21v-1M23 17h1M16 17h1" />
        </svg>
      );
    case 'embedded':
      return (
        <svg {...p}>
          <rect x="9" y="9" width="14" height="14" rx="2" />
          <rect x="13" y="13" width="6" height="6" rx="1" />
          <path d="M12 9V5M16 9V5M20 9V5M12 27v-4M16 27v-4M20 27v-4M9 12H5M9 16H5M9 20H5M27 12h-4M27 16h-4M27 20h-4" />
        </svg>
      );
    case 'automation':
      return (
        <svg {...p}>
          <circle cx="11" cy="12" r="5" />
          <circle cx="11" cy="12" r="1.6" />
          <path d="M11 5v2M11 17v2M4 12h2M16 12h2" />
          <path d="M18 22h10M23 17v10" opacity=".5" />
          <path d="M14 22h-4l-3 4M18 22l2.5-2.5" />
          <circle cx="23" cy="22" r="2.4" />
        </svg>
      );
    case 'academic':
      return (
        <svg {...p}>
          <path d="M6 5h14l6 6v16H6z" />
          <path d="M20 5v6h6M10 16h12M10 20h12M10 24h7" />
          <path d="M10 11h5" />
        </svg>
      );
    case 'cad':
      return (
        <svg {...p}>
          <rect x="4" y="5" width="24" height="22" rx="1.5" />
          <path d="M4 13h10v14M14 18h14M20 5v8h8" />
          <path d="M8 21h2M8 24h2" />
          <circle cx="22" cy="23" r="1.2" />
        </svg>
      );
  }
}
