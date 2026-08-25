import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { BookOpen, Code, Share2, Megaphone, CheckCircle } from 'lucide-react';

const iconMap = {
  BookOpen: <BookOpen size={26} />,
  Code: <Code size={26} />,
  Share2: <Share2 size={26} />,
  Megaphone: <Megaphone size={26} />
};

export const Services = () => {
  const { data } = useCMS();
  const { services, sectionsConfig } = data;

  if (!sectionsConfig.services?.enabled) return null;

  return (
    <section id="services" style={{ background: '#F7F5F0' }}>
      <div className="section-padding">
        <div className="section-header centered-header">
          <div className="section-label">What We Do</div>
          <h2 className="section-title">Our core services</h2>
          <p className="section-sub">
            Everything your brand needs to grow online — handled by one team, built around one strategy.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.id}>
              <div className="svc-icon">
                {iconMap[service.icon] || <Code size={26} />}
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
