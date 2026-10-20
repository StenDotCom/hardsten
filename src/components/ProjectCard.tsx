import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { Img } from './Img';
import { ArrowUpRight } from './icons/Icons';
import './ProjectCard.css';

interface Props {
  project: Project;
  variant?: 'flagship' | 'standard' | 'software' | 'compact';
}

export function ProjectCard({ project, variant = 'standard' }: Props) {
  const cover = project.gallery[0];
  const hasMedia = Boolean(cover) && !project.unavailableNote;
  const badgeClass =
    project.status === 'ongoing'
      ? 'badge badge--ongoing'
      : project.status === 'completed'
        ? 'badge badge--completed'
        : 'badge';

  return (
    <article className={`pcard pcard--${variant} ${!hasMedia ? 'pcard--no-media' : ''} card`}>
      {hasMedia && cover && (
        <Link
          to={`/projects/${project.slug}`}
          className="pcard__media"
          aria-label={`View details for ${project.title}`}
        >
          <Img
            src={cover.src}
            alt={cover.alt}
            ratio={variant === 'flagship' ? '16 / 9' : '16 / 10'}
            placeholder={cover.placeholder}
            fit={cover.placeholder ? 'cover' : 'contain'}
          />
          <span className="pcard__num">PROJECT {project.number}</span>
          <span className="pcard__count">{project.gallery.length} frames</span>
        </Link>
      )}

      <div className="pcard__body">
        <div className="pcard__top">
          <span className="eyebrow">
            {!hasMedia ? `PROJECT ${project.number} · ${project.category}` : project.category}
          </span>
          {project.statusLabel && <span className={badgeClass}>{project.statusLabel}</span>}
        </div>

        <h3 className="pcard__title">
          <Link to={`/projects/${project.slug}`}>{project.fullTitle}</Link>
        </h3>

        <p className="pcard__desc">{project.unavailableNote ?? project.summary}</p>

        {!project.unavailableNote && project.context.length > 0 && (
          <dl className="pcard__meta">
            {project.context.map((c) => (
              <div key={c.label} className="pcard__meta-item">
                <dt>{c.label}</dt>
                <dd>{c.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="pcard__foot">
          {!project.unavailableNote && project.technologies.length > 0 ? (
            <div className="pcard__tags" aria-label="Confirmed technologies">
              {project.technologies.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          ) : (
            <span className="pcard__kind">
              {project.unavailableNote
                ? 'Not Available for Now'
                : project.kind === 'hardware'
                  ? 'Hardware & Embedded'
                  : 'Academic Desktop Software'}
            </span>
          )}

          <Link to={`/projects/${project.slug}`} className="btn btn--ghost btn--sm pcard__cta">
            <span>View Project</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
