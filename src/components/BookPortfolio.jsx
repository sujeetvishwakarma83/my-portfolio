import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Scroll, Mail, ExternalLink } from 'lucide-react';

// Import Adapted Sections
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Services from './Services';
import Testimonials from './Testimonials';
import Contact from './Contact';
import Education from './Education';
import coverPhoto from '../assets/photo.jpeg';

const GithubIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4" /><path d="M12 18v4" /></svg>
);

const LinkedinIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

// Bookmark Ribbon Tab config
const TABS = [
  { id: 0, label: 'Cover', sheetIdx: 0, leafFace: 'front' },
  { id: 1, label: 'Home', sheetIdx: 1, leafFace: 'front' },
  { id: 2, label: 'About', sheetIdx: 1, leafFace: 'back' },
  { id: 3, label: 'Journey', sheetIdx: 2, leafFace: 'back' },
  { id: 4, label: 'Projects', sheetIdx: 4, leafFace: 'back' },
  { id: 5, label: 'Services', sheetIdx: 6, leafFace: 'back' },
  { id: 6, label: 'Reviews', sheetIdx: 7, leafFace: 'front' },
  { id: 7, label: 'Contact', sheetIdx: 7, leafFace: 'back' },
];

function BookPortfolio({ darkMode, onToggleScrollMode }) {
  const [currentSheet, setCurrentSheet] = useState(0); // 0 = Cover, 1 = Hero/Intro, 2 = About Part 1/2, 3 = Skills/Edu 1, 4 = Edu 2/3, 5 = Projects 1-2, 6 = Projects 3-4, 7 = Services/Reviews, 8 = Contact/Ending, 9 = Motivation / Closed Back Cover
  const [flippingSheet, setFlippingSheet] = useState(null);
  const canvasRef = useRef(null);

  const totalSheets = 9; // Sheet 0 to 9

  // Floating particles particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    const particles = [];
    const maxParticles = 35;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.5 - 0.2, // always floating up
        alpha: Math.random() * 0.5 + 0.1,
        waveRange: Math.random() * 15 + 5,
        waveSpeed: Math.random() * 0.02 + 0.005,
        angle: Math.random() * Math.PI * 2
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.angle += p.waveSpeed;
        const xOffset = Math.sin(p.angle) * p.waveSpeed * p.waveRange;

        ctx.beginPath();
        ctx.arc(p.x + xOffset, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`; // gold accent floating particles
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#D4AF37';
        ctx.fill();

        p.y += p.vy;
        p.x += p.vx;

        // Reset if floated off top or sides
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
          p.alpha = Math.random() * 0.5 + 0.1;
        }
        if (p.x < 0 || p.x > canvas.width) {
          p.x = Math.random() * canvas.width;
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Play subtle page flip audio effect dynamically
  const playFlipSound = () => {
    try {
      const audio = new Audio('/page-flip.mp3');
      audio.volume = 0.45;
      audio.play().catch(err => console.log("Audio play blocked/failed:", err));
    } catch (e) {
      console.log("Audio play error:", e);
    }
  };

  // Keyboard navigation for turning pages
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSheet, flippingSheet]);

  // Sequential turning to support Ribbons Navigation (clicking jumps to sheet index)
  const turnToSheet = (targetSheet) => {
    if (targetSheet === currentSheet) return;

    // Disable inputs during flip sequence
    if (flippingSheet !== null) return;

    let step = currentSheet < targetSheet ? 1 : -1;
    let next = currentSheet + step;

    playFlipSound();
    setFlippingSheet(currentSheet < targetSheet ? currentSheet : next);
    setCurrentSheet(next);

    // If target is further, turn sequential sheets
    const timer = setInterval(() => {
      if (next === targetSheet) {
        clearInterval(timer);
        setFlippingSheet(null);
      } else {
        next += step;
        playFlipSound();
        setFlippingSheet(step > 0 ? next - 1 : next);
        setCurrentSheet(next);
      }
    }, 600); // matches the 3D transition duration
  };

  const handleNext = () => {
    if (currentSheet < totalSheets && flippingSheet === null) {
      playFlipSound();
      setFlippingSheet(currentSheet);
      setCurrentSheet(currentSheet + 1);
      setTimeout(() => setFlippingSheet(null), 600);
    }
  };

  const handlePrev = () => {
    if (currentSheet > 0 && flippingSheet === null) {
      playFlipSound();
      setFlippingSheet(currentSheet - 1);
      setCurrentSheet(currentSheet - 1);
      setTimeout(() => setFlippingSheet(null), 600);
    }
  };

  const isBookOpen = currentSheet > 0 && currentSheet < totalSheets;

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      background: 'radial-gradient(circle at center, #0F172A 0%, #030712 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      fontFamily: '"Inter", sans-serif',
      zIndex: 1000
    }}>

      {/* Desk ambient particles */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} />

      {/* Desk Ambient Lighting and Shadow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '1200px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.03) 0%, transparent 70%)',
        zIndex: 2,
        pointerEvents: 'none'
      }} />

      {/* Header controls inside Desk Layout */}
      <div style={{
        position: 'absolute',
        top: '2rem',
        left: '4rem',
        right: '4rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BookOpen size={24} color="#D4AF37" />
          <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.85rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Interactive Portfolio Book
          </span>
        </div>

        {/* Toggle layout mode */}
        <button
          onClick={onToggleScrollMode}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            color: '#D4AF37',
            padding: '0.6rem 1.2rem',
            borderRadius: '50px',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(212, 175, 55, 0.15)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.3)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          <Scroll size={14} />
          Switch to Scroll Mode
        </button>
      </div>

      {/* Ribbon Bookmark Tabs - Luxury ribbon menu on the right edge */}
      {isBookOpen && (
        <div style={{
          position: 'absolute',
          right: 'calc(50vw - 570px)',
          top: '180px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          zIndex: 90
        }}>
          {TABS.slice(1, 8).map((tab) => {
            const isJourneyActive = tab.label === 'Journey' && (currentSheet === 3 || currentSheet === 4);
            const isProjectsActive = tab.label === 'Projects' && (currentSheet === 5 || currentSheet === 6);
            const isActive = isJourneyActive || isProjectsActive ||
              (tab.label !== 'Journey' && tab.label !== 'Projects' && (
                (currentSheet === tab.sheetIdx && tab.leafFace === 'front') ||
                (currentSheet === tab.sheetIdx + 1 && tab.leafFace === 'back')
              ));
            return (
              <button
                key={tab.id}
                onClick={() => turnToSheet(tab.leafFace === 'front' ? tab.sheetIdx : tab.sheetIdx + 1)}
                style={{
                  position: 'relative',
                  width: '90px',
                  height: '34px',
                  background: isActive ? '#D4AF37' : 'rgba(21, 28, 44, 0.85)',
                  color: isActive ? '#000' : '#d1d5db',
                  border: isActive ? 'none' : '1px solid rgba(212, 175, 55, 0.4)',
                  borderLeft: 'none',
                  borderRadius: '0 8px 8px 0',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left',
                  paddingLeft: '12px',
                  boxShadow: isActive ? '0 4px 15px rgba(212, 175, 55, 0.4)' : '0 4px 10px rgba(0,0,0,0.3)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isActive ? 'translateX(10px)' : 'translateX(0)',
                  zIndex: isActive ? 10 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.transform = 'translateX(5px)';
                    e.currentTarget.style.color = '#D4AF37';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.color = '#d1d5db';
                  }
                }}
              >
                {/* Gold accent line inside ribbon */}
                <div style={{
                  position: 'absolute',
                  top: '10%',
                  bottom: '10%',
                  left: '4px',
                  width: '2px',
                  background: isActive ? '#000' : '#D4AF37'
                }} />
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      {/* 3D Perspective Book Container */}
      <div
        style={{
          position: 'relative',
          width: '980px',
          height: '680px',
          perspective: '2000px',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          // Shift book to right slightly when closed so front cover sits centered on desk
          transform: currentSheet === 0
            ? 'translateX(240px) translateY(15px)'
            : currentSheet === totalSheets
              ? 'translateX(-240px) translateY(15px)'
              : 'translateX(0) translateY(15px)'
        }}
      >
        {/* Under-book Desk Shadow */}
        <div style={{
          position: 'absolute',
          inset: '-10px -20px -30px -20px',
          background: 'rgba(0, 0, 0, 0.7)',
          filter: 'blur(30px)',
          borderRadius: '30px',
          transform: 'translateZ(-40px)',
          pointerEvents: 'none',
          zIndex: -2
        }} />

        {/* LEFT HARDCOVER (Revealed when book is open) */}
        <div style={{
          position: 'absolute',
          right: '50%',
          width: '490px',
          height: '690px',
          background: 'linear-gradient(135deg, #161d31 0%, #0d121f 100%)',
          borderRadius: '16px 0 0 16px',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          borderRight: 'none',
          boxShadow: '-10px 15px 35px rgba(0,0,0,0.6)',
          transformOrigin: 'right center',
          transform: currentSheet > 0 ? 'rotateY(-180deg)' : 'rotateY(0deg)',
          opacity: currentSheet > 0 ? 1 : 0,
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s',
          zIndex: 1,
          pointerEvents: currentSheet > 0 ? 'auto' : 'none'
        }}>
          {/* Cover Inner styling (felt/silk endpaper look) */}
          <div style={{
            position: 'absolute',
            inset: '8px',
            borderRadius: '12px 0 0 12px',
            border: '2px solid rgba(212, 175, 55, 0.2)',
            background: '#0c101c'
          }} />
        </div>

        {/* RIGHT HARDCOVER */}
        <div style={{
          position: 'absolute',
          left: '50%',
          width: '490px',
          height: '690px',
          background: 'linear-gradient(135deg, #161d31 0%, #0d121f 100%)',
          borderRadius: '0 16px 16px 0',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          borderLeft: 'none',
          boxShadow: '10px 15px 35px rgba(0,0,0,0.6)',
          transformOrigin: 'left center',
          transform: currentSheet < totalSheets ? 'rotateY(0deg)' : 'rotateY(180deg)',
          opacity: currentSheet < totalSheets ? 1 : 0,
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s',
          zIndex: 1,
          pointerEvents: currentSheet < totalSheets ? 'auto' : 'none'
        }}>
          <div style={{
            position: 'absolute',
            inset: '8px',
            borderRadius: '0 12px 12px 0',
            border: '2px solid rgba(212, 175, 55, 0.2)',
            background: '#0c101c'
          }} />
        </div>

        {/* CENTER SPINE (Grandy spine connector) */}
        {isBookOpen && (
          <div style={{
            position: 'absolute',
            top: '-5px',
            bottom: '-5px',
            width: '24px',
            zIndex: 100,
            background: 'linear-gradient(90deg, #090c13 0%, #1a233a 50%, #090c13 100%)',
            boxShadow: '0 0 15px rgba(0,0,0,0.8)',
            borderTop: '1px solid rgba(212, 175, 55, 0.4)',
            borderBottom: '1px solid rgba(212, 175, 55, 0.4)'
          }} />
        )}

        {/* ============================================================== */}
        {/* SHEET PAGES STACK */}
        {/* ============================================================== */}

        {/* SHEET 0 (Front Cover & Endpaper index) */}
        <div style={{
          position: 'absolute',
          left: '50%',
          width: '475px',
          height: '660px',
          transformStyle: 'preserve-3d',
          transformOrigin: 'left center',
          zIndex: currentSheet === 0 ? 50 : (flippingSheet === 0 ? 99 : (currentSheet < 0 ? 9 : 9)),
          transform: currentSheet > 0 ? 'rotateY(-180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          {/* SHEET 0 FRONT: Hardcover exterior */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, #1a2238 0%, #0d121f 100%)',
            borderRadius: '0 12px 12px 0',
            border: '1px solid rgba(212, 175, 55, 0.5)',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '3rem',
            textAlign: 'center',
            cursor: 'pointer'
          }}
            onClick={handleNext}
          >
            {/* Ornate Gold Frame */}
            <div style={{
              position: 'absolute',
              inset: '20px',
              border: '2px solid rgba(212, 175, 55, 0.4)',
              borderRadius: '8px',
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              inset: '26px',
              border: '1px dashed rgba(212, 175, 55, 0.2)',
              borderRadius: '6px',
              pointerEvents: 'none'
            }} />

            {/* Premium Photo Avatar inside Golden Frame with Glowing Aura */}
            <div style={{
              position: 'relative',
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              margin: '0 auto 1.5rem auto',
              padding: '4px',
              background: 'linear-gradient(135deg, #D4AF37 0%, #AA7C11 100%)',
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.4), inset 0 0 10px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 5
            }}>
              {/* Glowing outer aura */}
              <div style={{
                position: 'absolute',
                inset: '-6px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)',
                filter: 'blur(8px)',
                zIndex: -1,
                animation: 'pulse-ring 3s infinite alternate'
              }} />
              <img
                src={coverPhoto}
                alt="Sujeet Vishwakarma"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  border: '2px solid #0c101c'
                }}
              />
            </div>

            <h1 style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '2rem',
              fontWeight: 800,
              color: '#D4AF37',
              margin: '0 0 1rem 0',
              letterSpacing: '0.05em',
              lineHeight: 1.2
            }}>
              SUJEET VISHWAKARMA
            </h1>

            <div style={{
              width: '60px',
              height: '2px',
              background: '#D4AF37',
              margin: '1rem 0 1.5rem 0'
            }} />

            <p style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.85rem',
              letterSpacing: '0.25em',
              color: '#a1a1aa',
              textTransform: 'uppercase',
              margin: 0
            }}>
              Developer Portfolio
            </p>

            <span style={{
              position: 'absolute',
              bottom: '3rem',
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.75rem',
              color: '#D4AF37',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              animation: 'float-slow 2s infinite'
            }}>
              Click Cover to Open <ChevronRight size={14} />
            </span>
          </div>

          {/* SHEET 0 BACK: Welcome Endpaper & Table of Contents */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: '#0c101c',
            borderRadius: '12px 0 0 12px',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxSizing: 'border-box',
            padding: '3rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40px', background: 'linear-gradient(-90deg, rgba(0,0,0,0.5) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '30px', background: 'linear-gradient(135deg, rgba(212,175,55,0.05) 0%, rgba(0,0,0,0.4) 100%)', clipPath: 'polygon(0 0, 100% 100%, 0 100%)', zIndex: 20 }} />

            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.75rem',
              color: '#D4AF37',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              borderBottom: '1px solid rgba(212,175,55,0.2)',
              paddingBottom: '0.5rem'
            }}>
              Intro // Endpaper
            </div>

            <h2 style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '1.6rem',
              fontWeight: 800,
              color: '#fff',
              margin: '0 0 1.5rem 0'
            }}>
              Index of Contents
            </h2>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginTop: '1rem'
            }}>
              {TABS.slice(1, 8).map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => turnToSheet(tab.leafFace === 'front' ? tab.sheetIdx : tab.sheetIdx + 1)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.85rem',
                    color: '#d1d5db',
                    cursor: 'pointer',
                    paddingBottom: '4px',
                    borderBottom: '1px dotted rgba(255,255,255,0.1)',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#D4AF37'; e.currentTarget.style.paddingLeft = '5px'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#d1d5db'; e.currentTarget.style.paddingLeft = '0'; }}
                >
                  <span>{tab.label}</span>
                  <span style={{ color: '#D4AF37' }}>0{tab.id}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'auto', fontSize: '0.75rem', color: '#6b7280', fontFamily: '"Space Mono", monospace', lineHeight: 1.5 }}>
              * Use the ribbons menu on the right edge or bottom arrow keys to flip sheets.
            </div>
          </div>
        </div>

        {/* SHEET 1 (Hero/Home & About Part 1) */}
        <div style={{
          position: 'absolute',
          left: '50%',
          width: '475px',
          height: '660px',
          transformStyle: 'preserve-3d',
          transformOrigin: 'left center',
          zIndex: currentSheet === 1 ? 50 : (flippingSheet === 1 ? 99 : (currentSheet < 1 ? 8 : 10)),
          transform: currentSheet > 1 ? 'rotateY(-180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          {/* SHEET 1 FRONT: Hero / Home */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            background: '#0c101c',
            borderRadius: '0 12px 12px 0',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '40px', background: 'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '30px', height: '30px', background: 'linear-gradient(-135deg, rgba(212,175,55,0.05) 0%, rgba(0,0,0,0.4) 100%)', clipPath: 'polygon(100% 0, 100% 100%, 0 100%)', zIndex: 20 }} />

            <Hero darkMode={darkMode} bookMode={true} />
          </div>

          {/* SHEET 1 BACK: About Part 1 */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: '#0c101c',
            borderRadius: '12px 0 0 12px',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40px', background: 'linear-gradient(-90deg, rgba(0,0,0,0.5) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '30px', background: 'linear-gradient(135deg, rgba(212,175,55,0.05) 0%, rgba(0,0,0,0.4) 100%)', clipPath: 'polygon(0 0, 100% 100%, 0 100%)', zIndex: 20 }} />

            <About darkMode={darkMode} bookMode={true} aboutPart={1} />
          </div>
        </div>

        {/* SHEET 2 (About Part 2 & Skills) */}
        <div style={{
          position: 'absolute',
          left: '50%',
          width: '475px',
          height: '660px',
          transformStyle: 'preserve-3d',
          transformOrigin: 'left center',
          zIndex: currentSheet === 2 ? 50 : (flippingSheet === 2 ? 99 : (currentSheet < 2 ? 7 : 11)),
          transform: currentSheet > 2 ? 'rotateY(-180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          {/* SHEET 2 FRONT: About Part 2 */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            background: '#0c101c',
            borderRadius: '0 12px 12px 0',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '40px', background: 'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '30px', height: '30px', background: 'linear-gradient(-135deg, rgba(212,175,55,0.05) 0%, rgba(0,0,0,0.4) 100%)', clipPath: 'polygon(100% 0, 100% 100%, 0 100%)', zIndex: 20 }} />

            <About darkMode={darkMode} bookMode={true} aboutPart={2} />
          </div>

          {/* SHEET 2 BACK: Skills */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: '#0c101c',
            borderRadius: '12px 0 0 12px',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40px', background: 'linear-gradient(-90deg, rgba(0,0,0,0.5) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '30px', background: 'linear-gradient(135deg, rgba(212,175,55,0.05) 0%, rgba(0,0,0,0.4) 100%)', clipPath: 'polygon(0 0, 100% 100%, 0 100%)', zIndex: 20 }} />

            <Skills darkMode={darkMode} bookMode={true} />
          </div>
        </div>

        {/* SHEET 3 (Education Item 1 & Education Item 2) */}
        <div style={{
          position: 'absolute',
          left: '50%',
          width: '475px',
          height: '660px',
          transformStyle: 'preserve-3d',
          transformOrigin: 'left center',
          zIndex: currentSheet === 3 ? 50 : (flippingSheet === 3 ? 99 : (currentSheet < 3 ? 6 : 12)),
          transform: currentSheet > 3 ? 'rotateY(-180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          {/* SHEET 3 FRONT: Education Item 1 */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            background: '#0c101c',
            borderRadius: '0 12px 12px 0',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '40px', background: 'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '30px', height: '30px', background: 'linear-gradient(-135deg, rgba(212,175,55,0.05) 0%, rgba(0,0,0,0.4) 100%)', clipPath: 'polygon(100% 0, 100% 100%, 0 100%)', zIndex: 20 }} />

            <Education darkMode={darkMode} bookMode={true} itemIndex={0} />
          </div>

          {/* SHEET 3 BACK: Education Item 2 */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: '#0c101c',
            borderRadius: '12px 0 0 12px',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40px', background: 'linear-gradient(-90deg, rgba(0,0,0,0.5) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '30px', background: 'linear-gradient(135deg, rgba(212,175,55,0.05) 0%, rgba(0,0,0,0.4) 100%)', clipPath: 'polygon(0 0, 100% 100%, 0 100%)', zIndex: 20 }} />

            <Education darkMode={darkMode} bookMode={true} itemIndex={1} />
          </div>
        </div>

        {/* SHEET 4 (Education Item 3 & Project 1) */}
        <div style={{
          position: 'absolute',
          left: '50%',
          width: '475px',
          height: '660px',
          transformStyle: 'preserve-3d',
          transformOrigin: 'left center',
          zIndex: currentSheet === 4 ? 50 : (flippingSheet === 4 ? 99 : (currentSheet < 4 ? 5 : 13)),
          transform: currentSheet > 4 ? 'rotateY(-180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          {/* SHEET 4 FRONT: Education Item 3 */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            background: '#0c101c',
            borderRadius: '0 12px 12px 0',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '40px', background: 'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '30px', height: '30px', background: 'linear-gradient(-135deg, rgba(212,175,55,0.05) 0%, rgba(0,0,0,0.4) 100%)', clipPath: 'polygon(100% 0, 100% 100%, 0 100%)', zIndex: 20 }} />

            <Education darkMode={darkMode} bookMode={true} itemIndex={2} />
          </div>

          {/* SHEET 4 BACK: Project 1 */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: '#0c101c',
            borderRadius: '12px 0 0 12px',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40px', background: 'linear-gradient(-90deg, rgba(0,0,0,0.5) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '30px', background: 'linear-gradient(135deg, rgba(212,175,55,0.05) 0%, rgba(0,0,0,0.4) 100%)', clipPath: 'polygon(0 0, 100% 100%, 0 100%)', zIndex: 20 }} />

            <Projects darkMode={darkMode} bookMode={true} projectIndex={0} />
          </div>
        </div>

        {/* SHEET 5 (Project 2 & Project 3) */}
        <div style={{
          position: 'absolute',
          left: '50%',
          width: '475px',
          height: '660px',
          transformStyle: 'preserve-3d',
          transformOrigin: 'left center',
          zIndex: currentSheet === 5 ? 50 : (flippingSheet === 5 ? 99 : (currentSheet < 5 ? 4 : 14)),
          transform: currentSheet > 5 ? 'rotateY(-180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          {/* SHEET 5 FRONT: Project 2 */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            background: '#0c101c',
            borderRadius: '0 12px 12px 0',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '40px', background: 'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '30px', height: '30px', background: 'linear-gradient(-135deg, rgba(212,175,55,0.05) 0%, rgba(0,0,0,0.4) 100%)', clipPath: 'polygon(100% 0, 100% 100%, 0 100%)', zIndex: 20 }} />

            <Projects darkMode={darkMode} bookMode={true} projectIndex={1} />
          </div>

          {/* SHEET 5 BACK: Project 3 */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: '#0c101c',
            borderRadius: '12px 0 0 12px',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40px', background: 'linear-gradient(-90deg, rgba(0,0,0,0.5) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '30px', background: 'linear-gradient(135deg, rgba(212,175,55,0.05) 0%, rgba(0,0,0,0.4) 100%)', clipPath: 'polygon(0 0, 100% 100%, 0 100%)', zIndex: 20 }} />

            <Projects darkMode={darkMode} bookMode={true} projectIndex={2} />
          </div>
        </div>

        {/* SHEET 6 (Project 4 & Services) */}
        <div style={{
          position: 'absolute',
          left: '50%',
          width: '475px',
          height: '660px',
          transformStyle: 'preserve-3d',
          transformOrigin: 'left center',
          zIndex: currentSheet === 6 ? 50 : (flippingSheet === 6 ? 99 : (currentSheet < 6 ? 3 : 15)),
          transform: currentSheet > 6 ? 'rotateY(-180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          {/* SHEET 6 FRONT: Project 4 */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            background: '#0c101c',
            borderRadius: '0 12px 12px 0',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '40px', background: 'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '30px', height: '30px', background: 'linear-gradient(-135deg, rgba(212,175,55,0.05) 0%, rgba(0,0,0,0.4) 100%)', clipPath: 'polygon(100% 0, 100% 100%, 0 100%)', zIndex: 20 }} />

            <Projects darkMode={darkMode} bookMode={true} projectIndex={3} />
          </div>

          {/* SHEET 6 BACK: Services */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: '#0c101c',
            borderRadius: '12px 0 0 12px',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40px', background: 'linear-gradient(-90deg, rgba(0,0,0,0.5) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '30px', background: 'linear-gradient(135deg, rgba(212,175,55,0.05) 0%, rgba(0,0,0,0.4) 100%)', clipPath: 'polygon(0 0, 100% 100%, 0 100%)', zIndex: 20 }} />

            <Services darkMode={darkMode} bookMode={true} />
          </div>
        </div>

        {/* SHEET 7 (Testimonials & Contact) */}
        <div style={{
          position: 'absolute',
          left: '50%',
          width: '475px',
          height: '660px',
          transformStyle: 'preserve-3d',
          transformOrigin: 'left center',
          zIndex: currentSheet === 7 ? 50 : (flippingSheet === 7 ? 99 : (currentSheet < 7 ? 2 : 16)),
          transform: currentSheet > 7 ? 'rotateY(-180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          {/* SHEET 7 FRONT: Testimonials */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            background: '#0c101c',
            borderRadius: '0 12px 12px 0',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '40px', background: 'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '30px', height: '30px', background: 'linear-gradient(-135deg, rgba(212,175,55,0.05) 0%, rgba(0,0,0,0.4) 100%)', clipPath: 'polygon(100% 0, 100% 100%, 0 100%)', zIndex: 20 }} />

            <Testimonials darkMode={darkMode} bookMode={true} />
          </div>

          {/* SHEET 7 BACK: Contact */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: '#0c101c',
            borderRadius: '12px 0 0 12px',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40px', background: 'linear-gradient(-90deg, rgba(0,0,0,0.5) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '30px', background: 'linear-gradient(135deg, rgba(212,175,55,0.05) 0%, rgba(0,0,0,0.4) 100%)', clipPath: 'polygon(0 0, 100% 100%, 0 100%)', zIndex: 20 }} />

            <Contact darkMode={darkMode} bookMode={true} />
          </div>
        </div>

        {/* SHEET 8 (Inside Back Cover & Motivation quote page) */}
        <div style={{
          position: 'absolute',
          left: '50%',
          width: '475px',
          height: '660px',
          transformStyle: 'preserve-3d',
          transformOrigin: 'left center',
          zIndex: currentSheet === 8 ? 50 : (flippingSheet === 8 ? 99 : (currentSheet < 8 ? 2 : 18)),
          transform: currentSheet > 8 ? 'rotateY(-180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          {/* SHEET 8 FRONT: Inside Back Cover / Ending Page */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, #0c101c 0%, #060810 100%)',
            borderRadius: '0 12px 12px 0',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxSizing: 'border-box',
            padding: '2.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '40px', background: 'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '30px', height: '30px', background: 'linear-gradient(-135deg, rgba(212,175,55,0.05) 0%, rgba(0,0,0,0.4) 100%)', clipPath: 'polygon(100% 0, 100% 100%, 0 100%)', zIndex: 20 }} />

            <div style={{
              position: 'absolute',
              inset: '16px',
              border: '2px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '8px',
              pointerEvents: 'none'
            }} />

            {/* Glowing background circles for visual premium depth */}
            <div style={{
              position: 'absolute',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(0, 245, 160, 0.05) 0%, transparent 70%)',
              filter: 'blur(30px)',
              pointerEvents: 'none',
              zIndex: 1
            }} />

            <style>{`
              @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.4; }
              }
              .footer-social-btn:hover {
                transform: translateY(-3px) scale(1.1);
                border-color: #00F5A0 !important;
                color: #00F5A0 !important;
                background: rgba(0,245,160,0.05) !important;
              }
              .footer-cta-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px -5px #00F5A0;
              }
            `}</style>

            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.7rem',
                color: '#00F5A0',
                background: 'rgba(0, 245, 160, 0.08)',
                padding: '0.3rem 0.8rem',
                borderRadius: '50px',
                border: '1px solid rgba(0, 245, 160, 0.2)',
                marginBottom: '1rem',
                fontFamily: '"Space Mono", monospace',
                fontWeight: 600,
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#00F5A0',
                  boxShadow: '0 0 8px #00F5A0',
                  animation: 'pulse 2s infinite'
                }}></span>
                Available for Projects
              </div>

              <h2 style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: '#D4AF37',
                margin: '0 0 0.25rem 0',
                letterSpacing: '0.05em'
              }}>
                SUJEET VISHWAKARMA
              </h2>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.8rem',
                color: '#9ca3af',
                margin: '0 0 1.5rem 0',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                fontWeight: 600
              }}>
                Let's Build Something Legendary
              </p>

              <div style={{ width: '30px', height: '1px', background: 'rgba(212,175,55,0.4)', marginBottom: '1.5rem' }} />

              <p style={{
                fontSize: '0.8rem',
                color: '#d1d5db',
                lineHeight: 1.5,
                maxWidth: '280px',
                marginBottom: '1.5rem'
              }}>
                Got an idea or a project in mind? Let's collaborate to bring it to life with high performance and clean code.
              </p>

              {/* Direct Mail CTA Button */}
              <a
                href="mailto:sujeet.cabbagecode@gmail.com"
                className="footer-cta-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.8rem',
                  color: '#000',
                  background: '#00F5A0',
                  padding: '0.65rem 1.5rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  letterSpacing: '0.03em',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 15px -3px rgba(0, 245, 160, 0.4)',
                  marginBottom: '0.75rem'
                }}
              >
                <Mail size={14} />
                sujeet.cabbagecode@gmail.com
              </a>

              <a
                href="https://www.fiverr.com/sujeet83/"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.75rem',
                  color: '#9ca3af',
                  textDecoration: 'underline',
                  marginBottom: '1.5rem',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#00F5A0'}
                onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
              >
                Hire on Fiverr
              </a>

              {/* Social Links Row */}
              <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '2rem' }}>
                {[
                  { icon: <GithubIcon size={16} />, href: 'https://github.com/sujeetvishwakarma83', label: 'GitHub' },
                  { icon: <LinkedinIcon size={16} />, href: 'https://www.linkedin.com/in/sujeet-vishwakarma-a19b2323a/', label: 'LinkedIn' },
                  { icon: <Mail size={16} />, href: 'mailto:sujeet.cabbagecode@gmail.com', label: 'Email' }
                ].map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-btn"
                    title={link.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '34px',
                      height: '34px',
                      color: '#D4AF37',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.02)',
                      transition: 'all 0.3s',
                    }}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>

              {/* Copyright & Back button */}
              <p style={{ fontSize: '0.65rem', color: '#6b7280', fontFamily: '"Space Mono", monospace', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                © 2026 Sujeet Vishwakarma. All Rights Reserved.
              </p>

              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.7rem',
                  color: '#D4AF37',
                  letterSpacing: '0.1em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = '#D4AF37'}
              >
                <ChevronLeft size={12} /> Turn Back
              </span>

            </div>
          </div>

          {/* SHEET 8 BACK: Motivation Quote Page */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: '#0c101c',
            borderRadius: '12px 0 0 12px',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxSizing: 'border-box',
            padding: '3.5rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40px', background: 'linear-gradient(-90deg, rgba(0,0,0,0.5) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 10 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '30px', background: 'linear-gradient(135deg, rgba(212,175,55,0.05) 0%, rgba(0,0,0,0.4) 100%)', clipPath: 'polygon(0 0, 100% 100%, 0 100%)', zIndex: 20 }} />

            <div style={{
              position: 'absolute',
              inset: '16px',
              border: '1px solid rgba(212, 175, 55, 0.15)',
              borderRadius: '8px',
              pointerEvents: 'none'
            }} />

            {/* Glowing quote icon */}
            <div style={{
              fontSize: '3rem',
              color: '#D4AF37',
              fontFamily: 'serif',
              lineHeight: 1,
              marginBottom: '2.2rem',
              textShadow: '0 0 10px rgba(212, 175, 55, 0.3)'
            }}>
              “
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              maxWidth: '325px',
              zIndex: 5
            }}>
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.85rem',
                color: '#fff',
                lineHeight: 1.6,
                margin: 0,
                letterSpacing: '0.02em'
              }}>
                Every great business starts with a bold idea.
              </p>
              
              <div style={{ width: '40px', height: '1px', background: 'rgba(212, 175, 55, 0.2)', margin: '0 auto' }} />

              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.85rem',
                color: '#fff',
                lineHeight: 1.6,
                margin: 0,
                letterSpacing: '0.02em'
              }}>
                Every successful website begins with a single decision.
              </p>

              <div style={{ width: '40px', height: '1px', background: 'rgba(212, 175, 55, 0.2)', margin: '0 auto' }} />

              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.85rem',
                color: '#00F5A0',
                lineHeight: 1.6,
                margin: 0,
                fontWeight: 700,
                letterSpacing: '0.02em'
              }}>
                Let's transform your vision into a powerful digital experience.
              </p>

              <div style={{ width: '40px', height: '1px', background: 'rgba(212, 175, 55, 0.2)', margin: '0 auto' }} />

              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.85rem',
                color: '#fff',
                lineHeight: 1.6,
                margin: 0,
                letterSpacing: '0.02em'
              }}>
                The next success story could be yours.
              </p>
            </div>

            <div style={{
              fontSize: '3rem',
              color: '#D4AF37',
              fontFamily: 'serif',
              lineHeight: 1,
              marginTop: '2.2rem',
              textShadow: '0 0 10px rgba(212, 175, 55, 0.3)'
            }}>
              ”
            </div>
          </div>
        </div>

        {/* SHEET 9 (Closed Back Cover Outer) */}
        <div style={{
          position: 'absolute',
          left: '50%',
          width: '475px',
          height: '660px',
          transformStyle: 'preserve-3d',
          transformOrigin: 'left center',
          zIndex: currentSheet === 9 ? 50 : (flippingSheet === 9 ? 99 : (currentSheet < 9 ? 1 : 19)),
          transform: currentSheet > 9 ? 'rotateY(-180deg)' : 'rotateY(0deg)',
          opacity: currentSheet === 9 ? 1 : 0,
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s',
          pointerEvents: currentSheet === 9 ? 'auto' : 'none'
        }}>
          {/* SHEET 9 FRONT: Hardcover exterior back with full page photo overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            borderRadius: '0 12px 12px 0',
            border: '1px solid rgba(212, 175, 55, 0.5)',
            boxSizing: 'border-box',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}
          onClick={handlePrev}
          >
            {/* Full Page Photo */}
            <img 
              src={coverPhoto} 
              alt="Sujeet Vishwakarma Back Cover" 
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 1
              }}
            />

            {/* Dark vignette overlay for readability */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(12, 16, 28, 0.65) 0%, rgba(6, 8, 16, 0.9) 100%)',
              zIndex: 2
            }} />

            <div style={{
              position: 'absolute',
              inset: '20px',
              border: '2px solid rgba(212, 175, 55, 0.4)',
              borderRadius: '8px',
              pointerEvents: 'none',
              zIndex: 3
            }} />

            {/* Text Overlay */}
            <div style={{ position: 'relative', zIndex: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <h3 style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '1.6rem',
                fontWeight: 800,
                color: '#D4AF37',
                marginBottom: '1rem',
                letterSpacing: '0.15em',
                textShadow: '0 4px 15px rgba(0,0,0,0.8)'
              }}>
                THE END
              </h3>
              
              <div style={{ width: '40px', height: '2px', background: '#D4AF37', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }} />
              
              <p style={{ 
                fontSize: '0.85rem', 
                color: '#e4e4e7', 
                fontFamily: '"Space Mono", monospace',
                margin: 0,
                letterSpacing: '0.05em',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)'
              }}>
                Jaunpur, India // 2026
              </p>
            </div>

            <span style={{
              position: 'absolute',
              bottom: '3rem',
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.75rem',
              color: '#D4AF37',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              zIndex: 4,
              textShadow: '0 2px 8px rgba(0,0,0,0.8)'
            }}>
              <ChevronLeft size={14} /> Open Book Again
            </span>
          </div>

          {/* SHEET 9 BACK: hardcover back exterior */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, #1a2238 0%, #0d121f 100%)',
            borderRadius: '12px 0 0 12px',
            border: '1px solid rgba(212, 175, 55, 0.5)',
            boxSizing: 'border-box'
          }} />
        </div>

      </div>

      {/* Under-book Desk Controls (Prev/Next Page arrows) */}
      <div style={{
        position: 'absolute',
        bottom: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        zIndex: 100
      }}>
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentSheet === 0 || flippingSheet !== null}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            color: '#D4AF37',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: (currentSheet === 0 || flippingSheet !== null) ? 'not-allowed' : 'pointer',
            opacity: (currentSheet === 0) ? 0.3 : 1,
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => { if (currentSheet > 0 && flippingSheet === null) { e.currentTarget.style.background = 'rgba(212, 175, 55, 0.15)'; e.currentTarget.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.3)'; } }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Dynamic Page indicator text */}
        <div style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.8rem',
          fontWeight: 700,
          color: '#D4AF37',
          letterSpacing: '0.15em',
          textTransform: 'uppercase'
        }}>
          {currentSheet === 0
            ? 'Cover Page'
            : currentSheet === 9
              ? 'Back Cover'
              : currentSheet === 1
                ? 'Index / Intro'
                : currentSheet === 2
                  ? 'About Me'
                  : currentSheet === 3
                    ? 'Skills / Journey'
                    : currentSheet === 4
                      ? 'Journey'
                      : currentSheet === 5
                        ? 'Projects 01 - 02'
                        : currentSheet === 6
                          ? 'Projects 03 - 04'
                          : currentSheet === 7
                            ? 'Services / Reviews'
                            : currentSheet === 8
                              ? 'Contact / Ending'
                              : `Sheet 0${currentSheet} / 0${totalSheets - 1}`}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentSheet === totalSheets || flippingSheet !== null}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            color: '#D4AF37',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: (currentSheet === totalSheets || flippingSheet !== null) ? 'not-allowed' : 'pointer',
            opacity: (currentSheet === totalSheets) ? 0.3 : 1,
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => { if (currentSheet < totalSheets && flippingSheet === null) { e.currentTarget.style.background = 'rgba(212, 175, 55, 0.15)'; e.currentTarget.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.3)'; } }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Embedded CSS scrollbars & curls styling */}
      <style>{`
        .book-page-content::-webkit-scrollbar {
          width: 5px;
        }
        .book-page-content::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 4px;
        }
        .book-page-content::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.25);
          border-radius: 4px;
        }
        .book-page-content::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.45);
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(212, 175, 55, 0); }
          100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
        }
      `}</style>

    </div>
  );
}

export default BookPortfolio;
