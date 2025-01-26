// src/utils/generateSoundAssets.ts

import { SOUND_THEMES } from "@/sound/config";
import { SoundType, SoundTheme } from "@/sound/types";

// Ensure a single audio context for the entire application
const audioContext = new AudioContext();

// Map to store generated sound buffers
export const soundBuffers = new Map<string, AudioBuffer>();

/**
 * Generate a tone with specific frequency and duration
 * @param frequency Frequency of the tone in Hz
 * @param duration Duration of the tone in seconds
 * @param type Optional type of sound (for more complex generation)
 * @returns AudioBuffer with generated sound
 */
const generateTone = (
  frequency: number,
  duration: number,
  type?: "press" | "complete" | "error"
): AudioBuffer => {
  const sampleRate = audioContext.sampleRate;
  const length = duration * sampleRate;
  const buffer = audioContext.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  // Different envelope and harmonics based on sound type
  const envelopeTypes = {
    press: { attack: 0.01, decay: 0.09, sustain: 0.5 },
    complete: { attack: 0.05, decay: 0.15, sustain: 0.7 },
    error: { attack: 0.01, decay: 0.2, sustain: 0.1 },
  };

  const envelope = type
    ? envelopeTypes[type]
    : { attack: 0.01, decay: 0.1, sustain: 0.5 };
  const attackSamples = envelope.attack * sampleRate;
  const decaySamples = envelope.decay * sampleRate;
  const totalSamples = length;

  for (let i = 0; i < totalSamples; i++) {
    // Create a more complex waveform with multiple harmonics
    const primaryWave = Math.sin((i / sampleRate) * frequency * Math.PI * 2);
    const secondaryHarmonic =
      0.5 * Math.sin((i / sampleRate) * (frequency * 2) * Math.PI * 2);
    const tertiaryHarmonic =
      0.25 * Math.sin((i / sampleRate) * (frequency * 3) * Math.PI * 2);

    // Apply ADSR envelope
    let envelopeValue = 1;
    if (i < attackSamples) {
      // Attack phase
      envelopeValue = i / attackSamples;
    } else if (i < attackSamples + decaySamples) {
      // Decay phase
      envelopeValue =
        1 - (1 - envelope.sustain) * ((i - attackSamples) / decaySamples);
    } else {
      // Sustain phase
      envelopeValue = envelope.sustain;
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

  // Define sound characteristics for different types
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

        // Generate the tone with type-specific characteristics
        const buffer = generateTone(
          frequency,
          duration,
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

// Optional: Generate assets immediately on module import
generateSoundAssets();
