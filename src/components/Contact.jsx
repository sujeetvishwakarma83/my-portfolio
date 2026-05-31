import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';

// Custom Icons to avoid lucide-react import issues
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
  const [flightPath, setFlightPath] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });

  const ref = useRef(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const submitBtnRef = useRef(null); // Button tracking

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

  // Light mode background canvas animation
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

    // 1. Calculate Start and End Positions for the Plane
    const btnRect = submitBtnRef.current.getBoundingClientRect();
    const startX = btnRect.left + btnRect.width / 2;
    const startY = btnRect.top + btnRect.height / 2;

    const logoEl = document.getElementById('nav-logo'); // TARGET NAVBAR LOGO
    let endX = 20, endY = 20; // Fallback agar logo na mile
    
    if (logoEl) {
      const logoRect = logoEl.getBoundingClientRect();
      endX = logoRect.left + logoRect.width / 2;
      endY = logoRect.top + logoRect.height / 2;
    }

    setFlightPath({ startX, startY, endX, endY });
    setIsFlying(true); // TRIGGER ANIMATION

    // 2. Form Submission API
    try {
      await fetch("https://script.google.com/macros/s/AKfycbwg_rnIeQpyDmUjieNEnOqvz7UYBvN5hOxTWSPVwsdm_HpML5CO6swtQi-JkiXVHS7BKQ/exec", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      
      setTimeout(() => {
        setIsFlying(false); // End flight animation
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      }, 1000); // 1 sec ki animation timing match kar rahe hain

      setTimeout(() => { setSubmitted(false); }, 4000);

    } catch (error) {
      console.error(error);
      setIsFlying(false);
      alert("Error sending message ❌");
    }
  };

  // Theme Variables
  const sectionBg = darkMode ? '#0A0A0A' : '#f8fafc';
  const titleColor = darkMode ? '#ffffff' : '#0f172a';
  const textColor = darkMode ? '#9ca3af' : '#475569';
  const glowColor = '#00F5A0';
  const inputBg = darkMode ? 'rgba(255,255,255,0.03)' : '#ffffff';
  const inputBorder = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  const contactItems = [
    { icon: <Mail size={18} />, label: 'sujeet8528420907@gmail.com', href: 'mailto:sujeet8528420907@gmail.com' },
    { icon: <GithubIcon size={18} />, label: 'github.com/sujeetvishwakarma83', href: 'https://github.com/sujeetvishwakarma83' },
    { icon: <LinkedinIcon size={18} />, label: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/sujeet-vishwakarma-a19b2323a/' },
    { icon: <MapPin size={18} />, label: 'Jaunpur, India', href: '#' },
  ];

  return (
    <section id="contact" ref={ref} style={{
      padding: isMobile ? '5rem 1.5rem' : '8rem 4rem',
      background: sectionBg, position: 'relative', overflow: 'hidden', minHeight: '100vh',
    }}>

      {/* FLYING PLANE ANIMATION LAYER (Z-index top par) */}
      <AnimatePresence>
        {isFlying && (
          <motion.div
            initial={{ 
              position: 'fixed', left: flightPath.startX, top: flightPath.startY,
              x: '-50%', y: '-50%', scale: 1, opacity: 1, rotate: -45, zIndex: 99999
            }}
            animate={{ 
              left: flightPath.endX, top: flightPath.endY, 
              scale: 0.3, opacity: 0, rotate: 0 
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ pointerEvents: 'none' }}
          >
            <div style={{
              background: glowColor, color: '#000', padding: '15px',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 30px ${glowColor}`
            }}>
              <Send size={28} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Ambience */}
      {!darkMode && <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '20%', right: '5%', width: '300px', height: '300px', background: `radial-gradient(circle, ${glowColor}10 0%, transparent 70%)`, filter: 'blur(60px)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: isMobile ? 'center' : 'left', marginBottom: '4rem' }}>
          <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.8rem', letterSpacing: '0.15em', color: glowColor, textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 700 }}>
            07 // Get In Touch
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', color: titleColor }}>
            Ready to <span style={{ color: glowColor }}>Collaborate?</span>
          </h2>
        </div>

        {/* Grid Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: isMobile ? '3rem' : '5rem' }}
        >
          {/* Left - Contact Info */}
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

          {/* Right - Form Container */}
          <div style={{ background: darkMode ? 'rgba(24, 24, 31, 0.6)' : 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(20px)', padding: isMobile ? '2rem 1.5rem' : '3rem', borderRadius: '24px', border: `1px solid ${inputBorder}`, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', color: glowColor, textTransform: 'uppercase' }}>Your Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" 
                  style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: titleColor, padding: '1rem', borderRadius: '12px', outline: 'none', transition: 'all 0.3s' }}
                  onFocus={(e) => e.target.style.borderColor = glowColor} onBlur={(e) => e.target.style.borderColor = inputBorder}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', color: glowColor, textTransform: 'uppercase' }}>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@company.com" 
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

              {/* Submit Button - REF attached here for animation tracking */}
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