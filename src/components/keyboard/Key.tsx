interface KeyProps {
  letter: string;
  isTarget: boolean;
  isVowel: boolean;
}

export const Key = ({ letter, isTarget, isVowel }: KeyProps) => {
  const getKeyColor = () => {
    if (isTarget) return "bg-yellow-300";
    return isVowel ? "bg-blue-200" : "bg-green-200";
  };

  return (
    <div
      className={`
        w-16 h-16 flex items-center justify-center
        rounded-xl text-2xl font-bold
        ${getKeyColor()}
        ${isTarget ? "scale-110 shadow-lg" : ""}
        transition-all duration-200
      `}
    >
      {letter}
    </div>
  );
};
