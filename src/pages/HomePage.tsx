import { HeroSection } from '../components/HeroSection';
import { ToolsSection } from '../components/ToolsSection';
import { usePageMeta } from '../lib/utils';

export function HomePage() {
  usePageMeta(
    'Home',
    'Yestin Cruz (John Yestin F. Cruz) — Fourth-year Computer Engineering student at ICCT Colleges focused on embedded systems, electronics, hardware prototyping, and automation.',
  );

  return (
    <div className="page">
      <HeroSection />
      <ToolsSection />
    </div>
  );
}
