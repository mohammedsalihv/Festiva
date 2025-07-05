import React, { useState } from "react";

interface TimeSlotPickerProps {
  timeSlots: string[];
  onSelect: (slot: string) => void;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  timeSlots,
  onSelect,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const handleSelect = (slot: string) => {
    setSelectedSlot(slot);
    onSelect(slot);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2 px-2 py-2">
      {timeSlots.map((slot, i) => (
        <button
          key={i}
          onClick={() => handleSelect(slot)}
          className={`px-5 py-2 rounded text-sm border transition text-center
            ${
              selectedSlot === slot
                ? "bg-main_color text-white border-main_color"
                : "bg-white text-gray-700 hover:bg-main_color_light"
            }
          `}
        >
          {slot}
        </button>
      ))}
    </div>
  );
};

export default TimeSlotPicker;
