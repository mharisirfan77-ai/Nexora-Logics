import React from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
import { Navbar } from './components/public/Navbar';
import { Hero } from './components/public/Hero';
import { StatsBar } from './components/public/StatsBar';
import { About } from './components/public/About';
import { Services } from './components/public/Services';
import { Portfolio } from './components/public/Portfolio';
import { ProjectModal } from './components/public/ProjectModal';
import { Process } from './components/public/Process';
import { WhyUs } from './components/public/WhyUs';
import { Testimonials } from './components/public/Testimonials';
import { Contact } from './components/public/Contact';
import { Footer } from './components/public/Footer';
import { Toast } from './components/public/Toast';
import { AdminLayout } from './components/admin/AdminLayout';

const MainApp = () => {
  const { isAdminView } = useCMS();

  if (isAdminView) {
    return (
      <>
        <AdminLayout />
        <Toast />
      </>
    );
  }

  return (
    <div className="public-app">
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <Services />
        <Portfolio />
        <Process />
        <WhyUs />
        <Testimonials />
        <Contact />
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
      <MainApp />
    </CMSProvider>
  );
}
