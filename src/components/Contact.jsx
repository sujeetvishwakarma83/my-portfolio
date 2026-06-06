import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';

const GithubIcon = ({ size = 20, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4" /><path d="M12 18v4" /></svg>
);

const LinkedinIcon = ({ size = 20, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

function Contact({ darkMode }) {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  
  // Animation States
  const [submitted, setSubmitted] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  
  // Path Array
  const [flightPath, setFlightPath] = useState({ x: [], y: [], rot: [], scale: [], opacity: [] });

  const ref = useRef(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const submitBtnRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (darkMode) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    let particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1, dx: (Math.random() - 0.5) * 0.5, dy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1, color: Math.random() > 0.5 ? '0,245,160' : '124,58,237',
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          let dist = Math.hypot(particles[a].x - particles[b].x, particles[a].y - particles[b].y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,245,160,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
      for (let j = 0; j < particles.length; j++) {
        let p = particles[j];
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.opacity})`; ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize); };
  }, [darkMode]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const btnRect = submitBtnRef.current.getBoundingClientRect();
    const startX = btnRect.left + btnRect.width / 2;
    const startY = btnRect.top + btnRect.height / 2;

    const logoEl = document.getElementById('nav-logo');
    let endX = 20, endY = 20; 
    
    if (logoEl) {
      const logoRect = logoEl.getBoundingClientRect();
      endX = logoRect.left + logoRect.width / 2;
      endY = logoRect.top + logoRect.height / 2;
    }

    // ✅ ZYADA LAHRATA HUA PATH (More Time, More Waves)
    const steps = 60; // Smoothness badha di (40 se 60)
    const pathX = [];
    const pathY = [];
    const rotations = [];
    const scales = [];
    const opacities = [];
    
    const dx = startX - endX;
    const dy = startY - endY;
    
    // Lahar ki chaudaai (Amplitude) badha di
    const amplitude = isMobile ? 90 : 200; 
    
    // Kitni baar lahraayega (Waves badha diye)
    const waves = 3.5; 

    for (let i = 0; i <= steps; i++) {
      const t = i / steps; 
      
      const lx = startX - dx * t;
      const ly = startY - dy * t;

      const taper = Math.sin(t * Math.PI); 
      const offset = Math.sin(t * Math.PI * 2 * waves) * amplitude * taper;

      const angle = Math.atan2(-dy, -dx);
      const perpAngle = angle + Math.PI / 2;

      pathX.push(lx + Math.cos(perpAngle) * offset);
      pathY.push(ly + Math.sin(perpAngle) * offset);
      
      // Udte time thoda bada aur center mein aur bada dikhega
      scales.push(i === steps ? 0 : 1.2 + (Math.sin(t * Math.PI) * 0.4)); 
      opacities.push(i === steps ? 0 : 1);
    }

    for (let i = 0; i <= steps; i++) {
      if (i === steps) {
        rotations.push(rotations[i - 1]);
      } else {
        const ax = pathX[i + 1] - pathX[i];
        const ay = pathY[i + 1] - pathY[i];
        const deg = Math.atan2(ay, ax) * (180 / Math.PI);
        rotations.push(deg);
      }
    }

    setFlightPath({ x: pathX, y: pathY, rot: rotations, scale: scales, opacity: opacities });
    setIsFlying(true); 

    try {
      await fetch("https://script.google.com/macros/s/AKfycbwg_rnIeQpyDmUjieNEnOqvz7UYBvN5hOxTWSPVwsdm_HpML5CO6swtQi-JkiXVHS7BKQ/exec", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      
      // ✅ TAKRANE KA EFFECT (Exactly 3.5 seconds baad)
      setTimeout(() => {
        setIsFlying(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });

        if (logoEl) {
          logoEl.style.transform = 'scale(1.4)'; 
          logoEl.style.boxShadow = `0 0 30px #00F5A0, 0 0 60px #00F5A0`; 
          
          setTimeout(() => {
            logoEl.style.transform = 'scale(1)'; 
            logoEl.style.boxShadow = 'none'; 
          }, 500); 
        }

      }, 3500); // ⏱️ Time badha kar 3.5 second kar diya

      setTimeout(() => { setSubmitted(false); }, 7000);

    } catch (error) {
      console.error(error);
      setIsFlying(false);
      alert("Error sending message ❌");
    }
  };

  const sectionBg = darkMode ? '#0A0A0A' : '#f8fafc';
  const titleColor = darkMode ? '#ffffff' : '#0f172a';
  const textColor = darkMode ? '#9ca3af' : '#475569';
  const glowColor = '#00F5A0';
  const inputBg = darkMode ? 'rgba(255,255,255,0.03)' : '#ffffff';
  const inputBorder = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  const contactItems = [
    { icon: <Mail size={18} />, label: 'sujeet.cabbagecode@gmail.com', href: 'mailto:sujeet.cabbagecode@gmail.com' },
    { icon: <GithubIcon size={18} />, label: 'github.com/sujeetvishwakarma83', href: 'https://github.com/sujeetvishwakarma83' },
    { icon: <LinkedinIcon size={18} />, label: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/sujeet-vishwakarma-a19b2323a/' },
    { icon: <MapPin size={18} />, label: 'Jaunpur, India', href: '#' },
  ];

  return (
    <section id="contact" ref={ref} style={{
      padding: isMobile ? '5rem 1.5rem' : '8rem 4rem',
      background: sectionBg, position: 'relative', overflow: 'hidden', minHeight: '100vh',
    }}>

      {/* ✅ FLYING PLANE ANIMATION LAYER */}
      <AnimatePresence>
        {isFlying && (
          <motion.div
            initial={{ 
              position: 'fixed', 
              left: flightPath.x[0], 
              top: flightPath.y[0],
              x: '-50%', y: '-50%', scale: 1, opacity: 1, rotate: -45, zIndex: 99999
            }}
            animate={{ 
              left: flightPath.x, 
              top: flightPath.y, 
              rotate: flightPath.rot,
              scale: flightPath.scale, 
              opacity: flightPath.opacity 
            }}
            transition={{ 
              duration: 3.5, // ⏱️ Flight ab aaram se 3.5 seconds chalegi
              ease: "linear",
            }}
            style={{ pointerEvents: 'none' }}
          >
            <div style={{
              background: glowColor, color: '#000', padding: '15px',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 40px ${glowColor}, 0 0 80px ${glowColor}` // Glow thoda aur badha diya
            }}>
              <Send size={28} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!darkMode && <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '20%', right: '5%', width: '300px', height: '300px', background: `radial-gradient(circle, ${glowColor}10 0%, transparent 70%)`, filter: 'blur(60px)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', margin: '0 auto' }}>
        
        <div style={{ textAlign: isMobile ? 'center' : 'left', marginBottom: '4rem' }}>
          <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.8rem', letterSpacing: '0.15em', color: glowColor, textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 700 }}>
            07 // Get In Touch
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', color: titleColor }}>
            Ready to <span style={{ color: glowColor }}>Collaborate?</span>
          </h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: isMobile ? '3rem' : '5rem' }}
        >
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: titleColor }}>
              Let's build something great.
            </h3>
            <p style={{ color: textColor, lineHeight: 1.8, marginBottom: '2.5rem', fontSize: '0.95rem' }}>
              Whether you have a freelance project, need a reliable developer, or just want to say hi, my inbox is always open. I typically reply within 24 hours.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {contactItems.map((item, idx) => (
                <a key={idx} href={item.href} target="_blank" rel="noopener noreferrer" style={{
                    display: 'flex', alignItems: 'center', gap: '1rem', color: textColor, textDecoration: 'none', transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = glowColor; e.currentTarget.style.transform = 'translateX(5px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = textColor; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: darkMode ? `${glowColor}10` : `${glowColor}20`, color: glowColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon}
                  </div>
                  <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.85rem' }}>{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div style={{ background: darkMode ? 'rgba(24, 24, 31, 0.6)' : 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(20px)', padding: isMobile ? '2rem 1.5rem' : '3rem', borderRadius: '24px', border: `1px solid ${inputBorder}`, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', color: glowColor, textTransform: 'uppercase' }}>Your Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="sujeet" 
                  style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: titleColor, padding: '1rem', borderRadius: '12px', outline: 'none', transition: 'all 0.3s' }}
                  onFocus={(e) => e.target.style.borderColor = glowColor} onBlur={(e) => e.target.style.borderColor = inputBorder}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', color: glowColor, textTransform: 'uppercase' }}>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="sujeet.cabbagecode@gmail.com" 
                  style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: titleColor, padding: '1rem', borderRadius: '12px', outline: 'none', transition: 'all 0.3s' }}
                  onFocus={(e) => e.target.style.borderColor = glowColor} onBlur={(e) => e.target.style.borderColor = inputBorder}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', color: glowColor, textTransform: 'uppercase' }}>Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="How can I help you?" rows={4} 
                  style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: titleColor, padding: '1rem', borderRadius: '12px', outline: 'none', transition: 'all 0.3s', resize: 'none' }}
                  onFocus={(e) => e.target.style.borderColor = glowColor} onBlur={(e) => e.target.style.borderColor = inputBorder}
                />
              </div>

              <button 
                ref={submitBtnRef} 
                type="submit" 
                disabled={isFlying || submitted}
                style={{
                  padding: '1.2rem', background: submitted ? 'transparent' : glowColor,
                  color: submitted ? glowColor : '#000', fontWeight: 800, fontSize: '0.9rem',
                  border: submitted ? `1px solid ${glowColor}` : 'none', borderRadius: '12px',
                  cursor: (isFlying || submitted) ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                }}
              >
                {isFlying ? 'Sending...' : (submitted ? '✓ Message Delivered!' : 'Send Message')}
                {!isFlying && !submitted && <Send size={18} />}
              </button>

            </form>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

export default Contact;