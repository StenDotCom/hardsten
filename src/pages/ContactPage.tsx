import { FAQAccordion } from '../components/FAQAccordion';
import { ContactSection } from '../components/ContactSection';
import { usePageMeta } from '../lib/utils';
import './ContactPage.css';

export function ContactPage() {
  usePageMeta(
    'FAQs / Contact',
    'Frequently asked questions and direct email & social contact details for Yestin Cruz (John Yestin F. Cruz).',
  );

  return (
    <div className="page contact-page">
      <header className="phead">
        <span className="eyebrow">FAQS / CONTACT</span>
        <h1 className="phead__title">Questions &amp; Direct Contact.</h1>
        <p className="phead__lede">
          Answers to common questions about my Computer Engineering projects and student-level
          technical assistance, followed by direct email and social links.
        </p>
      </header>

      <FAQAccordion />
      <ContactSection />
    </div>
  );
}
