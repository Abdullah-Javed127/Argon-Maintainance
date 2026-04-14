import React from 'react';
import { History, ArrowRight, Trash2 } from 'lucide-react';

const HistoryList = ({ history, onSelect, onClear }) => {
  if (history.length === 0) return null;

  return (
    <div className="history-container animate-fade-in">
      <div className="history-header">
        <div className="title">
          <History size={18} />
          <span>Memory Buffer</span>
        </div>
        <button onClick={onClear} className="clear-btn" title="Clear History">
          <Trash2 size={16} />
        </button>
      </div>

      <div className="history-list">
        {history.map((item, index) => (
          <button key={index} className="history-item" onClick={() => onSelect(item)}>
            <span className="item-name">{item.machine}</span>
            <ArrowRight size={14} className="item-arrow" />
          </button>
        ))}
      </div>

      <style jsx>{`
        .history-container {
          max-width: 800px;
          margin: 3rem auto 0 auto;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
        }

        @media (max-width: 640px) {
          .history-container {
            margin-top: 2rem;
            padding-top: 1.5rem;
          }
        }

        .history-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .history-header .title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-muted);
          font-weight: 600;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .clear-btn {
          color: var(--text-muted);
          padding: 4px;
          border-radius: 4px;
        }

        .clear-btn:hover {
          color: #ef4444;
          background: #fee2e2;
        }

        .history-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .history-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 1rem;
          background: white;
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 0.875rem;
          color: var(--text-main);
          font-weight: 500;
          box-shadow: var(--shadow-sm);
        }

        .history-item:hover {
          border-color: var(--primary);
          color: var(--primary);
          box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.1);
        }

        .item-arrow {
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.2s ease;
        }

        .history-item:hover .item-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        @media (max-width: 640px) {
          .history-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
          }
          
          .history-item {
            justify-content: space-between;
            padding: 0.5rem 0.75rem;
            font-size: 0.8125rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HistoryList;
