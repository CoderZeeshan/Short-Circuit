import React from 'react';

const priorities = [
  {
    key: 'cost',
    title: 'Cost',
    description: 'Lowest cost per 10 seconds of output. Ideal for bulk processing or budget-constrained projects.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M9.5 9.5c0-1.5 1.2-2.2 2.5-2.2s2.5.9 2.5 2c0 1.4-1.4 1.8-2.5 2.2-1.3.5-2.5 1-2.5 2.3 0 1.1 1.2 2 2.5 2s2.5-.7 2.5-2.2" />
      </svg>
    ),
    weights: [95, 20, 35],
    weightLabel: 'Cost Efficiency'
  },
  {
    key: 'quality',
    title: 'Best Quality',
    description: 'Highest fidelity outputs and most consistent motion, regardless of cost.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9-6.3 3.9 1.7-7-5.4-4.7 7.1-.6z" />
      </svg>
    ),
    weights: [30, 95, 25],
    weightLabel: 'Fidelity Score'
  },
  {
    key: 'balanced',
    title: 'Balanced',
    description: 'The optimal sweet spot between cost and output quality (60% cost + 40% quality).',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18M5 8l-3 5 3 5M19 8l3 5-3 5M5 8h14M5 18h14" />
      </svg>
    ),
    weights: [60, 60, 60],
    weightLabel: 'Balanced Ratio'
  },
  {
    key: 'overall',
    title: 'Overall',
    description: 'Standard baseline comparison of all models in their default configuration order.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    ),
    weights: [50, 50, 50],
    weightLabel: 'Default Weight'
  }
];

export default function PrioritySelector({ activePriority, onSelectPriority, onContinue }) {
  return (
    <div className="priority-selection-flow">
      <div className="step-track">
        <div className="rail filled"></div>
        <div className="label">STEP 1 / 2</div>
        <div className="rail"></div>
      </div>

      <div className="step-title">
        <h1>What matters most to you?</h1>
        <p className="subhead">Select your primary optimization goal. We'll automatically filter and rank the available AI models to match your priority.</p>
      </div>

      <div className="priority-grid">
        {priorities.map((item) => {
          const isActive = activePriority === item.key;
          return (
            <div
              key={item.key}
              className={`priority-card ${isActive ? 'active' : ''}`}
              onClick={() => onSelectPriority(item.key)}
            >
              {/* Reticle corners for selection indicator */}
              <div className="reticle-corner tl"></div>
              <div className="reticle-corner tr"></div>
              <div className="reticle-corner bl"></div>
              <div className="reticle-corner br"></div>

              <div className="icon">
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              
              <div className="weights-container">
                <div className="weight-row">
                  <span>{item.weightLabel}</span>
                  <span>{isActive ? `${item.weights[1]}%` : `${item.weights[0]}%`}</span>
                </div>
                <div className="weights-bar-group">
                  <div className="bar">
                    <span style={{ width: isActive ? `${item.weights[0]}%` : '0%' }}></span>
                  </div>
                  <div className="bar">
                    <span style={{ width: isActive ? `${item.weights[1]}%` : '0%' }}></span>
                  </div>
                  <div className="bar">
                    <span style={{ width: isActive ? `${item.weights[2]}%` : '0%' }}></span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          className="btn btn-emerald"
          disabled={!activePriority}
          onClick={onContinue}
        >
          CONTINUE →
        </button>
      </div>
    </div>
  );
}
