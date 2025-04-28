import { FC, JSX } from "react";
import { Career } from "@/app/careers/careers.type";

const CareerCard: FC<Career> = ({
  label,
  mainRole,
  period,
  description,
}): JSX.Element => {
  return (
    <li
      key={label}
      className="w-3/5 rounded-sm border border-greyDark bg-white px-10 py-8 dark:border-greyLight dark:bg-grey"
    >
      <div className="flex items-center gap-2">
        <h3 className="text-xl font-bold">{label}</h3>
        <span>|</span>
        <div className="flex gap-2 text-xs font-bold">
          <p>{mainRole}</p>
          {/*{!!subRole && (*/}
          {/*  <>*/}
          {/*    <span>|</span>*/}
          {/*    <p>{subRole}</p>*/}
          {/*  </>*/}
          {/*)}*/}
        </div>
      </div>

      <p className="mb-4 text-xs">
        {period[0]} ~ {period[1]}
      </p>
      <p className="text-sm">{description}</p>
    </li>
  );
};

export default CareerCard;
