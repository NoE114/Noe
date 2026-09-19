import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from 'motion/react';
import { Loader } from './components/loading/Loader';
import { TechnicalGrid } from './components/ui/Grid';
import { StatusBar } from './components/ui/StatusBar';
import { Hero } from './components/hero/Hero';
import { ProjectSection } from './components/projects/ProjectSection';
import { AboutSection } from './components/about/AboutSection';
import { ContactSection } from './components/contact/ContactSection';
import { TerminalSandbox } from './components/terminal/TerminalSandbox';
import { Cursor } from './components/ui/Cursor';
import { KoiTarget } from './types';

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState<boolean>(false);
  const [loaderPhase, setLoaderPhase] = useState<string>('counting');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [scrollVelocity, setScrollVelocity] = useState<number>(0);
  const [hoverTarget, setHoverTarget] = useState<KoiTarget | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Staggered entrance for Project, About, and Contact sections
  const heroRef = useRef<HTMLElement | null>(null);
  const isHeroInView = useInView(heroRef, { amount: 0.15 });
  const [sectionsEntranceTriggered, setSectionsEntranceTriggered] = useState<boolean>(false);

  // Trigger staggered entrance for downstream sections only once the main Hero section is in view after loader finishes
  useEffect(() => {
    if (loadingComplete && (isHeroInView || window.scrollY < 300) && !sectionsEntranceTriggered) {
      setSectionsEntranceTriggered(true);
    }
  }, [loadingComplete, isHeroInView, sectionsEntranceTriggered]);

  // Terminal Sandbox State
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
  const [terminalInitialCmd, setTerminalInitialCmd] = useState<string>('');
  const [terminalInitialOut, setTerminalInitialOut] = useState<string>('');

  const lastScrollY = useRef<number>(0);
  const lastScrollTime = useRef<number>(Date.now());
  const velocityTimeoutRef = useRef<number | null>(null);

  // Track scroll progress, velocity, and active section
  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const currentY = window.scrollY;
      const dt = Math.max(now - lastScrollTime.current, 16);
      const dy = currentY - lastScrollY.current;

      const rawVelocity = (dy / dt) * 15; // scaled velocity
      setScrollVelocity(rawVelocity);

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? currentY / maxScroll : 0;
      setScrollProgress(progress);

      lastScrollY.current = currentY;
      lastScrollTime.current = now;

      // Decay velocity after user stops scrolling
      if (velocityTimeoutRef.current) {
        window.clearTimeout(velocityTimeoutRef.current);
      }
      velocityTimeoutRef.current = window.setTimeout(() => {
        setScrollVelocity(0);
      }, 150);

      // Identify active section
      const sections = ['hero', 'projects', 'about', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (velocityTimeoutRef.current) {
        window.clearTimeout(velocityTimeoutRef.current);
      }
    };
  }, []);

  const handleExecuteCommand = (cmd: string, output: string) => {
    setTerminalInitialCmd(cmd);
    setTerminalInitialOut(output);
    setTerminalOpen(true);
  };

  const handleExploreProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoadingComplete = useCallback(() => {
    setLoadingComplete(true);
    setLoaderPhase('finished');
  }, []);

  const handleSyncPhase = useCallback((phase: string) => {
    setLoaderPhase(phase);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050605] text-[#D7D9D2] selection:bg-[#9CFF4A] selection:text-[#050605]">
      {/* Precision Custom Cursor */}
      <Cursor />

      {/* 01 — The Loading Sequence */}
      {!loadingComplete && (
        <Loader
          onComplete={handleLoadingComplete}
          onSyncPhase={handleSyncPhase}
        />
      )}

      {/* 05 — Technical Grid Layer with psychic energy synchronization */}
      <TechnicalGrid
        surgeActive={loaderPhase === 'surge' || loaderPhase === 'mystery'}
        isLoaded={loadingComplete}
      />

      {/* Persistent Status Bar & Navigation with synchronized entry */}
      <StatusBar
        scrollProgress={scrollProgress}
        onOpenTerminal={() => {
          setTerminalInitialCmd('');
          setTerminalInitialOut('');
          setTerminalOpen(true);
        }}
        activeSection={activeSection}
        isLoaded={loadingComplete}
      />

      {/* Main Content Sections */}
      <main className="relative z-20">
        {/* 04 — Hero Section (Synchronized staggered entrance) */}
        <Hero
          ref={heroRef}
          onHoverTarget={setHoverTarget}
          onExploreProjects={handleExploreProjects}
          isLoaded={loadingComplete}
        />

        {/* 06 & 07 — Project Section (Staggered entrance: fading & sliding in) */}
        <ProjectSection
          onHoverTarget={setHoverTarget}
          onExecuteCommand={handleExecuteCommand}
          entranceTrigger={sectionsEntranceTriggered}
          staggerDelay={0.25}
        />

        {/* 05 — Architecture & Biome Section (Staggered entrance: fading & sliding in) */}
        <AboutSection
          onHoverTarget={setHoverTarget}
          entranceTrigger={sectionsEntranceTriggered}
          staggerDelay={0.50}
        />

        {/* Direct Transmission / Contact Channel (Staggered entrance: fading & sliding in) */}
        <ContactSection
          onHoverTarget={setHoverTarget}
          entranceTrigger={sectionsEntranceTriggered}
          staggerDelay={0.75}
        />
      </main>

      {/* Interactive CLI Sandbox Modal */}
      <TerminalSandbox
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        initialCommand={terminalInitialCmd}
        initialOutput={terminalInitialOut}
      />
    </div>
  );
}
