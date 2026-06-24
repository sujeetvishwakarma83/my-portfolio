import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // ✅ Naya import Modal Animation ke liye
import './App.css';

import profilePic from './assets/profile.jpg'; // ✅ DP Popup ke liye import kiya

import CustomCursor from './components/CustomCursor';
import ShareButton from './components/ShareButton';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import WhyHireMe from './components/WhyHireMe';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Background3D from './components/Background3D';

import BookPortfolio from './components/BookPortfolio';
import Testimonials from './components/Testimonials';
import Loader from './components/Loader';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [showTop, setShowTop] = useState(false);
  const [hovered, setHovered] = useState(false);
  
  // ✅ MODAL STATE: Profile DP popup ke liye
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Toggle Scroll vs Book Mode
  const [scrollMode, setScrollMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [photoState, setPhotoState] = useState('hero'); // 'hero', 'animating', 'about'
  const coordsRef = useRef({ hero: null, about: null, endScroll: null });

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // ✅ EVENT LISTENER: Navbar se signal sunne ke liye
  useEffect(() => {
    const openModal = () => setShowProfileModal(true);
    window.addEventListener('open-profile-modal', openModal);
    return () => window.removeEventListener('open-profile-modal', openModal);
  }, []);

  // Scroll animation coordinator for the profile photo
  useEffect(() => {
    if (!scrollMode || isLoading) return;

    let ticked = false;
    const handleScroll = () => {
      if (!ticked) {
        requestAnimationFrame(() => {
          const S = window.scrollY || document.documentElement.scrollTop;

          const heroEl = document.getElementById('hero-photo-placeholder');
          const aboutEl = document.getElementById('about-photo-placeholder');
          
          if (!heroEl || !aboutEl) {
            ticked = false;
            return;
          }

          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

          const heroRect = heroEl.getBoundingClientRect();
          const aboutRect = aboutEl.getBoundingClientRect();

          const hero = {
            top: heroRect.top + scrollTop,
            left: heroRect.left + scrollLeft,
            width: heroRect.width,
            height: heroRect.height,
          };

          const about = {
            top: aboutRect.top + scrollTop,
            left: aboutRect.left + scrollLeft,
            width: aboutRect.width,
            height: aboutRect.height,
          };

          // Calculate center scroll positions
          const S_hero_center = Math.max(0, hero.top - (window.innerHeight - hero.height) / 2);
          const S_about_center = about.top - (window.innerHeight - about.height) / 2;
          const range = S_about_center - S_hero_center;

          const floatEl = document.getElementById('floating-scroll-photo');

          if (range <= 0 || S <= 0 || S <= S_hero_center) {
            setPhotoState('hero');
            if (floatEl) floatEl.style.display = 'none';
          } else if (S >= S_about_center) {
            setPhotoState('about');
            if (floatEl) floatEl.style.display = 'none';
          } else {
            setPhotoState('animating');
            const percent = Math.min(Math.max((S - S_hero_center) / range, 0), 1);

            const top = hero.top + (about.top - hero.top) * percent;
            const left = hero.left + (about.left - hero.left) * percent;
            const width = hero.width + (about.width - hero.width) * percent;
            const height = hero.height + (about.height - hero.height) * percent;
            
            // Interpolate border-radius from circle (width/2) to rectangle (16px)
            const radius = (hero.width / 2) + (16 - (hero.width / 2)) * percent;
            
            // Interpolate border
            const borderWidth = 4 + (1 - 4) * percent;
            const borderOpacity = 0.08 + (0.05 - 0.08) * percent;
            const borderColor = darkMode 
              ? `rgba(255, 255, 255, ${borderOpacity})` 
              : `rgba(0, 0, 0, ${borderOpacity})`;

            // Interpolate shadow
            const shadowOpacity = 0.5 * (1 - percent);

            if (floatEl) {
              floatEl.style.display = 'block';
              floatEl.style.top = `${top}px`;
              floatEl.style.left = `${left}px`;
              floatEl.style.width = `${width}px`;
              floatEl.style.height = `${height}px`;
              floatEl.style.borderRadius = `${radius}px`;
              floatEl.style.border = `${borderWidth}px solid ${borderColor}`;
              floatEl.style.boxShadow = `0 ${20 * (1 - percent)}px ${45 * (1 - percent)}px -${10 * (1 - percent)}px rgba(0,0,0,${shadowOpacity})`;
            }
          }
          ticked = false;
        });
        ticked = true;
      }
    };

    // Run once initially to set the correct state
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [scrollMode, isLoading, darkMode]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="App"
      style={{
        background: 'transparent',
        color: darkMode ? '#e8e8f0' : '#1a1a2e',
        minHeight: '100vh',
        transition: 'background 0.3s, color 0.3s',
        position: 'relative',
      }}
    >
      <AnimatePresence>
        {isLoading && (
          <Loader onFinished={() => setIsLoading(false)} darkMode={darkMode} />
        )}
      </AnimatePresence>

      <CustomCursor />

      {!scrollMode ? (
        <BookPortfolio darkMode={darkMode} onToggleScrollMode={() => setScrollMode(true)} />
      ) : (
        <>
          <Background3D darkMode={darkMode} />
          <ShareButton darkMode={darkMode} />

          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} onToggleBookMode={() => setScrollMode(false)} />
          
          {/* Scroll floating photo overlay */}
          {scrollMode && (
            <div
              id="floating-scroll-photo"
              style={{
                position: 'absolute',
                pointerEvents: 'none',
                zIndex: 99,
                display: 'none',
                overflow: 'hidden',
                background: darkMode ? '#111' : '#fff',
                willChange: 'transform, top, left, width, height, border-radius',
              }}
            >
              <img
                src={profilePic}
                alt="Floating Profile"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                }}
              />
            </div>
          )}

          <Hero darkMode={darkMode} hidePhoto={photoState !== 'hero'} />
          <About darkMode={darkMode} hidePhoto={photoState !== 'about'} />
          <Services darkMode={darkMode} /> 
          <Skills darkMode={darkMode} />
          <Education darkMode={darkMode} />
          <Projects darkMode={darkMode} />
          <WhyHireMe darkMode={darkMode} />
          <Testimonials darkMode={darkMode} />
          <Contact darkMode={darkMode} />
          <Footer darkMode={darkMode} />
        </>
      )}

      {/* ✅ WHATSAPP DP STYLE PROFILE MODAL */}
      {/* ✅ WHATSAPP DP STYLE PROFILE MODAL WITH DUAL ROTATING RINGS */}
      <AnimatePresence>
        {showProfileModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowProfileModal(false)} 
            style={{
              position: 'fixed', inset: 0, zIndex: 10000,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem'
            }}
          >
            {/* CSS For Counter Rotating Rings */}
            <style>{`
              @keyframes spinClockwise { 100% { transform: translate(-50%, -50%) rotate(360deg); } }
              @keyframes spinAntiClockwise { 100% { transform: translate(-50%, -50%) rotate(-360deg); } }
            `}</style>

            <motion.div
              initial={{ scale: 0.5, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} 
              style={{
                background: darkMode ? '#111118' : '#ffffff',
                padding: '3rem 3rem', borderRadius: '30px', textAlign: 'center',
                border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                boxShadow: '0 25px 50px -12px rgba(0,245,160,0.25)',
                display: 'flex', flexDirection: 'column', alignItems: 'center'
              }}
            >
              {/* ✅ DP IMAGE CONTAINER WITH RINGS */}
              <div style={{ position: 'relative', width: '240px', height: '240px', marginBottom: '2.5rem' }}>
                
                {/* Outer Ring - Clockwise */}
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  width: '260px', height: '260px', // 10px gap on each side (Total 20px larger)
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  border: '2px dashed #00f5a0', // Dashed look
                  borderTopColor: 'transparent',
                  borderBottomColor: 'transparent',
                  animation: 'spinClockwise 8s linear infinite',
                  pointerEvents: 'none'
                }} />

                {/* Inner Ring - Anti-Clockwise */}
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  width: '250px', height: '250px', // 5px gap on each side
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  border: '2px solid rgba(124, 58, 237, 0.6)', // Purple accent
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                  animation: 'spinAntiClockwise 6s linear infinite',
                  pointerEvents: 'none'
                }} />

                {/* Core Profile Image */}
                <img
                  src={profilePic}
                  alt="Er Sujeet Vishwakarma"
                  style={{
                    width: '100%', height: '100%', borderRadius: '50%',
                    objectFit: 'cover',
                    objectPosition: 'top',
                    background: darkMode ? '#000' : '#fff',
                    boxShadow: '0 0 30px rgba(0,245,160,0.3)',
                    position: 'relative', zIndex: 10
                  }}
                />
              </div>
              
              {/* Name & Title */}
              <h2 style={{
                fontFamily: '"Space Mono", monospace', fontSize: '1.8rem', fontWeight: 800,
                color: darkMode ? '#fff' : '#000', margin: '0 0 0.5rem 0'
              }}>
                Er Sujeet Vishwakarma
              </h2>
              <p style={{
                color: '#00f5a0', letterSpacing: '0.15em', textTransform: 'uppercase',
                fontSize: '0.85rem', margin: 0, fontWeight: 700
              }}>
                Full-Stack Developer
              </p>

              <button 
                onClick={() => setShowProfileModal(false)}
                style={{
                  marginTop: '2rem', padding: '0.6rem 2rem', background: 'transparent',
                  border: '1px solid rgba(0,245,160,0.5)', color: '#00f5a0',
                  borderRadius: '50px', cursor: 'pointer', fontFamily: '"Space Mono", monospace',
                  fontWeight: 700, transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#00f5a0'; e.currentTarget.style.color = '#000'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#00f5a0'; }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem', width: '48px', height: '48px',
          borderRadius: '50%', background: hovered ? '#00f5a0' : 'transparent',
          border: '1px solid ' + (hovered ? '#00f5a0' : 'rgba(0,245,160,0.4)'),
          color: hovered ? '#000' : '#00f5a0', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 999, opacity: showTop ? 1 : 0,
          transform: showTop ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
          transition: 'all 0.3s ease', boxShadow: hovered ? '0 0 20px rgba(0,245,160,0.4)' : 'none',
          pointerEvents: showTop ? 'auto' : 'none',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </div>
  );
}

export default App;