import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Plus, Trash2, Copy, Check, Image as ImageIcon, ExternalLink, X } from 'lucide-react';

export const WpMediaLibrary = () => {
  const { data, addMediaItem, deleteMediaItem, showToast } = useCMS();
  const { mediaLibrary = [] } = data;

  const [newAssetUrl, setNewAssetUrl] = useState('');
  const [newAssetName, setNewAssetName] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const handleAddMedia = (e) => {
    e.preventDefault();
    if (!newAssetUrl.trim()) return;

    addMediaItem({
      name: newAssetName.trim() || 'New Media Asset',
      url: newAssetUrl.trim(),
      type: 'image/jpeg',
      size: '200 KB'
    });

    setNewAssetUrl('');
    setNewAssetName('');
  };

  const handleCopyUrl = (id, url) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showToast('Image URL copied to clipboard!');
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>
            Media Library
          </h2>
          <p style={{ color: '#8F95B2' }}>
            Upload and manage images, logos, and media assets (`/wp-admin/upload.php`). Copy 1-click image URLs for your pages.
          </p>
        </div>
      </div>

      {/* Add New Media Form */}
      <div className="admin-card">
        <h3><Plus size={18} inline /> Add New Media Asset</h3>
        <form onSubmit={handleAddMedia} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr auto', gap: '1rem', marginTop: '1rem', alignItems: 'end' }}>
          <div className="admin-form-group" style={{ marginBottom: 0 }}>
            <label>Image URL *</label>
            <input
              type="url"
              className="admin-input"
              placeholder="https://images.unsplash.com/..."
              value={newAssetUrl}
              onChange={(e) => setNewAssetUrl(e.target.value)}
              required
            />
          </div>

          <div className="admin-form-group" style={{ marginBottom: 0 }}>
            <label>Asset Name</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. Hero Banner Art"
              value={newAssetName}
              onChange={(e) => setNewAssetName(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-admin-save" style={{ height: '44px' }}>
            Add Asset
          </button>
        </form>
      </div>

      {/* Visual Asset Grid */}
      <div className="admin-card">
        <h3>Media Assets ({mediaLibrary.length} Items)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
          {mediaLibrary.map((item) => (
            <div
              key={item.id}
              style={{
                background: '#07090E',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ width: '100%', height: '160px', overflow: 'hidden', background: '#000', position: 'relative' }}>
                <img
                  src={item.url}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
                <strong style={{ color: '#ffffff', fontSize: '0.92rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.name}
                </strong>
                <span style={{ fontSize: '0.78rem', color: '#8F95B2' }}>{item.date} • {item.size}</span>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.8rem' }}>
                  <button
                    onClick={() => handleCopyUrl(item.id, item.url)}
                    style={{
                      flex: 1,
                      background: copiedId === item.id ? '#00a86b' : '#4B4EFF',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.4rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    {copiedId === item.id ? <Check size={14} /> : <Copy size={14} />}
                    {copiedId === item.id ? 'Copied!' : 'Copy URL'}
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete media asset "${item.name}"?`)) {
                        deleteMediaItem(item.id);
                      }
                    }}
                    className="btn-admin-delete"
                    style={{ padding: '0.4rem 0.6rem' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
