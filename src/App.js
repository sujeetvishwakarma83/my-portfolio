import { useState, useEffect } from 'react';
import './App.css';
import CustomCursor from './components/CustomCursor';
import ShareButton from './components/ShareButton';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  var [darkMode, setDarkMode] = useState(true);
  var [showTop, setShowTop] = useState(false);
  var [hovered, setHovered] = useState(false);

  useEffect(function() {
    var handleScroll = function() {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return function() { window.removeEventListener('scroll', handleScroll); };
  }, []);

  var scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App" style={{
      background: darkMode ? '#0a0a0f' : '#f5f5f0',
      color: darkMode ? '#e8e8f0' : '#1a1a2e',
      minHeight: '100vh',
      transition: 'background 0.3s, color 0.3s'
    }}>

      {/* Custom cursor with bubbles */}
      <CustomCursor />

      {/* Share button — right side middle */}
      <ShareButton darkMode={darkMode} />

      {/* All sections */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero darkMode={darkMode} />
      <About darkMode={darkMode} />
      <Skills darkMode={darkMode} />
      <Projects darkMode={darkMode} />
      <Contact darkMode={darkMode} />
      <Footer darkMode={darkMode} />

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        onMouseEnter={function() { setHovered(true); }}
        onMouseLeave={function() { setHovered(false); }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: hovered ? '#00f5a0' : 'transparent',
          border: '1px solid ' + (hovered ? '#00f5a0' : 'rgba(0,245,160,0.4)'),
          color: hovered ? '#000' : '#00f5a0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 999,
          opacity: showTop ? 1 : 0,
          transform: showTop ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
          transition: 'all 0.3s ease',
          boxShadow: hovered ? '0 0 20px rgba(0,245,160,0.4)' : 'none',
          pointerEvents: showTop ? 'auto' : 'none',
        }}
      >
        <svg
          width="20" height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

    </div>
  );
}

export default App;