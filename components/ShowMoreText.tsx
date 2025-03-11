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

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded ? text : text.substring(0, maxLength ?? 200);

  return (
    <div className={className}>
      <p>{displayText}</p>
      {text.length < maxLength ||
        (isExpanded && (
          <div
            onClick={toggleText}
            className="cursor-pointer font-semibold underline"
          >
            {isExpanded ? "Show Less" : "Show More"}
          </div>
        ))}
    </div>
  );
};

export default ShowMoreText;
