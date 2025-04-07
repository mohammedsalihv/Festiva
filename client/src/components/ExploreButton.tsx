import React from 'react';
import { MdOutlineTravelExplore } from "react-icons/md";

type ExploreButtonProps = {
  content: string;
};

const ExploreButton: React.FC<ExploreButtonProps> = ({ content }) => {
  return (
    <button className="bg-main_color text-white flex items-center gap-2 px-4 py-2 rounded-sm hover:brightness-125 transition">
      <span className="font-medium">{content}</span>
      <MdOutlineTravelExplore className="text-xl" />
    </button>
  );
};

export default ExploreButton;
