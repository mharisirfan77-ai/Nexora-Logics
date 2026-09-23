import React, { useEffect, useRef, useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { ArrowLeft, ArrowRight, BookOpen, Code, Share2, Megaphone, Smartphone, Gamepad2, Cpu } from 'lucide-react';

const iconMap = {
  BookOpen: <BookOpen size={28} />,
  Code: <Code size={28} />,
  Share2: <Share2 size={28} />,
  Megaphone: <Megaphone size={28} />,
  Smartphone: <Smartphone size={28} />,
  Gamepad2: <Gamepad2 size={28} />,
  Cpu: <Cpu size={28} />
};

export const Services = () => {
  const { data, currentPath } = useCMS();
  const { services, servicesHeader, sectionsConfig } = data;
  const isHome = currentPath.replace(/\/$/, '') === '';
  const sliderRef = useRef(null);
  const [scrollLimits, setScrollLimits] = useState({ start: true, end: false });

  useEffect(() => {
    if (!isHome || !sliderRef.current) return;
    const track = sliderRef.current;
    const updateLimits = () => setScrollLimits({
      start: track.scrollLeft <= 2,
      end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 2
    });
    updateLimits();
    track.addEventListener('scroll', updateLimits, { passive: true });
    window.addEventListener('resize', updateLimits);
    return () => {
      track.removeEventListener('scroll', updateLimits);
      window.removeEventListener('resize', updateLimits);
    };
  }, [isHome, services.length]);

  const moveSlider = (direction) => {
    const track = sliderRef.current;
    if (!track) return;
    const card = track.querySelector('.service-card');
    const gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const distance = (card?.getBoundingClientRect().width || track.clientWidth) + gap;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: direction * distance, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  if (!sectionsConfig.services?.enabled) return null;

  return (
    <section id="services" className={`services-section${isHome ? ' home-services-slider' : ''}`}>
      <div className="section-padding">
        <div className="section-header centered-header">
          <div className="section-label">{servicesHeader?.sectionLabel || "What We Do"}</div>
          <h2 className="section-title">{servicesHeader?.title || "Our core services"}</h2>
          <p className="section-sub">
            {servicesHeader?.subtitle || "Everything your brand needs to grow online — handled by one team, built around one strategy."}
          </p>
        </div>

        {isHome && services.length > 1 && (
          <div className="service-slider-controls" aria-label="Service slider controls">
            <span>Explore all {services.length} services</span>
            <button type="button" onClick={() => moveSlider(-1)} disabled={scrollLimits.start} aria-label="Previous service"><ArrowLeft size={20} /></button>
            <button type="button" onClick={() => moveSlider(1)} disabled={scrollLimits.end} aria-label="Next service"><ArrowRight size={20} /></button>
          </div>
        )}
        <div className="services-grid" ref={sliderRef} role={isHome ? 'region' : undefined} aria-label={isHome ? 'Our services, scroll horizontally' : undefined} tabIndex={isHome ? 0 : undefined}>
          {services.map((service, index) => (
            <div className="service-card" key={service.id}>
              <div className="agency-service-index">/ 0{index + 1}</div>
              {service.imageUrl && (
                <div className="agency-service-photo">
                  <img src={service.imageUrl} alt={service.title} loading="lazy" />
                </div>
              )}

              <div className="svc-icon">
                {iconMap[service.icon] || <Code size={28} />}
              </div>

              <h3>{service.title}</h3>
              <p>{service.description}</p>

              {service.features && service.features.length > 0 && (
                <ul className="svc-list">
                  {service.features.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
