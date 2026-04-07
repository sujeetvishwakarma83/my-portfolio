import { useState, useEffect, useRef } from 'react';
import profilePhoto from '../assets/profile.jpg';

function About({ darkMode }) {
  var [visible, setVisible] = useState(false);
  var [imgHovered, setImgHovered] = useState(false);
  var [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  var ref = useRef(null);
  var canvasRef = useRef(null);
  var animRef = useRef(null);

  useEffect(function() {
    var handleResize = function() { setIsMobile(window.innerWidth <= 768); };
    window.addEventListener('resize', handleResize);
    return function() { window.removeEventListener('resize', handleResize); };
  }, []);

  useEffect(function() {
    var observer = new IntersectionObserver(
      function(entries) {
        if (entries[0].isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return function() { observer.disconnect(); };
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

    var particles = [];
    for (var i = 0; i < 50; i++) {
      particles.push({
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

  var stats = [
    { num: '5+', label: 'Projects' },
    { num: '3+', label: 'Years Learning' },
    { num: '\u221e', label: 'Curiosity' },
  ];

  // NAYA: Badges ko MERN stack ke hisab se update kiya gaya hai
  var badges = ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JavaScript', 'MySQL', 'Git'];

  var sectionBg = darkMode ? '#111118' : '#f0faf5';
  var titleColor = darkMode ? '#e8e8f0' : '#1a3a2e';
  var textColor = darkMode ? '#6b6b7a' : '#4a7a65';
  var highlightColor = darkMode ? '#e8e8f0' : '#1a3a2e';
  var borderColor = darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,150,100,0.12)';
  var badgeBg = darkMode ? 'rgba(0,245,160,0.06)' : 'rgba(0,180,120,0.08)';
  var badgeBorder = darkMode ? '1px solid rgba(0,245,160,0.15)' : '1px solid rgba(0,180,120,0.25)';
  var availableBg = darkMode ? '#0a0a0f' : '#ffffff';
  var availableBorder = darkMode ? '1px solid rgba(0,245,160,0.3)' : '1px solid rgba(0,180,120,0.3)';
  var imgBorder = imgHovered ? '#00f5a0' : (darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,150,100,0.2)');

  // Common paragraph style with justify
  var paraStyle = {
    fontFamily: 'Space Mono, monospace',
    fontSize: isMobile ? '0.78rem' : '0.82rem',
    color: textColor,
    lineHeight: 1.8,
    marginBottom: '1.25rem',
    textAlign: 'justify',
  };

  return (
    <section id="about" ref={ref} style={{
      padding: isMobile ? '4rem 1.5rem' : '6rem 4rem',
      background: sectionBg,
      overflow: 'hidden',
      position: 'relative',
    }}>

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
            position: 'absolute', top: '5%', right: '10%',
            width: isMobile ? '180px' : '350px',
            height: isMobile ? '180px' : '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,200,130,0.1) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: '10%', left: '5%',
            width: isMobile ? '150px' : '300px',
            height: isMobile ? '150px' : '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
          }} />
        </div>
      )}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Label */}
        <div style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          color: '#00f5a0',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}>
          01 — About
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          marginBottom: '1rem',
          color: titleColor,
        }}>
          Who I Am
        </h2>

        {/* Divider */}
        <div style={{
          width: '48px', height: '2px',
          background: '#00f5a0',
          marginBottom: '2.5rem',
        }} />

        {/* Main Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr',
          gap: isMobile ? '2.5rem' : '4rem',
          alignItems: 'center',
          maxWidth: '1100px',
        }}>

          {/* Photo */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-40px)',
            transition: 'all 0.8s ease',
            position: 'relative',
            order: isMobile ? 1 : 0,
            maxWidth: isMobile ? '280px' : '100%',
            margin: isMobile ? '0 auto' : '0',
          }}>

            <div
              onMouseEnter={function() { setImgHovered(true); }}
              onMouseLeave={function() { setImgHovered(false); }}
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1',
                overflow: 'hidden',
                border: '1px solid ' + imgBorder,
                transition: 'border-color 0.3s',
              }}
            >
              <img
                src={profilePhoto}
                alt="Sujeet Vishwakarma"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                  display: 'block',
                  transform: imgHovered ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.5s ease',
                  filter: imgHovered ? 'none' : 'grayscale(20%)',
                }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,245,160,0.06)',
                opacity: imgHovered ? 1 : 0,
                transition: 'opacity 0.3s',
              }} />
            </div>

            {/* Corner bottom right */}
            <div style={{
              position: 'absolute',
              bottom: '-12px', right: '-12px',
              width: imgHovered ? '100px' : '80px',
              height: imgHovered ? '100px' : '80px',
              borderRight: '2px solid #00f5a0',
              borderBottom: '2px solid #00f5a0',
              transition: 'width 0.3s, height 0.3s',
            }} />

            {/* Corner top left */}
            <div style={{
              position: 'absolute',
              top: '-12px', left: '-12px',
              width: '50px', height: '50px',
              borderLeft: '2px solid rgba(124,58,237,0.6)',
              borderTop: '2px solid rgba(124,58,237,0.6)',
            }} />

            {/* Available badge */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: isMobile ? '8px' : '-16px',
              background: availableBg,
              border: availableBorder,
              padding: '0.5rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <span style={{
                width: '8px', height: '8px',
                borderRadius: '50%',
                background: '#00f5a0',
                display: 'inline-block',
                animation: 'blink 1.5s ease-in-out infinite',
              }} />
              <span style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.68rem',
                color: '#00f5a0',
                letterSpacing: '0.05em',
              }}>
                Available for Work
              </span>
            </div>

          </div>

          {/* Text */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(40px)',
            transition: 'all 0.8s ease 0.2s',
            order: isMobile ? 2 : 0,
          }}>

            {/* Paragraph 1 — justified */}
            <p style={paraStyle}>
              Hello! I'm{' '}
              <span style={{ color: highlightColor, fontWeight: 600 }}>
                Sujeet Vishwakarma
              </span>{' '}
              — a passionate software developer and MCA student from Jaunpur, Uttar Pradesh. I have a deep interest
              in full-stack web development and I am always driven to learn new technologies and build innovative solutions.
            </p>

            {/* Paragraph 2 — justified (Updated for MERN) */}
            <p style={paraStyle}>
              After completing my BCA, I transitioned into mastering modern web development. Currently, my primary focus is building robust and scalable web applications using the{' '}
              <span style={{ color: '#00a870', fontWeight: 'bold' }}>MERN stack</span> (MongoDB, Express.js, React.js, and Node.js). While I have a strong foundation in PHP and MySQL, I truly enjoy crafting seamless user experiences with React and building powerful APIs with Node.js. I am also exploring concepts in AI and machine learning.
            </p>

            {/* Paragraph 3 — justified */}
            <p style={Object.assign({}, paraStyle, { marginBottom: '2rem' })}>
              My ultimate goal is to build{' '}
              <span style={{ color: highlightColor }}>
                clean, fast, and secure
              </span>{' '}
              applications that solve real-world problems. I am actively looking for opportunities to apply my skills and am available for freelancing and remote work.
            </p>

            {/* Tech badges */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
              marginBottom: '2rem',
            }}>
              {badges.map(function(badge, i) {
                return (
                  <span key={badge} style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '0.65rem',
                    padding: '0.3rem 0.75rem',
                    background: badgeBg,
                    color: '#00a870',
                    border: badgeBorder,
                    letterSpacing: '0.05em',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'all 0.4s ease ' + (0.4 + i * 0.07) + 's',
                  }}>
                    {badge}
                  </span>
                );
              })}
            </div>

            {/* Stats */}
            <div style={{
              display: 'flex',
              gap: isMobile ? '1.5rem' : '2.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid ' + borderColor,
              flexWrap: 'wrap',
            }}>
              {stats.map(function(stat, i) {
                return (
                  <div key={stat.label} style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.5s ease ' + (0.6 + i * 0.1) + 's',
                  }}>
                    <div style={{
                      fontSize: isMobile ? '1.6rem' : '2rem',
                      fontWeight: 800,
                      color: '#00f5a0',
                      lineHeight: 1,
                    }}>
                      {stat.num}
                    </div>
                    <div style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '0.68rem',
                      color: textColor,
                      letterSpacing: '0.1em',
                      marginTop: '0.3rem',
                    }}>
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default About;