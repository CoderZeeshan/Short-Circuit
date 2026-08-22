import React, { useState } from 'react';
import RecommendationCard from '../recommendation/RecommendationCard';
import videoData from '../../data/videoData';

export default function VideoResults({ results, priority, recommendationText, loadingRecommendation, facts, onBack }) {
  const [selectedModel, setSelectedModel] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const recommendedOption = results.length > 0 ? results[0] : null;

  const renderStars = (score) => {
    if (score === null || score === undefined) return 'N/A';
    const count = Math.round(score / 2);
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  };

  const getBrandBgColor = (name) => {
    const n = name.toLowerCase();
    if (n.includes('kling')) return 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)';
    if (n.includes('runway')) return 'linear-gradient(135deg, #f39c12 0%, #d35400 100%)';
    if (n.includes('pika')) return 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)';
    if (n.includes('veo')) return 'linear-gradient(135deg, #1abc9c 0%, #16a085 100%)';
    if (n.includes('seedance')) return 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
    if (n.includes('luma')) return 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)';
    return 'linear-gradient(135deg, #7f8c8d 0%, #95a5a6 100%)';
  };

  const getBrandIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('kling')) return '🌀';
    if (n.includes('runway')) return '⚡';
    if (n.includes('pika')) return '🎨';
    if (n.includes('veo')) return '💡';
    if (n.includes('seedance')) return '🔮';
    if (n.includes('luma')) return '✨';
    return '🤖';
  };

  const getGenerationRange = (platformName) => {
    const platform = videoData.find(p => p.platformName === platformName);
    if (!platform || !platform.generationOptions) return { lowest: 'N/A', highest: 'N/A' };
    const lowest = platform.generationOptions.find(o => o.option === 'lowest');
    const highest = platform.generationOptions.find(o => o.option === 'highest');
    
    const lowestStr = lowest ? `${lowest.outputResolution} • ${lowest.outputSeconds} sec` : 'N/A';
    const highestStr = highest ? `${highest.outputResolution} • ${highest.outputSeconds} sec` : 'N/A';
    return { lowest: lowestStr, highest: highestStr };
  };

  const getBadgeText = (pri) => {
    if (pri === 'cost') return 'Best for Cost';
    if (pri === 'quality') return 'Best for Quality';
    if (pri === 'balanced') return 'Best Balanced';
    return '';
  };

  const getHeaderDescription = (pri) => {
    if (pri === 'cost') return 'models ranked by estimated INR cost for a 10-second video.';
    if (pri === 'quality') return 'models ranked by quality score for a 10-second video.';
    if (pri === 'balanced') return 'models ranked by balanced cost-quality ratio.';
    return 'models default configuration order.';
  };

  const handleViewModel = (opt) => {
    const platform = videoData.find(p => p.platformName === opt.platformName);
    setSelectedModel({
      ...opt,
      notesOrCaveats: platform?.notesOrCaveats || '',
      pricingSourceUrl: platform?.pricingSourceUrl || '',
      qualitySources: platform?.qualitySources || []
    });
    setIsDrawerOpen(true);
  };

  return (
    <div className="video-results-view" style={{ marginTop: '2rem' }}>
      
      {/* 1. Dynamic Results Header */}
      <div className="results-header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '2.5rem',
        borderBottom: '1px solid var(--panel-line)',
        paddingBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ 
              fontSize: '1.4rem', 
              fontFamily: 'var(--font-display)', 
              margin: 0, 
              color: 'var(--gold-bright)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em',
              fontWeight: 700
            }}>
              Best Matches for {priority}
            </h2>
            <span 
              style={{ color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.9rem' }}
              title={`Ranking order optimized for ${priority} priority.`}
            >
              ℹ️
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', margin: '6px 0 0', fontSize: '0.9rem' }}>
            {results.length} {getHeaderDescription(priority)}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span style={{ fontSize: '1rem' }}>🗄️</span>
            <span>Updated from our latest dataset</span>
          </div>
          <button 
            className="btn btn-outline" 
            style={{ 
              padding: '0.5rem 1.2rem', 
              fontSize: '0.85rem',
              borderRadius: '6px',
              border: '1px solid var(--panel-line)'
            }} 
            onClick={onBack}
          >
            ← Back to Home
          </button>
        </div>
      </div>

      {/* 2. Prominent Winner Section (Cost / Quality / Balanced) */}
      {priority !== 'overall' && recommendedOption && (
        <div className="recommendation-card" style={{
          background: 'linear-gradient(135deg, rgba(217, 178, 106, 0.08) 0%, rgba(21, 19, 14, 0.95) 100%)',
          border: '1px solid rgba(217, 178, 106, 0.25)',
          borderRadius: '20px',
          padding: '2.5rem',
          marginBottom: '2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ flex: '1 1 450px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.8rem' }}>
              <span className="rec-badge" style={{ margin: 0, background: 'var(--gold)', color: '#16130c' }}>
                Recommended Winner
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--gold-bright)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {recommendedOption.option} option
              </span>
            </div>

            <h2 style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: '2.2rem',
              fontWeight: 700,
              color: 'var(--text)',
              margin: '0 0 0.4rem 0'
            }}>
              {recommendedOption.platformName}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', margin: 0 }}>
              Model: {recommendedOption.modelName}
            </p>
            
            <div style={{ display: 'flex', gap: '2.5rem', marginTop: '2rem' }}>
              {/* Primary Metric */}
              <div>
                <span className="stat-label">
                  {priority === 'quality' ? 'Quality Score' : 'Cost per 10s'}
                </span>
                <div className="stat-val" style={{ 
                  fontSize: '2rem', 
                  fontWeight: 700, 
                  color: priority === 'quality' ? 'var(--text)' : 'var(--gold-bright)',
                  marginTop: '4px'
                }}>
                  {priority === 'quality' ? `${recommendedOption.qualityScore} / 10` : `₹${recommendedOption.costPer10SecINR}`}
                </div>
              </div>

              {/* Secondary Metric */}
              <div>
                <span className="stat-label">
                  {priority === 'quality' ? 'Cost per 10s' : 'Quality Score'}
                </span>
                <div className="stat-val" style={{ 
                  fontSize: '1.4rem', 
                  fontWeight: 600, 
                  color: 'var(--text)',
                  marginTop: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  {priority === 'quality' 
                    ? `₹${recommendedOption.costPer10SecINR}` 
                    : `${recommendedOption.qualityScore} / 10`
                  }
                  {priority !== 'quality' && (
                    <span className="stars" style={{ fontSize: '0.85rem' }}>
                      {renderStars(recommendedOption.qualityScore)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '150px' }}>
            <button 
              className="btn btn-primary"
              style={{
                background: 'var(--gold)',
                color: '#16130c',
                border: 'none',
                fontWeight: 'bold',
                padding: '0.9rem 2rem',
                borderRadius: '8px',
                boxShadow: '0 4px 15px rgba(217, 178, 106, 0.3)'
              }}
              onClick={() => handleViewModel(recommendedOption)}
            >
              View Model →
            </button>
          </div>
        </div>
      )}

      {/* 3. Facts Section (Overall mode only) */}
      {priority === 'overall' && facts && (
        <div className="overall-facts-card" style={{
          background: 'linear-gradient(180deg, rgba(217, 178, 106, 0.04) 0%, rgba(21, 19, 14, 0.95) 100%)',
          border: '1px solid var(--panel-line)',
          borderRadius: '20px',
          padding: '2.2rem 2.5rem',
          marginBottom: '2.5rem'
        }}>
          <h3 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '1.25rem', 
            color: 'var(--gold-bright)', 
            marginTop: 0, 
            marginBottom: '1.4rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em',
            fontWeight: 700
          }}>
            Comparison Key Facts
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {/* Cheapest */}
            <div style={{ background: 'var(--panel)', border: '1px solid var(--panel-line)', padding: '1.5rem', borderRadius: '14px' }}>
              <span className="stat-label" style={{ display: 'block', marginBottom: '6px' }}>Cheapest Option</span>
              <h4 style={{ margin: '0 0 6px 0', fontSize: '1.3rem', color: 'var(--text)', fontWeight: 600 }}>
                {facts.cheapest.platformName}
              </h4>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '1.4rem', color: 'var(--gold-bright)', fontWeight: 700 }}>
                  ₹{facts.cheapest.costPer10SecINR}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ 10s ({facts.cheapest.modelName})</span>
              </div>
            </div>
            
            {/* Highest Quality */}
            <div style={{ background: 'var(--panel)', border: '1px solid var(--panel-line)', padding: '1.5rem', borderRadius: '14px' }}>
              <span className="stat-label" style={{ display: 'block', marginBottom: '6px' }}>Highest Quality Option</span>
              <h4 style={{ margin: '0 0 6px 0', fontSize: '1.3rem', color: 'var(--text)', fontWeight: 600 }}>
                {facts.highestQuality.platformName}
              </h4>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '1.4rem', color: 'var(--text)', fontWeight: 700 }}>
                  {facts.highestQuality.qualityScore}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/ 10 ({facts.highestQuality.modelName})</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-muted)', borderTop: '1px solid var(--panel-line)', paddingTop: '1.2rem' }}>
            <span style={{ fontSize: '1.1rem' }}>📊</span>
            <span>
              {facts.isSameOption 
                ? "The cheapest and highest-quality models are the SAME option." 
                : "The cheapest and highest-quality models are DIFFERENT options, requiring a value trade-off."}
            </span>
          </div>
        </div>
      )}

      {/* 4. AI Recommendation block */}
      <RecommendationCard text={recommendationText} loading={loadingRecommendation} />

      {/* 5. Full Model List (all priorities) */}
      <div style={{ marginTop: '4rem' }}>
        <h3 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: '1.6rem', 
          color: 'var(--text)', 
          marginBottom: '1.5rem',
          fontWeight: 700
        }}>
          {priority !== 'overall' ? 'All Ranked Options' : 'All Video Models'}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {results.map((opt, idx) => {
            const isTopRanked = priority !== 'overall' && idx === 0;
            const range = getGenerationRange(opt.platformName);

            return (
              <div 
                key={`${opt.platformName}-${opt.modelName}-${idx}`} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: isTopRanked ? 'rgba(217, 178, 106, 0.03)' : 'rgba(255, 255, 255, 0.01)',
                  border: isTopRanked ? '1.5px solid var(--gold)' : '1px solid var(--panel-line)',
                  borderRadius: '16px',
                  padding: '1.2rem 1.8rem',
                  marginBottom: '1rem',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  gap: '1.5rem',
                  flexWrap: 'wrap'
                }}
              >
                {/* Column 1: Rank and Logo/Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', minWidth: '240px', flex: '1.5' }}>
                  {/* Rank Box */}
                  <div style={{
                    width: '36px',
                    height: '36px',
                    border: '1px solid var(--panel-line)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    color: isTopRanked ? 'var(--gold-bright)' : 'var(--text-muted)',
                    background: isTopRanked ? 'rgba(217, 178, 106, 0.1)' : 'transparent'
                  }}>
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  
                  {/* Brand Logo/Icon (circular) */}
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: getBrandBgColor(opt.platformName),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    color: '#fff',
                    boxShadow: '0 0 10px rgba(0,0,0,0.3)'
                  }}>
                    {getBrandIcon(opt.platformName)}
                  </div>

                  {/* Brand Info */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)' }}>
                        {opt.platformName}
                      </h4>
                      {isTopRanked && (
                        <span style={{
                          fontSize: '0.65rem',
                          background: 'var(--gold-dim)',
                          color: '#fff',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          {getBadgeText(priority)}
                        </span>
                      )}
                    </div>
                    <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {opt.modelName} ({opt.option} option)
                    </p>
                  </div>
                </div>

                {/* Column 2: Cost */}
                <div style={{ minWidth: '110px', flex: '1' }}>
                  <div className="stat-label" style={{ marginBottom: '4px' }}>Cost for 10 sec</div>
                  <div style={{ fontSize: '1.35rem', color: 'var(--gold-bright)', fontWeight: 700 }}>
                    ₹{opt.costPer10SecINR}
                  </div>
                </div>

                {/* Column 3: Quality */}
                <div style={{ minWidth: '120px', flex: '1' }}>
                  <div className="stat-label" style={{ marginBottom: '4px' }}>Quality Score</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {opt.qualityScore} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>/ 10</span>
                  </div>
                  {/* Progress Bar */}
                  <div style={{ width: '80px', height: '4px', background: 'var(--panel-line)', borderRadius: '2px', marginTop: '6px' }}>
                    <div style={{ width: `${opt.qualityScore * 10}%`, height: '100%', background: 'var(--gold)', borderRadius: '2px' }}></div>
                  </div>
                </div>

                {/* Column 4: Generation Range */}
                <div style={{ minWidth: '200px', flex: '1.5' }}>
                  <div className="stat-label" style={{ marginBottom: '4px' }}>Generation Range</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem' }}>
                    <div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '1px' }}>Lowest</div>
                      <div style={{ color: 'var(--text)', fontWeight: 500 }}>{range.lowest}</div>
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '10px' }}>→</span>
                    <div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '1px' }}>Highest</div>
                      <div style={{ color: 'var(--text)', fontWeight: 500 }}>{range.highest}</div>
                    </div>
                  </div>
                </div>

                {/* Column 5: View Model Button */}
                <div style={{ minWidth: '120px', display: 'flex', justifyContent: 'flex-end', marginLeft: 'auto' }}>
                  <button
                    className="btn btn-outline"
                    style={{
                      padding: '0.5rem 1.2rem',
                      fontSize: '0.85rem',
                      borderRadius: '6px',
                      border: '1px solid var(--gold-dim)',
                      color: 'var(--gold-bright)'
                    }}
                    onClick={() => handleViewModel(opt)}
                  >
                    View Model →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Slide-in Drawer Modal */}
      {selectedModel && (
        <div 
          className={`drawer-overlay ${isDrawerOpen ? 'active' : ''}`} 
          onClick={() => setIsDrawerOpen(false)}
        >
          <div className="drawer" onClick={(e) => e.stopPropagation()} style={{
            background: 'var(--panel)',
            borderColor: 'var(--panel-line)',
            color: 'var(--text)'
          }}>
            <div className="drawer-header" style={{ borderBottom: '1px solid var(--panel-line)', paddingBottom: '1rem' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--text)', margin: 0, fontWeight: 700 }}>
                  {selectedModel.platformName}
                </h2>
                <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Model: {selectedModel.modelName} ({selectedModel.option} option)
                </p>
              </div>
              <button 
                className="drawer-close" 
                onClick={() => setIsDrawerOpen(false)}
                style={{ color: 'var(--text-muted)' }}
              >
                ×
              </button>
            </div>

            <div className="detail-section">
              <h4 style={{ color: 'var(--gold-bright)' }}>Model Performance Specs</h4>
              <div className="metric-grid">
                <div className="metric-item" style={{ background: 'var(--bg)', borderColor: 'var(--panel-line)' }}>
                  <span className="stat-label">Cost per 10 Sec</span>
                  <div className="stat-val" style={{ marginTop: '4px', fontSize: '1.3rem', color: 'var(--gold-bright)', fontWeight: 700 }}>
                    ₹{selectedModel.costPer10SecINR}
                  </div>
                </div>

                <div className="metric-item" style={{ background: 'var(--bg)', borderColor: 'var(--panel-line)' }}>
                  <span className="stat-label">Quality Score</span>
                  <div className="stat-val" style={{ marginTop: '4px', fontSize: '1.15rem', color: 'var(--text)', fontWeight: 700 }}>
                    {selectedModel.qualityScore} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/ 10</span>
                  </div>
                  <div className="stars" style={{ fontSize: '0.75rem', marginTop: '2px' }}>
                    {renderStars(selectedModel.qualityScore)}
                  </div>
                </div>

                <div className="metric-item" style={{ background: 'var(--bg)', borderColor: 'var(--panel-line)' }}>
                  <span className="stat-label">Resolution</span>
                  <div className="stat-val" style={{ marginTop: '4px', fontSize: '1.15rem', color: 'var(--text)', fontWeight: 600 }}>
                    {selectedModel.outputResolution}
                  </div>
                </div>

                <div className="metric-item" style={{ background: 'var(--bg)', borderColor: 'var(--panel-line)' }}>
                  <span className="stat-label">Duration</span>
                  <div className="stat-val" style={{ marginTop: '4px', fontSize: '1.15rem', color: 'var(--text)', fontWeight: 600 }}>
                    {selectedModel.outputSeconds} seconds
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-section" style={{ borderTop: '1px solid var(--panel-line)', paddingTop: '1.5rem' }}>
              <h4 style={{ color: 'var(--gold-bright)', marginBottom: '0.6rem' }}>Audio Output</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
                <span style={{ fontSize: '1.1rem' }}>{selectedModel.audio ? '🔊' : '🔇'}</span>
                <span>{selectedModel.audio ? 'Includes synchronized audio generation.' : 'Video generation only (no audio support).'}</span>
              </div>
            </div>

            {selectedModel.qualitySources && selectedModel.qualitySources.length > 0 && (
              <div className="detail-section" style={{ borderTop: '1px solid var(--panel-line)', paddingTop: '1.5rem' }}>
                <h4 style={{ color: 'var(--gold-bright)', marginBottom: '0.6rem' }}>Quality Benchmarks</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedModel.qualitySources.map((src, i) => (
                    <a 
                      key={i} 
                      href={src} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ 
                        color: 'var(--gold)', 
                        textDecoration: 'underline', 
                        fontSize: '0.85rem',
                        wordBreak: 'break-all'
                      }}
                    >
                      Source Link #{i + 1}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {selectedModel.notesOrCaveats && (
              <div className="detail-section" style={{ borderTop: '1px solid var(--panel-line)', paddingTop: '1.5rem' }}>
                <h4 style={{ color: 'var(--gold-bright)', marginBottom: '0.4rem' }}>Dataset Notes</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0, fontStyle: 'italic' }}>
                  {selectedModel.notesOrCaveats}
                </p>
              </div>
            )}

            <div className="detail-section" style={{ marginTop: 'auto', borderTop: '1px solid var(--panel-line)', paddingTop: '1.5rem' }}>
              {selectedModel.pricingSourceUrl && (
                <a 
                  href={selectedModel.pricingSourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary" 
                  style={{ 
                    width: '100%', 
                    justifyContent: 'center',
                    background: 'var(--gold)',
                    color: '#16130c',
                    border: 'none',
                    fontWeight: 'bold',
                    padding: '0.8rem'
                  }}
                >
                  View Official Pricing ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
