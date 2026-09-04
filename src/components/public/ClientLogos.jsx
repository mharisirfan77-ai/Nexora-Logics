import React from 'react';

export const ClientLogos = () => {
  const brands = [
    "APEX FINANCIAL",
    "SARAH JENKINS BOOKS",
    "LUMINA DINING GROUP",
    "ECOSMART SOLAR",
    "NEXUS VENTURES",
    "VANGUARD MEDIA"
  ];

  return (
    <div style={{ background: 'var(--card-bg)', padding: '3rem 2rem', borderTop: '1px solid var(--line-dark)', borderBottom: '1px solid var(--line-dark)' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.78rem', color: 'var(--lime)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.8rem', fontWeight: 600 }}>
          TRUSTED BY INNOVATIVE BRANDS WORLDWIDE
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', flexWrap: 'wrap', opacity: 0.7 }}>
          {brands.map((brand, i) => (
            <div key={i} style={{ fontFamily: 'Space Grotesk', fontSize: '1.2rem', fontWeight: 800, color: '#B7BCDA', letterSpacing: '0.05em' }}>
              {brand}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
