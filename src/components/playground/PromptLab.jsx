import React, { useState } from 'react';
import { promptLabs } from '../../data/playgroundData';

export default function PromptLab() {
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [selectedImprovementIndex, setSelectedImprovementIndex] = useState(null);
  const [showJson, setShowJson] = useState(false);

  const currentPrompt = promptLabs[activePromptIndex];

  const handlePromptChange = (index) => {
    setActivePromptIndex(index);
    setSelectedImprovementIndex(null);
    setShowJson(false);
  };

  if (!currentPrompt) {
    return (
      <div className="p-8 text-center text-[#A69279] font-sans">
        No prompt data found.
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 bg-[#0F0B08] text-[#FAF3E0] font-sans" style={{ borderRadius: '16px', border: '1px solid #382A1C' }}>
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#FAF3E0] font-['Space_Grotesk',_sans-serif]">
          Prompt Lab
        </h2>
        <p className="mt-1 text-sm text-[#A69279] max-w-2xl leading-relaxed">
          Compare basic prompts with optimized visual instructions to study the impact of structured phrasing and details.
        </p>
      </div>

      <div className="flex gap-3 mb-8 pb-4 border-b border-[#382A1C]/60 overflow-x-auto scrollbar-none">
        {promptLabs.map((prompt, index) => {
          const isActive = activePromptIndex === index;
          return (
            <button
              key={prompt.id}
              onClick={() => handlePromptChange(index)}
              className={`whitespace-nowrap px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded transition-all duration-200 border ${
                isActive
                  ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.08)]'
                  : 'bg-[#18120D]/50 border-[#382A1C] text-[#A69279] hover:border-[#382A1C]/80 hover:text-[#FAF3E0]'
              }`}
              style={{
                background: isActive ? 'rgba(212, 175, 55, 0.15)' : '#18120D',
                color: isActive ? '#D4AF37' : '#A69279',
                borderColor: isActive ? '#D4AF37' : '#382A1C',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              {prompt.title}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="flex flex-col bg-[#18120D] border border-[#382A1C] rounded-lg p-6 shadow-lg" style={{ background: '#18120D', border: '1px solid #382A1C', padding: '1.5rem', borderRadius: '12px' }}>
          <div className="flex items-center gap-2 mb-4" style={{ marginBottom: '1rem' }}>
            <span className="text-[10px] font-bold tracking-widest text-[#A69279] uppercase" style={{ fontSize: '0.75rem', color: '#A69279', fontWeight: 'bold' }}>
              Basic Prompt
            </span>
          </div>
          <div className="flex-grow">
            <p className="text-sm text-[#FAF3E0]/85 leading-relaxed font-sans select-all whitespace-pre-line" style={{ color: 'rgba(250, 243, 224, 0.9)', lineHeight: '1.6' }}>
              "{currentPrompt.basicPrompt}"
            </p>
          </div>
        </div>

        <div className="flex flex-col bg-[#18120D] border border-[#382A1C] rounded-lg p-6 shadow-lg relative overflow-hidden" style={{ background: '#18120D', border: '1px solid #382A1C', padding: '1.5rem', borderRadius: '12px' }}>
          <div className="flex items-center gap-2 mb-4" style={{ marginBottom: '1rem' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F0D479]" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F0D479', display: 'inline-block', marginRight: '6px' }}></span>
            <span className="text-[10px] font-bold tracking-widest text-[#F0D479] uppercase" style={{ fontSize: '0.75rem', color: '#F0D479', fontWeight: 'bold' }}>
              Optimized Prompt
            </span>
          </div>
          <div className="flex-grow">
            <p className="text-sm text-[#FAF3E0] leading-relaxed font-sans select-all whitespace-pre-line" style={{ color: '#FAF3E0', lineHeight: '1.6' }}>
              {currentPrompt.optimizedPrompt}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#18120D]/40 border border-[#382A1C]/60 rounded-lg p-6 mb-6" style={{ background: 'rgba(24, 18, 13, 0.4)', border: '1px solid rgba(56, 42, 28, 0.6)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
        <h3 className="text-sm font-semibold text-[#FAF3E0] mb-4 font-['Space_Grotesk',_sans-serif]" style={{ fontSize: '1rem', color: '#FAF3E0', marginBottom: '1rem' }}>
          Why does it work better?
        </h3>
        <div className="flex flex-wrap gap-2" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {currentPrompt.improvements.map((improvement, index) => {
            const isSelected = selectedImprovementIndex === index;
            return (
              <button
                key={index}
                onClick={() => setSelectedImprovementIndex(isSelected ? null : index)}
                className={`px-3 py-1.5 text-xs rounded transition-all duration-200 border ${
                  isSelected
                    ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.1)]'
                    : 'bg-[#18120D] border-[#382A1C] text-[#A69279] hover:border-[#382A1C]/80 hover:text-[#FAF3E0]'
                }`}
                style={{
                  background: isSelected ? 'rgba(212, 175, 55, 0.2)' : '#18120D',
                  color: isSelected ? '#D4AF37' : '#A69279',
                  borderColor: isSelected ? '#D4AF37' : '#382A1C',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {improvement.label}
              </button>
            );
          })}
        </div>

        {selectedImprovementIndex !== null && (
          <div className="mt-5 pt-4 border-t border-[#382A1C]/40 transition-all duration-200" style={{ marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px solid rgba(56, 42, 28, 0.4)' }}>
            <div className="text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase mb-1.5" style={{ fontSize: '0.75rem', color: '#D4AF37', fontWeight: 'bold', marginBottom: '6px' }}>
              {currentPrompt.improvements[selectedImprovementIndex].label} Explanation
            </div>
            <p className="text-sm text-[#A69279] leading-relaxed" style={{ color: '#A69279', lineHeight: '1.6' }}>
              {currentPrompt.improvements[selectedImprovementIndex].explanation}
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-[#382A1C]/40" style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(56, 42, 28, 0.4)' }}>
        <button
          onClick={() => setShowJson(!showJson)}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#A69279] hover:text-[#FAF3E0] transition-colors duration-200"
          style={{ background: 'none', border: 'none', color: '#A69279', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 'bold' }}
        >
          <span className={`inline-block transition-transform duration-200 text-[10px] ${showJson ? 'rotate-90' : ''}`} style={{ marginRight: '6px' }}>
            ▶
          </span>
          {showJson ? 'Hide JSON Structure' : 'Show JSON Structure'}
        </button>

        {showJson && (
          <div className="mt-4 p-5 rounded bg-[#0F0B08] border border-[#382A1C] font-['JetBrains_Mono',_monospace] text-xs text-[#F0D479] overflow-x-auto leading-relaxed shadow-inner" style={{ marginTop: '1rem', padding: '1rem', background: '#0F0B08', border: '1px solid #382A1C', borderRadius: '8px', color: '#F0D479', fontFamily: 'var(--font-mono)' }}>
            <pre className="whitespace-pre">{JSON.stringify(currentPrompt.jsonPrompt, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
