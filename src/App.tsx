import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';
import { Terminal, Heart } from 'lucide-react';

function App() {
  return (
    <div className="bg-light-bg text-slate-800 min-h-screen relative selection:bg-brand-cyan/20 selection:text-brand-cyan overflow-hidden">
      {/* Decorative Global Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[35%] h-[40%] rounded-full bg-brand-cyan/5 blur-[100px]" />
        <div className="absolute top-[15%] right-[25%] w-[30%] h-[35%] rounded-full bg-brand-navy/5 blur-[80px]" />
      </div>

      {/* Navigation Header */}
      <Navbar />

      {/* Page Sections (Proper Spacing to offset pinned navbar) */}
      <main className="relative z-10 pt-16">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* Pinned Scroll to Top trigger */}
      <ScrollToTop />

      {/* Professional Footer (High Contrast) */}
      <footer className="border-t border-brand-slate/20 bg-brand-navy py-12 px-4 md:px-8 text-center relative z-10 text-slate-300">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-display text-sm font-bold tracking-tight text-white">
            <Terminal className="w-4 h-4 text-brand-cyan" />
            <span>
              Achal<span className="text-brand-cyan">.Dev</span> &copy; {new Date().getFullYear()}
            </span>
          </div>

          <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
            <span>Built with precision using</span>
            <Heart className="w-3 h-3 text-brand-cyan fill-brand-cyan" />
            <span>React + Vite + Tailwind v4 + Supabase</span>
          </p>

          <div className="flex gap-4 text-xs font-mono text-slate-400">
            <a href="#home" className="hover:text-white transition-colors">Top</a>
            <span>&middot;</span>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <span>&middot;</span>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <span>&middot;</span>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
