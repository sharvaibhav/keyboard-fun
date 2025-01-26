// src/components/display/WordList.tsx
import React from "react";
import { X, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "../ui/button";

interface WordListProps {
  words: string[];
  currentWordIndex: number;
  onRemoveWord: (index: number) => void;
  onMoveWord: (fromIndex: number, direction: "up" | "down") => void;
}

export const WordList: React.FC<WordListProps> = ({
  words,
  currentWordIndex,
  onRemoveWord,
  onMoveWord,
}) => {
  return (
    <div className="bg-white border-t">
      <div className="max-w-4xl mx-auto overflow-x-auto">
        <div className="flex gap-2 p-4">
          {words.map((word, index) => (
            <div
              key={word + index}
              className={`
                px-4 py-2 rounded-lg flex items-center gap-2
                ${
                  index === currentWordIndex
                    ? "bg-blue-100 font-bold"
                    : "bg-gray-100"
                }
                transition-colors duration-200
                min-w-fit whitespace-nowrap
                group
              `}
            >
              <span>{word}</span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {index !== 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => onMoveWord(index, "up")}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                )}
                {index !== words.length - 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => onMoveWord(index, "down")}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-red-500 hover:text-red-700"
                  onClick={() => onRemoveWord(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordList;
