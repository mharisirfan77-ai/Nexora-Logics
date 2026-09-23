import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ChevronRight } from 'lucide-react';

export const PageHeader = ({ title, subtitle, categoryLabel }) => {
  const { navigate } = useCMS();

  return (
    <header className="agency-page-header">
      <div className="agency-page-header-inner">
        {categoryLabel && (
          <div className="hero-badge">
            <span className="dot"></span>
            <span>{categoryLabel}</span>
          </div>
        )}

        <h1>
          {title}
        </h1>

        {subtitle && (
          <p>
            {subtitle}
          </p>
        )}

        <div className="agency-breadcrumb">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
          <ChevronRight size={14} />
          <span>{title}</span>
        </div>
      </div>
    </header>
  );
};
