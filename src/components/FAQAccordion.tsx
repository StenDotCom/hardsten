import { useState } from 'react';
import { faqs } from '../data/faqs';
import { ChevronDown } from './icons/Icons';
import './FAQAccordion.css';

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="faq panel" aria-labelledby="faq-heading">
      <div className="faq__intro">
        <span className="eyebrow">FREQUENTLY ASKED QUESTIONS</span>
        <h2 id="faq-heading" className="faq__title">
          Common Questions
        </h2>
        <p className="faq__lede">
          Straightforward answers about my Computer Engineering focus, the academic prototypes I
          build, and the student-level technical assistance I can offer.
        </p>
      </div>

      <ul className="faq__list">
        {faqs.map((item, idx) => {
          const isOpen = openIndex === idx;
          const btnId = `faq-btn-${idx}`;
          const panelId = `faq-panel-${idx}`;
          return (
            <li key={item.q} className={`faq__item card ${isOpen ? 'is-open' : ''}`}>
              <h3 className="faq__qwrap">
                <button
                  id={btnId}
                  type="button"
                  className="faq__question"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <span className="faq__num">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="faq__qtext">{item.q}</span>
                  <span className="faq__icon" aria-hidden="true">
                    <ChevronDown size={18} />
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                hidden={!isOpen}
                className="faq__answer"
              >
                <p>{item.a}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
