import {
  siArduino,
  siAutocad,
  siC,
  siCanva,
  siClaude,
  siCplusplus,
  siFacebook,
  siFigma,
  siGithub,
  siHtml5,
  siInstagram,
  siKicad,
  siOpenai,
  siOpenjdk,
  siPython,
  siSketchup,
  siSupabase,
  siTinkercad,
  siVercel,
} from 'simple-icons';
import type { ToolIconKey } from '../../data/tools';
import type { SocialKey } from '../../data/profile';

type Brand = { path: string; hex: string };

const brands: Partial<Record<ToolIconKey, Brand>> = {
  cpp: siCplusplus,
  python: siPython,
  java: { path: siOpenjdk.path, hex: 'E76F00' },
  html: siHtml5,
  c: { path: siC.path, hex: '283593' },
  claude: siClaude,
  codex: siOpenai,
  github: siGithub,
  supabase: siSupabase,
  vercel: siVercel,
  kicad: siKicad,
  tinkercad: siTinkercad,
  arduino: siArduino,
  autocad: siAutocad,
  sketchup: siSketchup,
  figma: siFigma,
  canva: siCanva,
};

/** Simplified letter-tile marks for apps not covered by simple-icons. */
function OfficeTile({ letter, color }: { letter: string; color: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="2" y="2" width="20" height="20" rx="5" fill={color} />
      <text
        x="12"
        y="16.6"
        textAnchor="middle"
        fontFamily="Poppins, Segoe UI, Arial, sans-serif"
        fontWeight="700"
        fontSize="13"
        fill="#fff"
      >
        {letter}
      </text>
    </svg>
  );
}

function VSCodeMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="#0065A9" d="M17.2 2.3 9.4 9.4 4.7 5.8 2.8 6.8v10.4l1.9 1 4.7-3.6 7.8 7.1 4-1.9V4.2z" />
      <path fill="#007ACC" d="M17.2 2.3v19.4l4-1.9V4.2z" />
      <path fill="#fff" d="M17.2 7.6 11.3 12l5.9 4.4z" opacity=".95" />
      <path fill="#1F9CF0" d="M4.7 9.2v5.6L7.6 12z" />
    </svg>
  );
}

export function ToolIcon({ icon }: { icon: ToolIconKey }) {
  if (icon === 'vscode') return <VSCodeMark />;
  if (icon === 'word') return <OfficeTile letter="W" color="#185ABD" />;
  if (icon === 'excel') return <OfficeTile letter="X" color="#107C41" />;
  if (icon === 'powerpoint') return <OfficeTile letter="P" color="#C43E1C" />;
  const b = brands[icon];
  if (!b) return null;
  // Near-black brand colours switch to currentColor so they stay visible in dark mode.
  const dark = ['181717', '191919', '000000', '412991'].includes(b.hex);
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={b.path} fill={dark ? 'currentColor' : `#${b.hex}`} />
    </svg>
  );
}

const socialBrands: Record<SocialKey, Brand> = {
  github: siGithub,
  facebook: siFacebook,
  instagram: siInstagram,
};

export function SocialIcon({ name, size = 18 }: { name: SocialKey; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={socialBrands[name].path} fill="currentColor" />
    </svg>
  );
}
