import React from 'react';

export default function VideoModelCard({ optionData, index, onOpenDrawer }) {
  const {
    platformName,
    modelName,
    option,
    creditsPerGeneration,
    outputSeconds,
    outputResolution,
    audio,
    costPer10SecINR,
    qualityScore
  } = optionData;

  const starsCount = Math.round(qualityScore / 2);
  const starsStr = '★'.repeat(starsCount) + '☆'.repeat(5 - starsCount);

  return (
    <div className="feature-card reveal visible" style={{ cursor: 'pointer' }} onClick={() => onOpenDrawer(optionData)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
        <div>
          <span className="model-badge" style={{ margin: 0, padding: '0 8px', width: 'auto', height: '24px', borderRadius: '4px', fontSize: '0.75rem', textTransform: 'uppercase' }}>
            #{index + 1}
          </span>
          <span style={{ marginLeft: '8px', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {option} option
          </span>
        </div>
        {audio && (
          <span style={{ fontSize: '0.75rem', background: 'rgba(192, 132, 252, 0.1)', color: 'var(--emerald)', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
            🔊 Audio
          </span>
        )}
      </div>

      <h3>{platformName}</h3>
      <h5 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--ink-dim)', marginBottom: '1.5rem', fontWeight: 500 }}>
        {modelName}
      </h5>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem', borderTop: '1px solid var(--panel-line)', paddingTop: '1rem' }}>
        <div>
          <div className="stat-label">Quality</div>
          <div className="stat-val" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '1rem' }}>
            <span className="stars">{starsStr}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--ink-dim)' }}>({qualityScore})</span>
          </div>
        </div>
        <div>
          <div className="stat-label">Cost / 10s</div>
          <div className="stat-val" style={{ color: 'var(--emerald)', fontSize: '1rem' }}>
            {costPer10SecINR !== null ? `₹${costPer10SecINR}` : 'N/A'}
          </div>
        </div>
        <div>
          <div className="stat-label">Resolution</div>
          <div className="stat-val" style={{ fontSize: '0.9rem' }}>{outputResolution}</div>
        </div>
        <div>
          <div className="stat-label">Output Time</div>
          <div className="stat-val" style={{ fontSize: '0.9rem' }}>{outputSeconds}s</div>
        </div>
      </div>

      <div className="arrow-link" style={{ marginTop: 'auto' }}>
        Detailed Stats →
      </div>
    </div>
  );
}
