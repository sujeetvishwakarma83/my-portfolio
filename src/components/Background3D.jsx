import React from 'react';

function Background3D({ darkMode }) {
  // Styles for the background container
  const containerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: -1,
    overflow: 'hidden',
    background: darkMode ? '#030712' : '#F8FAFC',
    transition: 'background 0.3s ease',
    pointerEvents: 'none'
  };

  // Styles for the grid pattern
  const gridStyle = {
    position: 'absolute',
    inset: 0,
    opacity: 0.8,
    backgroundImage: darkMode
      ? 'linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)'
      : 'linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)',
    backgroundSize: '60px 60px',
    maskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 85%)',
    WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 85%)'
  };

  // Styles for the floating blurred blobs
  const blob1Style = {
    position: 'absolute',
    top: '10%',
    left: '15%',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: darkMode 
      ? 'radial-gradient(circle, rgba(0, 245, 160, 0.045) 0%, transparent 70%)'
      : 'radial-gradient(circle, rgba(124, 58, 237, 0.03) 0%, transparent 70%)',
    filter: 'blur(60px)',
    animation: 'moveBlob1 25s infinite alternate ease-in-out',
    pointerEvents: 'none'
  };

  const blob2Style = {
    position: 'absolute',
    bottom: '15%',
    right: '10%',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: darkMode 
      ? 'radial-gradient(circle, rgba(212, 175, 55, 0.035) 0%, transparent 70%)'
      : 'radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 70%)',
    filter: 'blur(70px)',
    animation: 'moveBlob2 30s infinite alternate ease-in-out',
    pointerEvents: 'none'
  };

  return (
    <div style={containerStyle}>
      {/* Subtle Dev Grid */}
      <div style={gridStyle} />

      {/* Floating Ambient Glowing Blobs */}
      <div style={blob1Style} />
      <div style={blob2Style} />

      {/* Inline styles for keyframe animations */}
      <style>{`
        @keyframes moveBlob1 {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          50% {
            transform: translate(100px, 80px) scale(1.15);
          }
          100% {
            transform: translate(-50px, 120px) scale(0.9);
          }
        }
        @keyframes moveBlob2 {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          50% {
            transform: translate(-120px, -60px) scale(0.85);
          }
          100% {
            transform: translate(80px, -100px) scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}

export default Background3D;
