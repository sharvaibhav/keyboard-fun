import React from "react";

interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: number;
  className?: string;
  animationDuration?: number;
  backgroundColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = "bg-green-500",
  height = 8,
  className = "",
  animationDuration = 300,
  backgroundColor = "bg-gray-200",
}) => {
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div
      className={`w-full rounded-full ${backgroundColor} ${className}`}
      style={{ height: `${height}px` }}
    >
      <div
        className={`h-full rounded-full ${color} transition-all`}
        style={{
          width: `${normalizedProgress}%`,
          transitionDuration: `${animationDuration}ms`,
        }}
      />
    </div>
  );
};

export default ProgressBar;
