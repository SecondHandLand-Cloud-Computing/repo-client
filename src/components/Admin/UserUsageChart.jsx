import React from "react";

export default function UserUsageChart({ percent, totalUser }) {
  const size = 180;
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);

  return (
    <div className="bg-white p-6 rounded-xl flex items-center gap-8">
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#grad)"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="grad">
            <stop offset="0%" stopColor="#8af0aeff" />
            <stop offset="100%" stopColor="#3ebc94ff" />
          </linearGradient>
        </defs>
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="text-xl font-bold"
        >
          {percent}%
        </text>
      </svg>

      <div>
        <p className="text-gray-500">Trên tổng số</p>
        <p className="text-xl font-bold">{totalUser} Người dùng</p>
        <p className="text-sm text-gray-400">Đánh giá tích cực</p>
      </div>
    </div>
  );
}
