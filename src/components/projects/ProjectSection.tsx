import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, ExternalLink, Cpu, Copy, Check, ChevronRight, Play } from 'lucide-react';
import { Project, KoiTarget } from '../../types';
import { PROJECTS } from '../../data/projects';

interface ProjectSectionProps {
  onHoverTarget: (target: KoiTarget | null) => void;
  onExecuteCommand: (cmd: string, output: string) => void;
  entranceTrigger?: boolean;
  staggerDelay?: number;
}

export const ProjectSection: React.FC<ProjectSectionProps> = ({
  onHoverTarget,
  onExecuteCommand,
  entranceTrigger = true,
  staggerDelay = 0,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(PROJECTS[0].id);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [animationDone, setAnimationDone] = useState<boolean>(false);

  const activeProject = PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0];

  const handleProjectHover = (e: React.MouseEvent<HTMLElement>, project: Project) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onHoverTarget({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      intensity: 1.0,
      label: project.title,
    });
  };

  const handleMouseLeave = () => {
    onHoverTarget(null);
  };

  const handleCopyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 48 }}
      animate={entranceTrigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{
        duration: 0.75,
        delay: staggerDelay,
        ease: [0.16, 1, 0.3, 1],
      }}
      onAnimationComplete={() => {
        if (entranceTrigger) setAnimationDone(true);
      }}
      style={animationDone ? { transform: 'none' } : undefined}
      className="relative z-20 section-pad"
    >
      <div className="w-full max-w-7xl xl:max-w-[85rem] 2xl:max-w-[100rem] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between border-b border-[#9CFF4A]/20 pb-4 mb-12 font-mono text-xs text-[#D7D9D2]/70"
        >
        <div className="flex items-center space-x-3">
          <span className="text-[#9CFF4A] font-bold text-sm">02 / 06</span>
          <span className="text-[#9CFF4A]/40">/</span>
          <span className="text-[#9CFF4A] tracking-wider uppercase">SELECTED REPOSITORIES &amp; SYSTEMS</span>
          <span className="font-kanji text-[11px] text-[#9CFF4A]/70 hidden md:inline tracking-wider">
            【 開発記録 // 独立設計体系 】
          </span>
        </div>
        <div className="hidden sm:block text-[#D7D9D2]/50 tracking-wider">
          PINNED INDEX // DYNAMIC SPLIT TYPOGRAPHY
        </div>
      </motion.div>

      {/* Pinned Desktop Layout Grid: Left Index + Right Scrolling Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT COLUMN: Pinned Project Index (CSS selector 1) */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 lg:sticky lg:top-28 space-y-4"
        >
          <div className="font-mono text-xs tracking-widest text-[#9CFF4A] uppercase mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#9CFF4A] animate-pulse" />
              <span>PROJECT_INDEX</span>
            </div>
            <span className="font-kanji text-[11px] text-[#9CFF4A]/70">【 目録 】</span>
          </div>

          <div className="space-y-2">
            {PROJECTS.map((proj, idx) => {
              const isSelected = proj.id === selectedProjectId;
              return (
                <motion.button
                  key={proj.id}
                  id={`project-index-btn-${proj.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.08 * idx,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ x: isSelected ? 8 : 4 }}
                  onClick={() => setSelectedProjectId(proj.id)}
                  onMouseEnter={(e) => handleProjectHover(e, proj)}
                  onMouseLeave={handleMouseLeave}
                  className={`w-full text-left p-4 transition-all duration-300 border font-mono group cursor-pointer ${
                    isSelected
                      ? 'bg-[#9CFF4A]/10 border-[#9CFF4A] text-[#D7D9D2] translate-x-2 shadow-[0_0_20px_rgba(156,255,74,0.1)]'
                      : 'bg-[#050605]/60 border-[#9CFF4A]/10 text-[#D7D9D2]/60 hover:border-[#9CFF4A]/40 hover:text-[#D7D9D2]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-xs font-bold tracking-widest ${
                        isSelected ? 'text-[#9CFF4A]' : 'text-[#D7D9D2]/40 group-hover:text-[#9CFF4A]'
                      }`}
                    >
                      {proj.index}
                    </span>
                    <div className="flex items-center space-x-2">
                      {proj.kanjiBadge && (
                        <span className="font-kanji text-[10px] text-[#9CFF4A]/70 px-1 py-0.5 border border-[#9CFF4A]/20 bg-[#9CFF4A]/5">
                          {proj.kanjiBadge}
                        </span>
                      )}
                      <span className="text-[10px] text-[#9CFF4A]/70 uppercase tracking-wider">
                        {proj.techStack[0]}
                      </span>
                    </div>
                  </div>

                  <div className="font-display font-bold text-lg sm:text-xl tracking-tight text-[#D7D9D2] group-hover:text-[#9CFF4A] transition-colors">
                    {proj.title}
                  </div>

                  <div className="text-[11px] text-[#D7D9D2]/50 mt-1 line-clamp-1">
                    {proj.category}
                  </div>

                  {isSelected && (
                    <div className="mt-3 flex items-center space-x-1.5 text-[10px] text-[#9CFF4A] font-semibold tracking-wider">
                      <ChevronRight className="w-3 h-3" />
                      <span>INSPECTING KINETIC VIEW</span>
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Quick Stats Box below index */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="p-4 border border-[#9CFF4A]/15 bg-[#050605]/80 font-mono text-xs text-[#D7D9D2]/70 space-y-2 mt-6"
          >
            <div className="text-[11px] text-[#9CFF4A] font-semibold flex items-center justify-between">
              <span>ZERO-DEPENDENCY METRICS</span>
              <Shield className="w-3.5 h-3.5" />
            </div>
            <p className="text-[11px] leading-relaxed text-[#D7D9D2]/60">
              Direct disk readers, verified SHA-1 hashing, and memory-safe limits across Rust &amp; Python runtimes.
            </p>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Active Project Details with Split Typography & Architecture Inspection */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* 07 — Split Typography Transition Element */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative border border-[#9CFF4A]/20 bg-[#050605]/90 card-pad-lg overflow-hidden"
              >
                {/* Background watermarked project index & Japanese Kanji */}
                <div
                  className="absolute -right-6 -bottom-10 font-display font-black fluid-kanji text-[#9CFF4A]/5 select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {activeProject.index}
                </div>

                {activeProject.kanjiWatermark && (
                  <div
                    className="absolute right-12 top-2 font-kanji font-black fluid-kanji text-[#9CFF4A]/[0.035] select-none pointer-events-none"
                    aria-hidden="true"
                  >
                    {activeProject.kanjiWatermark}
                  </div>
                )}

                <div className="font-mono text-xs text-[#9CFF4A] tracking-widest uppercase mb-4 flex flex-wrap items-center gap-2">
                  <span className="w-2 h-2 bg-[#9CFF4A]" />
                  <span>{activeProject.tag}</span>
                  {activeProject.kanjiCategory && (
                    <span className="font-kanji text-[10px] text-[#9CFF4A]/80 border border-[#9CFF4A]/30 px-1.5 py-0.5 bg-[#9CFF4A]/5">
                      【 {activeProject.kanjiCategory} 】
                    </span>
                  )}
                </div>

                {/* THE WORD SPLIT SYSTEM (KERN / EL style) */}
                <div className="project-title-container my-6 relative py-4">
                  {/* Shadow layer */}
                  <div
                    className="absolute inset-0 font-display font-black fluid-split uppercase tracking-tighter text-[#4D7F2C]/20 -translate-x-2 -translate-y-2 pointer-events-none select-none"
                    aria-hidden="true"
                  >
                    {activeProject.splitFirst} {activeProject.splitSecond}
                  </div>

                  {/* Primary Split Title */}
                  <div className="relative z-10 flex flex-wrap items-baseline gap-x-4 sm:gap-x-6">
                    <span className="font-display font-black fluid-split uppercase tracking-tighter text-[#D7D9D2] hover:text-[#9CFF4A] transition-colors">
                      {activeProject.splitFirst}
                    </span>

                    {/* Expanding visual accent bar between the two split halves */}
                    <span className="h-1 sm:h-2 bg-[#9CFF4A] flex-grow min-w-[30px] max-w-[120px] self-center animate-pulse" />

                    <span className="font-display font-black fluid-split uppercase tracking-tighter text-[#9CFF4A]">
                      {activeProject.splitSecond}
                    </span>
                  </div>

                  {/* Glitch sub-layer */}
                  <div className="text-xs font-mono text-[#9CFF4A]/60 tracking-widest mt-2 uppercase">
                    // REF: {activeProject.repoUrl.replace('https://github.com/', '')}
                  </div>
                </div>

                {/* Summary */}
                <p className="font-mono text-sm sm:text-base text-[#D7D9D2] leading-relaxed max-w-3xl">
                  {activeProject.summary}
                </p>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {activeProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono bg-[#9CFF4A]/10 border border-[#9CFF4A]/30 text-[#9CFF4A]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex items-center space-x-4">
                  <a
                    href={activeProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-[#9CFF4A] text-[#050605] font-mono text-xs font-bold hover:bg-[#D7D9D2] transition-colors cursor-pointer"
                  >
                    <span>VIEW_SOURCE_ON_GITHUB</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>

              {/* Technical Metrics Bento Grid (CSS selector 6) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
                {activeProject.metrics.map((metric, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="p-4 border border-[#9CFF4A]/15 bg-[#050605]/70 hover:border-[#9CFF4A]/40 transition-colors"
                  >
                    <div className="text-[10px] text-[#D7D9D2]/50 tracking-wider mb-1">
                      {metric.label}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#9CFF4A]">
                      {metric.value}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Architecture Highlights & Design Constraints (CSS selector 7) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                {/* Highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 border border-[#9CFF4A]/15 bg-[#050605]/70 space-y-3"
                >
                  <div className="text-[#9CFF4A] font-bold tracking-wider flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>ARCHITECTURE HIGHLIGHTS</span>
                    </div>
                    <span className="font-kanji text-[10px] text-[#9CFF4A]/70 font-normal">
                      【 構造設計 】
                    </span>
                  </div>
                  <ul className="space-y-2 text-[#D7D9D2]/75">
                    {activeProject.architectureHighlights.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-[#9CFF4A] mt-0.5">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Constraints */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 border border-[#9CFF4A]/15 bg-[#050605]/70 space-y-3"
                >
                  <div className="text-[#9CFF4A] font-bold tracking-wider flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-3.5 h-3.5" />
                      <span>DESIGN CONSTRAINTS</span>
                    </div>
                    <span className="font-kanji text-[10px] text-[#9CFF4A]/70 font-normal">
                      【 制約条件 】
                    </span>
                  </div>
                  <ul className="space-y-2 text-[#D7D9D2]/75">
                    {activeProject.designConstraints.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-[#9CFF4A] mt-0.5">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Live CLI Command Showcase (CSS selectors 8, 9, 10) */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 border border-[#9CFF4A]/20 bg-[#050605]/95 font-mono text-xs space-y-4"
              >
                <div className="flex items-center justify-between text-[#9CFF4A]">
                  <div className="flex items-center space-x-2 font-bold">
                    <Terminal className="w-4 h-4" />
                    <span>VERIFIED CLI COMMAND INTERFACE</span>
                    <span className="font-kanji text-[10px] text-[#9CFF4A]/70 font-normal hidden sm:inline">
                      【 実機検証 】
                    </span>
                  </div>
                  <span className="text-[10px] text-[#D7D9D2]/40">
                    CLICK TO EXECUTE IN LIVE SANDBOX
                  </span>
                </div>

                <div className="space-y-4">
                  {activeProject.cliCommands.map((cmdItem, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.45,
                        delay: i * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="border border-[#9CFF4A]/10 bg-black/40 p-3 space-y-2 hover:border-[#9CFF4A]/30 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center space-x-2 text-[#D7D9D2] font-semibold overflow-x-auto">
                          <span className="text-[#9CFF4A]">$</span>
                          <code>{cmdItem.command}</code>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <button
                            onClick={() => handleCopyCommand(cmdItem.command)}
                            className="p-1 hover:text-[#9CFF4A] text-[#D7D9D2]/60 transition-colors cursor-pointer"
                            title="Copy command"
                          >
                            {copiedCmd === cmdItem.command ? (
                              <Check className="w-3.5 h-3.5 text-[#9CFF4A]" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            onClick={() => onExecuteCommand(cmdItem.command, cmdItem.sampleOutput)}
                            className="flex items-center space-x-1 px-2 py-0.5 bg-[#9CFF4A]/15 text-[#9CFF4A] hover:bg-[#9CFF4A] hover:text-[#050605] transition-colors text-[10px] font-bold cursor-pointer"
                          >
                            <Play className="w-3 h-3" />
                            <span>EXECUTE</span>
                          </button>
                        </div>
                      </div>

                      <p className="text-[11px] text-[#D7D9D2]/60">{cmdItem.description}</p>

                      {/* Sample Terminal Output Preview */}
                      <pre className="p-2.5 bg-[#050605] border-l-2 border-[#9CFF4A]/40 text-[11px] text-[#9CFF4A]/90 overflow-x-auto whitespace-pre leading-relaxed font-mono">
                        {cmdItem.sampleOutput}
                      </pre>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      </div>
    </motion.section>
  );
};
