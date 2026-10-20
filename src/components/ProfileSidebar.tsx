import { NavLink } from 'react-router-dom';
import { profile, socials, visitCounter } from '../data/profile';
import { navItems } from '../data/nav';
import { NavIcon } from './icons/NavIcon';
import { SocialIcon } from './icons/BrandIcons';
import { IdentityBadge, Moon, Sun } from './icons/Icons';
import { asset } from '../lib/utils';
import type { Theme } from '../lib/utils';
import './ProfileSidebar.css';

interface Props {
  theme: Theme;
  onToggleTheme: () => void;
}

export function ProfileSidebar({ theme, onToggleTheme }: Props) {
  return (
    <aside className="rail" aria-label="Profile and primary navigation">
      <div className="rail__inner">
        <div className="rail__avatar-wrap">
          <div className="rail__avatar">
            <img
              src={asset(profile.photo)}
              alt={profile.photoAlt}
              width={180}
              height={180}
              loading="eager"
              decoding="async"
            />
          </div>
          {profile.photoIsPlaceholder && (
            <span className="rail__photo-tag" title="Replace images/profile/profile-placeholder.svg with your own portrait">
              Placeholder photo
            </span>
          )}
        </div>

        <div className="rail__name" title={`${profile.fullName} — decorative portfolio identity badge`}>
          <span>{profile.displayName}</span>
          <IdentityBadge size={18} />
        </div>

        <p className="rail__handle">
          <span>{profile.username}</span>
          <span
            className="rail__visits"
            title={
              visitCounter.source === 'live'
                ? 'Tracked visit count'
                : 'Initial static counter value (configurable in src/data/profile.ts)'
            }
          >
            {visitCounter.value.toLocaleString()} {visitCounter.label}
          </span>
        </p>

        <div className="rail__actions">
          <ul className="rail__socials" aria-label="Social media profiles">
            {socials.map((s) => (
              <li key={s.key}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rail__social"
                  aria-label={`${s.label} (${s.handle}) — opens in a new tab`}
                  title={`${s.label}: ${s.handle}`}
                >
                  <SocialIcon name={s.key} size={18} />
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="rail__theme"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <nav className="rail__nav" aria-label="Primary">
          <ul>
            {navItems.map((item) => (
              <li key={item.key}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `rail__link ${isActive ? 'active' : ''}`}
                >
                  <NavIcon name={item.key} size={20} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="rail__copy">
          <p>© {new Date().getFullYear()}</p>
          <p>{profile.displayName}. All rights reserved.</p>
        </div>
      </div>
    </aside>
  );
}
