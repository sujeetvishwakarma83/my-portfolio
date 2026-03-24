import { useState, useEffect, useRef } from 'react';
import resumeFile from '../assets/resume.pdf';

function useTyping(texts, speed, pause) {
  speed = speed || 80;
  pause = pause || 1500;
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
  }, [charIndex, deleting, textIndex, isPaused]);

  return display;
}

function Hero({ darkMode }) {
  var [visible, setVisible] = useState(false);
  var [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  var canvasRef = useRef(null);
  var animRef = useRef(null);
  var particlesRef = useRef([]);

  useEffect(function() {
    setTimeout(function() { setVisible(true); }, 100);
  }, []);

  useEffect(function() {
    var handleResize = function() { setIsMobile(window.innerWidth <= 768); };
    window.addEventListener('resize', handleResize);
    return function() { window.removeEventListener('resize', handleResize); };
  }, []);

  useEffect(function() {
    if (darkMode) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }
    var canvas = canvasRef.current;
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    var resize = function() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    particlesRef.current = [];
    for (var i = 0; i < 60; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? '0,180,120' : '124,58,237',
      });
    }

    var draw = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var particles = particlesRef.current;

      for (var a = 0; a < particles.length; a++) {
        for (var b = a + 1; b < particles.length; b++) {
          var dist = Math.hypot(particles[a].x - particles[b].x, particles[a].y - particles[b].y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0,180,120,' + (0.12 * (1 - dist / 120)) + ')';
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

  var typedName = useTyping(['Sujeet Vishwakarma'], 150, 20000);
  var typedDesc = useTyping(
    [
      '// MCA Final Year Student',
      '// Full Stack Developer',
      '// Building Web Solutions',
      '// Available for Freelance',
    ],
    60,
    1800
  );

  var sectionStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    padding: isMobile ? '7rem 1.5rem 3rem' : '8rem 4rem 4rem',
    position: 'relative',
    overflow: 'hidden',
    background: darkMode ? 'transparent' : '#f0faf5',
  };

  var h1Style = {
    fontSize: isMobile ? 'clamp(2.2rem, 10vw, 3.5rem)' : 'clamp(3rem, 8vw, 6.5rem)',
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
    marginBottom: '1.5rem',
    minHeight: '1.2em',
    wordBreak: 'break-word',
  };

  var descStyle = {
    fontFamily: 'Space Mono, monospace',
    fontSize: isMobile ? '0.75rem' : '0.85rem',
    color: darkMode ? '#6b6b7a' : '#4a7a65',
    lineHeight: 1.7,
    maxWidth: '480px',
    marginBottom: isMobile ? '2rem' : '3rem',
    minHeight: '1.5em',
  };

  var tagStyle = {
    fontFamily: 'Space Mono, monospace',
    fontSize: isMobile ? '0.65rem' : '0.75rem',
    letterSpacing: '0.15em',
    color: '#00f5a0',
    textTransform: 'uppercase',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  };

  var btn1Style = {
    padding: isMobile ? '0.75rem 1.5rem' : '0.9rem 2rem',
    background: '#00f5a0',
    color: '#000',
    fontFamily: 'Space Mono, monospace',
    fontSize: isMobile ? '0.7rem' : '0.8rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'inline-block',
    textDecoration: 'none',
  };

  var btn2Style = {
    padding: isMobile ? '0.75rem 1.5rem' : '0.9rem 2rem',
    background: 'transparent',
    color: darkMode ? '#e8e8f0' : '#1a3a2e',
    fontFamily: 'Space Mono, monospace',
    fontSize: isMobile ? '0.7rem' : '0.8rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    border: darkMode ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,100,60,0.2)',
    cursor: 'pointer',
    transition: 'border-color 0.2s, color 0.2s',
    display: 'inline-block',
    textDecoration: 'none',
  };

  var btnResumeStyle = {
    padding: isMobile ? '0.75rem 1.5rem' : '0.9rem 2rem',
    background: 'transparent',
    color: darkMode ? '#e8e8f0' : '#1a3a2e',
    fontFamily: 'Space Mono, monospace',
    fontSize: isMobile ? '0.7rem' : '0.8rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    border: darkMode ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,100,60,0.2)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
  };

  return (
    <section id="hero" style={sectionStyle}>

      {/* Dark mode grid */}
      {darkMode && (
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,245,160,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,160,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
          pointerEvents: 'none',
        }} />
      )}

      {/* Dark mode purple glow */}
      {darkMode && (
        <div style={{
          position: 'absolute', top: '20%', right: '-10%',
          width: isMobile ? '300px' : '600px',
          height: isMobile ? '300px' : '600px',
          background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
      )}

      {/* Dark mode green glow */}
      {darkMode && (
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-5%',
          width: isMobile ? '200px' : '400px',
          height: isMobile ? '200px' : '400px',
          background: 'radial-gradient(circle, rgba(0,245,160,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
      )}

      {/* Light mode canvas */}
      {!darkMode && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Light mode blobs */}
      {!darkMode && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: '10%', right: '5%',
            width: isMobile ? '200px' : '400px',
            height: isMobile ? '200px' : '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,200,130,0.12) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: '10%', left: '0%',
            width: isMobile ? '150px' : '350px',
            height: isMobile ? '150px' : '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', top: '50%', left: '40%',
            width: isMobile ? '100px' : '250px',
            height: isMobile ? '100px' : '250px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,180,120,0.07) 0%, transparent 70%)',
          }} />
        </div>
      )}

      {/* Main content */}
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '800px',
        width: '100%',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s ease',
      }}>

        {/* Tag line */}
        <div style={tagStyle}>
          <span style={{
            width: '32px', height: '1px',
            background: '#00f5a0',
            display: 'inline-block',
            flexShrink: 0,
          }} />
          Available for Freelance & Internship
        </div>

        {/* Name typing */}
        <h1 style={h1Style}>
          <span style={{ color: '#00f5a0' }}>{typedName}</span>
          <span style={{
            display: 'inline-block',
            width: isMobile ? '3px' : '4px',
            height: '0.85em',
            background: '#00f5a0',
            marginLeft: '6px',
            verticalAlign: 'middle',
            animation: 'blink 1s step-end infinite',
          }} />
        </h1>

        {/* Description typing */}
        <p style={descStyle}>
          {typedDesc}
          <span style={{
            display: 'inline-block',
            width: '8px',
            height: '1em',
            background: darkMode ? '#6b6b7a' : '#4a7a65',
            marginLeft: '3px',
            verticalAlign: 'middle',
            animation: 'blink 1s step-end infinite',
          }} />
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>

          {/* View Projects */}
          <a
            href="#projects"
            style={btn1Style}
            onMouseEnter={function(e) {
              e.target.style.transform = 'translate(-2px,-2px)';
              e.target.style.boxShadow = '4px 4px 0 #7c3aed';
            }}
            onMouseLeave={function(e) {
              e.target.style.transform = 'translate(0,0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            View Projects
          </a>

          {/* Hire Me */}
          <a
            href="#contact"
            style={btn2Style}
            onMouseEnter={function(e) {
              e.target.style.borderColor = '#00f5a0';
              e.target.style.color = '#00f5a0';
            }}
            onMouseLeave={function(e) {
              e.target.style.borderColor = darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,100,60,0.2)';
              e.target.style.color = darkMode ? '#e8e8f0' : '#1a3a2e';
            }}
          >
            Hire Me
          </a>

          {/* Resume download */}
          <a
            href={resumeFile}
            download="Sujeet_Vishwakarma_Resume.pdf"
            style={btnResumeStyle}
            onMouseEnter={function(e) {
              e.currentTarget.style.background = 'rgba(0,245,160,0.08)';
              e.currentTarget.style.borderColor = '#00f5a0';
              e.currentTarget.style.color = '#00f5a0';
              e.currentTarget.style.transform = 'translate(-2px,-2px)';
              e.currentTarget.style.boxShadow = '4px 4px 0 rgba(0,245,160,0.2)';
            }}
            onMouseLeave={function(e) {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,100,60,0.2)';
              e.currentTarget.style.color = darkMode ? '#e8e8f0' : '#1a3a2e';
              e.currentTarget.style.transform = 'translate(0,0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Download icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><title xmlns="">download-outline-loop</title><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="20" d="M12 4h2v6h2.5l-4.5 4.5M12 4h-2v6h-2.5l4.5 4.5"><animate attributeName="d" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="M12 4h2v6h2.5l-4.5 4.5M12 4h-2v6h-2.5l4.5 4.5;M12 4h2v3h2.5l-4.5 4.5M12 4h-2v3h-2.5l4.5 4.5;M12 4h2v6h2.5l-4.5 4.5M12 4h-2v6h-2.5l4.5 4.5"/><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="20;0"/></path><path stroke-dasharray="14" stroke-dashoffset="14" d="M6 19h12"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" to="0"/></path></g></svg>
            Resume
          </a>

        </div>
      </div>
    </section>
  );
}

export default Hero;