import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import PageBackground from '../components/layout/PageBackground';
import PromptLab from '../components/playground/PromptLab';
import { promptLabs } from '../data/playgroundData';

export default function Playground() {
  const [activeTab, setActiveTab] = useState('video'); // 'video' | 'lab' | 'search' | 'image'
  const [searchQuery, setSearchQuery] = useState('');

  // Combine prompts for search view
  const allPromptsList = [
    ...promptLabs.map(p => ({ ...p, type: 'Prompt Lab' })),
    {
      id: 'v1',
      title: 'Karakoram Motorcycle Commercial',
      basicPrompt: 'A motorcycle riding fast through snow mountains',
      optimizedPrompt: 'Create a 10-second photorealistic cinematic motorcycle commercial featuring a young rider on a Suzuki GS150SE along the Karakoram Highway...',
      type: 'Video Prompt',
      pdf: '/resources/video-prompts.pdf'
    },
    {
      id: 'v2',
      title: 'Tokyo Smartphone Food Vlog',
      basicPrompt: 'Japanese creator reviewing street food in Tokyo',
      optimizedPrompt: 'Ultra-realistic smartphone food vlog set in Tokyo, female creator walking side streets and trying strawberry cream dessert...',
      type: 'Video Prompt',
      pdf: '/resources/video-prompts.pdf'
    },
    {
      id: 'i1',
      title: 'Minimalist Layered Travel Poster',
      basicPrompt: 'Scandinavian poster of New York City',
      optimizedPrompt: 'Create a premium editorial travel illustration using a minimal layered cutout illustration style. Scandinavian editorial poster...',
      type: 'Image Prompt',
      pdf: '/resources/image-prompts.pdf'
    },
    {
      id: 'i2',
      title: 'Sleek Wireless Headphone Ad',
      basicPrompt: 'Headphone poster ad',
      optimizedPrompt: 'A sleek and minimalist poster advertisement for high-tech wireless headphones floating in zero-gravity...',
      type: 'Image Prompt',
      pdf: '/resources/image-prompts.pdf'
    }
  ];

  const filteredSearchResults = allPromptsList.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.basicPrompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.optimizedPrompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="screen-playground-tabbed" style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden', paddingBottom: '4rem' }}>
      <style>{`
        #screen-playground-tabbed {
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
          --bg: #0F0B08;
          --panel: #18120D;
          --panel-hover: #221A13;
          --panel-line: #382A1C;
          font-family: var(--font-sans);
          color: var(--text);
        }

        #screen-playground-tabbed h1, #screen-playground-tabbed h2, #screen-playground-tabbed h3, #screen-playground-tabbed h4 {
          font-family: var(--font-display);
        }

        /* Top Tab Bar & Icon Bar Overlay */
        .playground-nav-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 1.5rem auto 2.5rem;
          max-width: 580px;
          background: rgba(17, 15, 27, 0.85);
          border: 1px solid var(--panel-line);
          border-radius: 999px;
          padding: 6px;
          backdrop-filter: blur(12px);
          position: relative;
          z-index: 10;
        }

        .playground-tab-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          padding: 10px 16px;
          border-radius: 30px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          font-family: var(--font-sans);
        }

        .playground-tab-btn:hover {
          color: var(--gold-bright);
        }

        .playground-tab-btn.active {
          background: rgba(217, 178, 106, 0.15);
          color: var(--gold);
          border: 1px solid var(--gold);
          box-shadow: 0 0 12px rgba(217, 178, 106, 0.2);
        }

        .playground-tab-content {
          animation: fadeIn 0.3s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Split Layout */
        .playground-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          padding: 2rem 0;
        }

        @media (max-width: 900px) {
          .playground-split {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        .playground-text h2 {
          font-size: 3rem;
          font-weight: 700;
          line-height: 1.1;
          color: var(--text);
          margin-bottom: 1.2rem;
        }

        .playground-text p {
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--text-muted);
          margin-bottom: 2rem;
          max-width: 500px;
        }

        /* Floating PDF Visual */
        .playground-floating-pdf {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: var(--text);
          position: relative;
          cursor: pointer;
          transform: rotate(-3deg);
          transition: all 0.35s ease;
        }

        .playground-floating-pdf:hover {
          transform: rotate(0deg) scale(1.03) translateY(-6px);
        }

        .pdf-paper-sheet {
          width: 100%;
          max-width: 380px;
          height: 460px;
          background: linear-gradient(135deg, rgba(28, 25, 38, 0.95) 0%, rgba(18, 16, 24, 0.98) 100%);
          border: 1px solid rgba(217, 178, 106, 0.3);
          border-radius: 16px;
          padding: 2.2rem;
          box-shadow: 0 30px 60px -15px rgba(0,0,0,0.8), 0 0 30px rgba(217, 178, 106, 0.15);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .pdf-icon-badge {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: rgba(217, 178, 106, 0.15);
          border: 1px solid var(--gold);
          color: var(--gold-bright);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
        }
      `}</style>

      <Navbar />
      <PageBackground />

      <main className="container" style={{ position: 'relative', zIndex: 2, padding: '2rem 1.5rem' }}>
        
        {/* Top Tab Bar / Icon Bar with 4 Logos */}
        <div className="playground-nav-bar">
          <button 
            className={`playground-tab-btn ${activeTab === 'video' ? 'active' : ''}`}
            onClick={() => setActiveTab('video')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: '18px', height: '18px' }}>
              <rect x="2" y="6" width="14" height="12" rx="2" />
              <path d="M22 8l-6 4 6 4V8z" />
            </svg>
            <span>Video Prompts</span>
          </button>

          <button 
            className={`playground-tab-btn ${activeTab === 'lab' ? 'active' : ''}`}
            onClick={() => setActiveTab('lab')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: '18px', height: '18px' }}>
              <path d="M9 18h6M10 22h4M12 2a6 6 0 0 0-4 10.5c.5.5 1 1.2 1 2.5h6c0-1.3.5-2 1-2.5A6 6 0 0 0 12 2z" />
            </svg>
            <span>Prompt Lab</span>
          </button>

          <button 
            className={`playground-tab-btn ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: '18px', height: '18px' }}>
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <span>Search Bar</span>
          </button>

          <button 
            className={`playground-tab-btn ${activeTab === 'image' ? 'active' : ''}`}
            onClick={() => setActiveTab('image')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: '18px', height: '18px' }}>
              <path d="M4.5 16.5c-1.5 1.5-2 5-2 5s3.5-.5 5-2c.8-.8 1-2 .5-2.7a1.7 1.7 0 00-2.7.5z" />
              <path d="M12 15l-3-3a22 22 0 013.5-7.5C14.5 1.5 18 1 21 3c2 3-1.5 6.5-4.5 9.5A22 22 0 0112 15z" />
              <path d="M9 12l-2-2M15 9c1 1 1.5 2 2 3" />
            </svg>
            <span>Image Prompts</span>
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="playground-tab-content" key={activeTab}>
          
          {/* Tab 1: Video Prompts */}
          {activeTab === 'video' && (
            <div className="playground-split">
              <div className="playground-text">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '0.8rem' }}>
                  Video Prompt Directory
                </span>
                <h2>Proven Video Generation Prompts</h2>
                <p>
                  Real prompts that produced strong results, with links to see the exact output. Includes cinematic motorcycle commercials, food vlogs, and dance overlays.
                </p>
                <a 
                  href="/resources/video-prompts.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                  style={{
                    background: 'var(--gold)',
                    color: '#12100b',
                    border: 'none',
                    fontWeight: 'bold',
                    padding: '0.85rem 1.8rem',
                    borderRadius: '8px',
                    boxShadow: '0 4px 15px rgba(217, 178, 106, 0.3)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  📄 Open Video Prompts PDF ↗
                </a>
              </div>

              <a 
                href="/resources/video-prompts.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="playground-floating-pdf"
              >
                <div className="pdf-paper-sheet">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div className="pdf-icon-badge">🎥</div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--gold-bright)', fontWeight: 'bold' }}>
                      PDF DOCUMENT
                    </span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text)', marginBottom: '0.5rem', fontWeight: 700 }}>
                      Video Production Blueprint
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
                      Contains 5 curated video recipes including Karakoram Commercials, Tokyo Vlogs, and Dance Overlays.
                    </p>
                  </div>
                  <div style={{ borderTop: '1px solid var(--panel-line)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--gold-bright)', fontWeight: 600 }}>Click to View PDF ↗</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>5 Pages</span>
                  </div>
                </div>
              </a>
            </div>
          )}

          {/* Tab 2: Prompt Lab */}
          {activeTab === 'lab' && <PromptLab />}

          {/* Tab 3: Search Bar / Prompt Finder */}
          {activeTab === 'search' && (
            <div style={{ maxWidth: '900px', margin: '0 auto', background: '#0F0B08', border: '1px solid #382A1C', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Interactive Search Tool
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--text)', margin: '0.5rem 0 0.8rem 0', fontWeight: 700 }}>
                  Prompt &amp; Recipe Finder
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '550px', margin: '0 auto' }}>
                  Search across all structured prompt blueprints, basic-to-optimized comparisons, and production recipes in real time.
                </p>
              </div>

              {/* Search Bar Input */}
              <div style={{ position: 'relative', marginBottom: '2rem' }}>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type to search prompts, keywords, or camera directions..."
                  style={{
                    width: '100%',
                    background: '#18120D',
                    border: '1px solid var(--gold-dim)',
                    borderRadius: '12px',
                    padding: '1.2rem 1.5rem 1.2rem 3.5rem',
                    color: 'var(--text)',
                    fontSize: '1.05rem',
                    fontFamily: 'var(--font-sans)',
                    outline: 'none',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.4)'
                  }}
                />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', width: '22px', height: '22px', color: 'var(--gold)' }}>
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.1rem' }}
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Search Results List */}
              <div style={{ display: 'grid', gap: '1.2rem' }}>
                {filteredSearchResults.length > 0 ? (
                  filteredSearchResults.map((item, idx) => (
                    <div key={idx} style={{ background: '#18120D', border: '1px solid #382A1C', borderRadius: '12px', padding: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--gold)', background: 'rgba(212, 175, 55, 0.1)', padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                          {item.type}
                        </span>
                        {item.pdf && (
                          <a href={item.pdf} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: '#F0D479', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}>
                            View PDF Source ↗
                          </a>
                        )}
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#FAF3E0', margin: '0 0 8px 0', fontWeight: 600 }}>
                        {item.title}
                      </h3>
                      <p style={{ color: '#A69279', fontSize: '0.88rem', lineHeight: '1.6', margin: 0 }}>
                        {item.optimizedPrompt}
                      </p>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '3rem', color: '#A69279', fontFamily: 'var(--font-mono)' }}>
                    No prompts matching "{searchQuery}" found.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 4: Image Prompts */}
          {activeTab === 'image' && (
            <div className="playground-split">
              <div className="playground-text">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '0.8rem' }}>
                  Image Prompt Directory
                </span>
                <h2>Proven Image Generation Prompts</h2>
                <p>
                  Real prompts that produced strong image results, with links to see the exact output. Includes Scandinavian poster art, headphone ads, and 3D renders.
                </p>
                <a 
                  href="/resources/image-prompts.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                  style={{
                    background: 'var(--gold)',
                    color: '#12100b',
                    border: 'none',
                    fontWeight: 'bold',
                    padding: '0.85rem 1.8rem',
                    borderRadius: '8px',
                    boxShadow: '0 4px 15px rgba(217, 178, 106, 0.3)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  📄 Open Image Prompts PDF ↗
                </a>
              </div>

              <a 
                href="/resources/image-prompts.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="playground-floating-pdf"
              >
                <div className="pdf-paper-sheet">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div className="pdf-icon-badge">🖼️</div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--gold-bright)', fontWeight: 'bold' }}>
                      PDF DOCUMENT
                    </span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text)', marginBottom: '0.5rem', fontWeight: 700 }}>
                      Image Design Blueprint
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
                      Contains 5 curated image recipes including Minimalist Travel Posters, Lost Cat Flyers, and 3D Renders.
                    </p>
                  </div>
                  <div style={{ borderTop: '1px solid var(--panel-line)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--gold-bright)', fontWeight: 600 }}>Click to View PDF ↗</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>5 Pages</span>
                  </div>
                </div>
              </a>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
