import React from 'react';

export default function GenerationOption({ label, value, icon }) {
  return (
    <div className="metric-item">
      <span className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {icon}
        {label}
      </span>
      <div className="stat-val" style={{ marginTop: '4px', fontSize: '1.1rem' }}>
        {value}
      </div>
    </div>
  );
}
