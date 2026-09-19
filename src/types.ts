export interface Project {
  id: string;
  index: string; // "01", "02", etc.
  tag: string; // "KERNEL / REPO MAINTENANCE", etc.
  title: string;
  splitFirst: string; // e.g., "GIT" or "KERN"
  splitSecond: string; // e.g., "JANITOR" or "EL"
  category: string; // "LOW-LEVEL SYSTEMS & CLI", "ALGORITHMS & METRICS", etc.
  repoUrl: string;
  techStack: string[];
  summary: string;
  architectureHighlights: string[];
  designConstraints: string[];
  cliCommands: {
    command: string;
    description: string;
    sampleOutput: string;
  }[];
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface KoiTarget {
  x: number;
  y: number;
  intensity: number; // 0 to 1
  label?: string;
}

export interface TelemetryState {
  fps: number;
  scrollProgress: number;
  scrollVelocity: number;
  activeSection: string;
  koiState: 'orbiting' | 'swimming' | 'darting' | 'hunting';
}
