import { useState, type ImgHTMLAttributes } from 'react';
import { asset } from '../lib/utils';
import { ImageIcon } from './icons/Icons';
import './Img.css';

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  /** CSS aspect-ratio for the frame, e.g. "16 / 10". Prevents layout shift. */
  ratio?: string;
  /** Mark the frame as a placeholder (adds a visible label). */
  placeholder?: boolean;
  fit?: 'cover' | 'contain';
  eager?: boolean;
  frameClassName?: string;
}

/**
 * Image with a reserved aspect-ratio frame, lazy loading and a graceful
 * fallback panel if the file is missing or fails to load.
 */
export function Img({
  src,
  alt,
  ratio,
  placeholder,
  fit = 'cover',
  eager,
  frameClassName = '',
  className = '',
  ...rest
}: Props) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return (
    <span
      className={`img ${loaded ? 'is-loaded' : ''} ${frameClassName}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {failed ? (
        <span className="img__fallback" role="img" aria-label={`${alt} (image unavailable)`}>
          <ImageIcon size={26} />
          <span>Image unavailable</span>
        </span>
      ) : (
        <img
          src={asset(src)}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={`img__el img__el--${fit} ${className}`}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          {...rest}
        />
      )}
      {placeholder && !failed && <span className="img__tag">Placeholder</span>}
    </span>
  );
}
