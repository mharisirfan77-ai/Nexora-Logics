import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Search, Menu, X, ArrowUpRight } from 'lucide-react';

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
    <nav className="xstar-nav">
      <div className="xstar-nav-container">
        {/* Logo using attached image */}
        <a href="/" onClick={(e) => handleNavClick(e, '/')} className="xstar-logo">
          <img
            src={siteInfo.logoUrl || '/logo.jpg'}
            alt={siteInfo.brandName}
            style={{ height: '40px', width: 'auto', objectFit: 'contain', borderRadius: '4px' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span style={{ marginLeft: '0.4rem' }}>
            {siteInfo.brandName.split(' ')[0]}
            <span style={{ color: '#D2F535' }}>{siteInfo.brandName.split(' ')[1] || ''}</span>
          </span>
        </a>

        {/* XSTAR Signature Navigation Links with ↗ arrows */}
        <ul className="xstar-nav-links">
          <li>
            <a
              href="/"
              onClick={(e) => handleNavClick(e, '/')}
              className={currentPath === '/' ? 'active-link' : ''}
            >
              <span className="arrow">↗</span> Home
            </a>
          </li>
          {sectionsConfig.about?.enabled && (
            <li>
              <a
                href="/about"
                onClick={(e) => handleNavClick(e, '/about')}
                className={currentPath === '/about' ? 'active-link' : ''}
              >
                <span className="arrow">↗</span> About
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
                <span className="arrow">↗</span> Services
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
                <span className="arrow">↗</span> Portfolio
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
                <span className="arrow">↗</span> Process
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

        {/* Action CTAs: Search Icon & Outlined ↗ Get In Touch Box */}
        <div className="xstar-nav-actions">
          <button
            onClick={() => navigate('/contact')}
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            title="Search"
          >
            <Search size={20} />
          </button>

          <a
            href="/contact"
            onClick={(e) => handleNavClick(e, '/contact')}
            className="btn-xstar-touch"
          >
            <span>↗</span> Get In Touch
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
