import { useState } from 'react';
import { certificates } from '../data/certificates';
import type { GalleryImage } from '../data/projects';
import { Img } from './Img';
import { ImageLightbox } from './ImageLightbox';
import { Expand } from './icons/Icons';
import './CertificateGallery.css';

export function CertificateGallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const lightboxImages: GalleryImage[] = certificates.map((c, idx) => ({
    src: c.file,
    alt: c.title ? `Certificate: ${c.title}` : `Seminar certificate ${idx + 1}`,
    caption: c.title ?? `Certificate ${idx + 1}`,
    placeholder: false,
  }));

  return (
    <section className="certs panel" aria-labelledby="certs-heading">
      <div className="certs__head">
        <div>
          <span className="eyebrow">ACADEMIC SEMINARS &amp; WORKSHOPS</span>
          <h2 id="certs-heading" className="certs__title">
            School Seminar Certificates
          </h2>
        </div>
        <span className="badge">{certificates.length} Certificates</span>
      </div>

      <div className="certs__grid" role="list">
        {certificates.map((cert, index) => (
          <article key={cert.id} role="listitem" className="cert card">
            <div
              className="cert__media"
              onClick={() => setLightboxIdx(index)}
              style={{ cursor: 'pointer' }}
            >
              <Img
                src={cert.file}
                alt={cert.title ? `Certificate: ${cert.title}` : `Certificate ${index + 1}`}
                ratio="14 / 10"
                fit="contain"
              />
              <span className="cert__slot">{String(index + 1).padStart(2, '0')}</span>
            </div>

            <div className="cert__body">
              {cert.date && <span className="mono">{cert.date}</span>}
              {cert.title && <h3 className="cert__name">{cert.title}</h3>}
              {cert.issuer && <p className="cert__meta">{cert.issuer}</p>}

              <div className="cert__actions">
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={() => setLightboxIdx(index)}
                >
                  <Expand size={14} />
                  <span>View Certificate</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {lightboxIdx !== null && (
        <ImageLightbox
          images={lightboxImages}
          index={lightboxIdx}
          title="School Seminar Certificates"
          onClose={() => setLightboxIdx(null)}
          onChange={setLightboxIdx}
        />
      )}
    </section>
  );
}
