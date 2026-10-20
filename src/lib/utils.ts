import { useEffect, useState } from 'react';
import { site, visitCounter } from '../data/profile';

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

const VISIT_CACHE_KEY = 'yc-visits-cache';
const BASE_VISIT_OFFSET = 520;
let visitFetchPromise: Promise<number> | null = null;

function fetchLiveVisits(): Promise<number> {
  if (visitFetchPromise) return visitFetchPromise;

  visitFetchPromise = fetch('https://abacus.jasoncameron.dev/hit/stendotcom-hardsten/visits')
    .then((res) => {
      if (!res.ok) throw new Error('Counter API error');
      return res.json() as Promise<{ value?: number }>;
    })
    .then((data) => {
      const total = BASE_VISIT_OFFSET + (typeof data.value === 'number' ? data.value : 1);
      try {
        localStorage.setItem(VISIT_CACHE_KEY, String(total));
      } catch {
        /* ignore storage error */
      }
      return total;
    })
    .catch(() => {
      try {
        const cached = Number(localStorage.getItem(VISIT_CACHE_KEY));
        const next = Number.isFinite(cached) && cached >= visitCounter.value
          ? cached + 1
          : visitCounter.value;
        localStorage.setItem(VISIT_CACHE_KEY, String(next));
        return next;
      } catch {
        return visitCounter.value;
      }
    });

  return visitFetchPromise;
}

/** Live global visitor counter hook with offline/localStorage fallback. */
export function useVisitCounter() {
  const [visits, setVisits] = useState<number>(() => {
    try {
      const cached = Number(localStorage.getItem(VISIT_CACHE_KEY));
      if (Number.isFinite(cached) && cached >= visitCounter.value) return cached;
    } catch {
      /* ignore */
    }
    return visitCounter.value;
  });

  useEffect(() => {
    let active = true;
    fetchLiveVisits().then((total) => {
      if (active) setVisits(total);
    });
    return () => {
      active = false;
    };
  }, []);

  return visits;
}

export const mailto = (email: string, subject?: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}${
    subject ? `&su=${encodeURIComponent(subject)}` : ''
  }`;
