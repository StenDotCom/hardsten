import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ProfileSidebar } from './components/ProfileSidebar';
import { MobileNavigation } from './components/MobileNavigation';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetail } from './pages/ProjectDetail';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AccessibilityWidget } from './components/AccessibilityWidget';
import { useTheme } from './lib/utils';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

export function App() {
  const { theme, toggle } = useTheme();
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

  return (
    <BrowserRouter basename={basename}>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="shell">
        <ProfileSidebar theme={theme} onToggleTheme={toggle} />
        <MobileNavigation theme={theme} onToggleTheme={toggle} />

        <main id="main-content" className="shell__main" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faqs" element={<Navigate to="/contact" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <AccessibilityWidget />
      </div>
    </BrowserRouter>
  );
}
export default App;
