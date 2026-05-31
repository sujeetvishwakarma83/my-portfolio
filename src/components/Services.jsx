import { useState, useEffect, useRef } from 'react';
import { Monitor, ShoppingBag, Zap, ShieldCheck, ArrowRight, MessageSquare, PenTool, Code, CheckCircle } from 'lucide-react';

function Services({ darkMode }) {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hoveredCard, setHoveredCard] = useState(null);
  const ref = useRef(null);

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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Theme Variables (Matched with Hero & About)
  const sectionBg = darkMode ? '#0A0A0A' : '#f8fafc';
  const titleColor = darkMode ? '#ffffff' : '#0f172a';
  const textColor = darkMode ? '#9ca3af' : '#475569';
  const highlightColor = '#00F5A0';
  const secondaryColor = '#7C3AED';
  const glassBg = darkMode ? 'rgba(20, 20, 20, 0.6)' : 'rgba(255, 255, 255, 0.7)';
  const glassBorder = darkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)';
  const cardHoverBg = darkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.9)';

  const servicesData = [
    {
      id: 1,
      icon: <Monitor size={32} color={highlightColor} />,
      title: 'Custom Web Applications',
      description: 'Scalable and robust web apps tailored to your specific business logic using the MERN stack and PHP.',
      features: ['Dashboard Systems', 'Custom CRMs', 'API Development']
    },
    {
      id: 2,
      icon: <ShoppingBag size={32} color={secondaryColor} />,
      title: 'E-Commerce Solutions',
      description: 'High-converting, secure, and easy-to-manage online stores that turn visitors into loyal customers.',
      features: ['Payment Gateways', 'Inventory Management', 'User-Friendly Checkout']
    },
    {
      id: 3,
      icon: <Zap size={32} color="#38bdf8" />,
      title: 'Business Websites',
      description: 'Professional, SEO-optimized digital identities designed to generate leads and build brand trust.',
      features: ['Responsive Design', 'SEO Optimization', 'Fast Loading']
    },
    {
      id: 4,
      icon: <ShieldCheck size={32} color="#f59e0b" />,
      title: 'Performance & Security',
      description: 'Auditing and upgrading existing websites for lightning-fast speeds and bulletproof security.',
      features: ['Core Web Vitals', 'Cloud Deployment', 'Data Protection']
    }
  ];

  const processData = [
    { icon: <MessageSquare size={24} />, title: '1. Discovery', desc: 'Understanding your business goals and requirements.' },
    { icon: <PenTool size={24} />, title: '2. Architecture', desc: 'Planning the technical stack and user experience.' },
    { icon: <Code size={24} />, title: '3. Development', desc: 'Writing clean, scalable, and secure code.' },
    { icon: <CheckCircle size={24} />, title: '4. Support', desc: 'Deployment and ongoing post-launch maintenance.' }
  ];

  return (
    <section id="services" ref={ref} style={{
      padding: isMobile ? '5rem 1.5rem' : '8rem 4rem',
      background: sectionBg,
      overflow: 'hidden',
      position: 'relative',
      minHeight: '100vh',
    }}>
      
      {/* Background Glowing Blobs */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ 
          position: 'absolute', top: '10%', right: '-10%', 
          width: isMobile ? '250px' : '500px', height: isMobile ? '250px' : '500px', 
          background: `radial-gradient(circle, ${highlightColor}15 0%, transparent 70%)`, 
          filter: 'blur(60px)' 
        }} />
        <div style={{ 
          position: 'absolute', bottom: '10%', left: '-10%', 
          width: isMobile ? '200px' : '400px', height: isMobile ? '200px' : '400px', 
          background: `radial-gradient(circle, ${secondaryColor}15 0%, transparent 70%)`, 
          filter: 'blur(60px)' 
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: isMobile ? '3rem' : '5rem',
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
            marginBottom: '1rem',
            fontWeight: 700
          }}>
            02 // My Services
          </div>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: titleColor,
            margin: '0 0 1rem 0'
          }}>
            Solutions That Drive <span style={{ color: secondaryColor }}>Growth</span>.
          </h2>
          <p style={{
            color: textColor,
            maxWidth: '600px',
            margin: '0 auto',
            fontSize: '1.05rem',
            lineHeight: 1.7
          }}>
            I don't just write code. I build scalable digital products that solve real business problems and deliver exceptional user experiences.
          </p>
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? '1.5rem' : '2.5rem',
          marginBottom: '5rem'
        }}>
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: hoveredCard === service.id ? cardHoverBg : glassBg,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: glassBorder,
                borderRadius: '24px',
                padding: isMobile ? '2rem' : '3rem',
                opacity: visible ? 1 : 0,
                transform: visible 
                  ? (hoveredCard === service.id ? 'translateY(-10px)' : 'translateY(0)') 
                  : 'translateY(40px)',
                transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${visible ? 0 : index * 0.15}s`,
                boxShadow: hoveredCard === service.id 
                  ? `0 20px 40px -10px rgba(0,0,0,0.3), 0 0 20px ${highlightColor}20` 
                  : '0 10px 30px -10px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Top Accent Line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, height: '4px',
                width: hoveredCard === service.id ? '100%' : '0%',
                background: `linear-gradient(90deg, ${highlightColor}, ${secondaryColor})`,
                transition: 'width 0.4s ease'
              }} />

              <div style={{ 
                background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', 
                width: '64px', height: '64px', borderRadius: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.5rem',
                border: glassBorder
              }}>
                {service.icon}
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: titleColor, marginBottom: '1rem' }}>
                {service.title}
              </h3>
              
              <p style={{ color: textColor, lineHeight: 1.7, marginBottom: '2rem', minHeight: isMobile ? 'auto' : '80px' }}>
                {service.description}
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {service.features.map((feature, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: titleColor, fontSize: '0.9rem', fontWeight: 500 }}>
                    <ArrowRight size={16} color={highlightColor} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Development Process Timeline (Trust Builder) */}
        <div style={{
          background: glassBg,
          backdropFilter: 'blur(20px)',
          border: glassBorder,
          borderRadius: '24px',
          padding: isMobile ? '2.5rem 1.5rem' : '4rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s ease 0.6s'
        }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: titleColor, textAlign: 'center', marginBottom: '3rem' }}>
            My Development Process
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            gap: '2rem',
            position: 'relative'
          }}>
            {/* Connecting Line for Desktop */}
            {!isMobile && (
              <div style={{
                position: 'absolute', top: '24px', left: '12%', right: '12%',
                height: '2px', background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                zIndex: 0
              }} />
            )}

            {processData.map((step, index) => (
              <div key={index} style={{ position: 'relative', zIndex: 1, textAlign: isMobile ? 'left' : 'center', display: isMobile ? 'flex' : 'block', gap: isMobile ? '1.5rem' : '0', alignItems: 'flex-start' }}>
                <div style={{
                  width: '50px', height: '50px', borderRadius: '50%',
                  background: darkMode ? '#1A1A1A' : '#ffffff',
                  border: `2px solid ${secondaryColor}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: isMobile ? '0' : '0 auto 1.5rem auto',
                  color: secondaryColor,
                  boxShadow: `0 0 15px ${secondaryColor}30`
                }}>
                  {step.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: titleColor, marginBottom: '0.5rem' }}>{step.title}</h4>
                  <p style={{ color: textColor, fontSize: '0.9rem', lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Services;