import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ChevronRight } from 'lucide-react';

export const PageHeader = ({ title, subtitle, categoryLabel }) => {
  const { navigate } = useCMS();

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #0B0E17 0%, #12162B 100%)',
        padding: '9rem 2rem 4rem',
        color: '#ffffff',
        textAlign: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto', relative: 'z-index: 2' }}>
        {categoryLabel && (
          <div className="hero-badge" style={{ marginBottom: '1.2rem' }}>
            <span className="dot"></span>
            <span>{categoryLabel}</span>
          </div>
        )}

        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          {title}
        </h1>

        {subtitle && (
          <p style={{ color: '#B7BCDA', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 1.8rem' }}>
            {subtitle}
          </p>
        )}

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.06)', padding: '0.4rem 1rem', borderRadius: '100px', fontSize: '0.84rem', color: '#9CA2C4' }}>
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} style={{ color: '#FF8A3D', fontWeight: 600 }}>Home</a>
          <ChevronRight size={14} />
          <span style={{ color: '#ffffff' }}>{title}</span>
        </div>
      </div>
    </div>
  );
};
