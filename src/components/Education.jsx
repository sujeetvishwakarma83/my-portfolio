import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";
import { use3DTilt } from "../hooks/use3DTilt";

function TimelineCard({ item, glassBg, glassBorder, titleColor, textColor, isMobile }) {
  const tilt = use3DTilt(8, 1.02);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      {...tilt}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        tilt.onMouseLeave();
        setHovered(false);
      }}
      style={{
        width: isMobile ? "100%" : "45%",
        background: glassBg,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${glassBorder}`,
        padding: "2rem",
        borderRadius: "20px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transformStyle: 'preserve-3d',
        boxShadow: hovered 
          ? `0 15px 30px -10px ${item.color}35`
          : 'none',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.1s ease',
        ...tilt.style
      }}
    >
      {/* Top Accent Line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`
      }} />

      <span style={{
        display: "inline-block",
        padding: "0.4rem 1rem",
        background: `${item.color}15`,
        color: item.color,
        borderRadius: "50px",
        fontSize: "0.75rem",
        fontWeight: 700,
        letterSpacing: "0.05em",
        marginBottom: "1rem",
        transform: 'translateZ(10px)'
      }}>
        {item.year}
      </span>

      <h3 style={{ 
        fontSize: "1.4rem", 
        fontWeight: 800, 
        color: titleColor, 
        margin: "0 0 0.5rem 0",
        transform: 'translateZ(20px)'
      }}>
        {item.title}
      </h3>
      
      <div style={{ 
        fontSize: "0.95rem", 
        fontWeight: 600, 
        color: item.color, 
        marginBottom: "1rem",
        transform: 'translateZ(15px)'
      }}>
        {item.subtitle}
      </div>
      
      <p style={{ 
        color: textColor, 
        lineHeight: 1.7, 
        margin: 0, 
        fontSize: "0.95rem",
        transform: 'translateZ(10px)'
      }}>
        {item.description}
      </p>
    </div>
  );
}

const Education = ({ darkMode }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Combined Data: Education + Self-Driven Experience
  const timelineData = [
    {
      type: "experience",
      title: "Freelance Full Stack Developer",
      subtitle: "Self-Employed / Independent",
      year: "2024 - Present",
      description: "Developing scalable digital solutions. Built and launched production-ready applications including Vishwakarma Furniture (MERN E-commerce) and secure Management Systems using PHP/MySQL.",
      icon: <Briefcase size={20} />,
      color: "#7C3AED" // Purple for Experience
    },
    {
      type: "education",
      title: "MCA",
      subtitle: "VBS Purvanchal University, Jaunpur",
      year: "2024 - 2026",
      description: "Pursuing advanced software architecture, focusing on full-stack development, cloud deployment, and scalable system design.",
      icon: <GraduationCap size={20} />,
      color: "#00F5A0" // Neon Green for Education
    },
    {
      type: "education",
      title: "BCA",
      subtitle: "VBSPU Jaunpur",
      year: "2021 - 2024",
      description: "Graduated. Built a strong foundational knowledge in programming logic, relational databases, and modern web technologies.",
      icon: <GraduationCap size={20} />,
      color: "#00F5A0"
    }
  ];

  // Theme Variables
  const sectionBg = 'transparent';
  const titleColor = darkMode ? "#ffffff" : "#0f172a";
  const textColor = darkMode ? "#9ca3af" : "#475569";
  const glassBg = darkMode ? "rgba(20, 20, 20, 0.6)" : "rgba(255, 255, 255, 0.8)";
  const glassBorder = darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)";

  return (
    <section
      id="education"
      style={{
        padding: isMobile ? "5rem 1.5rem" : "8rem 4rem",
        background: sectionBg,
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh"
      }}
    >
      {/* Background Grid & Blobs */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        {darkMode && (
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }} />
        )}
        <div style={{
          position: "absolute", top: "20%", left: "5%",
          width: isMobile ? "200px" : "400px", height: isMobile ? "200px" : "400px",
          background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
          filter: "blur(60px)"
        }} />
        <div style={{
          position: "absolute", bottom: "10%", right: "5%",
          width: isMobile ? "200px" : "400px", height: isMobile ? "200px" : "400px",
          background: "radial-gradient(circle, rgba(0,245,160,0.1) 0%, transparent 70%)",
          filter: "blur(60px)"
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 10, maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ textAlign: isMobile ? "center" : "left", marginBottom: "4rem" }}>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: "0.8rem",
            letterSpacing: "0.15em",
            color: "#00F5A0",
            textTransform: "uppercase",
            marginBottom: "0.5rem",
            fontWeight: 700
          }}>
            04 — Journey
          </div>
          <h2 style={{
            fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: titleColor,
          }}>
            Experience & <span style={{ color: "#00F5A0" }}>Education</span>.
          </h2>
        </div>

        {/* TIMELINE CONTAINER */}
        <div style={{ position: "relative", width: "100%" }}>
          
          {/* Vertical Center Line (Left on Mobile, Center on Desktop) */}
          <div style={{
            position: "absolute",
            left: isMobile ? "20px" : "50%",
            top: "0",
            bottom: "0",
            transform: isMobile ? "none" : "translateX(-50%)",
            width: "2px",
            background: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            zIndex: 0
          }} />

          {timelineData.map((item, index) => {
            // Desktop par alternate cards (Left/Right), Mobile par sabhi Right
            const isLeft = !isMobile && index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                  display: "flex",
                  justifyContent: isMobile ? "flex-start" : (isLeft ? "flex-start" : "flex-end"),
                  alignItems: "center",
                  width: "100%",
                  marginBottom: "4rem",
                  position: "relative",
                  paddingLeft: isMobile ? "60px" : "0", // Mobile card spacing
                }}
              >
                
                {/* Timeline Dot with Icon */}
                <div style={{
                  position: "absolute",
                  left: isMobile ? "20px" : "50%",
                  transform: isMobile ? "translateX(-50%)" : "translateX(-50%)",
                  width: "44px", height: "44px",
                  background: darkMode ? "#111" : "#fff",
                  border: `2px solid ${item.color}`,
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: item.color,
                  zIndex: 2,
                  boxShadow: `0 0 15px ${item.color}40`
                }}>
                  {item.icon}
                </div>

                {/* CARD CONTENT */}
                <TimelineCard
                  item={item}
                  glassBg={glassBg}
                  glassBorder={glassBorder}
                  titleColor={titleColor}
                  textColor={textColor}
                  isMobile={isMobile}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;