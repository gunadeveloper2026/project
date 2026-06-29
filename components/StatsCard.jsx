"use client";

import {
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export default function StatsCard({
  title,
  value,
  icon,
  change,
  trend = "up",
  color = "blue",
}) {
  const colorStyles = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-200",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-200",
    },
    red: {
      bg: "bg-red-50",
      text: "text-red-600",
      border: "border-red-200",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-200",
    },
  };

  const styles = colorStyles[color] || colorStyles.blue;

  return (
    <div
      className={`bg-white rounded-xl border ${styles.border} p-6 shadow hover:shadow-lg transition`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500">{title}</p>
          <h2 className="text-3xl text-gray-500 font-bold mt-2">
            {value}
          </h2>
        </div>

        {icon && (
          <div
            className={`${styles.bg} ${styles.text} p-3 rounded-lg`}
          >
            {icon}
          </div>
        )}
      </div>

      {change && (
        <div className="flex items-center gap-2 mt-4">
          {trend === "up" ? (
            <TrendingUp
              size={16}
              className="text-green-500"
            />
          ) : (
            <TrendingDown
              size={16}
              className="text-red-500"
            />
          )}

          <span>{change}</span>
        </div>
      )}
    </div>
  );
}