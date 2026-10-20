/**
 * SEMINAR & ORGANIZATION CERTIFICATES — shown in the About page gallery.
 */
export interface Certificate {
  id: string;
  file: string;
  type: 'image' | 'pdf';
  thumbnail?: string;
  title?: string;
  issuer?: string;
  date?: string;
  placeholder?: boolean;
}

export const certificates: Certificate[] = [
  {
    id: 'cert-01',
    file: 'images/certificates/01.png',
    type: 'image',
    title: 'Bioinformatics and Digital Science Information in the Philippine Context',
    issuer:
      'ICCT Colleges — College of Engineering & Digital Technology / Mathematics & Natural Sciences (Dr. Ian Kendrich Fontanilla)',
    date: 'March 3, 2026',
    placeholder: false,
  },
  {
    id: 'cert-02',
    file: 'images/certificates/02.png',
    type: 'image',
    title: 'Certificate of Membership — ICCT Engineering Society (IES)',
    issuer: 'ICCT Engineering Society (IES) · OSO Membership Day 2025',
    date: 'A.Y. 2024–2025 · 3rd Trimester',
    placeholder: false,
  },
  {
    id: 'cert-03',
    file: 'images/certificates/03.png',
    type: 'image',
    title:
      'Advancing Secure Networking for Smart Environment: Design, Threat Modeling, and Mitigation Strategies',
    issuer:
      'ICCT Colleges — College of Engineering & Digital Technology / Mathematics & Natural Sciences (Engr. Mark Anthony Melendrez)',
    date: 'March 3, 2026',
    placeholder: false,
  },
  {
    id: 'cert-04',
    file: 'images/certificates/04.png',
    type: 'image',
    title: 'Certificate of Membership — ICCT Engineering Society (IES)',
    issuer: 'ICCT Colleges — College of Engineering and Digital Technology (IES)',
    date: 'A.Y. 2023–2024 · 3rd Trimester',
    placeholder: false,
  },
  {
    id: 'cert-05',
    file: 'images/certificates/05.png',
    type: 'image',
    title:
      'Advancing Research and Development in IoT for Smart Environments: Innovations and Future Directions',
    issuer: 'ICCT Colleges — 12th Engineering Day (Engr. Mark Anthony V. Melendrez)',
    date: 'March 6, 2025',
    placeholder: false,
  },
  {
    id: 'cert-06',
    file: 'images/certificates/06.png',
    type: 'image',
    title: 'EDay@11 Innovate & Elevate: Unleashing the Power of Excellence',
    issuer:
      'ICCT Colleges — College of Engineering & Digital Technology / Mathematics and Natural Sciences Department',
    date: 'March 11, 2024',
    placeholder: false,
  },
  {
    id: 'cert-07',
    file: 'images/certificates/07.png',
    type: 'image',
    title: 'Certificate of Membership — ICpEP ICCT Chapter',
    issuer: 'ICCT Colleges Foundation Inc. · Institute of Computer Engineers of the Philippines',
    date: 'Valid until November 30, 2024',
    placeholder: false,
  },
  {
    id: 'cert-08',
    file: 'images/certificates/08.png',
    type: 'image',
    title: 'Certificate of Membership — ICCT Engineering Society (IES)',
    issuer: 'ICCT Colleges — College of Engineering and Digital Technology (IES)',
    date: 'A.Y. 2023–2024 · 3rd Trimester',
    placeholder: false,
  },
];
