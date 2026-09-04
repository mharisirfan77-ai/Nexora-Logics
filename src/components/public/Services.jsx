import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { BookOpen, Code, Share2, Megaphone, CheckCircle2 } from 'lucide-react';

const iconMap = {
  BookOpen: <BookOpen size={28} />,
  Code: <Code size={28} />,
  Share2: <Share2 size={28} />,
  Megaphone: <Megaphone size={28} />
};

export const Services = () => {
  const { data } = useCMS();
  const { services, servicesHeader, sectionsConfig } = data;

  if (!sectionsConfig.services?.enabled) return null;

  return (
    <section id="services" className="services-section">
      <div className="section-padding">
        <div className="section-header centered-header">
          <div className="section-label">{servicesHeader?.sectionLabel || "What We Do"}</div>
          <h2 className="section-title">{servicesHeader?.title || "Our core services"}</h2>
          <p className="section-sub">
            {servicesHeader?.subtitle || "Everything your brand needs to grow online — handled by one team, built around one strategy."}
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.id}>
              {service.imageUrl && (
                <div style={{ height: '160px', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.2rem', background: 'var(--card-bg)' }}>
                  <img src={service.imageUrl} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}

              <div className="svc-icon">
                {iconMap[service.icon] || <Code size={28} />}
              </div>

              <h3>{service.title}</h3>
              <p>{service.description}</p>

              {service.features && service.features.length > 0 && (
                <ul className="svc-list">
                  {service.features.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
