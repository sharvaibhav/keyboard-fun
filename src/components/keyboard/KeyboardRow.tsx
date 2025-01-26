import { Key } from "./Key";

interface KeyboardRowProps {
  letters: string[];
  targetLetter: string;
}

export const KeyboardRow = ({ letters, targetLetter }: KeyboardRowProps) => {
  const isVowel = (letter: string) =>
    ["a", "e", "i", "o", "u"].includes(letter);

  return (
    <div className="flex gap-2">
      {letters.map((letter) => (
        <Key
          key={letter}
          letter={letter}
          isTarget={letter === targetLetter}
          isVowel={isVowel(letter)}
        />
      ))}
    </div>
  );
};
