import type { NavKey } from '../../data/nav';

/**
 * Two-tone filled navigation icons, in the spirit of the reference rail:
 * a soft accent-tinted back layer and a solid foreground layer.
 */
export function NavIcon({ name, size = 20 }: { name: NavKey; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
    focusable: false,
    className: 'navicon',
  } as const;
  switch (name) {
    case 'home':
      return (
        <svg {...common}>
          <path className="navicon__back" d="M3 10.6 12 3l9 7.6V20a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 20z" />
          <path className="navicon__front" d="M9.5 21.5V15a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6.5z" />
        </svg>
      );
    case 'projects':
      return (
        <svg {...common}>
          <path className="navicon__back" d="M2.5 6A1.5 1.5 0 0 1 4 4.5h5l2 2.5h9A1.5 1.5 0 0 1 21.5 8.5v2h-19z" />
          <rect className="navicon__front" x="2.5" y="9" width="19" height="11" rx="1.8" />
        </svg>
      );
    case 'services':
      return (
        <svg {...common}>
          <path className="navicon__back" d="m12 13.6-9-4.3 9-4.6 9 4.6z" />
          <path className="navicon__front" d="m3.6 12.6 8.4 4 8.4-4 .6.3c.6.3.6 1 0 1.3L12.4 18.5a.9.9 0 0 1-.8 0L3 14.2c-.6-.3-.6-1 0-1.3z" />
        </svg>
      );
    case 'about':
      return (
        <svg {...common}>
          <circle className="navicon__back" cx="12" cy="7.5" r="4" />
          <path className="navicon__front" d="M4 20.2c.6-4 3.9-6.7 8-6.7s7.4 2.7 8 6.7c.1.7-.4 1.3-1.1 1.3H5.1c-.7 0-1.2-.6-1.1-1.3z" />
        </svg>
      );
    case 'contact':
      return (
        <svg {...common}>
          <path className="navicon__back" d="M4 4.5h12A2.5 2.5 0 0 1 18.5 7v6a2.5 2.5 0 0 1-2.5 2.5H9l-4 3v-3H4A2.5 2.5 0 0 1 1.5 13V7A2.5 2.5 0 0 1 4 4.5z" />
          <path className="navicon__front" d="M20.5 9.5v5a2.5 2.5 0 0 1-2.5 2.5h-.5v2.5l-3.3-2.5H10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}
