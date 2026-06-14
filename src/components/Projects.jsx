import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Lock, User, Star, Clock } from 'lucide-react';
import { use3DTilt } from '../hooks/use3DTilt';

// ✅ Custom GitHub Icon
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

// ✅ DATA UPGRADED (GitHub links fixed, Tags updated, Portfolio added)
const projectsData = [
  {
    num: '01',
    title: 'Vishwakarma Furniture (E-Commerce)',
    problem: 'Manual inventory tracking and limited local reach.',
    solution: 'Engineered a scalable MERN stack storefront with real-time cart functionality, secure checkout, and dynamic product management.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Google Auth', 'Payment Integration'], // ✅ Added new tags
    link: 'https://my-shop-two-theta.vercel.app/',
    github: 'https://github.com/sujeetvishwakarma83/my-shop', // ✅ Real Repo Link
    image: '/projects/ecommerce.png',
    rating: 4.9,
    reviews: 124
  },
  {
    num: '02',
    title: 'Student Management System',
    problem: 'Paper-based records were slow to retrieve and hard to manage.',
    solution: 'Developed a secure CRUD application with role-based authentication, enabling fast data retrieval and responsive dashboard management.',
    tags: ['PHP', 'MySQL', 'JavaScript'],
    link: 'https://student-management.infinityfreeapp.com/index.php', 
    github: 'https://github.com/sujeetvishwakarma83/student-management-system', // ✅ Real Repo Link
    image: '/projects/sms.png',
    demoId: 'admin',
    demoPass: 'admin123',
    rating: 4.7,
    reviews: 89
  },
  {
    num: '03', // ✅ Bank system replaced with Portfolio
    title: 'Personal Portfolio Platform',
    problem: 'Needed a high-performance, interactive digital space to showcase projects and technical skills.',
    solution: 'Designed and developed a fully responsive MERN stack portfolio featuring smooth animations, dynamic data rendering, and a premium UI.',
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Framer Motion'],
    link: 'https://my-portfolio-one-ochre-45.vercel.app/', 
    github: '#', // Agar iska bhi github link dena ho toh yahan replace kar dena
    image: '/projects/portfolio.png', // Portfolio ki image apne public folder me daal lena
    rating: 4.8,
    reviews: 56
  },
  {
    num: '04',
    title: 'Appointment Booking System',
    problem: 'Scheduling conflicts and inefficient manual appointment tracking.',
    solution: 'Building an automated booking system with calendar sync, SMS reminders, and multi-staff management.',
    tags: ['Next.js', 'Tailwind CSS', 'PostgreSQL'],
    link: '#', 
    github: '#',
    image: '/projects/booking.png',
    comingSoon: true, 
    rating: 0,
    reviews: 0
  },
];

// ✅ Star Rating Component
const RatingStars = ({ rating, reviews, darkMode }) => {
  if (rating === 0) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', color: '#fbbf24' }}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} fill={i < Math.floor(rating) ? "#fbbf24" : "none"} strokeWidth={1.5} />
        ))}
      </div>
      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: darkMode ? '#e2e8f0' : '#1e293b' }}>{rating}</span>
      <span style={{ fontSize: '0.75rem', color: darkMode ? '#94a3b8' : '#64748b' }}>({reviews} reviews)</span>
    </div>
  );
};

