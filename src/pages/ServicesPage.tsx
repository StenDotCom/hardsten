import { Link } from 'react-router-dom';
import { services, servicesDisclaimer } from '../data/services';
import { profile } from '../data/profile';
import { ServiceIcon } from '../components/icons/ServiceIcon';
import { ArrowRight, Check, Mail } from '../components/icons/Icons';
import { mailto, usePageMeta } from '../lib/utils';
import './ServicesPage.css';

export function ServicesPage() {
  usePageMeta(
    'Services',
    'Student-level technical assistance by Yestin Cruz in hardware prototyping, embedded systems, electronics & automation, academic engineering projects, and AutoCAD drafting.',
  );

  return (
    <div className="page services-page">
      <header className="phead">
        <span className="eyebrow">SERVICES · STUDENT-LEVEL TECHNICAL ASSISTANCE</span>
        <h1 className="phead__title">
          Hardware Prototyping, Embedded Systems &amp; Technical Planning.
        </h1>
        <p className="phead__lede">
          Areas where I can assist fellow students, project teams, and collaborators on
          hardware-oriented builds, microcontroller prototypes, technical documentation, and AutoCAD
          layouts.
        </p>
      </header>

      {/* Reference-inspired 3-step workflow banner */}
      <section className="panel services-page__flow" aria-labelledby="flow-heading">
        <div className="services-page__flow-intro">
          <span className="eyebrow">HOW WE WORK TOGETHER</span>
          <h2 id="flow-heading" className="services-page__flow-title">
            Scope. Prototype. Document.
          </h2>
          <p>
            A clear, practical workflow suited for school prototypes, demonstrations, and student
            engineering projects.
          </p>
        </div>

        <ol className="services-page__steps">
          <li className="card services-page__step">
            <span className="services-page__step-num">01</span>
            <h3>Scope &amp; Schematic</h3>
            <p>
              Clarify what the project needs to demonstrate, review available components, and draft
              the block diagram, schematic, or layout.
            </p>
          </li>
          <li className="card services-page__step">
            <span className="services-page__step-num">02</span>
            <h3>Assemble &amp; Integrate</h3>
            <p>
              Wire sensors, microcontrollers, and actuators on breadboard or prototype hardware and
              write the control logic.
            </p>
          </li>
          <li className="card services-page__step">
            <span className="services-page__step-num">03</span>
            <h3>Test &amp; Document</h3>
            <p>
              Verify behavior against the project objectives and organize clear diagrams, CAD sheets,
              or documentation for presentation.
            </p>
          </li>
        </ol>
      </section>

      {/* Five required service cards */}
      <section className="panel services-page__wrap" aria-labelledby="services-grid-heading">
        <div className="shead shead--row">
          <div>
            <span className="eyebrow">WHAT I CAN ASSIST WITH</span>
            <h2 id="services-grid-heading" className="shead__title">
              Five Focus Areas (A – E)
            </h2>
          </div>
          <span className="badge">Student-Level Capability</span>
        </div>

        <div className="services-page__grid">
          {services.map((s, idx) => (
            <article key={s.id} className="card scard">
              <div className="scard__top">
                <span className="scard__icon">
                  <ServiceIcon name={s.icon} size={26} />
                </span>
                <span className="mono">
                  {s.letter} · 0{idx + 1} / 0{services.length}
                </span>
              </div>

              <h3 className="scard__title">{s.title}</h3>
              <p className="scard__desc">{s.description}</p>

              <span className="badge scard__tag">{s.tag}</span>

              <ul className="scard__list">
                {s.points.map((pt) => (
                  <li key={pt}>
                    <Check size={14} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <div className="note" role="note">
        <div>
          <strong>Honest capability note:</strong> {servicesDisclaimer}
        </div>
      </div>

      <section className="panel services-page__cta" aria-label="Inquire about a project">
        <div>
          <span className="eyebrow">GET IN TOUCH</span>
          <h2>Need help with a school prototype or technical drawing?</h2>
          <p>
            Send a brief outline of your project and timeline, or browse my completed and ongoing
            builds first.
          </p>
        </div>
        <div className="services-page__cta-btns">
          <a
            href={mailto(profile.email, 'Student Engineering Assistance Inquiry')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
          >
            <Mail size={16} />
            <span>Email Me</span>
          </a>
          <Link to="/projects" className="btn btn--ghost">
            <span>See My Projects</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
