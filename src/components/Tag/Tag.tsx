import { FC, JSX } from "react";

interface TagProps {
  label: string;
  active?: boolean;
  bg?: string;
  onClick?: () => void;
}

const Tag: FC<TagProps> = ({
  label,
  bg,
  active = false,
  onClick,
}): JSX.Element => {
  return (
    <div
      className={`rounded-[100px] px-3 py-1 text-sm font-medium ${active ? "bg-primaryActive text-greyLight dark:bg-grey dark:text-foreground" : "cursor-pointer"} ${bg}`}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default Tag;
