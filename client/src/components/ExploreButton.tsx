import React from "react";
import { MdOutlineTravelExplore } from "react-icons/md";
import { twMerge } from "tailwind-merge";

type ExploreButtonProps = {
  content: string;
  className?: string;
  showIcon?: boolean;
};

const ExploreButton: React.FC<ExploreButtonProps> = ({
  content,
  className,
  showIcon,
}) => {
  const baseClass =
    "bg-main_color text-white flex justify-center items-center gap-2 px-4 py-2 rounded-md hover:brightness-125 transition";
  return (
    <button className={twMerge(baseClass, className)}>
      <span className="font-medium">{content}</span>
      {showIcon && <MdOutlineTravelExplore className="text-xl" />}
    </button>
  );
};

export default ExploreButton;
