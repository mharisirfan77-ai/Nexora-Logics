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

  // Dynamically apply theme color variables and fonts to the root DOM
  useEffect(() => {
    if (themeConfig.primaryAccent) {
      document.documentElement.style.setProperty('--lime', themeConfig.primaryAccent);
    }
    if (themeConfig.secondaryAccent) {
      document.documentElement.style.setProperty('--violet', themeConfig.secondaryAccent);
    }
    if (themeConfig.bgTheme) {
      document.documentElement.style.setProperty('--bg-dark', themeConfig.bgTheme);
      document.body.style.backgroundColor = themeConfig.bgTheme;
    }
    if (themeConfig.borderRadius) {
      document.documentElement.style.setProperty('--radius-md', themeConfig.borderRadius);
    }
    if (themeConfig.fontHeading) {
      document.documentElement.style.setProperty('--font-heading', themeConfig.fontHeading);
    }
    if (themeConfig.fontBody) {
      document.documentElement.style.setProperty('--font-body', themeConfig.fontBody);
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

  return (
    <div className="public-app">
      {/* Custom CSS overrides injected dynamically */}
      {themeConfig.customCss && (
        <style>{themeConfig.customCss}</style>
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
