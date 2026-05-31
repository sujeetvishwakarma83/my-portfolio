import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Target, MessageSquare, Code2, ShieldCheck } from 'lucide-react';

const reasonsData = [
  {
    id: 1,
    icon: <Target size={32} />,
    title: "Business-First Approach",
    description: "I don't just write code; I build solutions. Every feature I develop is aimed at solving your specific business problems, increasing ROI, and improving user engagement."
  },
  {
    id: 2,
    icon: <MessageSquare size={32} />,
    title: "Transparent Communication",
    description: "No ghosting, no confusing tech jargons. I provide regular progress updates, stick to strict deadlines, and ensure we are always on the same page from day one."
  },
  {
    id: 3,
    icon: <Code2 size={32} />,
    title: "Clean & Scalable Architecture",
    description: "Using the robust MERN stack and PHP, I deliver clean, well-documented, and modular code that is easy to maintain and scale as your business grows."
  },
  {
    id: 4,
    icon: <ShieldCheck size={32} />,
    title: "Reliable Post-Launch Support",
    description: "My responsibility doesn't end at delivery. I provide dedicated post-launch support and bug-fixing to ensure your digital product runs flawlessly in the real world."
  }
];

function WhyHireMe({ darkMode }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const ref = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sectionBg = darkMode ? '#0A0A0A' : '#f8fafc';
  const titleColor = darkMode ? '#ffffff' : '#0f172a';
  const textColor = darkMode ? '#9ca3af' : '#475569';
  const glowColor = '#00F5A0';
  const cardBg = darkMode ? 'rgba(24, 24, 31, 0.6)' : 'rgba(255, 255, 255, 0.7)';
  const cardBorder = darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

  return (
    <section id="why-hire-me" ref={ref} style={{
      padding: isMobile ? '5rem 1.5rem' : '8rem 4rem',
      background: sectionBg,
      position: 'relative',
      overflow: 'hidden',
    }}>
      
      {/* Background Ambience */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ 
          position: 'absolute', top: '20%', left: '10%', 
          width: isMobile ? '200px' : '400px', height: isMobile ? '200px' : '400px', 
          background: `radial-gradient(circle, ${glowColor}10 0%, transparent 70%)`, 
          filter: 'blur(60px)' 
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto' }}>

        {/* Section Header */}
        <div style={{ textAlign: isMobile ? 'center' : 'center', marginBottom: '4rem' }}>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.8rem',
            letterSpacing: '0.15em',
            color: glowColor,
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
            fontWeight: 700
          }}>
            06 // Trust & Value
          </div>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: titleColor,
          }}>
            Why Hire <span style={{ color: glowColor }}>Me?</span>
          </h2>
          <p style={{
            color: textColor,
            maxWidth: '600px',
            margin: '1rem auto 0',
            fontSize: '1.05rem',
            lineHeight: 1.7
          }}>
            Partner with a developer who values your business goals as much as the code.
          </p>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '2rem', 
        }}>
          {reasonsData.map((reason, index) => (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -5, borderColor: glowColor }}
              style={{
                background: cardBg,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: `1px solid ${cardBorder}`,
                padding: isMobile ? '2rem 1.5rem' : '2.5rem',
                borderRadius: '20px',
                transition: 'border-color 0.3s ease',
              }}
            >
              <div style={{
                width: '60px', height: '60px',
                borderRadius: '16px',
                background: `${glowColor}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: glowColor,
                marginBottom: '1.5rem',
                border: `1px solid ${glowColor}30`
              }}>
                {reason.icon}
              </div>
              
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: titleColor, marginBottom: '0.8rem' }}>
                {reason.title}
              </h3>
              
              <p style={{ color: textColor, lineHeight: 1.7, fontSize: '0.95rem', margin: 0 }}>
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyHireMe;