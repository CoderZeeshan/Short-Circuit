import React from 'react';

const priorities = [
  {
    key: 'cost',
    title: 'COST',
    description: 'Lowest generation cost',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <text x="12" y="16.5" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif" textAnchor="middle" fill="currentColor">₹</text>
      </svg>
    )
  },
  {
    key: 'quality',
    title: 'QUALITY',
    description: 'Highest visual quality',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}>
        <path d="M12 2c0 5.5-4.5 10-10 10 5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z" fill="currentColor" stroke="none" />
      </svg>
    )
  },
  {
    key: 'balanced',
    title: 'BALANCED',
    description: 'Best mix of cost & quality',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}>
        <path d="M12 3v17M3 6h18M6 6l-2 7h4L6 6zm12 0l-2 7h4l-2-7zM4 20h16" />
      </svg>
    )
  },
  {
    key: 'overall',
    title: 'OVERALL',
    description: 'Our overall ranking',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    )
  }
];

export default function PrioritySelector({ activePriority, onSelectPriority, onContinue, hideHeaderAndButton }) {
  return (
    <div className="priority-selection-flow">
      {!hideHeaderAndButton && (
        <>
          <div className="step-track">
            <div className="rail filled"></div>
            <div className="label">STEP 1 / 2</div>
            <div className="rail"></div>
          </div>

          <div className="step-title">
            <h1>What matters most to you?</h1>
            <p className="subhead">Select your primary optimization goal. We'll automatically filter and rank the available AI models to match your priority.</p>
          </div>
        </>
      )}

      <div className="priority-grid">
        {priorities.map((item) => {
          const isActive = activePriority === item.key;
          return (
            <div
              key={item.key}
              className={`priority-card ${isActive ? 'active' : ''}`}
              onClick={() => onSelectPriority(item.key)}
              style={{
                border: isActive ? '1px solid var(--gold)' : '1px solid var(--panel-line)',
                background: isActive ? 'rgba(217, 178, 106, 0.05)' : 'var(--panel)',
                boxShadow: isActive ? '0 10px 25px rgba(217, 178, 106, 0.05)' : 'none'
              }}
            >
              {/* Reticle corners for selection indicator */}
              <div className="reticle-corner tl" style={{ borderColor: 'var(--gold)' }}></div>
              <div className="reticle-corner tr" style={{ borderColor: 'var(--gold)' }}></div>
              <div className="reticle-corner bl" style={{ borderColor: 'var(--gold)' }}></div>
              <div className="reticle-corner br" style={{ borderColor: 'var(--gold)' }}></div>

              <div className="icon" style={{
                color: isActive ? 'var(--gold)' : 'var(--text-muted)',
                background: isActive ? 'rgba(217, 178, 106, 0.12)' : 'rgba(255, 255, 255, 0.03)'
              }}>
                {item.icon}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: isActive ? 'var(--gold-bright)' : 'var(--text)',
                marginBottom: '0.6rem'
              }}>
                {item.title}
              </h3>
              <p style={{
                fontSize: '0.85rem',
                lineHeight: '1.5',
                color: isActive ? 'var(--text)' : 'var(--text-muted)',
                marginBottom: '0.5rem'
              }}>
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {!hideHeaderAndButton && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            className="btn btn-emerald"
            disabled={!activePriority}
            onClick={onContinue}
          >
            CONTINUE →
          </button>
        </div>
      )}
    </div>
  );
}
