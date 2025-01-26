import React from "react";
import { Volume2, VolumeX, Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useSound } from "./SoundContext";
import { SoundTheme } from "./types";

const THEME_LABELS: Record<SoundTheme, string> = {
  mechanical: "Mechanical Keyboard",
  soft: "Soft Touch",
  typewriter: "Typewriter",
  none: "No Sound",
};

export const SoundSettingsModal = () => {
  const { config, setVolume, setTheme, toggleSound, playSound } = useSound();

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const handleThemeSelect = (newTheme: SoundTheme) => {
    setTheme(newTheme);
    if (newTheme !== "none" && config.enabled) {
      playSound("keyPress");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Settings className="h-5 w-5" />
          {!config.enabled && (
            <div className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              {config.enabled && config.volume > 0 ? (
                <Volume2 className="w-5 h-5" />
              ) : (
                <VolumeX className="w-5 h-5" />
              )}
              Sound Settings
            </span>
            <Switch
              checked={config.enabled}
              onCheckedChange={toggleSound}
              aria-label="Toggle sound"
            />
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Volume</label>
            <div className="flex items-center gap-4">
              <VolumeX className="w-4 h-4 text-gray-500" />
              <Slider
                value={[config.volume]}
                onValueChange={handleVolumeChange}
                max={1}
                step={0.1}
                className="flex-1"
                disabled={!config.enabled}
              />
              <Volume2 className="w-4 h-4 text-gray-500" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Sound Theme</label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(THEME_LABELS) as SoundTheme[]).map((soundTheme) => (
                <Button
                  key={soundTheme}
                  variant={config.theme === soundTheme ? "default" : "outline"}
                  onClick={() => handleThemeSelect(soundTheme)}
                  className="w-full"
                  disabled={!config.enabled && soundTheme !== "none"}
                >
                  {THEME_LABELS[soundTheme]}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SoundSettingsModal;
