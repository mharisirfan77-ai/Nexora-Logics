import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { AdminDashboard } from './AdminDashboard';
import { SectionManager } from './SectionManager';
import { PortfolioManager } from './PortfolioManager';
import { ServicesManager } from './ServicesManager';
import { InquiriesManager } from './InquiriesManager';
import { SettingsEditor } from './SettingsEditor';
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
  ShieldCheck
} from 'lucide-react';

export const AdminLayout = () => {
  const { data, setIsAdminView } = useCMS();
  const { inquiries } = data;
  const [activeTab, setActiveTab] = useState('dashboard');

  const unreadCount = inquiries.filter((i) => !i.read).length;

  return (
    <div className="admin-layout">
      {/* Top Header */}
      <header className="admin-header">
        <div className="admin-header-title">
          <ShieldCheck size={26} style={{ color: '#4B4EFF' }} />
          <span>Nexora Logics — Admin CMS Panel</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => setIsAdminView(false)}
            className="btn-cta"
            style={{ background: '#FF8A3D', color: '#0B0E17', fontSize: '0.88rem' }}
          >
            Exit to Live Site <ExternalLink size={16} />
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
            className={`admin-nav-item ${activeTab === 'sections' ? 'active' : ''}`}
            onClick={() => setActiveTab('sections')}
          >
            <Layers size={18} /> Sections Config
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
            <Settings size={18} /> Hero & Site Copy
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
          {activeTab === 'sections' && <SectionManager />}
          {activeTab === 'portfolio' && <PortfolioManager />}
          {activeTab === 'services' && <ServicesManager />}
          {activeTab === 'inquiries' && <InquiriesManager />}
          {activeTab === 'settings' && <SettingsEditor />}
          {activeTab === 'backup' && <BackupManager />}
        </main>
      </div>
    </div>
  );
};
