import React from 'react';
import { useCMS } from '../../context/CMSContext';

export const Process = () => {
  const { data } = useCMS();
  const { processSteps, sectionsConfig } = data;

  if (!sectionsConfig.process?.enabled) return null;

  return (
    <section className="process-section" id="process">
      <div className="section-padding">
        <div className="section-header centered-header">
          <div className="section-label" style={{ color: 'var(--amber)' }}>How We Work</div>
          <h2 className="section-title">Our 5-step process</h2>
          <p className="section-sub">
            Every project moves through the same clear stages — so you always know what comes next.
          </p>
        </div>

        <div className="process-steps">
          {processSteps.map((step) => (
            <div className="step-card" key={step.id}>
              <div className="step-num">{step.stepNumber || `0${step.id}`}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
