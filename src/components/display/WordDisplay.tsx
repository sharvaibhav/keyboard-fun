interface WordDisplayProps {
  word: string;
  currentIndex: number;
}

export const WordDisplay = ({ word, currentIndex }: WordDisplayProps) => (
  <div className="text-center mb-12">
    <div className="text-5xl font-bold mb-6">
      {word.split("").map((char, index) => (
        <span
          key={index}
          className={`mx-1 ${
            index === currentIndex
              ? "text-blue-600 text-6xl"
              : index < currentIndex
              ? "text-green-500"
              : "text-gray-400"
          }`}
        >
          {char}
        </span>
      ))}
    </div>
    <div className="text-2xl text-gray-600">
      Type the letter:{" "}
      <span className="font-bold text-blue-600">{word[currentIndex]}</span>
    </div>
  </div>
);
