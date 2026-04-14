import React from 'react';
import { ClipboardCheck, Calendar, Info, Wrench } from 'lucide-react';

const ResultCard = ({ machine, result }) => {
  if (!result) return null;

  // Simple parsing of the structured response
  const lines = result.split('\n').filter(l => l.trim());
  const interval = lines.find(l => l.toLowerCase().includes('interval'))?.split(':')[1] || 'As needed';
  const actions = lines.filter(l => l.includes('-') || l.includes('•'));
  const rationale = lines.find(l => l.toLowerCase().includes('rationale'))?.split(':')[1] || '';

  return (
    <div className="result-container animate-fade-in">
      <div className="premium-card result-card">
        <div className="result-header">
          <Wrench className="machine-icon" />
          <div className="title-group">
            <h3>Maintenance Plan</h3>
            <p>{machine}</p>
          </div>
        </div>

        <div className="info-grid">
          <div className="info-item">
            <div className="info-label">
              <Calendar size={16} />
              <span>Interval</span>
            </div>
            <div className="info-value priority">{interval}</div>
          </div>

          <div className="info-item full">
            <div className="info-label">
              <ClipboardCheck size={16} />
              <span>Required Actions</span>
            </div>
            <ul className="actions-list">
              {actions.map((action, i) => (
                <li key={i}>{action.replace(/^[-•]\s*/, '')}</li>
              ))}
              {actions.length === 0 && <li>Check manual for detailed specs</li>}
            </ul>
          </div>

          {rationale && (
            <div className="info-item full rationale-box">
              <div className="info-label">
                <Info size={16} />
                <span>Why this matters</span>
              </div>
              <p className="rationale-text">{rationale}</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .result-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .result-card {
          padding: 2rem;
          background: white;
          border-left: 6px solid var(--primary);
        }

        @media (max-width: 640px) {
          .result-card {
            padding: 1.25rem;
            border-left: 4px solid var(--primary);
          }
        }

        .result-header {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
        }

        @media (max-width: 640px) {
          .result-header {
            margin-bottom: 1.25rem;
            padding-bottom: 1rem;
            gap: 1rem;
          }
        }

        .machine-icon {
          color: var(--primary);
          background: #eff6ff;
          padding: 0.75rem;
          border-radius: 12px;
          width: 48px;
          height: 48px;
        }

        .title-group h3 {
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          margin: 0;
        }

        .title-group p {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-main);
          margin: 0.25rem 0 0 0;
        }

        @media (max-width: 640px) {
          .title-group p {
            font-size: 1.25rem;
          }
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .info-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-muted);
          font-size: 0.875rem;
          font-weight: 600;
        }

        .info-value {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .info-value.priority {
          color: var(--primary);
          background: #eff6ff;
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          width: fit-content;
        }

        .actions-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .actions-list li {
          position: relative;
          padding-left: 1.5rem;
          font-size: 1rem;
          color: var(--text-main);
          line-height: 1.5;
        }

        .actions-list li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.6rem;
          width: 6px;
          height: 6px;
          background: var(--primary);
          border-radius: 50%;
        }

        .rationale-box {
          background: #f8fafc;
          padding: 1rem;
          border-radius: 8px;
        }

        .rationale-text {
          font-size: 0.9375rem;
          color: var(--secondary);
          line-height: 1.6;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default ResultCard;
