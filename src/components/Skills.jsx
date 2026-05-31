import { useState, useEffect, useRef } from 'react';
import { Layout, Server, Database, Lightbulb } from 'lucide-react';

// ✅ Aapke Custom SVG Icons
const HtmlIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><title xmlns="">globe-sharp</title><path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="44" d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208s208-93.13 208-208S370.87 48 256 48Z"/><path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="44" d="M256 48c-58.07 0-112.67 93.13-112.67 208S197.93 464 256 464s112.67-93.13 112.67-208S314.07 48 256 48Z"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="44" d="M117.33 121.33c38.24 27.15 86.38 43.34 138.67 43.34s100.43-16.19 138.67-43.34m0 269.34c-38.24-27.15-86.38-43.34-138.67-43.34s-100.43 16.19-138.67 43.34"/><path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="44" d="M256 48v416m208-208H48"/></svg>
);

const JsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><title xmlns="">javascript</title><g fill="none"><rect width="256" height="256" fill="#f1d105" rx="60"/><path fill="#000000" d="m67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371c7.905 0 12.889-3.092 12.889-15.12v-81.798h24.058v82.138c0 24.917-14.606 36.259-35.916 36.259c-19.245 0-30.416-9.967-36.087-21.996m85.07-2.576l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607c9.969 0 16.325-4.984 16.325-11.858c0-8.248-6.53-11.17-17.528-15.98l-6.013-2.579c-17.357-7.388-28.871-16.668-28.871-36.258c0-18.044 13.748-31.792 35.229-31.792c15.294 0 26.292 5.328 34.196 19.247l-18.731 12.029c-4.125-7.389-8.591-10.31-15.465-10.31c-7.046 0-11.514 4.468-11.514 10.31c0 7.217 4.468 10.139 14.778 14.608l6.014 2.577c20.449 8.765 31.963 17.699 31.963 37.804c0 21.654-17.012 33.51-39.867 33.51c-22.339 0-36.774-10.654-43.819-24.574"/></g></svg>
);

const ReactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><title xmlns="">react</title><path fill="#07dbf6" d="M16 12c7.444 0 12 2.59 12 4s-4.556 4-12 4s-12-2.59-12-4s4.556-4 12-4m0-2c-7.732 0-14 2.686-14 6s6.268 6 14 6s14-2.686 14-6s-6.268-6-14-6"/><path fill="#07dbf6" d="M16 14a2 2 0 1 0 2 2a2 2 0 0 0-2-2"/><path fill="#07dbf6" d="M10.458 5.507c2.017 0 5.937 3.177 9.006 8.493c3.722 6.447 3.757 11.687 2.536 12.392a.9.9 0 0 1-.457.1c-2.017 0-5.938-3.176-9.007-8.492C8.814 11.553 8.779 6.313 10 5.608a.9.9 0 0 1 .458-.1m-.001-2A2.87 2.87 0 0 0 9 3.875C6.13 5.532 6.938 12.304 10.804 19c3.284 5.69 7.72 9.493 10.74 9.493A2.87 2.87 0 0 0 23 28.124c2.87-1.656 2.062-8.428-1.804-15.124c-3.284-5.69-7.72-9.493-10.74-9.493Z"/><path fill="#07dbf6" d="M21.543 5.507a.9.9 0 0 1 .457.1c1.221.706 1.186 5.946-2.536 12.393c-3.07 5.316-6.99 8.493-9.007 8.493a.9.9 0 0 1-.457-.1C8.779 25.686 8.814 20.446 12.536 14c3.07-5.316 6.99-8.493 9.007-8.493m0-2c-3.02 0-7.455 3.804-10.74 9.493C6.939 19.696 6.13 26.468 9 28.124a2.87 2.87 0 0 0 1.457.369c3.02 0 7.455-3.804 10.74-9.493C25.061 12.304 25.87 5.532 23 3.876a2.87 2.87 0 0 0-1.457-.369"/></svg>
);

const PhpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title xmlns="">php</title><path fill="#0a78d9" d="M12 18.08c-6.63 0-12-2.72-12-6.08s5.37-6.08 12-6.08S24 8.64 24 12s-5.37 6.08-12 6.08m-5.19-7.95c.54 0 .91.1 1.09.31c.18.2.22.56.13 1.03c-.1.53-.29.87-.58 1.09q-.42.33-1.29.33h-.87l.53-2.76zm-3.5 5.55h1.44l.34-1.75h1.23c.54 0 .98-.06 1.33-.17c.35-.12.67-.31.96-.58c.24-.22.43-.46.58-.73c.15-.26.26-.56.31-.88c.16-.78.05-1.39-.33-1.82c-.39-.44-.99-.65-1.82-.65H4.59zm7.25-8.33l-1.28 6.58h1.42l.74-3.77h1.14c.36 0 .6.06.71.18s.13.34.07.66l-.57 2.93h1.45l.59-3.07c.13-.62.03-1.07-.27-1.36c-.3-.27-.85-.4-1.65-.4h-1.27L12 7.35zM18 10.13c.55 0 .91.1 1.09.31c.18.2.22.56.13 1.03c-.1.53-.29.87-.57 1.09c-.29.22-.72.33-1.3.33h-.85l.5-2.76zm-3.5 5.55h1.44l.34-1.75h1.22c.55 0 1-.06 1.35-.17c.35-.12.65-.31.95-.58c.24-.22.44-.46.58-.73c.15-.26.26-.56.32-.88c.15-.78.04-1.39-.34-1.82c-.36-.44-.99-.65-1.82-.65h-2.75z"/></svg>
);

const GitIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title xmlns="">github</title><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="32" d="M12 4c1.67 0 2.61 0.4 3 0.5c0.53 -0.43 1.94 -1.5 3.5 -1.5c0.34 1 0.29 2.22 0 3c0.75 1 1 2 1 3.5c0 2.19 -0.48 3.58 -1.5 4.5c-1.02 0.92 -2.11 1.37 -3.5 1.5c0.65 0.54 0.5 1.87 0.5 2.5c0 0.73 0 3 0 3M12 4c-1.67 0 -2.61 0.4 -3 0.5c-0.53 -0.43 -1.94 -1.5 -3.5 -1.5c-0.34 1 -0.29 2.22 0 3c-0.75 1 -1 2 -1 3.5c0 2.19 0.48 3.58 1.5 4.5c1.02 0.92 2.11 1.37 3.5 1.5c-0.65 0.54 -0.5 1.87 -0.5 2.5c0 0.73 0 3 0 3"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="32;0"/></path><path strokeDasharray="10" strokeDashoffset="10" d="M9 19c-1.41 0 -2.84 -0.56 -3.69 -1.19c-0.84 -0.63 -1.09 -1.66 -2.31 -2.31"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" to="0"/></path></g></svg>
);

const MlIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" fill="currentColor" stroke="currentColor"><title xmlns="">machine-learning</title><path fill="currentColor" d="M16 25a6.99 6.99 0 0 1-5.833-3.129l1.666-1.107a5 5 0 0 0 8.334 0l1.666 1.107A6.99 6.99 0 0 1 16 25m4-11a2 2 0 1 0 2 2a1.98 1.98 0 0 0-2-2m-8 0a2 2 0 1 0 2 2a1.98 1.98 0 0 0-2-2"/><path fill="currentColor" d="M30 16v-2h-2v-4a4.005 4.005 0 0 0-4-4h-2V2h-2v4h-8V2h-2v4H8a4.005 4.005 0 0 0-4 4v4H2v2h2v5H2v2h2v3a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4v-3h2v-2h-2v-5Zm-4 10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2Z"/></svg>
);

