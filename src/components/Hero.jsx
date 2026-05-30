import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Instagram, 
  Download, 
  ArrowRight, 
  Terminal, 
  Code2, 
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import resumeFile from '../assets/resume.pdf'; // Aapka resume path

// Custom Hook for Typing Effect
const useTyping = (texts, speed = 80, pause = 2000) => {
  const [display, setDisplay] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const current = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = charIndex + 1;
        setDisplay(current.slice(0, next));
        setCharIndex(next);
        if (next === current.length) {
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setDeleting(true);
          }, pause);
        }
      } else {
        const prev = charIndex - 1;
        setDisplay(current.slice(0, prev));
        setCharIndex(prev);
        if (prev === 0) {
          setDeleting(false);
          setTextIndex((i) => (i + 1) % texts.length);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex, isPaused, texts, speed, pause]);

  return display;
};

const Hero = () => {
  const typingRoles = [
    "Full Stack Developer",
    "React Developer",
    "MERN Stack Developer",
    "Freelance Web Developer"
  ];
  
  const typedText = useTyping(typingRoles, 100, 2500);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0a0a0f] text-white overflow-hidden pt-20 pb-10 lg:pt-0 lg:pb-0">
      
      {/* Background Elements (Linear/Vercel Style) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#7C3AED]/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#00F5A0]/10 blur-[120px]" />
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div 
            className="col-span-1 lg:col-span-7 flex flex-col items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Top Badge */}
            <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00F5A0]/30 bg-[#00F5A0]/5 backdrop-blur-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5A0] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00F5A0]"></span>
              </span>
              <span className="text-sm font-medium tracking-wide text-[#00F5A0] uppercase">
                Available for Freelance Projects
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              I Build Modern Websites & Web Applications That <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-[#00F5A0] to-[#7C3AED] bg-clip-text text-transparent">
                Grow Businesses
              </span>
            </motion.h1>

            {/* Typing Effect */}
            <motion.div variants={itemVariants} className="text-xl md:text-2xl font-semibold mb-6 flex items-center h-8">
              <Terminal className="text-[#7C3AED] mr-3" size={24} />
              <span>{typedText}</span>
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-[3px] h-[24px] bg-[#00F5A0] ml-1"
              />
            </motion.div>

            {/* Description */}
            <motion.p variants={itemVariants} className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
              Full Stack Developer specializing in React, Node.js and MongoDB. I help businesses create fast, responsive and scalable web solutions that increase online visibility and generate more customers.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-10 w-full">
              <a href="#contact" className="group relative px-8 py-3.5 bg-[#00F5A0] text-black font-bold rounded-lg overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(0,245,160,0.4)]">
                <span className="relative z-10 flex items-center gap-2">
                  Hire Me <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              </a>
              
              <a href="#projects" className="px-8 py-3.5 border border-[#7C3AED]/50 text-white font-semibold rounded-lg hover:bg-[#7C3AED]/10 hover:border-[#7C3AED] transition-all flex items-center gap-2">
                <Code2 size={18} /> View Projects
              </a>

              <a href={resumeFile} download="Sujeet_Vishwakarma_Resume.pdf" className="px-6 py-3.5 text-gray-300 font-semibold rounded-lg hover:text-[#00F5A0] transition-all flex items-center gap-2">
                <Download size={18} /> Resume
              </a>
            </motion.div>

            {/* Tech Stack Pills */}
            <motion.div variants={itemVariants} className="w-full">
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-4 font-semibold">Tech Arsenal</p>
              <div className="flex flex-wrap gap-3">
                {['React', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript', 'Tailwind CSS'].map((tech) => (
                  <span key={tech} className="px-4 py-1.5 text-sm font-medium rounded-full border border-white/10 bg-white/5 text-gray-300 hover:border-[#00F5A0]/50 hover:text-[#00F5A0] transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content (Image & Stats) */}
          <motion.div 
            className="col-span-1 lg:col-span-5 relative mt-12 lg:mt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Profile Image Container */}
            <motion.div 
              className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto"
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              {/* Glow Behind Image */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00F5A0] to-[#7C3AED] blur-2xl opacity-40 animate-pulse" />
              
              {/* Gradient Border & Image Wrapper */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-[#00F5A0] to-[#7C3AED] p-[3px] shadow-2xl">
                <div className="w-full h-full bg-[#0f172a] rounded-[1.8rem] overflow-hidden relative">
                  {/* Yahan apni image lagayein */}
                  <img 
                    src="/your-profile-image.jpg" 
                    alt="Sujeet Vishwakarma" 
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
                  />
                  {/* Fallback pattern if no image */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1),transparent_70%)] mix-blend-overlay" />
                </div>
              </div>

              {/* Floating Glassmorphism Cards */}
              
              {/* Card 1: Projects */}
              <motion.div 
                className="absolute -left-6 sm:-left-12 top-10 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-xl"
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#00F5A0]/20 p-2 rounded-lg text-[#00F5A0]">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Projects Done</p>
                    <p className="text-lg font-bold text-white">10+</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Clients */}
              <motion.div 
                className="absolute -right-6 sm:-right-8 bottom-10 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-xl"
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#7C3AED]/20 p-2 rounded-lg text-[#7C3AED]">
                    <Code2 size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Tech Stack</p>
                    <p className="text-lg font-bold text-white">Modern</p>
                  </div>
                </div>
              </motion.div>

            </motion.div>

            {/* Social Icons (Desktop: Absolute Right, Mobile: Bottom) */}
            <div className="flex justify-center gap-6 mt-12 lg:absolute lg:mt-0 lg:-right-4 lg:top-1/2 lg:-translate-y-1/2 lg:flex-col lg:gap-8">
              {[
                { icon: Github, href: "https://github.com" },
                { icon: Linkedin, href: "https://linkedin.com" },
                { icon: Mail, href: "mailto:your@email.com" },
                { icon: Instagram, href: "https://instagram.com" }
              ].map((Social, index) => (
                <a 
                  key={index} 
                  href={Social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#00F5A0] hover:-translate-y-1 lg:hover:-translate-y-0 lg:hover:-translate-x-1 transition-all"
                >
                  <Social.icon size={24} />
                </a>
              ))}
            </div>

          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-xs tracking-widest text-gray-500 uppercase">Scroll</span>
        <ChevronDown size={20} className="text-[#00F5A0]" />
      </motion.div>
    </section>
  );
};

export default Hero;import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Instagram, 
  Download, 
  ArrowRight, 
  Terminal, 
  Code2, 
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import resumeFile from '../assets/resume.pdf'; // Aapka resume path

// Custom Hook for Typing Effect
const useTyping = (texts, speed = 80, pause = 2000) => {
  const [display, setDisplay] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const current = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = charIndex + 1;
        setDisplay(current.slice(0, next));
        setCharIndex(next);
        if (next === current.length) {
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setDeleting(true);
          }, pause);
        }
      } else {
        const prev = charIndex - 1;
        setDisplay(current.slice(0, prev));
        setCharIndex(prev);
        if (prev === 0) {
          setDeleting(false);
          setTextIndex((i) => (i + 1) % texts.length);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex, isPaused, texts, speed, pause]);

  return display;
};

const Hero = () => {
  const typingRoles = [
    "Full Stack Developer",
    "React Developer",
    "MERN Stack Developer",
    "Freelance Web Developer"
  ];
  
  const typedText = useTyping(typingRoles, 100, 2500);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0a0a0f] text-white overflow-hidden pt-20 pb-10 lg:pt-0 lg:pb-0">
      
      {/* Background Elements (Linear/Vercel Style) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#7C3AED]/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#00F5A0]/10 blur-[120px]" />
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div 
            className="col-span-1 lg:col-span-7 flex flex-col items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Top Badge */}
            <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00F5A0]/30 bg-[#00F5A0]/5 backdrop-blur-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5A0] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00F5A0]"></span>
              </span>
              <span className="text-sm font-medium tracking-wide text-[#00F5A0] uppercase">
                Available for Freelance Projects
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              I Build Modern Websites & Web Applications That <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-[#00F5A0] to-[#7C3AED] bg-clip-text text-transparent">
                Grow Businesses
              </span>
            </motion.h1>

            {/* Typing Effect */}
            <motion.div variants={itemVariants} className="text-xl md:text-2xl font-semibold mb-6 flex items-center h-8">
              <Terminal className="text-[#7C3AED] mr-3" size={24} />
              <span>{typedText}</span>
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-[3px] h-[24px] bg-[#00F5A0] ml-1"
              />
            </motion.div>

            {/* Description */}
            <motion.p variants={itemVariants} className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
              Full Stack Developer specializing in React, Node.js and MongoDB. I help businesses create fast, responsive and scalable web solutions that increase online visibility and generate more customers.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-10 w-full">
              <a href="#contact" className="group relative px-8 py-3.5 bg-[#00F5A0] text-black font-bold rounded-lg overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(0,245,160,0.4)]">
                <span className="relative z-10 flex items-center gap-2">
                  Hire Me <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              </a>
              
              <a href="#projects" className="px-8 py-3.5 border border-[#7C3AED]/50 text-white font-semibold rounded-lg hover:bg-[#7C3AED]/10 hover:border-[#7C3AED] transition-all flex items-center gap-2">
                <Code2 size={18} /> View Projects
              </a>

              <a href={resumeFile} download="Sujeet_Vishwakarma_Resume.pdf" className="px-6 py-3.5 text-gray-300 font-semibold rounded-lg hover:text-[#00F5A0] transition-all flex items-center gap-2">
                <Download size={18} /> Resume
              </a>
            </motion.div>

            {/* Tech Stack Pills */}
            <motion.div variants={itemVariants} className="w-full">
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-4 font-semibold">Tech Arsenal</p>
              <div className="flex flex-wrap gap-3">
                {['React', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript', 'Tailwind CSS'].map((tech) => (
                  <span key={tech} className="px-4 py-1.5 text-sm font-medium rounded-full border border-white/10 bg-white/5 text-gray-300 hover:border-[#00F5A0]/50 hover:text-[#00F5A0] transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content (Image & Stats) */}
          <motion.div 
            className="col-span-1 lg:col-span-5 relative mt-12 lg:mt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Profile Image Container */}
            <motion.div 
              className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto"
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              {/* Glow Behind Image */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00F5A0] to-[#7C3AED] blur-2xl opacity-40 animate-pulse" />
              
              {/* Gradient Border & Image Wrapper */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-[#00F5A0] to-[#7C3AED] p-[3px] shadow-2xl">
                <div className="w-full h-full bg-[#0f172a] rounded-[1.8rem] overflow-hidden relative">
                  {/* Yahan apni image lagayein */}
                  <img 
                    src="/your-profile-image.jpg" 
                    alt="Sujeet Vishwakarma" 
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
                  />
                  {/* Fallback pattern if no image */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1),transparent_70%)] mix-blend-overlay" />
                </div>
              </div>

              {/* Floating Glassmorphism Cards */}
              
              {/* Card 1: Projects */}
              <motion.div 
                className="absolute -left-6 sm:-left-12 top-10 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-xl"
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#00F5A0]/20 p-2 rounded-lg text-[#00F5A0]">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Projects Done</p>
                    <p className="text-lg font-bold text-white">10+</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Clients */}
              <motion.div 
                className="absolute -right-6 sm:-right-8 bottom-10 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-xl"
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#7C3AED]/20 p-2 rounded-lg text-[#7C3AED]">
                    <Code2 size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Tech Stack</p>
                    <p className="text-lg font-bold text-white">Modern</p>
                  </div>
                </div>
              </motion.div>

            </motion.div>

            {/* Social Icons (Desktop: Absolute Right, Mobile: Bottom) */}
            <div className="flex justify-center gap-6 mt-12 lg:absolute lg:mt-0 lg:-right-4 lg:top-1/2 lg:-translate-y-1/2 lg:flex-col lg:gap-8">
              {[
                { icon: Github, href: "https://github.com" },
                { icon: Linkedin, href: "https://linkedin.com" },
                { icon: Mail, href: "mailto:your@email.com" },
                { icon: Instagram, href: "https://instagram.com" }
              ].map((Social, index) => (
                <a 
                  key={index} 
                  href={Social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#00F5A0] hover:-translate-y-1 lg:hover:-translate-y-0 lg:hover:-translate-x-1 transition-all"
                >
                  <Social.icon size={24} />
                </a>
              ))}
            </div>

          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-xs tracking-widest text-gray-500 uppercase">Scroll</span>
        <ChevronDown size={20} className="text-[#00F5A0]" />
      </motion.div>
    </section>
  );
};

export default Hero;
