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
import { BlogPage } from './BlogPage';
import { ArrowUpRight } from 'lucide-react';

export const DynamicPage = ({ page }) => {
  const { data, navigate } = useCMS();
  const { customSections = [] } = data;

  if (!page) return null;

  if (page.slug === '/blog') {
    return <BlogPage />;
  }

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
        const customSec = customSections.find((c) => c.id === secId);
        if (!customSec) return null;

        if (customSec.type === 'ctaBanner') {
          return (
            <div
              key={`${secId}-${index}`}
              style={{
                position: 'relative',
                background: `linear-gradient(180deg, rgba(7,9,14,0.7) 0%, rgba(7,9,14,0.95) 100%), url(${customSec.imageUrl || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'}) center/cover no-repeat`,
                padding: '7rem 2.5rem',
                margin: '4rem 0',
                borderRadius: '16px',
                textAlign: 'center',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <div style={{ maxWidth: '850px', margin: '0 auto' }}>
                <h2 className="section-title-xstar" style={{ marginBottom: '1.2rem' }}>
                  {customSec.title}
                </h2>
                <p style={{ color: '#B7BCDA', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2.5rem' }}>
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
        } else if (customSec.type === 'textBlock') {
          return (
            <div key={`${secId}-${index}`} className="section-padding" style={{ background: '#0B0E17', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', margin: '3rem 0' }}>
              <div style={{ maxWidth: '900px' }}>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.82rem', color: '#D2F535', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                  ✦ {customSec.subtitle || "Information Block"}
                </span>
                <h2 className="section-title-xstar" style={{ marginTop: '0.4rem', marginBottom: '1.5rem' }}>
                  {customSec.title}
                </h2>
                <p style={{ color: '#D4D7EC', fontSize: '1.15rem', lineHeight: '1.85' }}>
                  {customSec.content}
                </p>
              </div>
            </div>
          );
        } else if (customSec.type === 'videoEmbed') {
          return (
            <div key={`${secId}-${index}`} className="section-padding" style={{ textAlign: 'center' }}>
              <h2 className="section-title-xstar">{customSec.title}</h2>
              {customSec.subtitle && <p style={{ color: '#888888', marginTop: '0.6rem', marginBottom: '2rem' }}>{customSec.subtitle}</p>}
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <iframe
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  src={customSec.videoUrl || "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"}
                  title={customSec.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
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

        return null;
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
