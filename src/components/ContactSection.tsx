import { useState } from 'react';
import { profile, socials } from '../data/profile';
import { mailto } from '../lib/utils';
import { SocialIcon } from './icons/BrandIcons';
import { ArrowUpRight, Check, Copy, Mail } from './icons/Icons';
import './ContactSection.css';

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = profile.email;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2200);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  return (
    <section className="contact panel" aria-labelledby="contact-heading">
      <div className="contact__main card">
        <span className="eyebrow">DIRECT CONTACT</span>
        <h2 id="contact-heading" className="contact__title">
          Send an Email About a Project or Collaboration
        </h2>
        <p className="contact__desc">
          The most reliable way to reach me is directly by email. Whether you are an instructor,
          fellow student, recruiter, or someone looking for student-level help with a hardware
          prototype, embedded project, or AutoCAD layout, feel free to write.
        </p>

        <div className="contact__email-box">
          <div className="contact__email-meta">
            <span className="mono">Email address</span>
            <a
              href={mailto(profile.email, 'Project Inquiry — Yestin Cruz Portfolio')}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__email"
            >
              {profile.email}
            </a>
          </div>

          <div className="contact__cta-row">
            <a
              href={mailto(profile.email, 'Project Inquiry — Yestin Cruz Portfolio')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              <Mail size={17} />
              <span>Email Yestin Cruz</span>
            </a>

            <button type="button" className="btn btn--ghost" onClick={copyEmail}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Email Copied' : 'Copy Email'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="contact__socials">
        <div className="contact__id card">
          <span className="mono">Profile Summary</span>
          <strong>{profile.fullName}</strong>
          <p>
            {profile.program} ({profile.yearLevel}) · {profile.institution} · {profile.location}
          </p>
        </div>

        <ul className="contact__slist" aria-label="Social profiles">
          {socials.map((s) => (
            <li key={s.key}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__scard card"
              >
                <span className="contact__sicon">
                  <SocialIcon name={s.key} size={20} />
                </span>
                <span className="contact__stext">
                  <strong>{s.label}</strong>
                  <span>{s.url.replace(/^https?:\/\/(www\.)?/, '')}</span>
                </span>
                <ArrowUpRight size={17} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
