/**
 * PROFILE & SITE SETTINGS
 * Edit this file to change your personal details, social links, profile photo,
 * the visit counter display and the Google Maps location.
 */

export const profile = {
  fullName: 'John Yestin F. Cruz',
  displayName: 'Yestin Cruz',
  firstName: 'Yestin',
  username: '@Hardsten',
  program: 'Computer Engineering',
  yearLevel: 'Fourth Year',
  institution: 'ICCT Colleges',
  institutionUrl: 'https://icct.edu.ph/',
  location: 'Philippines',
  email: 'yestincruz471@gmail.com',

  /**
   * PROFILE PHOTO
   * Path is relative to the /public folder.
   * 1. Put your photo at  public/images/profile/profile.jpg
   * 2. Change the value below to 'images/profile/profile.jpg'
   * While this points at the placeholder, the site labels it as a placeholder.
   */
  photo: 'images/profile/profile.jpg',
  photoIsPlaceholder: false,
  photoAlt: 'Portrait of John Yestin F. Cruz',
};

/**
 * VISIT COUNTER
 * This is a static, manually configured number — it is NOT live analytics.
 * If you later add a real analytics/counter service, set `source` to 'live'
 * and feed the tracked value into `value` (see README → Visitor counter).
 */
export const visitCounter = {
  value: 521,
  label: 'visits',
  source: 'live' as 'static' | 'live',
};

export type SocialKey = 'github' | 'facebook' | 'instagram';

export const socials: { key: SocialKey; label: string; handle: string; url: string }[] = [
  { key: 'github', label: 'GitHub', handle: 'StenDotCom', url: 'https://github.com/StenDotCom' },
  { key: 'facebook', label: 'Facebook', handle: 'cruuxxx', url: 'https://www.facebook.com/cruuxxx/' },
  { key: 'instagram', label: 'Instagram', handle: 'sten.com_', url: 'https://www.instagram.com/sten.com_/' },
];

/**
 * GOOGLE MAPS
 * ICCT Colleges has several campuses. The embed below uses a place search for
 * the verified main campus (V.V. Soliven Ave. II, San Isidro, Cainta, Rizal).
 * If you study at a different ICCT campus, change `query` and `campusLabel`,
 * e.g. query: 'ICCT Colleges Antipolo Campus'.
 */
export const schoolMap = {
  campusLabel: 'Main Campus · Cainta, Rizal',
  addressLine: 'V.V. Soliven Ave. II, San Isidro, Cainta, Rizal',
  query: 'ICCT Colleges Foundation, V.V. Soliven Avenue II, Cainta, Rizal',
};

export const site = {
  title: 'Yestin Cruz — Computer Engineering Portfolio',
  description:
    'Portfolio of John Yestin F. Cruz, a fourth-year Computer Engineering student at ICCT Colleges focused on embedded systems, electronics, hardware prototyping and automation.',
};
