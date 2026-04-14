import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

const SearchBox = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  return (
    <div className="search-container animate-fade-in">
      <form onSubmit={handleSubmit} className="premium-card search-card">
        <div className="search-input-wrapper">
          <Search className={`search-icon ${isLoading ? 'loading' : ''}`} />
          <input 
            type="text" 
            placeholder="Search machine (e.g. Washing Machine, Car, Laptop...)" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
          />
          <button type="submit" className="search-btn" disabled={isLoading || !query.trim()}>
            {isLoading ? (
              <Loader2 className="spinner" size={20} />
            ) : (
              'Analyze'
            )}
          </button>
        </div>
      </form>

      <style jsx>{`
        .search-container {
          max-width: 800px;
          margin: 0 auto 3rem auto;
        }

        .search-card {
          padding: 0.5rem;
          border-radius: 16px;
        }

        .search-input-wrapper {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.5rem 1rem;
        }

        @media (max-width: 640px) {
          .search-input-wrapper {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
            padding: 1rem;
          }
        }

        .search-icon {
          color: var(--text-muted);
          transition: color 0.3s ease;
        }

        .search-card:focus-within .search-icon {
          color: var(--primary);
        }

        input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 1.125rem;
          padding: 0.75rem 0;
          color: var(--text-main);
          font-weight: 500;
        }

        input::placeholder {
          color: #94a3b8;
          font-weight: 400;
        }

        .search-btn {
          background: var(--primary);
          color: white;
          padding: 0.75rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .search-btn:hover:not(:disabled) {
          background: var(--accent);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        .search-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background: var(--secondary);
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 640px) {
          .search-card {
            border-radius: 20px;
          }
          
          .search-btn {
            width: 100%;
            padding: 1rem;
          }
          
          input {
            font-size: 1rem;
            text-align: center;
          }

          .search-icon {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchBox;
