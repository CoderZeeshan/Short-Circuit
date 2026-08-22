import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import PageBackground from '../components/layout/PageBackground';
import PrioritySelector from '../components/video/PrioritySelector';
import VideoResults from '../components/video/VideoResults';
import videoData from '../data/videoData';
import { rank } from '../ranking/scoring';
import { generateRecommendation, buildRecommendationInput } from '../services/recommendation';

export default function VideoModels() {
  const navigate = useNavigate();
  const [activePriority, setActivePriority] = useState('cost');
  const [recommendationText, setRecommendationText] = useState('');
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);
  const [facts, setFacts] = useState(null);

  // Perform ranking dynamically based on selected priority
  const results = rank(videoData, activePriority);

  useEffect(() => {
    let isCurrent = true;
    setLoadingRecommendation(true);

    // Compute deterministic facts block locally for Overall priority
    if (activePriority === 'overall') {
      const input = buildRecommendationInput(videoData, 'overall');
      setFacts(input.facts);
    } else {
      setFacts(null);
    }

    // Load Person D recommendation synthesis (calling real Gemini API or fallback)
    generateRecommendation(videoData, activePriority)
      .then((res) => {
        if (isCurrent) {
          setRecommendationText(res.recommendationText);
          setLoadingRecommendation(false);
        }
      })
      .catch(() => {
        if (isCurrent) {
          setLoadingRecommendation(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [activePriority]);

  return (
    <div id="screen-video" style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden', paddingBottom: '4rem' }}>
      <style>{`
        #screen-video {
          --bg-primary: #0F0B08;
          --bg-panel: #18120D;
          --cream: #FAF3E0;
          --mud: #A69279;
          --mud-dim: #382A1C;
          --gold: #D4AF37;
          --gold-bright: #F0D479;

          --gold-dim: #382A1C;
          --text: #FAF3E0;
          --text-muted: #A69279;
          --text-faint: #382A1C;
          --bg: #0F0B08;
          --panel: #18120D;
          --panel-hover: #221A13;
          --panel-line: #382A1C;
          --ink: #FAF3E0;
          --ink-dim: #A69279;
          --accent: #F0D479;
          --accent-glow: rgba(240, 212, 121, 0.15);
          --emerald: #D4AF37;
          --emerald-glow: rgba(212, 175, 55, 0.15);
          font-family: var(--font-sans);
        }
        
        #screen-video h1, #screen-video h2, #screen-video h3, #screen-video h4, #screen-video h5 {
          font-family: var(--font-display);
        }
      `}</style>
      <Navbar />
      <PageBackground />

      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '2rem 1.5rem' }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: '2.5rem' }}>
          <span style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.75rem', 
            fontWeight: 700, 
            letterSpacing: '0.08em', 
            color: 'var(--accent)', 
            textTransform: 'uppercase' 
          }}>
            Video Model Finder
          </span>
          <h1 style={{ 
            fontSize: '2.8rem', 
            fontWeight: 700, 
            marginTop: '0.5rem', 
            marginBottom: '0.8rem', 
            color: 'var(--ink)', 
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.02em'
          }}>
            Find the right AI video model
          </h1>
          <p style={{ 
            color: 'var(--ink-dim)', 
            fontSize: '1.05rem', 
            maxWidth: '600px', 
            margin: '0 auto', 
            lineHeight: '1.6' 
          }}>
            Compare AI video generators based on cost, quality and overall performance.
          </p>
        </div>

        {/* Priority Selector Header */}
        <h4 style={{ 
          textAlign: 'center', 
          fontFamily: 'var(--font-mono)', 
          fontSize: '0.8rem', 
          color: 'var(--accent)', 
          fontWeight: 700, 
          letterSpacing: '0.08em', 
          textTransform: 'uppercase', 
          marginBottom: '1.5rem' 
        }}>
          What matters most to you?
        </h4>

        {/* Priority Selection Grid */}
        <PrioritySelector 
          activePriority={activePriority} 
          onSelectPriority={setActivePriority} 
          hideHeaderAndButton={true} 
        />

        {/* Separator Line */}
        <div style={{ 
          height: '1px', 
          background: 'var(--panel-line)', 
          margin: '3rem 0 2rem' 
        }}></div>

        {/* Results view */}
        <VideoResults 
          results={results} 
          priority={activePriority} 
          recommendationText={recommendationText}
          loadingRecommendation={loadingRecommendation}
          facts={facts}
          onBack={() => navigate('/')} 
        />
      </div>
    </div>
  );
}
