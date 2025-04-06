interface TagProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function Tag({ label, active = false, onClick }: TagProps) {
  return (
    <div
      className={`rounded-[100px] px-3 py-1 text-sm font-medium ${active ? "bg-grey" : "cursor-pointer"}`}
      onClick={onClick}
    >
      {label}
    </div>
  );
}
