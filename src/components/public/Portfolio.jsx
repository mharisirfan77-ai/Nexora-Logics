import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';

export const Portfolio = () => {
  const { data, setActiveProjectModal } = useCMS();
  const { portfolio, portfolioHeader, sectionsConfig } = data;
  const [activeCategory, setActiveCategory] = useState('All');

  if (!sectionsConfig.portfolio?.enabled) return null;

  const categories = ['All', ...new Set(portfolio.map((project) => project.category).filter(Boolean))];

  const filteredProjects = activeCategory === 'All'
    ? portfolio
    : portfolio.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="section-padding agency-portfolio-section">
      <div className="agency-portfolio-inner">
        <div className="agency-portfolio-heading">
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.82rem', color: 'var(--lime)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
            ✦ {portfolioHeader?.sectionLabel || "Selected Work"}
          </span>
          <h2 className="section-title-xstar" style={{ marginTop: '0.4rem' }}>
            {portfolioHeader?.title || "Creative Portfolio Showcase"}
          </h2>
        </div>

        {/* Category Filter Tabs */}
        <div className="portfolio-filter" style={{ justifyContent: 'flex-start' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="agency-portfolio-grid">
          {filteredProjects.map((project, idx) => (
            <div key={project.id} className="split-project-row">
              <div className="agency-project-image" onClick={() => setActiveProjectModal(project)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') setActiveProjectModal(project); }}>
                <img src={project.thumbnail} alt={project.title} loading="lazy" />
              </div>
              <div className="split-project-card" onClick={() => setActiveProjectModal(project)}>
                <div className="tag-pill-xstar">
                  {project.category} <span>↗</span>
                </div>
                <div className="split-project-title">
                  <span>{project.title}</span>
                  <span className="arrow">↗</span>
                </div>
                <p style={{ color: 'var(--slate)', marginTop: '1rem', fontSize: '0.95rem' }}>
                  {project.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
