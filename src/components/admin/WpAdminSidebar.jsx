import React from 'react';
import { useCMS } from '../../context/CMSContext';
import {
  LayoutDashboard,
  FileText,
  FileCode,
  PlusCircle,
  Palette,
  Layers,
  Briefcase,
  Wrench,
  Inbox,
  Settings,
  Database,
  Image as ImageIcon,
  BookOpen,
  Sliders,
  Type,
  UploadCloud
} from 'lucide-react';

export const WpAdminSidebar = ({ activeTab, setActiveTab }) => {
  const { data } = useCMS();
  const { inquiries = [] } = data;
  const unreadCount = inquiries.filter((i) => !i.read).length;

  return (
    <aside
      style={{
        background: '#1d2327',
        borderRight: '1px solid #2c3338',
        width: '240px',
        minHeight: 'calc(100vh - 46px)',
        paddingTop: '0.8rem',
        color: '#f0f6fc'
      }}
    >
      <div style={{ padding: '0 1rem 1rem', borderBottom: '1px solid #2c3338', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <div style={{ background: '#2271b1', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', fontFamily: 'Space Grotesk' }}>
          W
        </div>
        <strong style={{ fontSize: '0.95rem', color: '#ffffff' }}>WordPress CMS</strong>
      </div>

      <div style={{ padding: '0.8rem 0' }}>
        {/* Dashboard */}
        <button
          className={`wp-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <LayoutDashboard size={17} /> Dashboard
        </button>

        <div className="wp-menu-section-label">Content & Pages</div>

        {/* Pages */}
        <button
          className={`wp-nav-btn ${activeTab === 'pageManager' ? 'active' : ''}`}
          onClick={() => setActiveTab('pageManager')}
        >
          <FileText size={17} /> Pages
        </button>

        {/* Posts / Blog */}
        <button
          className={`wp-nav-btn ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          <BookOpen size={17} /> Posts / Blog
        </button>

        {/* Media Library */}
        <button
          className={`wp-nav-btn ${activeTab === 'media' ? 'active' : ''}`}
          onClick={() => setActiveTab('media')}
        >
          <ImageIcon size={17} /> Media Library
        </button>

        {/* Section Builder */}
        <button
          className={`wp-nav-btn ${activeTab === 'sectionBuilder' ? 'active' : ''}`}
          onClick={() => setActiveTab('sectionBuilder')}
        >
          <PlusCircle size={17} /> Section Builder
        </button>

        {/* Edit Texts & Images */}
        <button
          className={`wp-nav-btn ${activeTab === 'sectionText' ? 'active' : ''}`}
          onClick={() => setActiveTab('sectionText')}
        >
          <Type size={17} /> Text & Image Content
        </button>

        <div className="wp-menu-section-label">Appearance & Config</div>

        {/* Themes (ZIP Uploader) */}
        <button
          className={`wp-nav-btn ${activeTab === 'themes' ? 'active' : ''}`}
          onClick={() => setActiveTab('themes')}
        >
          <UploadCloud size={17} /> Themes (ZIP Installer)
        </button>

        {/* Appearance / Theme Customizer */}
        <button
          className={`wp-nav-btn ${activeTab === 'themeCustomizer' ? 'active' : ''}`}
          onClick={() => setActiveTab('themeCustomizer')}
        >
          <Palette size={17} /> Customize Theme
        </button>

        {/* Portfolio Projects */}
        <button
          className={`wp-nav-btn ${activeTab === 'portfolio' ? 'active' : ''}`}
          onClick={() => setActiveTab('portfolio')}
        >
          <Briefcase size={17} /> Portfolio Work
        </button>

        {/* Services */}
        <button
          className={`wp-nav-btn ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          <Wrench size={17} /> Services
        </button>

        {/* Inquiries */}
        <button
          className={`wp-nav-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
          onClick={() => setActiveTab('inquiries')}
        >
          <Inbox size={17} /> Feedback / Inquiries
          {unreadCount > 0 && (
            <span style={{ marginLeft: 'auto', background: '#d63638', color: '#fff', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '100px', fontWeight: 700 }}>
              {unreadCount}
            </span>
          )}
        </button>

        {/* Settings */}
        <button
          className={`wp-nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings size={17} /> Settings
        </button>

        {/* Backup */}
        <button
          className={`wp-nav-btn ${activeTab === 'backup' ? 'active' : ''}`}
          onClick={() => setActiveTab('backup')}
        >
          <Database size={17} /> Tools & Backup
        </button>
      </div>
    </aside>
  );
};
