// src/components/keyboard/KeyboardLearning.tsx
import React, { useState, useCallback } from "react";
import { Card } from "../ui/card";
import { WordInput } from "../input/WordInput";
import { WordDisplay } from "../display/WordDisplay";
import { KeyboardLayout } from "./KeyboardLayout";
import { WordList } from "../display/WordList";
import { ProgressBar } from "../display/ProgressBar";
import { useKeyPress } from "../../hooks/useKeyPress";

interface KeyboardLearningProps {
  initialWords?: string[];
}

const KeyboardLearning = ({
  initialWords = ["hello", "world", "type"],
}: KeyboardLearningProps) => {
  const [wordList, setWordList] = useState<string[]>(initialWords);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [newWord, setNewWord] = useState("");

  const currentWord = wordList[currentWordIndex];
  const progress = (currentLetterIndex / currentWord.length) * 100;

  const handleCorrectKey = useCallback(() => {
    if (currentLetterIndex < currentWord.length - 1) {
      setCurrentLetterIndex((prev) => prev + 1);
    } else {
      setTimeout(() => {
        if (currentWordIndex < wordList.length - 1) {
          setCurrentWordIndex((prev) => prev + 1);
        } else {
          setCurrentWordIndex(0);
        }
        setCurrentLetterIndex(0);
      }, 1000);
    }
  }, [
    currentLetterIndex,
    currentWord.length,
    currentWordIndex,
    wordList.length,
  ]);

  useKeyPress(currentWord[currentLetterIndex], handleCorrectKey);

  const handleAddWord = () => {
    if (newWord.trim()) {
      setWordList((prev) => [...prev, newWord.trim().toLowerCase()]);
      setNewWord("");
    }
  };

  const handleRemoveWord = (index: number) => {
    if (wordList.length <= 1) return;

    setWordList((prev) => prev.filter((_, i) => i !== index));

    if (index <= currentWordIndex) {
      setCurrentWordIndex((prev) => {
        if (prev === 0) return 0;
        if (index === prev) return prev - 1;
        return prev;
      });
    }
    setCurrentLetterIndex(0);
  };

  const handleMoveWord = (fromIndex: number, direction: "up" | "down") => {
    const toIndex = direction === "up" ? fromIndex - 1 : fromIndex + 1;

    if (toIndex < 0 || toIndex >= wordList.length) return;

    setWordList((prev) => {
      const newList = [...prev];
      const [movedItem] = newList.splice(fromIndex, 1);
      newList.splice(toIndex, 0, movedItem);
      return newList;
    });

    if (fromIndex === currentWordIndex) {
      setCurrentWordIndex(toIndex);
    } else if (
      (fromIndex < currentWordIndex && toIndex >= currentWordIndex) ||
      (fromIndex > currentWordIndex && toIndex <= currentWordIndex)
    ) {
      setCurrentWordIndex((prev) => (direction === "up" ? prev + 1 : prev - 1));
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-none">
        <WordInput
          value={newWord}
          onChange={setNewWord}
          onAdd={handleAddWord}
        />
      </div>

      <div className=" overflow-auto bg-gray-50">
        <div className="h-full flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl p-8">
            <WordDisplay word={currentWord} currentIndex={currentLetterIndex} />

            <KeyboardLayout targetLetter={currentWord[currentLetterIndex]} />

            <ProgressBar progress={progress} />
          </Card>
        </div>
      </div>

      <div className="flex-none">
        <WordList
          words={wordList}
          currentWordIndex={currentWordIndex}
          onRemoveWord={handleRemoveWord}
          onMoveWord={handleMoveWord}
        />
      </div>
    </div>
  );
};

export default KeyboardLearning;
