import React from 'react';

export default function RecommendationCard({ text, loading }) {
  return (
    <div className="recommendation-card" style={{
      background: 'linear-gradient(180deg, rgba(217, 178, 106, 0.05) 0%, rgba(217, 178, 106, 0.02) 100%)',
      border: '1px solid rgba(217, 178, 106, 0.2)',
      borderRadius: '16px',
      padding: '1.8rem 2rem',
      marginBottom: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
        <span style={{ fontSize: '1rem' }}>✨</span>
        <span style={{ 
          fontSize: '0.75rem', 
          fontWeight: 700, 
          letterSpacing: '0.08em', 
          color: 'var(--accent)', 
          textTransform: 'uppercase' 
        }}>
          AI Analysis & Recommendation
        </span>
      </div>
      {loading ? (
        <div style={{ color: 'var(--ink-dim)', fontSize: '0.95rem', fontStyle: 'italic' }}>
          Generating AI recommendation...
        </div>
      ) : (
        <p style={{ 
          color: 'var(--ink)', 
          fontSize: '1rem', 
          lineHeight: '1.6', 
          margin: 0,
          whiteSpace: 'pre-wrap'
        }}>
          {text}
        </p>
      )}
    </div>
  );
}
