import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';

export const PortfolioManager = () => {
  const { data, addProject, updateProject, deleteProject } = useCMS();
  const { portfolio } = data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    title: '',
    category: 'Web Development',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    description: '',
    client: '',
    scope: '',
    tagsStr: 'React, Node, Web',
    challenge: '',
    solution: '',
    liveLink: ''
  };

  const [form, setForm] = useState(emptyForm);

  const handleOpenAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proj) => {
    setEditingId(proj.id);
    setForm({
      title: proj.title || '',
      category: proj.category || 'Web Development',
      thumbnail: proj.thumbnail || '',
      description: proj.description || '',
      client: proj.client || '',
      scope: proj.scope || '',
      tagsStr: proj.tags ? proj.tags.join(', ') : '',
      challenge: proj.challenge || '',
      solution: proj.solution || '',
      liveLink: proj.liveLink || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = form.tagsStr.split(',').map(t => t.trim()).filter(Boolean);

    const projectPayload = {
      title: form.title,
      category: form.category,
      thumbnail: form.thumbnail,
      description: form.description,
      client: form.client,
      scope: form.scope,
      tags,
      challenge: form.challenge,
      solution: form.solution,
      liveLink: form.liveLink
    };

    if (editingId) {
      updateProject(editingId, projectPayload);
    } else {
      addProject(projectPayload);
    }

    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 700, color: '#0B0E17', marginBottom: '0.4rem' }}>
            Manage Portfolio Projects
          </h2>
          <p style={{ color: '#5B5F76' }}>Add, edit, or remove showcase work items from your public agency portfolio.</p>
        </div>
        <button className="btn-admin-save" onClick={handleOpenAdd}>
          <Plus size={18} /> Add New Project
        </button>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Preview</th>
              <th>Project Title</th>
              <th>Category</th>
              <th>Client</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.map((proj) => (
              <tr key={proj.id}>
                <td>
                  <img src={proj.thumbnail} alt={proj.title} style={{ width: '60px', height: '42px', objectFit: 'cover', borderRadius: '6px' }} />
                </td>
                <td style={{ fontWeight: 600, color: '#0B0E17' }}>{proj.title}</td>
                <td><span className="tag-pill">{proj.category}</span></td>
                <td>{proj.client || '—'}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <button
                      onClick={() => handleOpenEdit(proj)}
                      style={{ background: '#4B4EFF', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                    >
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete project "${proj.title}"?`)) {
                          deleteProject(proj.id);
                        }
                      }}
                      className="btn-admin-delete"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
            <div className="modal-header">
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.2rem', color: '#0B0E17' }}>
                {editingId ? 'Edit Project' : 'Add New Portfolio Project'}
              </h3>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-body">
              <div className="admin-form-group">
                <label>Project Title *</label>
                <input
                  type="text"
                  className="admin-input"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="admin-form-group">
                  <label>Category *</label>
                  <select
                    className="admin-input"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="eBook Creation">eBook Creation</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Paid Advertising">Paid Advertising</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Client Name</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={form.client}
                    onChange={(e) => setForm({ ...form, client: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Thumbnail Image URL *</label>
                <input
                  type="url"
                  className="admin-input"
                  value={form.thumbnail}
                  onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Short Description *</label>
                <textarea
                  className="admin-input"
                  rows="2"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="admin-form-group">
                <label>Scope of Work</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Full-stack App, UI/UX Design"
                  value={form.scope}
                  onChange={(e) => setForm({ ...form, scope: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label>Tech Stack / Tags (Comma separated)</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="React, Node, KDP, Meta Ads"
                  value={form.tagsStr}
                  onChange={(e) => setForm({ ...form, tagsStr: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label>Challenge</label>
                <textarea
                  className="admin-input"
                  rows="2"
                  value={form.challenge}
                  onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                ></textarea>
              </div>

              <div className="admin-form-group">
                <label>Solution & Results</label>
                <textarea
                  className="admin-input"
                  rows="2"
                  value={form.solution}
                  onChange={(e) => setForm({ ...form, solution: e.target.value })}
                ></textarea>
              </div>

              <div className="admin-form-group">
                <label>Live Project URL</label>
                <input
                  type="url"
                  className="admin-input"
                  value={form.liveLink}
                  onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn-hero-ghost" style={{ color: '#0B0E17', borderColor: '#ccc' }} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-admin-save">
                  <Save size={16} /> {editingId ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
