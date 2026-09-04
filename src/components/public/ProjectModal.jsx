import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { X, ExternalLink, User, Layers, Tag, CheckCircle2 } from 'lucide-react';

export const ProjectModal = () => {
  const { activeProjectModal, setActiveProjectModal } = useCMS();

  if (!activeProjectModal) return null;

  const project = activeProjectModal;

  return (
    <div className="modal-overlay" onClick={() => setActiveProjectModal(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: 'var(--lime)', textTransform: 'uppercase', fontWeight: 600 }}>
            Case Study — {project.category}
          </span>
          <button className="modal-close" onClick={() => setActiveProjectModal(null)}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ height: '300px', borderRadius: '14px', overflow: 'hidden', marginBottom: '1.8rem', background: 'var(--bg-dark)' }}>
            <img src={project.thumbnail} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem' }}>
            {project.title}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem', background: 'var(--card-bg)', border: '1px solid var(--card-border)', padding: '1.4rem', borderRadius: '12px', marginBottom: '1.8rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--slate)', fontSize: '0.82rem', fontWeight: 600 }}>
                <User size={15} /> CLIENT
              </div>
              <div style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.95rem', marginTop: '0.2rem' }}>
                {project.client || 'N/A'}
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--slate)', fontSize: '0.82rem', fontWeight: 600 }}>
                <Layers size={15} /> SCOPE
              </div>
              <div style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.95rem', marginTop: '0.2rem' }}>
                {project.scope || 'Digital Strategy & Execution'}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '1.6rem' }}>
            <h4 style={{ fontFamily: 'Space Grotesk', fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Project Challenge</h4>
            <p style={{ color: 'var(--slate)', lineHeight: 1.7, fontSize: '0.98rem' }}>{project.challenge || project.description}</p>
          </div>

          <div style={{ marginBottom: '1.8rem' }}>
            <h4 style={{ fontFamily: 'Space Grotesk', fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Nexora Solution & Results</h4>
            <p style={{ color: 'var(--slate)', lineHeight: 1.7, fontSize: '0.98rem' }}>{project.solution || 'Delivered fully custom, scalable growth strategy.'}</p>
          </div>

          {project.tags && project.tags.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="tag-pill" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', color: 'var(--lime)', padding: '0.4rem 0.8rem', fontSize: '0.82rem' }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.85rem 1.8rem' }}
            >
              Visit Live Project <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
