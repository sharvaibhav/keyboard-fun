import { useEffect, useState } from "react";

export const useKeyPress = (targetKey: string, onCorrectKey: () => void) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === targetKey.toLowerCase()) {
        onCorrectKey();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [targetKey, onCorrectKey]);
};
