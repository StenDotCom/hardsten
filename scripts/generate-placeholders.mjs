// Generates clearly-labelled neutral placeholder images (SVG) for the profile
// photo, every project gallery slot and every certificate slot.
// These are NOT photographs. Replace them with your real files and update the
// paths in src/data/*.ts. Run with:  npm.cmd run placeholders
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const ICONS = {
  camera:
    '<path d="M-46 -22h20l8-12h36l8 12h20a8 8 0 0 1 8 8v44a8 8 0 0 1-8 8h-92a8 8 0 0 1-8-8v-44a8 8 0 0 1 8-8z" /><circle cx="0" cy="8" r="20" />',
  chip:
    '<rect x="-32" y="-32" width="64" height="64" rx="6" /><rect x="-16" y="-16" width="32" height="32" rx="3" /><path d="M-20 -32v-14M-6 -32v-14M8 -32v-14M22 -32v-14M-20 32v14M-6 32v14M8 32v14M22 32v14M-32 -20h-14M-32 -6h-14M-32 8h-14M-32 22h-14M32 -20h14M32 -6h14M32 8h14M32 22h14" />',
  diagram:
    '<rect x="-60" y="-34" width="40" height="28" rx="4" /><rect x="20" y="-34" width="40" height="28" rx="4" /><rect x="-20" y="18" width="40" height="28" rx="4" /><path d="M-20 -20h40M-40 -6v38h20M40 -6v38h-20" />',
  screen:
    '<rect x="-60" y="-40" width="120" height="76" rx="6" /><path d="M-60 -24h120M-24 52h48M0 36v16" /><circle cx="-50" cy="-32" r="2" /><circle cx="-42" cy="-32" r="2" />',
  doc:
    '<path d="M-30 -46h40l20 20v72h-60z" /><path d="M10 -46v20h20M-18 -6h36M-18 8h36M-18 22h24" />',
  cert:
    '<rect x="-62" y="-42" width="124" height="84" rx="4" /><rect x="-54" y="-34" width="108" height="68" rx="2" /><path d="M-34 -14h68M-24 0h48" /><circle cx="0" cy="22" r="8" />',
  user:
    '<circle cx="0" cy="-14" r="24" /><path d="M-44 50c4-26 22-40 44-40s40 14 44 40" />',
};

function svg({ w, h, kicker, title, note, icon }) {
  const cx = w / 2;
  const cy = h / 2 - 40;
  const grid = [];
  for (let x = 0; x <= w; x += 40) grid.push(`<path d="M${x} 0V${h}" />`);
  for (let y = 0; y <= h; y += 40) grid.push(`<path d="M0 ${y}H${w}" />`);
  const m = 28; // corner marks
  const corners = `M${m} ${m + 36}V${m}h36 M${w - m - 36} ${m}h36v36 M${w - m} ${h - m - 36}v36h-36 M${m + 36} ${h - m}h-36v-36`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(`Placeholder: ${title}`)}">
  <rect width="${w}" height="${h}" fill="#E9EDF3"/>
  <g stroke="#0B1E3F" stroke-opacity=".06" stroke-width="1">${grid.join('')}</g>
  <path d="${corners}" fill="none" stroke="#0B1E3F" stroke-opacity=".28" stroke-width="2"/>
  <g transform="translate(${cx} ${cy}) scale(1.25)" fill="none" stroke="#0B1E3F" stroke-opacity=".45" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${ICONS[icon]}</g>
  <text x="${cx}" y="${cy + 120}" text-anchor="middle" font-family="ui-monospace, Consolas, monospace" font-size="20" letter-spacing="5" fill="#0059B3">${esc(kicker)}</text>
  <text x="${cx}" y="${cy + 168}" text-anchor="middle" font-family="Poppins, Segoe UI, Arial, sans-serif" font-size="38" font-weight="600" fill="#0B1E3F">${esc(title)}</text>
  <text x="${cx}" y="${cy + 212}" text-anchor="middle" font-family="ui-monospace, Consolas, monospace" font-size="18" fill="#5A6479">${esc(note)}</text>
</svg>
`;
}

function write(rel, content) {
  const file = join(root, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
  console.log('wrote', rel);
}

// Profile
write(
  'profile/profile-placeholder.svg',
  svg({ w: 800, h: 800, kicker: 'PHOTO PLACEHOLDER', title: 'Your portrait here', note: 'images/profile/', icon: 'user' }),
);

// Projects
const projects = {
  'gsm-home-security': [
    ['01-prototype', 'Overall prototype', 'camera'],
    ['02-circuit', 'Circuit & electronics', 'chip'],
    ['03-assembly', 'Hardware assembly', 'camera'],
    ['04-diagram', 'System diagram', 'diagram'],
  ],
  'icct-cslms': [
    ['01-dashboard', 'Dashboard screenshot', 'screen'],
    ['02-inventory', 'Inventory screen', 'screen'],
    ['03-diagram', 'System diagram', 'diagram'],
  ],
  bedguard: [
    ['01-prototype', 'Full prototype', 'camera'],
    ['02-sensors', 'Sensors & electronics', 'chip'],
    ['03-assembly', 'Hardware assembly', 'camera'],
    ['04-diagram', 'System diagram', 'diagram'],
  ],
  'three-floor-elevator': [
    ['01-prototype', 'Physical prototype', 'camera'],
    ['02-structure', 'Mechanical structure', 'camera'],
    ['03-electronics', 'Electronics & control', 'chip'],
    ['04-demo', 'Demonstration', 'camera'],
  ],
  'smart-shoe-care': [
    ['01-concept', 'Design concept', 'doc'],
    ['02-cad', 'CAD drawing', 'diagram'],
    ['03-progress', 'Build progress', 'camera'],
  ],
};
for (const [slug, shots] of Object.entries(projects)) {
  for (const [name, title, icon] of shots) {
    write(
      `projects/${slug}/placeholder-${name}.svg`,
      svg({ w: 1600, h: 1000, kicker: 'PLACEHOLDER · NOT A PROJECT PHOTO', title, note: `images/projects/${slug}/`, icon }),
    );
  }
}

// Certificates (one shared placeholder is enough)
write(
  'certificates/certificate-placeholder.svg',
  svg({ w: 1400, h: 1000, kicker: 'CERTIFICATE PLACEHOLDER', title: 'Certificate file pending', note: 'images/certificates/', icon: 'cert' }),
);
