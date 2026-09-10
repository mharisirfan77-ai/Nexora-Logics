import React, { useEffect } from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
import { Navbar } from './components/public/Navbar';
import { Footer } from './components/public/Footer';
import { ProjectModal } from './components/public/ProjectModal';
import { Toast } from './components/public/Toast';
import { CustomCursor } from './components/public/CustomCursor';
import { MarqueeTicker } from './components/public/MarqueeTicker';
import { ClientLogos } from './components/public/ClientLogos';
import { DynamicPage } from './pages/DynamicPage';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './components/admin/AdminLogin';

const MainRouter = () => {
  const { data, currentPath, isAdminAuthenticated } = useCMS();
  const { themes = [], activeThemeId, themeConfig = {}, pages = [] } = data;
  const activeTheme = themes.find((t) => t.id === activeThemeId) || themes[0] || {};

  // Dynamically apply active theme color variables, light/dark modes, and fonts to the root DOM
  useEffect(() => {
    const root = document.documentElement;
    const primary = activeTheme.colors?.primaryAccent || themeConfig.primaryAccent || '#2E7A9E';
    const secondary = activeTheme.colors?.secondaryAccent || themeConfig.secondaryAccent || '#1F5C79';
    const amber = activeTheme.colors?.amberAccent || themeConfig.amberAccent || '#1B3F63';
    const bgTheme = activeTheme.colors?.bgTheme || themeConfig.bgTheme || '#0B0B0C';
    const fontHeading = activeTheme.typography?.fontHeading || themeConfig.fontHeading || "'Archivo', -apple-system, sans-serif";
    const fontBody = activeTheme.typography?.fontBody || themeConfig.fontBody || "'Inter', -apple-system, sans-serif";
    const borderRadius = themeConfig.borderRadius || '999px';

    root.style.setProperty('--lime', primary);
    root.style.setProperty('--lime-deep', secondary);
    root.style.setProperty('--violet', secondary);
    root.style.setProperty('--amber', amber);
    root.style.setProperty('--navy', amber);
    root.style.setProperty('--bg-dark', bgTheme);
    root.style.setProperty('--ink', bgTheme);
    root.style.setProperty('--surface', '#161616');
    root.style.setProperty('--surface-2', '#1D1D1D');
    root.style.setProperty('--line', '#2A2A2A');
    root.style.setProperty('--grey', '#A6A6A6');
    root.style.setProperty('--grey-2', '#707070');
    document.body.style.backgroundColor = bgTheme;

    root.style.setProperty('--radius-md', borderRadius);
    root.style.setProperty('--font-heading', fontHeading);
    root.style.setProperty('--font-body', fontBody);

    // Light background detection & color adaptations
    const isLightBg = bgTheme && ['#f8fafc', '#ffffff', '#f1f5f9', '#f3f4f6'].includes(bgTheme.toLowerCase());
    if (isLightBg) {
      root.style.setProperty('--text-main', '#0F172A');
      root.style.setProperty('--slate', '#475569');
      root.style.setProperty('--mist', '#334155');
      root.style.setProperty('--card-bg', '#FFFFFF');
      root.style.setProperty('--card-border', '#E2E8F0');
      document.body.style.color = '#0F172A';
    } else {
      root.style.setProperty('--text-main', '#FFFFFF');
      root.style.setProperty('--slate', '#A6A6A6');
      root.style.setProperty('--mist', '#A6A6A6');
      root.style.setProperty('--card-bg', activeTheme.colors?.cardBg || themeConfig.cardBg || '#161616');
      root.style.setProperty('--card-border', '#2A2A2A');
      document.body.style.color = '#FFFFFF';
    }
  }, [themeConfig, activeTheme]);

  // Normalize path for secret admin slug check
  const normalizedPath = currentPath.replace(/\/$/, '').toLowerCase();
  const isAdminPath = normalizedPath === '/nexora_logics_admin';
  const isUpworkPage = normalizedPath === '/upwork-outreach' || normalizedPath === '/upwork-outreach-management';

  if (isAdminPath) {
    if (!isAdminAuthenticated) {
      return (
        <>
          <AdminLogin />
          <Toast />
        </>
      );
    }
    return (
      <>
        <AdminLayout />
        <Toast />
      </>
    );
  }

  // Find matching page object from CMS pages registry (dynamic system or custom pages)
  const matchedPage = pages.find(
    (p) => p.slug.toLowerCase().replace(/\/$/, '') === normalizedPath
  ) || pages.find((p) => p.slug === '/');

  const themeCssToInject = activeTheme.cssContent || themeConfig.customCss || '';

  return (
    <div className="public-app">
      {/* Extracted Theme CSS & Custom Overrides injected dynamically */}
      {themeCssToInject && (
        <style id="wp-active-theme-styles">{themeCssToInject}</style>
      )}

      <CustomCursor />
      {!isUpworkPage && <Navbar />}
      <main style={{ minHeight: '80vh' }}>
        <DynamicPage page={matchedPage} />
      </main>
      {!isUpworkPage && <MarqueeTicker />}
      {!isUpworkPage && <ClientLogos />}
      {!isUpworkPage && <Footer />}
      <ProjectModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <CMSProvider>
      <MainRouter />
    </CMSProvider>
  );
}
