// src/utils/generateSoundAssets.ts

import { SOUND_THEMES } from "@/sound/config";

const audioContext = new AudioContext();
export const soundBuffers = new Map<string, AudioBuffer>();

const generateTone = async (frequency: number, duration: number) => {
  const length = duration * audioContext.sampleRate;
  const buffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i++) {
    data[i] = Math.sin((i / audioContext.sampleRate) * frequency * Math.PI * 2);
  }

  return buffer;
};

export const generateSoundAssets = async () => {
  const promises: Promise<void>[] = [];

  Object.values(SOUND_THEMES).forEach((theme) => {
    Object.values(theme).forEach(async (type) => {
      let buffer: AudioBuffer = audioContext.createBuffer(
        1,
        1,
        audioContext.sampleRate
      );

      switch (type) {
        case "mechanical_press":
        case "soft_press":
        case "typewriter_press":
          buffer = await generateTone(400, 0.1);
          break;
        case "mechanical_complete":
        case "soft_complete":
        case "typewriter_complete":
          buffer = await generateTone(600, 0.2);
          break;
        case "mechanical_error":
        case "soft_error":
        case "typewriter_error":
          buffer = await generateTone(200, 0.3);
          break;
      }

      soundBuffers.set(type, buffer);
    });
  });

  await Promise.all(promises);
};
