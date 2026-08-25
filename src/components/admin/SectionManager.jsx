import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Eye, EyeOff, Check, X } from 'lucide-react';

export const SectionManager = () => {
  const { data, toggleSection } = useCMS();
  const { sectionsConfig } = data;

  const sectionKeys = Object.keys(sectionsConfig);

  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 700, color: '#0B0E17', marginBottom: '0.4rem' }}>
        Manage Page Sections
      </h2>
      <p style={{ color: '#5B5F76', marginBottom: '2rem' }}>
        Toggle which sections are visible on your live Nexora Logics public website.
      </p>

      <div className="admin-card">
        <h3>Live Website Sections Config</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Section ID</th>
              <th>Display Title</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sectionKeys.map((key) => {
              const sec = sectionsConfig[key];
              return (
                <tr key={key}>
                  <td style={{ textTransform: 'capitalize', fontWeight: 600 }}>{key}</td>
                  <td>{sec.title}</td>
                  <td>
                    {sec.enabled ? (
                      <span style={{ color: '#00a86b', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Check size={16} /> Active (Visible)
                      </span>
                    ) : (
                      <span style={{ color: '#ff4d4d', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <X size={16} /> Hidden
                      </span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => toggleSection(key)}
                      style={{
                        background: sec.enabled ? '#ff4d4d' : '#4B4EFF',
                        color: '#fff',
                        border: 'none',
                        padding: '0.45rem 1rem',
                        borderRadius: '6px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.85rem'
                      }}
                    >
                      {sec.enabled ? <EyeOff size={15} /> : <Eye size={15} />}
                      {sec.enabled ? 'Hide Section' : 'Show Section'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
