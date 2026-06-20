import React, { useState, useEffect, useRef } from 'react';
import myLogo from '../assets/logo.png';

const navIcons = {
  about: (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title>account</title><g fill="none" stroke="currentColor" strokeDasharray="28" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M4 21v-1c0 -3.31 2.69 -6 6 -6h4c3.31 0 6 2.69 6 6v1"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="28;0"/></path><path strokeDashoffset="28" d="M12 11c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4Z"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" to="0"/></path></g></svg>
  ),
  services: (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
  ),
  skills: (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80"><title>tools</title><g fill="none"><path fill="#828282" fillRule="evenodd" d="m11.626 20.11l2.042 2.043l.354.353l4.949 4.95l.003-.004l3.155 3.156l6.688-1.792l1.791-6.687l-3.155-3.156l.003-.003l-4.95-4.95l-.353-.353l-2.042-2.042a15.589 15.589 0 0 1 20.255 20.566L64.07 55.895a6 6 0 0 1-8.485 8.485L39.128 47.923a7 7 0 0 0-11.568-6.367A15.59 15.59 0 0 1 11.625 20.11" clipRule="evenodd"/><path stroke="#e0e0e0" strokeLinecap="square" strokeLinejoin="round" strokeWidth="4" d="m37.171 41.828l11.314-11.313"/><path fill="#e0e0e0" d="m62.627 10.716l5.657 5.657l-11.13 13.958l-8.669.184l.184-8.67z"/><path fill="#f2c94c" d="M27.272 41.829a7 7 0 1 1 9.9 9.9L20.907 67.991a2 2 0 0 1-2.829 0l-7.07-7.072a2 2 0 0 1 0-2.828z"/><path fill="#eb5757" fillRule="evenodd" d="m11.626 20.11l2.042 2.042l.353.354l4.95 4.949l.003-.003l3.155 3.155l6.688-1.791l1.791-6.688l-3.155-3.156l.003-.003l-4.95-4.949l-.353-.353l-2.042-2.042a15.59 15.59 0 0 1 16.954 3.394a15.589 15.589 0 1 1-25.44 5.09" clipRule="evenodd"/></g></svg>
  ),
  education: (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
  ),
  projects: (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title>cog-loop</title><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="22" d="M12 9c1.66 0 3 1.34 3 3c0 1.66 -1.34 3 -3 3c-1.66 0 -3 -1.34 -3 -3c0 -1.66 1.34 -3 3 -3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="22;0"/></path><path strokeDasharray="44" strokeDashoffset="44" d="M12 5.5c3.59 0 6.5 2.91 6.5 6.5c0 3.59 -2.91 6.5 -6.5 6.5c-3.59 0 -6.5 -2.91 -6.5 -6.5c0 -3.59 2.91 -6.5 6.5 -6.5Z"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.5s" to="0"/><set fill="freeze" attributeName="opacity" begin="0.8s" to="0"/></path><path d="M15.24 6.37c0.41 0.23 0.8 0.51 1.14 0.83c0 0 2.62 -1.08 2.63 -1.06c0 0 1.56 2.7 1.56 2.7c0.01 0.03 -2.22 1.75 -2.22 1.75c0.1 0.45 0.15 0.93 0.15 1.41" opacity="0"><animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/><set fill="freeze" attributeName="opacity" begin="0.8s" to="1"/><animate fill="freeze" attributeName="d" begin="0.8s" dur="0.2s" values="M15.24 6.37c0.41 0.23 0.8 0.51 1.14 0.83c0.22 0.2 0.42 0.41 0.61 0.63c0.47 0.57 0.86 1.22 1.12 1.94c0.09 0.26 0.17 0.54 0.24 0.82c0.1 0.45 0.15 0.93 0.15 1.41;M15.24 6.37c0.41 0.23 0.8 0.51 1.14 0.83c0 0 2.62 -1.08 2.63 -1.06c0 0 1.56 2.7 1.56 2.7c0.01 0.03 -2.22 1.75 -2.22 1.75c0.1 0.45 0.15 0.93 0.15 1.41"/></path><path d="M18.5 11.99c0.01 0.47 -0.04 0.95 -0.15 1.4c0 0 2.25 1.73 2.23 1.75c0 0 -1.56 2.7 -1.56 2.7c-0.02 0.02 -2.63 -1.05 -2.63 -1.05c-0.34 0.31 -0.73 0.59 -1.15 0.83" opacity="0"><animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/><set fill="freeze" attributeName="opacity" begin="0.8s" to="1"/><animate fill="freeze" attributeName="d" begin="0.8s" dur="0.2s" values="M18.5 11.99c0.01 0.47 -0.04 0.95 -0.15 1.4c-0.06 0.29 -0.15 0.57 -0.24 0.84c-0.26 0.69 -0.63 1.35 -1.12 1.94c-0.18 0.21 -0.38 0.42 -0.59 0.62c-0.34 0.31 -0.73 0.59 -1.15 0.83;M18.5 11.99c0.01 0.47 -0.04 0.95 -0.15 1.4c0 0 2.25 1.73 2.23 1.75c0 0 -1.56 2.7 -1.56 2.7c-0.02 0.02 -2.63 -1.05 -2.63 -1.05c-0.34 0.31 -0.73 0.59 -1.15 0.83"/></path><path d="M15.26 17.62c-0.4 0.24 -0.84 0.44 -1.29 0.57c0 0 -0.37 2.81 -0.4 2.81c0 0 -3.12 0 -3.12 0c-0.03 -0.01 -0.41 -2.8 -0.41 -2.8c-0.44 -0.14 -0.88 -0.34 -1.3 -0.58" opacity="0"><animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/><set fill="freeze" attributeName="opacity" begin="0.8s" to="1"/><animate fill="freeze" attributeName="d" begin="0.8s" dur="0.2s" values="M15.26 17.62c-0.4 0.24 -0.84 0.44 -1.29 0.57c-0.28 0.09 -0.57 0.16 -0.85 0.21c-0.73 0.12 -1.49 0.13 -2.24 0c-0.27 -0.05 -0.55 -0.12 -0.83 -0.2c-0.44 -0.14 -0.88 -0.34 -1.3 -0.58;M15.26 17.62c-0.4 0.24 -0.84 0.44 -1.29 0.57c0 0 -0.37 2.81 -0.4 2.81c0 0 -3.12 0 -3.12 0c-0.03 -0.01 -0.41 -2.8 -0.41 -2.8c-0.44 -0.14 -0.88 -0.34 -1.3 -0.58"/></path><path d="M8.76 17.63c-0.41 -0.23 -0.8 -0.51 -1.14 -0.83c0 0 -2.62 1.08 -2.63 1.06c0 0 -1.56 -2.7 -1.56 -2.7c-0.01 -0.03 2.22 -1.75 2.22 -1.75c-0.1 -0.45 -0.15 -0.93 -0.15 -1.41" opacity="0"><animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/><set fill="freeze" attributeName="opacity" begin="0.8s" to="1"/><animate fill="freeze" attributeName="d" begin="0.8s" dur="0.2s" values="M8.76 17.63c-0.41 -0.23 -0.8 -0.51 -1.14 -0.83c-0.22 -0.2 -0.42 -0.41 -0.61 -0.63c-0.47 -0.57 -0.86 -1.22 -1.12 -1.94c-0.09 -0.26 -0.17 -0.54 -0.24 -0.82c-0.1 -0.45 -0.15 -0.93 -0.15 -1.41;M8.76 17.63c-0.41 -0.23 -0.8 -0.51 -1.14 -0.83c0 0 -2.62 1.08 -2.63 1.06c0 0 -1.56 -2.7 -1.56 -2.7c-0.01 -0.03 2.22 -1.75 2.22 -1.75c-0.1 -0.45 -0.15 -0.93 -0.15 -1.41"/></path><path d="M5.5 12.01c-0.01 -0.47 0.04 -0.95 0.15 -1.4c0 0 -2.25 -1.73 -2.23 -1.75c0 0 1.56 -2.7 1.56 -2.7c0.02 -0.02 2.63 1.05 2.63 1.05c0.34 -0.31 0.73 -0.59 1.15 -0.83" opacity="0"><animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/><set fill="freeze" attributeName="opacity" begin="0.8s" to="1"/><animate fill="freeze" attributeName="d" begin="0.8s" dur="0.2s" values="M5.5 12.01c-0.01 -0.47 0.04 -0.95 0.15 -1.4c0.06 -0.29 0.15 -0.57 0.24 -0.84c0.26 -0.69 0.63 -1.35 1.12 -1.94c0.18 -0.21 0.38 -0.42 0.59 -0.62c0.34 -0.31 0.73 -0.59 1.15 -0.83;M5.5 12.01c-0.01 -0.47 0.04 -0.95 0.15 -1.4c0 0 -2.25 -1.73 -2.23 -1.75c0 0 1.56 -2.7 1.56 -2.7c0.02 -0.02 2.63 1.05 2.63 1.05c0.34 -0.31 0.73 -0.59 1.15 -0.83"/></path><path d="M8.74 6.38c0.4 -0.24 0.84 -0.44 1.29 -0.57c0 0 0.37 -2.81 0.4 -2.81c0 0 3.12 0 3.12 0c0.03 0.01 0.41 2.8 0.41 2.8c0.44 0.14 0.88 0.34 1.3 0.58" opacity="0"><animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/><set fill="freeze" attributeName="opacity" begin="0.8s" to="1"/><animate fill="freeze" attributeName="d" begin="0.8s" dur="0.2s" values="M8.74 6.38c0.4 -0.24 0.84 -0.44 1.29 -0.57c0.28 -0.09 0.57 -0.16 0.85 -0.21c0.73 -0.12 1.49 -0.13 2.24 0c0.27 0.05 0.55 0.12 0.83 0.2c0.44 0.14 0.88 0.34 1.3 0.58;M8.74 6.38c0.4 -0.24 0.84 -0.44 1.29 -0.57c0 0 0.37 -2.81 0.4 -2.81c0 0 3.12 0 3.12 0c0.03 0.01 0.41 2.8 0.41 2.8c0.44 0.14 0.88 0.34 1.3 0.58"/></path></g></svg>
  ),
  'why-hire-me': (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
  ),
  contact: (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title>email-alt-twotone</title><path fill="currentColor" fillOpacity="0" d="M12 13l-8 -5v10h16v-10l-8 5Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.9s" dur="0.15s" to=".3"/></path><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="66" d="M4 5h16c0.55 0 1 0.45 1 1v12c0 0.55 -0.45 1 -1 1h-16c-0.55 0 -1 -0.45 -1 -1v-12c0 -0.55 0.45 -1 1 -1Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="66;0"/></path><path strokeDasharray="24" strokeDashoffset="24" d="M3 6.5l9 5.5l9 -5.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.3s" to="0"/></path></g></svg>
  ),
};

