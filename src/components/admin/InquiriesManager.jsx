import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Mail, Check, Trash2, Calendar, Phone } from 'lucide-react';

export const InquiriesManager = () => {
  const { data, markInquiryAsRead, deleteInquiry } = useCMS();
  const { inquiries } = data;

  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 700, color: '#0B0E17', marginBottom: '0.4rem' }}>
        Contact Form Inquiries Inbox
      </h2>
      <p style={{ color: '#5B5F76', marginBottom: '2rem' }}>
        Review messages submitted by potential clients through the public website contact form.
      </p>

      {inquiries.length === 0 ? (
        <div className="admin-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <Mail size={40} style={{ color: '#9CA2C4', marginBottom: '1rem' }} />
          <h4 style={{ color: '#0B0E17' }}>Your Inbox is Empty</h4>
          <p style={{ color: '#5B5F76', fontSize: '0.9rem' }}>No quote requests or messages submitted yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="admin-card"
              style={{
                borderLeft: inq.read ? '4px solid #9CA2C4' : '4px solid #4B4EFF',
                background: inq.read ? '#ffffff' : '#F7F5F0'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <strong style={{ fontSize: '1.1rem', color: '#0B0E17' }}>{inq.name}</strong>
                    {!inq.read && (
                      <span style={{ background: '#4B4EFF', color: '#fff', fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '100px' }}>
                        NEW
                      </span>
                    )}
                    <span className="tag-pill">{inq.service}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.4rem', color: '#5B5F76', fontSize: '0.85rem' }}>
                    <span>✉️ {inq.email}</span>
                    {inq.phone && <span><Phone size={13} inline /> {inq.phone}</span>}
                    <span><Calendar size={13} inline /> {new Date(inq.date).toLocaleString()}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  {!inq.read && (
                    <button
                      onClick={() => markInquiryAsRead(inq.id)}
                      style={{ background: '#00a86b', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                    >
                      <Check size={14} /> Mark Read
                    </button>
                  )}
                  <a
                    href={`mailto:${inq.email}?subject=Re: Your Quote Request - Nexora Logics`}
                    style={{ background: '#4B4EFF', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600 }}
                  >
                    Reply Email
                  </a>
                  <button
                    onClick={() => {
                      if (window.confirm('Delete this inquiry?')) {
                        deleteInquiry(inq.id);
                      }
                    }}
                    className="btn-admin-delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--line-light)', color: '#0B0E17', fontSize: '0.95rem', lineHeight: 1.6 }}>
                "{inq.message || 'No additional message provided.'}"
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
