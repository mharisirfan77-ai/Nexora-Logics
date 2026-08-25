import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Plus, Edit, Trash2, X, Save, FileText, Check, Layers } from 'lucide-react';

export const PageManager = () => {
  const { data, addPage, updatePage, deletePage, navigate } = useCMS();
  const { pages } = data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    title: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    inNavbar: true,
    inFooter: true,
    sectionIds: ['hero', 'contact']
  };

  const [form, setForm] = useState(emptyForm);

  const handleOpenAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (page) => {
    setEditingId(page.id);
    setForm({
      title: page.title || '',
      slug: page.slug || '',
      metaTitle: page.metaTitle || '',
      metaDescription: page.metaDescription || '',
      inNavbar: page.inNavbar !== false,
      inFooter: page.inFooter !== false,
      sectionIds: page.sectionIds || ['hero', 'contact']
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updatePage(editingId, form);
    } else {
      addPage(form);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>
            Dynamic Page Manager
          </h2>
          <p style={{ color: '#8F95B2' }}>
            Create new custom pages, customize URL slugs, assign page sections, and control navigation visibility.
          </p>
        </div>
        <button className="btn-admin-save" onClick={handleOpenAdd}>
          <Plus size={18} /> Create New Dynamic Page
        </button>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Page Title</th>
              <th>URL Slug</th>
              <th>Type</th>
              <th>Navbar</th>
              <th>Footer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((p) => (
              <tr key={p.id}>
                <td style={{ fontWeight: 600, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={16} style={{ color: '#D2F535' }} /> {p.title}
                </td>
                <td>
                  <code style={{ background: '#07090E', color: '#D2F535', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                    {p.slug}
                  </code>
                </td>
                <td>
                  {p.isSystem ? (
                    <span style={{ color: '#4B4EFF', fontSize: '0.78rem', fontWeight: 700, background: 'rgba(75,78,255,0.15)', padding: '0.25rem 0.6rem', borderRadius: '100px' }}>
                      System Default
                    </span>
                  ) : (
                    <span style={{ color: '#D2F535', fontSize: '0.78rem', fontWeight: 700, background: 'rgba(210,245,53,0.15)', padding: '0.25rem 0.6rem', borderRadius: '100px' }}>
                      User Custom
                    </span>
                  )}
                </td>
                <td>{p.inNavbar ? <Check size={16} color="#00a86b" /> : '—'}</td>
                <td>{p.inFooter ? <Check size={16} color="#00a86b" /> : '—'}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <button
                      onClick={() => navigate(p.slug)}
                      style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
                    >
                      View Live
                    </button>
                    <button
                      onClick={() => handleOpenEdit(p)}
                      style={{ background: '#4B4EFF', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                    >
                      <Edit size={14} /> Edit
                    </button>
                    {!p.isSystem && (
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete page "${p.title}"?`)) {
                            deletePage(p.id);
                          }
                        }}
                        className="btn-admin-delete"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Page Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.2rem', color: '#ffffff' }}>
                {editingId ? 'Edit Page Settings' : 'Create New Page'}
              </h3>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-body">
              <div className="admin-form-group">
                <label>Page Title *</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Case Studies, Pricing, FAQ"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>URL Slug *</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. /pricing or /case-studies"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Meta SEO Description</label>
                <textarea
                  className="admin-input"
                  rows="2"
                  value={form.metaDescription}
                  onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '2rem', margin: '1rem 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={form.inNavbar}
                    onChange={(e) => setForm({ ...form, inNavbar: e.target.checked })}
                  />
                  <span>Show link in Top Navbar</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={form.inFooter}
                    onChange={(e) => setForm({ ...form, inFooter: e.target.checked })}
                  />
                  <span>Show link in Footer</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn-hero-ghost" style={{ color: '#fff', borderColor: '#444' }} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-admin-save">
                  <Save size={16} /> {editingId ? 'Save Changes' : 'Create Page'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
