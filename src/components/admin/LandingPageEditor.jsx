import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const LandingPageEditor = () => {
  const { data, updateUpworkContent } = useCMS();
  const [form, setForm] = useState({ ...(data.upworkContent || {}), faq: [...(data.upworkContent?.faq || [])] });

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const setFaq = (i, key, value) => setForm((prev) => ({
    ...prev,
    faq: prev.faq.map((item, idx) => idx === i ? { ...item, [key]: value } : item)
  }));
  const addFaq = () => setForm((prev) => ({ ...prev, faq: [...(prev.faq || []), { q: 'New question', a: 'Answer this question here.' }] }));
  const removeFaq = (i) => setForm((prev) => ({ ...prev, faq: prev.faq.filter((_, idx) => idx !== i) }));

  const save = (e) => { e.preventDefault(); updateUpworkContent(form); };
  const field = (label, key, textarea=false) => (
    <div className="admin-form-group">
      <label>{label}</label>
      {textarea ? <textarea className="admin-input" rows="3" value={form[key] || ''} onChange={(e)=>set(key,e.target.value)} /> : <input className="admin-input" value={form[key] || ''} onChange={(e)=>set(key,e.target.value)} />}
    </div>
  );

  return (
    <div>
      <h2 style={{ fontFamily:'Space Grotesk', fontSize:'1.8rem', fontWeight:700, color:'#fff', marginBottom:'.4rem' }}>Upwork Outreach Landing Page</h2>
      <p style={{ color:'#a7aaad', marginBottom:'2rem' }}>Edit the direct-only /upwork-outreach campaign page. Its navigation remains isolated from the main website.</p>
      <form onSubmit={save}>
        <div className="admin-card">
          <h3>Hero</h3>
          {field('Badge', 'heroBadge')}
          {field('Headline line 1', 'heroTitle')}
          {field('Highlighted headline', 'heroHighlight')}
          {field('Description', 'heroDescription', true)}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
            <div>{field('Primary CTA', 'primaryCta')}{field('Primary CTA note', 'primaryCtaNote')}</div>
            <div>{field('Secondary CTA', 'secondaryCta')}{field('Secondary CTA note', 'secondaryCtaNote')}</div>
          </div>
        </div>
        <div className="admin-card">
          <h3>FAQ</h3>
          {(form.faq || []).map((item,i)=>(
            <div key={i} style={{border:'1px solid #dcdcde',padding:'1rem',marginBottom:'1rem',borderRadius:'6px'}}>
              <div className="admin-form-group"><label>Question {i+1}</label><input className="admin-input" value={item.q} onChange={(e)=>setFaq(i,'q',e.target.value)} /></div>
              <div className="admin-form-group"><label>Answer</label><textarea className="admin-input" rows="3" value={item.a} onChange={(e)=>setFaq(i,'a',e.target.value)} /></div>
              <button type="button" onClick={()=>removeFaq(i)} style={{background:'#d63638',color:'#fff',border:0,padding:'.45rem .75rem',borderRadius:'4px',cursor:'pointer',display:'inline-flex',gap:'.35rem',alignItems:'center'}}><Trash2 size={14}/> Remove</button>
            </div>
          ))}
          <button type="button" onClick={addFaq} style={{background:'#2271b1',color:'#fff',border:0,padding:'.55rem .85rem',borderRadius:'4px',cursor:'pointer',display:'inline-flex',gap:'.35rem',alignItems:'center'}}><Plus size={14}/> Add FAQ</button>
        </div>
        <div className="admin-card">
          <h3>Final CTA</h3>
          {field('Final heading', 'finalTitle')}
          {field('Final description', 'finalDescription', true)}
          {field('Final button text', 'finalCta')}
        </div>
        <button type="submit" className="btn-admin-save"><Save size={16}/> Save Landing Page</button>
      </form>
    </div>
  );
};
