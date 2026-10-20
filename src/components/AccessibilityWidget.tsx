import { useCallback, useEffect, useRef, useState } from 'react';
import './AccessibilityWidget.css';

export type TextSize = 'md' | 'lg' | 'xl';

export interface A11ySettings {
  text: TextSize;
  contrast: boolean;
  motion: boolean;
  links: boolean;
}

const STORAGE_KEY = 'yc-a11y';

const DEFAULT_SETTINGS: A11ySettings = {
  text: 'md',
  contrast: false,
  motion: false,
  links: false,
};

const TEXT_SIZES: { value: TextSize; label: string; hint: string }[] = [
  { value: 'md', label: 'A', hint: 'Default text size' },
  { value: 'lg', label: 'A+', hint: 'Larger text' },
  { value: 'xl', label: 'A++', hint: 'Largest text' },
];

const SWITCHES: { key: 'contrast' | 'motion' | 'links'; label: string; desc: string }[] = [
  { key: 'contrast', label: 'High contrast', desc: 'Darker text, stronger edges' },
  { key: 'motion', label: 'Reduce motion', desc: 'No animation or drifting' },
  { key: 'links', label: 'Underline links', desc: 'Every link gets a line' },
];

function loadSettings(): A11ySettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      text: parsed.text === 'lg' || parsed.text === 'xl' ? parsed.text : 'md',
      contrast: Boolean(parsed.contrast),
      motion: Boolean(parsed.motion),
      links: Boolean(parsed.links),
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function applySettings(s: A11ySettings) {
  const ds = document.documentElement.dataset;
  if (s.text === 'md') delete ds.a11yText;
  else ds.a11yText = s.text;

  if (s.contrast) ds.a11yContrast = 'true';
  else delete ds.a11yContrast;

  if (s.motion) ds.a11yMotion = 'true';
  else delete ds.a11yMotion;

  if (s.links) ds.a11yLinks = 'true';
  else delete ds.a11yLinks;
}

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(loadSettings);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    applySettings(settings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* storage unavailable */
    }
  }, [settings]);

  const close = useCallback((source: 'button' | 'escape' | 'outside') => {
    setOpen(false);
    if (source !== 'outside') {
      btnRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close('escape');
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        close('outside');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open, close]);

  const hasChanges =
    settings.text !== 'md' || settings.contrast || settings.motion || settings.links;

  return (
    <div
      ref={rootRef}
      className={`a11y${open ? ' is-open' : ''}`}
      data-widget="a11y"
    >
      <div
        ref={panelRef}
        className="a11y__panel"
        role="dialog"
        aria-label="Accessibility options"
        aria-hidden={!open}
        tabIndex={-1}
      >
        <header className="a11y__head">
          <span className="a11y__title">Accessibility</span>
          <button
            type="button"
            className="a11y__close"
            onClick={() => close('button')}
            aria-label="Close accessibility options"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </header>

        <div className="a11y__group" role="group" aria-label="Text size">
          <span className="a11y__label">TEXT SIZE</span>
          <div className="a11y__sizes">
            {TEXT_SIZES.map((item) => {
              const active = settings.text === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  className={`a11y__size${active ? ' is-on' : ''}`}
                  aria-pressed={active}
                  aria-label={item.hint}
                  onClick={() => setSettings((prev) => ({ ...prev, text: item.value }))}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <ul className="a11y__list">
          {SWITCHES.map((sw) => {
            const on = settings[sw.key];
            return (
              <li key={sw.key}>
                <button
                  type="button"
                  className={`a11y__switch${on ? ' is-on' : ''}`}
                  aria-pressed={on}
                  onClick={() => setSettings((prev) => ({ ...prev, [sw.key]: !prev[sw.key] }))}
                >
                  <span className="a11y__switch-text">
                    <span className="a11y__switch-label">{sw.label}</span>
                    <span className="a11y__switch-desc">{sw.desc}</span>
                  </span>
                  <span className="a11y__toggle" aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="a11y__reset"
          onClick={() => setSettings(DEFAULT_SETTINGS)}
          disabled={!hasChanges}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18.364 8.04928L17.6569 7.34217C14.5327 4.21798 9.46734 4.21798 6.34315 7.34217C3.21895 10.4664 3.21895 15.5317 6.34315 18.6559C9.46734 21.7801 14.5327 21.7801 17.6569 18.6559C19.4737 16.8391 20.234 14.3658 19.9377 11.9995M18.364 3.80664V8.04928H14.1213" />
          </svg>
          <span>Reset to default</span>
        </button>
      </div>

      <button
        ref={btnRef}
        type="button"
        className="a11y__button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Accessibility options"
        title="Accessibility options"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
            fill="var(--accent)"
            opacity="0.55"
          />
          <path
            d="M12.0002 9C13.1048 9 14.0002 8.10457 14.0002 7C14.0002 5.89543 13.1048 5 12.0002 5C10.8956 5 10.0002 5.89543 10.0002 7C10.0002 8.10457 10.8956 9 12.0002 9Z"
            fill="currentColor"
          />
          <path
            d="M6.29284 9.30945C5.91154 9.14785 5.4714 9.3259 5.30971 9.7072C5.148 10.0885 5.32605 10.5288 5.70739 10.6905L5.75338 10.7097C5.98193 10.8026 6.13459 10.8631 6.32498 10.9355C6.70531 11.08 7.23854 11.2726 7.85162 11.4654C8.84049 11.7765 10.088 12.1049 11.2502 12.2131V13.4522C11.2502 13.8837 11.1262 14.306 10.8928 14.6689L8.36931 18.5944C8.14532 18.9429 8.2462 19.4069 8.59463 19.6309C8.94305 19.8549 9.40709 19.754 9.63108 19.4056L12.0002 15.7203L14.3693 19.4056C14.5933 19.754 15.0573 19.8549 15.4058 19.6309C15.7542 19.4069 15.8551 18.9429 15.6311 18.5944L13.1075 14.6689C12.8742 14.306 12.7502 13.8837 12.7502 13.4522V12.2131C13.9124 12.1049 15.1599 11.7765 16.1488 11.4654C16.7619 11.2726 17.2951 11.08 17.6754 10.9355C17.8658 10.8631 18.0185 10.8026 18.1243 10.7599L18.2928 10.6906C18.6741 10.5289 18.8524 10.0885 18.6907 9.7072C18.529 9.3259 18.0887 9.1479 17.7074 9.30952L17.5625 9.36905C17.4653 9.40832 17.3223 9.465 17.1426 9.53328C16.7828 9.67002 16.2777 9.85241 15.6987 10.0346C14.5205 10.4052 13.1114 10.75 12.0002 10.75C10.8889 10.75 9.47991 10.4052 8.30172 10.0346C7.72264 9.85241 7.21763 9.67002 6.85776 9.53328C6.67806 9.465 6.53512 9.40832 6.43791 9.36905L6.29284 9.30945Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
}
