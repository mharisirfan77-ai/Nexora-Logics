import React from 'react';

const steps = [
  ['01', 'Discover', 'We learn your goals, audience, offer and current digital setup.'],
  ['02', 'Plan', 'We shape the right mix of marketing, creative, development and automation.'],
  ['03', 'Build', 'Our specialists design, develop and configure the solution as one connected system.'],
  ['04', 'Launch', 'We test, refine and release with clear ownership, tracking and documentation.'],
  ['05', 'Grow', 'We optimize campaigns, content, funnels and workflows using real performance data.']
];

export const Process = () => (
  <section id="process" className="process-section section-padding">
    <div className="section-header centered-header">
      <div className="section-label">How We Work</div>
      <h2 className="section-title">From brief to launch — and beyond</h2>
      <p className="section-sub">One connected team, one roadmap, and a practical process designed to keep projects moving.</p>
    </div>
    <div className="nl-process-grid">
      {steps.map(([num, title, copy]) => (
        <article className="nl-process-card" key={num}>
          <span className="nl-process-num">{num}</span>
          <h3>{title}</h3>
          <p>{copy}</p>
        </article>
      ))}
    </div>
  </section>
);
