import React from 'react';

// Mob Psycho 100 Authentic Brutalist Glyph Geometries
// Reconstructed from the official Mob Psycho 100 emotion logo (images.jpg)
// Standard coordinate box: Height = 100, sheared/slanted angle ~ -6 deg

interface MobPsychoTextProps {
  value: string; // e.g. "00", "42", "100", "999", "???"
  showPercent?: boolean;
  className?: string;
}

export const MobPsychoText: React.FC<MobPsychoTextProps> = ({
  value,
  showPercent = true,
  className = '',
}) => {
  const chars = value.split('');
  const charWidths: Record<string, number> = {
    '1': 66,
    '0': 80,
    '2': 80,
    '3': 80,
    '4': 84,
    '5': 80,
    '6': 80,
    '7': 78,
    '8': 82,
    '9': 80,
    '?': 72,
  };

  const kerning = 6;
  let glyphsWidth = 0;
  chars.forEach((c) => {
    glyphsWidth += (charWidths[c] || 80) + kerning;
  });
  const percentWidth = showPercent ? 98 : 0;
  const totalContentWidth = glyphsWidth + percentWidth;

  // Dynamic tight viewBox with safety margin for -6 deg shear
  const padX = 22;
  const viewBoxWidth = Math.ceil(totalContentWidth + padX * 2);
  const viewBoxHeight = 112;

  return (
    <div
      className={`flex items-center justify-center select-none w-full ${className}`}
      style={{ filter: 'none', textShadow: 'none' }}
    >
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="w-full h-auto max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] max-h-[46vh] sm:max-h-[56vh] md:max-h-[64vh] overflow-visible drop-shadow-none transition-all duration-75"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform={`skewX(-6) translate(${padX}, 6)`}>
          {renderMobSequence(chars, showPercent, charWidths, kerning)}
        </g>
      </svg>
    </div>
  );
};

function renderMobSequence(
  chars: string[],
  showPercent: boolean,
  charWidths: Record<string, number>,
  kerning: number
) {
  let cursorX = 0;
  const elements: React.ReactNode[] = [];

  chars.forEach((char, index) => {
    const width = charWidths[char] || 80;
    elements.push(
      <g key={`char-${index}`} transform={`translate(${cursorX}, 0)`}>
        {renderSingleGlyph(char)}
      </g>
    );
    cursorX += width + kerning;
  });

  if (showPercent) {
    elements.push(
      <g key="char-percent" transform={`translate(${cursorX + 4}, 0)`}>
        {renderPercentGlyph()}
      </g>
    );
  }

  return elements;
}

function renderSingleGlyph(char: string) {
  switch (char) {
    case '1':
      // The authentic Mob Psycho "1":
      // Top triangular beak, slanted parallel stem, flat horizontal base
      return (
        <path
          d="
            M 24 0
            L 66 0
            L 50 100
            L 14 100
            L 28 24
            L 0 24
            Z
          "
          fill="#FFFFFF"
        />
      );

    case '0':
      // The authentic Mob Psycho "0":
      // Monolithic outer rectangle with angled bottom-right notch,
      // and internal vertical cutout with chamfered bottom-left corner
      return (
        <path
          d="
            M 0 0
            L 80 0
            L 80 72
            L 62 100
            L 0 100
            Z
            M 22 20
            L 58 20
            L 58 80
            L 40 80
            L 22 62
            Z
          "
          fillRule="evenodd"
          fill="#FFFFFF"
        />
      );

    case '2':
      return (
        <path
          d="
            M 0 0 L 80 0 L 80 44 L 32 44 L 32 30 L 52 30 L 52 20 L 0 20 Z
            M 0 46 L 80 46 L 80 100 L 0 100 L 0 76 L 50 76 L 50 64 L 0 64 Z
          "
          fill="#FFFFFF"
        />
      );

    case '3':
      return (
        <path
          d="
            M 0 0 L 80 0 L 80 100 L 0 100 L 0 78 L 52 78 L 52 60 L 16 60 L 16 42 L 52 42 L 52 22 L 0 22 Z
          "
          fill="#FFFFFF"
        />
      );

    case '4':
      return (
        <path
          d="
            M 52 0 L 80 0 L 80 100 L 52 100 L 52 68 L 0 68 L 0 46 L 52 0 Z
            M 52 28 L 26 48 L 52 48 Z
          "
          fillRule="evenodd"
          fill="#FFFFFF"
        />
      );

    case '5':
      return (
        <path
          d="
            M 0 0 L 80 0 L 80 22 L 28 22 L 28 42 L 80 42 L 80 100 L 0 100 L 0 76 L 52 76 L 52 62 L 0 62 Z
          "
          fill="#FFFFFF"
        />
      );

    case '6':
      return (
        <path
          d="
            M 0 0 L 80 0 L 80 22 L 28 22 L 28 46 L 80 46 L 80 100 L 0 100 Z
            M 28 66 L 52 66 L 52 80 L 28 80 Z
          "
          fillRule="evenodd"
          fill="#FFFFFF"
        />
      );

    case '7':
      return (
        <path
          d="
            M 0 0 L 78 0 L 78 24 L 46 100 L 18 100 L 48 24 L 0 24 Z
          "
          fill="#FFFFFF"
        />
      );

    case '8':
      return (
        <path
          d="
            M 0 0 L 80 0 L 80 100 L 0 100 Z
            M 26 18 L 54 18 L 54 42 L 26 42 Z
            M 26 58 L 54 58 L 54 82 L 26 82 Z
          "
          fillRule="evenodd"
          fill="#FFFFFF"
        />
      );

    case '9':
      // The authentic Mob Psycho "9":
      // Inverted monolithic block with angled upper cutout
      return (
        <path
          d="
            M 0 0 L 80 0 L 80 100 L 0 100 L 0 76 L 52 76 L 52 54 L 0 54 Z
            M 26 20 L 52 20 L 52 38 L 26 38 Z
          "
          fillRule="evenodd"
          fill="#FFFFFF"
        />
      );

    case '?':
      // The authentic Mob Psycho "???":
      // Heavy brutalist block hook and square period
      return (
        <g>
          <path
            d="
              M 0 0 L 72 0 L 72 44 L 44 54 L 44 68 L 20 68 L 20 46 L 46 38 L 46 22 L 0 22 Z
            "
            fill="#FFFFFF"
          />
          <rect x="20" y="78" width="24" height="22" fill="#FFFFFF" />
        </g>
      );

    default:
      return null;
  }
}

function renderPercentGlyph() {
  // The authentic Mob Psycho "%":
  // Top-left bracket [ opening right, bottom-right bracket ] opening left,
  // sliced by a bold diagonal blade slanting across both!
  return (
    <g transform="translate(4, 0)">
      {/* Top Left Bracket Shape */}
      <path
        d="
          M 0 16
          L 38 16
          L 38 30
          L 16 30
          L 16 42
          L 38 42
          L 38 56
          L 0 56
          Z
        "
        fill="#FFFFFF"
      />

      {/* Diagonal Slash Blade */}
      <polygon
        points="76,12 96,12 36,92 16,92"
        fill="#FFFFFF"
      />

      {/* Bottom Right Bracket Shape */}
      <path
        d="
          M 52 50
          L 90 50
          L 90 90
          L 52 90
          L 52 76
          L 74 76
          L 74 64
          L 52 64
          Z
        "
        fill="#FFFFFF"
      />
    </g>
  );
}
