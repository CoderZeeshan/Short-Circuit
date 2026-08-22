import React from 'react';

export default function PlaygroundStrip() {
  return (
    <div className="strip">
      <div className="item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="2" y="6" width="14" height="12" rx="2" />
          <path d="M22 8l-6 4 6 4V8z" />
        </svg>
      </div>
      <div className="item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M9 18h6M10 22h4M12 2a6 6 0 0 0-4 10.5c.5.5 1 1.2 1 2.5h6c0-1.3.5-2 1-2.5A6 6 0 0 0 12 2z" />
        </svg>
      </div>
      <div className="item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M19.4 13.5a1 1 0 010-3l.6-.1a2 2 0 001.4-2.8l-.3-.6a2 2 0 00-2.7-.9l-.5.3a1 1 0 01-1.3-1.3l.3-.5a2 2 0 00-.9-2.7l-.6-.3a2 2 0 00-2.8 1.4l-.1.6a1 1 0 01-3 0l-.1-.6a2 2 0 00-2.8-1.4l-.6.3a2 2 0 00-.9 2.7l.3.5a1 1 0 01-1.3 1.3l-.5-.3a2 2 0 00-2.7.9l-.3.6a2 2 0 001.4 2.8l.6.1a1 1 0 010 3l-.6.1a2 2 0 00-1.4 2.8l.3.6a2 2 0 002.7.9l.5-.3a1 1 0 011.3 1.3l-.3.5a2 2 0 00.9 2.7l.6.3a2 2 0 002.8-1.4l.1-.6a1 1 0 013 0l.1.6a2 2 0 002.8 1.4l.6-.3a2 2 0 00.9-2.7l-.3-.5a1 1 0 011.3-1.3l.5.3a2 2 0 002.7-.9l.3-.6a2 2 0 00-1.4-2.8l-.6-.1z" />
        </svg>
      </div>
      <div className="item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4.5 16.5c-1.5 1.5-2 5-2 5s3.5-.5 5-2c.8-.8 1-2 .5-2.7a1.7 1.7 0 00-2.7.5z" />
          <path d="M12 15l-3-3a22 22 0 013.5-7.5C14.5 1.5 18 1 21 3c2 3-1.5 6.5-4.5 9.5A22 22 0 0112 15z" />
          <path d="M9 12l-2-2M15 9c1 1 1.5 2 2 3" />
        </svg>
      </div>
    </div>
  );
}
