"use client";

import { FC, JSX, useState } from "react";
import { Career } from "@/app/careers/careers.type";

const CareerCard: FC<Career> = ({
  label,
  mainRole,
  period,
  description,
}): JSX.Element => {
  const [isBack, setIsBack] = useState(false);

  const handleOnClickCareerCard = (): void => {
    setIsBack((prev) => !prev);
  };

  return (
    <li
      className="w-[52%] cursor-pointer [perspective:1000px]"
      onClick={handleOnClickCareerCard}
    >
      <div
        className="relative h-[180px] rounded-sm border border-greyDark bg-white text-foreground transition-transform duration-700 [transform-style:preserve-3d] hover:scale-110 dark:border-greyLight dark:bg-grey"
        style={{
          transform: isBack ? "rotateX(180deg)" : "rotateX(0deg)",
          transitionTimingFunction: "ease-in-out",
        }}
      >
        {/* 앞면 */}
        <div className="absolute inset-0 flex flex-col justify-center rounded-sm p-8 will-change-transform [backface-visibility:hidden]">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">{label}</h3>
            <span>|</span>
            <div className="flex gap-2 text-xs font-bold">
              <p>{mainRole}</p>
            </div>
          </div>
          <p className="mb-4 mt-2 text-xs">
            {period[0]} ~ {period[1]}
          </p>
          <p className="text-sm">{description}</p>
        </div>

        {/* 뒷면 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-sm p-8 text-center will-change-transform [backface-visibility:hidden] [transform:rotateX(180deg)]">
          <h3 className="mb-2 text-lg font-bold">추가 설명 Title</h3>
          <p className="text-sm">추가 설명 Contents</p>
        </div>
      </div>
    </li>
  );
};

export default CareerCard;
