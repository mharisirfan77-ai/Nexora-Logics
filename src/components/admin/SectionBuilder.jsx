import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Plus, Trash2, ArrowUp, ArrowDown, Layers, Type, Image as ImageIcon, Video, Code, HelpCircle, Save, ChevronDown, ChevronUp, Edit3 } from 'lucide-react';

export const SectionBuilder = () => {
  const {
    data,
    addCustomSection,
    updateCustomSection,
    deleteCustomSection,
    updatePageSections,
    updateHero,
    updateAbout,
    updateSectionHeader
  } = useCMS();

  const { pages, customSections = [], hero, about, servicesHeader, portfolioHeader, processHeader, whyUsHeader, testimonialsHeader, contactHeader } = data;

  const [selectedPageId, setSelectedPageId] = useState(pages[0]?.id || 'page-home');
  const [newSecType, setNewSecType] = useState('ctaBanner');
  const [expandedSecId, setExpandedSecId] = useState(null);

  const selectedPage = pages.find((p) => p.id === selectedPageId) || pages[0];

  // Forms for editing built-in section headers
  const [heroForm, setHeroForm] = useState({ ...hero });
  const [aboutForm, setAboutForm] = useState({ ...about });
  const [servicesForm, setServicesForm] = useState({ ...servicesHeader });
  const [portfolioForm, setPortfolioForm] = useState({ ...portfolioHeader });
  const [processForm, setProcessForm] = useState({ ...processHeader });
  const [whyUsForm, setWhyUsForm] = useState({ ...whyUsHeader });

  const handleAddSection = () => {
    let newSecPayload = {
      type: newSecType,
      title: 'New Section Block Title',
      subtitle: 'Add custom headline and paragraph content here.',
      content: 'Write your detailed body paragraph content or markdown here.',
      buttonText: 'Learn More ↗',
      buttonLink: '/contact',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
      videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      htmlContent: '<div style="padding:2rem; background:#181818; border-radius:12px; text-align:center;"><h3>Custom Content Block</h3><p>Inject custom HTML, embeds, or code snippet.</p></div>'
    };

    if (newSecType === 'ctaBanner') {
      newSecPayload.title = 'Ready to Scale Your Digital Brand?';
      newSecPayload.subtitle = 'Get a customized digital proposal within 24 hours.';
      newSecPayload.buttonText = 'Get Started ↗';
    } else if (newSecType === 'textBlock') {
      newSecPayload.title = 'Our Agency Vision & Strategic Approach';
      newSecPayload.subtitle = 'Connecting creative design, web engineering, and ROI marketing.';
      newSecPayload.content = 'At Nexora Logics, we build digital ecosystems engineered to deliver measurable customer growth and brand authority.';
    } else if (newSecType === 'videoEmbed') {
      newSecPayload.title = 'Watch Our Agency Reel';
      newSecPayload.subtitle = 'A 2-minute overview of our work culture, strategy, and client deliverables.';
    }

    const createdSecId = addCustomSection(newSecPayload);
    const updatedSecIds = [...(selectedPage?.sectionIds || []), createdSecId];
    updatePageSections(selectedPage.id, updatedSecIds);
    setExpandedSecId(createdSecId);
  };

  const handleMoveSection = (index, direction) => {
    const list = [...selectedPage.sectionIds];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    updatePageSections(selectedPage.id, list);
  };

  const handleRemoveSectionFromPage = (index) => {
    const list = [...selectedPage.sectionIds];
    list.splice(index, 1);
    updatePageSections(selectedPage.id, list);
  };

  const toggleExpand = (secId) => {
    setExpandedSecId(expandedSecId === secId ? null : secId);
  };

  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>
        Dynamic Section Builder & Content Editor
      </h2>
      <p style={{ color: '#8F95B2', marginBottom: '2rem' }}>
        Select a target page, add section blocks, and click "✏️ Edit Content" to customize headlines, body text, image URLs, and button links inline!
      </p>

      {/* 1. Select Target Page */}
      <div className="admin-card">
        <h3>1. Select Target Page</h3>
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPageId(p.id)}
              className={`filter-btn ${selectedPageId === p.id ? 'active' : ''}`}
            >
              {p.title} ({p.slug})
            </button>
          ))}
        </div>
      </div>

      {/* 2. Add New Section to Selected Page */}
      <div className="admin-card">
        <h3>2. Add New Section to "{selectedPage?.title}"</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            className="admin-input"
            style={{ maxWidth: '320px' }}
            value={newSecType}
            onChange={(e) => setNewSecType(e.target.value)}
          >
            <option value="ctaBanner">Call-To-Action Box</option>
            <option value="textBlock">Text & Paragraph Block</option>
            <option value="videoEmbed">Video Media Section</option>
            <option value="html">Custom HTML / Content Block</option>
          </select>
          <button className="btn-admin-save" onClick={handleAddSection}>
            <Plus size={18} /> Add Section Block to Page
          </button>
        </div>
      </div>

      {/* 3. Section Sequence & Inline Content Editors */}
      <div className="admin-card">
        <h3>3. Page Section Blocks ({selectedPage?.sectionIds?.length || 0} Total)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {selectedPage?.sectionIds?.map((secId, idx) => {
            const isCustom = secId.startsWith('custom-sec-');
            const customSecObj = isCustom ? customSections.find((c) => c.id === secId) : null;
            const isExpanded = expandedSecId === secId;

            return (
              <div
                key={`${secId}-${idx}`}
                style={{
                  background: '#07090E',
                  border: isExpanded ? '1px solid #D2F535' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '1.4rem 1.6rem',
                  transition: 'border-color 0.2s ease'
                }}
              >
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <span style={{ color: '#D2F535', fontWeight: 800, fontSize: '1.1rem', fontFamily: 'JetBrains Mono' }}>
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <div>
                      <strong style={{ color: '#ffffff', fontSize: '1.1rem', textTransform: 'capitalize', display: 'block' }}>
                        {isCustom ? customSecObj?.title || 'Custom Section' : secId}
                      </strong>
                      <span style={{ color: '#8F95B2', fontSize: '0.8rem' }}>
                        Type: {isCustom ? customSecObj?.type : 'Built-in System Section'}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                    <button
                      onClick={() => toggleExpand(secId)}
                      style={{ background: isExpanded ? '#D2F535' : '#4B4EFF', color: isExpanded ? '#121212' : '#ffffff', border: 'none', padding: '0.45rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      <Edit3 size={15} /> {isExpanded ? 'Close Content Form' : '✏️ Edit Section Content'}
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    <button
                      onClick={() => handleMoveSection(idx, -1)}
                      disabled={idx === 0}
                      style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', padding: '0.45rem 0.65rem', borderRadius: '6px', cursor: 'pointer', opacity: idx === 0 ? 0.4 : 1 }}
                      title="Move Up"
                    >
                      <ArrowUp size={16} />
                    </button>
                    <button
                      onClick={() => handleMoveSection(idx, 1)}
                      disabled={idx === selectedPage.sectionIds.length - 1}
                      style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', padding: '0.45rem 0.65rem', borderRadius: '6px', cursor: 'pointer', opacity: idx === selectedPage.sectionIds.length - 1 ? 0.4 : 1 }}
                      title="Move Down"
                    >
                      <ArrowDown size={16} />
                    </button>
                    <button
                      onClick={() => handleRemoveSectionFromPage(idx)}
                      className="btn-admin-delete"
                      style={{ padding: '0.45rem 0.8rem', fontSize: '0.8rem' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* EXPANDABLE INLINE CONTENT FORM EDITOR */}
                {isExpanded && (
                  <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    {isCustom && customSecObj ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <div className="admin-form-group">
                          <label>Section Title *</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={customSecObj.title || ''}
                            onChange={(e) => updateCustomSection(secId, { title: e.target.value })}
                          />
                        </div>

                        <div className="admin-form-group">
                          <label>Subtitle / Headline Lead</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={customSecObj.subtitle || ''}
                            onChange={(e) => updateCustomSection(secId, { subtitle: e.target.value })}
                          />
                        </div>

                        {customSecObj.type === 'textBlock' && (
                          <div className="admin-form-group">
                            <label>Full Body Paragraph Content</label>
                            <textarea
                              className="admin-input"
                              rows="4"
                              value={customSecObj.content || ''}
                              onChange={(e) => updateCustomSection(secId, { content: e.target.value })}
                            ></textarea>
                          </div>
                        )}

                        {customSecObj.type === 'ctaBanner' && (
                          <>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                              <div className="admin-form-group">
                                <label>Button Text</label>
                                <input
                                  type="text"
                                  className="admin-input"
                                  value={customSecObj.buttonText || ''}
                                  onChange={(e) => updateCustomSection(secId, { buttonText: e.target.value })}
                                />
                              </div>
                              <div className="admin-form-group">
                                <label>Button Link URL</label>
                                <input
                                  type="text"
                                  className="admin-input"
                                  value={customSecObj.buttonLink || ''}
                                  onChange={(e) => updateCustomSection(secId, { buttonLink: e.target.value })}
                                />
                              </div>
                            </div>
                            <div className="admin-form-group">
                              <label>Background Image URL</label>
                              <input
                                type="url"
                                className="admin-input"
                                value={customSecObj.imageUrl || ''}
                                onChange={(e) => updateCustomSection(secId, { imageUrl: e.target.value })}
                              />
                            </div>
                          </>
                        )}

                        {customSecObj.type === 'videoEmbed' && (
                          <div className="admin-form-group">
                            <label>Video Embed URL (YouTube / Vimeo)</label>
                            <input
                              type="url"
                              className="admin-input"
                              value={customSecObj.videoUrl || ''}
                              onChange={(e) => updateCustomSection(secId, { videoUrl: e.target.value })}
                            />
                          </div>
                        )}

                        {customSecObj.type === 'html' && (
                          <div className="admin-form-group">
                            <label>HTML / Code Content</label>
                            <textarea
                              className="admin-input font-mono"
                              rows="5"
                              value={customSecObj.htmlContent || ''}
                              onChange={(e) => updateCustomSection(secId, { htmlContent: e.target.value })}
                            ></textarea>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Form for Built-in System Section Headers */
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        {secId === 'hero' && (
                          <>
                            <div className="admin-form-group">
                              <label>Hero Headline</label>
                              <input
                                type="text"
                                className="admin-input"
                                value={heroForm.titleLine1 || ''}
                                onChange={(e) => setHeroForm({ ...heroForm, titleLine1: e.target.value })}
                              />
                            </div>
                            <div className="admin-form-group">
                              <label>Hero Highlight Text</label>
                              <input
                                type="text"
                                className="admin-input"
                                value={heroForm.titleHighlight || ''}
                                onChange={(e) => setHeroForm({ ...heroForm, titleHighlight: e.target.value })}
                              />
                            </div>
                            <div className="admin-form-group">
                              <label>Description Paragraph</label>
                              <textarea
                                className="admin-input"
                                rows="3"
                                value={heroForm.description || ''}
                                onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                              ></textarea>
                            </div>
                            <button
                              className="btn-admin-save"
                              onClick={() => updateHero(heroForm)}
                            >
                              <Save size={16} /> Save Hero Section
                            </button>
                          </>
                        )}

                        {secId === 'about' && (
                          <>
                            <div className="admin-form-group">
                              <label>About Title</label>
                              <input
                                type="text"
                                className="admin-input"
                                value={aboutForm.title || ''}
                                onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                              />
                            </div>
                            <div className="admin-form-group">
                              <label>Paragraph Content</label>
                              <textarea
                                className="admin-input"
                                rows="3"
                                value={aboutForm.paragraph1 || ''}
                                onChange={(e) => setAboutForm({ ...aboutForm, paragraph1: e.target.value })}
                              ></textarea>
                            </div>
                            <div className="admin-form-group">
                              <label>About Image URL</label>
                              <input
                                type="url"
                                className="admin-input"
                                value={aboutForm.aboutImageUrl || ''}
                                onChange={(e) => setAboutForm({ ...aboutForm, aboutImageUrl: e.target.value })}
                              />
                            </div>
                            <button
                              className="btn-admin-save"
                              onClick={() => updateAbout(aboutForm)}
                            >
                              <Save size={16} /> Save About Section
                            </button>
                          </>
                        )}

                        {secId === 'services' && (
                          <>
                            <div className="admin-form-group">
                              <label>Services Section Title</label>
                              <input
                                type="text"
                                className="admin-input"
                                value={servicesForm.title || ''}
                                onChange={(e) => setServicesForm({ ...servicesForm, title: e.target.value })}
                              />
                            </div>
                            <div className="admin-form-group">
                              <label>Subtitle Description</label>
                              <textarea
                                className="admin-input"
                                rows="2"
                                value={servicesForm.subtitle || ''}
                                onChange={(e) => setServicesForm({ ...servicesForm, subtitle: e.target.value })}
                              ></textarea>
                            </div>
                            <button
                              className="btn-admin-save"
                              onClick={() => updateSectionHeader('servicesHeader', servicesForm)}
                            >
                              <Save size={16} /> Save Services Title
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
