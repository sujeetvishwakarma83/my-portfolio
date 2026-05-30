import { useState, useEffect, useRef } from 'react';
import { Player } from '@lottiefiles/react-lottie-player'; // Lottie Animation ke liye import
import resumeFile from '../assets/resume.pdf';
import codingAnim from '../assets/coding.json';

function useTyping(texts, speed, pause) {
  speed = speed || 80;
  pause = pause || 2000;
  var [display, setDisplay] = useState('');
  var [textIndex, setTextIndex] = useState(0);
  var [charIndex, setCharIndex] = useState(0);
  var [deleting, setDeleting] = useState(false);
  var [isPaused, setIsPaused] = useState(false);

  useEffect(function() {
    if (isPaused) return;
    var current = texts[textIndex];
    var timeout = setTimeout(function() {
      if (!deleting) {
        var next = charIndex + 1;
        setDisplay(current.slice(0, next));
        setCharIndex(next);
        if (next === current.length) {
          setIsPaused(true);
          setTimeout(function() {
            setIsPaused(false);
            setDeleting(true);
          }, pause);
        }
      } else {
        var prev = charIndex - 1;
        setDisplay(current.slice(0, prev));
        setCharIndex(prev);
        if (prev === 0) {
          setDeleting(false);
          setTextIndex(function(i) { return (i + 1) % texts.length; });
        }
      }
    }, deleting ? speed / 2 : speed);
    return function() { clearTimeout(timeout); };
  }, [charIndex, deleting, textIndex, isPaused, texts, speed, pause]);

  return display;
}

