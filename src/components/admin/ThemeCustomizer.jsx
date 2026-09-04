import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Palette, Save, Sparkles, Layout, Code, Type, Layers, CheckCircle2, ArrowLeft } from 'lucide-react';

export const ThemeCustomizer = ({ targetThemeId, onBackToThemes }) => {
  const { data, updateThemeConfig, updateThemeCustomization, activateTheme } = useCMS();
  const { themes = [], activeThemeId, themeConfig = {} } = data;

  const [selectedThemeId, setSelectedThemeId] = useState(targetThemeId || activeThemeId);
  const currentTheme = themes.find((t) => t.id === selectedThemeId) || themes[0] || {};

  const [form, setForm] = useState({
    primaryAccent: currentTheme.colors?.primaryAccent || themeConfig.primaryAccent || '#D2F535',
    secondaryAccent: currentTheme.colors?.secondaryAccent || themeConfig.secondaryAccent || '#4B4EFF',
    amberAccent: currentTheme.colors?.amberAccent || themeConfig.amberAccent || '#FF8A3D',
    bgTheme: currentTheme.colors?.bgTheme || themeConfig.bgTheme || '#07090E',
    fontHeading: currentTheme.typography?.fontHeading || themeConfig.fontHeading || "'Space Grotesk', sans-serif",
    fontBody: currentTheme.typography?.fontBody || themeConfig.fontBody || "'Inter', sans-serif",
    borderRadius: themeConfig.borderRadius || '14px',
    customCss: currentTheme.cssContent || themeConfig.customCss || ''
  });

  useEffect(() => {
    const theme = themes.find((t) => t.id === selectedThemeId);
    if (theme) {
      setForm({
        primaryAccent: theme.colors?.primaryAccent || '#D2F535',
        secondaryAccent: theme.colors?.secondaryAccent || '#4B4EFF',
        amberAccent: theme.colors?.amberAccent || '#FF8A3D',
        bgTheme: theme.colors?.bgTheme || '#07090E',
        fontHeading: theme.typography?.fontHeading || "'Space Grotesk', sans-serif",
        fontBody: theme.typography?.fontBody || "'Inter', sans-serif",
        borderRadius: themeConfig.borderRadius || '14px',
        customCss: theme.cssContent || ''
      });
    }
  }, [selectedThemeId, themes]);

  const presetPalettes = [
    { name: 'Nexora Official Logo (Electric Cyan & Tech Navy)', primary: '#00C9A7', secondary: '#1B4985', amber: '#00E5FF', bg: '#070C18' },
    { name: 'Electric Cyan & Indigo', primary: '#00F2FE', secondary: '#4FACFE', amber: '#FF8A3D', bg: '#060B19' },
    { name: 'Lime Neon & Violet', primary: '#D2F535', secondary: '#4B4EFF', amber: '#FF8A3D', bg: '#07090E' },
    { name: 'Golden Amber & Obsidian', primary: '#FFD700', secondary: '#FF8A3D', amber: '#FF8A3D', bg: '#0B0E17' },
    { name: 'Emerald Neon & Dark Slate', primary: '#00E676', secondary: '#3D5AFE', amber: '#FF9100', bg: '#09120D' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedThemeObj = {
      colors: {
        primaryAccent: form.primaryAccent,
        secondaryAccent: form.secondaryAccent,
        amberAccent: form.amberAccent,
        bgTheme: form.bgTheme
      },
      typography: {
        fontHeading: form.fontHeading,
        fontBody: form.fontBody
      },
      cssContent: form.customCss
    };

    updateThemeCustomization(selectedThemeId, updatedThemeObj);
    updateThemeConfig({
      primaryAccent: form.primaryAccent,
      secondaryAccent: form.secondaryAccent,
      amberAccent: form.amberAccent,
      bgTheme: form.bgTheme,
      fontHeading: form.fontHeading,
      fontBody: form.fontBody,
      borderRadius: form.borderRadius,
      customCss: form.customCss
    });
  };

  const handleApplyPreset = (preset) => {
    const updated = {
      ...form,
      primaryAccent: preset.primary,
      secondaryAccent: preset.secondary,
      amberAccent: preset.amber,
      bgTheme: preset.bg
    };
    setForm(updated);
  };

  const isActiveTheme = selectedThemeId === activeThemeId;

  return (
    <div>
      {/* Top Controls & Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          {onBackToThemes && (
            <button
              onClick={onBackToThemes}
              style={{ background: 'none', border: 'none', color: '#2271b1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.4rem' }}
            >
              <ArrowLeft size={16} /> Back to Themes Gallery
            </button>
          )}
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
            WordPress Live Theme Customizer
          </h2>
          <p style={{ color: '#8F95B2', margin: '0.3rem 0 0' }}>
            Customize styling, accent colors, Google Fonts, and custom CSS for installed WordPress themes.
          </p>
        </div>

        {/* Theme Selector Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: '#161b22', padding: '0.6rem 1rem', borderRadius: '12px', border: '1px solid #30363d' }}>
          <span style={{ fontSize: '0.85rem', color: '#8F95B2' }}>Editing Theme:</span>
          <select
            value={selectedThemeId}
            onChange={(e) => setSelectedThemeId(e.target.value)}
            style={{ background: '#0d1117', color: '#ffffff', border: '1px solid #30363d', borderRadius: '6px', padding: '0.4rem 0.8rem', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}
          >
            {themes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} {t.id === activeThemeId ? '(Active)' : ''}
              </option>
            ))}
          </select>

          {!isActiveTheme && (
            <button
              type="button"
              onClick={() => activateTheme(selectedThemeId)}
              style={{ background: '#2271b1', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            >
              <CheckCircle2 size={14} /> Activate Theme
            </button>
          )}
        </div>
      </div>

      {/* Quick Theme Presets */}
      <div className="admin-card" style={{ marginBottom: '2rem' }}>
        <h3><Sparkles size={18} inline /> Color Palette Presets</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          {presetPalettes.map((preset, idx) => (
            <div
              key={idx}
              onClick={() => handleApplyPreset(preset)}
              style={{
                background: '#07090E',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '12px',
                padding: '1rem',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
            >
              <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.6rem', fontSize: '0.88rem' }}>
                {preset.name}
              </strong>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: preset.primary, border: '1px solid #fff' }} />
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: preset.secondary }} />
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: preset.amber }} />
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: preset.bg, border: '1px solid rgba(255,255,255,0.2)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Theme Customizer Main Form */}
      <form onSubmit={handleSubmit}>
        <div className="admin-card" style={{ marginBottom: '2rem' }}>
          <h3><Palette size={18} inline /> Color Scheme & Theme Accents</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
            <div className="admin-form-group">
              <label>Primary Brand Accent Color</label>
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <input
                  type="color"
                  value={form.primaryAccent}
                  onChange={(e) => setForm({ ...form, primaryAccent: e.target.value })}
                  style={{ width: '45px', height: '42px', border: 'none', background: 'none', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  className="admin-input"
                  value={form.primaryAccent}
                  onChange={(e) => setForm({ ...form, primaryAccent: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label>Secondary Accent Color</label>
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <input
                  type="color"
                  value={form.secondaryAccent}
                  onChange={(e) => setForm({ ...form, secondaryAccent: e.target.value })}
                  style={{ width: '45px', height: '42px', border: 'none', background: 'none', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  className="admin-input"
                  value={form.secondaryAccent}
                  onChange={(e) => setForm({ ...form, secondaryAccent: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="admin-form-group">
              <label>Background Theme Mode</label>
              <select
                className="admin-input"
                value={form.bgTheme}
                onChange={(e) => setForm({ ...form, bgTheme: e.target.value })}
              >
                <option value="#07090E">Obsidian Deep (#07090E)</option>
                <option value="#0F172A">Slate Midnight (#0F172A)</option>
                <option value="#050B14">Cyber Midnight (#050B14)</option>
                <option value="#121212">Matte Dark (#121212)</option>
                <option value="#F8FAFC">Clean Light Mode (#F8FAFC)</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label>Card Border Radius Style</label>
              <select
                className="admin-input"
                value={form.borderRadius}
                onChange={(e) => setForm({ ...form, borderRadius: e.target.value })}
              >
                <option value="4px">Sharp Modern (4px)</option>
                <option value="14px">Smooth Curved (14px)</option>
                <option value="24px">Extra Rounded (24px)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Typography Settings */}
        <div className="admin-card" style={{ marginBottom: '2rem' }}>
          <h3><Type size={18} inline /> Theme Typography & Google Fonts</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
            <div className="admin-form-group">
              <label>Heading Font Family</label>
              <select
                className="admin-input"
                value={form.fontHeading}
                onChange={(e) => setForm({ ...form, fontHeading: e.target.value })}
              >
                <option value="'Space Grotesk', sans-serif">Space Grotesk (Modern Tech)</option>
                <option value="'Plus Jakarta Sans', sans-serif">Plus Jakarta Sans (Clean Geometric)</option>
                <option value="'Outfit', sans-serif">Outfit (Bold Modern)</option>
                <option value="'Playfair Display', serif">Playfair Display (Serif Elegance)</option>
                <option value="'Inter', sans-serif">Inter (Standard Modern)</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label>Body Text Font Family</label>
              <select
                className="admin-input"
                value={form.fontBody}
                onChange={(e) => setForm({ ...form, fontBody: e.target.value })}
              >
                <option value="'Inter', sans-serif">Inter (Highly Readable)</option>
                <option value="'Roboto', sans-serif">Roboto (Clean Corporate)</option>
                <option value="'Plus Jakarta Sans', sans-serif">Plus Jakarta Sans</option>
              </select>
            </div>
          </div>
        </div>

        {/* Custom CSS Editor */}
        <div className="admin-card" style={{ marginBottom: '2rem' }}>
          <h3><Code size={18} inline /> Extracted Style.css & Custom CSS Overrides</h3>
          <p style={{ color: '#8F95B2', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Modify custom CSS variables, theme stylesheet rules, and global component overrides.
          </p>
          <div className="admin-form-group">
            <textarea
              className="admin-input font-mono"
              rows="8"
              placeholder="/* Add theme CSS overrides here */"
              value={form.customCss}
              onChange={(e) => setForm({ ...form, customCss: e.target.value })}
              style={{ fontSize: '0.88rem', lineHeight: '1.5' }}
            ></textarea>
          </div>
        </div>

        <button type="submit" className="btn-admin-save" style={{ width: '100%', justifyContent: 'center', padding: '0.9rem' }}>
          <Save size={18} /> Save & Apply Theme Customizations
        </button>
      </form>
    </div>
  );
};
