import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Globe, Share2, ExternalLink } from 'lucide-react';

export const TeamShowcase = () => {
  const { data } = useCMS();
  const teamMembers = data.team || [];

  return (
    <section className="team-section">
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2 className="section-title-xstar">
          Meet Our <em className="italic-accent">Creative</em> Staff
        </h2>
        <p style={{ color: 'var(--slate)', fontSize: '1.1rem', marginTop: '0.6rem' }}>
          Passionate strategists, designers, writers, and engineers scaling brands worldwide.
        </p>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <div className="team-card" key={member.id}>
              <div className="team-img-box">
                <img src={member.photo} alt={member.name} />
              </div>
              <div className="team-info">
                <h4>{member.name}</h4>
                <p>{member.role}</p>

                <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.6rem' }}>
                  <a href={member.linkedin || "#"} target="_blank" rel="noreferrer" style={{ color: 'var(--lime)', opacity: 0.8 }} title="LinkedIn">
                    <Share2 size={16} />
                  </a>
                  <a href={member.twitter || "#"} target="_blank" rel="noreferrer" style={{ color: 'var(--lime)', opacity: 0.8 }} title="Twitter">
                    <ExternalLink size={16} />
                  </a>
                  <a href="#" style={{ color: 'var(--lime)', opacity: 0.8 }} title="Website">
                    <Globe size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
