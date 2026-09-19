import React from 'react';

interface TechnicalGridProps {
  surgeActive?: boolean;
  isLoaded?: boolean;
}

export const TechnicalGrid: React.FC<TechnicalGridProps> = ({ surgeActive = false, isLoaded = false }) => {
  return (
    <div
      id="technical-grid-layer"
      className="fixed inset-0 pointer-events-none z-0 select-none overflow-hidden transition-opacity duration-700"
      style={{ opacity: isLoaded ? 1 : surgeActive ? 0.9 : 0.4 }}
      aria-hidden="true"
    >
      {/* 1. Subtle Line Grid Matrix with ~0.08 opacity */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          surgeActive ? 'brightness-150 contrast-125' : ''
        }`}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(156, 255, 74, ${surgeActive ? '0.14' : '0.07'}) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(156, 255, 74, ${surgeActive ? '0.14' : '0.07'}) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
        }}
      />

      {/* 2. Micro Dot Grid Intersections */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(rgba(156, 255, 74, 0.15) 1px, transparent 0)`,
          backgroundSize: '120px 120px',
          backgroundPosition: '-0.5px -0.5px',
        }}
      />

      {/* 3. Terminal Grid Metadata Sitting Directly on Coordinates */}
      <div className="absolute top-[120px] left-[120px] -translate-y-full pb-1 text-[9px] font-mono tracking-widest text-[#9CFF4A]/40 hidden md:block">
        SYS / 001
      </div>

      <div className="absolute top-[120px] right-[120px] -translate-y-full pb-1 text-[9px] font-mono tracking-widest text-[#9CFF4A]/40 hidden lg:block">
        ARCH / X86_64
      </div>

      <div className="absolute top-[480px] left-[120px] -translate-y-full pb-1 text-[9px] font-mono tracking-widest text-[#9CFF4A]/30 hidden md:block">
        MODE / KERNEL_MEM
      </div>

      <div className="absolute top-[480px] right-[240px] -translate-y-full pb-1 text-[9px] font-mono tracking-widest text-[#9CFF4A]/30 hidden xl:block">
        STATUS / ONLINE
      </div>

      <div className="absolute bottom-[120px] left-[240px] pb-1 text-[9px] font-mono tracking-widest text-[#9CFF4A]/25 hidden sm:block">
        VFS / DIRECT_DISK_PARSER
      </div>

      <div className="absolute bottom-[120px] right-[120px] pb-1 text-[9px] font-mono tracking-widest text-[#9CFF4A]/25 hidden sm:block">
        ZONE / 0x7FFF_FFFF
      </div>

      {/* Minimal grid corner bracket marks */}
      <div className="absolute top-6 left-6 text-xs text-[#9CFF4A]/20 font-mono">+</div>
      <div className="absolute top-6 right-6 text-xs text-[#9CFF4A]/20 font-mono">+</div>
      <div className="absolute bottom-6 left-6 text-xs text-[#9CFF4A]/20 font-mono">+</div>
      <div className="absolute bottom-6 right-6 text-xs text-[#9CFF4A]/20 font-mono">+</div>
    </div>
  );
};
