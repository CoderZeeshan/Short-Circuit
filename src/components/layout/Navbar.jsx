import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  };

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  return (
    <header>
      <div className="nav-container">
        <Link to="/" className="logo">
          <div className="logo-dot"></div>
          ModelMind
        </Link>
        <div className="nav-links">
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn" 
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', padding: '0 4px', transition: 'transform 0.2s' }}
            title="Toggle Light/Dark Theme"
          >
            🌓
          </button>
        </div>
      </div>
    </header>
  );
}
