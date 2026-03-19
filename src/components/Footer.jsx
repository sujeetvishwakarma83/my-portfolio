import { useEffect, useRef, useState } from 'react';

function Footer({ darkMode }) {
  var canvasRef = useRef(null);
  var animRef = useRef(null);
  var [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(function() {
    var handleResize = function() { setIsMobile(window.innerWidth <= 768); };
    window.addEventListener('resize', handleResize);
    return function() { window.removeEventListener('resize', handleResize); };
  }, []);

  // Animated gradient canvas
  useEffect(function() {
    var canvas = canvasRef.current;
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var t = 0;

    var resize = function() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    var draw = function() {
      t += 0.005;
      var w = canvas.width;
      var h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Moving gradient blob 1 — green
      var g1x = w * (0.2 + 0.15 * Math.sin(t));
      var g1y = h * (0.5 + 0.3 * Math.cos(t * 0.7));
      var grad1 = ctx.createRadialGradient(g1x, g1y, 0, g1x, g1y, w * 0.4);
      grad1.addColorStop(0, darkMode ? 'rgba(0,245,160,0.18)' : 'rgba(0,200,130,0.15)');
      grad1.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);

      // Moving gradient blob 2 — purple
      var g2x = w * (0.75 + 0.15 * Math.cos(t * 0.8));
      var g2y = h * (0.5 + 0.3 * Math.sin(t * 0.6));
      var grad2 = ctx.createRadialGradient(g2x, g2y, 0, g2x, g2y, w * 0.35);
      grad2.addColorStop(0, darkMode ? 'rgba(124,58,237,0.2)' : 'rgba(124,58,237,0.12)');
      grad2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      // Moving gradient blob 3 — teal
      var g3x = w * (0.5 + 0.2 * Math.sin(t * 1.1 + 1));
      var g3y = h * (0.5 + 0.2 * Math.cos(t * 0.9 + 2));
      var grad3 = ctx.createRadialGradient(g3x, g3y, 0, g3x, g3y, w * 0.25);
      grad3.addColorStop(0, darkMode ? 'rgba(0,180,255,0.1)' : 'rgba(0,150,220,0.08)');
      grad3.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, w, h);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return function() {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [darkMode]);

  var links = [
    {
      label: 'GitHub',
      href: 'https://github.com/sujeetvishwakarma83',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sujeet-vishwakarma-a19b2323a/',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      label: 'Fiverr',
      href: 'https://www.fiverr.com/sujeet83/create-a-professional-website-using-html-css-javascript?context_referrer=tailored_homepage_perseus&source=recently_viewed_gigs&ref_ctx_id=6353f5cc3cb64563b06e2fe7486a55b0&context=recommendation&pckg_id=1&pos=1&context_alg=recently_viewed&seller_online=true&imp_id=a9942c75-161b-4904-b45e-d6d0f59110f6',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-1.74c.038-.196.064-.402.064-.643V8.716h1.3a.95.95 0 0 0 0-1.9h-1.3v-1.3a.95.95 0 0 0-1.9 0v5.724c0 .241.026.447.064.643H16.82c.037-.196.063-.402.063-.643V5.515a.95.95 0 0 0-1.9 0v5.724c0 .241.025.447.063.643h-1.481V8.716h.427a.95.95 0 0 0 0-1.9h-.427V5.984c0-1.68 1.08-1.867 1.58-1.867.42 0 .77.136.77.136a.95.95 0 0 0 .636-1.789s-.55-.247-1.406-.247c-1.83 0-3.48 1.253-3.48 3.767v.832H9.35a.95.95 0 0 0 0 1.9h1.315v2.968c0 .57-.117 1.002-.315 1.33-.201.33-.48.542-.84.657a.95.95 0 0 0 .568 1.813c.83-.26 1.52-.76 1.99-1.488.338-.527.522-1.162.573-1.848h1.44c.345 1.382 1.596 2.408 3.086 2.408 1.489 0 2.74-1.026 3.085-2.408h1.559a.95.95 0 0 0 0-1.9z"/>
        </svg>
      ),
    },
  ];

  var footerBg = darkMode ? '#0d0d14' : '#e8f5f0';
  var borderColor = darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,150,100,0.15)';
  var textColor = darkMode ? '#6b6b7a' : '#4a7a65';
  var linkColor = darkMode ? '#6b6b7a' : '#4a7a65';

  return (
    <footer style={{
      background: footerBg,
      borderTop: '1px solid ' + borderColor,
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Animated gradient canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1,
        padding: isMobile ? '2rem 1.5rem' : '2.5rem 4rem',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem',
      }}>

        {/* Left — branding */}
        <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
          <div style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.85rem',
            color: '#00f5a0',
            letterSpacing: '0.1em',
            marginBottom: '0.4rem',
            fontWeight: 700,
          }}>
            SV_portfolio
          </div>
          <p style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.68rem',
            color: textColor,
            letterSpacing: '0.03em',
          }}>
            2025 Sujeet Vishwakarma — Designed & Built with ♥
          </p>
        </div>

        {/* Right — Social Links with icons */}
        <div style={{
          display: 'flex',
          gap: isMobile ? '1rem' : '1.25rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {links.map(function(link) {
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                title={link.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.7rem',
                  color: linkColor,
                  textDecoration: 'none',
                  padding: '0.5rem 0.9rem',
                  border: '1px solid ' + borderColor,
                  borderRadius: '4px',
                  background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,150,100,0.05)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={function(e) {
                  e.currentTarget.style.color = '#00f5a0';
                  e.currentTarget.style.borderColor = '#00f5a0';
                  e.currentTarget.style.background = 'rgba(0,245,160,0.08)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={function(e) {
                  e.currentTarget.style.color = linkColor;
                  e.currentTarget.style.borderColor = borderColor;
                  e.currentTarget.style.background = darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,150,100,0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {link.icon}
                {!isMobile && link.label}
              </a>
            );
          })}
        </div>

      </div>

      {/* Bottom bar */}
      <div style={{
        position: 'relative', zIndex: 1,
        borderTop: '1px solid ' + borderColor,
        padding: isMobile ? '1rem 1.5rem' : '1rem 4rem',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
      }}>
        <p style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.62rem',
          color: darkMode ? 'rgba(107,107,122,0.6)' : 'rgba(74,122,101,0.6)',
          letterSpacing: '0.08em',
          margin: 0,
        }}>
          Built with React.js — Open to Freelance & Internship Opportunities
        </p>

        {/* Back to Home Button */}
        <button
          onClick={function() { window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.68rem',
            color: '#00f5a0',
            background: 'transparent',
            border: '1px solid rgba(0,245,160,0.35)',
            padding: '0.5rem 1.1rem',
            borderRadius: '4px',
            cursor: 'pointer',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={function(e) {
            e.currentTarget.style.background = '#00f5a0';
            e.currentTarget.style.color = '#000';
            e.currentTarget.style.borderColor = '#00f5a0';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,245,160,0.3)';
          }}
          onMouseLeave={function(e) {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#00f5a0';
            e.currentTarget.style.borderColor = 'rgba(0,245,160,0.35)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <svg
            width="14" height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
          Back to Top
        </button>

      </div>

    </footer>
  );
}

export default Footer;