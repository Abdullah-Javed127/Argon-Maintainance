import React, { useState } from 'react';
import { Key, Save, AlertCircle } from 'lucide-react';

const ApiKeyForm = ({ onSave }) => {
  const [key, setKey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (key.trim()) {
      onSave(key.trim());
    }
  };

  return (
    <div className="api-key-container animate-fade-in">
      <div className="premium-card api-card">
        <div className="card-header">
          <Key className="header-icon" />
          <h2>Setup Argon Thinking</h2>
        </div>
        <p className="card-desc">
          To provide maintenance advice, Argon uses Groq's high-speed intelligence. 
          Please enter your Groq API Key below.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="gpg-..." 
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
            />
            <button type="submit" className="save-btn">
              <Save size={18} />
              Save Key
            </button>
          </div>
        </form>

        <div className="security-note">
          <AlertCircle size={14} />
          <span>Your key is stored locally in your browser and never sent to our servers.</span>
        </div>
      </div>

      <style jsx>{`
        .api-key-container {
          max-width: 500px;
          margin: 4rem auto;
        }

        .api-card {
          padding: 2rem;
          text-align: center;
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .header-icon {
          color: var(--primary);
        }

        .card-header h2 {
          font-size: 1.5rem;
          margin: 0;
        }

        .card-desc {
          color: var(--text-muted);
          font-size: 0.875rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .input-group {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        input {
          flex: 1;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          border: 2px solid var(--border);
          font-size: 1rem;
        }

        input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }

        .save-btn {
          background: var(--primary);
          color: white;
          padding: 0.75rem 1.25rem;
          border-radius: 8px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          white-space: nowrap;
        }

        .save-btn:hover {
          background: var(--accent);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
        }

        .security-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: var(--text-muted);
          font-size: 0.75rem;
          background: var(--bg-main);
          padding: 0.75rem;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
};

export default ApiKeyForm;
