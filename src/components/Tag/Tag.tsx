import { FC, JSX } from "react";

interface TagProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const Tag: FC<TagProps> = ({ label, active = false, onClick }): JSX.Element => {
  return (
    <div
      className={`rounded-[100px] px-3 py-1 text-sm font-medium ${active ? "bg-grey" : "cursor-pointer"}`}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default Tag;
