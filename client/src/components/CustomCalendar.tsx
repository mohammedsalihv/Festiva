import React, { useState } from "react";

interface CustomCalendarProps {
  availableDates: string[]; // format: 'YYYY-MM-DD'
  onSelect: (dates: Date[]) => void;
  allowMultiple?: boolean; // if false → single day mode
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  availableDates,
  onSelect,
  allowMultiple = false,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const firstDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const isPastDate = (year: number, month: number, day: number) => {
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateAvailable = (year: number, month: number, day: number) => {
    const d = new Date(year, month, day);
    const iso = d.toISOString().split("T")[0];
    return availableDates.includes(iso);
  };

  const areDatesConsecutive = (dates: Date[]) => {
    if (dates.length <= 1) return true;
    const sorted = [...dates].sort((a, b) => a.getTime() - b.getTime());
    for (let i = 1; i < sorted.length; i++) {
      const diff = (sorted[i].getTime() - sorted[i - 1].getTime()) / (1000 * 60 * 60 * 24);
      if (diff !== 1) return false;
    }
    return true;
  };

  const handleSelect = (date: Date) => {
    if (!allowMultiple) {
      setSelectedDates([date]);
      onSelect([date]);
      return;
    }

    let newSelection: Date[];

    if (selectedDates.some(d => d.getTime() === date.getTime())) {
      // Remove if already selected
      newSelection = selectedDates.filter(d => d.getTime() !== date.getTime());
    } else {
      newSelection = [...selectedDates, date];
    }

    if (areDatesConsecutive(newSelection)) {
      setSelectedDates(newSelection);
      onSelect(newSelection);
    } else {
      // Reset to only the newly clicked date if breaking consecutiveness
      setSelectedDates([date]);
      onSelect([date]);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full max-w-xs bg-white border rounded-lg shadow p-4 text-sm">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="text-gray-500 hover:text-black"
        >
          &#8592;
        </button>
        <div className="font-semibold">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </div>
        <button
          onClick={handleNextMonth}
          className="text-gray-500 hover:text-black"
        >
          &#8594;
        </button>
      </div>

      <div className="grid grid-cols-7 text-center font-medium text-gray-600 mb-1">
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center gap-1">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth();
          const date = new Date(year, month, day);

          const isAvailable = isDateAvailable(year, month, day);
          const isPast = isPastDate(year, month, day);
          const isSelected = selectedDates.some(
            d =>
              d.getDate() === day &&
              d.getMonth() === month &&
              d.getFullYear() === year
          );

          const isClickable = isAvailable && !isPast;

          return (
            <button
              key={day}
              onClick={() => isClickable && handleSelect(date)}
              disabled={!isClickable}
              className={`w-8 h-8 rounded-full transition 
                ${isSelected ? "bg-main_color text-white" : ""}
                ${
                  isClickable
                    ? "hover:bg-main_color_light text-gray-700"
                    : "text-gray-400 cursor-not-allowed opacity-40"
                }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {selectedDates.length > 0 && (
        <div className="mt-3 text-center text-sm text-gray-600">
          Selected:{" "}
          <span className="font-semibold text-main_color">
            {selectedDates.map(d => d.toDateString()).join(", ")}
          </span>
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
