import { Link } from 'react-router-dom';
import { projectsByNumber } from '../data/projects';
import { services } from '../data/services';
import { ArrowUpRight } from './icons/Icons';
import { Img } from './Img';
import './HeroSection.css';

export function HeroSection() {
  const featured = projectsByNumber.filter((p) => p.gallery.length > 0).slice(0, 2);
  const hardwareCount = projectsByNumber.filter((p) => p.kind === 'hardware').length;
  const softwareCount = projectsByNumber.filter((p) => p.kind === 'software').length;

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__head">
        <div className="hero__title-row">
          <div>
            <h1 id="hero-heading" className="hero__title">
              Engineering Ideas Into Working Prototypes.
            </h1>
          </div>

          <div className="hero__ctas">
            <Link to="/contact" className="btn btn--ghost">
              <span>Contact Me</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Reference-inspired showcase panel: live previews of Projects, Services, About */}
      <div className="panel hero__showcase">
        <div className="hero__bento">
          <div className="hero__right">
            <div className="hero__pbox card">
              <div className="hero__boxhead">
                <div>
                  <span className="eyebrow">Hardware &amp; Software Builds</span>
                  <h2 className="hero__boxtitle">Engineering Projects</h2>
                  <p className="hero__boxdesc">
                    {hardwareCount} hardware &amp; embedded prototypes and {softwareCount} desktop
                    software system built during my Computer Engineering coursework.
                  </p>
                </div>
                <Link to="/projects" className="btn btn--ghost btn--sm">
                  <span>All {projectsByNumber.length} Projects</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>

              <div className="hero__pmini-grid">
                {featured.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/projects/${p.slug}`}
                    className="hero__pmini"
                  >
                    <Img
                      src={p.gallery[0].src}
                      alt={p.gallery[0].alt}
                      ratio="16 / 9"
                      placeholder={p.gallery[0].placeholder}
                      fit={p.gallery[0].placeholder ? 'cover' : 'contain'}
                    />
                    <div className="hero__pmini-body">
                      <span className="mono">Project {p.number} · {p.category}</span>
                      <strong>{p.title}</strong>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="hero__subgrid">
              <div className="hero__sbox card">
                <div className="hero__boxhead">
                  <div>
                    <span className="eyebrow">Technical Assistance</span>
                    <h2 className="hero__boxtitle">Services</h2>
                  </div>
                  <Link to="/services" className="tlink">
                    View all
                  </Link>
                </div>
                <ul className="hero__slist">
                  {services.map((s, idx) => (
                    <li key={s.id}>
                      <Link to="/services" className="hero__srow">
                        <span className="hero__sletter">{s.letter}</span>
                        <span className="hero__sname">{s.title}</span>
                        <span className="mono">0{idx + 1}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hero__abox card">
                <span className="eyebrow">Profile &amp; Background</span>
                <h2 className="hero__boxtitle">About &amp; Seminars</h2>
                <p className="hero__boxdesc">
                  Fourth-year Computer Engineering student at ICCT Colleges focusing on practical
                  hardware-software experimentation, technical drafting, and prototype builds.
                </p>
                <dl className="hero__afacts">
                  <div>
                    <dt>Focus</dt>
                    <dd>Embedded Systems &amp; Electronics</dd>
                  </div>
                  <div>
                    <dt>Drafting</dt>
                    <dd>KiCad · AutoCAD · SketchUp · Tinkercad</dd>
                  </div>
                </dl>
                <div className="hero__aactions">
                  <Link to="/about" className="btn btn--ghost btn--sm">
                    <span>About &amp; Certificates</span>
                    <ArrowUpRight size={14} />
                  </Link>
                  <Link to="/contact" className="tlink">
                    FAQs / Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
