import { useEffect, useRef } from 'react';

function CustomCursor() {
  var dotRef = useRef(null);
  var ringRef = useRef(null);
  var canvasRef = useRef(null);
  var mouseRef = useRef({ x: -100, y: -100 });
  var ringPos = useRef({ x: -100, y: -100 });
  var bubblesRef = useRef([]);
  var animRef = useRef(null);
  var tickRef = useRef(0);

  useEffect(function() {
    var dot = dotRef.current;
    var ring = ringRef.current;
    var canvas = canvasRef.current;
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    var resize = function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    var onMouseMove = function(e) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (dot) {
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
      }
      tickRef.current += 1;
      if (tickRef.current % 3 === 0) {
        bubblesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 12,
          y: e.clientY + (Math.random() - 0.5) * 12,
          r: Math.random() * 8 + 4,
          life: 1,
          decay: Math.random() * 0.03 + 0.02,
          dx: (Math.random() - 0.5) * 1.5,
          dy: (Math.random() - 1.2) * 1.5,
          color: Math.random() > 0.5 ? '0,245,160' : '124,58,237',
        });
      }
    };

    var onMouseEnter = function() {
      if (dot) {
        dot.style.width = '14px';
        dot.style.height = '14px';
        dot.style.background = '#7c3aed';
      }
      if (ring) {
        ring.style.width = '52px';
        ring.style.height = '52px';
        ring.style.borderColor = 'rgba(124,58,237,0.6)';
      }
    };

    var onMouseLeave = function() {
      if (dot) {
        dot.style.width = '8px';
        dot.style.height = '8px';
        dot.style.background = '#00f5a0';
      }
      if (ring) {
        ring.style.width = '34px';
        ring.style.height = '34px';
        ring.style.borderColor = 'rgba(0,245,160,0.4)';
      }
    };

    var clickables = document.querySelectorAll('a, button, input, textarea');
    clickables.forEach(function(el) {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    var animate = function() {
      ringPos.current.x += (mouseRef.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mouseRef.current.y - ringPos.current.y) * 0.12;
      if (ring) {
        ring.style.left = ringPos.current.x + 'px';
        ring.style.top = ringPos.current.y + 'px';
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bubblesRef.current = bubblesRef.current.filter(function(b) {
        return b.life > 0;
      });
      for (var i = 0; i < bubblesRef.current.length; i++) {
        var b = bubblesRef.current[i];
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(' + b.color + ',' + b.life * 0.7 + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + b.color + ',' + b.life * 0.15 + ')';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.25, b.y - b.r * 0.25, b.r * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,' + b.life * 0.5 + ')';
        ctx.fill();
        b.x += b.dx;
        b.y += b.dy;
        b.r *= 0.99;
        b.life -= b.decay;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('mousemove', onMouseMove);

    return function() {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
      clickables.forEach(function(el) {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none',
          zIndex: 9997,
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: '8px',
          height: '8px',
          background: '#00f5a0',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s, background 0.2s',
          boxShadow: '0 0 6px rgba(0,245,160,0.8)',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: '34px',
          height: '34px',
          border: '1px solid rgba(0,245,160,0.4)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
        }}
      />
    </div>
  );
}

export default CustomCursor;