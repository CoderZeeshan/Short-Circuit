import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import PageBackground from '../components/layout/PageBackground';
import FloatingMedia from '../components/home/FloatingMedia';
import Hero from '../components/home/Hero';
import ModelTypeCard from '../components/home/ModelTypeCard';
import PlaygroundStrip from '../components/home/PlaygroundStrip';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div id="screen-landing">
      {/* Scoped CSS styling for the Home page */}
      <style>{`
        #screen-landing {
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
          font-family: var(--font-sans);
          position: relative;
        }
        
        #screen-landing h1, #screen-landing h2, #screen-landing h4 {
          font-family: var(--font-display);
        }

        #screen-landing .noise {
          position: absolute; 
          inset: -100px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
          opacity: 0.5;
          mix-blend-mode: overlay;
        }

        #screen-landing .wrap {
          position: relative;
          z-index: 2;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 0 60px;
        }

        #screen-landing .gallery-field {
          position: relative;
          min-height: 900px;
        }

        #screen-landing .tile {
          position: absolute;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(217, 178, 106, 0.25);
          box-shadow: 0 30px 60px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,0,0,0.4);
          transition: transform .5s ease, box-shadow .5s ease;
        }

        #screen-landing .tile:hover {
          transform: translateY(-6px) scale(1.03) !important;
          box-shadow: 0 40px 70px -20px rgba(0,0,0,0.8), 0 0 30px rgba(217, 178, 106, 0.25);
          z-index: 5;
        }

        #screen-landing .tile img, #screen-landing .tile .art {
          width: 100%; 
          height: 100%;
          object-fit: cover;
          display: block;
        }

        #screen-landing .tile .play {
          position: absolute; 
          inset: 0;
          display: flex; 
          align-items: center; 
          justify-content: center;
        }

        #screen-landing .play .circle {
          width: 46px; 
          height: 46px;
          border-radius: 50%;
          background: rgba(10, 9, 6, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(4px);
          display: flex; 
          align-items: center; 
          justify-content: center;
        }

        #screen-landing .play svg { 
          width: 16px; 
          height: 16px; 
          margin-left: 2px; 
        }

        #screen-landing .art { 
          position: relative; 
        }

        /* positions - desktop */
        #screen-landing .t1 { top: 30px; left: -100px; width: 250px; height: 150px; transform: rotate(-6deg); }
        #screen-landing .t2 { top: 250px; left: -90px; width: 195px; height: 130px; transform: rotate(-4deg); }
        #screen-landing .t3 { top: 430px; left: -85px; width: 195px; height: 125px; transform: rotate(5deg); }
        #screen-landing .t4 { top: 590px; left: -40px; width: 175px; height: 110px; transform: rotate(-3deg); }
        #screen-landing .t5 { top: 40px; left: 545px; width: 130px; height: 105px; transform: rotate(3deg); opacity: .85; }
        #screen-landing .t6 { top: 175px; left: 400px; width: 165px; height: 105px; transform: rotate(-3deg); opacity: .7; }
        #screen-landing .t7 { top: 60px; right: 110px; width: 240px; height: 145px; transform: rotate(5deg); }
        #screen-landing .t8 { top: 240px; right: -90px; width: 235px; height: 195px; transform: rotate(-4deg); }
        #screen-landing .t9 { top: 470px; right: -95px; width: 165px; height: 130px; transform: rotate(4deg); }
        #screen-landing .t10 { top: 630px; right: -35px; width: 145px; height: 105px; transform: rotate(-5deg); opacity: .8; }

        /* ---------- HERO ---------- */
        #screen-landing .hero {
          position: relative;
          z-index: 3;
          max-width: 720px;
          margin: 80px auto 0;
          text-align: center;
        }

        #screen-landing .eyebrow {
          font-size: 12px;
          letter-spacing: 4px;
          color: var(--gold);
          font-weight: 600;
          margin-bottom: 18px;
        }

        #screen-landing h1 {
          font-weight: 700;
          font-size: 64px;
          line-height: 1.05;
          color: var(--text);
          letter-spacing: 0.5px;
        }

        #screen-landing h1 .accent {
          color: var(--gold-bright);
          font-style: italic;
        }

        #screen-landing .sub {
          margin-top: 22px;
          color: var(--text-muted);
          font-size: 16px;
          line-height: 1.7;
          max-width: 520px;
          margin-left: auto; 
          margin-right: auto;
        }

        /* ---------- CARDS ---------- */
        #screen-landing .cards {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 26px;
          max-width: 1040px;
          margin: 60px auto 0;
        }

        #screen-landing .card {
          background: linear-gradient(180deg, rgba(21,19,14,0.9), rgba(13,12,8,0.95));
          border: 1px solid rgba(42,36,25, 0.5);
          border-radius: 18px;
          padding: 34px 34px 30px;
          position: relative;
          overflow: hidden;
        }

        #screen-landing .card::after {
          content: "";
          position: absolute; 
          inset: 0;
          border-radius: 18px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(217,178,106,0.5), transparent 30%, transparent 70%, rgba(217,178,106,0.2));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        #screen-landing .tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          letter-spacing: 2px;
          font-weight: 700;
          color: var(--gold);
          border: 1px solid rgba(217,178,106,0.35);
          padding: 6px 12px;
          border-radius: 20px;
          margin-bottom: 22px;
        }

        #screen-landing .card-media {
          width: 100%;
          height: 260px;
          border-radius: 12px;
          margin-bottom: 24px;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(217,178,106,0.15);
        }

        #screen-landing .card h3 {
          font-family: var(--font-sans);
          font-weight: 500;
          font-size: 15px;
          color: var(--text-muted);
          margin-bottom: 2px;
        }

        #screen-landing .card h2 {
          font-size: 44px;
          font-weight: 700;
          color: var(--gold-bright);
          line-height: 1.1;
          margin-bottom: 2px;
        }

        #screen-landing .card h4 {
          font-size: 26px;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 14px;
        }

        #screen-landing .card p {
          color: var(--text-muted);
          font-size: 14.5px;
          line-height: 1.6;
          max-width: 340px;
          margin-bottom: 26px;
        }

        #screen-landing .btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          border: 1px solid var(--gold-dim);
          color: var(--gold-bright);
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: 0.3px;
          padding: 12px 20px;
          border-radius: 8px;
          cursor: pointer;
          transition: all .25s ease;
          text-decoration: none;
        }

        #screen-landing .btn:hover {
          background: var(--gold-bright);
          color: #16130c;
          border-color: var(--gold-bright);
        }

        #screen-landing .btn svg { 
          width: 14px; 
          height: 14px; 
          transition: transform .25s ease; 
        }

        #screen-landing .btn:hover svg { 
          transform: translateX(3px); 
        }

        /* ---------- ICON STRIP ---------- */
        #screen-landing .strip {
          position: relative; 
          z-index: 3;
          max-width: 1040px;
          margin: 46px auto 0;
          border: 1px solid rgba(42,36,25, 0.5);
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 22px 0;
          background: rgba(21, 19, 14, 0.5);
        }

        @keyframes floatPulse {
          0% { transform: translateY(0px); opacity: 0.85; }
          50% { transform: translateY(-3px); opacity: 1; filter: drop-shadow(0 2px 10px rgba(217,178,106,0.3)); }
          100% { transform: translateY(0px); opacity: 0.85; }
        }

        #screen-landing .strip .item {
          display: flex; 
          align-items: center; 
          justify-content: center;
          color: var(--gold);
          opacity: 0.85;
          position: relative;
          width: 25%;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        #screen-landing .strip .item:hover {
          opacity: 1;
          color: var(--gold-bright);
          transform: translateY(-5px) scale(1.1);
          filter: drop-shadow(0 5px 15px rgba(240,207,142,0.4));
        }

        #screen-landing .strip .item svg {
          animation: floatPulse 3s infinite ease-in-out;
        }

        #screen-landing .strip .item:nth-child(1) svg { animation-delay: 0s; }
        #screen-landing .strip .item:nth-child(2) svg { animation-delay: 0.75s; }
        #screen-landing .strip .item:nth-child(3) svg { animation-delay: 1.5s; }
        #screen-landing .strip .item:nth-child(4) svg { animation-delay: 2.25s; }

        #screen-landing .strip .item:not(:last-child)::after {
          content: "";
          position: absolute; 
          right: 0; 
          top: 50%; 
          transform: translateY(-50%);
          width: 1px; 
          height: 26px;
          background: rgba(42,36,25, 0.5);
        }

        #screen-landing .strip svg { 
          width: 26px; 
          height: 26px; 
        }

        @media (max-width: 980px) {
          #screen-landing .wrap { padding: 22px 18px 40px; }
          #screen-landing .gallery-field { min-height: 0; }
          #screen-landing .tile { display: none; }
          #screen-landing .hero { margin-top: 40px; }
          #screen-landing h1 { font-size: 42px; }
          #screen-landing .cards { grid-template-columns: 1fr; }
          #screen-landing .strip { flex-wrap: wrap; gap: 18px; border-radius: 24px; padding: 22px; }
          #screen-landing .strip .item { width: 40%; }
          #screen-landing .strip .item::after { display: none; }
        }
      `}</style>

      <Navbar />
      <PageBackground />

      <div className="wrap">
        <div className="gallery-field">
          {/* scattered gallery tiles */}
          <FloatingMedia />

          {/* Hero Section */}
          <Hero />

          {/* Central Model Cards */}
          <div className="cards">
            <ModelTypeCard
              type="video"
              tag="▸ VIDEO"
              title1="Find Your Perfect"
              title2="Video"
              title3="Model"
              description="Compare AI video generators by cost, quality & value."
              buttonText="Compare more AI video generation models"
              mediaUrl="/media/card-video/cardvideo.mp4"
            />
            <ModelTypeCard
              type="image"
              tag="▧ IMAGE"
              title1="Find Your Perfect"
              title2="Image"
              title3="Model"
              description="Discover the best AI image models for your creativity."
              buttonText="Compare more AI image generation models"
              mediaUrl="/media/card-imag/card-Image.png"
              bgClass="art island"
            />
          </div>

          {/* Bottom Icons Strip */}
          <PlaygroundStrip />
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <Link to="/" className="logo">
            <div className="logo-dot"></div>
            GenScope
          </Link>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">API Status</a>
          </div>
          <div className="footer-copy">
            © 2026 GenScope · Data last updated: Oct 24, 2025
          </div>
        </div>
      </footer>
    </div>
  );
}
