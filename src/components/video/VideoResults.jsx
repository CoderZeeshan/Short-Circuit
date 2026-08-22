import React, { useState } from 'react';
import VideoModelCard from './VideoModelCard';
import GenerationOption from './GenerationOption';

export default function VideoResults({ results, priority, onBack }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'

  const recommendedOption = results.length > 0 ? results[0] : null;
  const comparisonOptions = priority !== 'overall' && results.length > 1 ? results.slice(1) : results;

  const handleOpenDrawer = (option) => {
    setSelectedOption(option);
  };

  const handleCloseDrawer = () => {
    setSelectedOption(null);
  };

  const renderStars = (score) => {
    if (score === null || score === undefined) return 'N/A';
    const count = Math.round(score / 2);
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  };

  return (
    <div className="video-results-view">
      <div className="results-header">
        <div>
          <h1 style={{ fontSize: '2.2rem', textAlign: 'left', margin: 0 }}>Model Results</h1>
          <p style={{ color: 'var(--ink-dim)', margin: '0.5rem 0 0' }}>
            Comparing top AI video models tailored to: <strong style={{ color: 'var(--emerald)' }}>{priority.toUpperCase()}</strong>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="results-tabs">
            <button 
              className={`tab-btn ${viewMode === 'table' ? 'active' : ''}`} 
              onClick={() => setViewMode('table')}
            >
              Table View
            </button>
            <button 
              className={`tab-btn ${viewMode === 'cards' ? 'active' : ''}`} 
              onClick={() => setViewMode('cards')}
            >
              Cards View
            </button>
          </div>
          <button className="btn btn-outline" style={{ padding: '0.5rem 1.2rem' }} onClick={onBack}>
            ← Adjust Priority
          </button>
        </div>
      </div>

      {/* Recommended Banner: only for Cost, Quality, Balanced */}
      {priority !== 'overall' && recommendedOption && (
        <div className="recommendation-card">
          <div>
            <span className="rec-badge">⭐ RECOMMENDED FOR YOU</span>
            <h2 className="rec-title">{recommendedOption.platformName}</h2>
            <p className="rec-desc" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--accent)' }}>
              Model: {recommendedOption.modelName} ({recommendedOption.option} setting)
            </p>
            <div className="rec-stats">
              <div className="stat-box">
                <span className="stat-label">Cost / 10s</span>
                <span className="stat-val" style={{ color: 'var(--emerald)' }}>
                  {recommendedOption.costPer10SecINR !== null ? `₹${recommendedOption.costPer10SecINR}` : 'N/A'}
                </span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Quality Score</span>
                <span className="stat-val">
                  <span className="stars">{renderStars(recommendedOption.qualityScore)}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--ink-dim)', marginLeft: '6px' }}>
                    ({recommendedOption.qualityScore}/10)
                  </span>
                </span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Resolution</span>
                <span className="stat-val">{recommendedOption.outputResolution}</span>
              </div>
            </div>
          </div>
          <div>
            <button className="btn btn-primary" onClick={() => handleOpenDrawer(recommendedOption)}>
              See Detailed Stats →
            </button>
          </div>
        </div>
      )}

      {/* Comparison section */}
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--ink)' }}>
        {priority !== 'overall' ? 'Alternative Models Comparison' : 'All Video Models'}
      </h2>

      {viewMode === 'table' ? (
        <div className="table-container reveal visible">
          <table>
            <thead>
              <tr>
                <th>Model / Provider</th>
                <th>Cost (per 10s)</th>
                <th>Quality Score</th>
                <th>Resolution</th>
                <th>Audio</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {comparisonOptions.map((opt, idx) => (
                <tr key={`${opt.platformName}-${opt.modelName}-${idx}`}>
                  <td>
                    <span className="model-badge">
                      {opt.platformName.charAt(0)}
                    </span>
                    <span className="model-name">{opt.platformName}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--ink-dim)', marginLeft: '8px' }}>
                      ({opt.modelName})
                    </span>
                  </td>
                  <td>
                    <span className="cost-tag">
                      {opt.costPer10SecINR !== null ? `₹${opt.costPer10SecINR}` : 'N/A'}
                    </span>
                  </td>
                  <td>
                    <span className="score-badge">
                      <span className="stars" style={{ marginRight: '4px' }}>
                        {renderStars(opt.qualityScore)}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--ink-dim)' }}>
                        ({opt.qualityScore})
                      </span>
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 500 }}>{opt.outputResolution}</span>
                  </td>
                  <td>
                    <span>{opt.audio ? '🔊 Yes' : '🔇 No'}</span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-outline" 
                      style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
                      onClick={() => handleOpenDrawer(opt)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="main-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {comparisonOptions.map((opt, idx) => (
            <VideoModelCard 
              key={`${opt.platformName}-${opt.modelName}-${idx}`} 
              optionData={opt} 
              index={priority !== 'overall' ? idx + 1 : idx} 
              onOpenDrawer={handleOpenDrawer}
            />
          ))}
        </div>
      )}

      {/* Detailed Stats Drawer */}
      <div 
        className={`drawer-overlay ${selectedOption ? 'active' : ''}`} 
        onClick={handleCloseDrawer}
      >
        {selectedOption && (
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h2 id="drawer-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', margin: 0 }}>
                {selectedOption.platformName}
              </h2>
              <button className="drawer-close" onClick={handleCloseDrawer}>×</button>
            </div>

            <h5 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--accent)', marginTop: '-1rem', marginBottom: '1.5rem' }}>
              Mode: {selectedOption.modelName} ({selectedOption.option} option)
            </h5>

            <div className="detail-section">
              <h4>Model Specifications</h4>
              <div className="metric-grid">
                <GenerationOption 
                  label="Cost per 10 seconds" 
                  value={selectedOption.costPer10SecINR !== null ? `₹${selectedOption.costPer10SecINR}` : 'N/A'}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px', color: 'var(--emerald)' }}>
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  }
                />
                <GenerationOption 
                  label="Fidelity Score" 
                  value={`${selectedOption.qualityScore}/10`}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px', color: 'var(--amber)' }}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  }
                />
                <GenerationOption 
                  label="Generation Time" 
                  value={`${selectedOption.outputSeconds}s output`}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px', color: 'var(--accent)' }}>
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  }
                />
                <GenerationOption 
                  label="Credits required" 
                  value={`${selectedOption.creditsPerGeneration} credits`}
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px', color: 'var(--ink)' }}>
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  }
                />
              </div>
            </div>

            <div className="detail-section">
              <h4>Additional Details</h4>
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--panel-line)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--ink-dim)' }}>Output Resolution:</span>
                  <span style={{ fontWeight: 600 }}>{selectedOption.outputResolution}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--ink-dim)' }}>Audio Included:</span>
                  <span style={{ fontWeight: 600 }}>{selectedOption.audio ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h4>Sample Output Preview</h4>
              <div style={{ width: '100%', height: '180px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--panel-line)', position: 'relative', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'var(--ink-dim)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
                  🎥 Preview Output Placeholder
                </span>
              </div>
            </div>

            <div className="detail-section" style={{ marginTop: 'auto' }}>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleCloseDrawer}>
                Close Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
