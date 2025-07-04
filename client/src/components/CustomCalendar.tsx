import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const CustomCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
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

  const handleSelectDate = (day: number) => {
    setSelectedDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    );
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

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
        {Array(firstDay)
          .fill(null)
          .map((_, i) => (
            <div key={`empty-${i}`}></div>
          ))}

        {Array(daysInMonth)
          .fill(null)
          .map((_, i) => {
            const day = i + 1;
            const isSelected =
              selectedDate &&
              selectedDate.getDate() === day &&
              selectedDate.getMonth() === currentDate.getMonth() &&
              selectedDate.getFullYear() === currentDate.getFullYear();

            return (
              <button
                key={day}
                onClick={() => handleSelectDate(day)}
                className={`w-8 h-8 rounded-full hover:bg-main_color_light ${
                  isSelected ? "bg-main_color text-white p-2" : "text-gray-700"
                }`}
              >
                {day}
              </button>
            );
          })}
      </div>
      {selectedDate && (
        <div className="mt-3 text-center text-sm text-gray-600">
          Selected:{" "}
          <span className="font-semibold text-main_color">{selectedDate.toDateString()}</span>
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
