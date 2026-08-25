import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Save } from 'lucide-react';

export const SettingsEditor = () => {
  const { data, updateSiteInfo, updateHero } = useCMS();
  const { siteInfo, hero } = data;

  const [siteForm, setSiteForm] = useState({ ...siteInfo });
  const [heroForm, setHeroForm] = useState({ ...hero });

  const handleSaveSiteInfo = (e) => {
    e.preventDefault();
    updateSiteInfo(siteForm);
  };

  const handleSaveHero = (e) => {
    e.preventDefault();
    updateHero(heroForm);
  };

  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 700, color: '#0B0E17', marginBottom: '0.4rem' }}>
        Site Settings & Banner Copy
      </h2>
      <p style={{ color: '#5B5F76', marginBottom: '2rem' }}>
        Customize your brand name, contact details, hero banner title, descriptions, and CTA button text.
      </p>

      {/* Hero Section Config */}
      <div className="admin-card">
        <h3>Hero Banner Settings</h3>
        <form onSubmit={handleSaveHero}>
          <div className="admin-form-group">
            <label>Hero Badge Pill Text</label>
            <input
              type="text"
              className="admin-input"
              value={heroForm.badge}
              onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label>Headline Line 1</label>
            <input
              type="text"
              className="admin-input"
              value={heroForm.titleLine1}
              onChange={(e) => setHeroForm({ ...heroForm, titleLine1: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label>Headline Highlighted Text (Orange Accent)</label>
            <input
              type="text"
              className="admin-input"
              value={heroForm.titleHighlight}
              onChange={(e) => setHeroForm({ ...heroForm, titleHighlight: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label>Hero Subtitle / Description</label>
            <textarea
              className="admin-input"
              rows="3"
              value={heroForm.description}
              onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
            ></textarea>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="admin-form-group">
              <label>Primary CTA Text</label>
              <input
                type="text"
                className="admin-input"
                value={heroForm.primaryCtaText}
                onChange={(e) => setHeroForm({ ...heroForm, primaryCtaText: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label>Secondary CTA Text</label>
              <input
                type="text"
                className="admin-input"
                value={heroForm.secondaryCtaText}
                onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaText: e.target.value })}
              />
            </div>
          </div>

          <button type="submit" className="btn-admin-save">
            <Save size={16} /> Save Hero Copy
          </button>
        </form>
      </div>

      {/* Brand & Contact Settings */}
      <div className="admin-card">
        <h3>Brand & Contact Info</h3>
        <form onSubmit={handleSaveSiteInfo}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="admin-form-group">
              <label>Brand Name</label>
              <input
                type="text"
                className="admin-input"
                value={siteForm.brandName}
                onChange={(e) => setSiteForm({ ...siteForm, brandName: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label>Contact Email</label>
              <input
                type="email"
                className="admin-input"
                value={siteForm.email}
                onChange={(e) => setSiteForm({ ...siteForm, email: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="admin-form-group">
              <label>Location Note</label>
              <input
                type="text"
                className="admin-input"
                value={siteForm.location}
                onChange={(e) => setSiteForm({ ...siteForm, location: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label>Response Time Note</label>
              <input
                type="text"
                className="admin-input"
                value={siteForm.responseTime}
                onChange={(e) => setSiteForm({ ...siteForm, responseTime: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label>Footer Description</label>
            <textarea
              className="admin-input"
              rows="2"
              value={siteForm.footerBio}
              onChange={(e) => setSiteForm({ ...siteForm, footerBio: e.target.value })}
            ></textarea>
          </div>

          <button type="submit" className="btn-admin-save">
            <Save size={16} /> Save Brand Settings
          </button>
        </form>
      </div>
    </div>
  );
};
