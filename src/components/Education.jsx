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

  return (
    <section
      id="education"
      style={{
        padding: "80px 20px",
        background: darkMode ? "transparent" : "#f0faf5",
        color: darkMode ? "#e8e8f0" : "#1a1a2e",
        position: "relative",
        overflow: "hidden",
      }}
    >

      {/* 🔥 HERO STYLE BACKGROUND */}

      {/* Grid */}
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

      {/* Purple Glow */}
      {darkMode && (
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "-10%",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Green Glow */}
      {darkMode && (
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "-5%",
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(0,245,160,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* CONTENT */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Heading */}
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
            marginBottom: "60px",
            fontWeight: "bold",
          }}
        >
          🎓 Education
        </h2>

        <div
          style={{
            position: "relative",
            maxWidth: "1000px",
            margin: "0 auto",
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
                {/* Card */}
                <div
                  style={{
                    width: "100%",
                    maxWidth: "420px",
                    background: darkMode ? "#11111a" : "#ffffff",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 0 20px rgba(0,245,160,0.1)",
                    transition: "0.3s",
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
                </div>

                {/* Dot */}
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