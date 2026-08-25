import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { BookOpen, Code, Share2, Megaphone } from 'lucide-react';

const iconMap = {
  BookOpen: <BookOpen size={24} />,
  Code: <Code size={24} />,
  Share2: <Share2 size={24} />,
  Megaphone: <Megaphone size={24} />
};

export const About = () => {
  const { data } = useCMS();
  const { about, sectionsConfig } = data;

  if (!sectionsConfig.about?.enabled) return null;

  return (
    <section className="about-section" id="about">
      <div className="section-padding">
        <div className="about-grid">
          <div className="about-copy">
            <div className="section-label">{about.sectionLabel || "About Us"}</div>
            <h2 className="section-title">{about.title}</h2>
            <p>{about.paragraph1}</p>
            <p>{about.paragraph2}</p>
          </div>

          <div className="about-visual">
            {about.aboutImageUrl && (
              <div style={{ height: '180px', borderRadius: '14px', overflow: 'hidden', marginBottom: '1.4rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <img src={about.aboutImageUrl} alt={about.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}

            {about.highlights && about.highlights.map((item) => (
              <div className="av-item" key={item.id}>
                <div className="av-icon">
                  {iconMap[item.icon] || <Code size={24} />}
                </div>
                <div>
                  <strong>{item.title}</strong>
                  <span className="desc">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
