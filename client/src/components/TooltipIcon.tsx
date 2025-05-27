import React, { ReactElement } from "react";

interface TooltipIconProps {
  icon: ReactElement<any>; // Explicit to allow `onClick`, `className`, etc.
  label: string;
  className?: string;
}

const TooltipIcon: React.FC<TooltipIconProps> = ({ icon, label, className = "" }) => {
  return (
    <div className="relative group cursor-pointer">
      {React.cloneElement(icon, {
        ...icon.props,
        className: `${icon.props.className ?? ""} p-2 rounded-full border border-gray-300 hover:bg-red-500 ${className}`,
      })}
      <div className="border border-gray-300 absolute top-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block text-black text-xs rounded px-2 py-1 z-10 whitespace-nowrap mt-4 font-semibold bg-white">
        {label}
      </div>
    </div>
  );
};

export default TooltipIcon;
