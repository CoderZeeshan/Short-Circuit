import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VideoModels from './pages/VideoModels';
import Navbar from './components/layout/Navbar';
import PageBackground from './components/layout/PageBackground';

// Fallback layout placeholder for Image Models page
const ImageModelsFallback = () => (
  <div style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
    <Navbar />
    <PageBackground />
    <div className="container" style={{ position: 'relative', zIndex: 2, color: 'var(--ink)', padding: '4rem', textAlign: 'center', fontFamily: 'var(--font-sans)' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--ink)' }}>
        Image Model Explorer
      </h1>
      <p style={{ color: 'var(--ink-dim)', fontSize: '1.2rem' }}>
        Image model comparison is being built.
      </p>
    </div>
  </div>
);

const LoginFallback = () => (
  <div style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
    <Navbar />
    <PageBackground />
    <div className="container" style={{ position: 'relative', zIndex: 2, color: 'var(--ink)', padding: '4rem', textAlign: 'center', fontFamily: 'var(--font-sans)' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--ink)' }}>
        Login
      </h1>
      <p style={{ color: 'var(--ink-dim)', fontSize: '1.2rem' }}>
        Authentication interface is locked.
      </p>
    </div>
  </div>
);

const PlaygroundFallback = () => (
  <div style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
    <Navbar />
    <PageBackground />
    <div className="container" style={{ position: 'relative', zIndex: 2, color: 'var(--ink)', padding: '4rem', textAlign: 'center', fontFamily: 'var(--font-sans)' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--ink)' }}>
        Playground
      </h1>
      <p style={{ color: 'var(--ink-dim)', fontSize: '1.2rem' }}>
        Playground environments are disabled.
      </p>
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video" element={<VideoModels />} />
        <Route path="/image" element={<ImageModelsFallback />} />
        <Route path="/login" element={<LoginFallback />} />
        <Route path="/playground" element={<PlaygroundFallback />} />
      </Routes>
    </Router>
  );
}
