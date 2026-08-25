import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Search, Menu, X } from 'lucide-react';
import logoImg from '../../assets/logo.jpg';

export const Navbar = () => {
  const { data, currentPath, navigate } = useCMS();
  const { siteInfo, pages = [] } = data;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e, path) => {
    e.preventDefault();
    navigate(path);
    setMobileMenuOpen(false);
  };

  // Filter pages configured to show in Top Navbar
  const navPages = pages.filter((p) => p.inNavbar !== false);

  return (
    <nav className="xstar-nav">
      <div className="xstar-nav-container">
        {/* Logo with bundled static asset */}
        <a href="/" onClick={(e) => handleNavClick(e, '/')} className="xstar-logo">
          <img
            src={logoImg}
            alt={siteInfo.brandName}
            style={{ height: '38px', width: 'auto', objectFit: 'contain', borderRadius: '4px', background: '#ffffff', padding: '2px' }}
          />
          <span style={{ marginLeft: '0.4rem' }}>
            {siteInfo.brandName.split(' ')[0]}
            <span style={{ color: data.themeConfig?.primaryAccent || '#D2F535' }}>
              {siteInfo.brandName.split(' ')[1] || ''}
            </span>
          </span>
        </a>

        {/* XSTAR Navigation Links (Dynamically list system & custom pages) */}
        <ul className="xstar-nav-links">
          {navPages.map((p) => {
            const isActive = currentPath.toLowerCase().replace(/\/$/, '') === p.slug.toLowerCase().replace(/\/$/, '');
            return (
              <li key={p.id}>
                <a
                  href={p.slug}
                  onClick={(e) => handleNavClick(e, p.slug)}
                  className={isActive ? 'active-link' : ''}
                >
                  <span className="arrow">↗</span> {p.title}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Action CTAs */}
        <div className="xstar-nav-actions">
          <button
            onClick={() => navigate('/contact')}
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            title="Search"
          >
            <Search size={19} />
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
