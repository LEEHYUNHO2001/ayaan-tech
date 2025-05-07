import { FC, JSX } from "react";

interface FlipHintArrowProps {
  className: string;
}

const FlipHintArrow: FC<FlipHintArrowProps> = ({ className }): JSX.Element => {
  return (
    <div className={`${className}`}>
      <span className="font-bold">🔄 명함 클릭!</span>
      <svg
        className="absolute left-2 top-6 h-6 w-6 text-gray-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 7 C13 14, 8 18, 4 20" />
        <path d="M4 20 L4 14" />
        <path d="M4 20 L10 20" />
      </svg>
    </div>
  );
};

export default FlipHintArrow;
