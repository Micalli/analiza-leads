// components/LeadBadge.tsx
import React from "react";

type LeadClassification = "hot lead" | "warm lead" | "cold lead" | string;

interface LeadBadgeProps {
  classification: LeadClassification;
}

const CLASSIFICATION_CONFIG: Record<
  string,
  { color: string; text: string; icon: string }
> = {
  "Hot Lead": {
    color: "bg-red-500 text-white",
    text: "Lead Quente",
    icon: "🔥",
  },
  "Warm Lead": {
    color: "bg-yellow-400 text-black",
    text: "Lead Aquecido",
    icon: "⚡",
  },
  "Cold Lead": {
    color: "bg-blue-500 text-white",
    text: "Lead Frio",
    icon: "❄️",
  },
  default: {
    color: "bg-gray-500 text-white",
    text: "Não Classificado",
    icon: "❓",
  },
};

export const LeadBadge: React.FC<LeadBadgeProps> = ({ classification }) => {
  const { color, text, icon } =
    CLASSIFICATION_CONFIG[classification] || CLASSIFICATION_CONFIG.default;

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
        <span className={`text-sm ${color}`}>{text}</span>
      </div>
    </span>
  );
};
