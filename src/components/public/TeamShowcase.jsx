import React from 'react';
import { useCMS } from '../../context/CMSContext';

export const TeamShowcase = () => {
  const { data } = useCMS();
  const teamMembers = data.team || [
    {
      id: 1,
      name: "Marcus Vance",
      role: "Creative Director",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      name: "Elena Rostova",
      role: "Head of Design",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      name: "David Sterling",
      role: "Lead Web Engineer",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      name: "Arthur Pendelton",
      role: "Growth & Paid Ads Strategist",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section className="team-section">
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2 className="section-title-xstar">
          Meet Our <em className="italic-accent">Creative</em> Staff
        </h2>
        <p style={{ color: '#888888', fontSize: '1.1rem', marginTop: '0.6rem' }}>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
