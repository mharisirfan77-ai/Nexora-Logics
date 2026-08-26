import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Plus, Edit, Trash2, X, Save, FileText, Check, Tag, Eye } from 'lucide-react';

export const WpAdminPosts = () => {
  const { data, addPost, updatePost, deletePost, navigate } = useCMS();
  const { posts = [] } = data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    title: '',
    slug: '',
    category: 'Web Development',
    tags: 'React, Growth',
    author: 'Nexora Team',
    status: 'Published',
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    excerpt: '',
    content: ''
  };

  const [form, setForm] = useState(emptyForm);

  const handleOpenAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post) => {
    setEditingId(post.id);
    setForm({
      title: post.title || '',
      slug: post.slug || '',
      category: post.category || 'General',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags || '',
      author: post.author || 'Nexora Team',
      status: post.status || 'Published',
      featuredImage: post.featuredImage || '',
      excerpt: post.excerpt || '',
      content: post.content || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedPayload = {
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean)
    };

    if (editingId) {
      updatePost(editingId, formattedPayload);
    } else {
      addPost(formattedPayload);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>
            Posts & Articles CMS
          </h2>
          <p style={{ color: '#8F95B2' }}>
            Manage blog articles, publishing categories, featured images, and news posts (`/wp-admin/edit.php`).
          </p>
        </div>
        <button className="btn-admin-save" onClick={handleOpenAdd}>
          <Plus size={18} /> Add New Post
        </button>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Post Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td style={{ fontWeight: 600, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <img
                    src={post.featuredImage}
                    alt=""
                    style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <div>
                    <span>{post.title}</span>
                    <div style={{ fontSize: '0.75rem', color: '#8F95B2' }}>/{post.slug}</div>
                  </div>
                </td>
                <td>
                  <span className="tag-pill" style={{ background: 'rgba(75,78,255,0.15)', color: '#C7C9FF' }}>
                    {post.category}
                  </span>
                </td>
                <td>{post.author}</td>
                <td>
                  {post.status === 'Published' ? (
                    <span style={{ color: '#00a86b', fontSize: '0.78rem', fontWeight: 700, background: 'rgba(0,168,107,0.15)', padding: '0.2rem 0.6rem', borderRadius: '100px' }}>
                      Published
                    </span>
                  ) : (
                    <span style={{ color: '#FF8A3D', fontSize: '0.78rem', fontWeight: 700, background: 'rgba(255,138,61,0.15)', padding: '0.2rem 0.6rem', borderRadius: '100px' }}>
                      Draft
                    </span>
                  )}
                </td>
                <td>{post.date}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <button
                      onClick={() => navigate('/blog')}
                      style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                    >
                      <Eye size={14} /> View
                    </button>
                    <button
                      onClick={() => handleOpenEdit(post)}
                      style={{ background: '#4B4EFF', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                    >
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete post "${post.title}"?`)) {
                          deletePost(post.id);
                        }
                      }}
                      className="btn-admin-delete"
                    >
                      <Trash2 size={14} /> Trash
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Post Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '750px' }}>
            <div className="modal-header">
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.2rem', color: '#ffffff' }}>
                {editingId ? 'Edit Post' : 'Add New Post'}
              </h3>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-body">
              <div className="admin-form-group">
                <label>Post Title *</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. How to Build a High-Converting Web App"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                <div className="admin-form-group">
                  <label>Category</label>
                  <select
                    className="admin-input"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="eBook Publishing">eBook Publishing</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Paid Advertising">Paid Advertising</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Status</label>
                  <select
                    className="admin-input"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="admin-form-group">
                <label>Featured Image URL</label>
                <input
                  type="url"
                  className="admin-input"
                  value={form.featuredImage}
                  onChange={(e) => setForm({ ...form, featuredImage: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label>Short Excerpt</label>
                <textarea
                  className="admin-input"
                  rows="2"
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                ></textarea>
              </div>

              <div className="admin-form-group">
                <label>Full Post Content</label>
                <textarea
                  className="admin-input"
                  rows="6"
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                ></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn-hero-ghost" style={{ color: '#fff', borderColor: '#444' }} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-admin-save">
                  <Save size={16} /> {editingId ? 'Update Post' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
