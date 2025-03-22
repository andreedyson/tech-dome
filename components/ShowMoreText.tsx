"use client";

import { useState } from "react";

type ShowMoreTextProps = {
  text: string;
  className?: string;
  maxLength?: number;
};

const ShowMoreText = ({
  text,
  className,
  maxLength = 200,
}: ShowMoreTextProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleText = () => setIsExpanded((prev) => !prev);

  const displayText = isExpanded
    ? text
    : text.slice(0, maxLength) + (text.length > maxLength ? "..." : "");

  return (
    <div className={className}>
      <p className="inline">
        {displayText}{" "}
        {text.length > maxLength && (
          <span
            onClick={toggleText}
            className="cursor-pointer font-semibold text-blue-500 hover:underline"
          >
            {isExpanded ? "Show Less" : "Show More"}
          </span>
        )}
      </p>
    </div>
  );
};

export default ShowMoreText;
