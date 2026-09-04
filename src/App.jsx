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
    const primary = activeTheme.colors?.primaryAccent || themeConfig.primaryAccent || '#D2F535';
    const secondary = activeTheme.colors?.secondaryAccent || themeConfig.secondaryAccent || '#4B4EFF';
    const amber = activeTheme.colors?.amberAccent || themeConfig.amberAccent || '#FF8A3D';
    const bgTheme = activeTheme.colors?.bgTheme || themeConfig.bgTheme || '#07090E';
    const fontHeading = activeTheme.typography?.fontHeading || themeConfig.fontHeading || "'Space Grotesk', sans-serif";
    const fontBody = activeTheme.typography?.fontBody || themeConfig.fontBody || "'Inter', sans-serif";
    const borderRadius = themeConfig.borderRadius || '14px';

    root.style.setProperty('--lime', primary);
    root.style.setProperty('--violet', secondary);
    root.style.setProperty('--amber', amber);
    root.style.setProperty('--bg-dark', bgTheme);
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
      root.style.setProperty('--text-main', '#D4D7EC');
      root.style.setProperty('--slate', '#8F95B2');
      root.style.setProperty('--mist', '#B7BCDA');
      root.style.setProperty('--card-bg', activeTheme.colors?.cardBg || themeConfig.cardBg || 'rgba(18, 22, 43, 0.75)');
      root.style.setProperty('--card-border', 'rgba(255, 255, 255, 0.08)');
      document.body.style.color = '#D4D7EC';
    }
  }, [themeConfig, activeTheme]);

  // Normalize path for secret admin slug check
  const normalizedPath = currentPath.replace(/\/$/, '').toLowerCase();
  const isAdminPath = normalizedPath === '/nexora_logics_admin';

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
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <DynamicPage page={matchedPage} />
      </main>
      <MarqueeTicker />
      <ClientLogos />
      <Footer />
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
