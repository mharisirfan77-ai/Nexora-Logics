import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Plus, Trash2, ArrowUp, ArrowDown, Layers, Type, Image as ImageIcon, Video, Code, HelpCircle, Save } from 'lucide-react';

export const SectionBuilder = () => {
  const { data, addCustomSection, updateCustomSection, deleteCustomSection, updatePageSections } = useCMS();
  const { pages, customSections = [] } = data;

  const [selectedPageId, setSelectedPageId] = useState(pages[0]?.id || 'page-home');
  const [newSecType, setNewSecType] = useState('ctaBanner');

  const selectedPage = pages.find((p) => p.id === selectedPageId) || pages[0];

  const handleAddSection = () => {
    let newSecPayload = {
      type: newSecType,
      title: 'New Section Block Title',
      subtitle: 'Customize this section headline and content in your CMS.',
      content: 'Add your detailed body paragraph text or custom message here.'
    };

    if (newSecType === 'ctaBanner') {
      newSecPayload = {
        ...newSecPayload,
        title: 'Ready to Scale Your Brand?',
        subtitle: 'Get a customized digital proposal within 24 hours.',
        buttonText: 'Get Started ↗',
        buttonLink: '/contact',
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80'
      };
    } else if (newSecType === 'videoEmbed') {
      newSecPayload = {
        ...newSecPayload,
        title: 'Watch Agency Video Showcase',
        videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
      };
    } else if (newSecType === 'html') {
      newSecPayload = {
        ...newSecPayload,
        title: 'Custom Content Block',
        htmlContent: '<div style="padding:2rem; background:#181818; border-radius:12px; text-align:center;"><h3>Custom HTML Block</h3><p>Inject custom HTML, embeds, or code snippet.</p></div>'
      };
    }

    const createdSecId = addCustomSection(newSecPayload);
    const updatedSecIds = [...(selectedPage?.sectionIds || []), createdSecId];
    updatePageSections(selectedPage.id, updatedSecIds);
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

  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>
        Dynamic Section Builder
      </h2>
      <p style={{ color: '#8F95B2', marginBottom: '2rem' }}>
        Add new custom section blocks to any page, re-order section sequence, and customize content & media.
      </p>

      {/* Select Target Page */}
      <div className="admin-card">
        <h3>1. Select Target Page</h3>
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
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

      {/* Add New Custom Section */}
      <div className="admin-card">
        <h3>2. Add New Section to "{selectedPage?.title}"</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            className="admin-input"
            style={{ maxWidth: '300px' }}
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

      {/* Re-order & Edit Sections on Current Page */}
      <div className="admin-card">
        <h3>3. Section Order on Page ({selectedPage?.sectionIds?.length || 0} Sections)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {selectedPage?.sectionIds?.map((secId, idx) => {
            const isCustom = secId.startsWith('custom-sec-');
            const customSecObj = isCustom ? customSections.find((c) => c.id === secId) : null;

            return (
              <div
                key={`${secId}-${idx}`}
                style={{
                  background: '#07090E',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  padding: '1.2rem 1.6rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ color: '#D2F535', fontWeight: 800, fontSize: '1rem', fontFamily: 'JetBrains Mono' }}>
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <strong style={{ color: '#ffffff', fontSize: '1.05rem', textTransform: 'capitalize' }}>
                      {isCustom ? customSecObj?.title || 'Custom Section' : secId}
                    </strong>
                    {isCustom && (
                      <span className="tag-pill" style={{ background: 'rgba(75,78,255,0.2)', color: '#C7C9FF' }}>
                        {customSecObj?.type || 'Custom'}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <button
                    onClick={() => handleMoveSection(idx, -1)}
                    disabled={idx === 0}
                    style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', padding: '0.4rem 0.6rem', borderRadius: '6px', cursor: 'pointer', opacity: idx === 0 ? 0.4 : 1 }}
                  >
                    <ArrowUp size={16} />
                  </button>
                  <button
                    onClick={() => handleMoveSection(idx, 1)}
                    disabled={idx === selectedPage.sectionIds.length - 1}
                    style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', padding: '0.4rem 0.6rem', borderRadius: '6px', cursor: 'pointer', opacity: idx === selectedPage.sectionIds.length - 1 ? 0.4 : 1 }}
                  >
                    <ArrowDown size={16} />
                  </button>
                  <button
                    onClick={() => handleRemoveSectionFromPage(idx)}
                    className="btn-admin-delete"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
