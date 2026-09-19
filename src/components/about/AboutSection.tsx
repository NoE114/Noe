import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DEVELOPER_PROFILE } from '../../data/projects';
import { Terminal, Shield, Cpu, Code2, Award, CheckCircle2 } from 'lucide-react';
import { KoiTarget } from '../../types';

interface AboutSectionProps {
  onHoverTarget: (target: KoiTarget | null) => void;
  entranceTrigger?: boolean;
  staggerDelay?: number;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onHoverTarget,
  entranceTrigger = true,
  staggerDelay = 0,
}) => {
  const [animationDone, setAnimationDone] = useState<boolean>(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, label: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onHoverTarget({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      intensity: 0.8,
      label,
    });
  };

  const handleMouseLeave = () => {
    onHoverTarget(null);
  };

  return (
    <motion.section
      id="about"
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
      className="relative z-20 section-pad border-t border-[#9CFF4A]/10"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between border-b border-[#9CFF4A]/20 pb-4 mb-12 font-mono text-xs text-[#D7D9D2]/70"
      >
        <div className="flex items-center space-x-3">
          <span className="text-[#9CFF4A] font-bold text-sm">03 / 06</span>
          <span className="text-[#9CFF4A]/40">/</span>
          <span className="text-[#9CFF4A] tracking-wider uppercase">ENGINEERING BIOME &amp; ENVIRONMENT</span>
          <span className="font-kanji text-[11px] text-[#9CFF4A]/70 hidden md:inline tracking-wider">
            【 技術環境 // 思想体系 】
          </span>
        </div>
        <div className="hidden sm:block text-[#D7D9D2]/50 tracking-wider">
          ARCH LINUX • NEOVIM • ZERO-DEPENDENCY
        </div>
      </motion.div>

      {/* Grid Layout: Philosophy + Environment Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Architectural Philosophy */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-6"
        >
          <div
            onMouseEnter={(e) => handleMouseEnter(e, 'developer-bio')}
            onMouseLeave={handleMouseLeave}
            className="card-pad-lg border border-[#9CFF4A]/20 bg-[#050605]/80 space-y-4 font-mono hover:border-[#9CFF4A]/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-[#9CFF4A] font-bold tracking-widest uppercase">
                  // SYSTEM_IDENTITY
                </span>
                <span className="font-kanji text-[11px] text-[#9CFF4A]/80">
                  【 開発思想 】
                </span>
              </div>
              <span className="text-[10px] text-[#D7D9D2]/40">NODE_ID: NOE114</span>
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#D7D9D2] tracking-tight">
              {DEVELOPER_PROFILE.realName} <span className="text-[#9CFF4A]">({DEVELOPER_PROFILE.styledHandle})</span>
            </h3>

            <p className="text-xs sm:text-sm text-[#D7D9D2]/80 leading-relaxed">
              A systems and security-focused engineer working at the bare metal boundaries. My work focuses on building self-contained command-line utilities, direct filesystem Git parsers, reproducible Nix build environments, and sequence algorithms without relying on third-party runtime bloat.
            </p>

            <div className="pt-4 border-t border-[#9CFF4A]/15 space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-[#9CFF4A]/10">
                <span className="text-[#D7D9D2]/50">PRIMARY_ENV</span>
                <span className="text-[#9CFF4A]">{DEVELOPER_PROFILE.environment}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#9CFF4A]/10">
                <span className="text-[#D7D9D2]/50">WORKING_STYLE</span>
                <span className="text-[#D7D9D2]">{DEVELOPER_PROFILE.workingStyle}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-[#D7D9D2]/50">CRATE_PHILOSOPHY</span>
                <div className="flex items-center space-x-2">
                  <span className="font-kanji text-[10px] text-[#9CFF4A] border border-[#9CFF4A]/30 px-1 py-0.5 bg-[#9CFF4A]/5">
                    【 零依存主義 】
                  </span>
                  <span className="text-[#9CFF4A]">Stdlib First, Zero Unneeded Crates</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hackathons & Competitions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 border border-[#9CFF4A]/15 bg-[#050605]/80 font-mono text-xs space-y-3"
          >
            <div className="flex items-center justify-between text-[#9CFF4A] font-bold">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>AFFILIATIONS &amp; HACKATHONS</span>
              </div>
              <span className="font-kanji text-[10px] text-[#9CFF4A]/70 font-normal">
                【 実績・競技 】
              </span>
            </div>

            <div className="space-y-2.5">
              {DEVELOPER_PROFILE.affiliations.map((aff, i) => (
                <div
                  key={i}
                  className="p-3 bg-black/40 border border-[#9CFF4A]/10 flex items-center justify-between hover:border-[#9CFF4A]/30 transition-colors"
                >
                  <div>
                    <div className="font-bold text-[#D7D9D2]">{aff.title}</div>
                    <div className="text-[11px] text-[#9CFF4A]/70">{aff.role}</div>
                  </div>
                  <span className="text-[10px] text-[#D7D9D2]/40 bg-[#9CFF4A]/5 border border-[#9CFF4A]/20 px-2 py-0.5">
                    {aff.repo}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Technical Capability Matrix */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-4"
        >
          <div className="font-mono text-xs text-[#9CFF4A] tracking-widest uppercase mb-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4" />
              <span>CORE_COMPETENCIES</span>
            </div>
            <span className="font-kanji text-[11px] text-[#9CFF4A]/70">【 中核能力 】</span>
          </div>

          <div className="space-y-4">
            {DEVELOPER_PROFILE.skills.map((group, idx) => {
              const kanjiMap: Record<string, string> = {
                'Languages': '開発言語',
                'Systems & Kernel': '低層基盤',
                'Security & Forensics': '情報防衛',
                'Tooling & Workflow': '作業環境',
              };

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onMouseEnter={(e) => handleMouseEnter(e, group.category)}
                  onMouseLeave={handleMouseLeave}
                  className="p-5 border border-[#9CFF4A]/15 bg-[#050605]/75 font-mono space-y-2 hover:border-[#9CFF4A]/40 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs text-[#9CFF4A] font-bold">
                    <div className="flex items-center space-x-2">
                      <span>{group.category.toUpperCase()}</span>
                      <span className="font-kanji text-[10px] text-[#9CFF4A]/75 font-normal">
                        【 {kanjiMap[group.category] || '専門技術'} 】
                      </span>
                    </div>
                    <span className="text-[10px] text-[#D7D9D2]/40">LAYER {idx + 1}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 text-xs bg-[#9CFF4A]/10 border border-[#9CFF4A]/25 text-[#D7D9D2] hover:text-[#9CFF4A] transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Zero-Dependency Proof Banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="p-4 border border-[#9CFF4A]/30 bg-[#9CFF4A]/5 font-mono text-xs text-[#D7D9D2] flex items-center space-x-3"
          >
            <CheckCircle2 className="w-5 h-5 text-[#9CFF4A] flex-shrink-0" />
            <div>
              <span className="font-kanji text-[11px] text-[#9CFF4A] font-bold mr-1">
                【 標準規格検証 】
              </span>
              <span className="text-[#9CFF4A] font-bold">Standard Library Verification:</span> All security scanners and direct disk Git tools execute without shelling out or importing bloated crates.
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
