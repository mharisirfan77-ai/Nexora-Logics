import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { AdminDashboard } from './AdminDashboard';
import { SectionManager } from './SectionManager';
import { PortfolioManager } from './PortfolioManager';
import { ServicesManager } from './ServicesManager';
import { InquiriesManager } from './InquiriesManager';
import { SettingsEditor } from './SettingsEditor';
import { SectionTextEditor } from './SectionTextEditor';
import { BackupManager } from './BackupManager';
import {
  LayoutDashboard,
  Layers,
  Briefcase,
  Wrench,
  Inbox,
  Settings,
  Database,
  ExternalLink,
  ShieldCheck,
  Type,
  LogOut,
  Key
} from 'lucide-react';

export const AdminLayout = () => {
  const { data, logoutAdmin, changeAdminPassword, navigate } = useCMS();
  const { inquiries, siteInfo } = data;
  const [activeTab, setActiveTab] = useState('dashboard');
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
    <div className="admin-layout">
      {/* Top Header */}
      <header className="admin-header">
        <div className="admin-header-title">
          <img
            src={siteInfo.logoUrl || '/logo.jpg'}
            alt="Logo"
            style={{ height: '34px', borderRadius: '4px', objectFit: 'contain' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span>{siteInfo.brandName} — Admin CMS Panel</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="btn-admin-toggle"
            style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.2)' }}
          >
            <Key size={15} /> Change Password
          </button>

          <button
            onClick={() => navigate('/')}
            className="btn-cta"
            style={{ background: '#FF8A3D', color: '#0B0E17', fontSize: '0.88rem' }}
          >
            View Live Site <ExternalLink size={16} />
          </button>

          <button
            onClick={logoutAdmin}
            className="btn-admin-delete"
            style={{ padding: '0.65rem 1rem', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <LogOut size={15} /> Logout
          </button>
        </div>
      </header>

      {/* Main Admin Sidebar + Content Body */}
      <div className="admin-body">
        <aside className="admin-sidebar">
          <button
            className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'sectionText' ? 'active' : ''}`}
            onClick={() => setActiveTab('sectionText')}
          >
            <Type size={18} /> Edit Texts & Images
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'sections' ? 'active' : ''}`}
            onClick={() => setActiveTab('sections')}
          >
            <Layers size={18} /> Section Toggles
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'portfolio' ? 'active' : ''}`}
            onClick={() => setActiveTab('portfolio')}
          >
            <Briefcase size={18} /> Portfolio Projects
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <Wrench size={18} /> Services
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiries')}
          >
            <Inbox size={18} /> Inquiries
            {unreadCount > 0 && (
              <span style={{ marginLeft: 'auto', background: '#ff4d4d', color: '#fff', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '100px', fontWeight: 700 }}>
                {unreadCount}
              </span>
            )}
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={18} /> Brand & Contact
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'backup' ? 'active' : ''}`}
            onClick={() => setActiveTab('backup')}
          >
            <Database size={18} /> Backup & Reset
          </button>
        </aside>

        <main className="admin-content">
          {activeTab === 'dashboard' && <AdminDashboard setActiveTab={setActiveTab} />}
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
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.2rem', color: '#0B0E17' }}>
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
                <button type="button" className="btn-hero-ghost" style={{ color: '#0B0E17', borderColor: '#ccc' }} onClick={() => setShowPasswordModal(false)}>
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