const socialIcons = {
  github: (color) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ color }}><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
  ),
  linkedin: (color) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ color }}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0.774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24.774 23.2 0 22.222 0h.003z"/></svg>
  ),
  instagram: (color) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ color }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/></svg>
  ),
  whatsapp: (color) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ color }}><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 2.519 1.334 4.515 1.335 5.51.001 9.997-4.486 10-10 .002-2.641-1.03-5.124-2.906-7C16.327 1.618 13.847.585 11.993.585 6.492.585 2.005 5.072 2.001 10.572c-.001 1.902.486 3.242 1.366 4.936l-.997 3.642 3.731-.978L6.647 19.15zm10.21-6.141c-.272-.137-1.614-.796-1.863-.887-.249-.09-.431-.137-.613.137-.182.273-.703.887-.862 1.07-.159.182-.317.205-.59.069-.272-.136-1.15-.424-2.19-1.353-.809-.721-1.355-1.614-1.514-1.886-.159-.273-.017-.42.12-.556.122-.122.272-.318.408-.477.136-.159.182-.273.272-.455.09-.182.046-.341-.023-.477-.069-.136-.613-1.477-.84-2.023-.22-.53-.443-.457-.613-.466-.159-.008-.34-.01-.522-.01-.182 0-.476.069-.726.341-.25.272-.953.932-.953 2.273 0 1.341.977 2.636 1.113 2.818.136.182 1.92 2.931 4.65 4.113.65.28 1.157.448 1.554.574.654.208 1.25.179 1.721.109.525-.078 1.614-.659 1.841-1.295.227-.636.227-1.182.159-1.295-.068-.113-.249-.205-.522-.341z"/></svg>
  ),
  fiverr: (color) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ color }}><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m2.41 5.29a1.06 1.06 0 1 1-1.06 1.06 1.06 1.06 0 0 1 1.06-1.06m2 9.38h-3.89v-1.58h.82v-3.35H10.7v3.35h1v1.58h-4v-1.58h.83v-3.35h-.9v-1.59h.89v-.27c0-2.14 1.86-2.42 2.88-2.42a7 7 0 0 1 .77 0v1.76a2.5 2.5 0 0 0-.53 0c-.31 0-.94 0-.94.64v.32h4.84v4.95h.83z"/></svg>
  ),
  email: (color) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ color }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6"/></svg>
  ),
};

