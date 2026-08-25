import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { BookOpen, Code, Share2, Megaphone } from 'lucide-react';

const iconMap = {
  BookOpen: <BookOpen size={22} />,
  Code: <Code size={22} />,
  Share2: <Share2 size={22} />,
  Megaphone: <Megaphone size={22} />
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
            {about.highlights.map((item) => (
              <div className="av-item" key={item.id}>
                <div className="av-icon">
                  {iconMap[item.icon] || <Code size={22} />}
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
