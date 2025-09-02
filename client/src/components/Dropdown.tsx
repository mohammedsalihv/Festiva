// SortDropdown.jsx
import { useState } from "react";
import { FaSort } from "react-icons/fa";

type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  options: Option[];
  onSelect: (value: string) => void;
};

const Dropdown = ({ options, onSelect }: DropdownProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    onSelect(value);
    setOpen(false);
  };

  return (
    <div className="relative inline-block bg-white">
      <FaSort
        className="text-base md:text-xl cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <ul className="absolute right-0 mt-2 w-40 border rounded-md bg-white text-sm md:text-base shadow-md z-10">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
