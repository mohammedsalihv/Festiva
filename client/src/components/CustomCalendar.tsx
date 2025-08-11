import React, { useState, useMemo } from "react";
import Calendar from "react-calendar"; 
import "react-calendar/dist/Calendar.css";

interface CustomCalendarProps {
  availableDates: string[]; // 'YYYY-MM-DD'
  onSelect: (dates: Date[]) => void;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  availableDates,
  onSelect,
}) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  // Convert to Date objects for easier processing
  const availableDateObjs = useMemo(
    () => availableDates.map((d) => new Date(d)),
    [availableDates]
  );

  // Check if there are consecutive dates
  const allowMultiple = useMemo(() => {
    const sorted = [...availableDateObjs].sort((a, b) => a.getTime() - b.getTime());
    for (let i = 0; i < sorted.length - 1; i++) {
      const diffInDays =
        (sorted[i + 1].getTime() - sorted[i].getTime()) / (1000 * 60 * 60 * 24);
      if (diffInDays === 1) {
        return true;
      }
    }
    return false;
  }, [availableDateObjs]);

  const handleDateClick = (date: Date) => {
    if (!availableDateObjs.some((d) => d.toDateString() === date.toDateString())) {
      return; // ignore clicks on unavailable dates
    }

    if (!allowMultiple) {
      setSelectedDates([date]);
      onSelect([date]);
    } else {
      let updatedDates: Date[];
      if (selectedDates.length === 0) {
        updatedDates = [date];
      } else if (selectedDates.length === 1) {
        // Create a range between first and second date
        const start = selectedDates[0] < date ? selectedDates[0] : date;
        const end = selectedDates[0] < date ? date : selectedDates[0];
        updatedDates = [];

        let current = new Date(start);
        while (current <= end) {
          if (
            availableDateObjs.some(
              (d) => d.toDateString() === current.toDateString()
            )
          ) {
            updatedDates.push(new Date(current));
          }
          current.setDate(current.getDate() + 1);
        }
      } else {
        updatedDates = [date]; // reset selection
      }

      setSelectedDates(updatedDates);
      onSelect(updatedDates);
    }
  };

  return (
    <Calendar
      tileDisabled={({ date }) =>
        !availableDateObjs.some((d) => d.toDateString() === date.toDateString())
      }
      onClickDay={handleDateClick}
      tileClassName={({ date }) =>
        selectedDates.some((d) => d.toDateString() === date.toDateString())
          ? "bg-blue-500 text-white rounded"
          : undefined
      }
    />
  );
};

export default CustomCalendar;
