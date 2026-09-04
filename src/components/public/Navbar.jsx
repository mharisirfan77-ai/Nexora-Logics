import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Search, Menu, X, ArrowUpRight } from 'lucide-react';
import logoImg from '../../assets/logo.jpg';

export const Navbar = () => {
  const { data, currentPath, navigate } = useCMS();
  const { siteInfo, pages = [], portfolio = [], services = [] } = data;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Lock background scroll when drawer or search modal is open
  useEffect(() => {
    if (mobileMenuOpen || searchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen, searchOpen]);

  const handleNavClick = (e, path) => {
    e.preventDefault();
    navigate(path);
    setMobileMenuOpen(false);
    setSearchOpen(false);
  };

  // Filter out Home, Contact, and Why Us from Navbar links per user request
  const navPages = pages.filter((p) => {
    if (p.inNavbar === false) return false;
    const slug = (p.slug || '').toLowerCase().trim().replace(/\/$/, '');
    const title = (p.title || '').toLowerCase().trim();

    // Exclude Home (clicking logo navigates to homepage)
    if (slug === '' || slug === '/' || title === 'home') return false;

    // Exclude Contact (handled by 'Get In Touch' CTA button)
    if (slug === '/contact' || title === 'contact' || title === 'contact us') return false;

    // Exclude Why Us (content is integrated into About Us)
    if (slug === '/why-us' || slug === '/whyus' || title === 'why us' || title === 'why-us') return false;

    return true;
  });

  // Live search result calculator
  const searchResults = searchQuery.trim() === '' ? [] : [
    ...pages
      .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((p) => ({ type: 'Page', title: p.title, path: p.slug })),
    ...services
      .filter((s) => s.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((s) => ({ type: 'Service', title: s.title, path: '/services' })),
    ...portfolio
      .filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase())))
      .map((item) => ({ type: 'Portfolio', title: item.title, path: '/portfolio' }))
  ];

  const logoSource = siteInfo?.logoUrl || logoImg;

  return (
    <>
      <nav className="xstar-nav">
        <div className="xstar-nav-container">
          {/* Nexora Logics Brand Logo */}
          <a href="/" onClick={(e) => handleNavClick(e, '/')} className="xstar-logo" title="Nexora Logics Home">
            <img
              src={logoSource}
              alt={siteInfo?.brandName || "Nexora Logics"}
              className="xstar-brand-logo-img"
            />
          </a>

          {/* XSTAR Desktop Navigation Links (with ↗ arrow prefix) */}
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
                    <span className="arrow">↗</span> {p.title.toUpperCase()}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Action Controls: Search & Boxed CTA */}
          <div className="xstar-nav-actions">
            <button
              onClick={() => setSearchOpen(true)}
              className="xstar-search-btn"
              title="Search Website"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            <a
              href="/contact"
              onClick={(e) => handleNavClick(e, '/contact')}
              className="btn-xstar-touch desktop-only"
            >
              <span className="arrow">↗</span> Get In Touch
            </a>

            <button 
              className="mobile-menu-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <a href="/" onClick={(e) => handleNavClick(e, '/')} className="xstar-logo">
                <img
                  src={logoSource}
                  alt={siteInfo?.brandName || "Nexora Logics"}
                  className="xstar-brand-logo-img"
                />
              </a>
              <button
                className="mobile-drawer-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
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
                      <span className="arrow">↗</span> {p.title.toUpperCase()}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mobile-drawer-footer">
              <a
                href="/contact"
                onClick={(e) => handleNavClick(e, '/contact')}
                className="btn-xstar-touch full-width-touch"
              >
                <span className="arrow">↗</span> Get In Touch
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Search Modal */}
      {searchOpen && (
        <div className="xstar-search-modal-overlay" onClick={() => setSearchOpen(false)}>
          <div className="xstar-search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="search-modal-header">
              <div className="search-input-wrapper">
                <Search size={20} className="search-input-icon" />
                <input
                  type="text"
                  placeholder="Search pages, services, portfolio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
              <button className="search-modal-close" onClick={() => setSearchOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="search-modal-results">
              {searchQuery.trim() === '' ? (
                <div className="search-placeholder">
                  <p>Type to search pages, services, case studies, or portfolio items...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <ul className="search-results-list">
                  {searchResults.map((res, index) => (
                    <li key={index}>
                      <a href={res.path} onClick={(e) => handleNavClick(e, res.path)}>
                        <span className="res-type">{res.type}</span>
                        <span className="res-title">{res.title}</span>
                        <ArrowUpRight size={16} className="res-arrow" />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="search-no-results">
                  <p>No matches found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};


