// Low-frequency ambient hum audio engine for the Mob Psycho loader
// Utilizes the native Web Audio API to generate a cinematic, sub-bass hum
// that smoothly intensifies as the emotional burden climbs to 999%

export type AudioTriggerCue =
  | 'HUM_INIT'
  | 'SURGE_START'
  | 'CRITICAL_999'
  | 'MYSTERY_PULSE'
  | 'BLACKOUT_DROP';

export interface LoaderAudioConfig {
  onTriggerCue?: (cue: AudioTriggerCue, details?: { freq?: number; gain?: number }) => void;
}

export class LoaderAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private harmOsc: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private isRunning: boolean = false;
  private isMuted: boolean = false;
  private onTriggerCue?: (cue: AudioTriggerCue, details?: { freq?: number; gain?: number }) => void;

  private lastCueTriggered: Set<string> = new Set();

  constructor(config?: LoaderAudioConfig) {
    this.onTriggerCue = config?.onTriggerCue;
  }

  // Attempt to initialize or resume Web Audio context
  public async init(): Promise<boolean> {
    if (this.ctx && this.ctx.state === 'running') {
      return true;
    }

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return false;

      if (!this.ctx) {
        this.ctx = new AudioCtxClass();
      }

      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      this.setupNodes();
      this.isRunning = true;
      this.triggerCue('HUM_INIT', { freq: 46, gain: 0.04 });
      return true;
    } catch {
      // Audio context might be blocked by browser autoplay policy until user interacts
      return false;
    }
  }

  private setupNodes() {
    if (!this.ctx) return;

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.001, this.ctx.currentTime);
    // Smooth ramp-in
    this.masterGain.gain.exponentialRampToValueAtTime(
      this.isMuted ? 0.001 : 0.05,
      this.ctx.currentTime + 0.3
    );

    // Resonant Low-pass Filter to keep it deep, heavy, and sub-bass focused
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(110, this.ctx.currentTime); // Hz
    this.filter.Q.setValueAtTime(3.5, this.ctx.currentTime);

    // Primary Sub-bass Oscillator (pure sine)
    this.subOsc = this.ctx.createOscillator();
    this.subOsc.type = 'sine';
    this.subOsc.frequency.setValueAtTime(46, this.ctx.currentTime); // Deep hum (F#1/G1)

    // Secondary Harmonic Oscillator (triangle wave at 2x frequency for texture)
    this.harmOsc = this.ctx.createOscillator();
    this.harmOsc.type = 'triangle';
    this.harmOsc.frequency.setValueAtTime(92, this.ctx.currentTime);

    const harmGain = this.ctx.createGain();
    harmGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    // Routing:
    // subOsc -> filter -> masterGain -> destination
    // harmOsc -> harmGain -> filter
    this.subOsc.connect(this.filter);
    this.harmOsc.connect(harmGain);
    harmGain.connect(this.filter);
    this.filter.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);

    this.subOsc.start();
    this.harmOsc.start();
  }

  // Real-time update called on every animation frame as percentage builds
  public updateIntensity(
    value: number,
    phase: 'counting' | 'surge' | 'mystery' | 'blackout' | 'finished'
  ) {
    if (!this.ctx || !this.isRunning || !this.subOsc || !this.harmOsc || !this.filter || !this.masterGain) {
      return;
    }

    const now = this.ctx.currentTime;

    if (this.isMuted) {
      this.masterGain.gain.setTargetAtTime(0, now, 0.05);
      return;
    }

    if (phase === 'counting') {
      // 0% -> 100%: Steady subtle low hum
      const ratio = Math.min(1, Math.max(0, value / 100));
      const targetFreq = 46 + ratio * 8; // 46Hz -> 54Hz
      const targetGain = 0.04 + ratio * 0.03; // 0.04 -> 0.07
      const targetCutoff = 110 + ratio * 30; // 110Hz -> 140Hz

      this.subOsc.frequency.setTargetAtTime(targetFreq, now, 0.05);
      this.harmOsc.frequency.setTargetAtTime(targetFreq * 2, now, 0.05);
      this.filter.frequency.setTargetAtTime(targetCutoff, now, 0.05);
      this.masterGain.gain.setTargetAtTime(targetGain, now, 0.05);
    } else if (phase === 'surge') {
      // 100% -> 999%: Aggressive emotional surge & rising ambient hum!
      const surgeRatio = Math.min(1, Math.max(0, (value - 100) / 899));

      if (surgeRatio > 0.05 && !this.lastCueTriggered.has('SURGE_START')) {
        this.triggerCue('SURGE_START', { freq: 56, gain: 0.08 });
      }

      if (surgeRatio > 0.92 && !this.lastCueTriggered.has('CRITICAL_999')) {
        this.triggerCue('CRITICAL_999', { freq: 110, gain: 0.25 });
      }

      // Exponential pitch rise and harmonic resonance
      const targetFreq = 54 + Math.pow(surgeRatio, 1.4) * 66; // 54Hz -> 120Hz
      const targetCutoff = 140 + Math.pow(surgeRatio, 1.3) * 360; // 140Hz -> 500Hz
      const targetGain = 0.07 + Math.pow(surgeRatio, 1.2) * 0.22; // 0.07 -> 0.29 (deep, powerful rumble)

      this.subOsc.frequency.setTargetAtTime(targetFreq, now, 0.03);
      this.harmOsc.frequency.setTargetAtTime(targetFreq * 2.02, now, 0.03); // Slight detune for psychic tension
      this.filter.frequency.setTargetAtTime(targetCutoff, now, 0.03);
      this.masterGain.gain.setTargetAtTime(targetGain, now, 0.03);
    } else if (phase === 'mystery') {
      // ???% Emotion unquantifiable: heavy low resonant drop
      if (!this.lastCueTriggered.has('MYSTERY_PULSE')) {
        this.triggerCue('MYSTERY_PULSE', { freq: 36, gain: 0.32 });
      }

      // Sub drop to 36Hz with high resonant swell
      this.subOsc.frequency.setTargetAtTime(36, now, 0.04);
      this.harmOsc.frequency.setTargetAtTime(72, now, 0.04);
      this.filter.frequency.setTargetAtTime(95, now, 0.04);
      this.filter.Q.setTargetAtTime(6.0, now, 0.04);
      this.masterGain.gain.setTargetAtTime(0.28, now, 0.04);
    } else if (phase === 'blackout') {
      if (!this.lastCueTriggered.has('BLACKOUT_DROP')) {
        this.triggerCue('BLACKOUT_DROP', { freq: 0, gain: 0 });
      }
      // Sudden psychic collapse: quick fade to zero
      this.masterGain.gain.setTargetAtTime(0, now, 0.08);
    } else if (phase === 'finished') {
      this.destroy();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.08, now, 0.05);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }

  private triggerCue(cue: AudioTriggerCue, details?: { freq?: number; gain?: number }) {
    this.lastCueTriggered.add(cue);
    if (this.onTriggerCue) {
      this.onTriggerCue(cue, details);
    }
  }

  public destroy() {
    this.isRunning = false;
    try {
      if (this.subOsc) {
        this.subOsc.stop();
        this.subOsc.disconnect();
      }
      if (this.harmOsc) {
        this.harmOsc.stop();
        this.harmOsc.disconnect();
      }
      if (this.filter) {
        this.filter.disconnect();
      }
      if (this.masterGain) {
        this.masterGain.disconnect();
      }
      if (this.ctx && this.ctx.state !== 'closed') {
        this.ctx.close();
      }
    } catch {
      // Safe teardown
    }
    this.subOsc = null;
    this.harmOsc = null;
    this.filter = null;
    this.masterGain = null;
    this.ctx = null;
  }
}
