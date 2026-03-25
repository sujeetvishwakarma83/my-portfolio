import React from "react";
import { motion } from "framer-motion";

const Education = ({ darkMode }) => {
  const data = [
    {
      title: "Bachelor of Computer Applications (BCA)",
      university: "Veer Bahadur Singh Purvanchal University",
      year: "2021 - 2024",
      extra: "Completed • 75%",
    },
    {
      title: "Master of Computer Applications (MCA)",
      university: "Veer Bahadur Singh Purvanchal University",
      year: "2024 - 2026",
      extra: "Ongoing • Pursuing",
    },
  ];

  const isMobile = window.innerWidth <= 768;

  return (
    <section
      id="education"
      style={{
        padding: isMobile ? "4rem 1.5rem" : "6rem 4rem", // ✅ SAME AS ABOUT
        background: darkMode ? "transparent" : "#f0faf5",
        color: darkMode ? "#e8e8f0" : "#1a1a2e",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BACKGROUND GRID */}
      {darkMode && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,245,160,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,160,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            pointerEvents: "none",
          }}
        />
      )}

      {/* CONTENT */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* 🔥 SAME AS ABOUT HEADING */}

        {/* Label */}
        <div
          style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            color: "#00f5a0",
            textTransform: "uppercase",
            marginBottom: "0.5rem",
          }}
        >
          02 — Education
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: "1rem",
            color: darkMode ? "#e8e8f0" : "#1a3a2e",
          }}
        >
          My Academic Journey
        </h2>

        {/* Divider */}
        <div
          style={{
            width: "48px",
            height: "2px",
            background: "#00f5a0",
            marginBottom: "2.5rem",
          }}
        />

        {/* TIMELINE CONTAINER (FIXED ALIGNMENT) */}
        <div
          style={{
            position: "relative",
            maxWidth: "1100px", // ✅ SAME AS ABOUT
            margin: "0", // ❌ NO center align
          }}
        >
          {/* Center Line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              transform: "translateX(-50%)",
              width: "2px",
              height: "100%",
              background: "#2a2a3a",
            }}
          />

          {data.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  display: "flex",
                  justifyContent: isLeft ? "flex-start" : "flex-end",
                  marginBottom: "50px",
                  position: "relative",
                }}
              >
                {/* CARD */}
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    rotate: 1,
                    boxShadow: "0 0 30px rgba(0,245,160,0.4)",
                  }}
                  transition={{ type: "spring", stiffness: 200 }}
                  style={{
                    width: "100%",
                    maxWidth: "420px",
                    background: darkMode ? "#11111a" : "#ffffff",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 0 20px rgba(0,245,160,0.1)",
                    cursor: "pointer",
                  }}
                >
                  <h3 style={{ color: "#00f5a0", marginBottom: "5px" }}>
                    {item.title}
                  </h3>

                  <p style={{ margin: "5px 0", opacity: 0.8 }}>
                    {item.university}
                  </p>

                  <p style={{ fontSize: "0.9rem", opacity: 0.6 }}>
                    {item.year}
                  </p>

                  <p style={{ fontSize: "0.9rem", opacity: 0.6 }}>
                    {item.extra}
                  </p>
                </motion.div>

                {/* DOT */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "14px",
                    height: "14px",
                    background: "#00f5a0",
                    borderRadius: "50%",
                    boxShadow: "0 0 10px #00f5a0",
                  }}
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