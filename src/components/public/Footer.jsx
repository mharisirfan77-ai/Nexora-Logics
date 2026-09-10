import React from 'react';
import { useCMS } from '../../context/CMSContext';
import logoImg from '../../assets/logo.jpg';

export const Footer = () => {
  const { data } = useCMS();
  const { siteInfo } = data;

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="brand">
              <div className="logo-chip">
                <img
                  src={siteInfo?.logoUrl || logoImg}
                  alt={siteInfo.brandName}
                  className="logo-chip-img"
                />
              </div>
              <span className="word">{siteInfo.brandName}</span>
            </div>
            <p>{siteInfo.footerBio}</p>
            <div className="footer-social">
              {siteInfo.facebookUrl && (
                <a href={siteInfo.facebookUrl} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
              )}
              {siteInfo.instagramUrl && (
                <a href={siteInfo.instagramUrl} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
              )}
              {siteInfo.linkedinUrl && (
                <a href={siteInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#portfolio">Work</a></li>
              <li><a href="#process">Process</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">eBook Creation</a></li>
              <li><a href="#services">Web Development</a></li>
              <li><a href="#services">Social Media</a></li>
              <li><a href="#services">Paid Advertising</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Get Started</h4>
            <ul>
              <li><a href="#contact">Free Quote</a></li>
              <li><a href={`mailto:${siteInfo.email}`}>Email Us</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {siteInfo.brandName}. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: '#8F95B2' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#8F95B2' }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
