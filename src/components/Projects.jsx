import { useState, useEffect, useRef } from 'react';

var projectsData = [
  {
    num: '001',
    title: 'E-Commerce Website',
    desc: 'Full-stack shopping website with product listing, cart, and payment integration using PHP and MySQL.',
    tags: ['HTML', 'CSS', 'PHP', 'MySQL'],
    link: '#'
  },
  {
    num: '002',
    title: 'Student Management System',
    desc: 'CRUD application for managing student records with login authentication and responsive UI.',
    tags: ['JavaScript', 'PHP', 'MySQL'],
    link: '#'
  },
  {
    num: '003',
    title: 'Weather App',
    desc: 'Real-time weather application using OpenWeatherMap API with clean UI and city search.',
    tags: ['React', 'API', 'CSS'],
    link: '#'
  },
];

function ProjectCard({ project, visible, index, darkMode }) {
  var [hovered, setHovered] = useState(false);

  var cardBg = darkMode ? '#18181f' : '#ffffff';
  var cardBorder = hovered
    ? '#00f5a0'
    : (darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,150,100,0.15)');
  var numColor = darkMode ? '#6b6b7a' : '#4a7a65';
  var titleColor = darkMode ? '#e8e8f0' : '#1a3a2e';
  var descColor = darkMode ? '#6b6b7a' : '#4a7a65';
  var tagBg = darkMode ? 'rgba(0,245,160,0.08)' : 'rgba(0,180,120,0.08)';
  var tagBorder = darkMode ? '1px solid rgba(0,245,160,0.2)' : '1px solid rgba(0,180,120,0.25)';
  var tagColor = darkMode ? '#00f5a0' : '#00a870';
  var delay1 = (index * 0.15) + 's';

  return (
    <div
      onMouseEnter={function() { setHovered(true); }}
      onMouseLeave={function() { setHovered(false); }}
      style={{
        background: cardBg,
        border: '1px solid ' + cardBorder,
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transitionProperty: 'border-color, opacity, transform, box-shadow',
        transitionDuration: '0.2s, 0.6s, 0.6s, 0.2s',
        transitionDelay: '0s, ' + delay1 + ', ' + delay1 + ', 0s',
        boxShadow: hovered
          ? (darkMode ? 'none' : '0 8px 24px rgba(0,180,120,0.1)')
          : 'none',
      }}
    >
      {/* Top gradient line on hover */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #00f5a0, #7c3aed)',
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.3s ease',
      }} />

      {/* Number */}
      <div style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '0.7rem',
        color: numColor,
        marginBottom: '0.75rem',
        letterSpacing: '0.1em',
      }}>
        {project.num}
      </div>

      {/* Title */}
      <div style={{
        fontSize: '1.05rem',
        fontWeight: 700,
        marginBottom: '0.65rem',
        color: titleColor,
      }}>
        {project.title}
      </div>

      {/* Description */}
      <p style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '0.76rem',
        color: descColor,
        lineHeight: 1.7,
        marginBottom: '1.25rem',
      }}>
        {project.desc}
      </p>

      {/* Tags */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.4rem',
        marginBottom: '1.25rem',
      }}>
        {project.tags.map(function(tag) {
          return (
            <span key={tag} style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.62rem',
              padding: '0.25rem 0.6rem',
              background: tagBg,
              color: tagColor,
              border: tagBorder,
              letterSpacing: '0.05em',
            }}>
              {tag}
            </span>
          );
        })}
      </div>

      {/* Link */}
      <a href={project.link} style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '0.72rem',
        color: '#00f5a0',
        display: 'inline-flex',
        alignItems: 'center',
        gap: hovered ? '0.8rem' : '0.4rem',
        transition: 'gap 0.2s',
        textDecoration: 'none',
      }}>
        View Project →
      </a>

    </div>
  );
}

function Projects({ darkMode }) {
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
      { threshold: 0.05 }
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

  var sectionBg = darkMode ? '#111118' : '#f0faf5';
  var titleColor = darkMode ? '#e8e8f0' : '#1a3a2e';

  return (
    <section id="projects" ref={ref} style={{
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
            position: 'absolute', top: '10%', right: '0%',
            width: isMobile ? '150px' : '300px',
            height: isMobile ? '150px' : '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,200,130,0.1) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: '5%', left: '5%',
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
          color: '#00f5a0',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}>
          04 — Projects
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          marginBottom: '1rem',
          color: titleColor,
        }}>
          My Work
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
            : 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem',
          maxWidth: '1100px',
          width: '100%',
        }}>
          {projectsData.map(function(project, index) {
            return (
              <ProjectCard
                key={project.num}
                project={project}
                visible={visible}
                index={index}
                darkMode={darkMode}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Projects;