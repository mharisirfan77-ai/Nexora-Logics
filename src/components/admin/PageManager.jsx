import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import {
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  FileText,
  Check,
  Layers,
  ArrowUp,
  ArrowDown,
  Type,
  Image as ImageIcon,
  Settings,
  PlusCircle
} from 'lucide-react';

export const PageManager = () => {
  const {
    data,
    addPage,
    updatePage,
    deletePage,
    updatePageSections,
    addCustomSection,
    updateCustomSection,
    updateHero,
    updateAbout,
    updateSectionHeader,
    navigate
  } = useCMS();

  const { pages, customSections = [], hero, about, servicesHeader, portfolioHeader, processHeader, whyUsHeader, testimonialsHeader, contactHeader } = data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editorTab, setEditorTab] = useState('meta'); // 'meta' | 'layout' | 'content'

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

  // Content state for editing section texts & images on page
  const [heroForm, setHeroForm] = useState({ ...hero });
  const [aboutForm, setAboutForm] = useState({ ...about });
  const [servicesForm, setServicesForm] = useState({ ...servicesHeader });
  const [portfolioForm, setPortfolioForm] = useState({ ...portfolioHeader });
  const [processForm, setProcessForm] = useState({ ...processHeader });
  const [whyUsForm, setWhyUsForm] = useState({ ...whyUsHeader });

  const handleOpenAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setEditorTab('meta');
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
    setHeroForm({ ...hero });
    setAboutForm({ ...about });
    setServicesForm({ ...servicesHeader });
    setPortfolioForm({ ...portfolioHeader });
    setProcessForm({ ...processHeader });
    setWhyUsForm({ ...whyUsHeader });
    setEditorTab('meta');
    setIsModalOpen(true);
  };

  const handleSavePageMeta = (e) => {
    e.preventDefault();
    if (editingId) {
      updatePage(editingId, form);
    } else {
      addPage(form);
    }
  };

  const handleSaveAllContent = () => {
    if (editingId) {
      updatePage(editingId, form);
    }
    updateHero(heroForm);
    updateAbout(aboutForm);
    updateSectionHeader('servicesHeader', servicesForm);
    updateSectionHeader('portfolioHeader', portfolioForm);
    updateSectionHeader('processHeader', processForm);
    updateSectionHeader('whyUsHeader', whyUsForm);
    setIsModalOpen(false);
  };

  const handleMoveSection = (index, direction) => {
    const list = [...form.sectionIds];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    setForm({ ...form, sectionIds: list });
    if (editingId) {
      updatePageSections(editingId, list);
    }
  };

  const handleRemoveSectionFromPage = (index) => {
    const list = [...form.sectionIds];
    list.splice(index, 1);
    setForm({ ...form, sectionIds: list });
    if (editingId) {
      updatePageSections(editingId, list);
    }
  };

  const handleAddCustomSectionToPage = (type) => {
    const newSecId = addCustomSection({
      type,
      title: 'New Section Block',
      subtitle: 'Edit this section text or image URL in your CMS.',
      content: 'Detailed body text for your section.'
    });
    const updated = [...form.sectionIds, newSecId];
    setForm({ ...form, sectionIds: updated });
    if (editingId) {
      updatePageSections(editingId, updated);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>
            Full Page & Content Builder
          </h2>
          <p style={{ color: '#8F95B2' }}>
            Click "Edit" on any page to open the full page content, section layout, and text/image editor.
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
                      System Page
                    </span>
                  ) : (
                    <span style={{ color: '#D2F535', fontSize: '0.78rem', fontWeight: 700, background: 'rgba(210,245,53,0.15)', padding: '0.25rem 0.6rem', borderRadius: '100px' }}>
                      User Page
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
                      <Edit size={14} /> Full Edit
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

      {/* 1-STOP FULL PAGE EDITOR MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px' }}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.3rem', color: '#ffffff' }}>
                  Full Page Editor — {form.title || 'New Page'}
                </h3>
                <span style={{ fontSize: '0.82rem', color: '#D2F535', fontFamily: 'JetBrains Mono' }}>
                  Route: {form.slug || '/'}
                </span>
              </div>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* Editor Sub-Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', background: '#0B0E17', padding: '0.5rem 1.5rem 0' }}>
              <button
                className={`filter-btn ${editorTab === 'meta' ? 'active' : ''}`}
                style={{ borderRadius: '8px 8px 0 0', borderBottom: 'none' }}
                onClick={() => setEditorTab('meta')}
              >
                <Settings size={15} inline /> Page Settings & SEO
              </button>
              <button
                className={`filter-btn ${editorTab === 'layout' ? 'active' : ''}`}
                style={{ borderRadius: '8px 8px 0 0', borderBottom: 'none' }}
                onClick={() => setEditorTab('layout')}
              >
                <Layers size={15} inline /> Section Order ({form.sectionIds?.length || 0})
              </button>
              <button
                className={`filter-btn ${editorTab === 'content' ? 'active' : ''}`}
                style={{ borderRadius: '8px 8px 0 0', borderBottom: 'none' }}
                onClick={() => setEditorTab('content')}
              >
                <Type size={15} inline /> Edit Section Texts & Images
              </button>
            </div>

            <div className="modal-body">
              {/* TAB 1: Page Settings & Meta */}
              {editorTab === 'meta' && (
                <form onSubmit={handleSavePageMeta}>
                  <div className="admin-form-group">
                    <label>Page Title *</label>
                    <input
                      type="text"
                      className="admin-input"
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
                      value={form.slug}
                      onChange={(e) => setForm({ ...form, slug: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Meta Description</label>
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
                      <span>Show in Navigation Bar</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={form.inFooter}
                        onChange={(e) => setForm({ ...form, inFooter: e.target.checked })}
                      />
                      <span>Show in Footer</span>
                    </label>
                  </div>

                  <button type="submit" className="btn-admin-save" style={{ marginTop: '1rem' }}>
                    <Save size={16} /> Save Page Settings
                  </button>
                </form>
              )}

              {/* TAB 2: Page Layout & Section Re-Ordering */}
              {editorTab === 'layout' && (
                <div>
                  <h4 style={{ color: '#ffffff', marginBottom: '1rem' }}>Add New Section Block to this Page</h4>
                  <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    <button className="btn-hero-ghost" style={{ fontSize: '0.85rem' }} onClick={() => handleAddCustomSectionToPage('ctaBanner')}>
                      + Call-To-Action Box
                    </button>
                    <button className="btn-hero-ghost" style={{ fontSize: '0.85rem' }} onClick={() => handleAddCustomSectionToPage('textBlock')}>
                      + Text Paragraph Block
                    </button>
                    <button className="btn-hero-ghost" style={{ fontSize: '0.85rem' }} onClick={() => handleAddCustomSectionToPage('videoEmbed')}>
                      + Video Media Section
                    </button>
                  </div>

                  <h4 style={{ color: '#ffffff', marginBottom: '1rem' }}>Section Sequence on Page</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {form.sectionIds.map((secId, idx) => {
                      const isCustom = secId.startsWith('custom-sec-');
                      const customSecObj = isCustom ? customSections.find((c) => c.id === secId) : null;

                      return (
                        <div
                          key={`${secId}-${idx}`}
                          style={{
                            background: '#07090E',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            padding: '1rem 1.4rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <span style={{ color: '#D2F535', fontWeight: 800, fontFamily: 'JetBrains Mono' }}>
                              0{idx + 1}
                            </span>
                            <strong style={{ color: '#ffffff', textTransform: 'capitalize' }}>
                              {isCustom ? customSecObj?.title || 'Custom Section' : secId}
                            </strong>
                          </div>

                          <div style={{ display: 'flex', gap: '0.4rem' }}>
                            <button
                              onClick={() => handleMoveSection(idx, -1)}
                              disabled={idx === 0}
                              style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', padding: '0.3rem 0.5rem', borderRadius: '4px', cursor: 'pointer', opacity: idx === 0 ? 0.4 : 1 }}
                            >
                              <ArrowUp size={14} />
                            </button>
                            <button
                              onClick={() => handleMoveSection(idx, 1)}
                              disabled={idx === form.sectionIds.length - 1}
                              style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', padding: '0.3rem 0.5rem', borderRadius: '4px', cursor: 'pointer', opacity: idx === form.sectionIds.length - 1 ? 0.4 : 1 }}
                            >
                              <ArrowDown size={14} />
                            </button>
                            <button onClick={() => handleRemoveSectionFromPage(idx)} className="btn-admin-delete" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: Edit Section Texts & Image URLs on Page */}
              {editorTab === 'content' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {form.sectionIds.includes('hero') && (
                    <div style={{ background: '#07090E', padding: '1.4rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <h4 style={{ color: '#D2F535', marginBottom: '1rem' }}>Hero Banner Content & Image</h4>
                      <div className="admin-form-group">
                        <label>Headline Line 1</label>
                        <input type="text" className="admin-input" value={heroForm.titleLine1} onChange={(e) => setHeroForm({ ...heroForm, titleLine1: e.target.value })} />
                      </div>
                      <div className="admin-form-group">
                        <label>Headline Highlight Text</label>
                        <input type="text" className="admin-input" value={heroForm.titleHighlight} onChange={(e) => setHeroForm({ ...heroForm, titleHighlight: e.target.value })} />
                      </div>
                      <div className="admin-form-group">
                        <label>Description Paragraph</label>
                        <textarea className="admin-input" rows="2" value={heroForm.description} onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}></textarea>
                      </div>
                      <div className="admin-form-group">
                        <label>Hero Image URL</label>
                        <input type="url" className="admin-input" value={heroForm.heroImageUrl || ''} onChange={(e) => setHeroForm({ ...heroForm, heroImageUrl: e.target.value })} />
                      </div>
                    </div>
                  )}

                  {form.sectionIds.includes('about') && (
                    <div style={{ background: '#07090E', padding: '1.4rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <h4 style={{ color: '#D2F535', marginBottom: '1rem' }}>About Section Content & Image</h4>
                      <div className="admin-form-group">
                        <label>About Title</label>
                        <input type="text" className="admin-input" value={aboutForm.title} onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })} />
                      </div>
                      <div className="admin-form-group">
                        <label>Paragraph 1</label>
                        <textarea className="admin-input" rows="2" value={aboutForm.paragraph1} onChange={(e) => setAboutForm({ ...aboutForm, paragraph1: e.target.value })}></textarea>
                      </div>
                      <div className="admin-form-group">
                        <label>About Image URL</label>
                        <input type="url" className="admin-input" value={aboutForm.aboutImageUrl || ''} onChange={(e) => setAboutForm({ ...aboutForm, aboutImageUrl: e.target.value })} />
                      </div>
                    </div>
                  )}

                  {form.sectionIds.includes('services') && (
                    <div style={{ background: '#07090E', padding: '1.4rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <h4 style={{ color: '#D2F535', marginBottom: '1rem' }}>Services Section Headline</h4>
                      <div className="admin-form-group">
                        <label>Title</label>
                        <input type="text" className="admin-input" value={servicesForm.title} onChange={(e) => setServicesForm({ ...servicesForm, title: e.target.value })} />
                      </div>
                      <div className="admin-form-group">
                        <label>Subtitle Description</label>
                        <textarea className="admin-input" rows="2" value={servicesForm.subtitle} onChange={(e) => setServicesForm({ ...servicesForm, subtitle: e.target.value })}></textarea>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <button type="button" className="btn-hero-ghost" style={{ color: '#fff', borderColor: '#444' }} onClick={() => setIsModalOpen(false)}>
                  Close
                </button>
                <button type="button" className="btn-admin-save" onClick={handleSaveAllContent}>
                  <Save size={16} /> Save All Page Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
