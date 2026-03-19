import { useState, useEffect } from 'react';

function Navbar({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToHero = function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = function(e, id) {
    e.preventDefault();
    setMenuOpen(false);
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const links = ['about', 'skills', 'projects', 'contact'];

  var navBg = darkMode ? 'rgba(10,10,15,0.97)' : 'rgba(245,245,240,0.97)';
  var navBorder = darkMode ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.08)';
  var linkColor = darkMode ? '#6b6b7a' : '#888888';

  var navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
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
  };

  var logoStyle = {
    fontFamily: 'Space Mono, monospace',
    fontSize: '0.85rem',
    color: '#00f5a0',
    letterSpacing: '0.1em',
    textDecoration: 'none',
    cursor: 'pointer',
  };

  var ulStyle = {
    display: 'flex',
    gap: '2.5rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  var desktopLinkStyle = {
    fontFamily: 'Space Mono, monospace',
    fontSize: '0.75rem',
    letterSpacing: '0.08em',
    color: linkColor,
    textDecoration: 'none',
    textTransform: 'uppercase',
    transition: 'color 0.2s',
  };

  var themeButtonStyle = {
    background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)',
    border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.12)',
    borderRadius: '20px',
    padding: '0.35rem 0.75rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    transition: 'all 0.3s',
  };

  var hamburgerStyle = {
    background: 'none',
    border: darkMode ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.1)',
    color: '#00f5a0',
    fontFamily: 'Space Mono, monospace',
    fontSize: '0.8rem',
    padding: '0.4rem 0.65rem',
    cursor: 'pointer',
    letterSpacing: '0.05em',
  };

  var mobileMenuStyle = {
    width: '100%',
    background: navBg,
    borderTop: navBorder,
    listStyle: 'none',
    margin: '0.75rem 0 0 0',
    padding: '0.5rem 0',
    display: 'flex',
    flexDirection: 'column',
  };

  var mobileLinkStyle = {
    display: 'block',
    fontFamily: 'Space Mono, monospace',
    fontSize: '0.8rem',
    letterSpacing: '0.1em',
    color: linkColor,
    textDecoration: 'none',
    textTransform: 'uppercase',
    padding: '0.85rem 1.5rem',
    transition: 'color 0.2s',
    borderBottom: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.04)',
  };

  return (
    <nav style={navStyle}>

      <a href="#hero" onClick={scrollToHero} style={logoStyle}>
        Sujeet
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

        {!isMobile && (
          <ul style={ulStyle}>
            {links.map(function(item) {
              return (
                <li key={item}>
                  <a
                    href={'#' + item}
                    onClick={function(e) { scrollToSection(e, item); }}
                    style={desktopLinkStyle}
                    onMouseEnter={function(e) { e.target.style.color = '#00f5a0'; }}
                    onMouseLeave={function(e) { e.target.style.color = linkColor; }}
                  >
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>
        )}

        <button onClick={function() { setDarkMode(!darkMode); }} style={themeButtonStyle}>
          <span style={{ fontSize: '14px' }}>
            {darkMode ? '☀️' : '🌙'}
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

        {isMobile && (
          <button
            onClick={function() { setMenuOpen(!menuOpen); }}
            style={hamburgerStyle}
          >
            {menuOpen ? 'X' : '='}
          </button>
        )}

      </div>

      {isMobile && menuOpen && (
        <ul style={mobileMenuStyle}>
          {links.map(function(item) {
            return (
              <li key={item}>
                <a
                  href={'#' + item}
                  onClick={function(e) { scrollToSection(e, item); }}
                  style={mobileLinkStyle}
                  onMouseEnter={function(e) {
                    e.target.style.color = '#00f5a0';
                    e.target.style.background = 'rgba(0,245,160,0.05)';
                  }}
                  onMouseLeave={function(e) {
                    e.target.style.color = linkColor;
                    e.target.style.background = 'transparent';
                  }}
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
      )}

    </nav>
  );
}

export default Navbar;