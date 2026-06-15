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
      // 2. Load Vanta Net effect
      await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js', 'vanta-net');

      // 3. Initialize Vanta Net
      if (window.VANTA && window.VANTA.NET && myRef.current) {
        effect = window.VANTA.NET({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: darkMode ? 0x00f5a0 : 0x7c3aed,      // Accent Color based on theme
          backgroundColor: darkMode ? 0x050508 : 0xf8fafc,
          points: 12.00,
          maxDistance: 22.00,
          spacing: 16.00
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
