import { useState } from 'react';

/**
 * Custom hook to apply a premium 3D tilt effect on elements based on mouse coordinates.
 * @param {number} maxTilt - Maximum rotation in degrees.
 * @param {number} scale - Scale multiplier on hover.
 */
export function use3DTilt(maxTilt = 8, scale = 1.02) {
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
  });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // mouse x inside element
    const y = e.clientY - rect.top;  // mouse y inside element
    
    // Calculate normalized position from center (-1 to 1)
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const rotateY = ((x - xc) / xc) * maxTilt; // Horizontal tilt
    const rotateX = -((y - yc) / yc) * maxTilt; // Vertical tilt

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)',
      zIndex: 10,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    });
  };

  return {
    style: tiltStyle,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}
