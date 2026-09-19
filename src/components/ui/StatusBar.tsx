import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Shield, Cpu, Github, Mail } from 'lucide-react';

interface StatusBarProps {
  scrollProgress: number;
  onOpenTerminal: () => void;
  activeSection: string;
  isLoaded?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  scrollProgress,
  onOpenTerminal,
  activeSection,
  isLoaded = false,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Telemetry Header */}
      <motion.header
        id="status-header"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: isLoaded ? 0 : -40, opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-40 bg-[#050605]/85 backdrop-blur-md border-b border-[#9CFF4A]/10 px-4 sm:px-8 py-3 transition-colors"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between font-mono text-xs text-[#D7D9D2]">
          {/* Identity */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => scrollTo('hero')}
              className="flex items-center space-x-2 text-left group"
            >
              <span className="w-2 h-2 bg-[#9CFF4A] rounded-none group-hover:scale-125 transition-transform" />
              <span className="font-bold tracking-wider text-sm text-[#D7D9D2] group-hover:text-[#9CFF4A] transition-colors">
                NoE<span className="text-[#9CFF4A]">114</span>
              </span>
            </button>
            <span className="text-[#9CFF4A]/30 hidden sm:inline">|</span>
            <span className="text-[#D7D9D2]/60 text-[11px] hidden md:inline">
              RAJ DEY // SYSTEMS &amp; SECURITY
            </span>
          </div>

          {/* Quick Nav Anchors */}
          <nav className="hidden lg:flex items-center space-x-8 text-[11px] tracking-wider text-[#D7D9D2]/60">
            <button
              onClick={() => scrollTo('hero')}
              className={`hover:text-[#9CFF4A] transition-colors ${
                activeSection === 'hero' ? 'text-[#9CFF4A] font-semibold' : ''
              }`}
            >
              01 / HERO
            </button>
            <button
              onClick={() => scrollTo('projects')}
              className={`hover:text-[#9CFF4A] transition-colors ${
                activeSection === 'projects' ? 'text-[#9CFF4A] font-semibold' : ''
              }`}
            >
              02 / SELECTED REPOS
            </button>
            <button
              onClick={() => scrollTo('about')}
              className={`hover:text-[#9CFF4A] transition-colors ${
                activeSection === 'about' ? 'text-[#9CFF4A] font-semibold' : ''
              }`}
            >
              03 / ENVIRONMENT
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className={`hover:text-[#9CFF4A] transition-colors ${
                activeSection === 'contact' ? 'text-[#9CFF4A] font-semibold' : ''
              }`}
            >
              04 / CONTACT
            </button>
          </nav>

          {/* Right Actions: Interactive Terminal launcher & Socials */}
          <div className="flex items-center space-x-3 sm:space-x-4 text-xs">
            <button
              id="open-terminal-btn"
              onClick={onOpenTerminal}
              className="flex items-center space-x-1.5 px-2.5 py-1 text-[11px] bg-[#9CFF4A]/10 border border-[#9CFF4A]/30 text-[#9CFF4A] hover:bg-[#9CFF4A] hover:text-[#050605] transition-all cursor-pointer"
              title="Open Interactive CLI Sandbox"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="font-semibold">CLI_SANDBOX</span>
            </button>

            <a
              href="https://github.com/NoE114"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-[#D7D9D2]/70 hover:text-[#9CFF4A] transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Real-time Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#9CFF4A]/10">
          <div
            className="h-full bg-[#9CFF4A] transition-all duration-75"
            style={{ width: `${Math.min(Math.max(scrollProgress * 100, 0), 100)}%` }}
          />
        </div>
      </motion.header>

      {/* Bottom Fixed Telemetry Footer */}
      <motion.footer
        id="status-footer"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: isLoaded ? 0 : 30, opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#050605]/85 backdrop-blur-sm border-t border-[#9CFF4A]/10 px-4 sm:px-8 py-2 font-mono text-[10px] text-[#D7D9D2]/50"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-[#9CFF4A]">
              <span className="w-1.5 h-1.5 bg-[#9CFF4A] inline-block animate-pulse" />
              <span>ONLINE</span>
            </span>
            <span className="hidden sm:inline">OS: ARCH LINUX (X86_64)</span>
            <span className="hidden md:inline">EDITOR: NEOVIM</span>
            <span className="hidden lg:inline">PHILOSOPHY: ZERO_DEPENDENCY</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-[#9CFF4A]/70">
              SCROLL: {Math.round(scrollProgress * 100)}%
            </span>
            <span>SEPTEMBER 2026</span>
          </div>
        </div>
      </motion.footer>
    </>
  );
};
