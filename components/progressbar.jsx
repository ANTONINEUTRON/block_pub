import { useState, useEffect } from "react";

const ProgressBar = ({ progress }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const progressOffset = (100 - progress) / 100 * 2 * Math.PI;
    setOffset(progressOffset);
  }, [progress]);

  return (
    <svg className="w-12 h-12" viewBox="0 0 36 36">
      <circle
        className="fill-transparent stroke-current text-indigo-500"
        strokeWidth="3"
        r="16"
        cx="18"
        cy="18"
      />
      <circle
        className="fill-transparent stroke-current text-indigo-200"
        strokeWidth="3"
        r="16"
        cx="18"
        cy="18"
        strokeDasharray={`${offset} ${2 * Math.PI * 16}`}
        transform="rotate(-90) translate(-36)"
      />
      <text
        className="text-center text-lg font-semibold text-indigo-500"
        x="50%"
        y="50%"
        dy=".3em"
      >
        {progress}%
      </text>
    </svg>
  );
};

export default ProgressBar;
