// src/utils/generateSoundAssets.ts

import { SOUND_THEMES } from "@/sound/config";
import { SoundTheme, SoundType } from "@/sound/types";

// Ensure a single audio context for the entire application
const audioContext = new AudioContext();

// Map to store generated sound buffers
export const soundBuffers = new Map<string, AudioBuffer>();

/**
 * Generate a tone with specific frequency and duration
 * @param frequency Frequency of the tone in Hz
 * @param duration Duration of the tone in seconds
 * @param theme Theme of the sound
 * @param type Type of sound (press, complete, error)
 * @returns AudioBuffer with generated sound
 */
const generateTone = (
  frequency: number,
  duration: number,
  theme: SoundTheme,
  type: "press" | "complete" | "error"
): AudioBuffer => {
  const sampleRate = audioContext.sampleRate;
  const length = duration * sampleRate;
  const buffer = audioContext.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  // Theme-specific sound characteristics
  const themeCharacteristics: Record<
    SoundTheme,
    Record<
      "press" | "complete" | "error",
      {
        harmonyStrength: number;
        attackSharpness: number;
        frequencyVariation: number;
      }
    >
  > = {
    mechanical: {
      press: {
        harmonyStrength: 0.6,
        attackSharpness: 0.05,
        frequencyVariation: 1.1,
      },
      complete: {
        harmonyStrength: 0.4,
        attackSharpness: 0.1,
        frequencyVariation: 1.2,
      },
      error: {
        harmonyStrength: 0.7,
        attackSharpness: 0.02,
        frequencyVariation: 0.9,
      },
    },
    soft: {
      press: {
        harmonyStrength: 0.3,
        attackSharpness: 0.2,
        frequencyVariation: 0.9,
      },
      complete: {
        harmonyStrength: 0.2,
        attackSharpness: 0.3,
        frequencyVariation: 0.8,
      },
      error: {
        harmonyStrength: 0.4,
        attackSharpness: 0.15,
        frequencyVariation: 0.7,
      },
    },
    typewriter: {
      press: {
        harmonyStrength: 0.5,
        attackSharpness: 0.01,
        frequencyVariation: 1.3,
      },
      complete: {
        harmonyStrength: 0.3,
        attackSharpness: 0.05,
        frequencyVariation: 1.4,
      },
      error: {
        harmonyStrength: 0.6,
        attackSharpness: 0.02,
        frequencyVariation: 1.1,
      },
    },
    none: {
      press: {
        harmonyStrength: 0,
        attackSharpness: 0,
        frequencyVariation: 1,
      },
      complete: {
        harmonyStrength: 0,
        attackSharpness: 0,
        frequencyVariation: 1,
      },
      error: {
        harmonyStrength: 0,
        attackSharpness: 0,
        frequencyVariation: 1,
      },
    },
  };

  // Get theme-specific characteristics
  const characteristics = themeCharacteristics[theme][type];

  // Modify frequency based on theme
  const modifiedFrequency = frequency * characteristics.frequencyVariation;

  const attackSamples = 0.05 * sampleRate;
  const decaySamples = 0.1 * sampleRate;
  const totalSamples = length;

  for (let i = 0; i < totalSamples; i++) {
    // Create a more complex waveform with theme-specific harmonics
    const primaryWave = Math.sin(
      (i / sampleRate) * modifiedFrequency * Math.PI * 2
    );
    const secondaryHarmonic =
      characteristics.harmonyStrength *
      Math.sin((i / sampleRate) * (modifiedFrequency * 2) * Math.PI * 2);
    const tertiaryHarmonic =
      characteristics.harmonyStrength *
      0.5 *
      Math.sin((i / sampleRate) * (modifiedFrequency * 3) * Math.PI * 2);

    // Apply attack and decay envelope with theme-specific sharpness
    let envelopeValue = 1;
    if (i < attackSamples) {
      // Attack phase with theme-specific sharpness
      envelopeValue = Math.pow(
        i / attackSamples,
        characteristics.attackSharpness
      );
    } else if (i < attackSamples + decaySamples) {
      // Decay phase
      const decayProgress = (i - attackSamples) / decaySamples;
      envelopeValue = 1 - decayProgress;
    }

    // Combine waveforms and apply envelope
    data[i] =
      envelopeValue * (primaryWave + secondaryHarmonic + tertiaryHarmonic);
  }

  return buffer;
};

/**
 * Generate sound assets for all themes
 */
export const generateSoundAssets = () => {
  console.log("Starting sound asset generation");

  // Define base sound characteristics
  const soundCharacteristics: Record<
    SoundType,
    { frequency: number; duration: number }
  > = {
    keyPress: { frequency: 400, duration: 0.1 },
    wordComplete: { frequency: 600, duration: 0.2 },
    error: { frequency: 200, duration: 0.3 },
  };

  // Clear existing buffers to prevent memory leaks
  soundBuffers.clear();

  // Generate buffers for all themes
  (Object.keys(SOUND_THEMES) as SoundTheme[])
    .filter((theme) => theme !== "none")
    .forEach((theme) => {
      (Object.keys(soundCharacteristics) as SoundType[]).forEach((type) => {
        const { frequency, duration } = soundCharacteristics[type];

        // Create a unique key for each sound
        const bufferKey = `${theme}_${type}`;

        // Generate the tone with theme and type-specific characteristics
        const buffer = generateTone(
          frequency,
          duration,
          theme,
          type === "keyPress"
            ? "press"
            : type === "wordComplete"
            ? "complete"
            : "error"
        );

        // Store the buffer
        soundBuffers.set(bufferKey, buffer);

        console.log(`Generated buffer: ${bufferKey}`);
      });
    });

  console.log("Sound asset generation complete");
  console.log("Generated buffer keys:", Array.from(soundBuffers.keys()));
};

// Generate assets immediately on module import
generateSoundAssets();
