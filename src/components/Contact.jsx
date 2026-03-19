import { useState, useEffect, useRef } from 'react';

function Contact({ darkMode }) {
  var [visible, setVisible] = useState(false);
  var [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  var [formData, setFormData] = useState({ name: '', email: '', message: '' });
  var [submitted, setSubmitted] = useState(false);
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

  var handleChange = function(e) {
    setFormData(function(prev) {
      var updated = {};
      updated.name = prev.name;
      updated.email = prev.email;
      updated.message = prev.message;
      updated[e.target.name] = e.target.value;
      return updated;
    });
  };

  var handleSubmit = function(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(function() { setSubmitted(false); }, 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  var sectionBg = darkMode ? '#0a0a0f' : '#f0faf5';
  var titleColor = darkMode ? '#e8e8f0' : '#1a3a2e';
  var subTitleColor = darkMode ? '#e8e8f0' : '#1a3a2e';
  var textColor = darkMode ? '#6b6b7a' : '#4a7a65';
  var labelColor = darkMode ? '#6b6b7a' : '#4a7a65';
  var inputBg = darkMode ? '#111118' : '#ffffff';
  var inputColor = darkMode ? '#e8e8f0' : '#1a3a2e';
  var inputBorderDefault = darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,150,100,0.2)';
  var linkColorDefault = darkMode ? '#6b6b7a' : '#4a7a65';

  var inputStyle = {
    background: inputBg,
    border: '1px solid ' + inputBorderDefault,
    color: inputColor,
    fontFamily: 'Space Mono, monospace',
    fontSize: '0.82rem',
    padding: '0.9rem 1rem',
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.2s',
  };

  var contactItems = [
    { icon: '✉', label: 'sujeet@email.com', href: 'mailto:sujeet8528420907@gmail.com' },
    { icon: '⌥', label: 'github.com/sujeet', href: 'https://github.com/sujeetvishwakarma83' },
    { icon: '◈', label: 'linkedin.com/in/sujeet', href: 'https://www.linkedin.com/in/sujeet-vishwakarma-a19b2323a/' },
    { icon: '◎', label: 'Jaunpur, India', href: '' },
  ];

  return (
    <section id="contact" ref={ref} style={{
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
            position: 'absolute', top: '5%', right: '5%',
            width: isMobile ? '150px' : '300px',
            height: isMobile ? '150px' : '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,200,130,0.1) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: '5%', left: '0%',
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
          04 — Contact
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 750,
          letterSpacing: '-0.03em',
          marginBottom: '1rem',
          color: titleColor,
        }}>
          Let's Talk
        </h2>

        {/* Divider */}
        <div style={{
          width: '48px', height: '2px',
          background: '#00f5a0',
          marginBottom: '3rem',
        }} />

        {/* Grid — mobile: 1 col, desktop: 2 col */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '2.5rem' : '4rem',
          maxWidth: '1100px',
          width: '100%',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease',
        }}>

          {/* Left — Info */}
          <div>
            <h3 style={{
              fontSize: isMobile ? '1.2rem' : '1.5rem',
              fontWeight: 700,
              marginBottom: '1rem',
              color: subTitleColor,
            }}>
              Available for opportunities
            </h3>

            <p style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: isMobile ? '0.76rem' : '0.82rem',
              color: textColor,
              lineHeight: 1.8,
              marginBottom: '2rem',
            }}>
              Freelance projects, internships, or remote work—feel free to reach out. I’m always ready for interesting opportunities!
            </p>

            {/* Contact links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {contactItems.map(function(item) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: isMobile ? '0.72rem' : '0.8rem',
                      color: linkColorDefault,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      transition: 'color 0.2s',
                      textDecoration: 'none',
                      wordBreak: 'break-all',
                    }}
                    onMouseEnter={function(e) { e.currentTarget.style.color = '#00f5a0'; }}
                    onMouseLeave={function(e) { e.currentTarget.style.color = linkColorDefault; }}
                  >
                    <span style={{ color: '#00f5a0', flexShrink: 0 }}>{item.icon}</span>
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right — Form */}
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >

            {/* Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.7rem',
                color: labelColor,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Sujeet v"
                required
                style={inputStyle}
                onFocus={function(e) { e.target.style.borderColor = '#00f5a0'; }}
                onBlur={function(e) { e.target.style.borderColor = inputBorderDefault; }}
              />
            </div>

            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.7rem',
                color: labelColor,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="sujeet@example.com"
                required
                style={inputStyle}
                onFocus={function(e) { e.target.style.borderColor = '#00f5a0'; }}
                onBlur={function(e) { e.target.style.borderColor = inputBorderDefault; }}
              />
            </div>

            {/* Message */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.7rem',
                color: labelColor,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                required
                rows={5}
                style={Object.assign({}, inputStyle, { resize: 'none' })}
                onFocus={function(e) { e.target.style.borderColor = '#00f5a0'; }}
                onBlur={function(e) { e.target.style.borderColor = inputBorderDefault; }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                padding: '1rem',
                background: submitted ? (darkMode ? '#18181f' : '#f0faf5') : '#00f5a0',
                color: submitted ? '#00f5a0' : '#000',
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                border: submitted ? '1px solid #00f5a0' : 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                marginTop: '0.5rem',
                width: '100%',
              }}
              onMouseEnter={function(e) {
                if (!submitted) {
                  e.target.style.transform = 'translate(-2px,-2px)';
                  e.target.style.boxShadow = '4px 4px 0 #7c3aed';
                }
              }}
              onMouseLeave={function(e) {
                e.target.style.transform = 'translate(0,0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              {submitted ? '✓ Message Sent!' : 'Send Message'}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;