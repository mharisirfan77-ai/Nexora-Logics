import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Hero } from '../components/public/Hero';
import { AgencyReel } from '../components/public/AgencyReel';
import { StatsBar } from '../components/public/StatsBar';
import { About } from '../components/public/About';
import { Services } from '../components/public/Services';
import { Portfolio } from '../components/public/Portfolio';
import { TeamShowcase } from '../components/public/TeamShowcase';
import { Process } from '../components/public/Process';
import { WhyUs } from '../components/public/WhyUs';
import { Testimonials } from '../components/public/Testimonials';
import { Contact } from '../components/public/Contact';
import { PageHeader } from '../components/public/PageHeader';
import { ArrowUpRight } from 'lucide-react';

export const DynamicPage = ({ page }) => {
  const { data, navigate } = useCMS();
  const { customSections = [] } = data;

  if (!page) return null;

  const renderSectionById = (secId, index) => {
    switch (secId) {
      case 'hero':
        return <Hero key={`${secId}-${index}`} />;
      case 'reel':
        return <AgencyReel key={`${secId}-${index}`} />;
      case 'stats':
        return <StatsBar key={`${secId}-${index}`} />;
      case 'about':
        return <About key={`${secId}-${index}`} />;
      case 'services':
        return <Services key={`${secId}-${index}`} />;
      case 'portfolio':
        return <Portfolio key={`${secId}-${index}`} />;
      case 'team':
        return <TeamShowcase key={`${secId}-${index}`} />;
      case 'process':
        return <Process key={`${secId}-${index}`} />;
      case 'whyUs':
        return <WhyUs key={`${secId}-${index}`} />;
      case 'testimonials':
        return <Testimonials key={`${secId}-${index}`} />;
      case 'contact':
        return <Contact key={`${secId}-${index}`} />;
      default:
        // Render Custom Section Blocks created via Section Builder
        const customSec = customSections.find((c) => c.id === secId);
        if (!customSec) return null;

        if (customSec.type === 'ctaBanner') {
          return (
            <div
              key={`${secId}-${index}`}
              style={{
                background: customSec.bgGradient || 'linear-gradient(135deg, #12162B 0%, #1B2140 100%)',
                padding: '6rem 2rem',
                margin: '4rem 0',
                borderRadius: '16px',
                textAlign: 'center',
                color: '#fff'
              }}
            >
              <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '2.4rem', fontWeight: 800, marginBottom: '1rem' }}>
                  {customSec.title}
                </h2>
                <p style={{ color: '#B7BCDA', fontSize: '1.1rem', marginBottom: '2rem' }}>
                  {customSec.subtitle}
                </p>
                <a
                  href={customSec.buttonLink || '/contact'}
                  onClick={(e) => { e.preventDefault(); navigate(customSec.buttonLink || '/contact'); }}
                  className="btn-hero-primary"
                  style={{ background: '#D2F535', color: '#121212' }}
                >
                  {customSec.buttonText || 'Get Started ↗'} <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          );
        } else if (customSec.type === 'html') {
          return (
            <div
              key={`${secId}-${index}`}
              className="section-padding"
              dangerouslySetInnerHTML={{ __html: customSec.htmlContent || '' }}
            />
          );
        }

        return (
          <div key={`${secId}-${index}`} className="section-padding" style={{ background: '#0B0E17' }}>
            <h2 className="section-title-xstar">{customSec.title}</h2>
            <p style={{ color: '#B7BCDA', fontSize: '1.1rem', marginTop: '1rem' }}>{customSec.subtitle || customSec.content}</p>
          </div>
        );
    }
  };

  return (
    <>
      {page.slug !== '/' && (
        <PageHeader
          title={page.title}
          subtitle={page.metaDescription}
          categoryLabel="Page View"
        />
      )}
      {page.sectionIds?.map((secId, idx) => renderSectionById(secId, idx))}
    </>
  );
};
