import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ArrowUpRight } from 'lucide-react';

export const Hero = () => {
  const { data, navigate } = useCMS();
  const { hero } = data;

  return (
    <>
      <section className="xstar-hero">
        <div className="xstar-hero-inner">
          <div className="hero-badge">
            <span className="dot"></span>
            <span>{hero.badge}</span>
          </div>

          <h1 className="xstar-hero-title">
            {hero.titleLine1} <em className="italic-accent">{hero.titleHighlight}</em>
          </h1>

          <p className="xstar-hero-sub">{hero.description}</p>

          <div className="hero-btns" style={{ justifyContent: 'flex-start' }}>
            <a
              href={hero.primaryCtaLink || "/contact"}
              onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
              className="btn-hero-primary"
            >
              {hero.primaryCtaText} <ArrowUpRight size={20} />
            </a>
            <a
              href={hero.secondaryCtaLink || "/services"}
              onClick={(e) => { e.preventDefault(); navigate('/services'); }}
              className="btn-hero-ghost"
            >
              {hero.secondaryCtaText}
            </a>
          </div>
        </div>
      </section>

      {/* Giant Edge-to-Edge Marquee Typography Banner (Matching Screenshot 5) */}
      <div className="giant-marquee-container">
        <div className="giant-marquee-content">
          <div className="giant-marquee-text">✦ CREATIVE PORTFOLIO ✦ DIGITAL GROWTH STUDIO ✦ CREATIVE PORTFOLIO ✦</div>
          <div className="giant-marquee-text">✦ CREATIVE PORTFOLIO ✦ DIGITAL GROWTH STUDIO ✦ CREATIVE PORTFOLIO ✦</div>
        </div>
      </div>
    </>
  );
};
