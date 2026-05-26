export interface Ball {
  id: string;
  tier: number; // 1 to 11
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  angle: number;       // For visual rotation rolling effect
  vAngle: number;      // Rotational speed
  popScale: number;    // Animation scale when merging/popping (starts at 0.1, grows to 1.0)
  isMerging: boolean;  // Mark for cleanup/merges
  // Squash/stretch jiggle visuals
  jiggleTimer?: number;
  jiggleAmp?: number;
  jiggleType?: 'vertical' | 'horizontal';
  isSleeping?: boolean; // Sleep state for physics resting assets
}

export interface EvolutionaryTier {
  tier: number;
  name: string;
  color: string;
  accentColor: string;
  description: string;
  radius: number;
}

export interface TelemetryLog {
  timestamp: string;
  message: string;
  type: 'info' | 'collision' | 'merge' | 'cascade' | 'powerup' | 'warning';
}

export interface GameState {
  score: number;
  highScore: number;
  onDeckTier: number;    // Tier of ready ball
  nextDropTier: number;   // Tier of upcoming ball
  isGameOver: boolean;
  warningActive: boolean;
  warningTimeRemaining: number; // Seconds remaining for the 3-second overflow rule
  powerups: {
    snotRagBomb: number;  // Uses remaining
    shakeDumpster: number; // Uses remaining
  };
  activePowerupMode: 'none' | 'snotRag';
}

// Full 11-Tier Evolutionary Ladder Configuration
export const EVOLUTIONARY_LADDER: Record<number, EvolutionaryTier> = {
  1: {
    tier: 1,
    name: 'Snot-Shot',
    color: '#39ff14', // Neon green snot
    accentColor: '#bdff00',
    description: 'Tiny neon-green mucus ball with a single bloodshot eye and hand-inked continuous drips.',
    radius: 15,
  },
  2: {
    tier: 2,
    name: 'Splatter-Matter',
    color: '#b026ff', // Neon purple oozing
    accentColor: '#ea00d9',
    description: 'Gritty street baseball leaking toxic purple splatter, covered in cross-hatched details.',
    radius: 20,
  },
  3: {
    tier: 3,
    name: 'Brain-Drain',
    color: '#ff2a85', // Electric pink brain with blue veins
    accentColor: '#05d9e8',
    description: 'Heavily cross-hatched pink brain, bulging with neon-blue electric thought-veins.',
    radius: 26,
  },
  4: {
    tier: 4,
    name: 'Slatter-Fly',
    color: '#ff5e00', // Neon orange fly with green wings
    accentColor: '#1bb53d',
    description: 'Bulbous housefly ball with gritty compound-stipple ink eyes and orange sludge drips.',
    radius: 33,
  },
  5: {
    tier: 5,
    name: 'Zit-Zilla',
    color: '#fff01f', // Bright pus yellow with red irritated rim
    accentColor: '#e50000',
    description: 'Inflamed skin sphere decorated with intense stipple-shading and a ready-to-pop whitehead crater.',
    radius: 41,
  },
  6: {
    tier: 6,
    name: 'Toxic Toby',
    color: '#32cd32', // Radioactive waste
    accentColor: '#000000',
    description: 'Sketchy drum-shaped radioactive cell with a floating stipple-drawn skull smiling inside.',
    radius: 50,
  },
  7: {
    tier: 7,
    name: 'Crud-Muncher',
    color: '#8b5a2b', // Mud dirty brown
    accentColor: '#fff8dc',
    description: 'Muddy, jagged-fanged sludge monstrosity with ink-drawn gritted cartoon teeth.',
    radius: 60,
  },
  8: {
    tier: 8,
    name: 'Maggot-Mass',
    color: '#fdfdcd', // Off-white larvae pile
    accentColor: '#000000',
    description: 'A squirming, tightly cocooned mass of heavy-outline ink larvae with bloodshot writhing animation.',
    radius: 71,
  },
  9: {
    tier: 9,
    name: 'Gummy-Glop',
    color: '#ea00d9', // Pink chewed gum with cigarettes and soot
    accentColor: '#4f5d75',
    description: 'Sticky sphere of mashed dumpster chewing gum, loaded with detailed filter-stub embeds.',
    radius: 83,
  },
  10: {
    tier: 10,
    name: 'Opti-Clot',
    color: '#ff1493', // Shocking pink and white eyes
    accentColor: '#ffffff',
    description: 'A colossal, terrifying cluster of conjoined, hyper-bloodshot indie-style ink eyeballs.',
    radius: 96,
  },
  11: {
    tier: 11,
    name: 'Giga-Gorge',
    color: '#ff0000', // Massive crimson demon maw
    accentColor: '#00ffff',
    description: 'The absolute multi-eyed, gaping-maw titan sphere. Duplicate merge triggers instant table-clear detonation!',
    radius: 110,
  },
};
