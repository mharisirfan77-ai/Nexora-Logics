import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { ExternalLink, ArrowRight } from 'lucide-react';

export const Portfolio = () => {
  const { data, setActiveProjectModal } = useCMS();
  const { portfolio, sectionsConfig } = data;
  const [activeCategory, setActiveCategory] = useState('All');

  if (!sectionsConfig.portfolio?.enabled) return null;

  const categories = ['All', 'Web Development', 'eBook Creation', 'Social Media', 'Paid Advertising'];

  const filteredProjects = activeCategory === 'All'
    ? portfolio
    : portfolio.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" style={{ background: '#EFEBE2' }}>
      <div className="section-padding">
        <div className="section-header centered-header">
          <div className="section-label">Selected Work</div>
          <h2 className="section-title">Creative portfolio showcase</h2>
          <p className="section-sub">
            Explore our recent projects spanning web engineering, publishing, brand strategies, and high-conversion ad campaigns.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="portfolio-filter">
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

        {/* Projects Grid */}
        <div className="portfolio-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card"
              onClick={() => setActiveProjectModal(project)}
            >
              <div className="project-img-wrapper">
                <img src={project.thumbnail} alt={project.title} />
                <span className="project-category-badge">{project.category}</span>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.tags && project.tags.length > 0 && (
                  <div className="project-tags">
                    {project.tags.map((tag, i) => (
                      <span className="tag-pill" key={i}>{tag}</span>
                    ))}
                  </div>
                )}
                <div style={{ marginTop: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#4B4EFF', fontWeight: 600, fontSize: '0.88rem' }}>
                  View Case Study <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
