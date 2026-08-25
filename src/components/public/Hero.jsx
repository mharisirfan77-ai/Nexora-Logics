import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero = () => {
  const { data } = useCMS();
  const { hero } = data;

  return (
    <section className="hero">
      {/* Node SVG particle background matching index.html */}
      <svg className="hero-node-bg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <line x1="120" y1="140" x2="340" y2="240" stroke="rgba(75,78,255,.35)" strokeWidth="1" />
        <line x1="340" y1="240" x2="580" y2="150" stroke="rgba(75,78,255,.35)" strokeWidth="1" />
        <line x1="580" y1="150" x2="860" y2="220" stroke="rgba(75,78,255,.35)" strokeWidth="1" />
        <line x1="860" y1="220" x2="1080" y2="120" stroke="rgba(75,78,255,.35)" strokeWidth="1" />
        <line x1="220" y1="520" x2="460" y2="440" stroke="rgba(75,78,255,.35)" strokeWidth="1" />
        <line x1="460" y1="440" x2="700" y2="560" stroke="rgba(75,78,255,.35)" strokeWidth="1" />
        <line x1="700" y1="560" x2="960" y2="480" stroke="rgba(75,78,255,.35)" strokeWidth="1" />
        <line x1="960" y1="480" x2="1120" y2="600" stroke="rgba(75,78,255,.35)" strokeWidth="1" />
        <circle cx="120" cy="140" r="3" fill="#4B4EFF" />
        <circle cx="340" cy="240" r="3" fill="#FF8A3D" />
        <circle cx="580" cy="150" r="3" fill="#4B4EFF" />
        <circle cx="860" cy="220" r="3" fill="#4B4EFF" />
        <circle cx="1080" cy="120" r="3" fill="#FF8A3D" />
        <circle cx="220" cy="520" r="3" fill="#4B4EFF" />
        <circle cx="460" cy="440" r="3" fill="#4B4EFF" />
        <circle cx="700" cy="560" r="3" fill="#FF8A3D" />
        <circle cx="960" cy="480" r="3" fill="#4B4EFF" />
        <circle cx="1120" cy="600" r="3" fill="#4B4EFF" />
      </svg>

      <div className="hero-inner">
        <div className="hero-badge">
          <span className="dot"></span>
          <span>{hero.badge}</span>
        </div>

        <h1>
          {hero.titleLine1} <em>{hero.titleHighlight}</em>
        </h1>

        <p>{hero.description}</p>

        <div className="hero-btns">
          <a href={hero.primaryCtaLink || "#contact"} className="btn-hero-primary">
            {hero.primaryCtaText} <ArrowRight size={18} />
          </a>
          <a href={hero.secondaryCtaLink || "#services"} className="btn-hero-ghost">
            {hero.secondaryCtaText}
          </a>
        </div>
      </div>
    </section>
  );
};
