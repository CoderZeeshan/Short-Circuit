import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  // Force dark mode globally by ensuring light-theme class is absent
  useEffect(() => {
    document.body.classList.remove('light-theme');
    localStorage.setItem('theme', 'dark');
  }, []);

  return (
    <div style={{ position: 'fixed', top: '1.5rem', left: '2rem', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Link to="/" style={{ 
        fontFamily: 'var(--font-display)', 
        fontSize: '1.8rem', 
        fontWeight: 700, 
        color: 'var(--gold-bright)', 
        textDecoration: 'none', 
        letterSpacing: '-0.03em',
        textShadow: '0 2px 10px rgba(0,0,0,0.5)',
        pointerEvents: 'auto'
      }}>
        GenScope
      </Link>

      {!isHome && (
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(21, 19, 14, 0.8)',
            border: '1px solid rgba(217, 178, 106, 0.35)',
            color: 'var(--gold-bright)',
            fontSize: '0.78rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            padding: '4px 12px',
            borderRadius: '20px',
            cursor: 'pointer',
            marginTop: '6px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            transition: 'all 0.2s ease',
            pointerEvents: 'auto'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--gold)';
            e.currentTarget.style.background = 'rgba(217, 178, 106, 0.2)';
            e.currentTarget.style.transform = 'translateX(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(217, 178, 106, 0.35)';
            e.currentTarget.style.background = 'rgba(21, 19, 14, 0.8)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          ← Back
        </button>
      )}
    </div>
  );
}
