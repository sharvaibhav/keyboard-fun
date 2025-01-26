// src/components/sound/config.ts
import { SoundTheme, ThemeSoundUrls } from "./types";
import { generateSoundAssets } from "@/utils/generateSoundAssets";

export const SOUND_THEMES: Record<
  Exclude<SoundTheme, "none">,
  ThemeSoundUrls
> = {
  mechanical: {
    keyPress: "mechanical_press",
    wordComplete: "mechanical_complete",
    error: "mechanical_error",
  },
  soft: {
    keyPress: "soft_press",
    wordComplete: "soft_complete",
    error: "soft_error",
  },
  typewriter: {
    keyPress: "typewriter_press",
    wordComplete: "typewriter_complete",
    error: "typewriter_error",
  },
};

export const DEFAULT_VOLUME = 0.5;
export const DEFAULT_THEME: SoundTheme = "mechanical";

// Generate sound assets when the application starts
generateSoundAssets();
