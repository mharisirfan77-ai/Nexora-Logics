import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

export const AgencyReel = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="reel-section">
      {/* Background Media Image / Video Poster */}
      <img
        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
        alt="Nexora Logics Agency Reel"
        className="reel-media-bg"
      />

      {/* Rotating Circular Text Ring & Neon Center Play Button */}
      <div className="rotating-ring-wrapper">
        <svg className="rotating-text-svg" viewBox="0 0 200 200">
          <defs>
            <path
              id="textRingPath"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
          </defs>
          <text fill="#ffffff" fontSize="13.5" fontWeight="700" letterSpacing="2px">
            <textPath href="#textRingPath">
              ✦ CREATIVE DIGITAL AGENCY ✦ CREATIVE DIGITAL AGENCY
            </textPath>
          </text>
        </svg>

        <button
          className="play-center-btn"
          onClick={() => setIsPlaying(true)}
          title="Play Agency Video Reel"
        >
          <Play size={28} fill="#121212" style={{ marginLeft: '4px' }} />
        </button>
      </div>

      {/* Lightbox Video Modal */}
      {isPlaying && (
        <div className="modal-overlay" onClick={() => setIsPlaying(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px', background: '#000', padding: 0 }}>
            <div style={{ padding: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="modal-close" onClick={() => setIsPlaying(false)}>
                <X size={20} />
              </button>
            </div>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Nexora Logics Agency Showcase Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