function Hero({ darkMode }) {
  var [visible, setVisible] = useState(false);
  var [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  var canvasRef = useRef(null);
  var animRef = useRef(null);
  var particlesRef = useRef([]);

  useEffect(function() {
    var timer = setTimeout(function() { setVisible(true); }, 100);
    return function() { clearTimeout(timer); };
  }, []);

  useEffect(function() {
    var handleResize = function() { setIsMobile(window.innerWidth <= 992); };
    window.addEventListener('resize', handleResize);
    return function() { window.removeEventListener('resize', handleResize); };
  }, []);

  // Background Particles
  useEffect(function() {
    if (!darkMode) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }
    var canvas = canvasRef.current;
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    var resize = function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    particlesRef.current = [];
    for (var i = 0; i < 50; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.5 ? '0,245,160' : '124,58,237',
      });
    }

    var draw = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var particles = particlesRef.current;

      for (var a = 0; a < particles.length; a++) {
        for (var b = a + 1; b < particles.length; b++) {
          var dist = Math.hypot(particles[a].x - particles[b].x, particles[a].y - particles[b].y);
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(124,58,237,' + (0.1 * (1 - dist / 150)) + ')';
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }

      for (var j = 0; j < particles.length; j++) {
        var p = particles[j];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + p.color + ',' + p.opacity + ')';
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      }
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return function() {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [darkMode]);

  var typedDesc = useTyping(
    [
      'Full Stack Developer',
      'MERN Stack Developer',
      'React Developer',
      'Freelance Developer'
    ],
    80,
    2000
  );

  // Theme Colors
  var bgMain = darkMode ? '#0A0A0A' : '#f8fafc';
  var textMain = darkMode ? '#ffffff' : '#0f172a';
  var textMuted = darkMode ? '#9ca3af' : '#475569';
  var primaryColor = '#00F5A0';
  var secondaryColor = '#7C3AED';

  // --- STYLES ---
  var sectionStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: isMobile ? '6rem 1.2rem 4rem' : '8rem 4rem 4rem',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: bgMain,
    color: textMain,
    fontFamily: '"Inter", "Segoe UI", sans-serif',
  };

  var containerStyle = {
    maxWidth: '1280px',
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    gap: isMobile ? '3rem' : '3rem',
    position: 'relative',
    zIndex: 10,
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(30px)',
    transition: 'all 0.8s ease-out',
  };

  var leftColStyle = {
    flex: '1.1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  };

  var rightColStyle = {
    flex: '0.9',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    marginTop: isMobile ? '1rem' : '0',
    paddingBottom: isMobile ? '2rem' : '0',
  };

  var badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 16px',
    borderRadius: '50px',
    background: darkMode ? 'rgba(0, 245, 160, 0.1)' : 'rgba(0, 245, 160, 0.15)',
    border: '1px solid rgba(0, 245, 160, 0.3)',
    color: darkMode ? primaryColor : '#00a86b',
    fontSize: isMobile ? '0.75rem' : '0.85rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '1.5rem',
  };

  var h1Style = {
    fontSize: isMobile ? '2.2rem' : 'clamp(3rem, 4.5vw, 4rem)',
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
    marginBottom: '1.5rem',
  };

  var gradientTextStyle = {
    background: 'linear-gradient(90deg, ' + primaryColor + ', ' + secondaryColor + ')',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  var typedLineStyle = {
    fontFamily: '"Space Mono", monospace',
    fontSize: isMobile ? '1.1rem' : '1.5rem',
    color: textMuted,
    marginBottom: '1.5rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    height: '32px'
  };

  var descStyle = {
    fontSize: isMobile ? '1rem' : '1.125rem',
    color: textMuted,
    lineHeight: 1.7,
    maxWidth: '600px',
    marginBottom: '2.5rem',
  };

  var btnPrimaryStyle = {
    padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
    background: primaryColor,
    color: '#0A0A0A',
    fontSize: '0.95rem',
    fontWeight: 700,
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  };

  var btnSecondaryStyle = {
    padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
    background: 'transparent',
    color: textMain,
    fontSize: '0.95rem',
    fontWeight: 600,
    border: '1px solid ' + (darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'),
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  };

  var pillStyle = {
    padding: '6px 16px',
    background: darkMode ? 'rgba(255,255,255,0.05)' : '#ffffff',
    border: '1px solid ' + (darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'),
    borderRadius: '50px',
    fontSize: '0.85rem',
    fontWeight: 500,
    color: textMuted,
    transition: 'all 0.3s ease',
  };

  var glassCardStyle = {
    position: 'absolute',
    background: darkMode ? 'rgba(20, 20, 20, 0.6)' : 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid ' + (darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'),
    padding: isMobile ? '8px 12px' : '12px 16px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)',
    zIndex: 20,
    whiteSpace: 'nowrap',
  };

  var profileSize = isMobile ? '300px' : '450px'; // Lottie ke hisab se size adjust kiya hai

  return (
    <section id="hero" style={sectionStyle}>
      {/* Embedded CSS for Hover Effects & Keyframes */}
      <style>{`
        @keyframes float-slow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes float-fast { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes blink-cursor { 50% { opacity: 0; } }
        @keyframes pulse-ring { 0% { box-shadow: 0 0 0 0 rgba(0, 245, 160, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(0, 245, 160, 0); } 100% { box-shadow: 0 0 0 0 rgba(0, 245, 160, 0); } }
        
        .hover-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 25px -5px rgba(0, 245, 160, 0.4); }
        .hover-btn-secondary:hover { transform: translateY(-3px); border-color: ${primaryColor}; color: ${darkMode ? primaryColor : '#00a86b'}; background: ${darkMode ? 'rgba(0,245,160,0.05)' : 'rgba(0,245,160,0.1)'}; }
        .tech-pill:hover { border-color: ${primaryColor}; color: ${primaryColor}; }
        
        .social-link { 
          color: ${textMuted}; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; 
          width: 44px; height: 44px; border-radius: 50%; border: 1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}; 
          background: ${darkMode ? 'rgba(255,255,255,0.02)' : '#ffffff'}; 
        }
        .social-link:hover { color: ${primaryColor}; border-color: ${primaryColor}; transform: translateY(-3px) scale(1.05); }
      `}</style>

      {/* Background Grid & Blobs */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ 
          position: 'absolute', inset: 0, 
          backgroundImage: 'linear-gradient(' + (darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)') + ' 1px, transparent 1px), linear-gradient(90deg, ' + (darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)') + ' 1px, transparent 1px)', 
          backgroundSize: '50px 50px', 
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)'
        }} />
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: isMobile ? '300px' : '600px', height: isMobile ? '300px' : '600px', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 60%)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: isMobile ? '250px' : '500px', height: isMobile ? '250px' : '500px', background: 'radial-gradient(circle, rgba(0,245,160,0.15) 0%, transparent 60%)', filter: 'blur(80px)' }} />
      </div>

      {/* Light/Dark Mode Canvas */}
      {!darkMode && <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, opacity: 0.6 }} />}
      {darkMode && <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, opacity: 0.7 }} />}

      {/* Main Content */}
      <div style={containerStyle}>
        
        {/* LEFT COLUMN: TEXT CONTENT */}
        <div style={leftColStyle}>
          
          <div style={badgeStyle}>
            <span style={{ display: 'block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: primaryColor, animation: 'pulse-ring 2s infinite' }}></span>
            Available for Freelance Projects
          </div>

          <h1 style={h1Style}>
            Building Modern Websites That Help Businesses <span style={gradientTextStyle}>Grow</span>
          </h1>

          <div style={typedLineStyle}>
            <span style={{ color: secondaryColor, marginRight: '10px', fontWeight: 'bold' }}>{'>'}</span>
            <span>{typedDesc}</span>
            <span style={{ display: 'inline-block', width: '3px', height: '1.1em', backgroundColor: primaryColor, marginLeft: '4px', animation: 'blink-cursor 1s step-end infinite' }}></span>
          </div>

          <p style={descStyle}>
            I help businesses build modern, responsive, and scalable websites and web applications. From startups to local services, I craft high-performance digital solutions that elevate online presence.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', width: '100%', marginBottom: '2.5rem' }}>
            <a href="#contact" className="hover-btn-primary" style={btnPrimaryStyle}>
              Hire Me
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            
            <a href="#projects" className="hover-btn-secondary" style={btnSecondaryStyle}>
              View Projects
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </a>

            <a href={resumeFile} download="Sujeet_Vishwakarma_Resume.pdf" className="hover-btn-secondary" style={btnSecondaryStyle}>
              Download Resume
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            </a>
          </div>

          <div style={{ width: '100%' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: textMuted, marginBottom: '1rem' }}>
              Tech Stack
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {['React.js', 'Node.js', 'MongoDB', 'PHP/MySQL', 'Tailwind CSS', 'AWS', 'REST APIs'].map((tech, i) => (
                <span key={i} className="tech-pill" style={pillStyle}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: LOTTIE ANIMATION & STATS */}
        <div style={rightColStyle}>
          
          <div style={{ position: 'relative', width: profileSize, height: profileSize }}>
            
            {/* Glow Behind Model */}
            <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(circle, ' + primaryColor + '40, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', zIndex: 0 }}></div>
            
            {/* LOTTIE PLAYER COMPONENT */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Player
                  autoplay
                  loop
                  // Yahan maine ek bahut achhi developer (coding) ki free Lottie URL daali hai. 
                  // Agar aapko dusri lagani ho to URL change kar lena.
                  src={codingAnim} 
                  style={{ height: '110%', width: '110%' }}
                />
            </div>

            {/* Glassmorphism Stat Cards */}
            <div style={{ 
              ...glassCardStyle, 
              zIndex: 30, 
              top: isMobile ? '-5%' : '5%', 
              left: isMobile ? '-5%' : '-10%', 
              animation: 'float-fast 4s ease-in-out infinite', 
              animationDelay: '0s' 
            }}>
              <div style={{ background: 'rgba(0,245,160,0.15)', color: primaryColor, padding: '8px', borderRadius: '10px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: isMobile ? '0.6rem' : '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: textMuted, fontWeight: 700 }}>Projects Completed</p>
                <p style={{ margin: 0, fontSize: isMobile ? '0.9rem' : '1.1rem', fontWeight: 800, color: textMain }}>15+</p>
              </div>
            </div>

            <div style={{ 
              ...glassCardStyle, 
              zIndex: 30,
              bottom: isMobile ? '10%' : '20%', 
              right: isMobile ? '-5%' : '-15%', 
              animation: 'float-fast 4s ease-in-out infinite', 
              animationDelay: '1s' 
            }}>
              <div style={{ background: 'rgba(124,58,237,0.15)', color: secondaryColor, padding: '8px', borderRadius: '10px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: isMobile ? '0.6rem' : '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: textMuted, fontWeight: 700 }}>Client Satisfaction</p>
                <p style={{ margin: 0, fontSize: isMobile ? '0.9rem' : '1.1rem', fontWeight: 800, color: textMain }}>100%</p>
              </div>
            </div>

            <div style={{ 
              ...glassCardStyle, 
              zIndex: 30,
              bottom: isMobile ? '-10%' : '-5%', 
              left: isMobile ? '10%' : '10%', 
              animation: 'float-fast 4s ease-in-out infinite', 
              animationDelay: '2s' 
            }}>
              <div style={{ background: 'rgba(56,189,248,0.15)', color: '#38bdf8', padding: '8px', borderRadius: '10px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m18 16 4-4-4-4M6 8 2 12l4 4M14.5 4l-5 16"/></svg>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: isMobile ? '0.6rem' : '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: textMuted, fontWeight: 700 }}>Technologies</p>
                <p style={{ margin: 0, fontSize: isMobile ? '0.9rem' : '1.1rem', fontWeight: 800, color: textMain }}>12+</p>
              </div>
            </div>
          </div>

          {/* Social Links sidebar */}
          <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'row' : 'column', 
            gap: '1rem', 
            position: isMobile ? 'relative' : 'absolute', 
            right: isMobile ? 'auto' : '-3rem', 
            marginTop: isMobile ? '4rem' : '0',
            zIndex: 20
          }}>
            {/* GitHub */}
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"/></svg>
            </a>
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/></svg>
            </a>
            {/* Email */}
            <a href="mailto:your@email.com" className="social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6"/></svg>
            </a>
          </div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div 
        style={{ 
          position: 'absolute', 
          bottom: isMobile ? '1rem' : '2.5rem', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '8px',
          cursor: 'pointer',
          zIndex: 10,
          animation: 'float-fast 2s ease-in-out infinite'
        }}
        onClick={function() { window.scrollTo({ top: window.innerHeight, behavior: 'smooth' }) }}
      >
        <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700, color: textMuted }}>
          Scroll Down
        </span>
        <svg style={{ color: primaryColor }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </div>

    </section>
  );
}

export default Hero;
