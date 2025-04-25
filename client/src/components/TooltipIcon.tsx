import React from "react";

interface TooltipIconProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
}

const TooltipIcon: React.FC<TooltipIconProps> = ({ icon, label, className = "" }) => {
  return (
    <div className="relative group">
      <div
        className={`p-2 rounded-full bg-gray-200 hover:bg-red-500 ${className}`}
      >
        {icon}
      </div>
      <div className="border border-gray-300 absolute top-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block text-black text-xs rounded px-2 py-1 z-10 whitespace-nowrap mt-4 font-semibold">
        {label}
      </div>
    </div>
  );
};

export default TooltipIcon;
