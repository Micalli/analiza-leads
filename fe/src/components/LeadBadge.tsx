// components/LeadBadge.tsx
import React from "react";

interface LeadBadgeProps {
  score: number;
}

type ClassificationConfig = {
  color: string;
  icon: string;
};

function getClassificationConfig(score: number): ClassificationConfig {
  if (score >= 61) {
    return {
      color: "bg-red-500 text-white",
      icon: "🔥",
    };
  }

  if (score >= 31) {
    return {
      color: "bg-yellow-400 text-black",
      icon: "⚡",
    };
  }

  if (score >= 0) {
    return {
      color: "bg-blue-500 text-white",
      icon: "❄️",
    };
  }

  return {
    color: "bg-gray-500 text-white",
    icon: "❓",
  };
}

export const LeadBadge = ({ score }: LeadBadgeProps) => {
  const { color, icon } = getClassificationConfig(score);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
    >
      <div className="flex items-center space-x-2">
        <span
          className={`flex items-center justify-center w-5 h-5 rounded-full text-sm ${color} text-black`}
        >
          {icon}
        </span>
        <span className={`text-sm ${color}`}>{score}</span>
      </div>
    </span>
  );
};
