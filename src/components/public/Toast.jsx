import React from 'react';
import { useCMS } from '../../context/CMSContext';

export const Toast = () => {
  const { toastMessage } = useCMS();

  if (!toastMessage) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        background: '#0B0E17',
        color: '#ffffff',
        border: '1px solid #4B4EFF',
        padding: '0.9rem 1.6rem',
        borderRadius: '10px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        zIndex: 9999,
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.92rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        animation: 'slideUp 0.3s ease'
      }}
    >
      <span style={{ color: '#FF8A3D', fontWeight: 'bold' }}>✓</span>
      {toastMessage}
    </div>
  );
};
