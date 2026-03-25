import { useState, useEffect, useRef } from 'react';

var navIcons = {
  about: (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title xmlns="">account</title><g fill="none" stroke="currentColor" stroke-dasharray="28" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M4 21v-1c0 -3.31 2.69 -6 6 -6h4c3.31 0 6 2.69 6 6v1"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="28;0"/></path><path stroke-dashoffset="28" d="M12 11c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4Z"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" to="0"/></path></g></svg>
  ),

  skills: (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80"><title xmlns="">tools</title><g fill="none"><path fill="#828282" fill-rule="evenodd" d="m11.626 20.11l2.042 2.043l.354.353l4.949 4.95l.003-.004l3.155 3.156l6.688-1.792l1.791-6.687l-3.155-3.156l.003-.003l-4.95-4.95l-.353-.353l-2.042-2.042a15.589 15.589 0 0 1 20.255 20.566L64.07 55.895a6 6 0 0 1-8.485 8.485L39.128 47.923a7 7 0 0 0-11.568-6.367A15.59 15.59 0 0 1 11.625 20.11" clip-rule="evenodd"/><path stroke="#e0e0e0" stroke-linecap="square" stroke-linejoin="round" stroke-width="4" d="m37.171 41.828l11.314-11.313"/><path fill="#e0e0e0" d="m62.627 10.716l5.657 5.657l-11.13 13.958l-8.669.184l.184-8.67z"/><path fill="#f2c94c" d="M27.272 41.829a7 7 0 1 1 9.9 9.9L20.907 67.991a2 2 0 0 1-2.829 0l-7.07-7.072a2 2 0 0 1 0-2.828z"/><path fill="#eb5757" fill-rule="evenodd" d="m11.626 20.11l2.042 2.042l.353.354l4.95 4.949l.003-.003l3.155 3.155l6.688-1.791l1.791-6.688l-3.155-3.156l.003-.003l-4.95-4.949l-.353-.353l-2.042-2.042a15.59 15.59 0 0 1 16.954 3.394a15.589 15.589 0 1 1-25.44 5.09" clip-rule="evenodd"/></g></svg>
  ),

  projects: (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title xmlns="">cog-loop</title><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="22" d="M12 9c1.66 0 3 1.34 3 3c0 1.66 -1.34 3 -3 3c-1.66 0 -3 -1.34 -3 -3c0 -1.66 1.34 -3 3 -3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="22;0"/></path><path stroke-dasharray="44" stroke-dashoffset="44" d="M12 5.5c3.59 0 6.5 2.91 6.5 6.5c0 3.59 -2.91 6.5 -6.5 6.5c-3.59 0 -6.5 -2.91 -6.5 -6.5c0 -3.59 2.91 -6.5 6.5 -6.5Z"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.5s" to="0"/><set fill="freeze" attributeName="opacity" begin="0.8s" to="0"/></path><path d="M15.24 6.37c0.41 0.23 0.8 0.51 1.14 0.83c0 0 2.62 -1.08 2.63 -1.06c0 0 1.56 2.7 1.56 2.7c0.01 0.03 -2.22 1.75 -2.22 1.75c0.1 0.45 0.15 0.93 0.15 1.41" opacity="0"><animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/><set fill="freeze" attributeName="opacity" begin="0.8s" to="1"/><animate fill="freeze" attributeName="d" begin="0.8s" dur="0.2s" values="M15.24 6.37c0.41 0.23 0.8 0.51 1.14 0.83c0.22 0.2 0.42 0.41 0.61 0.63c0.47 0.57 0.86 1.22 1.12 1.94c0.09 0.26 0.17 0.54 0.24 0.82c0.1 0.45 0.15 0.93 0.15 1.41;M15.24 6.37c0.41 0.23 0.8 0.51 1.14 0.83c0 0 2.62 -1.08 2.63 -1.06c0 0 1.56 2.7 1.56 2.7c0.01 0.03 -2.22 1.75 -2.22 1.75c0.1 0.45 0.15 0.93 0.15 1.41"/></path><path d="M18.5 11.99c0.01 0.47 -0.04 0.95 -0.15 1.4c0 0 2.25 1.73 2.23 1.75c0 0 -1.56 2.7 -1.56 2.7c-0.02 0.02 -2.63 -1.05 -2.63 -1.05c-0.34 0.31 -0.73 0.59 -1.15 0.83" opacity="0"><animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/><set fill="freeze" attributeName="opacity" begin="0.8s" to="1"/><animate fill="freeze" attributeName="d" begin="0.8s" dur="0.2s" values="M18.5 11.99c0.01 0.47 -0.04 0.95 -0.15 1.4c-0.06 0.29 -0.15 0.57 -0.24 0.84c-0.26 0.69 -0.63 1.35 -1.12 1.94c-0.18 0.21 -0.38 0.42 -0.59 0.62c-0.34 0.31 -0.73 0.59 -1.15 0.83;M18.5 11.99c0.01 0.47 -0.04 0.95 -0.15 1.4c0 0 2.25 1.73 2.23 1.75c0 0 -1.56 2.7 -1.56 2.7c-0.02 0.02 -2.63 -1.05 -2.63 -1.05c-0.34 0.31 -0.73 0.59 -1.15 0.83"/></path><path d="M15.26 17.62c-0.4 0.24 -0.84 0.44 -1.29 0.57c0 0 -0.37 2.81 -0.4 2.81c0 0 -3.12 0 -3.12 0c-0.03 -0.01 -0.41 -2.8 -0.41 -2.8c-0.44 -0.14 -0.88 -0.34 -1.3 -0.58" opacity="0"><animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/><set fill="freeze" attributeName="opacity" begin="0.8s" to="1"/><animate fill="freeze" attributeName="d" begin="0.8s" dur="0.2s" values="M15.26 17.62c-0.4 0.24 -0.84 0.44 -1.29 0.57c-0.28 0.09 -0.57 0.16 -0.85 0.21c-0.73 0.12 -1.49 0.13 -2.24 0c-0.27 -0.05 -0.55 -0.12 -0.83 -0.2c-0.44 -0.14 -0.88 -0.34 -1.3 -0.58;M15.26 17.62c-0.4 0.24 -0.84 0.44 -1.29 0.57c0 0 -0.37 2.81 -0.4 2.81c0 0 -3.12 0 -3.12 0c-0.03 -0.01 -0.41 -2.8 -0.41 -2.8c-0.44 -0.14 -0.88 -0.34 -1.3 -0.58"/></path><path d="M8.76 17.63c-0.41 -0.23 -0.8 -0.51 -1.14 -0.83c0 0 -2.62 1.08 -2.63 1.06c0 0 -1.56 -2.7 -1.56 -2.7c-0.01 -0.03 2.22 -1.75 2.22 -1.75c-0.1 -0.45 -0.15 -0.93 -0.15 -1.41" opacity="0"><animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/><set fill="freeze" attributeName="opacity" begin="0.8s" to="1"/><animate fill="freeze" attributeName="d" begin="0.8s" dur="0.2s" values="M8.76 17.63c-0.41 -0.23 -0.8 -0.51 -1.14 -0.83c-0.22 -0.2 -0.42 -0.41 -0.61 -0.63c-0.47 -0.57 -0.86 -1.22 -1.12 -1.94c-0.09 -0.26 -0.17 -0.54 -0.24 -0.82c-0.1 -0.45 -0.15 -0.93 -0.15 -1.41;M8.76 17.63c-0.41 -0.23 -0.8 -0.51 -1.14 -0.83c0 0 -2.62 1.08 -2.63 1.06c0 0 -1.56 -2.7 -1.56 -2.7c-0.01 -0.03 2.22 -1.75 2.22 -1.75c-0.1 -0.45 -0.15 -0.93 -0.15 -1.41"/></path><path d="M5.5 12.01c-0.01 -0.47 0.04 -0.95 0.15 -1.4c0 0 -2.25 -1.73 -2.23 -1.75c0 0 1.56 -2.7 1.56 -2.7c0.02 -0.02 2.63 1.05 2.63 1.05c0.34 -0.31 0.73 -0.59 1.15 -0.83" opacity="0"><animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/><set fill="freeze" attributeName="opacity" begin="0.8s" to="1"/><animate fill="freeze" attributeName="d" begin="0.8s" dur="0.2s" values="M5.5 12.01c-0.01 -0.47 0.04 -0.95 0.15 -1.4c0.06 -0.29 0.15 -0.57 0.24 -0.84c0.26 -0.69 0.63 -1.35 1.12 -1.94c0.18 -0.21 0.38 -0.42 0.59 -0.62c0.34 -0.31 0.73 -0.59 1.15 -0.83;M5.5 12.01c-0.01 -0.47 0.04 -0.95 0.15 -1.4c0 0 -2.25 -1.73 -2.23 -1.75c0 0 1.56 -2.7 1.56 -2.7c0.02 -0.02 2.63 1.05 2.63 1.05c0.34 -0.31 0.73 -0.59 1.15 -0.83"/></path><path d="M8.74 6.38c0.4 -0.24 0.84 -0.44 1.29 -0.57c0 0 0.37 -2.81 0.4 -2.81c0 0 3.12 0 3.12 0c0.03 0.01 0.41 2.8 0.41 2.8c0.44 0.14 0.88 0.34 1.3 0.58" opacity="0"><animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/><set fill="freeze" attributeName="opacity" begin="0.8s" to="1"/><animate fill="freeze" attributeName="d" begin="0.8s" dur="0.2s" values="M8.74 6.38c0.4 -0.24 0.84 -0.44 1.29 -0.57c0.28 -0.09 0.57 -0.16 0.85 -0.21c0.73 -0.12 1.49 -0.13 2.24 0c0.27 0.05 0.55 0.12 0.83 0.2c0.44 0.14 0.88 0.34 1.3 0.58;M8.74 6.38c0.4 -0.24 0.84 -0.44 1.29 -0.57c0 0 0.37 -2.81 0.4 -2.81c0 0 3.12 0 3.12 0c0.03 0.01 0.41 2.8 0.41 2.8c0.44 0.14 0.88 0.34 1.3 0.58"/></path></g></svg>
  ),

  contact: (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title xmlns="">email-alt-twotone</title><path fill="currentColor" fill-opacity="0" d="M12 13l-8 -5v10h16v-10l-8 5Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.9s" dur="0.15s" to=".3"/></path><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="66" d="M4 5h16c0.55 0 1 0.45 1 1v12c0 0.55 -0.45 1 -1 1h-16c-0.55 0 -1 -0.45 -1 -1v-12c0 -0.55 0.45 -1 1 -1Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="66;0"/></path><path stroke-dasharray="24" stroke-dashoffset="24" d="M3 6.5l9 5.5l9 -5.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.3s" to="0"/></path></g></svg>
  ),
};
function Navbar({ darkMode, setDarkMode }) {
  var [scrolled, setScrolled] = useState(false);
  var [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  var [menuOpen, setMenuOpen] = useState(false);
  var [activeSection, setActiveSection] = useState('');
  var [scrollDir, setScrollDir] = useState('down');
  var [linePos, setLinePos] = useState(0);
  var lastScrollY = useRef(0);
  var ulRef = useRef(null);

  var links = ['about', 'skills', 'education', 'projects', 'contact'];

  useEffect(function() {
    var handleScroll = function() {
      var currentY = window.scrollY;

      // Scroll direction
      if (currentY > lastScrollY.current) {
        setScrollDir('down');
      } else {
        setScrollDir('up');
      }
      lastScrollY.current = currentY;

      setScrolled(currentY > 50);

      // Active section detect karo
      var sections = ['about', 'skills', 'education', 'projects', 'contact'];
      var current = '';
      sections.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) {
          var rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = id;
          }
        }
      });
      setActiveSection(current);
    };

    var handleResize = function() {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return function() {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Animated line position — active link ke neeche
  useEffect(function() {
    if (!ulRef.current || !activeSection) return;
    var activeLink = ulRef.current.querySelector('[data-id="' + activeSection + '"]');
    if (activeLink) {
      var ulRect = ulRef.current.getBoundingClientRect();
      var linkRect = activeLink.getBoundingClientRect();
      setLinePos(linkRect.left - ulRect.left);
    }
  }, [activeSection]);

  var scrollToHero = function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  var scrollToSection = function(e, id) {
    e.preventDefault();
    setMenuOpen(false);
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  var navBg = darkMode ? 'rgba(10,10,15,0.97)' : 'rgba(245,245,240,0.97)';
  var navBorder = darkMode ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.08)';
  var linkColor = darkMode ? '#6b6b7a' : '#888888';

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: isMobile ? '1rem 1.25rem' : '1.25rem 4rem',
      background: (scrolled || menuOpen) ? navBg : 'transparent',
      backdropFilter: 'blur(16px)',
      borderBottom: scrolled ? navBorder : 'none',
      transition: 'all 0.3s ease',
    }}>

      {/* Logo */}
      <a
        href="#hero"
        onClick={scrollToHero}
        style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.85rem',
          color: '#00f5a0',
          letterSpacing: '0.1em',
          textDecoration: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        {/* Logo icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title xmlns="">home-alt-twotone</title><path fill="currentColor" fill-opacity="0" d="M10 13h4v8h-4Z"><animate fill="freeze" attributeName="fill-opacity" begin="1.5s" dur="0.15s" to=".3"/></path><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="18" d="M4.5 21.5h15"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="18;0"/></path><path stroke-dasharray="16" stroke-dashoffset="16" d="M4.5 21.5v-13.5M19.5 21.5v-13.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.3s" to="0"/></path><path stroke-dasharray="28" stroke-dashoffset="28" d="M2 10l10 -8l10 8"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.4s" to="0"/></path><path stroke-dasharray="26" stroke-dashoffset="26" d="M9.5 21.5v-9h5v9"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.6s" to="0"/></path></g></svg>
        Sujeet
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

        {/* Desktop Links */}
        {!isMobile && (
          <div style={{ position: 'relative' }}>
            <ul
              ref={ulRef}
              style={{
                display: 'flex',
                gap: '0rem',
                listStyle: 'none',
                margin: 0,
                padding: 0,
                position: 'relative',
              }}
            >
              {links.map(function(item) {
                var isActive = activeSection === item;
                return (
                  <li key={item}>
                    <a
                      href={'#' + item}
                      data-id={item}
                      onClick={function(e) { scrollToSection(e, item); }}
                      style={{
                        fontFamily: 'Space Mono, monospace',
                        fontSize: '0.72rem',
                        letterSpacing: '0.08em',
                        color: isActive ? '#00f5a0' : linkColor,
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        transition: 'color 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.4rem 1rem',
                        position: 'relative',
                      }}
                      onMouseEnter={function(e) {
                        e.currentTarget.style.color = '#00f5a0';
                      }}
                      onMouseLeave={function(e) {
                        e.currentTarget.style.color = isActive ? '#00f5a0' : linkColor;
                      }}
                    >
                      {/* Icon */}
                      <span style={{
                        opacity: isActive ? 1 : 0.5,
                        transition: 'opacity 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                        {navIcons[item]}
                      </span>
                      {item}
                    </a>
                  </li>
                );
              })}

              {/* Animated underline */}
              {activeSection && (
                <div style={{
                  position: 'absolute',
                  bottom: '-3px',
                  left: linePos + 'px',
                  width: '110px',
                  height: '2px',
                  background: 'linear-gradient(90deg, #00f5a0, #7c3aed)',
                  transition: scrollDir === 'down'
                    ? 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s ease'
                    : 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s ease',
                  transform: scrollDir === 'down' ? 'scaleX(1) translateX(0)' : 'scaleX(1) translateX(0)',
                  transformOrigin: scrollDir === 'down' ? 'right' : 'left',
                  borderRadius: '2px',
                }} />
              )}

            </ul>

            {/* Scroll direction indicator line */}
            <div style={{
              position: 'absolute',
              bottom: '-2px',
              left: 0,
              right: 0,
              height: '2px',
              background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                height: '100%',
                width: '40%',
                background: 'linear-gradient(90deg, transparent, rgba(0,245,160,0.3), transparent)',
                left: scrollDir === 'down' ? '100%' : '-40%',
                animation: scrolled ? (scrollDir === 'down' ? 'slideRight 1s ease infinite' : 'slideLeft 1s ease infinite') : 'none',
              }} />
            </div>

          </div>
        )}

        {/* Theme Toggle */}
        <button
          onClick={function() { setDarkMode(!darkMode); }}
          style={{
            background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)',
            border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.12)',
            borderRadius: '20px',
            padding: '0.35rem 0.75rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            transition: 'all 0.3s',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center' }}>
  {darkMode ? (
    // ☀️ Light Mode Icon
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><title xmlns="">clear-day-fill</title><defs><linearGradient id="SVGeq4GoeLw" x1="150" x2="234" y1="119.2" y2="264.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".5" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient><symbol id="SVG0a04Kbxn" viewBox="0 0 384 384"><circle cx="192" cy="192" r="84" fill="url(#SVGeq4GoeLw)" stroke="#f8af18" stroke-miterlimit="10" stroke-width="6"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="24" d="M192 61.7V12m0 360v-49.7m92.2-222.5l35-35M64.8 319.2l35.1-35.1m0-184.4l-35-35m254.5 254.5l-35.1-35.1M61.7 192H12m360 0h-49.7"><animateTransform additive="sum" attributeName="transform" dur="6s" repeatCount="indefinite" type="rotate" values="0 192 192; 45 192 192"/></path></symbol></defs><use width="384" height="384" href="#SVG0a04Kbxn" transform="translate(64 64)"/></svg>
  ) : (
    // 🌙 Dark Mode Icon
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><title xmlns="">falling-stars-fill</title><defs><linearGradient id="SVGpS2jccQh" x1="54.3" x2="187.2" y1="29" y2="259.1" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".5" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/></linearGradient><linearGradient id="SVGd7QnDc9f" x1="344.3" x2="375.7" y1="153.9" y2="208.3" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fcd966"/><stop offset=".5" stop-color="#fcd966"/><stop offset="1" stop-color="#fccd34"/></linearGradient><linearGradient id="SVGQTOPYbHv" x1="294" x2="330" y1="112.8" y2="175.2" href="#SVGd7QnDc9f"/><linearGradient id="SVGK4VCRbuf" x1="356.3" x2="387.7" y1="194.8" y2="249.2" href="#SVGd7QnDc9f"/><clipPath id="SVGt2Tt9c7j"><path fill="none" d="M512 27.5L240 189.1l16 48l40 32l216-96V27.5z"/></clipPath><symbol id="SVG7sC0PeQg" viewBox="0 0 270 270"><path fill="url(#SVGpS2jccQh)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width="6" d="M252.3 168.6A133.4 133.4 0 0 1 118 36.2A130.5 130.5 0 0 1 122.5 3A133 133 0 0 0 3 134.6C3 207.7 63 267 137.2 267c62.5 0 114.8-42.2 129.8-99.2a135.6 135.6 0 0 1-14.8.8Z"><animateTransform additive="sum" attributeName="transform" dur="6s" repeatCount="indefinite" type="rotate" values="-15 135 135; 9 135 135; -15 135 135"/></path></symbol></defs><g clip-path="url(#SVGt2Tt9c7j)" opacity="0"><path fill="none" stroke="#fcd34d" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" d="m332 193.1l-5.4 2.7"/><path fill="none" stroke="#fcd34d" stroke-dasharray="12.6 12.6" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" d="M315.4 201.4L231 243.6"/><path fill="none" stroke="#fcd34d" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" d="m225.4 246.4l-5.4 2.7"/><path fill="url(#SVGd7QnDc9f)" stroke="#fcd34d" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m329.1 165.3l18 18.3a1.8 1.8 0 0 1 .5 1.8l-6.5 24.9a1.8 1.8 0 0 0 3 1.7l18.4-18a1.8 1.8 0 0 1 1.7-.4l25 6.4a1.8 1.8 0 0 0 1.7-3l-18-18.4a1.8 1.8 0 0 1-.5-1.7l6.4-24.9a1.8 1.8 0 0 0-3-1.7l-18.3 18a1.8 1.8 0 0 1-1.7.4l-25-6.4a1.8 1.8 0 0 0-1.7 3Z"/><animateTransform id="SVGm4hF6cWt" additive="sum" attributeName="transform" begin="0s; x1.end+2s" dur="1s" repeatCount="indefinite" type="translate" values="-126 48; 42 -30"/><animate id="SVGMSOEXcsB" attributeName="opacity" begin="0s; y1.end+2s" calcMode="spline" dur="1s" keySplines=".42, 0, .58, 1; .42, 0, .58, 1; .42, 0, .58, 1" keyTimes="0; .17; .67; 1" values="0; 1; 1; 0"/></g><path fill="url(#SVGQTOPYbHv)" stroke="#fcd34d" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m282.8 162.8l25-6.4a1.8 1.8 0 0 1 1.7.5l18.3 18a1.8 1.8 0 0 0 3-1.7l-6.4-25a1.8 1.8 0 0 1 .5-1.7l18-18.4a1.8 1.8 0 0 0-1.8-3l-24.9 6.5a1.8 1.8 0 0 1-1.7-.5l-18.4-18a1.8 1.8 0 0 0-3 1.7l6.5 25a1.8 1.8 0 0 1-.5 1.7l-18 18.3a1.8 1.8 0 0 0 1.7 3Z"><animateTransform additive="sum" attributeName="transform" calcMode="spline" dur="6s" keySplines=".42, 0, .58, 1; .42, 0, .58, 1" repeatCount="indefinite" type="rotate" values="-15 312 144; 15 312 144; -15 312 144"/><animate attributeName="opacity" calcMode="spline" dur="6s" keySplines=".42, 0, .58, 1; .42, 0, .58, 1; .42, 0, .58, 1; .42, 0, .58, 1; .42, 0, .58, 1; .42, 0, .58, 1" repeatCount="indefinite" values="1; .75; 1; .75; 1; .75; 1"/></path><path fill="url(#SVGK4VCRbuf)" stroke="#fcd34d" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m337.3 223.7l24.8 7a1.8 1.8 0 0 1 1.3 1.2l6.9 24.8a1.8 1.8 0 0 0 3.4 0l7-24.8a1.8 1.8 0 0 1 1.2-1.3l24.8-6.9a1.8 1.8 0 0 0 0-3.4l-24.8-7a1.8 1.8 0 0 1-1.3-1.2l-6.9-24.8a1.8 1.8 0 0 0-3.4 0l-7 24.8a1.8 1.8 0 0 1-1.2 1.3l-24.8 6.9a1.8 1.8 0 0 0 0 3.4Z"><animateTransform additive="sum" attributeName="transform" begin="-.67s" calcMode="spline" dur="6s" keySplines=".42, 0, .58, 1; .42, 0, .58, 1" repeatCount="indefinite" type="rotate" values="-15 372 222; 15 372 222; -15 372 222"/><animate attributeName="opacity" begin="-.67s" calcMode="spline" dur="6s" keySplines=".42, 0, .58, 1; .42, 0, .58, 1; .42, 0, .58, 1; .42, 0, .58, 1; .42, 0, .58, 1; .42, 0, .58, 1" repeatCount="indefinite" values="1; .75; 1; .75; 1; .75; 1"/></path><use width="270" height="270" href="#SVG7sC0PeQg" transform="translate(121 121)"/></svg>
  )}
</span>
          {!isMobile && (
            <span style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.65rem',
              color: linkColor,
              letterSpacing: '0.05em',
            }}>
              {darkMode ? 'LIGHT' : 'DARK'}
            </span>
          )}
        </button>

        {/* Mobile Hamburger */}
        {isMobile && (
          <button
            onClick={function() { setMenuOpen(!menuOpen); }}
            style={{
              background: 'none',
              border: darkMode ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.1)',
              color: '#00f5a0',
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.8rem',
              padding: '0.4rem 0.65rem',
              cursor: 'pointer',
              letterSpacing: '0.05em',
            }}
          >
            {menuOpen ? 'X' : '='}
          </button>
        )}

      </div>

      {/* Mobile Dropdown */}
      {isMobile && menuOpen && (
        <ul style={{
          width: '100%',
          background: navBg,
          borderTop: navBorder,
          listStyle: 'none',
          margin: '0.75rem 0 0 0',
          padding: '0.5rem 0',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {links.map(function(item) {
            var isActive = activeSection === item;
            return (
              <li key={item}>
                <a
                  href={'#' + item}
                  onClick={function(e) { scrollToSection(e, item); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '0.8rem',
                    letterSpacing: '0.1em',
                    color: isActive ? '#00f5a0' : linkColor,
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    padding: '0.85rem 1.5rem',
                    transition: 'color 0.2s',
                    borderBottom: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.04)',
                    borderLeft: isActive ? '2px solid #00f5a0' : '2px solid transparent',
                    background: isActive ? 'rgba(0,245,160,0.05)' : 'transparent',
                  }}
                  onMouseEnter={function(e) {
                    e.currentTarget.style.color = '#00f5a0';
                    e.currentTarget.style.background = 'rgba(0,245,160,0.05)';
                  }}
                  onMouseLeave={function(e) {
                    e.currentTarget.style.color = isActive ? '#00f5a0' : linkColor;
                    e.currentTarget.style.background = isActive ? 'rgba(0,245,160,0.05)' : 'transparent';
                  }}
                >
                  <span style={{ color: '#00f5a0', display: 'flex', alignItems: 'center' }}>
                    {navIcons[item]}
                  </span>
                  {item}
                  {isActive && (
                    <span style={{
                      marginLeft: 'auto',
                      width: '6px', height: '6px',
                      borderRadius: '50%',
                      background: '#00f5a0',
                    }} />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      )}

      {/* CSS animations */}
      <style>{`
        @keyframes slideRight {
          0% { left: -40%; }
          100% { left: 140%; }
        }
        @keyframes slideLeft {
          0% { left: 140%; }
          100% { left: -40%; }
        }
      `}</style>

    </nav>
  );
}

export default Navbar;