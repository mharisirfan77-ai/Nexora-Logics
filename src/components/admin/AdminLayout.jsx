import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { WpAdminSidebar } from './WpAdminSidebar';
import { AdminDashboard } from './AdminDashboard';
import { PageManager } from './PageManager';
import { SectionBuilder } from './SectionBuilder';
import { ThemeCustomizer } from './ThemeCustomizer';
import { WpAdminPosts } from './WpAdminPosts';
import { WpMediaLibrary } from './WpMediaLibrary';
import { SectionManager } from './SectionManager';
import { PortfolioManager } from './PortfolioManager';
import { ServicesManager } from './ServicesManager';
import { InquiriesManager } from './InquiriesManager';
import { SettingsEditor } from './SettingsEditor';
import { SectionTextEditor } from './SectionTextEditor';
import { BackupManager } from './BackupManager';
import { WpThemeManager } from './WpThemeManager';
import {
  ExternalLink,
  Key,
  LogOut,
  Plus,
  MessageSquare,
  Globe
} from 'lucide-react';

export const AdminLayout = () => {
  const { data, logoutAdmin, changeAdminPassword, navigate } = useCMS();
  const { siteInfo, inquiries = [] } = data;
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedThemeForCustomize, setSelectedThemeForCustomize] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const unreadCount = inquiries.filter((i) => !i.read).length;

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    changeAdminPassword(newPassword);
    setNewPassword('');
    setShowPasswordModal(false);
  };

  return (
    <div style={{ background: '#101517', minHeight: '100vh', color: '#f0f6fc' }}>
      {/* WordPress Top Admin Bar */}
      <header
        style={{
          background: '#1d2327',
          borderBottom: '1px solid #2c3338',
          height: '46px',
          padding: '0 1.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.85rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff', fontWeight: 700 }}>
            <Globe size={16} style={{ color: '#2271b1' }} />
            <span>{siteInfo.brandName}</span>
          </div>

          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigate('/'); }}
            style={{ color: '#c3c4c7', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}
          >
            <ExternalLink size={14} /> Visit Site
          </a>

          <div style={{ color: '#c3c4c7', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <MessageSquare size={14} /> {unreadCount} Pending Inquiries
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => setShowPasswordModal(true)}
            style={{ background: 'none', border: 'none', color: '#c3c4c7', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem' }}
          >
            <Key size={14} /> Password
          </button>

          <button
            onClick={logoutAdmin}
            style={{ background: '#d63638', color: '#fff', border: 'none', padding: '0.3rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
          >
            <LogOut size={13} /> Log Out
          </button>
        </div>
      </header>

      {/* Main WordPress Body */}
      <div style={{ display: 'flex' }}>
        <WpAdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main style={{ flex: 1, padding: '2.5rem 3rem', maxWidth: '1400px', overflowX: 'hidden' }}>
          {activeTab === 'dashboard' && <AdminDashboard setActiveTab={setActiveTab} />}
          {activeTab === 'pageManager' && <PageManager />}
          {activeTab === 'posts' && <WpAdminPosts />}
          {activeTab === 'media' && <WpMediaLibrary />}
          {activeTab === 'sectionBuilder' && <SectionBuilder />}
          {activeTab === 'themes' && (
            <WpThemeManager
              onSelectCustomize={(themeId) => {
                setSelectedThemeForCustomize(themeId);
                setActiveTab('themeCustomizer');
              }}
            />
          )}
          {activeTab === 'themeCustomizer' && (
            <ThemeCustomizer
              targetThemeId={selectedThemeForCustomize}
              onBackToThemes={() => setActiveTab('themes')}
            />
          )}
          {activeTab === 'sectionText' && <SectionTextEditor />}
          {activeTab === 'sections' && <SectionManager />}
          {activeTab === 'portfolio' && <PortfolioManager />}
          {activeTab === 'services' && <ServicesManager />}
          {activeTab === 'inquiries' && <InquiriesManager />}
          {activeTab === 'settings' && <SettingsEditor />}
          {activeTab === 'backup' && <BackupManager />}
        </main>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px' }}>
            <div className="modal-header">
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.2rem', color: '#ffffff' }}>
                Change Admin Password
              </h3>
            </div>
            <form onSubmit={handleChangePasswordSubmit} className="modal-body">
              <div className="admin-form-group">
                <label>New Password *</label>
                <input
                  type="password"
                  className="admin-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.2rem' }}>
                <button type="button" className="btn-hero-ghost" style={{ color: '#fff', borderColor: '#444' }} onClick={() => setShowPasswordModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-admin-save">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
