import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ArrowUpRight } from 'lucide-react';

export const Hero = () => {
  const { data, navigate } = useCMS();
  const { hero } = data;

  return (
    <>
      <section className="xstar-hero" id="top">
        <div className="xstar-hero-inner">
          <div className="agency-hero-copy">
            <div className="hero-badge"><span className="dot" />{hero.badge}</div>
            <h1 className="xstar-hero-title">{hero.titleLine1} <em className="italic-accent">{hero.titleHighlight}</em></h1>
            <p className="xstar-hero-sub">{hero.description}</p>
            <div className="hero-btns">
              <a href={hero.primaryCtaLink || '/contact'} onClick={(e) => { e.preventDefault(); navigate(hero.primaryCtaLink || '/contact'); }} className="btn-hero-primary">
                {hero.primaryCtaText} <ArrowUpRight size={20} />
              </a>
              <a href={hero.secondaryCtaLink || '/services'} onClick={(e) => { e.preventDefault(); navigate(hero.secondaryCtaLink || '/services'); }} className="btn-hero-ghost">
                {hero.secondaryCtaText} <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="agency-hero-footnote"><span className="agency-hero-line" /> Strategy, design and technology in one place</div>
          </div>
          <div className="agency-hero-visual">
            <img src={hero.heroImageUrl || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'} alt="Creative team collaborating on a digital project" fetchPriority="high" />
            <div className="agency-image-caption"><span className="agency-caption-dot" /> Ideas made useful. Digital made human.</div>
          </div>
        </div>
      </section>
    </>
  );
};
