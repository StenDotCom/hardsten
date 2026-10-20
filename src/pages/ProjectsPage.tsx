import { useState } from 'react';
import { projects, projectsByNumber, type Project } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { usePageMeta } from '../lib/utils';
import './ProjectsPage.css';

type Filter = 'all' | 'hardware' | 'software' | 'ongoing';

function chunkPairs(items: Project[]): Project[][] {
  const pairs: Project[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    pairs.push(items.slice(i, i + 2));
  }
  return pairs;
}

export function ProjectsPage() {
  usePageMeta(
    'Projects',
    'Hardware prototypes, embedded systems builds, and academic software projects by Yestin Cruz.',
  );

  const [filter, setFilter] = useState<Filter>('all');

  const hardwareProjects = projects.filter((p) => p.kind === 'hardware');
  const softwareProjects = projects.filter((p) => p.kind === 'software');
  const ongoingProjects = projects.filter((p) => p.status === 'ongoing');

  const [leadHardware, ...restHardware] = hardwareProjects;
  const hardwarePairs = chunkPairs(restHardware);

  return (
    <div className="page projects-page">
      <header className="phead">
        <span className="eyebrow">PROJECTS · HARDWARE &amp; EMBEDDED FOCUS</span>
        <h1 className="phead__title">
          Engineering Prototypes, Embedded Systems &amp; Academic Builds.
        </h1>
        <p className="phead__lede">
          My main work centers on physical hardware, electronics, embedded systems, and automation
          prototypes, complemented by academic desktop software. Open any project to inspect its
          context, documentation slots, and full image gallery.
        </p>

        <div className="projects-page__toolbar" role="tablist" aria-label="Filter projects">
          {(
            [
              ['all', `All Projects (${projectsByNumber.length})`],
              ['hardware', `Hardware & Embedded (${hardwareProjects.length})`],
              ['ongoing', `Ongoing (${ongoingProjects.length})`],
              ['software', `Desktop Software (${softwareProjects.length})`],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={filter === key}
              className={`projects-page__tab ${filter === key ? 'is-active' : ''}`}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      {filter === 'all' && (
        <>
          <section className="projects-page__sec" aria-labelledby="hw-heading">
            <div className="shead shead--row">
              <div>
                <span className="eyebrow">01 · PRIMARY FOCUS</span>
                <h2 id="hw-heading" className="shead__title">
                  Hardware, Embedded Systems &amp; Automation Prototypes
                </h2>
              </div>
              <span className="badge">{hardwareProjects.length} Hardware Builds</span>
            </div>

            <div className="panel projects-page__stack">
              {leadHardware && <ProjectCard project={leadHardware} variant="flagship" />}

              {hardwarePairs.map((pair) =>
                pair.length === 2 ? (
                  <div key={pair[0].slug} className="projects-page__pair">
                    <ProjectCard project={pair[0]} variant="standard" />
                    <ProjectCard project={pair[1]} variant="standard" />
                  </div>
                ) : (
                  <ProjectCard key={pair[0].slug} project={pair[0]} variant="flagship" />
                ),
              )}
            </div>
          </section>

          <section className="projects-page__sec" aria-labelledby="sw-heading">
            <div className="shead shead--row">
              <div>
                <span className="eyebrow">02 · ACADEMIC SOFTWARE</span>
                <h2 id="sw-heading" className="shead__title">
                  Desktop Software Application
                </h2>
              </div>
              <span className="badge">{softwareProjects.length} Academic System</span>
            </div>

            <div className="panel">
              {softwareProjects.map((p) => (
                <ProjectCard key={p.slug} project={p} variant="software" />
              ))}
            </div>
          </section>
        </>
      )}

      {filter !== 'all' && (
        <section className="panel projects-page__stack" aria-label="Filtered projects">
          {(filter === 'hardware'
            ? hardwareProjects
            : filter === 'software'
              ? softwareProjects
              : ongoingProjects
          ).map((p) => (
            <ProjectCard key={p.slug} project={p} variant="flagship" />
          ))}
        </section>
      )}
    </div>
  );
}
