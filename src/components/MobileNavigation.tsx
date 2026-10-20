import { NavLink } from 'react-router-dom';
import { profile, socials, visitCounter } from '../data/profile';
import { navItems } from '../data/nav';
import { NavIcon } from './icons/NavIcon';
import { SocialIcon } from './icons/BrandIcons';
import { IdentityBadge, Moon, Sun } from './icons/Icons';
import { asset, useVisitCounter } from '../lib/utils';
import type { Theme } from '../lib/utils';
import './MobileNavigation.css';

interface Props {
  theme: Theme;
  onToggleTheme: () => void;
}

/**
 * Tablet & mobile layout (<1100px):
 *  1. Compact profile bar at the top of the page preserving avatar, name +
 *     identity badge, @Hardsten · live visits, social links and theme button.
 *  2. Fixed 5-item bottom pill tab bar modeled after the reference's `.tabbar`.
 */
export function MobileNavigation({ theme, onToggleTheme }: Props) {
  const visits = useVisitCounter();

  return (
    <>
      <header className="mhead" aria-label="Profile summary">
        <div className="mhead__inner">
          <div className="mhead__id">
            <img
              src={asset(profile.photo)}
              alt={profile.photoAlt}
              width={52}
              height={52}
              className="mhead__avatar"
            />
            <div className="mhead__who">
              <div className="mhead__name">
                <span>{profile.displayName}</span>
                <IdentityBadge size={16} />
              </div>
              <p className="mhead__meta">
                <span>{profile.username}</span>
                <span aria-hidden="true"> · </span>
                <span className="mhead__visits">
                  {visits.toLocaleString()} {visitCounter.label}
                </span>
              </p>
            </div>
          </div>

          <div className="mhead__actions">
            {socials.map((s) => (
              <a
                key={s.key}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mhead__btn"
                aria-label={`${s.label} (${s.handle})`}
              >
                <SocialIcon name={s.key} size={16} />
              </a>
            ))}
            <button
              type="button"
              className="mhead__btn"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </header>

      <nav className="tabbar" aria-label="Primary mobile navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.key}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => `tabbar__tab ${isActive ? 'is-active' : ''}`}
          >
            <NavIcon name={item.key} size={19} />
            <span className="tabbar__label">{item.short}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
