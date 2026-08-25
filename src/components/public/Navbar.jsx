import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Settings, ShieldCheck, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const { data, isAdminView, setIsAdminView } = useCMS();
  const { siteInfo, sectionsConfig } = data;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="glass-nav">
      <div className="nav-container">
        <a href="#" className="nav-logo">
          {/* Logo SVG matching index.html SVG or clean mark */}
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="10" fill="#0B0E17" />
            <path d="M12 28V12L22 28V12" stroke="#4B4EFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28 12V28" stroke="#FF8A3D" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="nav-logo-text">
            {siteInfo.brandName.split(' ')[0]}
            <span>{siteInfo.brandName.split(' ')[1] || ''}</span>
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="nav-links">
          {sectionsConfig.about?.enabled && <li><a href="#about">About</a></li>}
          {sectionsConfig.services?.enabled && <li><a href="#services">Services</a></li>}
          {sectionsConfig.portfolio?.enabled && <li><a href="#portfolio">Work</a></li>}
          {sectionsConfig.process?.enabled && <li><a href="#process">Process</a></li>}
          {sectionsConfig.whyUs?.enabled && <li><a href="#why">Why Us</a></li>}
          {sectionsConfig.contact?.enabled && <li><a href="#contact">Contact</a></li>}
        </ul>

        {/* Action CTAs & Admin Switcher */}
        <div className="nav-actions">
          <a href="#contact" className="btn-cta">
            Get a Free Quote
          </a>
          <button
            onClick={() => setIsAdminView(!isAdminView)}
            className="btn-admin-toggle"
            title="Open Admin CMS Panel"
          >
            {isAdminView ? <ShieldCheck size={16} /> : <Settings size={16} />}
            {isAdminView ? 'Live Website' : 'Admin Panel'}
          </button>
          
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'none' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};
