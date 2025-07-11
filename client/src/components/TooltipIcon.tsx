import React, { ReactElement } from "react";

interface TooltipIconProps {
  icon: ReactElement<any>;
  label: string;
  className?: string;
}

const TooltipIcon: React.FC<TooltipIconProps> = ({ icon, label, className = "" }) => {
  return (
    <div className="relative group cursor-pointer">
      {React.cloneElement(icon, {
        ...icon.props,
        className: `${icon.props.className ?? ""} p-2 rounded-full hover:bg-red-500 ${className}`,
      })}
      <div className="border border-black absolute top-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block text-black text-xs rounded px-2 py-1 z-10 whitespace-nowrap mt-4 font-semibold bg-white">
        {label}
      </div>
    </div>
  );
};

export default TooltipIcon;
