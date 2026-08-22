import React from 'react';

export default function PageBackground() {
  return (
    <div className="noise" style={{
      position: 'absolute',
      inset: '-100px',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
      pointerEvents: 'none',
      zIndex: 1,
      opacity: 0.5,
      mixBlendMode: 'overlay'
    }}></div>
  );
}
