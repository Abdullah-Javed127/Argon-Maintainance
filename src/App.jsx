import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ApiKeyForm from './components/ApiKeyForm';
import SearchBox from './components/SearchBox';
import ResultCard from './components/ResultCard';
import HistoryList from './components/HistoryList';
import { getMaintenanceAdvice } from './services/groqService';
import { AlertCircle, LogOut } from 'lucide-react';

const App = () => {
  const envKey = import.meta.env.VITE_GROQ_API_KEY;
  const isEnvKeyValid = envKey && envKey !== 'your_groq_api_key_here';

  const [apiKey, setApiKey] = useState(localStorage.getItem('argon_api_key') || '');
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('argon_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentMachine, setCurrentMachine] = useState('');
  const [currentResult, setCurrentResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Persist history
  useEffect(() => {
    localStorage.setItem('argon_history', JSON.stringify(history));
  }, [history]);

  const handleSaveKey = (key) => {
    setApiKey(key);
    localStorage.setItem('argon_api_key', key);
  };

  const handleLogout = () => {
    setApiKey('');
    localStorage.removeItem('argon_api_key');
  };

  const handleSearch = async (machine) => {
    setLoading(true);
    setError('');
    setCurrentResult('');
    setCurrentMachine(machine);

    try {
      const advice = await getMaintenanceAdvice(machine, apiKey);
      setCurrentResult(advice);

      // Update history
      setHistory(prev => {
        const filtered = prev.filter(item => item.machine.toLowerCase() !== machine.toLowerCase());
        return [{ machine, result: advice }, ...filtered].slice(0, 5); // Keep last 5
      });
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHistory = (item) => {
    setCurrentMachine(item.machine);
    setCurrentResult(item.result);
    setError('');
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('argon_history');
  };

  return (
    <div className="argon-app">
      <Header />

      <main>
        {(!apiKey && !isEnvKeyValid) ? (
          <ApiKeyForm onSave={handleSaveKey} />
        ) : (
          <div className="main-content">
            <div className="settings-bar">
              <span className="api-status">
                <div className="status-dot green"></div>
                {isEnvKeyValid ? 'Argon System Key Active' : 'Argon Intelligence Active'}
              </span>
              {!isEnvKeyValid && (
                <button onClick={handleLogout} className="logout-btn">
                  <LogOut size={14} />
                  Disconnect
                </button>
              )}
            </div>

            <SearchBox onSearch={handleSearch} isLoading={loading} />

            {error && (
              <div className="error-message animate-fade-in">
                <AlertCircle size={20} />
                <p>{error}</p>
              </div>
            )}

            {currentResult && !loading && (
              <ResultCard machine={currentMachine} result={currentResult} />
            )}

            <HistoryList
              history={history}
              onSelect={handleSelectHistory}
              onClear={clearHistory}
            />
          </div>
        )}
      </main>

      <footer className="argon-footer">
        <p>© 2025 Argon Maintenance Systems.</p>
      </footer>

      <style jsx>{`
        .argon-app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        main {
          flex: 1;
        }

        .settings-bar {
          max-width: 800px;
          margin: 0 auto 1.5rem auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1rem;
        }

        .api-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .status-dot.green {
          background: #10b981;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .logout-btn:hover {
          color: #ef4444;
        }

        .error-message {
          max-width: 600px;
          margin: 0 auto 2rem auto;
          padding: 1rem 1.5rem;
          background: #fef2f2;
          border: 1px solid #fee2e2;
          border-radius: 12px;
          color: #991b1b;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .error-message p {
          font-size: 0.9375rem;
          font-weight: 500;
          margin: 0;
        }

        .argon-footer {
          text-align: center;
          padding: 4rem 0 2rem 0;
          color: var(--text-muted);
          font-size: 0.8125rem;
        }

        @media (max-width: 768px) {
          .settings-bar {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
