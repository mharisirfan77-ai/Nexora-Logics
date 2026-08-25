import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Star } from 'lucide-react';

export const Testimonials = () => {
  const { data } = useCMS();
  const { testimonials, sectionsConfig } = data;

  if (!sectionsConfig.testimonials?.enabled) return null;

  return (
    <section className="testimonials-section">
      <div className="section-padding">
        <div className="section-header centered-header">
          <div className="section-label" style={{ color: 'var(--amber)' }}>Client Reviews</div>
          <h2 className="section-title">What our clients say</h2>
          <p className="section-sub">
            Real feedback from businesses and creators we've collaborated with.
          </p>
        </div>

        <div className="testi-grid">
          {testimonials.map((testi) => (
            <div className="testi-card" key={testi.id}>
              <div>
                <div className="testi-quote">"</div>
                <p>{testi.quote}</p>
              </div>

              <div>
                <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.8rem', color: '#FF8A3D' }}>
                  {[...Array(testi.rating || 5)].map((_, i) => (
                    <Star key={i} size={16} fill="#FF8A3D" />
                  ))}
                </div>
                <div className="testi-foot">
                  <div className="testi-avatar">{testi.initials || 'NL'}</div>
                  <div>
                    <div className="testi-name">{testi.name}</div>
                    <div className="testi-role">{testi.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
