import { useEffect, useRef } from 'react';

function Background3D({ darkMode }) {
  const myRef = useRef(null);

  useEffect(() => {
    let effect = null;

    // Helper to load CDN scripts dynamically
    const loadScript = (src, id) => {
      return new Promise((resolve) => {
        if (document.getElementById(id)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.id = id;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    const initVanta = async () => {
      // 1. Load Three.js library required by Vanta
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js', 'three-js');
      // 2. Load Vanta Birds effect
      await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js', 'vanta-birds');

      // 3. Initialize Vanta Birds
      if (window.VANTA && window.VANTA.BIRDS && myRef.current) {
        effect = window.VANTA.BIRDS({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          backgroundColor: darkMode ? 0x050508 : 0xf8fafc,
          color1: 0x00f5a0,      // Primary Neon Green
          color2: 0x7c3aed,      // Secondary Neon Purple
          colorMode: 'variance',
          birdSize: 1.50,
          wingSpan: 24.00,
          speedLimit: 4.00,
          separation: 40.00,
          alignment: 30.00,
          cohesion: 20.00,
          quantity: 4.00
        });
      }
    };

    initVanta();

    // Cleanup on unmount or theme toggle
    return () => {
      if (effect) {
        effect.destroy();
      }
    };
  }, [darkMode]);

  return (
    <div
      ref={myRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, // Sits directly behind all transparent sections
        pointerEvents: 'none', // Ensure clicks bypass this container to reach buttons/links
      }}
    />
  );
}

export default Background3D;
