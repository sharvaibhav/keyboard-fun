import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import { SOUND_THEMES, DEFAULT_VOLUME, DEFAULT_THEME } from "./config";
import { SoundContextValue, SoundTheme, SoundType, SoundConfig } from "./types";
import { soundBuffers } from "@/utils/generateSoundAssets";

const SoundContext = createContext<SoundContextValue | undefined>(undefined);

const audioContext = new AudioContext();

const createAudioElements = (theme: SoundTheme) => {
  if (theme === "none") return null;

  const elements = new Map<SoundType, AudioBuffer>();

  Object.values(SOUND_THEMES[theme]).forEach((type) => {
    const buffer = soundBuffers.get(type);
    if (buffer) {
      elements.set(type as SoundType, buffer);
    }
  });

  return elements;
};

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [config, setConfig] = useState<SoundConfig>({
    theme: DEFAULT_THEME,
    volume: DEFAULT_VOLUME,
    enabled: true,
  });

  const audioElements = useRef<Map<SoundType, AudioBuffer> | null>(
    createAudioElements(config.theme)
  );

  const setVolume = useCallback((volume: number) => {
    setConfig((prev) => ({ ...prev, volume }));
  }, []);

  const setTheme = useCallback((theme: SoundTheme) => {
    setConfig((prev) => ({ ...prev, theme }));
    audioElements.current = createAudioElements(theme);
  }, []);

  const toggleSound = useCallback(() => {
    setConfig((prev) => ({ ...prev, enabled: !prev.enabled }));
  }, []);

  const playSound = useCallback(
    (type: SoundType) => {
      if (!config.enabled || config.theme === "none" || !audioElements.current)
        return;

      const buffer = audioElements.current.get(type);
      if (buffer) {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        const gainNode = audioContext.createGain();
        gainNode.gain.value = config.volume;
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        source.start();
      }
    },
    [config.enabled, config.theme, config.volume]
  );

  const value: SoundContextValue = {
    config,
    setVolume,
    setTheme,
    toggleSound,
    playSound,
  };

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
};
