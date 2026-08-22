import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ModelTypeCard({ type, tag, title1, title2, title3, description, buttonText, mediaUrl, bgClass }) {
  const navigate = useNavigate();

  const handleClick = () => {
  console.log('CARD CLICKED', type);
  navigate(`/${type}`);
};
  return (
    <div className="card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <span className="tag">{tag}</span>
      <div className={`card-media ${bgClass || ''}`} style={{ border: 'none', background: bgClass ? `url(${mediaUrl}) center/cover no-repeat` : undefined }}>
        {!bgClass && mediaUrl && (
          <>
            <video src={mediaUrl} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}></video>
            <div className="play">
              <div className="circle">
                <svg viewBox="0 0 24 24" fill="white" style={{ width: '16px', height: '16px', marginLeft: '2px' }}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
      <h3>{title1}</h3>
      <h2>{title2}</h2>
      <h4>{title3}</h4>
      <p>{description}</p>
      <button 
        className="btn" 
        style={{ background: 'transparent' }} 
        onClick={(e) => { 
          e.stopPropagation(); 
          handleClick(); 
        }}
      >
        {buttonText}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px', transition: 'transform .25s ease' }}>
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
