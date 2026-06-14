import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonialsData = [
  {
    name: 'Aarav Sharma',
    role: 'CEO, Sharma Furnitures',
    text: 'Sujeet revamped our furniture store. The MERN stack shop he built has increased our conversions by 40% and functions flawlessly. His professionalism is top-notch.',
    rating: 5,
    avatarColor: '#00F5A0'
  },
  {
    name: 'Priya Patel',
    role: 'Founder, EdTech Solutions',
    text: 'The Student Management System Sujeet built is lightning fast, secure, and extremely easy to use. He has an excellent grasp of database architecture and API design.',
    rating: 5,
    avatarColor: '#7C3AED'
  },
  {
    name: 'David Miller',
    role: 'Product Manager, AppTech',
    text: 'A brilliant developer who is focused on results. He delivered our dashboard ahead of schedule, with clean code, solid performance, and premium animations.',
    rating: 5,
    avatarColor: '#38bdf8'
  }
];

function Testimonials({ darkMode, bookMode = false }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (bookMode) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [bookMode]);

  const titleColor = darkMode ? '#ffffff' : '#0f172a';
  const textColor = darkMode ? '#9ca3af' : '#475569';
  const highlightColor = '#00F5A0';
  const glassBg = darkMode ? 'rgba(20, 20, 20, 0.6)' : 'rgba(255, 255, 255, 0.7)';
  const glassBorder = darkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)';

  if (bookMode) {
    return (
      <div style={{
        padding: '2rem 1.5rem',
        fontFamily: '"Inter", sans-serif',
        color: titleColor,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        boxSizing: 'border-box'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            color: highlightColor,
            textTransform: 'uppercase',
            marginBottom: '0.25rem',
            fontWeight: 700
          }}>
            06 // Reviews
          </div>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: 0
          }}>
            Client <span style={{ color: highlightColor }}>Feedback</span>.
          </h2>
        </div>

        {/* Testimonials List - Compacted for Book Mode */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          flexGrow: 1,
        }}>
          {testimonialsData.map((t, idx) => (
            <div
              key={idx}
              style={{
                background: darkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                border: glassBorder,
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                position: 'relative'
              }}
            >
              {/* Star Rating */}
              <div style={{ display: 'flex', gap: '2px', marginBottom: '0.25rem' }}>
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={10} fill="#D4AF37" stroke="none" />
                ))}
              </div>

              <p style={{
                fontSize: '0.78rem',
                lineHeight: 1.4,
                color: textColor,
                margin: '0 0 0.5rem 0',
                fontStyle: 'italic'
              }}>
                "{t.text}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: `${t.avatarColor}20`,
                  color: t.avatarColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  border: `1px solid ${t.avatarColor}40`
                }}>
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.78rem', fontWeight: 700 }}>{t.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.65rem', color: textColor }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Scroll Mode (Mobile / Full Page)
  return (
    <section id="testimonials" ref={ref} style={{
      padding: isMobile ? '5rem 1.5rem' : '8rem 4rem',
      background: 'transparent',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '5%',
          width: isMobile ? '200px' : '400px',
          height: isMobile ? '200px' : '400px',
          background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease'
        }}>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.8rem',
            letterSpacing: '0.15em',
            color: highlightColor,
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
            fontWeight: 700
          }}>
            06 // Client Feedback
          </div>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: titleColor,
            margin: 0
          }}>
            What My Clients <span style={{ color: highlightColor }}>Say</span>.
          </h2>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '2rem'
        }}>
          {testimonialsData.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              style={{
                background: glassBg,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: glassBorder,
                borderRadius: '24px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                color: `${highlightColor}20`,
                pointerEvents: 'none'
              }}>
                <Quote size={40} />
              </div>

              <div>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '1rem' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#D4AF37" stroke="none" />
                  ))}
                </div>

                <p style={{
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: textColor,
                  marginBottom: '2rem',
                  fontStyle: 'italic'
                }}>
                  "{t.text}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: `${t.avatarColor}15`,
                  color: t.avatarColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1rem',
                  border: `1px solid ${t.avatarColor}30`
                }}>
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: titleColor }}>{t.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: textColor, fontWeight: 500 }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
