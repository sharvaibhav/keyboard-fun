// src/components/sound/config.ts
import { SoundTheme, ThemeSoundUrls } from "./types";

// Simplified theme configuration
export const SOUND_THEMES: Record<
  Exclude<SoundTheme, "none">,
  ThemeSoundUrls
> = {
  mechanical: {
    keyPress: "mechanical_keyPress",
    wordComplete: "mechanical_wordComplete",
    error: "mechanical_error",
  },
  soft: {
    keyPress: "soft_keyPress",
    wordComplete: "soft_wordComplete",
    error: "soft_error",
  },
  typewriter: {
    keyPress: "typewriter_keyPress",
    wordComplete: "typewriter_wordComplete",
    error: "typewriter_error",
  },
};

export const DEFAULT_VOLUME = 0.5;
export const DEFAULT_THEME: SoundTheme = "mechanical";
