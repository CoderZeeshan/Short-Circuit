import React from 'react';
import Navbar from '../components/layout/Navbar';
import PageBackground from '../components/layout/PageBackground';

export default function VideoModels() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <Navbar />
      <PageBackground />
      <div className="container" style={{ position: 'relative', zIndex: 2, color: 'var(--ink)', padding: '4rem', textAlign: 'center', fontFamily: 'var(--font-sans)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--ink)' }}>
          Video Model Explorer
        </h1>
        <p style={{ color: 'var(--ink-dim)', fontSize: '1.2rem' }}>
          Video model comparison is being built.
        </p>
      </div>
    </div>
  );
}
