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
        {/* Logo */}
        <a href="/" onClick={(e) => handleNavClick(e, '/')} className="xstar-logo">
          <div className="xstar-logo-icon">
            <img
              src={logoImg}
              alt={siteInfo.brandName}
              style={{ height: '32px', width: 'auto', objectFit: 'contain', borderRadius: '4px' }}
            />
          </div>
          <span className="xstar-logo-text">
            {siteInfo.brandName.split(' ')[0] || 'NEXORA'}{' '}
            <span style={{ color: 'var(--lime)' }}>
              {siteInfo.brandName.split(' ')[1] || 'LOGICS'}
            </span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
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
                  {p.title} <span className="arrow">↗</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Action CTAs & Mobile Hamburger */}
        <div className="xstar-nav-actions">
          <button
            onClick={() => navigate('/contact')}
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            title="Search"
          >
            <Search size={18} />
          </button>

          <a
            href="/contact"
            onClick={(e) => handleNavClick(e, '/contact')}
            className="btn-xstar-touch desktop-only"
          >
            Get In Touch <span>↗</span>
          </a>

          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--line-dark)' }}>
              <div style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '1.2rem', color: '#ffffff' }}>
                NEXORA <span style={{ color: 'var(--lime)' }}>LOGICS</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--slate)', cursor: 'pointer' }}
              >
                <X size={22} />
              </button>
            </div>

            <ul className="mobile-nav-list">
              {navPages.map((p) => {
                const isActive = currentPath.toLowerCase().replace(/\/$/, '') === p.slug.toLowerCase().replace(/\/$/, '');
                return (
                  <li key={p.id}>
                    <a
                      href={p.slug}
                      onClick={(e) => handleNavClick(e, p.slug)}
                      className={isActive ? 'active-mobile-link' : ''}
                    >
                      {p.title} <span>↗</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
              <a
                href="/contact"
                onClick={(e) => handleNavClick(e, '/contact')}
                className="btn-hero-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
              >
                Get In Touch ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
