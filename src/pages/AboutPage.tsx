import { profile } from '../data/profile';
import { SchoolMap } from '../components/SchoolMap';
import { CertificateGallery } from '../components/CertificateGallery';
import { ArrowUpRight, IdentityBadge } from '../components/icons/Icons';
import { asset, usePageMeta } from '../lib/utils';
import './AboutPage.css';

export function AboutPage() {
  usePageMeta(
    'About',
    'About John Yestin F. Cruz — fourth-year Computer Engineering student at ICCT Colleges, academic summary, campus map, and school seminar certificates.',
  );

  return (
    <div className="page about-page">
      <header className="phead">
        <span className="eyebrow">ABOUT · ACADEMIC &amp; TECHNICAL PROFILE</span>
        <h1 className="phead__title">Hi, I&apos;m {profile.displayName}.</h1>
        <p className="phead__lede">
          {profile.fullName} · {profile.yearLevel} {profile.program} student at{' '}
          {profile.institution}.
        </p>
      </header>

      <section className="panel about-page__lead" aria-labelledby="about-intro-heading">
        <div className="about-page__bio card">
          <span className="eyebrow">INTRODUCTION</span>
          <h2 id="about-intro-heading" className="about-page__headline">
            Exploring how hardware and software work together through prototypes and engineering
            design.
          </h2>
          <p className="about-page__copy">
            I am a fourth-year Computer Engineering student at ICCT Colleges with interests in
            embedded systems, electronics, software development, and automation. I enjoy exploring
            how hardware and software work together through academic projects, practical
            experimentation, and prototype development. I aim to continue improving my engineering
            and development skills by building useful, well-designed technology solutions.
          </p>

          <ol className="about-page__pillars" aria-label="Core areas of focus">
            <li>
              <span className="mono">01</span>
              <strong>Embedded Systems &amp; Microcontrollers</strong>
              <span>Arduino-based control, sensor reading, and hardware-software integration</span>
            </li>
            <li>
              <span className="mono">02</span>
              <strong>Electronics &amp; Hardware Prototyping</strong>
              <span>Circuit schematic capture in KiCad, Tinkercad simulation, and physical assembly</span>
            </li>
            <li>
              <span className="mono">03</span>
              <strong>Automation &amp; Technical Drafting</strong>
              <span>Applied automation prototypes and AutoCAD floor/electrical layouts</span>
            </li>
          </ol>
        </div>

        <aside className="about-page__summary card" aria-labelledby="academic-summary-heading">
          <div className="about-page__idhead">
            <img
              src={asset(profile.photo)}
              alt={profile.photoAlt}
              width={72}
              height={72}
              className="about-page__avatar"
            />
            <div>
              <h2 id="academic-summary-heading" className="about-page__idname">
                <span>{profile.fullName}</span>
                <IdentityBadge size={17} />
              </h2>
              <p className="about-page__idsub">Academic &amp; Profile Summary</p>
            </div>
          </div>

          <dl className="about-page__dl">
            <div>
              <dt>Full Name</dt>
              <dd>{profile.fullName}</dd>
            </div>
            <div>
              <dt>Program</dt>
              <dd>{profile.program}</dd>
            </div>
            <div>
              <dt>Year Level</dt>
              <dd>{profile.yearLevel}</dd>
            </div>
            <div>
              <dt>Institution</dt>
              <dd>{profile.institution}</dd>
            </div>
            <div>
              <dt>Official School Website</dt>
              <dd>
                <a
                  href={profile.institutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tlink"
                >
                  icct.edu.ph <ArrowUpRight size={13} />
                </a>
              </dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{profile.location}</dd>
            </div>
          </dl>
        </aside>
      </section>

      <SchoolMap />

      <CertificateGallery />
    </div>
  );
}
