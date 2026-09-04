import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Award, Sliders, MessageSquare, Zap, DollarSign, Users, Shield } from 'lucide-react';

const iconMap = {
  Award: <Award size={22} />,
  Sliders: <Sliders size={22} />,
  MessageSquare: <MessageSquare size={22} />,
  Zap: <Zap size={22} />,
  DollarSign: <DollarSign size={22} />,
  Users: <Users size={22} />
};

export const WhyUs = () => {
  const { data } = useCMS();
  const { whyUs, sectionsConfig } = data;

  if (!sectionsConfig.whyUs?.enabled) return null;

  return (
    <section id="why" className="why-section">
      <div className="section-padding">
        <div className="section-header centered-header">
          <div className="section-label">Why Nexora Logics</div>
          <h2 className="section-title">Your trusted digital partner</h2>
          <p className="section-sub">
            Here's what keeps our clients coming back.
          </p>
        </div>

        <div className="why-grid">
          {whyUs.map((item) => (
            <div className="why-card" key={item.id}>
              <div className="why-icon">
                {iconMap[item.icon] || <Shield size={22} />}
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
