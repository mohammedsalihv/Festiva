import React, { useState } from "react";
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
  addMonths,
} from "date-fns";
import clsx from "clsx";

interface CalendarProps {
  selectedDates: Date[];
  onChange: (dates: Date[]) => void;
  availableDates: Date[];
}

const Calendar: React.FC<CalendarProps> = ({
  selectedDates,
  onChange,
  availableDates,
}) => {
  const [dragStart, setDragStart] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days: Date[] = [];
  let day = startDate;
  while (isBefore(day, endDate) || isSameDay(day, endDate)) {
    days.push(day);
    day = addDays(day, 1);
  }

  const isAvailable = (date: Date) =>
    availableDates.some((d) => isSameDay(d, date));

  const handleMouseDown = (date: Date) => {
    if (!isAvailable(date)) return;


    const alreadySelected = selectedDates.some((d) => isSameDay(d, date));

    if (!dragStart) {
      if (alreadySelected) {
        onChange(selectedDates.filter((d) => !isSameDay(d, date)));
      } else {
        onChange([...selectedDates, date]);
      }
    }

    setDragStart(date);
  };

  const handleMouseEnter = (date: Date) => {
    if (dragStart) setHoverDate(date);
  };

  const handleMouseUp = () => {
    if (dragStart && hoverDate && !isSameDay(dragStart, hoverDate)) {
      const start = isBefore(dragStart, hoverDate) ? dragStart : hoverDate;
      const end = isBefore(dragStart, hoverDate) ? hoverDate : dragStart;
      const range = eachDayOfInterval({ start, end });

      if (range.every(isAvailable)) {
        const merged = [
          ...selectedDates,
          ...range.filter(
            (d) => !selectedDates.some((sel) => isSameDay(sel, d))
          ),
        ];
        onChange(merged);
      }
    }
    setDragStart(null);
    setHoverDate(null);
  };

  const isInSelection = (date: Date) => {
    if (!dragStart || !hoverDate) {
      return selectedDates.some((d) => isSameDay(d, date));
    }
    const start = isBefore(dragStart, hoverDate) ? dragStart : hoverDate;
    const end = isBefore(dragStart, hoverDate) ? hoverDate : dragStart;
    return (
      (isBefore(start, date) && isBefore(date, end)) ||
      isSameDay(date, start) ||
      isSameDay(date, end)
    );
  };

  return (
    <div className="p-3 bg-white rounded shadow-md w-full max-w-sm">
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="px-2 py-1 rounded hover:bg-gray-200 text-blue-400"
        >
          ◀
        </button>
        <span className="font-semibold text-base text-blue-400">
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="px-2 py-1 rounded hover:bg-gray-200 text-blue-400"
        >
          ▶
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1  text-center font-bold mb-1 text-sm md:text-base">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 select-none text-base">
        {days.map((dayDate, i) => {
          const disabled =
            !isAvailable(dayDate) || !isSameMonth(dayDate, currentMonth);
          return (
            <div
              key={i}
              onMouseDown={() => handleMouseDown(dayDate)}
              onMouseEnter={() => handleMouseEnter(dayDate)}
              onMouseUp={handleMouseUp}
              className={clsx(
                "p-2 text-center rounded",
                disabled && "bg-white text-gray-400 cursor-not-allowed",
                !disabled && "hover:bg-gray-200 text-black cursor-pointer",
                isInSelection(dayDate) &&
                  !disabled &&
                  "bg-deepPurple text-white"
              )}
            >
              {format(dayDate, "d")}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Calendar;
