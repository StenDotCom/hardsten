/**
 * PRIMARY NAVIGATION — exactly five items. Order and labels shown in the
 * sidebar (desktop) and the bottom tab bar (tablet / mobile).
 */
export type NavKey = 'home' | 'projects' | 'services' | 'about' | 'contact';

export const navItems: { key: NavKey; label: string; short: string; to: string }[] = [
  { key: 'home', label: 'Home', short: 'Home', to: '/' },
  { key: 'projects', label: 'Projects', short: 'Projects', to: '/projects' },
  { key: 'services', label: 'Services', short: 'Services', to: '/services' },
  { key: 'about', label: 'About', short: 'About', to: '/about' },
  { key: 'contact', label: 'FAQs / Contact', short: 'Contact', to: '/contact' },
];
