import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Save, Image as ImageIcon, Type, Sparkles } from 'lucide-react';

export const SectionTextEditor = () => {
  const {
    data,
    updateHero,
    updateAbout,
    updateSectionHeader
  } = useCMS();

  const { hero, about, servicesHeader, portfolioHeader, processHeader, whyUsHeader, testimonialsHeader, contactHeader } = data;

  const [heroForm, setHeroForm] = useState({ ...hero });
  const [aboutForm, setAboutForm] = useState({ ...about });
  const [servicesForm, setServicesForm] = useState({ ...servicesHeader });
  const [portfolioForm, setPortfolioForm] = useState({ ...portfolioHeader });
  const [processForm, setProcessForm] = useState({ ...processHeader });
  const [whyUsForm, setWhyUsForm] = useState({ ...whyUsHeader });
  const [testimonialsForm, setTestimonialsForm] = useState({ ...testimonialsHeader });
  const [contactForm, setContactForm] = useState({ ...contactHeader });

  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 700, color: '#0B0E17', marginBottom: '0.4rem' }}>
        100% Section Content & Image Editor
      </h2>
      <p style={{ color: '#5B5F76', marginBottom: '2rem' }}>
        Edit headlines, descriptions, paragraphs, and image URLs for every section across all inner pages.
      </p>

      {/* 1. Hero Section Content & Image */}
      <div className="admin-card">
        <h3><Type size={18} inline /> 1. Hero Banner Content & Hero Image</h3>
        <form onSubmit={(e) => { e.preventDefault(); updateHero(heroForm); }}>
          <div className="admin-form-group">
            <label>Hero Badge Pill Text</label>
            <input
              type="text"
              className="admin-input"
              value={heroForm.badge}
              onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
              <label>Highlighted Title (Orange Accent)</label>
              <input
                type="text"
                className="admin-input"
                value={heroForm.titleHighlight}
                onChange={(e) => setHeroForm({ ...heroForm, titleHighlight: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label>Hero Description Paragraph</label>
            <textarea
              className="admin-input"
              rows="3"
              value={heroForm.description}
              onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
            ></textarea>
          </div>

          <div className="admin-form-group">
            <label><ImageIcon size={14} inline /> Hero Background / Visual Image URL</label>
            <input
              type="url"
              className="admin-input"
              value={heroForm.heroImageUrl || ''}
              onChange={(e) => setHeroForm({ ...heroForm, heroImageUrl: e.target.value })}
              placeholder="https://images.unsplash.com/..."
            />
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
            <Save size={16} /> Save Hero Section Content
          </button>
        </form>
      </div>

      {/* 2. About Section Content & Image */}
      <div className="admin-card">
        <h3><Type size={18} inline /> 2. About Section Copy & Visual Image</h3>
        <form onSubmit={(e) => { e.preventDefault(); updateAbout(aboutForm); }}>
          <div className="admin-form-group">
            <label>Category Label</label>
            <input
              type="text"
              className="admin-input"
              value={aboutForm.sectionLabel}
              onChange={(e) => setAboutForm({ ...aboutForm, sectionLabel: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label>Main Title</label>
            <input
              type="text"
              className="admin-input"
              value={aboutForm.title}
              onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label>Paragraph 1</label>
            <textarea
              className="admin-input"
              rows="3"
              value={aboutForm.paragraph1}
              onChange={(e) => setAboutForm({ ...aboutForm, paragraph1: e.target.value })}
            ></textarea>
          </div>

          <div className="admin-form-group">
            <label>Paragraph 2</label>
            <textarea
              className="admin-input"
              rows="3"
              value={aboutForm.paragraph2}
              onChange={(e) => setAboutForm({ ...aboutForm, paragraph2: e.target.value })}
            ></textarea>
          </div>

          <div className="admin-form-group">
            <label><ImageIcon size={14} inline /> About Image URL</label>
            <input
              type="url"
              className="admin-input"
              value={aboutForm.aboutImageUrl || ''}
              onChange={(e) => setAboutForm({ ...aboutForm, aboutImageUrl: e.target.value })}
            />
          </div>

          <button type="submit" className="btn-admin-save">
            <Save size={16} /> Save About Section Content
          </button>
        </form>
      </div>

      {/* 3. Services Header Editor */}
      <div className="admin-card">
        <h3><Type size={18} inline /> 3. Services Header & Subtitle</h3>
        <form onSubmit={(e) => { e.preventDefault(); updateSectionHeader('servicesHeader', servicesForm); }}>
          <div className="admin-form-group">
            <label>Section Label</label>
            <input
              type="text"
              className="admin-input"
              value={servicesForm.sectionLabel}
              onChange={(e) => setServicesForm({ ...servicesForm, sectionLabel: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label>Title</label>
            <input
              type="text"
              className="admin-input"
              value={servicesForm.title}
              onChange={(e) => setServicesForm({ ...servicesForm, title: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label>Subtitle Description</label>
            <textarea
              className="admin-input"
              rows="2"
              value={servicesForm.subtitle}
              onChange={(e) => setServicesForm({ ...servicesForm, subtitle: e.target.value })}
            ></textarea>
          </div>

          <button type="submit" className="btn-admin-save">
            <Save size={16} /> Save Services Header
          </button>
        </form>
      </div>

      {/* 4. Portfolio Header Editor */}
      <div className="admin-card">
        <h3><Type size={18} inline /> 4. Portfolio Showcase Header</h3>
        <form onSubmit={(e) => { e.preventDefault(); updateSectionHeader('portfolioHeader', portfolioForm); }}>
          <div className="admin-form-group">
            <label>Section Label</label>
            <input
              type="text"
              className="admin-input"
              value={portfolioForm.sectionLabel}
              onChange={(e) => setPortfolioForm({ ...portfolioForm, sectionLabel: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label>Title</label>
            <input
              type="text"
              className="admin-input"
              value={portfolioForm.title}
              onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label>Subtitle Description</label>
            <textarea
              className="admin-input"
              rows="2"
              value={portfolioForm.subtitle}
              onChange={(e) => setPortfolioForm({ ...portfolioForm, subtitle: e.target.value })}
            ></textarea>
          </div>

          <button type="submit" className="btn-admin-save">
            <Save size={16} /> Save Portfolio Header
          </button>
        </form>
      </div>

      {/* 5. Process Header Editor */}
      <div className="admin-card">
        <h3><Type size={18} inline /> 5. Process Timeline Header</h3>
        <form onSubmit={(e) => { e.preventDefault(); updateSectionHeader('processHeader', processForm); }}>
          <div className="admin-form-group">
            <label>Title</label>
            <input
              type="text"
              className="admin-input"
              value={processForm.title}
              onChange={(e) => setProcessForm({ ...processForm, title: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label>Subtitle</label>
            <textarea
              className="admin-input"
              rows="2"
              value={processForm.subtitle}
              onChange={(e) => setProcessForm({ ...processForm, subtitle: e.target.value })}
            ></textarea>
          </div>

          <button type="submit" className="btn-admin-save">
            <Save size={16} /> Save Process Header
          </button>
        </form>
      </div>

      {/* 6. Why Us & Testimonials Header Editors */}
      <div className="admin-card">
        <h3><Type size={18} inline /> 6. Why Us & Testimonials Headers</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <form onSubmit={(e) => { e.preventDefault(); updateSectionHeader('whyUsHeader', whyUsForm); }}>
            <h4 style={{ marginBottom: '1rem', color: '#0B0E17' }}>Why Us Section Copy</h4>
            <div className="admin-form-group">
              <label>Title</label>
              <input
                type="text"
                className="admin-input"
                value={whyUsForm.title}
                onChange={(e) => setWhyUsForm({ ...whyUsForm, title: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label>Subtitle</label>
              <input
                type="text"
                className="admin-input"
                value={whyUsForm.subtitle}
                onChange={(e) => setWhyUsForm({ ...whyUsForm, subtitle: e.target.value })}
              />
            </div>
            <button type="submit" className="btn-admin-save">
              <Save size={16} /> Save Why Us Copy
            </button>
          </form>

          <form onSubmit={(e) => { e.preventDefault(); updateSectionHeader('testimonialsHeader', testimonialsForm); }}>
            <h4 style={{ marginBottom: '1rem', color: '#0B0E17' }}>Testimonials Section Copy</h4>
            <div className="admin-form-group">
              <label>Title</label>
              <input
                type="text"
                className="admin-input"
                value={testimonialsForm.title}
                onChange={(e) => setTestimonialsForm({ ...testimonialsForm, title: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label>Subtitle</label>
              <input
                type="text"
                className="admin-input"
                value={testimonialsForm.subtitle}
                onChange={(e) => setTestimonialsForm({ ...testimonialsForm, subtitle: e.target.value })}
              />
            </div>
            <button type="submit" className="btn-admin-save">
              <Save size={16} /> Save Testimonials Copy
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
