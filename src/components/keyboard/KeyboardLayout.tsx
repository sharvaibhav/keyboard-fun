import React from "react";
import { KeyboardRow } from "./KeyboardRow";

interface KeyboardLayoutProps {
  targetLetter: string;
}

export const KeyboardLayout: React.FC<KeyboardLayoutProps> = ({
  targetLetter,
}) => {
  const keyboardLayout = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  return (
    <div className="flex flex-col items-center gap-2 mt-8">
      {keyboardLayout.map((row, rowIndex) => (
        <KeyboardRow key={rowIndex} letters={row} targetLetter={targetLetter} />
      ))}
    </div>
  );
};

export default KeyboardLayout;
