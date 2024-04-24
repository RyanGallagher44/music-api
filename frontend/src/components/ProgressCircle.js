import React from "react";

const ProgressCircle = ({ timeElapsed, maxSeconds }) => {
  const progress = (timeElapsed / 30) * 100; // Assuming 60 seconds for complete circle

  return (
    <div className="w-24 h-24 relative">
      <svg className="absolute inset-0" viewBox="0 0 24 24">
        <circle
          className="text-transparent stroke-current"
          strokeWidth="2"
          fill="none"
          cx="12"
          cy="12"
          r="10"
        />
        <circle
          className="text-spotify-green stroke-current"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          cx="12"
          cy="12"
          r="10"
          style={{
            strokeDasharray: "64",
            strokeDashoffset: `calc(64 - (64 * ${progress}) / 100)`,
            transition: "stroke-dashoffset 1s ease-out",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold">
          {Math.floor(timeElapsed)}/{maxSeconds}
        </span>
      </div>
    </div>
  );
};

export default ProgressCircle;
