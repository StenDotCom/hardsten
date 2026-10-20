import { Link, useParams } from 'react-router-dom';
import { getProject, projectsByNumber } from '../data/projects';
import { ProjectGallery } from '../components/ProjectGallery';
import { ArrowLeft, ArrowRight, Mail } from '../components/icons/Icons';
import { profile } from '../data/profile';
import { mailto, usePageMeta } from '../lib/utils';
import './ProjectDetail.css';

export function ProjectDetail() {
  const { slug = '' } = useParams<{ slug: string }>();
  const project = getProject(slug);

  usePageMeta(
    project ? `${project.title} (Project ${project.number})` : 'Project Not Found',
    project?.summary,
  );

  if (!project) {
    return (
      <div className="page">
        <div className="panel pdetail__missing">
          <span className="eyebrow">404 · PROJECT NOT FOUND</span>
          <h1>That project route could not be found.</h1>
          <p>Choose one of the portfolio projects from the Projects page.</p>
          <Link to="/projects" className="btn btn--primary">
            <ArrowLeft size={16} />
            <span>Back to Projects</span>
          </Link>
        </div>
      </div>
    );
  }

  const idx = projectsByNumber.findIndex((p) => p.slug === project.slug);
  const prevProject = projectsByNumber[(idx - 1 + projectsByNumber.length) % projectsByNumber.length];
  const nextProject = projectsByNumber[(idx + 1) % projectsByNumber.length];

  const badgeClass =
    project.status === 'ongoing'
      ? 'badge badge--ongoing'
      : project.status === 'completed'
        ? 'badge badge--completed'
        : 'badge';

  const isUnavailable = Boolean(project.unavailableNote);

  return (
    <article className="page pdetail">
      <nav className="pdetail__crumbs" aria-label="Breadcrumb">
        <Link to="/projects" className="btn btn--ghost btn--sm">
          <ArrowLeft size={15} />
          <span>All Projects</span>
        </Link>
        <span className="mono">
          Project {project.number} of {String(projectsByNumber.length).padStart(2, '0')}
        </span>
      </nav>

      <header className="pdetail__head">
        <div className="pdetail__badges">
          <span className="eyebrow">{project.category}</span>
          {project.statusLabel && <span className={badgeClass}>{project.statusLabel}</span>}
        </div>
        <h1 className="pdetail__title">{project.fullTitle}</h1>
        {!isUnavailable && <p className="pdetail__summary">{project.summary}</p>}
      </header>

      {project.gallery.length > 0 && !isUnavailable && (
        <div className="panel">
          <ProjectGallery images={project.gallery} projectTitle={project.title} />
        </div>
      )}

      <div className="pdetail__grid">
        <section className="card pdetail__box" aria-labelledby="overview-heading">
          <span className="eyebrow">PROJECT OVERVIEW</span>
          <h2 id="overview-heading" className="pdetail__h2">
            Description &amp; Context
          </h2>
          {isUnavailable ? (
            <p className="pdetail__unavail-note">{project.unavailableNote}</p>
          ) : (
            <>
              <div className="pdetail__prose">
                {project.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {project.notes && project.notes.length > 0 && (
                <ul className="pdetail__notes">
                  {project.notes.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              )}
            </>
          )}
        </section>

        <aside className="pdetail__side">
          <section className="card pdetail__box" aria-labelledby="facts-heading">
            <span className="eyebrow">SPECIFICATIONS</span>
            <h2 id="facts-heading" className="pdetail__h2">
              Project Context
            </h2>
            {isUnavailable ? (
              <p className="pdetail__unavail-note">{project.unavailableNote}</p>
            ) : (
              <dl className="pdetail__dl">
                <div>
                  <dt>Project Number</dt>
                  <dd>Project {project.number}</dd>
                </div>
                <div>
                  <dt>Category</dt>
                  <dd>{project.category}</dd>
                </div>
                {project.statusLabel && (
                  <div>
                    <dt>Status</dt>
                    <dd>{project.statusLabel}</dd>
                  </div>
                )}
                {project.context.map((c) => (
                  <div key={c.label}>
                    <dt>{c.label}</dt>
                    <dd>{c.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </section>

          <section className="card pdetail__box" aria-labelledby="tech-heading">
            <span className="eyebrow">CONFIRMED TECHNOLOGIES</span>
            <h2 id="tech-heading" className="pdetail__h2">
              Components &amp; Tools
            </h2>
            {isUnavailable ? (
              <p className="pdetail__unavail-note">{project.unavailableNote}</p>
            ) : (
              <>
                {project.technologies.length > 0 ? (
                  <div className="pdetail__tags">
                    {project.technologies.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="pdetail__muted">
                    Specific hardware modules, microcontrollers, or software libraries will be
                    listed here as confirmed from project documentation.
                  </p>
                )}

                {project.requestDetailsNote && (
                  <div className="pdetail__req">
                    <p className="pdetail__req-text">{project.requestDetailsNote}</p>
                    <a
                      href={mailto(
                        profile.email,
                        project.requestDetailsSubject ?? `Question about ${project.title}`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--primary btn--sm pdetail__req-btn"
                    >
                      <Mail size={15} />
                      <span>Email Yestin Cruz</span>
                    </a>
                  </div>
                )}
              </>
            )}
          </section>

          <section className="card pdetail__box" aria-labelledby="docs-heading">
            <span className="eyebrow">DOCUMENTATION &amp; MEDIA SLOTS</span>
            <h2 id="docs-heading" className="pdetail__h2">
              Prepared Sections
            </h2>
            {isUnavailable ? (
              <p className="pdetail__unavail-note">{project.unavailableNote}</p>
            ) : (
              <ul className="pdetail__doclist">
                {project.documentation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        </aside>
      </div>

      <footer className="panel pdetail__pager" aria-label="Adjacent projects">
        <Link to={`/projects/${prevProject.slug}`} className="card pdetail__pnav">
          <span className="mono">
            <ArrowLeft size={13} /> Previous · Project {prevProject.number}
          </span>
          <strong>{prevProject.title}</strong>
        </Link>

        <a
          href={mailto(profile.email, `Question about ${project.title}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary"
        >
          <Mail size={16} />
          <span>Ask About This Project</span>
        </a>

        <Link to={`/projects/${nextProject.slug}`} className="card pdetail__pnav pdetail__pnav--right">
          <span className="mono">
            Next · Project {nextProject.number} <ArrowRight size={13} />
          </span>
          <strong>{nextProject.title}</strong>
        </Link>
      </footer>
    </article>
  );
}
