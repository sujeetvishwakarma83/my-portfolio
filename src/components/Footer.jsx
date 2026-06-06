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
        
<svg fill="#000000" width="800px" height="800px" viewBox="0 -0.5 25 25" xmlns="http://www.w3.org/2000/svg"><path d="m12.301 0h.093c2.242 0 4.34.613 6.137 1.68l-.055-.031c1.871 1.094 3.386 2.609 4.449 4.422l.031.058c1.04 1.769 1.654 3.896 1.654 6.166 0 5.406-3.483 10-8.327 11.658l-.087.026c-.063.02-.135.031-.209.031-.162 0-.312-.054-.433-.144l.002.001c-.128-.115-.208-.281-.208-.466 0-.005 0-.01 0-.014v.001q0-.048.008-1.226t.008-2.154c.007-.075.011-.161.011-.249 0-.792-.323-1.508-.844-2.025.618-.061 1.176-.163 1.718-.305l-.076.017c.573-.16 1.073-.373 1.537-.642l-.031.017c.508-.28.938-.636 1.292-1.058l.006-.007c.372-.476.663-1.036.84-1.645l.009-.035c.209-.683.329-1.468.329-2.281 0-.045 0-.091-.001-.136v.007c0-.022.001-.047.001-.072 0-1.248-.482-2.383-1.269-3.23l.003.003c.168-.44.265-.948.265-1.479 0-.649-.145-1.263-.404-1.814l.011.026c-.115-.022-.246-.035-.381-.035-.334 0-.649.078-.929.216l.012-.005c-.568.21-1.054.448-1.512.726l.038-.022-.609.384c-.922-.264-1.981-.416-3.075-.416s-2.153.152-3.157.436l.081-.02q-.256-.176-.681-.433c-.373-.214-.814-.421-1.272-.595l-.066-.022c-.293-.154-.64-.244-1.009-.244-.124 0-.246.01-.364.03l.013-.002c-.248.524-.393 1.139-.393 1.788 0 .531.097 1.04.275 1.509l-.01-.029c-.785.844-1.266 1.979-1.266 3.227 0 .025 0 .051.001.076v-.004c-.001.039-.001.084-.001.13 0 .809.12 1.591.344 2.327l-.015-.057c.189.643.476 1.202.85 1.693l-.009-.013c.354.435.782.793 1.267 1.062l.022.011c.432.252.933.465 1.46.614l.046.011c.466.125 1.024.227 1.595.284l.046.004c-.431.428-.718 1-.784 1.638l-.001.012c-.207.101-.448.183-.699.236l-.021.004c-.256.051-.549.08-.85.08-.022 0-.044 0-.066 0h.003c-.394-.008-.756-.136-1.055-.348l.006.004c-.371-.259-.671-.595-.881-.986l-.007-.015c-.198-.336-.459-.614-.768-.827l-.009-.006c-.225-.169-.49-.301-.776-.38l-.016-.004-.32-.048c-.023-.002-.05-.003-.077-.003-.14 0-.273.028-.394.077l.007-.003q-.128.072-.08.184c.039.086.087.16.145.225l-.001-.001c.061.072.13.135.205.19l.003.002.112.08c.283.148.516.354.693.603l.004.006c.191.237.359.505.494.792l.01.024.16.368c.135.402.38.738.7.981l.005.004c.3.234.662.402 1.057.478l.016.002c.33.064.714.104 1.106.112h.007c.045.002.097.002.15.002.261 0 .517-.021.767-.062l-.027.004.368-.064q0 .609.008 1.418t.008.873v.014c0 .185-.08.351-.208.466h-.001c-.119.089-.268.143-.431.143-.075 0-.147-.011-.214-.032l.005.001c-4.929-1.689-8.409-6.283-8.409-11.69 0-2.268.612-4.393 1.681-6.219l-.032.058c1.094-1.871 2.609-3.386 4.422-4.449l.058-.031c1.739-1.034 3.835-1.645 6.073-1.645h.098-.005zm-7.64 17.666q.048-.112-.112-.192-.16-.048-.208.032-.048.112.112.192.144.096.208-.032zm.497.545q.112-.08-.032-.256-.16-.144-.256-.048-.112.08.032.256.159.157.256.047zm.48.72q.144-.112 0-.304-.128-.208-.272-.096-.144.08 0 .288t.272.112zm.672.673q.128-.128-.064-.304-.192-.192-.32-.048-.144.128.064.304.192.192.32.044zm.913.4q.048-.176-.208-.256-.24-.064-.304.112t.208.24q.24.097.304-.096zm1.009.08q0-.208-.272-.176-.256 0-.256.176 0 .208.272.176.256.001.256-.175zm.929-.16q-.032-.176-.288-.144-.256.048-.224.24t.288.128.225-.224z"/></svg>
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
        <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
fill="currentColor" viewBox="0 0 24 24" >
<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m2.41 5.29a1.06 1.06 0 1 1-1.06 1.06 1.06 1.06 0 0 1 1.06-1.06m2 9.38h-3.89v-1.58h.82v-3.35H10.7v3.35h1v1.58h-4v-1.58h.83v-3.35h-.9v-1.59h.89v-.27c0-2.14 1.86-2.42 2.88-2.42a7 7 0 0 1 .77 0v1.76a2.5 2.5 0 0 0-.53 0c-.31 0-.94 0-.94.64v.32h4.84v4.95h.83z"/>
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
        <p>For privacy-related inquiries: <strong>sujeet.cabbagecode@gmail.com</strong></p>
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
        <p>For questions regarding these terms: <strong>sujeet.cabbagecode@gmail.com</strong></p>
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