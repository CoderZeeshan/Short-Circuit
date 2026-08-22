import React from 'react';

function ImageModelCard({ model, onSelect }) {
  return (
    <article className="image-model-card">
      <div className="image-model-preview">
        <img src={model.imageUrl} alt={`${model.platformName} example`} loading="lazy" />
        
        {/* Overlay showing use cases on hover */}
        <div className="image-model-overlay">
          <div className="image-model-overlay-tags">
            {model.useCases.map((useCase) => (
              <span key={useCase}>{useCase.replace('-', ' ')}</span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="image-model-content">
        <h3>{model.platformName}</h3>
        <p className="image-model-description">{model.description}</p>
        
        <button 
          type="button" 
          className="image-model-button" 
          onClick={() => onSelect(model)}
        >
          Explore Model →
        </button>
      </div>
    </article>
  );
}

export default ImageModelCard;
