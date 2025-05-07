import { FC, JSX } from "react";
import { Education } from "@/app/careers/careers.type";

const EducationCard: FC<Education> = ({
  label,
  description,
  period,
}): JSX.Element => {
  return (
    <li className="relative flex h-[200px] w-[40%] flex-col rounded-2xl border bg-yellowLight p-8 dark:border-foreground  dark:bg-greyLight dark:text-grey">
      <div className="mb-4 flex flex-col">
        <h3 className="text-lg font-bold">{label}</h3>
        <p className="text-xs">
          {period[0]} ~ {period[1]}
        </p>
      </div>
      <p className="text-sm">{description}</p>

      <svg
        className="absolute right-4 top-4 h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 10L12 4 2 10l10 6 10-6z" />
        <path d="M6 12v6a6 3 0 0012 0v-6" />
      </svg>
    </li>
  );
};

export default EducationCard;
