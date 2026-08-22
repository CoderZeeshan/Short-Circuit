import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PlaygroundStrip() {
  const navigate = useNavigate();

  return (
    <div className="strip">
      <div className="item" onClick={() => navigate('/playground')} title="Video Prompts">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="2" y="6" width="14" height="12" rx="2" />
          <path d="M22 8l-6 4 6 4V8z" />
        </svg>
      </div>
      <div className="item" onClick={() => navigate('/playground')} title="Prompt Lab">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M9 18h6M10 22h4M12 2a6 6 0 0 0-4 10.5c.5.5 1 1.2 1 2.5h6c0-1.3.5-2 1-2.5A6 6 0 0 0 12 2z" />
        </svg>
      </div>
      <div className="item" onClick={() => navigate('/playground')} title="Prompt Finder / Search Bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </div>
      <div className="item" onClick={() => navigate('/playground')} title="Image Prompts">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4.5 16.5c-1.5 1.5-2 5-2 5s3.5-.5 5-2c.8-.8 1-2 .5-2.7a1.7 1.7 0 00-2.7.5z" />
          <path d="M12 15l-3-3a22 22 0 013.5-7.5C14.5 1.5 18 1 21 3c2 3-1.5 6.5-4.5 9.5A22 22 0 0112 15z" />
          <path d="M9 12l-2-2M15 9c1 1 1.5 2 2 3" />
        </svg>
      </div>
    </div>
  );
}
