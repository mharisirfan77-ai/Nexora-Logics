import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Layout, Briefcase, Layers, Inbox, Eye, Download, RefreshCw, CheckCircle } from 'lucide-react';

export const AdminDashboard = ({ setActiveTab }) => {
  const { data } = useCMS();
  const { portfolio, services, inquiries, sectionsConfig } = data;

  const activeSectionsCount = Object.values(sectionsConfig).filter(s => s.enabled).length;
  const unreadInquiriesCount = inquiries.filter(i => !i.read).length;

  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 700, color: '#0B0E17', marginBottom: '0.4rem' }}>
        CMS Dashboard Overview
      </h2>
      <p style={{ color: '#5B5F76', marginBottom: '2rem' }}>
        Welcome to your Nexora Logics website control center. Easily manage content, portfolio projects, services, and client inquiries.
      </p>

      {/* Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="admin-card" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: '#5B5F76', fontSize: '0.88rem', fontWeight: 600 }}>Portfolio Projects</span>
            <div style={{ background: 'rgba(75,78,255,0.1)', color: '#4B4EFF', padding: '0.5rem', borderRadius: '8px' }}>
              <Briefcase size={20} />
            </div>
          </div>
          <div style={{ fontFamily: 'Space Grotesk', fontSize: '2.2rem', fontWeight: 700, color: '#0B0E17', marginTop: '0.6rem' }}>
            {portfolio.length}
          </div>
          <button
            onClick={() => setActiveTab('portfolio')}
            style={{ color: '#4B4EFF', background: 'none', border: 'none', fontSize: '0.82rem', fontWeight: 600, marginTop: '0.6rem', cursor: 'pointer' }}
          >
            Manage Projects →
          </button>
        </div>

        <div className="admin-card" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: '#5B5F76', fontSize: '0.88rem', fontWeight: 600 }}>Active Services</span>
            <div style={{ background: 'rgba(255,138,61,0.14)', color: '#FF8A3D', padding: '0.5rem', borderRadius: '8px' }}>
              <Layers size={20} />
            </div>
          </div>
          <div style={{ fontFamily: 'Space Grotesk', fontSize: '2.2rem', fontWeight: 700, color: '#0B0E17', marginTop: '0.6rem' }}>
            {services.length}
          </div>
          <button
            onClick={() => setActiveTab('services')}
            style={{ color: '#FF8A3D', background: 'none', border: 'none', fontSize: '0.82rem', fontWeight: 600, marginTop: '0.6rem', cursor: 'pointer' }}
          >
            Manage Services →
          </button>
        </div>

        <div className="admin-card" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: '#5B5F76', fontSize: '0.88rem', fontWeight: 600 }}>Inquiries Inbox</span>
            <div style={{ background: 'rgba(75,78,255,0.1)', color: '#4B4EFF', padding: '0.5rem', borderRadius: '8px' }}>
              <Inbox size={20} />
            </div>
          </div>
          <div style={{ fontFamily: 'Space Grotesk', fontSize: '2.2rem', fontWeight: 700, color: '#0B0E17', marginTop: '0.6rem' }}>
            {inquiries.length} <span style={{ fontSize: '0.9rem', color: unreadInquiriesCount > 0 ? '#ff4d4d' : '#5B5F76' }}>({unreadInquiriesCount} new)</span>
          </div>
          <button
            onClick={() => setActiveTab('inquiries')}
            style={{ color: '#4B4EFF', background: 'none', border: 'none', fontSize: '0.82rem', fontWeight: 600, marginTop: '0.6rem', cursor: 'pointer' }}
          >
            View Inbox →
          </button>
        </div>

        <div className="admin-card" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: '#5B5F76', fontSize: '0.88rem', fontWeight: 600 }}>Enabled Sections</span>
            <div style={{ background: 'rgba(11,14,23,0.08)', color: '#0B0E17', padding: '0.5rem', borderRadius: '8px' }}>
              <Layout size={20} />
            </div>
          </div>
          <div style={{ fontFamily: 'Space Grotesk', fontSize: '2.2rem', fontWeight: 700, color: '#0B0E17', marginTop: '0.6rem' }}>
            {activeSectionsCount} / {Object.keys(sectionsConfig).length}
          </div>
          <button
            onClick={() => setActiveTab('sections')}
            style={{ color: '#0B0E17', background: 'none', border: 'none', fontSize: '0.82rem', fontWeight: 600, marginTop: '0.6rem', cursor: 'pointer' }}
          >
            Toggle Sections →
          </button>
        </div>
      </div>

      {/* Recent Activity & Instructions */}
      <div className="admin-card">
        <h3>Quick Content Management Shortcuts</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginTop: '1rem' }}>
          <div
            onClick={() => setActiveTab('settings')}
            style={{ padding: '1.2rem', borderRadius: '10px', background: '#F7F5F0', border: '1px solid #EFEBE2', cursor: 'pointer', transition: 'transform 0.2s ease' }}
          >
            <strong style={{ color: '#0B0E17', display: 'block', marginBottom: '0.3rem' }}>✏️ Edit Hero & Site Headlines</strong>
            <span style={{ color: '#5B5F76', fontSize: '0.88rem' }}>Change main website banner, taglines, response time, and social media links.</span>
          </div>

          <div
            onClick={() => setActiveTab('portfolio')}
            style={{ padding: '1.2rem', borderRadius: '10px', background: '#F7F5F0', border: '1px solid #EFEBE2', cursor: 'pointer', transition: 'transform 0.2s ease' }}
          >
            <strong style={{ color: '#0B0E17', display: 'block', marginBottom: '0.3rem' }}>🚀 Add Portfolio Case Study</strong>
            <span style={{ color: '#5B5F76', fontSize: '0.88rem' }}>Add new client work with thumbnail, category, tags, and case study description.</span>
          </div>

          <div
            onClick={() => setActiveTab('sections')}
            style={{ padding: '1.2rem', borderRadius: '10px', background: '#F7F5F0', border: '1px solid #EFEBE2', cursor: 'pointer', transition: 'transform 0.2s ease' }}
          >
            <strong style={{ color: '#0B0E17', display: 'block', marginBottom: '0.3rem' }}>⚙️ Section Visibility Control</strong>
            <span style={{ color: '#5B5F76', fontSize: '0.88rem' }}>Instantly show or hide any page section on the live agency site.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
