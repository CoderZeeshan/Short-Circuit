import React from 'react';

function ImageModelDetail({ model, onClose }) {
  return (
    <div className="drawer-overlay active" onClick={onClose}>
      <div 
        className="drawer" 
        onClick={(e) => e.stopPropagation()} 
        style={{
          background: 'var(--panel)',
          borderColor: 'var(--panel-line)',
          color: 'var(--text)'
        }}
      >
        <div className="drawer-header" style={{ borderBottom: '1px solid var(--panel-line)', paddingBottom: '1rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--text)', margin: 0, fontWeight: 700 }}>
              {model.platformName}
            </h2>
            <span style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.75rem', 
              color: 'var(--gold-bright)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Image Generation Model
            </span>
          </div>
          <button 
            className="drawer-close" 
            onClick={onClose}
            style={{ color: 'var(--text-muted)' }}
          >
            ×
          </button>
        </div>

        {/* Large Preview Image */}
        <div style={{ 
          width: '100%', 
          height: '240px', 
          borderRadius: '12px', 
          overflow: 'hidden', 
          border: '1px solid var(--panel-line)',
          marginTop: '1rem'
        }}>
          <img 
            src={model.imageUrl} 
            alt={`${model.platformName} sample`} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>

        {/* Description */}
        <div className="detail-section" style={{ borderTop: 'none', paddingTop: '0.5rem' }}>
          <h4 style={{ color: 'var(--gold-bright)', marginBottom: '0.5rem' }}>Overview</h4>
          <p style={{ color: 'var(--text)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
            {model.description}
          </p>
        </div>

        {/* Strengths */}
        <div className="detail-section" style={{ borderTop: '1px solid var(--panel-line)', paddingTop: '1.5rem' }}>
          <h4 style={{ color: 'var(--gold-bright)', marginBottom: '0.6rem' }}>Key Strengths</h4>
          <div className="detail-strengths-grid">
            {model.strengths.map((strength) => (
              <div key={strength} className="detail-strength-badge">
                <span style={{ fontSize: '0.85rem' }}>✦</span>
                <span>{strength}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="detail-section" style={{ borderTop: '1px solid var(--panel-line)', paddingTop: '1.5rem', marginBottom: '2rem' }}>
          <h4 style={{ color: 'var(--gold-bright)', marginBottom: '0.6rem' }}>Optimized Use Cases</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {model.useCases.map((useCase) => (
              <span 
                key={useCase} 
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  background: 'rgba(217, 178, 106, 0.1)',
                  color: 'var(--gold)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(217, 178, 106, 0.2)',
                  textTransform: 'uppercase'
                }}
              >
                {useCase.replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageModelDetail;
