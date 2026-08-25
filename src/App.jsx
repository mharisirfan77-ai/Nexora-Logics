import React from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
import { Navbar } from './components/public/Navbar';
import { Footer } from './components/public/Footer';
import { ProjectModal } from './components/public/ProjectModal';
import { Toast } from './components/public/Toast';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ProcessPage } from './pages/ProcessPage';
import { WhyUsPage } from './pages/WhyUsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './components/admin/AdminLogin';

const MainRouter = () => {
  const { currentPath, isAdminAuthenticated } = useCMS();

  // Normalize path for secret admin slug check (case-insensitive & trailing slash trim)
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

  // Render Inner Pages based on client-side route
  const renderCurrentPage = () => {
    switch (normalizedPath) {
      case '/about':
        return <AboutPage />;
      case '/services':
        return <ServicesPage />;
      case '/portfolio':
        return <PortfolioPage />;
      case '/process':
        return <ProcessPage />;
      case '/why-us':
        return <WhyUsPage />;
      case '/contact':
        return <ContactPage />;
      case '':
      case '/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="public-app">
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        {renderCurrentPage()}
      </main>
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
