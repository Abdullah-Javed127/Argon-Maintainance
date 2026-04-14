import React from 'react';
import { Cog, ShieldCheck } from 'lucide-react';

const Header = () => {
  return (
    <header className="argon-header">
      <div className="logo-section">
        <div className="logo-icon">
          <Cog size={32} />
        </div>
        <div className="logo-text">
          <h1>Argon<span>'s</span> Maintenance</h1>
          <p><ShieldCheck size={12} /> PRECISION CARE</p>
        </div>
      </div>
      
      

      <style jsx>{`
        .argon-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 3rem;
          padding: 1rem 0;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-icon {
          background-color: var(--primary);
          padding: 0.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.39);
        }

        .logo-icon :global(svg) {
          color: white;
        }

        .logo-text h1 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-main);
          letter-spacing: -0.025em;
          margin: 0;
        }

        .logo-text span {
          color: var(--primary);
        }

        .logo-text p {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          margin: 0;
        }

      `}</style>
    </header>
  );
};

export default Header;
