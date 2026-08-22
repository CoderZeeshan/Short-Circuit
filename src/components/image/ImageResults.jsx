import React from 'react';
import ImageModelCard from './ImageModelCard';

function ImageResults({ models, selectedCategory, onSelectModel }) {
  const recommendedModels = selectedCategory
    ? models.filter((model) => model.useCases.includes(selectedCategory))
    : models;

  return (
    <section className="image-results" style={{ marginTop: '2rem' }}>
      <div className="image-results-header" style={{ marginBottom: '2rem' }}>
        <span style={{ 
          fontFamily: 'var(--font-mono)', 
          fontSize: '0.75rem', 
          fontWeight: 700, 
          letterSpacing: '0.08em', 
          color: 'var(--gold)',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '0.4rem'
        }}>
          RECOMMENDED MODELS
        </span>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', margin: 0 }}>
          {selectedCategory ? "Models selected for your use case" : "Explore image generation models"}
        </p>
      </div>
      <div className="image-results-grid">
        {recommendedModels.length > 0 ? (
          recommendedModels.map((model) => (
            <ImageModelCard 
              key={model.platformName} 
              model={model} 
              onSelect={onSelectModel} 
            />
          ))
        ) : (
          <p className="no-image-results" style={{ color: 'var(--text-muted)', gridColumn: '1/-1', fontStyle: 'italic', margin: '2rem 0' }}>
            No verified models are available for this use case yet.
          </p>
        )}
      </div>
    </section>
  );
}

export default ImageResults;
