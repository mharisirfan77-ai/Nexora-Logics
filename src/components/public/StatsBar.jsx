import React from 'react';
import { useCMS } from '../../context/CMSContext';

export const StatsBar = () => {
  const { data } = useCMS();
  const { stats, sectionsConfig } = data;

  if (!sectionsConfig.stats?.enabled) return null;

  return (
    <div className="stats-bar">
      {stats.map((item) => (
        <div key={item.id} className="stat-item">
          <div className="stat-num">
            {item.number.includes('+') ? (
              <>
                {item.number.replace('+', '')}
                <span>+</span>
              </>
            ) : item.number.includes('%') ? (
              <>
                {item.number.replace('%', '')}
                <span>%</span>
              </>
            ) : (
              item.number
            )}
          </div>
          <div className="stat-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
};
