import { useEffect, useState } from 'react';
import { site } from '../data/profile';

/** Resolve a /public-relative path against the configured base URL. */
export const asset = (path: string) => {
  if (/^(https?:)?\/\//.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
};

/** Sets document.title and the meta description for each route. */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} · Yestin Cruz` : site.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description ?? site.description);
  }, [title, description]);
}

export type Theme = 'light' | 'dark';

const THEME_KEY = 'yc-theme';
const THEME_BAR = { light: '#F4F4ED', dark: '#070B14' };

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_BAR[theme]);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* storage unavailable — theme simply won't persist */
    }
  }, [theme]);
  return { theme, toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) };
}

export const mailto = (email: string, subject?: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}${
    subject ? `&su=${encodeURIComponent(subject)}` : ''
  }`;
