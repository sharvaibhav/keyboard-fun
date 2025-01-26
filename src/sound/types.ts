// src/components/sound/types.ts

export type SoundTheme = "mechanical" | "soft" | "typewriter" | "none";

export type SoundType = "keyPress" | "wordComplete" | "error";

export interface ThemeSoundUrls {
  keyPress: string;
  wordComplete: string;
  error: string;
}

export interface SoundConfig {
  theme: SoundTheme;
  volume: number;
  enabled: boolean;
}

export interface SoundContextValue {
  config: SoundConfig;
  setVolume: (volume: number) => void;
  setTheme: (theme: SoundTheme) => void;
  toggleSound: () => void;
  playSound: (type: SoundType) => void;
}
