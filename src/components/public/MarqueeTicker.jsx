import React from 'react';

export const MarqueeTicker = () => {
  const items = [
    "eBook Creation & Publishing",
    "Custom Web Development",
    "Social Media Growth Strategy",
    "High-ROI Paid Advertising",
    "Amazon KDP Bestsellers",
    "Brand Strategy & UI/UX Design"
  ];

  // Repeat items for seamless infinite scroll
  const marqueeList = [...items, ...items, ...items];

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {marqueeList.map((text, idx) => (
          <div className="marquee-item" key={idx}>
            <span className="star">✦</span>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
