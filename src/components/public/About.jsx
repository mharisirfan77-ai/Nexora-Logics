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
              <div className="agency-about-photo">
                <img src={about.aboutImageUrl} alt="Nexora team working together" loading="lazy" />
                <span>Built around your ambition <span aria-hidden="true">↗</span></span>
              </div>
            )}
            <div className="agency-about-highlights">{about.highlights && about.highlights.map((item) => (
              <div className="av-item" key={item.id}>
                <div className="av-icon">
                  {iconMap[item.icon] || <Code size={24} />}
                </div>
                <div>
                  <strong>{item.title}</strong>
                  <span className="desc">{item.desc}</span>
                </div>
              </div>
            ))}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
