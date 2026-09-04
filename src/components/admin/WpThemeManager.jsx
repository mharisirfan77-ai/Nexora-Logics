import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import {
  UploadCloud,
  CheckCircle2,
  Sliders,
  Download,
  Trash2,
  FolderTree,
  FileCode,
  Sparkles,
  Info,
  X,
  ExternalLink,
  ShieldCheck,
  Eye
} from 'lucide-react';

export const WpThemeManager = ({ onSelectCustomize }) => {
  const {
    data,
    activateTheme,
    uploadThemeZip,
    deleteTheme,
    exportThemeZip
  } = useCMS();

  const { themes = [], activeThemeId } = data;
  const activeTheme = themes.find((t) => t.id === activeThemeId) || themes[0];

  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [inspectModalTheme, setInspectModalTheme] = useState(null);
  const [activeInspectFile, setActiveInspectFile] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processZipFile(file);
    e.target.value = '';
  };

  const processZipFile = async (file) => {
    if (!file.name.endsWith('.zip')) {
      alert('Please select a valid WordPress theme .zip archive file.');
      return;
    }
    setIsUploading(true);
    try {
      await uploadThemeZip(file);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processZipFile(file);
    }
  };

  const openInspectModal = (theme) => {
    setInspectModalTheme(theme);
    if (theme.files && theme.files.length > 0) {
      setActiveInspectFile(theme.files[0]);
    } else {
      setActiveInspectFile(null);
    }
  };

  return (
    <div style={{ color: '#f0f6fc' }}>
      {/* Title & Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
            <div style={{ background: '#2271b1', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem', fontFamily: 'Space Grotesk' }}>
              W
            </div>
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
              WordPress Themes & ZIP Installer
            </h2>
          </div>
          <p style={{ color: '#8F95B2', margin: 0 }}>
            Upload any WordPress theme <code style={{ background: 'rgba(255,255,255,0.1)', padding: '0.15rem 0.4rem', borderRadius: '4px', color: '#D2F535' }}>.zip</code> archive to extract styles, template files, and customization options client-side.
          </p>
        </div>
      </div>

      {/* ZIP Upload Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          background: dragOver ? 'rgba(34, 113, 177, 0.15)' : '#161b22',
          border: `2px dashed ${dragOver ? '#2271b1' : '#30363d'}`,
          borderRadius: '16px',
          padding: '2.5rem 1.5rem',
          textAlign: 'center',
          marginBottom: '2.5rem',
          transition: 'all 0.2s ease',
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
        }}
      >
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(34, 113, 177, 0.15)', color: '#2271b1', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem' }}>
          <UploadCloud size={28} />
        </div>
        <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.2rem', color: '#ffffff', marginBottom: '0.5rem' }}>
          Upload WordPress Theme (.zip)
        </h3>
        <p style={{ color: '#8F95B2', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
          If you have a WordPress theme in a .zip format (e.g., Twenty Twenty-Four, Astra, OceanWP, Neve, or custom themes), drag & drop it here or browse to install.
        </p>

        <label
          htmlFor="theme-zip-input"
          className="btn-hero-primary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            cursor: isUploading ? 'not-allowed' : 'pointer',
            opacity: isUploading ? 0.7 : 1,
            padding: '0.75rem 1.8rem'
          }}
        >
          {isUploading ? (
            <>
              <div className="spinner" style={{ width: '16px', height: '16px', border: '2px solid #000', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              Extracting Theme ZIP...
            </>
          ) : (
            <>
              <UploadCloud size={18} /> Choose Theme ZIP File
            </>
          )}
        </label>
        <input
          id="theme-zip-input"
          type="file"
          accept=".zip"
          onChange={handleFileChange}
          disabled={isUploading}
          style={{ display: 'none' }}
        />
      </div>

      {/* Active Theme Highlight Banner */}
      {activeTheme && (
        <div className="admin-card" style={{ background: 'linear-gradient(135deg, #1d2327 0%, #0d1117 100%)', border: '1px solid #2271b1', borderRadius: '16px', padding: '1.8rem', marginBottom: '2.5rem', boxShadow: '0 10px 30px rgba(34,113,177,0.15)' }}>
          <div style={{ display: 'flex', gap: '1.8rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '220px', height: '140px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 }}>
              <img
                src={activeTheme.screenshot}
                alt={activeTheme.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', top: '8px', left: '8px', background: '#2271b1', color: '#fff', fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <CheckCircle2 size={12} /> Active Theme
              </div>
            </div>

            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.4rem', color: '#ffffff', margin: 0 }}>
                  {activeTheme.name}
                </h3>
                <span style={{ background: 'rgba(255,255,255,0.08)', color: '#c3c4c7', fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                  v{activeTheme.version}
                </span>
                {activeTheme.isSystem && (
                  <span style={{ background: 'rgba(210, 245, 53, 0.15)', color: '#D2F535', fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <ShieldCheck size={13} /> Pre-installed System Theme
                  </span>
                )}
              </div>
              <p style={{ color: '#8F95B2', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                {activeTheme.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#8F95B2', fontSize: '0.82rem', flexWrap: 'wrap' }}>
                <span>By <strong>{activeTheme.author}</strong></span>
                <span>•</span>
                <span>Files Extracted: <strong>{activeTheme.files?.length || 0}</strong></span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', minWidth: '160px' }}>
              <button
                onClick={() => onSelectCustomize && onSelectCustomize(activeTheme.id)}
                className="btn-hero-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.6rem 1rem', fontSize: '0.88rem' }}
              >
                <Sliders size={15} /> Customize Theme
              </button>
              <button
                onClick={() => openInspectModal(activeTheme)}
                className="btn-hero-ghost"
                style={{ width: '100%', justifyContent: 'center', padding: '0.6rem 1rem', fontSize: '0.85rem', color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}
              >
                <FileCode size={15} /> Inspect Files ({activeTheme.files?.length || 0})
              </button>
              <button
                onClick={() => exportThemeZip(activeTheme.id)}
                style={{ background: 'none', border: 'none', color: '#8F95B2', cursor: 'pointer', fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
              >
                <Download size={13} /> Export Theme .ZIP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Installed Themes Gallery */}
      <div style={{ marginBottom: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.3rem', color: '#ffffff', margin: 0 }}>
          Installed Themes Gallery ({themes.length})
        </h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {themes.map((theme) => {
          const isActive = theme.id === activeThemeId;
          return (
            <div
              key={theme.id}
              style={{
                background: '#161b22',
                border: isActive ? '2px solid #2271b1' : '1px solid #30363d',
                borderRadius: '14px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, border-color 0.2s ease',
                boxShadow: isActive ? '0 6px 20px rgba(34,113,177,0.2)' : 'none'
              }}
            >
              {/* Cover Screenshot */}
              <div style={{ position: 'relative', height: '160px', background: '#0d1117', overflow: 'hidden' }}>
                <img
                  src={theme.screenshot}
                  alt={theme.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {isActive ? (
                  <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#2271b1', color: '#fff', fontSize: '0.72rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <CheckCircle2 size={12} /> Active
                  </div>
                ) : (
                  <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.7)', color: '#c3c4c7', fontSize: '0.72rem', padding: '0.2rem 0.5rem', borderRadius: '6px', backdropFilter: 'blur(4px)' }}>
                    Installed
                  </div>
                )}

                {/* Color accents palette pill */}
                <div style={{ position: 'absolute', bottom: '10px', right: '10px', display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.75)', padding: '4px 8px', borderRadius: '100px', backdropFilter: 'blur(4px)' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: theme.colors?.primaryAccent || '#D2F535' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: theme.colors?.secondaryAccent || '#4B4EFF' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: theme.colors?.bgTheme || '#07090E' }} />
                </div>
              </div>

              {/* Theme Metadata */}
              <div style={{ padding: '1.2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                  <h4 style={{ fontFamily: 'Space Grotesk', fontSize: '1.1rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>
                    {theme.name}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: '#8F95B2' }}>v{theme.version}</span>
                </div>
                <p style={{ color: '#8F95B2', fontSize: '0.82rem', marginBottom: '1.2rem', lineHeight: '1.4', flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {theme.description}
                </p>

                <div style={{ fontSize: '0.78rem', color: '#6e7681', marginBottom: '1rem' }}>
                  By {theme.author}
                </div>

                {/* Action buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: isActive ? '1fr 1fr' : '1fr 1fr', gap: '0.6rem' }}>
                  {!isActive ? (
                    <button
                      onClick={() => activateTheme(theme.id)}
                      style={{
                        background: '#2271b1',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.5rem',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem'
                      }}
                    >
                      <Sparkles size={14} /> Activate
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectCustomize && onSelectCustomize(theme.id)}
                      style={{
                        background: 'rgba(210, 245, 53, 0.15)',
                        color: '#D2F535',
                        border: '1px solid rgba(210, 245, 53, 0.3)',
                        borderRadius: '6px',
                        padding: '0.5rem',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem'
                      }}
                    >
                      <Sliders size={14} /> Customize
                    </button>
                  )}

                  <button
                    onClick={() => openInspectModal(theme)}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      color: '#c3c4c7',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '6px',
                      padding: '0.5rem',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Eye size={14} /> Files
                  </button>
                </div>

                {/* Secondary row actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.8rem', paddingTop: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <button
                    onClick={() => exportThemeZip(theme.id)}
                    style={{ background: 'none', border: 'none', color: '#8F95B2', cursor: 'pointer', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                  >
                    <Download size={12} /> Export ZIP
                  </button>

                  {!theme.isSystem && !isActive && (
                    <button
                      onClick={() => deleteTheme(theme.id)}
                      style={{ background: 'none', border: 'none', color: '#f85149', cursor: 'pointer', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Theme Files Inspector Modal */}
      {inspectModalTheme && (
        <div className="modal-overlay" onClick={() => setInspectModalTheme(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '850px', width: '90vw', height: '80vh', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}
          >
            {/* Modal Header */}
            <div style={{ padding: '1.2rem 1.5rem', background: '#161b22', borderBottom: '1px solid #30363d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <FolderTree size={20} style={{ color: '#2271b1' }} />
                <div>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.2rem', color: '#ffffff', margin: 0 }}>
                    Theme Files Inspector — {inspectModalTheme.name}
                  </h3>
                  <p style={{ color: '#8F95B2', fontSize: '0.8rem', margin: 0 }}>
                    {inspectModalTheme.files?.length || 0} template & style files extracted from ZIP package
                  </p>
                </div>
              </div>

              <button
                onClick={() => setInspectModalTheme(null)}
                style={{ background: 'none', border: 'none', color: '#8F95B2', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content Split View */}
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
              {/* File Tree Sidebar */}
              <div style={{ width: '240px', background: '#0d1117', borderRight: '1px solid #30363d', overflowY: 'auto', padding: '0.8rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#8F95B2', textTransform: 'uppercase', marginBottom: '0.6rem', paddingLeft: '0.4rem' }}>
                  Extracted Theme Files
                </div>
                {inspectModalTheme.files?.map((file, idx) => {
                  const isSelected = activeInspectFile?.path === file.path;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveInspectFile(file)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        background: isSelected ? '#161b22' : 'transparent',
                        border: isSelected ? '1px solid #2271b1' : '1px solid transparent',
                        borderRadius: '6px',
                        padding: '0.5rem 0.6rem',
                        color: isSelected ? '#ffffff' : '#c3c4c7',
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.2rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      <FileCode size={14} style={{ color: file.name.endsWith('.css') ? '#D2F535' : file.name.endsWith('.json') ? '#38BDF8' : '#8F95B2' }} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Code Viewer */}
              <div style={{ flex: 1, background: '#07090e', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ padding: '0.6rem 1rem', background: '#161b22', borderBottom: '1px solid #30363d', fontSize: '0.8rem', color: '#8F95B2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Path: <strong style={{ color: '#ffffff' }}>{activeInspectFile?.path || 'Select a file'}</strong></span>
                </div>

                <div style={{ flex: 1, padding: '1.2rem', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', color: '#f0f6fc', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                  {activeInspectFile?.content ? (
                    activeInspectFile.content
                  ) : (
                    <em style={{ color: '#8F95B2' }}>[Binary or empty file content]</em>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