// ✅ Categorized Tech Stack Data
const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Layout size={24} color="#00F5A0" />,
    color: "#00F5A0",
    skills: [
      { icon: <ReactIcon />, name: 'React.js', tag: 'Core' },
      { icon: <JsIcon />, name: 'JavaScript', tag: 'ES6+' },
      { icon: <HtmlIcon />, name: 'HTML & CSS', tag: 'Responsive' }
    ]
  },
  {
    title: "Backend Development",
    icon: <Server size={24} color="#7C3AED" />,
    color: "#7C3AED",
    skills: [
      { icon: <PhpIcon />, name: 'PHP', tag: 'Core Backend' },
      { icon: <Server size={20} />, name: 'Node.js', tag: 'MERN Stack' },
      { icon: <Layout size={20} />, name: 'Express.js', tag: 'API Design' }
    ]
  },
  {
    title: "Database & Cloud",
    icon: <Database size={24} color="#38bdf8" />,
    color: "#38bdf8",
    skills: [
      { icon: <Database size={20} />, name: 'MongoDB', tag: 'NoSQL' },
      { icon: <Database size={20} />, name: 'MySQL', tag: 'Relational' },
      { icon: <GitIcon />, name: 'Git & GitHub', tag: 'Version Control' }
    ]
  },
  {
    title: "Emerging Tech",
    icon: <Lightbulb size={24} color="#f59e0b" />,
    color: "#f59e0b",
    skills: [
      { icon: <MlIcon />, name: 'Machine Learning', tag: 'Exploring' },
      { icon: <Server size={20} />, name: 'Cloud Deployment', tag: 'AWS / Vercel' }
    ]
  }
];

function SkillChip({ skill, darkMode, glowColor }) {
  const [hovered, setHovered] = useState(false);
  const bg = darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)';
  const border = darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
  const nameColor = darkMode ? '#e8e8f0' : '#1a1a2e';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '0.8rem 1rem',
        background: hovered ? (darkMode ? 'rgba(255,255,255,0.08)' : '#ffffff') : bg,
        border: `1px solid ${hovered ? glowColor : border}`,
        borderRadius: '12px',
        cursor: 'default',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
        boxShadow: hovered ? `0 8px 20px -5px ${glowColor}40` : 'none',
      }}
    >
      <div style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center' }}>
        {skill.icon}
      </div>
      <div>
        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: nameColor }}>
          {skill.name}
        </div>
        <div style={{ fontSize: '0.7rem', color: glowColor, fontFamily: '"Space Mono", monospace', marginTop: '2px' }}>
          {skill.tag}
        </div>
      </div>
    </div>
  );
}

function Skills({ darkMode }) {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
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

  // Theme Variables
  const sectionBg = darkMode ? '#0A0A0A' : '#f8fafc';
  const titleColor = darkMode ? '#ffffff' : '#0f172a';
  const highlightColor = '#00F5A0';
  const glassBg = darkMode ? 'rgba(20, 20, 20, 0.6)' : 'rgba(255, 255, 255, 0.7)';
  const glassBorder = darkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)';

  return (
    <section id="skills" ref={ref} style={{
      padding: isMobile ? '5rem 1.5rem' : '8rem 4rem',
      background: sectionBg,
      position: 'relative',
      overflow: 'hidden',
    }}>
      
      {/* Background Glowing Blobs */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ 
          position: 'absolute', top: '10%', left: '-5%', 
          width: isMobile ? '250px' : '400px', height: isMobile ? '250px' : '400px', 
          background: `radial-gradient(circle, ${highlightColor}10 0%, transparent 70%)`, 
          filter: 'blur(60px)' 
        }} />
        <div style={{ 
          position: 'absolute', bottom: '10%', right: '-5%', 
          width: isMobile ? '200px' : '350px', height: isMobile ? '200px' : '350px', 
          background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)', 
          filter: 'blur(60px)' 
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          textAlign: isMobile ? 'center' : 'left',
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
            03 // Tech Stack
          </div>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: titleColor,
          }}>
            Tools & <span style={{ color: highlightColor }}>Technologies</span>.
          </h2>
        </div>

        {/* Categorized Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '2rem',
        }}>
          {skillCategories.map((category, idx) => (
            <div 
              key={category.title}
              style={{
                background: glassBg,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: glassBorder,
                borderRadius: '24px',
                padding: isMobile ? '2rem 1.5rem' : '2.5rem',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.15}s`,
              }}
            >
              {/* Category Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '40px', height: '40px',
                  borderRadius: '10px',
                  background: `${category.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `1px solid ${category.color}30`
                }}>
                  {category.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: titleColor, margin: 0 }}>
                  {category.title}
                </h3>
              </div>

              {/* Skills Chips */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '1rem'
              }}>
                {category.skills.map(skill => (
                  <SkillChip 
                    key={skill.name} 
                    skill={skill} 
                    darkMode={darkMode} 
                    glowColor={category.color} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Skills;