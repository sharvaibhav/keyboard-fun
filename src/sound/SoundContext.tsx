import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { SOUND_THEMES, DEFAULT_VOLUME, DEFAULT_THEME } from "./config";
import { SoundContextValue, SoundTheme, SoundType, SoundConfig } from "./types";
import { soundBuffers } from "@/utils/generateSoundAssets";

const SoundContext = createContext<SoundContextValue | undefined>(undefined);

const audioContext = new AudioContext();

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [config, setConfig] = useState<SoundConfig>({
    theme: DEFAULT_THEME,
    volume: DEFAULT_VOLUME,
    enabled: true,
  });

  // Log any config changes
  useEffect(() => {
    console.log("Sound Configuration Updated:", config);
  }, [config]);

  const setVolume = useCallback((volume: number) => {
    console.log("Setting volume:", volume);
    setConfig((prev) => ({ ...prev, volume }));
  }, []);

  const setTheme = useCallback((theme: SoundTheme) => {
    console.log("Setting theme:", theme);
    setConfig((prev) => ({ ...prev, theme }));
  }, []);

  const toggleSound = useCallback(() => {
    console.log("Toggling sound");
    setConfig((prev) => ({ ...prev, enabled: !prev.enabled }));
  }, []);

  const playSound = useCallback(
    (type: SoundType) => {
      // Only play if sound is enabled and not in 'none' theme
      if (!config.enabled || config.theme === "none") {
        console.log("Sound not played:", {
          enabled: config.enabled,
          theme: config.theme,
        });
        return;
      }

      // Construct the buffer key based on current theme
      const bufferKey = `${config.theme}_${type}`;
      const buffer = soundBuffers.get(bufferKey);

      if (buffer) {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;

        const gainNode = audioContext.createGain();
        gainNode.gain.value = config.volume;

        source.connect(gainNode);
        gainNode.connect(audioContext.destination);

        source.start();

        console.log("Sound played:", {
          bufferKey,
          volume: config.volume,
        });
      } else {
        console.warn(`No buffer found for key: ${bufferKey}`);
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
    console.warn("useSound called outside of SoundProvider");
    return {
      config: {
        theme: "none",
        volume: 0.5,
        enabled: false,
      },
      setVolume: () => {},
      setTheme: () => {},
      toggleSound: () => {},
      playSound: () => {},
    };
  }
  return context;
};
