import type { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Drawer = ({ isOpen, onClose, title, children }: DrawerProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-20 lg:top-24 right-0 h-[calc(100vh-5rem)] lg:w-[95%] w-full bg-white shadow-xl z-50 animate-slide-in transition-transform duration-300 rounded-md flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold">{title}</h3>
        <IoMdClose className="text-2xl cursor-pointer" onClick={onClose} />
      </div>
      <div className="flex-1 overflow-y-auto p-4">{children}</div>
    </div>
  );
};


export default Drawer;
