import React, { useEffect, useState } from 'react';
import myLogo from '../assets/logo.png';

function Footer({ darkMode }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showModal, setShowModal] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const socialLinks = [
    {
      label: 'GitHub',
      href: 'https://github.com/sujeetvishwakarma83',
      color: darkMode ? '#ffffff' : '#181717',
      icon: (
        <svg fill="currentColor" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sujeet-vishwakarma-a19b2323a/',
      color: '#0077B5',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0.774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24.774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      label: 'Fiverr',
      href: 'https://www.fiverr.com/sujeet83/',
      color: '#1DBF73',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m2.41 5.29a1.06 1.06 0 1 1-1.06 1.06 1.06 1.06 0 0 1 1.06-1.06m2 9.38h-3.89v-1.58h.82v-3.35H10.7v3.35h1v1.58h-4v-1.58h.83v-3.35h-.9v-1.59h.89v-.27c0-2.14 1.86-2.42 2.88-2.42a7 7 0 0 1 .77 0v1.76a2.5 2.5 0 0 0-.53 0c-.31 0-.94 0-.94.64v.32h4.84v4.95h.83z"/>
        </svg>
      ),
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@SujeetCabbageCode',
      color: '#FF0000',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.002 3.002 0 0 0-2.11 2.108C0 8.028 0 12 0 12s0 3.972.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.475 20.455 12 20.455 12 20.455s7.524 0 9.388-.51a3.003 3.003 0 0 0 2.11-2.108C24 15.972 24 12 24 12s0-3.972-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/cabbage_code/',
      color: '#E1306C',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>
        </svg>
      ),
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/917800383448',
      color: '#25D366',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 2.519 1.334 4.515 1.335 5.51.001 9.997-4.486 10-10 .002-2.641-1.03-5.124-2.906-7C16.327 1.618 13.847.585 11.993.585 6.492.585 2.005 5.072 2.001 10.572c-.001 1.902.486 3.242 1.366 4.936l-.997 3.642 3.731-.978L6.647 19.15zm10.21-6.141c-.272-.137-1.614-.796-1.863-.887-.249-.09-.431-.137-.613.137-.182.273-.703.887-.862 1.07-.159.182-.317.205-.59.069-.272-.136-1.15-.424-2.19-1.353-.809-.721-1.355-1.614-1.514-1.886-.159-.273-.017-.42.12-.556.122-.122.272-.318.408-.477.136-.159.182-.273.272-.455.09-.182.046-.341-.023-.477-.069-.136-.613-1.477-.84-2.023-.22-.53-.443-.457-.613-.466-.159-.008-.34-.01-.522-.01-.182 0-.476.069-.726.341-.25.272-.953.932-.953 2.273 0 1.341.977 2.636 1.113 2.818.136.182 1.92 2.931 4.65 4.113.65.28 1.157.448 1.554.574.654.208 1.25.179 1.721.109.525-.078 1.614-.659 1.841-1.295.227-.636.227-1.182.159-1.295-.068-.113-.249-.205-.522-.341z"/>
        </svg>
      ),
    },
    {
      label: 'Email',
      href: 'mailto:sujeet.cabbagecode@gmail.com',
      color: '#EA4335',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6"/>
        </svg>
      ),
    },
  ];

  const quickLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const techStack = ['React.js', 'Next.js', 'Node.js', 'MongoDB', 'Express', 'AWS', 'Tailwind CSS'];

  const footerBg = darkMode ? 'rgba(8, 12, 24, 0.75)' : 'rgba(248, 250, 252, 0.85)';
  const borderColor = darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.06)';
  const textColor = darkMode ? '#94a3b8' : '#475569';
  const headingColor = darkMode ? '#f8fafc' : '#0f172a';
  const glowColor = '#00F5A0'; // neon green
  const accentColor = '#D4AF37'; // gold
  const cardBg = darkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(15, 23, 42, 0.02)';

  const handleHireMe = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        <p><strong>Small Projects (&lt;$500):</strong> 50% upfront, 50% on completion<br/>
        <strong>Large Projects (&gt;$500):</strong> Milestone-based payments<br/>
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
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        position: 'relative',
        zIndex: 10,
        transition: 'all 0.3s ease',
      }}>
        {/* Luxury gold accent line at the very top */}
        <div style={{
          height: '2px',
          width: '100%',
          background: `linear-gradient(90deg, transparent 0%, ${accentColor} 50%, transparent 100%)`,
          opacity: 0.7,
        }} />

        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '3.5rem 1.5rem 2.5rem' : '5rem 4rem 3rem',
        }}>
          {/* Main Grid Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '2.2fr 1fr 1.2fr',
            gap: isMobile ? '3rem' : '4rem',
            marginBottom: '4rem',
          }}>
            {/* Column 1: Intro */}
            <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
              <a 
                href="#hero" 
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setTimeout(() => {
                    window.location.hash = '';
                    window.location.reload();
                  }, 400);
                }}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  textDecoration: 'none', 
                  marginBottom: '1.2rem',
                  justifyContent: isMobile ? 'center' : 'flex-start'
                }}
              >
                <img 
                  src={myLogo} 
                  alt="My Logo" 
                  style={{
                    height: '38px', 
                    width: 'auto',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, filter 0.3s ease',
                    filter: darkMode 
                      ? 'brightness(1.3) contrast(1.1) drop-shadow(1px 0px 0px rgba(255, 255, 255, 0.9)) drop-shadow(-1px 0px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0px 1px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0px -1px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0px 0px 8px rgba(0, 245, 160, 0.35))' 
                      : 'none'
                  }} 
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </a>
              <p style={{
                fontSize: '0.92rem',
                color: textColor,
                lineHeight: 1.75,
                marginBottom: '1.5rem',
                maxWidth: '440px',
                margin: isMobile ? '0 auto 1.5rem' : '0 0 1.5rem 0'
              }}>
                Fullstack Web Developer building high-performance scalable web applications, custom APIs, and premium digital experiences. Specialized in the MERN stack and cloud deployment.
              </p>

              {/* Status Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.75rem',
                color: glowColor,
                background: 'rgba(0, 245, 160, 0.06)',
                padding: '0.45rem 1rem',
                borderRadius: '50px',
                border: `1px solid rgba(0, 245, 160, 0.18)`,
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
                  animation: 'pulse-badge 2s infinite'
                }} />
                AVAILABLE FOR PROJECTS
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
                    padding: '0.85rem 2rem',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: `0 4px 20px -3px rgba(0, 245, 160, 0.35)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = `0 8px 30px -5px ${glowColor}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 4px 20px -3px rgba(0, 245, 160, 0.35)`;
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4 4h16c1.1 0 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Let's Connect
                </button>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
              <h4 style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.95rem',
                color: headingColor,
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 700,
              }}>
                Navigation
              </h4>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '0.8rem 1rem', 
                maxWidth: '220px', 
                margin: isMobile ? '0 auto' : '0' 
              }}>
                {quickLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    style={{
                      fontSize: '0.85rem',
                      color: textColor,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      fontFamily: '"Space Mono", monospace',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = accentColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = textColor;
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3: Contact & Socials */}
            <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
              <h4 style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.95rem',
                color: headingColor,
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 700,
              }}>
                Contact Info
              </h4>

              <a
                href="mailto:sujeet.cabbagecode@gmail.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontSize: '0.88rem',
                  color: textColor,
                  textDecoration: 'none',
                  marginBottom: '1rem',
                  transition: 'color 0.2s ease',
                  fontFamily: '"Space Mono", monospace',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                onMouseLeave={(e) => e.currentTarget.style.color = textColor}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                sujeet.cabbagecode@gmail.com
              </a>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.88rem',
                color: textColor,
                marginBottom: '1.8rem',
                justifyContent: isMobile ? 'center' : 'flex-start',
                fontFamily: '"Space Mono", monospace',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Jaunpur, India | Remote
              </div>

              {/* Social Row */}
              <div style={{
                display: 'flex',
                gap: '0.8rem',
                justifyContent: isMobile ? 'center' : 'flex-start',
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
                      width: '42px',
                      height: '42px',
                      color: link.color,
                      border: `1px solid ${link.color}40`,
                      borderRadius: '10px',
                      background: darkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(15, 23, 42, 0.02)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = link.color;
                      e.currentTarget.style.borderColor = link.color;
                      e.currentTarget.style.background = `${link.color}18`;
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = `0 6px 15px -3px ${link.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = link.color;
                      e.currentTarget.style.borderColor = `${link.color}40`;
                      e.currentTarget.style.background = darkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(15, 23, 42, 0.02)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Tech Stack Horizontal Line */}
          <div style={{
            borderTop: `1px solid ${borderColor}`,
            paddingTop: '2.5rem',
            paddingBottom: '0.5rem',
          }}>
            <p style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.78rem',
              color: textColor,
              marginBottom: '1.2rem',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 600
            }}>
              Preferred Technologies & Tools
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
                    fontSize: '0.72rem',
                    color: textColor,
                    background: cardBg,
                    border: `1px solid ${borderColor}`,
                    padding: '0.45rem 0.9rem',
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

        {/* Footer Sub-bar */}
        <div style={{
          borderTop: `1px solid ${borderColor}`,
          background: darkMode ? 'rgba(4, 6, 12, 0.85)' : 'rgba(241, 245, 249, 0.95)',
          padding: isMobile ? '2rem 1.5rem' : '1.5rem 4rem',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '0.8rem' : '2rem',
            alignItems: 'center',
          }}>
            <p style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.75rem',
              color: textColor,
              margin: 0,
              textAlign: isMobile ? 'center' : 'left'
            }}>
              © 2026 Sujeet Vishwakarma. All Rights Reserved.
            </p>
            <div style={{ display: 'flex', gap: '1.2rem' }}>
              <button
                onClick={() => setShowModal('privacy')}
                style={{
                  fontSize: '0.72rem',
                  color: textColor,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: '"Space Mono", monospace',
                  textDecoration: 'underline',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                onMouseLeave={(e) => e.currentTarget.style.color = textColor}
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setShowModal('terms')}
                style={{
                  fontSize: '0.72rem',
                  color: textColor,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: '"Space Mono", monospace',
                  textDecoration: 'underline',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                onMouseLeave={(e) => e.currentTarget.style.color = textColor}
              >
                Terms of Service
              </button>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexDirection: isMobile ? 'column' : 'row',
          }}>
            <p style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.72rem',
              color: textColor,
              margin: 0,
            }}>
              Handcrafted in India
            </p>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.72rem',
                color: accentColor,
                background: 'transparent',
                border: `1px solid ${accentColor}60`,
                padding: '0.55rem 1.2rem',
                borderRadius: '50px',
                cursor: 'pointer',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                fontWeight: 700,
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = accentColor;
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.borderColor = accentColor;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 6px 15px -3px rgba(212, 175, 55, 0.3)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = accentColor;
                e.currentTarget.style.borderColor = `${accentColor}60`;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15" />
              </svg>
              To Top
            </button>
          </div>
        </div>

        <style>{`
          @keyframes pulse-badge {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.95); }
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
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: darkMode ? '#0b0f19' : '#ffffff',
              borderRadius: '16px',
              border: `1px solid ${borderColor}`,
              maxWidth: '650px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div style={{
              padding: '1.25rem 2rem',
              borderBottom: `1px solid ${borderColor}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <h2 style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '1.25rem',
                color: darkMode ? accentColor : headingColor,
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
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = cardBg;
                  e.currentTarget.style.color = accentColor;
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
      `}</style>
    </>
  );
}

export default Footer;