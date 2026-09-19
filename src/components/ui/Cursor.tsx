import React, { useEffect, useState } from 'react';

export const Cursor: React.FC = () => {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only show on devices with fine pointer (mouse/trackpad)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      id="custom-cursor"
      className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out select-none hidden md:block"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      <div className="relative -top-2.5 -left-2.5">
        {/* Dot core */}
        <div
          className={`w-1.5 h-1.5 bg-[#9CFF4A] rounded-full transition-transform duration-150 ${
            isHovered ? 'scale-0' : 'scale-100'
          }`}
        />

        {/* Reticle brackets when hovering interactable */}
        <div
          className={`absolute -top-3 -left-3 w-8 h-8 border border-[#9CFF4A]/80 transition-all duration-200 ${
            isHovered
              ? 'scale-100 opacity-100 rotate-45 border-[#9CFF4A]'
              : 'scale-50 opacity-0 rotate-0'
          }`}
        />

        {/* Subtle crosshair hair lines */}
        <div className="absolute top-0.5 -left-2 w-1 h-[1px] bg-[#9CFF4A]/40" />
        <div className="absolute top-0.5 left-2.5 w-1 h-[1px] bg-[#9CFF4A]/40" />
        <div className="absolute -top-2 left-0.5 h-1 w-[1px] bg-[#9CFF4A]/40" />
        <div className="absolute top-2.5 left-0.5 h-1 w-[1px] bg-[#9CFF4A]/40" />
      </div>
    </div>
  );
};
