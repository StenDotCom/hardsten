import { useEffect, useRef, useState } from 'react';
import type { GalleryImage } from '../data/projects';
import { asset } from '../lib/utils';
import { ChevronLeft, ChevronRight, Close } from './icons/Icons';
import './ImageLightbox.css';

interface Props {
  images: GalleryImage[];
  index: number;
  title?: string;
  onClose: () => void;
  onChange: (nextIndex: number) => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.25;

export function ImageLightbox({ images, index, title, onClose, onChange }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  const total = images.length;
  const current = images[index];

  const resetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const applyZoom = (nextZoom: number) => {
    const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(nextZoom.toFixed(2))));
    setZoom(clamped);
    if (clamped <= 1) {
      setPan({ x: 0, y: 0 });
    }
  };

  const prev = () => onChange((index - 1 + total) % total);
  const next = () => onChange((index + 1) % total);

  // Reset zoom and pan when changing image
  useEffect(() => {
    resetZoom();
  }, [index]);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft' && total > 1) {
        e.preventDefault();
        prev();
      } else if (e.key === 'ArrowRight' && total > 1) {
        e.preventDefault();
        next();
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setZoom((z) => Math.min(MAX_ZOOM, Number((z + ZOOM_STEP).toFixed(2))));
      } else if (e.key === '-') {
        e.preventDefault();
        setZoom((z) => {
          const nextZ = Math.max(MIN_ZOOM, Number((z - ZOOM_STEP).toFixed(2)));
          if (nextZ <= 1) setPan({ x: 0, y: 0 });
          return nextZ;
        });
      } else if (e.key === '0') {
        e.preventDefault();
        resetZoom();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, total]);

  // Non-passive mouse wheel zoom on the image stage
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
      setZoom((prevZ) => {
        const nextZ = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number((prevZ + delta).toFixed(2))));
        if (nextZ <= 1) {
          setPan({ x: 0, y: 0 });
        }
        return nextZ;
      });
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  if (!current) return null;

  return (
    <div
      className="lbox"
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title} — image ${index + 1} of ${total}` : `Image ${index + 1} of ${total}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="lbox__dialog"
        onTouchStart={(e) => {
          if (zoom > 1) return;
          touchStartX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          if (zoom > 1) return;
          const start = touchStartX.current;
          const end = e.changedTouches[0]?.clientX ?? null;
          if (start != null && end != null && Math.abs(end - start) > 45 && total > 1) {
            if (end < start) next();
            else prev();
          }
          touchStartX.current = null;
        }}
      >
        <header className="lbox__bar">
          <div className="lbox__meta">
            <span className="lbox__count">
              {index + 1} / {total}
            </span>
            {current.caption && (
              <span className="lbox__cap" title={current.caption}>
                {current.caption}
              </span>
            )}
            {current.placeholder && <span className="lbox__phtag">Placeholder</span>}
          </div>

          <div className="lbox__actions">
            <div className="lbox__zoom-ctrl" aria-label="Zoom controls">
              <button
                type="button"
                className="lbox__zbtn"
                onClick={() => applyZoom(zoom - ZOOM_STEP)}
                disabled={zoom <= MIN_ZOOM}
                aria-label="Zoom out"
                title="Zoom out (Scroll down)"
              >
                −
              </button>
              <button
                type="button"
                className="lbox__zval"
                onClick={resetZoom}
                title="Click to reset zoom (100%)"
                aria-label={`Current zoom ${Math.round(zoom * 100)}%, click to reset`}
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                type="button"
                className="lbox__zbtn"
                onClick={() => applyZoom(zoom + ZOOM_STEP)}
                disabled={zoom >= MAX_ZOOM}
                aria-label="Zoom in"
                title="Zoom in (Scroll up)"
              >
                +
              </button>
            </div>

            <button
              ref={closeRef}
              type="button"
              className="lbox__close"
              onClick={onClose}
              aria-label="Close enlarged view (Escape)"
              title="Close (Esc)"
            >
              <Close size={18} />
            </button>
          </div>
        </header>

        <div
          ref={stageRef}
          className={`lbox__stage ${zoom > 1 ? 'is-zoomed' : ''} ${dragging ? 'is-dragging' : ''}`}
          onMouseDown={(e) => {
            if (zoom <= 1) return;
            e.preventDefault();
            setDragging(true);
            dragStart.current = {
              x: e.clientX,
              y: e.clientY,
              panX: pan.x,
              panY: pan.y,
            };
          }}
          onMouseMove={(e) => {
            if (!dragging || zoom <= 1) return;
            const dx = e.clientX - dragStart.current.x;
            const dy = e.clientY - dragStart.current.y;
            setPan({
              x: dragStart.current.panX + dx,
              y: dragStart.current.panY + dy,
            });
          }}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
          onTouchStart={(e) => {
            if (zoom <= 1 || e.touches.length !== 1) return;
            const t = e.touches[0];
            setDragging(true);
            dragStart.current = {
              x: t.clientX,
              y: t.clientY,
              panX: pan.x,
              panY: pan.y,
            };
          }}
          onTouchMove={(e) => {
            if (!dragging || zoom <= 1 || e.touches.length !== 1) return;
            const t = e.touches[0];
            const dx = t.clientX - dragStart.current.x;
            const dy = t.clientY - dragStart.current.y;
            setPan({
              x: dragStart.current.panX + dx,
              y: dragStart.current.panY + dy,
            });
          }}
          onTouchEnd={() => setDragging(false)}
          onDoubleClick={() => {
            if (zoom > 1) resetZoom();
            else applyZoom(2);
          }}
        >
          {total > 1 && (
            <button
              type="button"
              className="lbox__arrow lbox__arrow--prev"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <figure className="lbox__figure">
            <img
              src={asset(current.src)}
              alt={current.alt}
              className="lbox__img"
              draggable={false}
              style={{
                transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
              }}
            />
          </figure>

          {total > 1 && (
            <button
              type="button"
              className="lbox__arrow lbox__arrow--next"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {total > 1 && (
          <div className="lbox__thumbs" role="tablist" aria-label="Gallery thumbnails">
            {images.map((img, i) => (
              <button
                key={img.src + i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={img.caption ? `Show ${img.caption}` : `Show image ${i + 1}`}
                className={`lbox__thumb ${i === index ? 'is-active' : ''}`}
                onClick={() => onChange(i)}
              >
                <img src={asset(img.src)} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
