import { useState } from 'react';
import type { GalleryImage } from '../data/projects';
import { Img } from './Img';
import { ImageLightbox } from './ImageLightbox';
import { Expand } from './icons/Icons';
import './ProjectGallery.css';

interface Props {
  images: GalleryImage[];
  projectTitle: string;
}

export function ProjectGallery({ images, projectTitle }: Props) {
  const [active, setActive] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images.length) return null;
  const featured = images[active] ?? images[0];

  return (
    <div className="pgal">
      <div className="pgal__main card">
        <button
          type="button"
          className="pgal__stage"
          onClick={() => setLightboxIndex(active)}
          aria-label={`Enlarge ${featured.caption ?? 'project image'} (${active + 1} of ${images.length})`}
        >
          <Img
            src={featured.src}
            alt={featured.alt}
            ratio="16 / 10"
            placeholder={featured.placeholder}
            fit={featured.placeholder ? 'cover' : 'contain'}
            eager
          />
          <span className="pgal__zoom">
            <Expand size={15} />
            <span>Enlarge ({active + 1}/{images.length})</span>
          </span>
        </button>

        <div className="pgal__caption">
          <div>
            <span className="mono">{String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
            {featured.caption && <strong className="pgal__cap-title">{featured.caption}</strong>}
          </div>
        </div>
      </div>

      {images.length > 1 && (
        <div className="pgal__grid" role="list" aria-label={`${projectTitle} image gallery`}>
          {images.map((img, i) => (
            <div
              key={img.src + i}
              role="listitem"
              className={`pgal__item card ${i === active ? 'is-selected' : ''}`}
            >
              <button
                type="button"
                className="pgal__thumb"
                onClick={() => setActive(i)}
                onDoubleClick={() => setLightboxIndex(i)}
                aria-label={`Select ${img.caption ?? `image ${i + 1}`}`}
                aria-pressed={i === active}
              >
                <Img
                  src={img.src}
                  alt={img.alt}
                  ratio="16 / 10"
                  placeholder={img.placeholder}
                  fit={img.placeholder ? 'cover' : 'contain'}
                />
              </button>
              <div className="pgal__item-bar">
                <span className="pgal__item-cap">{img.caption ?? `Image ${i + 1}`}</span>
                <button
                  type="button"
                  className="pgal__item-open"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Enlarge ${img.caption ?? `image ${i + 1}`}`}
                >
                  <Expand size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {lightboxIndex !== null && (
        <ImageLightbox
          images={images}
          index={lightboxIndex}
          title={projectTitle}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}
    </div>
  );
}
