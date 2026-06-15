import { useState, useEffect, useRef } from 'react';
import profilePhoto from '../assets/profile.jpg'; // Apni photo ka path verify kar lein

// AI Streaming Text Helper Component
function AIStreamText({ content, visible, delayOffset }) {
  let globalWordIndex = 0;
  
  return (
    <>
      {content.map((segment, segmentIndex) => {
        // Text ko words mein todna
        const words = segment.text.split(" ").filter(w => w !== "");
        
        return words.map((word, wordIndex) => {
          // Har word ka delay calculate karna (0.02s per word = Fast AI typing)
          const delay = delayOffset + (globalWordIndex * 0.02);
          globalWordIndex++;
          
          return (
            <span key={`${segmentIndex}-${wordIndex}`}>
              <span 
                style={{
                  opacity: visible ? 1 : 0,
                  filter: visible ? 'blur(0px)' : 'blur(4px)', // AI jaisa reveal effect
                  transform: visible ? 'translateY(0)' : 'translateY(2px)',
                  transition: `all 0.15s ease-out ${delay}s`,
                  color: segment.color || 'inherit',
                  fontWeight: segment.fontWeight || 'inherit',
                  display: 'inline-block',
                  willChange: 'opacity, filter'
                }}
              >
                {word}
              </span>
              {/* Space zaroori hai taaki 'justify' alignment perfectly kaam kare */}
              {" "}
            </span>
          );
        });
      })}
    </>
  );
}

