import React, { useEffect, useRef, useState } from 'react';

function Footer({ darkMode }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showModal, setShowModal] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      t += 0.005;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      const g1x = w * (0.2 + 0.15 * Math.sin(t));
      const g1y = h * (0.5 + 0.3 * Math.cos(t * 0.7));
      const grad1 = ctx.createRadialGradient(g1x, g1y, 0, g1x, g1y, w * 0.4);
      grad1.addColorStop(0, darkMode? 'rgba(0,245,160,0.18)' : 'rgba(0,200,130,0.15)');
      grad1.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);

      const g2x = w * (0.75 + 0.15 * Math.cos(t * 0.8));
      const g2y = h * (0.5 + 0.3 * Math.sin(t * 0.6));
      const grad2 = ctx.createRadialGradient(g2x, g2y, 0, g2x, g2y, w * 0.35);
      grad2.addColorStop(0, darkMode? 'rgba(124,58,237,0.2)' : 'rgba(124,58,237,0.12)');
      grad2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      const g3x = w * (0.5 + 0.2 * Math.sin(t * 1.1 + 1));
      const g3y = h * (0.5 + 0.2 * Math.cos(t * 0.9 + 2));
      const grad3 = ctx.createRadialGradient(g3x, g3y, 0, g3x, g3y, w * 0.25);
      grad3.addColorStop(0, darkMode? 'rgba(0,180,255,0.1)' : 'rgba(0,150,220,0.08)');
      grad3.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, w, h);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [darkMode]);

  const socialLinks = [
    {
      label: 'GitHub',
      href: 'https://github.com/sujeetvishwakarma83',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0.319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sujeet-vishwakarma-a19b2323a/',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0.774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24.774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      label: 'Fiverr',
      href: 'https://www.fiverr.com/sujeet83/',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.004 15.588a.995.995 0 1 0.002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-1.74c.038-.196.064-.402.064-.643V8.716h1.3a.95.95 0 0 0 0-1.9h-1.3v-1.3a.95.95 0 0 0-1.9 0v5.724c0.241.026.447.064.643h-1.616c.037-.196.063-.402.063-.643V5.515a.95.95 0 0 0-1.9 0v5.724c0.241.025.447.063.643h-1.481V8.716h.427a.95.95 0 0 0 0-1.9h-.427V5.984c0-1.68 1.08-1.867 1.58-1.867.42 0.77.136.77.136a.95.95 0 0 0.636-1.789s-.55-.247-1.406-.247c-1.83 0-3.48 1.253-3.48 3.767v.832h-1.315a.95.95 0 0 0 0 1.9h1.315v2.968c0.57-.117 1.002-.315 1.33-.201.33-.48.542-.84.657a.95.95 0 0 0.568 1.813c.83-.26 1.52-.76 1.99-1.488.338-.527.522-1.162.573-1.848h1.44c.345 1.382 1.596 2.408 3.086 2.408 1.489 0 2.74-1.026 3.085-2.408h1.559a.95.95 0 0-1.9z"/>
        </svg>
      ),
    },
  ];

  const quickLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  const techStack = ['React.js', 'Next.js', 'Node.js', 'MongoDB', 'Express', 'AWS'];

  const footerBg = darkMode? '#0d0d14' : '#e8f5f0';
  const borderColor = darkMode? 'rgba(255,255,255,0.07)' : 'rgba(0,150,100,0.15)';
  const textColor = darkMode? '#6b6b7a' : '#4a7a65';
  const linkColor = darkMode? '#9ca3af' : '#4a7a65';
  const glowColor = '#00f5a0';
  const cardBg = darkMode? 'rgba(255,255,255,0.03)' : 'rgba(0,150,100,0.05)';

  const handleHireMe = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      const heroSection = document.getElementById('hero');
      if (heroSection) heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Professional English Content
  const modalContent = {
    privacy: {
      title: 'Privacy Policy',
      content: `
        <h3>Information Collection</h3>
        <p>I collect only the information you voluntarily provide through the contact form, including your name, email address, and project requirements.</p>

        <h3>Use of Information</h3>
        <p>Your personal information is used exclusively for project communication, proposal preparation, and service delivery. I do not share, sell, or distribute your data to third parties.</p>

        <h3>Client Confidentiality</h3>
        <p>All client projects, source code, business concepts, and proprietary information are treated with strict confidentiality. Non-Disclosure Agreements (NDA) are available upon request.</p>

        <h3>Data Security</h3>
        <p>I implement appropriate technical measures to protect your personal information against unauthorized access, alteration, or disclosure.</p>

        <h3>Cookies & Analytics</h3>
        <p>This website uses basic analytics cookies to understand visitor behavior and improve user experience. No personal identification is tracked.</p>

        <h3>Third-Party Services</h3>
        <p>Payment processing and communication may involve trusted third-party services like PayPal or Stripe, which maintain their own privacy policies.</p>

        <h3>Your Rights</h3>
        <p>You have the right to request access, correction, or deletion of your personal data at any time.</p>

        <h3>Contact</h3>
        <p>For privacy-related inquiries: <strong>sujeet8528420907@gmail.com</strong></p>
        <p style="margin-top: 1.5rem; font-size: 0.8rem; color: #6b6b7a;">Last updated: June 2026</p>
      `
    },
    terms: {
      title: 'Terms of Service',
      content: `
        <h3>Service Overview</h3>
        <p>I provide professional Fullstack Web Development services specializing in MERN stack (MongoDB, Express.js, React.js, Node.js), RESTful API development, and cloud deployment on AWS/Vercel.</p>

        <h3>Project Workflow</h3>
        <p>1. <strong>Discovery:</strong> Requirements analysis and technical consultation<br/>
        2. <strong>Proposal:</strong> Detailed quote with timeline and deliverables<br/>
        3. <strong>Agreement:</strong> 50% advance payment to commence work<br/>
        4. <strong>Development:</strong> Regular progress updates and previews<br/>
        5. <strong>Revision:</strong> Up to 2 rounds of revisions included<br/>
        6. <strong>Delivery:</strong> Final payment and handover of source code</p>

        <h3>Payment Structure</h3>
        <p><strong>Small Projects (<$500):</strong> 50% upfront, 50% on completion<br/>
        <strong>Large Projects (>$500):</strong> Milestone-based payments<br/>
        <strong>Payment Methods:</strong> UPI, Bank Transfer, PayPal, Wise</p>

        <h3>Revisions & Changes</h3>
        <p>Two rounds of revisions are included in the quoted price. Additional changes beyond the original scope are billed at $25/hour. Major scope changes require a new agreement.</p>

        <h3>Timeline & Delivery</h3>
        <p>Project timelines are estimated based on scope and complexity. Any delays will be communicated promptly. Rush delivery is available at an additional cost.</p>

        <h3>Intellectual Property</h3>
        <p>Upon full payment, you receive complete ownership of the source code and all deliverables. I retain the right to showcase the project in my portfolio unless an NDA is signed.</p>

        <h3>Code Quality & Support</h3>
        <p>All code follows industry best practices and includes documentation. Post-delivery bug fixes are provided free for 30 days. Ongoing maintenance available separately.</p>

        <h3>Refund Policy</h3>
        <p>Advance payments are non-refundable once development begins. If I am unable to deliver the agreed scope, a full refund will be issued.</p>

        <h3>Cancellation</h3>
        <p>Either party may terminate the project with written notice. Payment is required for work completed up to the termination date.</p>

        <h3>Limitation of Liability</h3>
        <p>I strive for excellence but cannot guarantee uninterrupted service or be liable for indirect damages arising from the use of delivered products.</p>

        <h3>Contact</h3>
        <p>For questions regarding these terms: <strong>sujeet8528420907@gmail.com</strong></p>
        <p style="margin-top: 1.5rem; font-size: 0.8rem; color: #6b6b7a;">Last updated: June 2026</p>
      `
    }
  };

  return (
    <>
      <footer style={{
        background: footerBg,
        borderTop: `1px solid ${borderColor}`,
        position: 'relative',
        overflow: 'hidden',
      }}>

        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            pointerEvents: 'none',
          }}
        />

        <div style={{
          position: 'relative', zIndex: 1,
          padding: isMobile? '3rem 1.5rem 2rem' : '4rem 4rem 2.5rem',
        }}>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile? '1fr' : '2fr 1fr 1fr',
            gap: isMobile? '2.5rem' : '3rem',
            marginBottom: '3rem',
          }}>

            <div style={{ textAlign: isMobile? 'center' : 'left' }}>
              <div style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '1.5rem',
                color: glowColor,
                letterSpacing: '0.05em',
                marginBottom: '0.8rem',
                fontWeight: 800,
              }}>
                Sujeet Vishwakarma
              </div>
              <p style={{
                fontSize: '0.9rem',
                color: textColor,
                lineHeight: 1.7,
                marginBottom: '1.2rem',
                maxWidth: '400px',
                margin: isMobile? '0 auto 1.2rem' : '0 0 1.2rem 0'
              }}>
                Fullstack Developer building scalable web apps & APIs. Specialized in MERN stack with cloud deployment.
              </p>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.75rem',
                color: glowColor,
                background: darkMode? 'rgba(0,245,160,0.1)' : 'rgba(0,200,130,0.15)',
                padding: '0.4rem 0.9rem',
                borderRadius: '50px',
                border: `1px solid ${glowColor}40`,
                marginBottom: '1.5rem',
                fontFamily: '"Space Mono", monospace',
                fontWeight: 600,
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: glowColor,
                  boxShadow: `0 0 10px ${glowColor}`,
                  animation: 'pulse 2s infinite'
                }}></span>
                Available for Projects
              </div>

              <div>
                <button
                  onClick={handleHireMe}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.85rem',
                    color: '#000',
                    background: glowColor,
                    padding: '0.8rem 1.8rem',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 700,
                    letterSpacing: '0.03em',
                    transition: 'all 0.3s',
                    boxShadow: `0 4px 15px -3px ${glowColor}80`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = `0 8px 25px -5px ${glowColor}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 4px 15px -3px ${glowColor}80`;
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4 4h16c1.1 0 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Hire Me
                </button>
              </div>
            </div>

            <div style={{ textAlign: isMobile? 'center' : 'left' }}>
              <h4 style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.9rem',
                color: darkMode? '#fff' : '#000',
                marginBottom: '1.2rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 700,
              }}>
                Quick Links
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {quickLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    style={{
                      fontSize: '0.85rem',
                      color: linkColor,
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      fontFamily: '"Space Mono", monospace',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = glowColor;
                      e.currentTarget.style.paddingLeft = '5px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = linkColor;
                      e.currentTarget.style.paddingLeft = '0';
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div style={{ textAlign: isMobile? 'center' : 'left' }}>
              <h4 style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.9rem',
                color: darkMode? '#fff' : '#000',
                marginBottom: '1.2rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 700,
              }}>
                Connect
              </h4>

              <a
                href="mailto:sujeet83@zohomail.in"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontSize: '0.85rem',
                  color: linkColor,
                  textDecoration: 'none',
                  marginBottom: '1rem',
                  justifyContent: isMobile? 'center' : 'flex-start',
                  transition: 'color 0.2s',
                  fontFamily: '"Space Mono", monospace',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = glowColor}
                onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                sujeet83@zohomail.in
              </a>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.85rem',
                color: textColor,
                marginBottom: '1.2rem',
                justifyContent: isMobile? 'center' : 'flex-start',
                fontFamily: '"Space Mono", monospace',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Jaunpur, UP, India | Remote Worldwide
              </div>

              <div style={{
                display: 'flex',
                gap: '0.8rem',
                flexWrap: 'wrap',
                justifyContent: isMobile? 'center' : 'flex-start',
              }}>
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '38px',
                      height: '38px',
                      color: linkColor,
                      border: `1px solid ${borderColor}`,
                      borderRadius: '8px',
                      background: cardBg,
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = glowColor;
                      e.currentTarget.style.borderColor = glowColor;
                      e.currentTarget.style.background = darkMode? 'rgba(0,245,160,0.1)' : 'rgba(0,150,100,0.15)';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = linkColor;
                      e.currentTarget.style.borderColor = borderColor;
                      e.currentTarget.style.background = cardBg;
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>

          <div style={{
            borderTop: `1px solid ${borderColor}`,
            paddingTop: '2rem',
            marginBottom: '2rem',
          }}>
            <p style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.75rem',
              color: textColor,
              marginBottom: '1rem',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              Tech Stack
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.6rem',
              justifyContent: 'center',
            }}>
              {techStack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontSize: '0.7rem',
                    color: linkColor,
                    background: cardBg,
                    border: `1px solid ${borderColor}`,
                    padding: '0.4rem 0.8rem',
                    borderRadius: '6px',
                    fontFamily: '"Space Mono", monospace',
                    fontWeight: 600,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        <div style={{
          position: 'relative', zIndex: 1,
          borderTop: `1px solid ${borderColor}`,
          padding: isMobile? '1.5rem' : '1.5rem 4rem',
          display: 'flex',
          flexDirection: isMobile? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile? 'column' : 'row',
            gap: isMobile? '0.5rem' : '1.5rem',
            alignItems: 'center',
          }}>
            <p style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.75rem',
              color: textColor,
              margin: 0,
              textAlign: isMobile? 'center' : 'left'
            }}>
              © 2026 Sujeet Vishwakarma. All Rights Reserved.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setShowModal('privacy')}
                style={{
                  fontSize: '0.7rem',
                  color: textColor,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: '"Space Mono", monospace',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = glowColor}
                onMouseLeave={(e) => e.currentTarget.style.color = textColor}
              >
                Privacy
              </button>
              <button
                onClick={() => setShowModal('terms')}
                style={{
                  fontSize: '0.7rem',
                  color: textColor,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: '"Space Mono", monospace',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = glowColor}
                onMouseLeave={(e) => e.currentTarget.style.color = textColor}
              >
                Terms
              </button>
            </div>
          </div>

          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.7rem',
            color: textColor,
            margin: 0,
          }}>
            Built with Next.js & ☕
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.7rem',
              color: glowColor,
              background: 'transparent',
              border: `1px solid ${glowColor}50`,
              padding: '0.6rem 1.2rem',
              borderRadius: '50px',
              cursor: 'pointer',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              fontWeight: 700,
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = glowColor;
              e.currentTarget.style.color = '#000';
              e.currentTarget.style.borderColor = glowColor;
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 10px 20px -5px ${glowColor}50`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = glowColor;
              e.currentTarget.style.borderColor = `${glowColor}50`;
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
            Back to Top
          </button>

        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>

      </footer>

      {showModal && (
        <div
          onClick={() => setShowModal(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            animation: 'fadeIn 0.2s',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: footerBg,
              borderRadius: '16px',
              border: `1px solid ${borderColor}`,
              maxWidth: '650px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              animation: 'slideUp 0.3s',
            }}
          >
            <div style={{
              padding: '1.5rem 2rem',
              borderBottom: `1px solid ${borderColor}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <h2 style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '1.3rem',
                color: glowColor,
                margin: 0,
                fontWeight: 700,
              }}>
                {modalContent[showModal].title}
              </h2>
              <button
                onClick={() => setShowModal(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: textColor,
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = cardBg;
                  e.currentTarget.style.color = glowColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                  e.currentTarget.style.color = textColor;
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div
              style={{
                padding: '2rem',
                overflowY: 'auto',
                maxHeight: 'calc(80vh - 80px)',
                color: textColor,
                fontSize: '0.9rem',
                lineHeight: 1.8,
              }}
              dangerouslySetInnerHTML={{ __html: modalContent[showModal].content }}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
}

export default Footer;