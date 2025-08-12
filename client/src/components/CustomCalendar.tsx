import React, { useState, useMemo, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface CustomCalendarProps {
  availableDates: string[]; // YYYY-MM-DD format
  onSelect: (dates: Date[]) => void;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  availableDates,
  onSelect,
}) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<Date | null>(null);

  // Convert availableDates to Date objects
  const availableDateObjs = useMemo(
    () => availableDates.map((d) => new Date(d)),
    [availableDates]
  );

  // Check if a date is available
  const isAvailable = (date: Date) =>
    availableDateObjs.some((d) => d.toDateString() === date.toDateString());

  // Handle click for single date selection
  const handleClick = (date: Date) => {
    if (!isAvailable(date)) return;
    console.log("Clicked date:", date.toDateString()); // Debug
    setSelectedDates([date]);
    onSelect([date]);
    setIsDragging(false); // Ensure drag is reset
    dragStartRef.current = null;
  };

  // Start drag for multiple date selection
  const startDrag = (date: Date) => {
    if (!isAvailable(date)) return;
    console.log("Drag started on:", date.toDateString()); // Debug
    dragStartRef.current = date;
    setIsDragging(true);
    setSelectedDates([date]);
  };

  // Continue drag to select range
  const continueDrag = (date: Date) => {
    if (!isDragging || !dragStartRef.current) return;
    console.log("Dragging over:", date.toDateString()); // Debug

    const start = dragStartRef.current;
    let range: Date[] = [];
    const step = date >= start ? 1 : -1;
    const current = new Date(start);

    while (true) {
  range.push(new Date(current));
  if (current.toDateString() === date.toDateString()) break;
  current.setDate(current.getDate() + step);
  if (!isAvailable(current)) {
    range = [];
    break;
  }
}

    if (isAvailable(date) && date.toDateString() !== start.toDateString()) {
      range.push(new Date(date));
    }
    range.sort((a, b) => a.getTime() - b.getTime());
    console.log("Selected range:", range.map(d => d.toDateString())); // Debug
    setSelectedDates(range);
  };

  const endDrag = () => {
    if (isDragging) {
      console.log("Drag ended, final selection:", selectedDates.map(d => d.toDateString())); // Debug
      setIsDragging(false);
      dragStartRef.current = null;
      if (selectedDates.length > 0) {
        onSelect(selectedDates);
      }
    }
  };

  return (
    <div onMouseUp={endDrag} onMouseLeave={endDrag}>
      <Calendar
        selectRange={false}
        tileDisabled={({ date }) => !isAvailable(date)}
        tileClassName={({ date }) => {
          const isSelected = selectedDates.some(
            (d) => d.toDateString() === date.toDateString()
          );
          return isSelected
            ? isDragging
              ? "bg-purple-300 text-white rounded-full"
              : "bg-purple-600 text-white rounded-full"
            : isAvailable(date)
            ? "bg-green-100"
            : "opacity-50";
        }}
        onClickDay={(date) => handleClick(date)} // Handle single click
        tileContent={({ date }) => (
          <div
            onMouseDown={() => startDrag(date)}
            onMouseOver={() => continueDrag(date)}
            style={{ width: "100%", height: "100%", cursor: "pointer" }}
            role="button"
            aria-label={`Select ${date.toDateString()}`}
          />
        )}
      />
    </div>
  );
};

export default CustomCalendar;