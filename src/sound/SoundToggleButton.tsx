import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSound } from "./SoundContext";

export const SoundToggleButton = () => {
  const { config, toggleSound } = useSound();

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleSound}
        className="relative group"
      >
        {config.enabled ? (
          <Volume2 className="h-5 w-5 transition-transform group-hover:scale-110" />
        ) : (
          <>
            <VolumeX className="h-5 w-5 text-red-500 transition-transform group-hover:scale-110" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
          </>
        )}
      </Button>
      {!config.enabled && (
        <span className="text-sm text-muted-foreground">Sound Muted</span>
      )}
    </div>
  );
};
