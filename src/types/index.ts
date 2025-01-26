type KeyColor = "vowels" | "consonants" | "target" | "correct" | "incorrect";

interface KeyProps {
  letter: string;
  color: string;
  isTarget: boolean;
}
