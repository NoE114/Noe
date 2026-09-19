import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Shield, ArrowDown, ExternalLink } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../../data/projects';
import { KoiTarget } from '../../types';

export interface HeroProps {
  onHoverTarget: (target: KoiTarget | null) => void;
  onExploreProjects: () => void;
  isLoaded?: boolean;
}

export const Hero = React.forwardRef<HTMLElement, HeroProps>(
  ({ onHoverTarget, onExploreProjects, isLoaded = false }, ref) => {
    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, label: string) => {
      onHoverTarget({
        x: e.clientX,
        y: e.clientY,
        intensity: 0.9,
        label,
      });
    };

    const handleMouseLeave = () => {
      onHoverTarget(null);
    };

    return (
      <section
        ref={ref}
        id="hero"
        className="relative min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-14 px-6 sm:px-10 lg:px-12 flex flex-col justify-between overflow-hidden"
      >
        {/* Aesthetic Vertical Japanese Kanji Watermark Column */}
        <div className="absolute right-4 sm:right-10 top-1/4 -translate-y-12 pointer-events-none select-none z-0 hidden md:flex flex-col items-center opacity-[0.035] hover:opacity-[0.08] transition-opacity duration-700">
          <span className="font-kanji fluid-kanji font-black text-[#9CFF4A] writing-vertical-rl tracking-[0.2em]">
            深層工学
          </span>
        </div>

        <div className="absolute left-3 bottom-24 pointer-events-none select-none z-0 hidden xl:flex flex-col items-center opacity-[0.03]">
          <span className="font-kanji fluid-kanji-sm font-black text-[#D7D9D2] writing-vertical-rl tracking-[0.25em]">
            零外部依存
          </span>
        </div>

        {/* Stable Centered Container across all resolutions */}
        <div className="w-full max-w-7xl 2xl:max-w-[92rem] mx-auto flex flex-col justify-between flex-1 relative z-10">
          {/* Top Asymmetric Index & Epigraph */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -16 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 font-mono text-xs text-[#D7D9D2]/70"
          >
            <div className="flex items-center space-x-3">
              <span className="text-[#9CFF4A] font-bold text-sm">01 / 06</span>
              <span className="text-[#9CFF4A]/40">/</span>
              <span className="tracking-widest uppercase text-[#9CFF4A]">SYS_ARCH_INIT</span>
              <span className="font-kanji text-[11px] text-[#9CFF4A]/70 hidden sm:inline tracking-wider">
                【 始動 // 零壱 】
              </span>
            </div>

            {/* Minimal statement side quote */}
            <div
              onMouseEnter={(e) => handleMouseEnter(e, 'lowest-level')}
              onMouseLeave={handleMouseLeave}
              className="max-w-xs text-right sm:text-right border-r-2 border-[#9CFF4A]/40 pr-4 hover:border-[#9CFF4A] transition-colors"
            >
              <p className="font-tech text-base tracking-widest text-[#D7D9D2] font-semibold leading-tight">
                I BUILD<br />AT THE<br />LOWEST<br />LEVEL.
              </p>
              <div className="w-12 h-[1px] bg-[#9CFF4A]/50 my-2 ml-auto" />
              <p className="font-kanji text-[11px] text-[#9CFF4A] tracking-widest font-medium mb-1">
                「 最深層の構築 」
              </p>
              <p className="text-[10px] text-[#D7D9D2]/60 tracking-wider font-mono">
                systems • security • infrastructure • reverse engineering
              </p>
            </div>
          </motion.div>

          {/* Main Off-Grid Asymmetric Headline Statement */}
          <div className="my-auto py-4 sm:py-6 lg:py-8 relative z-10">
            <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
              {/* Section Marker */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex items-center space-x-3 font-mono text-sm sm:text-base text-[#9CFF4A]/80 tracking-widest mb-3"
              >
                <span>01</span>
                <span className="text-[#9CFF4A]/30">/</span>
                <span className="font-kanji text-xs text-[#9CFF4A]/60 tracking-widest">
                  【 核心領域 】
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 28 }}
                transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={(e) => handleMouseEnter(e, 'focus-statement')}
                onMouseLeave={handleMouseLeave}
                className="group cursor-default"
              >
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <p className="font-mono text-sm sm:text-xl text-[#9CFF4A] tracking-widest font-medium">
                    MY FOCUS IS
                  </p>
                  <span className="font-kanji text-[11px] sm:text-xs px-2 py-0.5 border border-[#9CFF4A]/30 text-[#9CFF4A] bg-[#9CFF4A]/5 tracking-wider">
                    【 低層工学・情報保安 】
                  </span>
                </div>

                <h1 className="font-display font-black fluid-display tracking-tight text-[#D7D9D2] uppercase mb-2">
                  LOW-LEVEL<br />
                  SYSTEMS
                </h1>

                <div className="flex flex-wrap items-baseline gap-4 sm:gap-6 mt-2">
                  <span className="font-display font-black fluid-display tracking-tight text-[#9CFF4A]">
                    &amp;
                  </span>
                  <span className="font-display font-black fluid-display tracking-tight text-[#D7D9D2] uppercase">
                    SECURITY.
                  </span>

                  {/* [ K01 ] and Kanji Badges */}
                  <div className="flex items-center space-x-2 ml-auto sm:ml-4">
                    <span className="font-kanji text-xs px-2.5 py-1 border border-[#9CFF4A]/40 text-[#9CFF4A] bg-[#9CFF4A]/10 tracking-widest">
                      零依存
                    </span>
                    <span className="font-mono text-xs sm:text-sm px-3 py-1 border border-[#9CFF4A] text-[#9CFF4A] bg-[#9CFF4A]/10 tracking-widest">
                      [ K01 ]
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Subtext description & Bio confirmation */}
              <motion.div
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -18 }}
                transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 sm:mt-8 max-w-2xl border-l-2 border-[#9CFF4A]/30 pl-4 sm:pl-6"
              >
                <p className="font-mono text-xs sm:text-sm text-[#D7D9D2]/80 leading-relaxed">
                  Engineered by <span className="text-[#9CFF4A] font-semibold">{DEVELOPER_PROFILE.realName}</span> (<span className="text-[#9CFF4A]">NoE114</span>).
                  Direct disk Git parsers, zero-dependency native Rust tooling, memory-safe cryptographic verification, and reproducible Nix container pipelines.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] font-mono text-[#D7D9D2]/60">
                  <span className="bg-[#050605] border border-[#9CFF4A]/20 px-2 py-0.5 text-[#9CFF4A]">
                    ENV: Arch Linux • Neovim • CLI
                  </span>
                  <span className="bg-[#050605] border border-[#9CFF4A]/20 px-2 py-0.5 text-[#D7D9D2]">
                    STACK: Rust 2024 • C • Python
                  </span>
                  <span className="bg-[#050605] border border-[#9CFF4A]/20 px-2 py-0.5 text-[#D7D9D2]">
                    CRATE DEPS: ZERO
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Controls: CTA button & Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 18 }}
            transition={{ duration: 0.6, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-4 sm:pt-6 border-t border-[#9CFF4A]/10 font-mono text-xs"
          >
            <div className="flex items-center space-x-4">
              <button
                id="hero-explore-projects-btn"
                onClick={onExploreProjects}
                onMouseEnter={(e) => handleMouseEnter(e, 'explore-btn')}
                onMouseLeave={handleMouseLeave}
                className="group flex items-center space-x-2 px-5 py-2.5 bg-[#9CFF4A] text-[#050605] font-bold tracking-wider hover:bg-[#D7D9D2] transition-colors cursor-pointer"
              >
                <span>INSPECT_PROJECTS</span>
                <span className="font-kanji text-[11px] font-bold opacity-85">
                  【 開発目録 】
                </span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <a
                href="https://github.com/NoE114"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-4 py-2.5 border border-[#9CFF4A]/30 text-[#D7D9D2] hover:text-[#9CFF4A] hover:border-[#9CFF4A] transition-colors"
              >
                <span>GITHUB</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Scroll signal */}
            <div className="flex items-center space-x-3 text-[#D7D9D2]/50 tracking-wider">
              <span className="inline-block w-1.5 h-1.5 bg-[#9CFF4A] rounded-full animate-bounce" />
              <span>SCROLL TO ENGAGE KINETIC TIMELINE</span>
              <span className="text-[#9CFF4A]">[ 02 / 06 ]</span>
            </div>
          </motion.div>
        </div>
      </section>
    );
});

Hero.displayName = 'Hero';
