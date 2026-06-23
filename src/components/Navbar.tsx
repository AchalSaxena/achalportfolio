import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Code, Cpu, FolderGit2, MessageSquareCode, Briefcase, FileDown } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems: NavItem[] = [
    { name: 'Home', href: '#home', icon: <Terminal className="w-4 h-4" /> },
    { name: 'About', href: '#about', icon: <Cpu className="w-4 h-4" /> },
    { name: 'Experience', href: '#experience', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Projects', href: '#projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { name: 'Contact', href: '#contact', icon: <MessageSquareCode className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 120; // offset

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-navy border-b border-brand-slate/30 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo / Title */}
        <a 
          href="#home" 
          onClick={(e) => handleLinkClick(e, '#home')}
          className="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-white group"
        >
          <Code className="w-5 h-5 text-brand-cyan group-hover:rotate-12 transition-transform duration-300" />
          <span>
            Achal<span className="text-brand-cyan">.Dev</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === item.href.replace('#', '')
                  ? 'bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {item.icon}
              {item.name}
            </a>
          ))}
          {/* Download CV CTA */}
          <a
            href="/Achal_Saxena_CV.docx"
            download
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-brand-cyan hover:bg-brand-cyan/90 text-brand-navy ml-2 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
          >
            <FileDown className="w-4 h-4" />
            <span>Download CV</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors border border-brand-slate/40"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer (Navy dropdown) */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 md:hidden bg-brand-navy/95 border-b border-brand-slate/40 shadow-xl py-4 px-6">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-medium transition-all duration-300 ${
                  activeSection === item.href.replace('#', '')
                    ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 shadow-inner'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </a>
            ))}
            
            {/* Download CV Mobile Button */}
            <a
              href="/Achal_Saxena_CV.docx"
              download
              className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-base font-semibold bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 shadow-md transition-all duration-300 mt-2"
            >
              <FileDown className="w-5 h-5" />
              <span>Download CV (ATS Friendly)</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
