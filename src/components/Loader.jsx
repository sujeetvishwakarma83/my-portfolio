import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png';

const loadingPhrases = [
  { limit: 20, text: 'Initializing portfolio system...' },
  { limit: 45, text: 'Loading design tokens & fonts...' },
  { limit: 70, text: 'Rendering interactive 3D canvas...' },
  { limit: 90, text: 'Optimizing responsive layouts...' },
  { limit: 99, text: 'Polishing micro-interactions...' },
  { limit: 100, text: 'Ready! Welcome.' }
];

function Loader({ onFinished, darkMode }) {
  const [progress, setProgress] = useState(0);
  const [phrase, setPhrase] = useState('Initializing...');

  // Lock body scroll while loader is mounted
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Handle progress counter and simulation
  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      // Simulate real-world-like step increments
      const increment = Math.floor(Math.random() * 8) + 4; // Increments of 4-11%
      start += increment;
      if (start >= 100) {
        start = 100;
        clearInterval(interval);
        // Add a slight delay at 100% for user satisfaction before completing
        setTimeout(() => {
          onFinished();
        }, 700);
      }
      setProgress(start);
    }, 100);

    return () => clearInterval(interval);
  }, [onFinished]);

  // Update text phrase based on progress
  useEffect(() => {
    const currentPhrase = loadingPhrases.find(p => progress <= p.limit) || loadingPhrases[loadingPhrases.length - 1];
    setPhrase(currentPhrase.text);
  }, [progress]);

  // SVG Circle configuration for circular progress ring
  const radius = 90;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const activeColor = '#00f5a0'; // Neon green accent
  const baseColor = darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.05,
        filter: 'blur(10px)',
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: darkMode 
          ? 'radial-gradient(circle at center, #131320 0%, #08080c 100%)' 
          : 'radial-gradient(circle at center, #ffffff 0%, #f1f5f9 100%)',
        color: darkMode ? '#ffffff' : '#0f172a',
        fontFamily: '"Space Mono", monospace',
        overflow: 'hidden'
      }}
    >
      {/* Background ambient lighting */}
      <div 
        style={{
          position: 'absolute',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'rgba(0, 245, 160, 0.1)',
          filter: 'blur(80px)',
          top: '30%',
          left: '40%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(124, 58, 237, 0.1)',
          filter: 'blur(80px)',
          bottom: '20%',
          right: '30%',
          transform: 'translate(50%, 50%)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Logo & Ring Container */}
      <div style={{ position: 'relative', width: '220px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* SVG Circular Loader */}
        <svg 
          width="210" 
          height="210" 
          viewBox="0 0 200 200" 
          style={{ 
            position: 'absolute', 
            transform: 'rotate(-90deg)',
            filter: 'drop-shadow(0 0 8px rgba(0, 245, 160, 0.35))'
          }}
        >
          {/* Base track */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="transparent"
            stroke={baseColor}
            strokeWidth={strokeWidth}
          />
          {/* Active progress */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            fill="transparent"
            stroke="url(#progressGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.15s ease-out'
            }}
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#00f5a0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Pulsing Outer Dash Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
          style={{
            position: 'absolute',
            width: '206px',
            height: '206px',
            borderRadius: '50%',
            border: `1.5px dashed ${darkMode ? 'rgba(0, 245, 160, 0.25)' : 'rgba(0, 245, 160, 0.4)'}`,
            pointerEvents: 'none'
          }}
        />

        {/* Center Logo Container with Framer Motion Animation */}
        <motion.div
          animate={{
            scale: [1, 1.04, 1],
            boxShadow: [
              '0 0 20px rgba(0, 245, 160, 0.1)',
              '0 0 35px rgba(0, 245, 160, 0.25)',
              '0 0 20px rgba(0, 245, 160, 0.1)'
            ]
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: 'easeInOut'
          }}
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: darkMode ? '#111118' : '#ffffff',
            border: `2px solid ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
            zIndex: 10
          }}
        >
          <img
            src={logoImg}
            alt="Sujeet Vishwakarma Logo"
            style={{
              width: '82%',
              height: '82%',
              objectFit: 'contain',
              filter: darkMode 
                ? 'brightness(1.1) contrast(1.05) drop-shadow(0 0 6px rgba(0, 245, 160, 0.2))' 
                : 'none'
            }}
          />
        </motion.div>
      </div>

      {/* Progress & Log Text Container */}
      <div 
        style={{
          marginTop: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.6rem',
          zIndex: 10
        }}
      >
        {/* Glowing Percentage Counter */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: activeColor,
            textShadow: `0 0 15px rgba(0, 245, 160, 0.45)`,
            letterSpacing: '0.05em'
          }}
        >
          {progress}%
        </motion.div>

        {/* Phrase / Terminal log message */}
        <div 
          style={{
            fontSize: '0.75rem',
            color: darkMode ? '#94a3b8' : '#64748b',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            textAlign: 'center',
            minHeight: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}
        >
          <span style={{ color: activeColor, fontWeight: 700 }}>&gt;</span>
          <span>{phrase}</span>
          <span 
            style={{ 
              width: '6px', 
              height: '12px', 
              background: activeColor, 
              display: 'inline-block',
              animation: 'blink 0.8s infinite step-end' 
            }} 
          />
        </div>
      </div>

      {/* Inline styles for custom elements */}
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
}

export default Loader;
