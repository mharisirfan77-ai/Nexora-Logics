import React, { useRef } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Download, Upload, RotateCcw, ShieldAlert } from 'lucide-react';

export const BackupManager = () => {
  const { exportDataJSON, importDataJSON, resetToDefaults } = useCMS();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        importDataJSON(json);
      } catch (err) {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 700, color: '#0B0E17', marginBottom: '0.4rem' }}>
        Backup & Factory Reset
      </h2>
      <p style={{ color: '#5B5F76', marginBottom: '2rem' }}>
        Export your complete website data as a JSON file, restore a previous backup, or reset content back to original initial state.
      </p>

      <div className="admin-card">
        <h3>Export Backup</h3>
        <p style={{ color: '#5B5F76', fontSize: '0.92rem', marginBottom: '1.2rem' }}>
          Download a complete `.json` snapshot of all site copy, projects, services, reviews, and inbox messages.
        </p>
        <button className="btn-admin-save" onClick={exportDataJSON}>
          <Download size={18} /> Export Content Snapshot (JSON)
        </button>
      </div>

      <div className="admin-card">
        <h3>Import Backup Snapshot</h3>
        <p style={{ color: '#5B5F76', fontSize: '0.92rem', marginBottom: '1.2rem' }}>
          Upload a previously saved `.json` file to restore all website content and settings.
        </p>
        <input
          type="file"
          accept=".json"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <button
          className="btn-hero-ghost"
          style={{ color: '#0B0E17', borderColor: '#4B4EFF', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={18} /> Select JSON File to Upload
        </button>
      </div>

      <div className="admin-card" style={{ borderLeft: '4px solid #ff4d4d' }}>
        <h3 style={{ color: '#cc0000', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldAlert size={22} /> Factory Reset
        </h3>
        <p style={{ color: '#5B5F76', fontSize: '0.92rem', marginBottom: '1.2rem' }}>
          Reset all customized copy, services, projects, and contact inquiries back to the original Nexora Logics defaults.
        </p>
        <button className="btn-admin-delete" style={{ padding: '0.75rem 1.6rem', fontSize: '0.92rem' }} onClick={resetToDefaults}>
          <RotateCcw size={16} inline /> Reset All Data to Initial Defaults
        </button>
      </div>
    </div>
  );
};
