import React, { useState, useCallback, useEffect } from "react";
import { Card } from "../ui/card";
import { WordInput } from "../input/WordInput";
import { WordDisplay } from "../display/WordDisplay";
import { KeyboardLayout } from "./KeyboardLayout";
import { WordList } from "../display/WordList";
import { ProgressBar } from "../display/ProgressBar";
import { useSound } from "@/sound/SoundContext";

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

  // Destructure sound utilities
  const { playSound, config } = useSound();

  // Get current word and calculate progress
  const currentWord = wordList[currentWordIndex];
  const progress = (currentLetterIndex / currentWord.length) * 100;

  // Handle correct key press
  const handleCorrectKey = useCallback(() => {
    // Play keyPress sound if enabled
    if (config.enabled && config.theme !== "none") {
      playSound("keyPress");
    }

    // Move to next letter or next word
    if (currentLetterIndex < currentWord.length - 1) {
      setCurrentLetterIndex((prev) => prev + 1);
    } else {
      // Slight delay before moving to next word
      setTimeout(() => {
        // Play word complete sound if enabled
        if (config.enabled && config.theme !== "none") {
          playSound("wordComplete");
        }

        // Move to next word or cycle back to first
        if (currentWordIndex < wordList.length - 1) {
          setCurrentWordIndex((prev) => prev + 1);
        } else {
          setCurrentWordIndex(0);
        }

        // Reset letter index
        setCurrentLetterIndex(0);
      }, 200);
    }
  }, [
    currentLetterIndex,
    currentWord.length,
    currentWordIndex,
    wordList.length,
    playSound,
    config,
  ]);

  // Handle key press events
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Check if pressed key matches current letter
      if (
        e.key.toLowerCase() === currentWord[currentLetterIndex].toLowerCase()
      ) {
        handleCorrectKey();
      } else {
        // Play error sound if enabled
        if (config.enabled && config.theme !== "none") {
          playSound("error");
        }
      }
    };

    // Add and remove event listener
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentWord, currentLetterIndex, handleCorrectKey, playSound, config]);

  // Add new word to word list
  const handleAddWord = () => {
    if (newWord.trim()) {
      setWordList((prev) => [...prev, newWord.trim().toLowerCase()]);
      setNewWord("");
    }
  };

  // Remove a word from the list
  const handleRemoveWord = (index: number) => {
    // Prevent removing last word
    if (wordList.length <= 1) return;

    // Filter out the word
    setWordList((prev) => prev.filter((_, i) => i !== index));

    // Adjust current word index if needed
    if (index <= currentWordIndex) {
      setCurrentWordIndex((prev) => {
        if (prev === 0) return 0;
        if (index === prev) return prev - 1;
        return prev;
      });
    }

    // Reset letter index
    setCurrentLetterIndex(0);
  };

  // Move word up or down in the list
  const handleMoveWord = (fromIndex: number, direction: "up" | "down") => {
    const toIndex = direction === "up" ? fromIndex - 1 : fromIndex + 1;

    // Prevent moving out of list bounds
    if (toIndex < 0 || toIndex >= wordList.length) return;

    // Create a new list with moved word
    setWordList((prev) => {
      const newList = [...prev];
      const [movedItem] = newList.splice(fromIndex, 1);
      newList.splice(toIndex, 0, movedItem);
      return newList;
    });

    // Adjust current word index based on move
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
      {/* Word Input Section */}
      <div className="flex-none">
        <WordInput
          value={newWord}
          onChange={setNewWord}
          onAdd={handleAddWord}
        />
      </div>

      {/* Main Keyboard Learning Area */}
      <div className="overflow-auto bg-gray-50">
        <div className="h-full flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl p-8">
            {/* Current Word Display */}
            <WordDisplay word={currentWord} currentIndex={currentLetterIndex} />

            {/* Keyboard Layout */}
            <KeyboardLayout targetLetter={currentWord[currentLetterIndex]} />

            {/* Progress Bar */}
            <ProgressBar progress={progress} />
          </Card>
        </div>
      </div>

      {/* Word List Section */}
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
