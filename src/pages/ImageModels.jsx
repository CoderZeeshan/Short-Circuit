import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import PageBackground from "../components/layout/PageBackground";
import imageData from "../data/imageData";
import imageCategories from "../data/imageCategories";
import ImageCategorySelector from "../components/image/ImageCategorySelector";
import ImageResults from "../components/image/ImageResults";
import ImageModelDetail from "../components/image/ImageModelDetail";

function ImageModels() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);

  return (
    <div id="screen-image" style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden', paddingBottom: '4rem' }}>
      <style>{`
        #screen-image {
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
          font-family: var(--font-sans);
          color: var(--text);
        }
        
        #screen-image h1, #screen-image h2, #screen-image h3, #screen-image h4 {
          font-family: var(--font-display);
        }

        /* Filmstrip scrollable chips selector */
        #screen-image .image-category-selector {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding: 1rem 0;
          margin-bottom: 2.5rem;
          scrollbar-width: none;
        }
        #screen-image .image-category-selector::-webkit-scrollbar {
          display: none;
        }

        #screen-image .category-chip {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--panel-line);
          color: var(--text-muted);
          border-radius: 99px;
          padding: 0.6rem 1.6rem;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          outline: none;
        }

        #screen-image .category-chip:hover {
          border-color: var(--gold);
          color: var(--text);
          background: rgba(217, 178, 106, 0.04);
        }

        #screen-image .category-chip.selected {
          background: var(--gold);
          color: #12100b;
          border-color: var(--gold);
          box-shadow: 0 4px 15px rgba(217, 178, 106, 0.3);
        }

        /* Results Grid */
        #screen-image .image-results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2.5rem;
          margin-top: 1.5rem;
        }

        /* Editorial Image Card */
        #screen-image .image-model-card {
          background: var(--panel);
          border: 1px solid var(--panel-line);
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
        }

        #screen-image .image-model-card:hover {
          transform: translateY(-6px);
          border-color: var(--gold);
          box-shadow: 0 20px 40px rgba(0,0,0,0.6), 0 0 20px rgba(217, 178, 106, 0.15);
        }

        /* Image preview container (dominant) */
        #screen-image .image-model-preview {
          position: relative;
          width: 100%;
          height: 240px;
          overflow: hidden;
          background: rgba(0,0,0,0.2);
        }

        #screen-image .image-model-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        #screen-image .image-model-card:hover .image-model-preview img {
          transform: scale(1.05);
        }

        /* Hover Overlay for tags */
        #screen-image .image-model-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(11, 9, 6, 0.95) 0%, rgba(11, 9, 6, 0.2) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.2rem;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        #screen-image .image-model-card:hover .image-model-overlay {
          opacity: 1;
        }

        #screen-image .image-model-overlay-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        #screen-image .image-model-overlay-tags span {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          background: rgba(217, 178, 106, 0.15);
          color: var(--gold-bright);
          padding: 2px 8px;
          border-radius: 4px;
          border: 1px solid rgba(217, 178, 106, 0.25);
          text-transform: uppercase;
        }

        /* Content block */
        #screen-image .image-model-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        #screen-image .image-model-content h3 {
          font-size: 1.35rem;
          font-weight: 600;
          color: var(--text);
          margin: 0 0 0.5rem 0;
        }

        #screen-image .image-model-description {
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0 0 1.5rem 0;
          flex-grow: 1;
        }

        #screen-image .image-model-button {
          background: transparent;
          border: 1.5px solid var(--gold-dim);
          color: var(--gold-bright);
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.6rem 1.4rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.25s ease;
          align-self: flex-start;
          outline: none;
        }

        #screen-image .image-model-card:hover .image-model-button {
          background: var(--gold);
          border-color: var(--gold);
          color: #12100b;
        }

        /* Drawer details strengths */
        #screen-image .detail-strengths-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 0.5rem;
        }

        #screen-image .detail-strength-badge {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--panel-line);
          color: var(--text);
          border-radius: 6px;
          padding: 0.4rem 0.8rem;
          font-size: 0.8rem;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
      `}</style>
      <Navbar />
      <PageBackground />

      <main className="container" style={{ position: 'relative', zIndex: 2, padding: '2rem 1.5rem' }}>
        <header className="image-page-header" style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: '3rem' }}>
          <span style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.75rem', 
            fontWeight: 700, 
            letterSpacing: '0.08em', 
            color: 'var(--gold)', 
            textTransform: 'uppercase' 
          }}>
            Image Model Finder
          </span>
          <h1 style={{ 
            fontSize: '2.8rem', 
            fontWeight: 700, 
            marginTop: '0.5rem', 
            marginBottom: '0.8rem', 
            color: 'var(--text)', 
            letterSpacing: '-0.02em'
          }}>
            Find the right image model
          </h1>
          <p style={{ 
            color: 'var(--text-muted)', 
            fontSize: '1.05rem', 
            maxWidth: '600px', 
            margin: '0 auto', 
            lineHeight: '1.6' 
          }}>
            Choose what you're creating and explore models suited to your needs.
          </p>
        </header>

        <ImageCategorySelector
          categories={imageCategories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        <ImageResults
          models={imageData}
          selectedCategory={selectedCategory}
          onSelectModel={setSelectedModel}
        />

        {selectedModel && (
          <ImageModelDetail model={selectedModel} onClose={() => setSelectedModel(null)} />
        )}
      </main>
    </div>
  );
}

export default ImageModels;
