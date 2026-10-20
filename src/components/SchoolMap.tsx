import { useState } from 'react';
import { profile, schoolMap } from '../data/profile';
import { ArrowUpRight, MapPin } from './icons/Icons';
import './SchoolMap.css';

export function SchoolMap() {
  const [embedError, setEmbedError] = useState(false);
  const encoded = encodeURIComponent(schoolMap.query);
  const embedSrc = `https://www.google.com/maps?q=${encoded}&output=embed`;
  const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encoded}`;

  return (
    <section className="smap panel" aria-labelledby="map-heading">
      <div className="smap__head">
        <div>
          <span className="eyebrow">CAMPUS LOCATION</span>
          <h2 id="map-heading" className="smap__title">
            {profile.institution} — {schoolMap.campusLabel}
          </h2>
          <p className="smap__addr">
            <MapPin size={16} />
            <span>{schoolMap.addressLine}</span>
          </p>
        </div>

        <div className="smap__actions">
          <a
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary btn--sm"
          >
            <span>Open in Google Maps</span>
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      <div className="smap__frame card">
        {!embedError ? (
          <iframe
            title={`Google Map showing ${profile.institution} (${schoolMap.campusLabel})`}
            aria-label={`Interactive Google Map for ${profile.institution}, ${schoolMap.addressLine}`}
            src={embedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="smap__iframe"
            onError={() => setEmbedError(true)}
          />
        ) : (
          <div className="smap__fallback">
            <MapPin size={28} />
            <p>
              Map preview could not be loaded in this browser. Use the button below to view{' '}
              <strong>{profile.institution}</strong> directly on Google Maps.
            </p>
            <a
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--accent btn--sm"
            >
              <span>Open {profile.institution} in Google Maps</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
