import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const { data, currentPath, navigate } = useCMS();
  const { siteInfo, sectionsConfig } = data;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e, path) => {
    e.preventDefault();
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="glass-nav">
      <div className="nav-container">
        {/* Logo using attached image */}
        <a href="/" onClick={(e) => handleNavClick(e, '/')} className="nav-logo">
          <img
            src={siteInfo.logoUrl || '/logo.jpg'}
            alt={siteInfo.brandName}
            style={{ height: '38px', width: 'auto', objectFit: 'contain', borderRadius: '4px' }}
            onError={(e) => {
              // Fallback SVG if image load fails
              e.target.style.display = 'none';
            }}
          />
          <span className="nav-logo-text" style={{ marginLeft: '0.4rem' }}>
            {siteInfo.brandName.split(' ')[0]}
            <span>{siteInfo.brandName.split(' ')[1] || ''}</span>
          </span>
        </a>

        {/* Desktop Links (Routing to Inner Pages) */}
        <ul className="nav-links">
          <li>
            <a
              href="/"
              onClick={(e) => handleNavClick(e, '/')}
              className={currentPath === '/' ? 'active-link' : ''}
            >
              Home
            </a>
          </li>
          {sectionsConfig.about?.enabled && (
            <li>
              <a
                href="/about"
                onClick={(e) => handleNavClick(e, '/about')}
                className={currentPath === '/about' ? 'active-link' : ''}
              >
                About
              </a>
            </li>
          )}
          {sectionsConfig.services?.enabled && (
            <li>
              <a
                href="/services"
                onClick={(e) => handleNavClick(e, '/services')}
                className={currentPath === '/services' ? 'active-link' : ''}
              >
                Services
              </a>
            </li>
          )}
          {sectionsConfig.portfolio?.enabled && (
            <li>
              <a
                href="/portfolio"
                onClick={(e) => handleNavClick(e, '/portfolio')}
                className={currentPath === '/portfolio' ? 'active-link' : ''}
              >
                Portfolio
              </a>
            </li>
          )}
          {sectionsConfig.process?.enabled && (
            <li>
              <a
                href="/process"
                onClick={(e) => handleNavClick(e, '/process')}
                className={currentPath === '/process' ? 'active-link' : ''}
              >
                Process
              </a>
            </li>
          )}
          {sectionsConfig.whyUs?.enabled && (
            <li>
              <a
                href="/why-us"
                onClick={(e) => handleNavClick(e, '/why-us')}
                className={currentPath === '/why-us' ? 'active-link' : ''}
              >
                Why Us
              </a>
            </li>
          )}
          {sectionsConfig.contact?.enabled && (
            <li>
              <a
                href="/contact"
                onClick={(e) => handleNavClick(e, '/contact')}
                className={currentPath === '/contact' ? 'active-link' : ''}
              >
                Contact
              </a>
            </li>
          )}
        </ul>

        {/* Action CTA */}
        <div className="nav-actions">
          <a href="/contact" onClick={(e) => handleNavClick(e, '/contact')} className="btn-cta">
            Get a Free Quote
          </a>
          
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