function ProjectCard({ project, index, darkMode, bookMode = false }) {
  const tilt = use3DTilt(bookMode ? 0 : 8, bookMode ? 1 : 1.02);
  const [hovered, setHovered] = useState(false);

  const cardBg = darkMode ? 'rgba(24, 24, 31, 0.6)' : 'rgba(255, 255, 255, 0.7)';
  const cardBorder = darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
  const glowColor = '#00f5a0';
  const titleColor = darkMode ? '#ffffff' : '#0f172a';
  const descColor = darkMode ? '#9ca3af' : '#475569';
  
  return (
    <motion.div
      initial={bookMode ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      whileInView={bookMode ? undefined : { opacity: 1, y: 0 }}
      viewport={bookMode ? undefined : { once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ perspective: '1000px', height: '100%' }}
    >
      <div
        {...tilt}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          tilt.onMouseLeave();
          setHovered(false);
        }}
        style={{
          background: cardBg,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${hovered ? glowColor : cardBorder}`,
          padding: bookMode ? '0.75rem 0.85rem' : '1.5rem',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: bookMode ? '12px' : '20px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: hovered 
            ? `0 20px 40px -10px ${glowColor}30` 
            : '0 10px 30px -10px rgba(0,0,0,0.1)',
          transformStyle: 'preserve-3d',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.1s ease',
          ...tilt.style
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: `linear-gradient(90deg, ${glowColor}, #7c3aed)`,
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: bookMode ? '0.4rem' : '1rem' }}>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: bookMode ? '0.65rem' : '0.8rem',
            color: glowColor,
            fontWeight: 700,
            letterSpacing: '0.1em',
          }}>
            Project // {project.num}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
             {project.github && project.github !== '#' && !project.comingSoon && (
               <a href={project.github} target="_blank" rel="noreferrer" style={{ color: descColor, transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = titleColor} onMouseOut={e => e.currentTarget.style.color = descColor}>
                 <CustomGithubIcon size={18} />
               </a>
             )}
          </div>
        </div>

        {/* IMAGE SECTION - Hidden in Book Mode for perfect fit */}
        {!bookMode && project.image && (
          <div style={{
            position: 'relative', 
            marginBottom: '1.5rem',
            borderRadius: '12px',
            overflow: 'hidden',
            aspectRatio: '16/9',
            background: darkMode ? '#111' : '#eee',
            border: cardBorder
          }}>
            {project.comingSoon && (
              <div style={{
                position: 'absolute', top: '10px', right: '10px', zIndex: 20,
                background: 'rgba(0,0,0,0.8)', color: '#fff', padding: '4px 12px',
                borderRadius: '50px', fontSize: '0.7rem', fontWeight: 'bold', border: '1px solid #333',
                display: 'flex', alignItems: 'center', gap: '4px'
              }}>
                <Clock size={12} color={glowColor} /> Coming Soon
              </div>
            )}
            
            <img 
              src={project.image} 
              alt={project.title} 
              style={{
                width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top',
                transform: hovered ? 'scale(1.1)' : 'scale(1)', 
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: project.comingSoon ? 0.5 : 1,
              }}
            />
            
            <div style={{
              position: 'absolute', inset: 0,
              background: darkMode ? 'rgba(10, 10, 15, 0.85)' : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(4px)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: hovered && !project.comingSoon ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}>
              {project.demoId && project.demoPass ? (
                <div style={{
                  background: darkMode ? '#1a1a24' : '#f8fafc',
                  border: `1px solid ${glowColor}50`,
                  padding: '12px 20px', borderRadius: '12px',
                  fontFamily: '"Space Mono", monospace', fontSize: '0.75rem',
                  color: titleColor,
                  transform: hovered ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'transform 0.4s ease',
                  boxShadow: `0 10px 25px -5px ${glowColor}20`
                }}>
                  <div style={{ color: glowColor, fontWeight: 700, marginBottom: '8px', textAlign: 'center', display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                  background: glowColor, color: '#000',
                  padding: '8px 20px', borderRadius: '50px', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none',
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

        {!bookMode && (
          <RatingStars rating={project.rating} reviews={project.reviews} darkMode={darkMode} />
        )}

        <h3 style={{ fontSize: bookMode ? '0.9rem' : '1.2rem', fontWeight: 800, color: titleColor, marginBottom: bookMode ? '0.4rem' : '0.8rem' }}>
          {project.title}
        </h3>

        <div style={{ fontSize: bookMode ? '0.75rem' : '0.85rem', lineHeight: bookMode ? 1.4 : 1.6, color: descColor, marginBottom: bookMode ? '0.6rem' : '1.5rem', flexGrow: 1 }}>
          {bookMode ? (
            <p style={{ margin: 0 }}>{project.solution}</p>
          ) : (
            <>
              <p style={{ margin: '0 0 0.5rem 0' }}><strong style={{ color: titleColor }}>Problem:</strong> {project.problem}</p>
              <p style={{ margin: 0 }}><strong style={{ color: titleColor }}>Solution:</strong> {project.solution}</p>
            </>
          )}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: bookMode ? '0.6rem' : '1.5rem' }}>
          {(bookMode ? project.tags.slice(0, 3) : project.tags).map((tag) => (
            <span key={tag} style={{
              fontFamily: '"Space Mono", monospace', fontSize: bookMode ? '0.6rem' : '0.65rem', fontWeight: 600,
              padding: bookMode ? '0.2rem 0.5rem' : '0.3rem 0.8rem',
              background: darkMode ? `${glowColor}15` : `${glowColor}20`,
              color: darkMode ? glowColor : '#00a870',
              borderRadius: '50px', border: `1px solid ${glowColor}30`,
            }}>
              {tag}
            </span>
          ))}
        </div>

        {!project.comingSoon && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
            fontSize: bookMode ? '0.75rem' : '0.85rem', color: glowColor, display: 'inline-flex', alignItems: 'center',
            gap: hovered ? '8px' : '4px', fontWeight: 700, textDecoration: 'none', transition: 'all 0.3s ease',
          }}>
            Explore Project <ExternalLink size={14} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

function Projects({ darkMode, bookMode = false }) {
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);
  const featuredTilt = use3DTilt(4, 1.01);
  const [featuredHovered, setFeaturedHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sectionBg = 'transparent';
  const titleColor = darkMode ? '#ffffff' : '#0f172a';
  const glowColor = '#00F5A0';
  const descColor = darkMode ? '#9ca3af' : '#475569';

  const featuredProject = projectsData[0];
  const remainingProjects = projectsData.slice(1);

  return (
    <section id="projects" ref={ref} style={{
      padding: bookMode ? '2rem 1.5rem' : (isMobile ? '5rem 1.5rem' : '8rem 4rem'),
      background: sectionBg,
      position: 'relative',
      overflow: bookMode ? 'visible' : 'hidden',
      minHeight: bookMode ? 'auto' : '100vh',
    }}>
      
      {!bookMode && (
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
      )}

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ textAlign: isMobile ? 'center' : 'left', marginBottom: bookMode ? '1.5rem' : '4rem' }}>
          <div style={{
            fontFamily: '"Space Mono", monospace', fontSize: '0.8rem', letterSpacing: '0.15em',
            color: glowColor, textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 700
          }}>
            05 // Selected Work
          </div>
          <h2 style={{ fontSize: bookMode ? '1.8rem' : 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', color: titleColor, margin: 0 }}>
            Featured <span style={{ color: glowColor }}>Projects</span>.
          </h2>
        </div>

        {bookMode ? (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '0.75rem', 
            marginTop: '0.5rem' 
          }}>
            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.num}
                project={project}
                index={index}
                darkMode={darkMode}
                bookMode={bookMode}
              />
            ))}
          </div>
        ) : (
          <>
            {/* ✅ FIRST ROW: FEATURED PROJECT */}
            <div style={{ marginBottom: '4rem', perspective: '1000px' }}>
               <div 
                 {...featuredTilt}
                 onMouseEnter={() => setFeaturedHovered(true)}
                 onMouseLeave={() => {
                   featuredTilt.onMouseLeave();
                   setFeaturedHovered(false);
                 }}
                 style={{
                   background: darkMode ? 'rgba(24, 24, 31, 0.6)' : 'rgba(255, 255, 255, 0.7)',
                   border: `1px solid ${featuredHovered ? glowColor : (darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)')}`,
                   borderRadius: '24px', padding: isMobile ? '1.5rem' : '3rem',
                   display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: '3rem',
                   alignItems: 'center',
                   boxShadow: featuredHovered 
                     ? `0 20px 40px -10px rgba(0,0,0,0.3), 0 0 20px ${glowColor}15`
                     : '0 20px 40px -10px rgba(0,0,0,0.2)',
                   transformStyle: 'preserve-3d',
                   transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.1s ease',
                   ...featuredTilt.style
                 }}
               >
                 {/* Featured Image */}
                 <div style={{ overflow: 'hidden', borderRadius: '16px', border: `1px solid ${glowColor}40`, position: 'relative', group: 'true' }}>
                   <div style={{ position: 'absolute', top: '15px', left: '15px', zIndex: 10, background: glowColor, color: '#000', padding: '5px 15px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                     ★ Top Rated
                   </div>
                   <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                      src={featuredProject.image} 
                      alt={featuredProject.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                   />
                 </div>
    
                 {/* Featured Content */}
                 <div>
                   <RatingStars rating={featuredProject.rating} reviews={featuredProject.reviews} darkMode={darkMode} />
                   <h3 style={{ fontSize: isMobile ? '1.8rem' : '2.2rem', fontWeight: 800, color: titleColor, marginBottom: '1rem', lineHeight: 1.2 }}>
                     {featuredProject.title}
                   </h3>
                   <div style={{ fontSize: '1rem', lineHeight: 1.7, color: descColor, marginBottom: '2rem' }}>
                     <p style={{ marginBottom: '0.8rem' }}><strong style={{ color: titleColor }}>Problem:</strong> {featuredProject.problem}</p>
                     <p><strong style={{ color: titleColor }}>Solution:</strong> {featuredProject.solution}</p>
                   </div>
    
                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2.5rem' }}>
                     {featuredProject.tags.map((tag) => (
                       <span key={tag} style={{
                         fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', fontWeight: 600,
                         padding: '0.4rem 1rem', background: darkMode ? `${glowColor}15` : `${glowColor}20`,
                         color: darkMode ? glowColor : '#00a870', borderRadius: '50px', border: `1px solid ${glowColor}30`,
                       }}>
                         {tag}
                       </span>
                     ))}
                   </div>
    
                   <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                     <a href={featuredProject.link} target="_blank" rel="noreferrer" style={{
                        background: glowColor, color: '#000', padding: '12px 28px', borderRadius: '50px',
                        fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px',
                        boxShadow: `0 10px 20px -5px ${glowColor}50`, transition: 'transform 0.3s ease'
                     }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                        Live Preview <ExternalLink size={16} />
                     </a>
                     <a href={featuredProject.github} target="_blank" rel="noreferrer" style={{
                        padding: '12px', background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        borderRadius: '50%', color: titleColor, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background 0.3s ease'
                     }} onMouseOver={e => e.currentTarget.style.background = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} onMouseOut={e => e.currentTarget.style.background = darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}>
                        <CustomGithubIcon size={20} />
                     </a>
                   </div>
                 </div>
               </div>
            </div>
    
            {/* ✅ REMAINING PROJECTS GRID */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2.5rem', 
            }}>
              {remainingProjects.map((project, index) => (
                <ProjectCard
                  key={project.num}
                  project={project}
                  index={index}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </>
        )}

      </div>
    </section>
  );
}

export default Projects;