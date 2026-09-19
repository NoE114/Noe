import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import { MobPsychoText } from './MobPsychoGlyphs';
import { LoaderAudioEngine, AudioTriggerCue } from './loaderAudio';

interface LoaderProps {
  onComplete: () => void;
  onSyncPhase?: (phase: 'counting' | 'surge' | 'mystery' | 'blackout' | 'finished', progress: number) => void;
  onAudioCue?: (cue: AudioTriggerCue) => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete, onSyncPhase, onAudioCue }) => {
  const [displayValue, setDisplayValue] = useState<string>('00');
  const [phase, setPhase] = useState<'counting' | 'surge' | 'mystery' | 'blackout' | 'finished'>('counting');
  const [statusLog, setStatusLog] = useState<string>('MOB_PSYCHE // SUPPRESSED EMOTIONAL BURDEN');
  const [audioMuted, setAudioMuted] = useState<boolean>(false);

  const startTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const audioEngineRef = useRef<LoaderAudioEngine | null>(null);
  const isCompletedRef = useRef<boolean>(false);

  // Keep latest callbacks in refs so the animation loop never restarts prematurely
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const onSyncPhaseRef = useRef(onSyncPhase);
  onSyncPhaseRef.current = onSyncPhase;
  const onAudioCueRef = useRef(onAudioCue);
  onAudioCueRef.current = onAudioCue;

  const triggerComplete = () => {
    if (isCompletedRef.current) return;
    isCompletedRef.current = true;
    setPhase('finished');
    onSyncPhaseRef.current?.('finished', 1000);
    audioEngineRef.current?.updateIntensity(0, 'finished');
    onCompleteRef.current();
  };

  useEffect(() => {
    // Initialize ambient hum audio trigger engine with sound enabled by default
    const engine = new LoaderAudioEngine({
      onTriggerCue: (cue) => {
        onAudioCueRef.current?.(cue);
      },
    });
    audioEngineRef.current = engine;

    // Start audio context immediately
    engine.init();

    // Auto-resume on first user gesture if browser requires interaction
    const unlockAudio = () => {
      if (audioEngineRef.current) {
        audioEngineRef.current.init();
      }
    };
    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });
    window.addEventListener('touchstart', unlockAudio, { once: true });
    window.addEventListener('click', unlockAudio, { once: true });

    // Allow user to press ESC or Enter to instantly enter the site
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        triggerComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    startTimeRef.current = performance.now();

    const loop = (now: number) => {
      if (isCompletedRef.current) return;
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;

      // 1. Emotion level builds up from 0% to 100% in 1.1s (0 - 1100ms)
      if (elapsed < 1100) {
        setPhase('counting');
        const progress = Math.min(100, Math.floor((elapsed / 1100) * 100));
        setDisplayValue(progress.toString().padStart(2, '0'));
        onSyncPhaseRef.current?.('counting', progress);
        audioEngineRef.current?.updateIntensity(progress, 'counting');

        if (progress < 40) {
          setStatusLog('MOB_PSYCHE // SUPPRESSED EMOTIONAL BURDEN');
        } else if (progress < 80) {
          setStatusLog('PRESSURE_BUILDUP // INTERNAL ACCUMULATION ESCALATING');
        } else {
          setStatusLog('CRITICAL_MASS // EMOTION NEARING EXPLOSION POINT: 100%');
        }
      }
      // Brief pause at exactly 100% for maximum dramatic impact (1100 - 1250ms)
      else if (elapsed < 1250) {
        setPhase('counting');
        setDisplayValue('100');
        setStatusLog('EXPLOSION POINT // 100% EMOTIONAL THRESHOLD REACHED');
        onSyncPhaseRef.current?.('counting', 100);
        audioEngineRef.current?.updateIntensity(100, 'counting');
      }
      // 2. Rapid psychic surge past 100% up to 999% in 0.65s (1250 - 1900ms)
      else if (elapsed < 1900) {
        setPhase('surge');
        const surgeProgress = (elapsed - 1250) / 650;
        const currentVal = Math.min(999, 100 + Math.floor(Math.pow(surgeProgress, 1.25) * 899));
        setDisplayValue(currentVal.toString());
        onSyncPhaseRef.current?.('surge', currentVal);
        audioEngineRef.current?.updateIntensity(currentVal, 'surge');

        if (currentVal < 450) {
          setStatusLog('EXPLOSION // EMOTION LEVEL 100% EXCEEDED');
        } else if (currentVal < 850) {
          setStatusLog('UNCONTAINABLE // PSYCHIC SURGE SURPASSING SENSORS');
        } else {
          setStatusLog('LIMIT_OVERFLOW // SYSTEM UNABLE TO QUANTIFY VALUE');
        }
      }
      // 3. Emotion overflow: breaks into ???% (1900 - 2350ms)
      else if (elapsed < 2350) {
        setPhase('mystery');
        setDisplayValue('???');
        setStatusLog('SUBCONSCIOUS // MEASUREMENT IMPOSSIBLE: ???% AWAKENED');
        onSyncPhaseRef.current?.('mystery', 1000);
        audioEngineRef.current?.updateIntensity(1000, 'mystery');
      }
      // 4. Blackout psychic shockwave transition into website (2350 - 2550ms)
      else if (elapsed < 2550) {
        setPhase('blackout');
        onSyncPhaseRef.current?.('blackout', 1000);
        audioEngineRef.current?.updateIntensity(0, 'blackout');
      } else {
        // Complete and reveal the website
        triggerComplete();
        return;
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', handleKeyDown);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      if (audioEngineRef.current) {
        audioEngineRef.current.destroy();
      }
    };
  }, []);

  const handleToggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioEngineRef.current) return;

    audioEngineRef.current.init().then(() => {
      const isMuted = audioEngineRef.current?.toggleMute() ?? false;
      setAudioMuted(isMuted);
    });
  };

  if (phase === 'finished') return null;

  return (
    <AnimatePresence>
      <motion.div
        id="loading-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 flex flex-col justify-between p-4 sm:p-8 md:p-12 bg-[#000000] text-[#FFFFFF] select-none overflow-hidden"
      >
        {/* Subtle grid scanlines without any text-shadows */}
        <div className="absolute inset-0 scanlines pointer-events-none opacity-15 z-20" />

        {/* Top Header telemetry in stark high-contrast typography */}
        <div className="relative z-30 flex items-center justify-between text-[11px] sm:text-xs tracking-widest text-[#FFFFFF]/80 font-mono">
          <div className="flex items-center space-x-2.5">
            <span className="inline-block w-2 h-2 bg-[#FFFFFF] rounded-none animate-pulse" />
            <span className="font-semibold tracking-wider text-[#FFFFFF] truncate max-w-[50vw] sm:max-w-none">
              {statusLog}
            </span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4 text-[#FFFFFF]/50 text-[11px]">
            <span className="hidden lg:inline">BURDEN_INDEX: MAX</span>

            {/* Audio Hum Trigger / Mute Controller */}
            <button
              onClick={handleToggleAudio}
              className="flex items-center space-x-1.5 px-2 py-1 border border-white/20 hover:border-white text-[10px] font-mono tracking-wider transition-colors cursor-pointer text-white/80 hover:text-white"
              title="Toggle ambient psyche audio hum"
            >
              {!audioMuted ? (
                <Volume2 className="w-3 h-3 text-[#9CFF4A] animate-pulse" />
              ) : (
                <VolumeX className="w-3 h-3 text-white/40" />
              )}
              <span>
                {audioMuted ? 'SOUND: OFF' : 'SOUND: ON'}
              </span>
            </button>

            {/* Direct Instant Enter Button */}
            <button
              id="loader-enter-site-btn"
              onClick={triggerComplete}
              className="flex items-center space-x-1 px-2.5 py-1 bg-[#9CFF4A] hover:bg-white text-[#050605] font-bold text-[10px] font-mono tracking-wider transition-colors cursor-pointer"
              title="Skip loader and enter site directly"
            >
              <span>ENTER SITE →</span>
            </button>
          </div>
        </div>

        {/* Center Counter: Authentic Mob Psycho 100 Brutalist Typography (Dynamic Responsive Sizing) */}
        <div className="relative z-30 flex-1 flex items-center justify-center w-full my-auto px-2 sm:px-6">
          {phase === 'blackout' ? (
            <div className="w-full h-full bg-[#000000] flex items-center justify-center">
              {/* Ultra-brief psychic flash ring */}
              <div className="w-24 h-24 sm:w-48 sm:h-48 border-2 border-white rounded-full animate-ping opacity-75" />
            </div>
          ) : (
            <div className="w-full flex items-center justify-center">
              <MobPsychoText
                value={displayValue}
                showPercent={true}
                className={phase === 'mystery' ? 'animate-pulse' : ''}
              />
            </div>
          )}
        </div>

        {/* Bottom Sequence Markers: 00% -> 100% -> 999% -> ???% */}
        <div className="relative z-30 flex items-center justify-between text-[11px] sm:text-xs font-mono text-[#FFFFFF]/40 tracking-wider">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className={displayValue !== '00' ? 'text-[#FFFFFF] font-bold' : 'text-[#FFFFFF]/40'}>
              00%
            </span>
            <span className="text-[#FFFFFF]/25">→</span>
            <span
              className={
                phase !== 'counting' || Number(displayValue) >= 100
                  ? 'text-[#FFFFFF] font-bold'
                  : 'text-[#FFFFFF]/40'
              }
            >
              100%
            </span>
            <span className="text-[#FFFFFF]/25">→</span>
            <span
              className={
                phase === 'surge' || phase === 'mystery'
                  ? 'text-[#FFFFFF] font-bold'
                  : 'text-[#FFFFFF]/40'
              }
            >
              999%
            </span>
            <span className="text-[#FFFFFF]/25">→</span>
            <span
              className={
                phase === 'mystery'
                  ? 'text-[#FFFFFF] font-bold animate-pulse'
                  : 'text-[#FFFFFF]/40'
              }
            >
              ???%
            </span>
          </div>
          <div className="text-right font-mono text-[10px] sm:text-xs text-[#FFFFFF]/60">
            <span className="text-[#FFFFFF] font-semibold">NoE114</span> // MOB_PSYCHE PROTOCOL
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
