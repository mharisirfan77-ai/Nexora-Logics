import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';

export const Portfolio = () => {
  const { data, setActiveProjectModal } = useCMS();
  const { portfolio, portfolioHeader, sectionsConfig } = data;
  const [activeCategory, setActiveCategory] = useState('All');

  if (!sectionsConfig.portfolio?.enabled) return null;

  const categories = ['All', 'Web Development', 'eBook Creation', 'Social Media', 'Paid Advertising'];

  const filteredProjects = activeCategory === 'All'
    ? portfolio
    : portfolio.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="section-padding" style={{ background: 'var(--bg-dark)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3.5rem' }}>
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

        {/* Split-Screen Horizontal Project Rows */}
        <div>
          {filteredProjects.map((project, idx) => (
            <div key={project.id} className="split-project-row">
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

              <div
                style={{ height: '320px', borderRadius: '8px', overflow: 'hidden', background: 'var(--card-bg)', cursor: 'pointer' }}
                onClick={() => setActiveProjectModal(project)}
              >
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
