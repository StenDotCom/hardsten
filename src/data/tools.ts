/**
 * TOOLS — "Daily Drivers" section on the Home page.
 * Add/remove tools or categories here. `icon` must be a key from
 * src/components/icons/ToolIcon.tsx (add new icons there if needed).
 */
export type ToolIconKey =
  | 'cpp'
  | 'python'
  | 'java'
  | 'html'
  | 'c'
  | 'claude'
  | 'codex'
  | 'vscode'
  | 'github'
  | 'supabase'
  | 'vercel'
  | 'kicad'
  | 'tinkercad'
  | 'arduino'
  | 'autocad'
  | 'sketchup'
  | 'figma'
  | 'canva'
  | 'word'
  | 'excel'
  | 'powerpoint';

export interface ToolCategory {
  label: string;
  tools: { name: string; icon: ToolIconKey }[];
}

export const toolCategories: ToolCategory[] = [
  {
    label: 'Programming Languages',
    tools: [
      { name: 'C++', icon: 'cpp' },
      { name: 'Python', icon: 'python' },
      { name: 'Java', icon: 'java' },
      { name: 'HTML', icon: 'html' },
      { name: 'C', icon: 'c' },
    ],
  },
  {
    label: 'Electronics & Prototyping',
    tools: [
      { name: 'KiCad Schematic', icon: 'kicad' },
      { name: 'Tinkercad', icon: 'tinkercad' },
      { name: 'Arduino IDE', icon: 'arduino' },
    ],
  },
  {
    label: 'Programming & Development',
    tools: [
      { name: 'Visual Studio Code', icon: 'vscode' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Supabase', icon: 'supabase' },
      { name: 'Vercel', icon: 'vercel' },
    ],
  },
  {
    label: 'AI-Assisted Development',
    tools: [
      { name: 'Claude Code', icon: 'claude' },
      { name: 'Codex', icon: 'codex' },
    ],
  },
  {
    label: 'Technical Drafting',
    tools: [
      { name: 'AutoCAD', icon: 'autocad' },
      { name: 'SketchUp', icon: 'sketchup' },
    ],
  },
  {
    label: 'Design & Creative',
    tools: [
      { name: 'Figma', icon: 'figma' },
      { name: 'Canva', icon: 'canva' },
    ],
  },
  {
    label: 'Productivity',
    tools: [
      { name: 'Microsoft Word', icon: 'word' },
      { name: 'Microsoft Excel', icon: 'excel' },
      { name: 'Microsoft PowerPoint', icon: 'powerpoint' },
    ],
  },
];
