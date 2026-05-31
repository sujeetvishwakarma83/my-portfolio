import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
// YAHAN FIX: Github ko lucide-react se nikal diya gaya hai
import { ExternalLink, Lock, User } from 'lucide-react';

// ✅ Custom GitHub Icon (Bina kisi library ke)
const CustomGithubIcon = ({ size = 18, color = "currentColor" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4" />
    <path d="M12 18v4" />
  </svg>
);

// ✅ DATA UPGRADED
const projectsData = [
  {
    num: '01',
    title: 'Vishwakarma Furniture (E-Commerce)',
    problem: 'Manual inventory tracking and limited local reach.',
    solution: 'Engineered a scalable MERN stack storefront with real-time cart functionality, secure checkout, and dynamic product management.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    link: 'https://my-shop-two-theta.vercel.app/',
    github: '#', 
    image: '/projects/ecommerce.png' 
  },
  {
    num: '02',
    title: 'Student Management System',
    problem: 'Paper-based records were slow to retrieve and hard to manage.',
    solution: 'Developed a secure CRUD application with role-based authentication, enabling fast data retrieval and responsive dashboard management.',
    tags: ['PHP', 'MySQL', 'JavaScript'],
    link: 'https://student-management.infinityfreeapp.com/index.php', 
    github: '#',
    image: '/projects/sms.png',
    demoId: 'admin',
    demoPass: 'admin123'
  },
  {
    num: '03',
    title: 'Banking Management System',
    problem: 'Need for a secure, digitized way to handle transactions and ledgers.',
    solution: 'Architected a robust backend system to manage user accounts, process internal transactions seamlessly, and maintain ledger accuracy.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],
    link: '#', 
    github: '#',
    image: '/projects/banking.png' 
  },
];

function ProjectCard({ project, index, darkMode }) {
  const [hovered, setHovered] = useState(false);

  const cardBg = darkMode ? 'rgba(24, 24, 31, 0.6)' : 'rgba(255, 255, 255, 0.7)';
  const cardBorder = darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
  const glowColor = '#00f5a0';
  const titleColor = darkMode ? '#ffffff' : '#0f172a';
  const descColor = darkMode ? '#9ca3af' : '#475569';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{ 
          rotateX: hovered ? 2 : 0, 
          rotateY: hovered ? -2 : 0,
          y: hovered ? -8 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          background: cardBg,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${hovered ? glowColor : cardBorder}`,
          padding: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '20px',
          boxShadow: hovered 
            ? `0 20px 40px -10px ${glowColor}30` 
            : '0 10px 30px -10px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: `linear-gradient(90deg, ${glowColor}, #7c3aed)`,
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.8rem',
            color: glowColor,
            fontWeight: 700,
            letterSpacing: '0.1em',
          }}>
            Project // {project.num}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
             {project.github && (
               <a href={project.github} target="_blank" rel="noreferrer" style={{ color: descColor, transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = titleColor} onMouseOut={e => e.currentTarget.style.color = descColor}>
                 {/* YAHAN FIX KIYA HAI: Custom Icon lagaya hai */}
                 <CustomGithubIcon size={18} />
               </a>
             )}
          </div>
        </div>

        {project.image && (
          <div style={{
            position: 'relative', 
            marginBottom: '1.5rem',
            borderRadius: '12px',
            overflow: 'hidden',
            aspectRatio: '16/9',
            background: darkMode ? '#111' : '#eee',
            border: cardBorder
          }}>
            <img 
              src={project.image} 
              alt={project.title} 
              style={{
                width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top',
                transform: hovered ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:${descColor};font-family:'Space Mono', monospace;font-size:0.8rem;">[ Image Placeholder ]</div>`;
              }}
            />
            
            <div style={{
              position: 'absolute', inset: 0,
              background: darkMode ? 'rgba(10, 10, 15, 0.85)' : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(4px)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}>
              {project.demoId && project.demoPass ? (
                <div style={{
                  background: darkMode ? '#1a1a24' : '#f8fafc',
                  border: `1px solid ${glowColor}50`,
                  padding: '12px 20px',
                  borderRadius: '12px',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.75rem',
                  color: titleColor,
                  transform: hovered ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'transform 0.4s ease',
                  boxShadow: `0 10px 25px -5px ${glowColor}20`
                }}>
                  <div style={{ color: glowColor, fontWeight: 700, marginBottom: '8px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <Lock size={14} /> Demo Credentials
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <User size={12} color={descColor} /> <span>{project.demoId}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Lock size={12} color={descColor} /> <span>{project.demoPass}</span>
                  </div>
                </div>
              ) : (
                <a href={project.link} target="_blank" rel="noreferrer" style={{
                  background: glowColor,
                  color: '#000',
                  padding: '8px 20px',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  transform: hovered ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'transform 0.4s ease',
                  boxShadow: `0 10px 20px -5px ${glowColor}50`
                }}>
                  Live Preview <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        )}

        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: titleColor, marginBottom: '1rem' }}>
          {project.title}
        </h3>

        <div style={{ fontSize: '0.85rem', lineHeight: 1.7, color: descColor, marginBottom: '1.5rem' }}>
          <p style={{ margin: '0 0 0.5rem 0' }}><strong style={{ color: titleColor }}>Problem:</strong> {project.problem}</p>
          <p style={{ margin: 0 }}><strong style={{ color: titleColor }}>Solution:</strong> {project.solution}</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.65rem',
              fontWeight: 600,
              padding: '0.3rem 0.8rem',
              background: darkMode ? `${glowColor}15` : `${glowColor}20`,
              color: darkMode ? glowColor : '#00a870',
              borderRadius: '50px',
              border: `1px solid ${glowColor}30`,
            }}>
              {tag}
            </span>
          ))}
        </div>

        <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
          fontSize: '0.85rem',
          color: glowColor,
          display: 'inline-flex',
          alignItems: 'center',
          gap: hovered ? '8px' : '4px',
          fontWeight: 700,
          textDecoration: 'none',
          transition: 'all 0.3s ease',
        }}>
          Explore Project <ExternalLink size={14} />
        </a>

      </motion.div>
    </motion.div>
  );
}

function Projects({ darkMode }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const ref = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sectionBg = darkMode ? '#0A0A0A' : '#f8fafc';
  const titleColor = darkMode ? '#ffffff' : '#0f172a';
  const glowColor = '#00F5A0';

  return (
    <section id="projects" ref={ref} style={{
      padding: isMobile ? '5rem 1.5rem' : '8rem 4rem',
      background: sectionBg,
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
    }}>
      
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {darkMode && (
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }} />
        )}
        <div style={{ 
          position: 'absolute', top: '10%', right: '-5%', 
          width: isMobile ? '250px' : '500px', height: isMobile ? '250px' : '500px', 
          background: `radial-gradient(circle, ${glowColor}10 0%, transparent 70%)`, 
          filter: 'blur(60px)' 
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ textAlign: isMobile ? 'center' : 'left', marginBottom: '4rem' }}>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.8rem',
            letterSpacing: '0.15em',
            color: glowColor,
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
            fontWeight: 700
          }}>
            05 // Selected Work
          </div>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: titleColor,
          }}>
            Featured <span style={{ color: glowColor }}>Projects</span>.
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2.5rem', 
        }}>
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.num}
              project={project}
              index={index}
              darkMode={darkMode}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Projects;