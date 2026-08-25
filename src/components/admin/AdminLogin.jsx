import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Lock, Key, ShieldCheck, ArrowLeft } from 'lucide-react';

export const AdminLogin = () => {
  const { data, loginAdmin, navigate } = useCMS();
  const { siteInfo } = data;
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    loginAdmin(password);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse 65% 55% at 50% 30%, rgba(75, 78, 255, 0.25) 0%, transparent 65%), #0B0E17',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      <div
        style={{
          background: '#12162B',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '3rem 2.5rem',
          maxWidth: '440px',
          width: '100%',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
          textAlign: 'center'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(75, 78, 255, 0.15)', color: '#4B4EFF', marginBottom: '1.5rem', border: '1px solid rgba(75,78,255,0.4)' }}>
          <Lock size={28} />
        </div>

        <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>
          Admin Authentication
        </h2>
        <p style={{ color: '#9CA2C4', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Enter the security password to access the Nexora Logics Admin CMS Panel.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="password"
              placeholder="Enter Password (Default: admin123)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                background: '#1B2140',
                border: '1.5px solid rgba(255,255,255,0.15)',
                borderRadius: '10px',
                padding: '0.95rem 1.1rem',
                color: '#ffffff',
                fontSize: '0.98rem',
                outline: 'none'
              }}
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="btn-hero-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '0.95rem', borderRadius: '10px', fontSize: '1rem' }}
          >
            <ShieldCheck size={18} /> Authenticate & Access CMS
          </button>
        </form>

        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', color: '#9CA2C4', fontSize: '0.88rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <ArrowLeft size={16} /> Return to Public Website
          </button>
        </div>
      </div>
    </div>
  );
};