const links = ['about', 'services', 'skills', 'education', 'projects', 'why-hire-me', 'contact'];

function Navbar({ darkMode, setDarkMode, onToggleBookMode = null }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200); 
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [linePos, setLinePos] = useState(0);
  const [lineWidth, setLineWidth] = useState(0);
  
  const lastScrollY = useRef(0);
  const ulRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      lastScrollY.current = currentY;

      setScrolled(currentY > 50);

      let current = '';
      links.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom >= 80) {
            current = id;
          }
        }
      });
      setActiveSection(current);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1200); 
      if (window.innerWidth > 1200) setMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!ulRef.current || !activeSection) return;
    const activeLink = ulRef.current.querySelector(`[data-id="${activeSection}"]`);
    if (activeLink) {
      const ulRect = ulRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setLinePos(linkRect.left - ulRect.left);
      setLineWidth(linkRect.width);
    }
  }, [activeSection]);

  const scrollToHero = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -35; 
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navBg = darkMode ? 'rgba(25,25,38,0.92)' : 'rgba(255,255,255,0.95)';
  const navBorder = darkMode ? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(0,0,0,0.15)';
  const linkColor = darkMode ? '#9ca3af' : '#64748b';
  const glowColor = '#00f5a0';

  const socialLinks = [
    { name: 'whatsapp', href: 'https://wa.me/917800383448', label: 'WhatsApp', color: '#25D366' },
    { name: 'instagram', href: 'https://www.instagram.com/cabbage_code/', label: 'Instagram', color: '#E1306C' },
    { name: 'fiverr', href: 'https://www.fiverr.com/sujeet83/', label: 'Fiverr', color: '#1DBF73' }
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: scrolled ? '12px' : '0px',
      left: scrolled ? '24px' : '0px',
      right: scrolled ? '24px' : '0px',
      zIndex: 100,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: isMobile ? 'wrap' : 'nowrap',
      padding: isMobile ? '0.3rem 1.25rem' : (window.innerWidth <= 1400 ? '0.3rem 1.5rem' : '0.3rem 4rem'),
      background: (scrolled || menuOpen) ? navBg : 'transparent',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      border: scrolled ? navBorder : '1px solid transparent',
      borderRadius: scrolled ? '16px' : '0px',
      boxShadow: scrolled ? (darkMode ? '0 10px 30px -10px rgba(0,0,0,0.7)' : '0 10px 30px -10px rgba(0,0,0,0.1)') : 'none',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>

      {/* ✅ Left Side Logo */}
      <div style={{ display: 'flex', alignItems: 'center', flex: isMobile ? 'none' : '1 1 0%', justifyContent: 'flex-start' }}>
        <a 
          href="#hero" 
          onClick={scrollToHero} 
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
        >
          <img 
            id="nav-logo" 
            src={myLogo} 
            alt="My Logo" 
            style={{
              height: '32px', 
              width: 'auto',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              filter: darkMode 
                ? 'brightness(1.3) contrast(1.1) drop-shadow(1px 0px 0px rgba(255, 255, 255, 0.9)) drop-shadow(-1px 0px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0px 1px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0px -1px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0px 0px 8px rgba(0, 245, 160, 0.35))' 
                : 'none'
            }} 
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </a>
      </div>

      {/* ✅ Center Desktop Links */}
      {!isMobile && (
        <div style={{ display: 'flex', justifyContent: 'center', flex: '1 1 0%' }}>
          <div style={{ position: 'relative' }}>
            <ul ref={ulRef} style={{ display: 'flex', gap: '0.2rem', listStyle: 'none', margin: 0, padding: 0, position: 'relative' }}>
              {links.map((item) => {
                const isActive = activeSection === item;
                const displayText = item.replace(/-/g, ' '); 
                return (
                  <li key={item}>
                    <a href={`#${item}`} data-id={item} onClick={(e) => scrollToSection(e, item)}
                      style={{
                        fontFamily: '"Space Mono", monospace', fontSize: '0.7rem', letterSpacing: '0.05em',
                        color: isActive ? glowColor : linkColor, textDecoration: 'none', textTransform: 'uppercase',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', display: 'flex', alignItems: 'center', gap: '0.3rem',
                        padding: '0.5rem 0.6rem', fontWeight: isActive ? 800 : 500, borderRadius: '8px',
                        background: isActive ? (darkMode ? 'rgba(0,245,160,0.08)' : 'rgba(0,180,120,0.08)') : 'transparent',
                        whiteSpace: 'nowrap',
                        transform: isActive ? 'scale(1.06)' : 'scale(1)',
                        textShadow: isActive ? `0 0 10px ${glowColor}60` : 'none',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = glowColor;
                        e.currentTarget.style.transform = 'scale(1.06)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = isActive ? glowColor : linkColor;
                        e.currentTarget.style.transform = isActive ? 'scale(1.06)' : 'scale(1)';
                      }}
                    >
                      <span style={{ opacity: isActive ? 1 : 0.6, transition: 'opacity 0.2s', display: 'flex', alignItems: 'center' }}>
                        {navIcons[item] || ''}
                      </span>
                      {displayText}
                    </a>
                  </li>
                );
              })}

              {activeSection && (
                <div style={{
                  position: 'absolute', bottom: '-8px', left: `${linePos}px`, width: `${lineWidth}px`, height: '2px',
                  background: `linear-gradient(90deg, ${glowColor}, #7c3aed)`,
                  transition: 'left 0.4s cubic-bezier(0.16, 1, 0.3, 1), width 0.4s cubic-bezier(0.16, 1, 0.3, 1)', borderRadius: '2px',
                }} />
              )}
            </ul>
          </div>
        </div>
      )}

      {/* ✅ Right Side Actions */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem', 
        flex: isMobile ? 'none' : '1 1 0%', 
        justifyContent: 'flex-end' 
      }}>

        {/* Social Media Links directly in Navbar (Desktop only) */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginRight: '0.5rem' }}>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                title={link.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: `1px solid ${link.color}40`,
                  background: darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                  color: link.color,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${link.color}20`;
                  e.currentTarget.style.borderColor = link.color;
                  e.currentTarget.style.boxShadow = `0 0 10px ${link.color}80`;
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
                  e.currentTarget.style.borderColor = `${link.color}40`;
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                {socialIcons[link.name](link.color)}
              </a>
            ))}
          </div>
        )}
        
        {/* Book Mode Toggle */}
        {onToggleBookMode && (
          <button onClick={onToggleBookMode}
            title="Switch to Book Layout"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
              borderRadius: '50px', padding: '0.4rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s',
              width: '36px', height: '36px', color: '#D4AF37'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}
            onMouseLeave={(e) => e.currentTarget.style.background = darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V3a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v16.5m-3-13h-4m4 4h-4m4 4h-4"/></svg>
          </button>
        )}

        {/* Theme Toggle */}
        <button onClick={() => setDarkMode(!darkMode)}
          style={{
            background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
            borderRadius: '50px', padding: '0.4rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s',
            width: '36px', height: '36px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}
          onMouseLeave={(e) => e.currentTarget.style.background = darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
        >
          <span style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', color: darkMode ? '#ffffff' : '#0f172a' }}>
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><title>clear-day-fill</title><defs><linearGradient id="SVGeq4GoeLw" x1="150" x2="234" y1="119.2" y2="264.8" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fbbf24"/><stop offset=".5" stopColor="#fbbf24"/><stop offset="1" stopColor="#f59e0b"/></linearGradient><symbol id="SVG0a04Kbxn" viewBox="0 0 384 384"><circle cx="192" cy="192" r="84" fill="url(#SVGeq4GoeLw)" stroke="#f8af18" strokeMiterlimit="10" strokeWidth="6"/><path fill="none" stroke="#fbbf24" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="24" d="M192 61.7V12m0 360v-49.7m92.2-222.5l35-35M64.8 319.2l35.1-35.1m0-184.4l-35-35m254.5 254.5l-35.1-35.1M61.7 192H12m360 0h-49.7"><animateTransform additive="sum" attributeName="transform" dur="6s" repeatCount="indefinite" type="rotate" values="0 192 192; 45 192 192"/></path></symbol></defs><use width="384" height="384" href="#SVG0a04Kbxn" transform="translate(64 64)"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><title>falling-stars-fill</title><defs><linearGradient id="SVGpS2jccQh" x1="54.3" x2="187.2" y1="29" y2="259.1" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#86c3db"/><stop offset=".5" stopColor="#86c3db"/><stop offset="1" stopColor="#5eafcf"/></linearGradient><linearGradient id="SVGd7QnDc9f" x1="344.3" x2="375.7" y1="153.9" y2="208.3" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fcd966"/><stop offset=".5" stopColor="#fcd966"/><stop offset="1" stopColor="#fccd34"/></linearGradient><linearGradient id="SVGQTOPYbHv" x1="294" x2="330" y1="112.8" y2="175.2" href="#SVGd7QnDc9f"/><linearGradient id="SVGK4VCRbuf" x1="356.3" x2="387.7" y1="194.8" y2="249.2" href="#SVGd7QnDc9f"/><clipPath id="SVGt2Tt9c7j"><path fill="none" d="M512 27.5L240 189.1l16 48l40 32l216-96V27.5z"/></clipPath><symbol id="SVG7sC0PeQg" viewBox="0 0 270 270"><path fill="url(#SVGpS2jccQh)" stroke="#72b9d5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" d="M252.3 168.6A133.4 133.4 0 0 1 118 36.2A130.5 130.5 0 0 1 122.5 3A133 133 0 0 0 3 134.6C3 207.7 63 267 137.2 267c62.5 0 114.8-42.2 129.8-99.2a135.6 135.6 0 0 1-14.8.8Z"><animateTransform additive="sum" attributeName="transform" dur="6s" repeatCount="indefinite" type="rotate" values="-15 135 135; 9 135 135; -15 135 135"/></path></symbol></defs><use width="270" height="270" href="#SVG7sC0PeQg" transform="translate(121 121)"/></svg>
            )}
          </span>
        </button>

        {/* Hire Me CTA Button */}
        {!isMobile && (
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}
            style={{
              fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', fontWeight: 700,
              color: '#000', background: glowColor, padding: '0.5rem 1rem', borderRadius: '50px',
              textDecoration: 'none', letterSpacing: '0.05em', transition: 'all 0.3s',
              boxShadow: `0 4px 15px -5px ${glowColor}60`,
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 8px 20px -5px ${glowColor}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 4px 15px -5px ${glowColor}60`;
            }}
          >
            Hire Me
          </a>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none', border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
              color: glowColor, fontFamily: '"Space Mono", monospace', fontSize: '0.9rem',
              padding: '0.4rem 0.65rem', borderRadius: '8px', cursor: 'pointer',
            }}
          >
            {menuOpen ? 'X' : '☰'}
          </button>
        )}

      </div>

      {/* Mobile Dropdown */}
      {isMobile && menuOpen && (
        <ul style={{
          width: '100%', background: navBg, borderTop: navBorder, listStyle: 'none',
          margin: '1rem 0 0 0', padding: '0.5rem 0', display: 'flex', flexDirection: 'column',
        }}>
          {links.map((item) => {
            const isActive = activeSection === item;
            const displayText = item.replace(/-/g, ' '); 
            return (
              <li key={item}>
                <a href={`#${item}`} onClick={(e) => scrollToSection(e, item)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.8rem', fontFamily: '"Space Mono", monospace',
                    fontSize: '0.85rem', letterSpacing: '0.1em', color: isActive ? glowColor : linkColor,
                    textDecoration: 'none', textTransform: 'uppercase', padding: '1rem 1.5rem',
                    transition: 'all 0.2s', borderBottom: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.04)',
                    borderLeft: isActive ? `3px solid ${glowColor}` : '3px solid transparent',
                    background: isActive ? (darkMode ? 'rgba(0,245,160,0.05)' : 'rgba(0,180,120,0.05)') : 'transparent',
                  }}
                >
                  <span style={{ color: isActive ? glowColor : linkColor, display: 'flex', alignItems: 'center' }}>
                    {navIcons[item]}
                  </span>
                  {displayText}
                </a>
              </li>
            );
          })}

          {onToggleBookMode && (
            <li>
              <a href="#book" onClick={(e) => { e.preventDefault(); setMenuOpen(false); onToggleBookMode(); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.8rem', fontFamily: '"Space Mono", monospace',
                  fontSize: '0.85rem', letterSpacing: '0.1em', color: '#D4AF37',
                  textDecoration: 'none', textTransform: 'uppercase', padding: '1rem 1.5rem',
                  transition: 'all 0.2s', borderBottom: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.04)',
                  borderLeft: '3px solid transparent',
                  background: 'transparent',
                }}
              >
                <span style={{ color: '#D4AF37', display: 'flex', alignItems: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V3a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v16.5m-3-13h-4m4 4h-4m4 4h-4"/></svg>
                </span>
                Book Layout
              </a>
            </li>
          )}

          {/* Mobile Social Links Row */}
          <li style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1rem', 
            padding: '1.5rem 1rem 1rem 1rem',
            borderTop: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
            marginTop: '0.5rem',
            listStyleType: 'none'
          }}>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                title={link.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: `1px solid ${link.color}50`,
                  background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                  color: link.color,
                  transition: 'all 0.3s ease',
                  textDecoration: 'none'
                }}
              >
                {socialIcons[link.name](link.color)}
              </a>
            ))}
          </li>
        </ul>
      )}

    </nav>
  );
}

export default Navbar;