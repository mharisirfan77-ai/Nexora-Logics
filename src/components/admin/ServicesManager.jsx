import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Plus, Edit, Trash2, X, Save, Layers } from 'lucide-react';

export const ServicesManager = () => {
  const { data, addService, updateService, deleteService } = useCMS();
  const { services } = data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    title: '',
    icon: 'Code',
    description: '',
    featuresStr: 'Feature 1, Feature 2, Feature 3'
  };

  const [form, setForm] = useState(emptyForm);

  const handleOpenAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (svc) => {
    setEditingId(svc.id);
    setForm({
      title: svc.title || '',
      icon: svc.icon || 'Code',
      description: svc.description || '',
      featuresStr: svc.features ? svc.features.join(', ') : ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const features = form.featuresStr.split(',').map(f => f.trim()).filter(Boolean);

    const payload = {
      title: form.title,
      icon: form.icon,
      description: form.description,
      features
    };

    if (editingId) {
      updateService(editingId, payload);
    } else {
      addService(payload);
    }

    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 700, color: '#0B0E17', marginBottom: '0.4rem' }}>
            Manage Services
          </h2>
          <p style={{ color: '#5B5F76' }}>Add or edit services offered by Nexora Logics.</p>
        </div>
        <button className="btn-admin-save" onClick={handleOpenAdd}>
          <Plus size={18} /> Add New Service
        </button>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Service Title</th>
              <th>Description</th>
              <th>Features Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((svc) => (
              <tr key={svc.id}>
                <td style={{ fontWeight: 'bold', color: '#4B4EFF' }}>{svc.icon}</td>
                <td style={{ fontWeight: 600, color: '#0B0E17' }}>{svc.title}</td>
                <td style={{ maxWidth: '300px' }}>{svc.description}</td>
                <td>{svc.features ? svc.features.length : 0} items</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <button
                      onClick={() => handleOpenEdit(svc)}
                      style={{ background: '#4B4EFF', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                    >
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete service "${svc.title}"?`)) {
                          deleteService(svc.id);
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

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '550px' }}>
            <div className="modal-header">
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.2rem', color: '#0B0E17' }}>
                {editingId ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-body">
              <div className="admin-form-group">
                <label>Service Title *</label>
                <input
                  type="text"
                  className="admin-input"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Icon Identifier *</label>
                <select
                  className="admin-input"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                >
                  <option value="BookOpen">BookOpen (eBook)</option>
                  <option value="Code">Code (Web Dev)</option>
                  <option value="Share2">Share2 (Social Media)</option>
                  <option value="Megaphone">Megaphone (Paid Ads)</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label>Service Description *</label>
                <textarea
                  className="admin-input"
                  rows="3"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="admin-form-group">
                <label>Bullet Features List (Comma separated)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={form.featuresStr}
                  onChange={(e) => setForm({ ...form, featuresStr: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn-hero-ghost" style={{ color: '#0B0E17', borderColor: '#ccc' }} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-admin-save">
                  <Save size={16} /> Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