function About({ darkMode, bookMode = false, aboutPart = null }) {
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

  // Scroll karne par animation trigger karne ke liye
  useEffect(function() {
    if (bookMode) {
      setVisible(true);
      return;
    }
    var observer = new IntersectionObserver(
      function(entries) {
        if (entries[0].isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 } 
    );
    if (ref.current) observer.observe(ref.current);
    return function() { observer.disconnect(); };
  }, [bookMode]);

  // Background Canvas for Light Mode
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
    for (var i = 0; i < 40; i++) {
      particles.push({
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
      for (var a = 0; a < particles.length; a++) {
        for (var b = a + 1; b < particles.length; b++) {
          var dist = Math.hypot(particles[a].x - particles[b].x, particles[a].y - particles[b].y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0,245,160,' + (0.1 * (1 - dist / 100)) + ')';
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
    { num: '15+', label: 'Projects Completed' },
    { num: '100%', label: 'Client Satisfaction' },
    { num: '3+', label: 'Years Experience' },
  ];

  var badges = ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'PHP', 'MySQL', 'Tailwind'];

  // Theme Variables
  var sectionBg = 'transparent';
  var titleColor = darkMode ? '#ffffff' : '#0f172a';
  var textColor = darkMode ? '#9ca3af' : '#475569';
  var highlightColor = darkMode ? '#00F5A0' : '#00a86b';
  var glassBg = darkMode ? 'rgba(20, 20, 20, 0.6)' : 'rgba(255, 255, 255, 0.7)';
  var glassBorder = darkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)';
  var badgeBg = darkMode ? 'rgba(0,245,160,0.1)' : 'rgba(0,245,160,0.15)';
  var badgeBorder = darkMode ? '1px solid rgba(0,245,160,0.2)' : '1px solid rgba(0,245,160,0.3)';

  // YAHAN CHANGE KIYA HAI: textAlign 'justify' add kiya gaya hai
  var paraStyle = {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    fontSize: bookMode ? '0.85rem' : (isMobile ? '0.95rem' : '1.05rem'),
    color: textColor,
    lineHeight: bookMode ? 1.5 : 1.8,
    marginBottom: bookMode ? '0.75rem' : '1.25rem',
    textAlign: 'justify',
  };

  return (
    <section id="about" ref={ref} style={{
      padding: bookMode ? '2rem 1.5rem' : (isMobile ? '5rem 1.5rem' : '8rem 4rem'),
      background: sectionBg,
      overflow: bookMode ? 'visible' : 'hidden',
      position: 'relative',
      minHeight: bookMode ? 'auto' : '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      
      {/* Background Glowing Blobs */}
      {!bookMode && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <div style={{ 
            position: 'absolute', top: '20%', left: '-10%', 
            width: isMobile ? '250px' : '500px', height: isMobile ? '250px' : '500px', 
            background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', 
            filter: 'blur(60px)' 
          }} />
          <div style={{ 
            position: 'absolute', bottom: '10%', right: '-5%', 
            width: isMobile ? '200px' : '400px', height: isMobile ? '200px' : '400px', 
            background: 'radial-gradient(circle, rgba(0,245,160,0.12) 0%, transparent 70%)', 
            filter: 'blur(60px)' 
          }} />
        </div>
      )}

      {!bookMode && !darkMode && <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} />}

      {/* Main Glassmorphism Container */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1200px',
        width: '100%',
        background: bookMode ? 'transparent' : glassBg,
        backdropFilter: bookMode ? 'none' : 'blur(20px)',
        WebkitBackdropFilter: bookMode ? 'none' : 'blur(20px)',
        border: bookMode ? 'none' : glassBorder,
        borderRadius: '24px',
        padding: bookMode ? '0' : (isMobile ? '2rem 1.5rem' : '4rem'),
        boxShadow: bookMode ? 'none' : '0 20px 40px -20px rgba(0,0,0,0.2)',
        opacity: visible ? 1 : 0,
        transform: bookMode ? 'none' : (visible ? 'translateY(0)' : 'translateY(40px)'),
        transition: 'opacity 0.8s ease, transform 0.8s ease'
      }}>

        {/* Section Header */}
        <div style={{ marginBottom: bookMode ? '1.5rem' : '3rem', textAlign: isMobile ? 'center' : 'left' }}>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.8rem',
            letterSpacing: '0.15em',
            color: highlightColor,
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
            fontWeight: 600
          }}>
            {aboutPart === 2 ? '01 // Skills' : '01 // About Me'}
          </div>
          <h2 style={{
            fontSize: bookMode ? '1.8rem' : 'clamp(2.5rem, 4vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: titleColor,
            margin: 0
          }}>
            {aboutPart === 2 ? (
              <>Core <span style={{ color: highlightColor }}>Stack & Stats</span>.</>
            ) : (
              <>Engineering Digital <span style={{ color: highlightColor }}>Success</span>.</>
            )}
          </h2>
        </div>

        {/* Grid Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: bookMode ? '1fr' : (isMobile ? '1fr' : '1fr 1.5fr'),
          gap: bookMode ? '1.5rem' : (isMobile ? '3rem' : '4rem'),
          alignItems: 'center',
        }}>

          {/* Left: Interactive Photo */}
          {!bookMode && (
            <div style={{ position: 'relative', margin: isMobile ? '0 auto' : '0', maxWidth: '350px', width: '100%' }}>
              <div style={{
                position: 'absolute', inset: '-5px',
                background: 'linear-gradient(135deg, #00F5A0, #7C3AED)',
                borderRadius: '20px',
                filter: 'blur(15px)',
                opacity: imgHovered ? 0.6 : 0.2,
                transition: 'opacity 0.4s ease'
              }} />

              <div
                onMouseEnter={function() { setImgHovered(true); }}
                onMouseLeave={function() { setImgHovered(false); }}
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4/5',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: glassBorder,
                  zIndex: 2,
                  background: darkMode ? '#111' : '#fff'
                }}
              >
                <img
                  src={profilePhoto}
                  alt="Sujeet Vishwakarma"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    transform: imgHovered ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    filter: imgHovered ? 'none' : (darkMode ? 'brightness(0.9) contrast(1.1)' : 'none'),
                  }}
                />
              </div>
              
              {/* Status Badge */}
              <div style={{
                position: 'absolute',
                bottom: '-15px', right: '-15px',
                background: darkMode ? '#1A1A1A' : '#ffffff',
                border: '1px solid ' + highlightColor,
                padding: '0.75rem 1.25rem',
                borderRadius: '50px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                zIndex: 3,
                boxShadow: '0 10px 20px -5px rgba(0,0,0,0.2)'
              }}>
                <span style={{
                  width: '10px', height: '10px',
                  borderRadius: '50%',
                  background: highlightColor,
                  display: 'inline-block',
                  boxShadow: '0 0 10px ' + highlightColor,
                  animation: 'pulse-ring 2s infinite',
                }} />
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: titleColor,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>Available</span>
              </div>
            </div>
          )}

          {/* Right Content */}
          <div>
            {/* Part 1 or Scroll Mode: Text Paragraphs */}
            {(aboutPart === 1 || aboutPart === null) && (
              <>
                <p style={paraStyle}>
                  <AIStreamText 
                    visible={visible} 
                    delayOffset={0.6} 
                    content={[
                      { text: "Hello! I'm" },
                      { text: " Sujeet Vishwakarma,", color: highlightColor, fontWeight: 700 },
                      { text: " a Full Stack Developer based in Jaunpur, Uttar Pradesh. I bridge the gap between complex technical architecture and seamless user experiences." }
                    ]}
                  />
                </p>
                
                <p style={paraStyle}>
                  <AIStreamText 
                    visible={visible} 
                    delayOffset={1.2} 
                    content={[
                      { text: "With a solid foundation in BCA and MCA, I don't just write code—I engineer solutions that help businesses grow. Whether it's building a fast, scalable web application using the" },
                      { text: " MERN stack", color: titleColor, fontWeight: 700 },
                      { text: " or developing reliable backend systems with" },
                      { text: " PHP,", color: titleColor, fontWeight: 700 },
                      { text: " my focus is always on delivering secure and high-performance digital assets." }
                    ]}
                  />
                </p>
                
                <p style={paraStyle}>
                  <AIStreamText 
                    visible={visible} 
                    delayOffset={2.2} 
                    content={[
                      { text: "My approach is simple: I listen to your business requirements, design the optimal technical architecture, and deliver clean, scalable solutions on time. I am actively available for freelance projects and remote collaborations." }
                    ]}
                  />
                </p>
              </>
            )}

            {/* Part 2 or Scroll Mode: Tech Stack Badges */}
            {(aboutPart === 2 || aboutPart === null) && (
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: bookMode ? '0.4rem' : '0.75rem',
                marginTop: aboutPart === 2 ? '0' : (bookMode ? '1rem' : '2rem'),
                marginBottom: bookMode ? '1rem' : '2.5rem'
              }}>
                {badges.map(function(badge, i) {
                  return (
                    <span key={badge} style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: bookMode ? '0.65rem' : '0.75rem',
                      fontWeight: 600,
                      padding: bookMode ? '0.25rem 0.6rem' : '0.4rem 1rem',
                      background: badgeBg,
                      color: highlightColor,
                      border: badgeBorder,
                      borderRadius: '50px',
                      letterSpacing: '0.05em',
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateY(0)' : 'translateY(10px)',
                      transition: aboutPart === 2 ? 'none' : `all 0.4s ease ${3.2 + (i * 0.1)}s` 
                    }}>
                      {badge}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Part 2 or Scroll Mode: Stats Row */}
            {(aboutPart === 2 || aboutPart === null) && (
              <div style={{
                display: 'flex',
                gap: bookMode ? '1.5rem' : (isMobile ? '1.5rem' : '3rem'),
                paddingTop: bookMode ? '1rem' : '2rem',
                borderTop: aboutPart === 2 ? 'none' : glassBorder,
                flexWrap: 'wrap',
                marginTop: aboutPart === 2 ? '1.5rem' : '0'
              }}>
                {stats.map(function(stat, i) {
                  return (
                    <div key={stat.label} style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateY(0)' : 'translateY(15px)',
                      transition: aboutPart === 2 ? 'none' : `all 0.5s ease ${3.5 + (i * 0.15)}s` 
                    }}>
                      <div style={{
                        fontSize: bookMode ? '1.4rem' : (isMobile ? '1.8rem' : '2.2rem'),
                        fontWeight: 800,
                        color: titleColor,
                        lineHeight: 1,
                        marginBottom: '0.3rem'
                      }}>
                        {stat.num}
                      </div>
                      <div style={{
                        fontSize: bookMode ? '0.7rem' : '0.8rem',
                        color: textColor,
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;