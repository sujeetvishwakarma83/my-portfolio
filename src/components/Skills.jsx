import { useState, useEffect, useRef } from 'react';

var skillsData = [
  { icon: '🌐', name: 'HTML / CSS', level: 90, desc: 'Responsive & Semantic' },
  { icon: '⚡', name: 'JavaScript', level: 75, desc: 'ES6+, DOM, APIs' },
  { icon: '⚛️', name: 'React.js', level: 55, desc: 'Components, Hooks' },
  { icon: '🐘', name: 'PHP / MySQL', level: 70, desc: 'Backend, CRUD' },
  { icon: '🔧', name: 'Git / GitHub', level: 65, desc: 'Version Control' },
  { icon: '🤖', name: 'Machine Learning', level: 35, desc: 'Learning Phase' },
];

function SkillCard({ skill, visible, darkMode }) {
  var [hovered, setHovered] = useState(false);

  var cardBg = darkMode ? '#111118' : '#ffffff';
  var cardBorder = hovered
    ? '#00f5a0'
    : (darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,150,100,0.15)');
  var nameColor = darkMode ? '#e8e8f0' : '#1a3a2e';
  var barBg = darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,150,100,0.1)';
  var descColor = darkMode ? '#6b6b7a' : '#4a7a65';

  return (
    <div
      onMouseEnter={function() { setHovered(true); }}
      onMouseLeave={function() { setHovered(false); }}
      style={{
        background: cardBg,
        border: '1px solid ' + cardBorder,
        padding: '1.5rem',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        opacity: visible ? 1 : 0,
        transitionProperty: 'border-color, transform, opacity, background',
        transitionDuration: '0.2s, 0.2s, 0.6s, 0.3s',
        boxShadow: hovered
          ? (darkMode ? 'none' : '0 8px 24px rgba(0,180,120,0.1)')
          : 'none',
      }}
    >
      <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
        {skill.icon}
      </div>

      <div style={{
        fontSize: '0.95rem',
        fontWeight: 700,
        marginBottom: '0.75rem',
        color: nameColor,
      }}>
        {skill.name}
      </div>

      <div style={{
        height: '2px',
        background: barBg,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: visible ? (skill.level + '%') : '0%',
          background: '#00f5a0',
          transition: 'width 1.2s ease',
        }} />
      </div>

      <div style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '0.7rem',
        color: descColor,
        marginTop: '0.5rem',
      }}>
        {skill.level}% — {skill.desc}
      </div>
    </div>
  );
}

function Skills({ darkMode }) {
  var [visible, setVisible] = useState(false);
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return function() { observer.disconnect(); };
  }, []);

  // Light mode canvas particles
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
          var dist = Math.hypot(
            particles[a].x - particles[b].x,
            particles[a].y - particles[b].y
          );
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

  var sectionBg = darkMode ? '#0a0a0f' : '#f0faf5';
  var titleColor = darkMode ? '#e8e8f0' : '#1a3a2e';

  return (
    <section id="skills" ref={ref} style={{
      padding: isMobile ? '4rem 1.5rem' : '6rem 4rem',
      background: sectionBg,
      position: 'relative',
      overflow: 'hidden',
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
            position: 'absolute', top: '0%', left: '60%',
            width: isMobile ? '150px' : '300px',
            height: isMobile ? '150px' : '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,200,130,0.1) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: '5%', right: '5%',
            width: isMobile ? '120px' : '250px',
            height: isMobile ? '120px' : '250px',
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
          color: '#00f59ff8',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}>
          02 — Skills
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          marginBottom: '1rem',
          color: titleColor,
        }}>
          Tech Stack
        </h2>

        {/* Divider */}
        <div style={{
          width: '48px', height: '2px',
          background: '#00f5a0',
          marginBottom: '3rem',
        }} />

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? '1fr'
            : 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
          maxWidth: '1100px',
          width: '100%',
        }}>
          {skillsData.map(function(skill) {
            return (
              <SkillCard
                key={skill.name}
                skill={skill}
                visible={visible}
                darkMode={darkMode}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Skills;