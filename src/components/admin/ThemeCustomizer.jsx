import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Palette, Save, Sparkles, Layout, Code } from 'lucide-react';

export const ThemeCustomizer = () => {
  const { data, updateThemeConfig } = useCMS();
  const { themeConfig = {} } = data;

  const [form, setForm] = useState({ ...themeConfig });

  const presetPalettes = [
    { name: 'Xstar Lime & Violet (Default)', primary: '#D2F535', secondary: '#4B4EFF', amber: '#FF8A3D', bg: '#07090E' },
    { name: 'Electric Cyan & Indigo', primary: '#00F2FE', secondary: '#4FACFE', amber: '#FF8A3D', bg: '#060B19' },
    { name: 'Golden Amber & Obsidian', primary: '#FFD700', secondary: '#FF8A3D', amber: '#FF8A3D', bg: '#0B0E17' },
    { name: 'Emerald Neon & Dark Slate', primary: '#00E676', secondary: '#3D5AFE', amber: '#FF9100', bg: '#09120D' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    updateThemeConfig(form);
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
    updateThemeConfig(updated);
  };

  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>
        Global Theme & Style Customizer
      </h2>
      <p style={{ color: '#8F95B2', marginBottom: '2rem' }}>
        Customize brand accent colors, background themes, font pairings, and custom CSS without writing code.
      </p>

      {/* Preset Color Palettes */}
      <div className="admin-card">
        <h3><Sparkles size={18} inline /> Quick Theme Presets</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          {presetPalettes.map((preset, idx) => (
            <div
              key={idx}
              onClick={() => handleApplyPreset(preset)}
              style={{
                background: '#07090E',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '12px',
                padding: '1.2rem',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
            >
              <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.8rem', fontSize: '0.92rem' }}>
                {preset.name}
              </strong>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: preset.primary, border: '1px solid #fff' }} />
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: preset.secondary }} />
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: preset.amber }} />
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: preset.bg, border: '1px solid rgba(255,255,255,0.2)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Theme Editor */}
      <div className="admin-card">
        <h3><Palette size={18} inline /> Custom Color & Font Settings</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="admin-form-group">
              <label>Primary Accent Color (Hex)</label>
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <input
                  type="color"
                  value={form.primaryAccent || '#D2F535'}
                  onChange={(e) => setForm({ ...form, primaryAccent: e.target.value })}
                  style={{ width: '45px', height: '42px', border: 'none', background: 'none', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  className="admin-input"
                  value={form.primaryAccent || '#D2F535'}
                  onChange={(e) => setForm({ ...form, primaryAccent: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label>Secondary Accent Color (Hex)</label>
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <input
                  type="color"
                  value={form.secondaryAccent || '#4B4EFF'}
                  onChange={(e) => setForm({ ...form, secondaryAccent: e.target.value })}
                  style={{ width: '45px', height: '42px', border: 'none', background: 'none', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  className="admin-input"
                  value={form.secondaryAccent || '#4B4EFF'}
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
                value={form.bgTheme || '#07090E'}
                onChange={(e) => setForm({ ...form, bgTheme: e.target.value })}
              >
                <option value="#07090E">Obsidian Deep (#07090E)</option>
                <option value="#121212">Matte Dark (#121212)</option>
                <option value="#0B0E17">Midnight Navy (#0B0E17)</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label>Border Radius Style</label>
              <select
                className="admin-input"
                value={form.borderRadius || '14px'}
                onChange={(e) => setForm({ ...form, borderRadius: e.target.value })}
              >
                <option value="4px">Sharp Modern (4px)</option>
                <option value="14px">Smooth Curved (14px)</option>
                <option value="24px">Extra Rounded (24px)</option>
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label><Code size={14} inline /> Custom CSS Overrides</label>
            <textarea
              className="admin-input font-mono"
              rows="4"
              placeholder=".hero h1 { text-transform: uppercase; }"
              value={form.customCss || ''}
              onChange={(e) => setForm({ ...form, customCss: e.target.value })}
            ></textarea>
          </div>

          <button type="submit" className="btn-admin-save">
            <Save size={16} /> Save Theme Customizations
          </button>
        </form>
      </div>
    </div>
  );
};
