import { Input } from "@/components/Input";
import { Images } from "@/assets";
import { useState } from "react";
import { toast } from "react-toastify";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";
import { useNavigate } from "react-router-dom";
import {
  carRentFormState,
  validateCarRentForm,
} from "@/utils/validations/host/service/CarRentFormValidation";
import { Clock } from "lucide-react";

interface ErrorState {
  businessName: string;
  make?: string;
  model?: string;
  year?: number;
  color?: string;
  plate?: string;
  fuel?: string;
  transmission?: string;
  seats?: number;
  rent?: number;
  deposite?: number;
  timeSlots?: string[];
  availableDates?: string[];
}

const CarForm = () => {
  const [form, setForm] = useState<carRentFormState>({
    businessName: "",
    make: "",
    model: "",
    year: null,
    color: "",
    plate: "",
    fuel: "",
    transmission: "",
    seats: null,
    rent: null,
    deposite: null,
    timeSlots: [],
    availableDates: [],
  });

  const [errors, setErrors] = useState<Partial<ErrorState>>({});
  const [loading, setLoading] = useState(false);
  const [dateInput, setDateInput] = useState("");
  const navigate = useNavigate();

  const [startTime, setStartTime] = useState({
    hour: "10",
    minute: "00",
    period: "AM",
  });
  const [endTime, setEndTime] = useState({
    hour: "03",
    minute: "00",
    period: "PM",
  });

  const formatTime = (hour: string, minute: string, period: string) => {
    return `${hour.padStart(2, "0")}:${minute} ${period}`;
  };

  const handleAddTimeSlot = () => {
    const startFormatted = formatTime(
      startTime.hour,
      startTime.minute,
      startTime.period
    );
    const endFormatted = formatTime(
      endTime.hour,
      endTime.minute,
      endTime.period
    );
    const newSlot = `${startFormatted} - ${endFormatted}`;

    if (startTime.period === "PM" && endTime.period === "AM") {
      toast.error("End time must be after start time");
      return;
    }
    if (
      startTime.period === endTime.period &&
      (startTime.hour > endTime.hour ||
        (startTime.hour === endTime.hour && startTime.minute >= endTime.minute))
    ) {
      toast.error("End time must be after start time");
      return;
    }

    if (form.timeSlots.includes(newSlot)) {
      toast.error("This time slot already exists");
      return;
    }

    setForm((prev) => ({
      ...prev,
      timeSlots: [...prev.timeSlots, newSlot],
    }));
  };

  const handleRemoveSlot = (slotToRemove: string) => {
    setForm((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.filter((slot) => slot !== slotToRemove),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: ["rent", "seats", "deposite", "year"].includes(name)
        ? Number(value)
        : value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAddDate = () => {
    if (!dateInput) {
      toast.error("Please select a date");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (dateInput < today) {
      toast.error("Cannot select past dates");
      return;
    }

    if (!form.availableDates.includes(dateInput)) {
      setForm((prev) => ({
        ...prev,
        availableDates: [...prev.availableDates, dateInput],
      }));
      setDateInput("");
    }
  };

  const handleRemoveDate = (dateToRemove: string) => {
    setForm((prev) => ({
      ...prev,
      availableDates: prev.availableDates.filter(
        (date) => date !== dateToRemove
      ),
    }));
  };

  const handleSubmit = () => {
    setLoading(true);
    const { isValid, errors: validationErrors } = validateCarRentForm(form);
    if (!isValid) {
      setErrors(validationErrors);
      toast.error("Please correct the errors in the form.");
      console.log(validationErrors)

      setTimeout(() => {
        setErrors({});
      }, 5000);
      setLoading(false);
      return;
    }

    toast.success("Car details submitted!");
    setTimeout(() => navigate("/host/car-features"), 5000);
  };

  return (
    <div>
      <div className="max-w-5xl mx-auto px-4 md:px-2 py-10 font-prompt">
        <div className="grid lg:grid-cols-[2fr_1fr] gap-8 items-start">
          {/* LEFT SIDE */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-1">
              Enter your car details
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 font-JosephicSans">
              Accurate car details help build trust and improve visibility in
              listings.
            </p>

            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Input
                    type="text"
                    placeholder="Business name"
                    name="businessName"
                    value={form.businessName}
                    onChange={handleChange}
                  />
                  {errors.businessName && (
                    <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Make"
                    name="make"
                    value={form.make}
                    onChange={handleChange}
                  />
                  {errors.make && (
                    <p className="text-red-500 text-xs mt-1">{errors.make}</p>
                  )}
                </div>

                <div>
                  <Input
                    type="text"
                    placeholder="Model"
                    name="model"
                    value={form.model}
                    onChange={handleChange}
                  />
                  {errors.model && (
                    <p className="text-red-500 text-xs mt-1">{errors.model}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    type="number"
                    placeholder="Year"
                    name="year"
                    value={form.year as string | number | undefined}
                    onChange={handleChange}
                  />
                  {errors.year && (
                    <p className="text-red-500 text-xs mt-1">{errors.year}</p>
                  )}
                </div>

                <div>
                  <Input
                    type="text"
                    placeholder="Color"
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                  />
                  {errors.color && (
                    <p className="text-red-500 text-xs mt-1">{errors.color}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    type="number"
                    placeholder="Rent in a day"
                    name="rent"
                    value={form.rent as string | number | undefined}
                    onChange={handleChange}
                  />
                  {errors.rent && (
                    <p className="text-red-500 text-xs mt-1">{errors.rent}</p>
                  )}
                </div>

                <div>
                  <Input
                    type="number"
                    placeholder="Deposite amount"
                    name="deposite"
                    value={form.deposite as string | number | undefined}
                    onChange={handleChange}
                  />
                  {errors.deposite && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.deposite}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    type="text"
                    placeholder="License Plate"
                    name="plate"
                    value={form.plate}
                    onChange={handleChange}
                  />
                  {errors.plate && (
                    <p className="text-red-500 text-xs mt-1">{errors.plate}</p>
                  )}
                </div>
                <div>
                  <select
                    name="seats"
                    value={form.seats as string | number | undefined}
                    className="w-full border rounded px-3 py-2"
                    onChange={handleChange}
                  >
                    <option value="">Seats</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                  {errors.seats && (
                    <p className="text-red-600 text-xs mt-1">{errors.seats}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <select
                    name="transmission"
                    value={form.transmission}
                    className="w-full border rounded px-3 py-2"
                    onChange={handleChange}
                  >
                    <option value="">Transmission</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                  {errors.transmission && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.transmission}
                    </p>
                  )}
                </div>
                <div>
                  <select
                    name="fuel"
                    value={form.fuel}
                    className="w-full border rounded px-3 py-2"
                    onChange={handleChange}
                  >
                    <option value="">Fuel type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="CNG">CNG</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                  {errors.fuel && (
                    <p className="text-red-600 text-xs mt-1">{errors.fuel}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-10">
                <div className="sm:col-span-2 mt-2 mb-2">
                  <label className="block text-sm font-medium">
                    Available Time Slots
                  </label>
                  <div className="flex flex-col gap-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                      <div className="flex gap-2 items-center w-full">
                        <Clock className="w-4 h-4 text-gray-500 shrink-0" />
                        <span className="text-sm whitespace-nowrap">From:</span>
                        <select
                          value={startTime.hour}
                          onChange={(e) =>
                            setStartTime({ ...startTime, hour: e.target.value })
                          }
                          className="border rounded px-2 py-1 w-full"
                        >
                          {Array.from({ length: 12 }, (_, i) =>
                            (i + 1).toString().padStart(2, "0")
                          ).map((hour) => (
                            <option key={`start-${hour}`} value={hour}>
                              {hour}
                            </option>
                          ))}
                        </select>
                        <span>:</span>
                        <select
                          value={startTime.minute}
                          onChange={(e) =>
                            setStartTime({
                              ...startTime,
                              minute: e.target.value,
                            })
                          }
                          className="border rounded px-2 py-1 w-full"
                        >
                          {["00", "15", "30", "45"].map((minute) => (
                            <option key={`start-${minute}`} value={minute}>
                              {minute}
                            </option>
                          ))}
                        </select>
                        <select
                          value={startTime.period}
                          onChange={(e) =>
                            setStartTime({
                              ...startTime,
                              period: e.target.value,
                            })
                          }
                          className="border rounded px-2 py-1 w-full"
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                      <div className="flex gap-2 items-center w-full">
                        <Clock className="w-4 h-4 text-gray-500 shrink-0" />
                        <span className="text-sm whitespace-nowrap">To:</span>
                        <select
                          value={endTime.hour}
                          onChange={(e) =>
                            setEndTime({ ...endTime, hour: e.target.value })
                          }
                          className="border rounded px-2 py-1 w-full"
                        >
                          {Array.from({ length: 12 }, (_, i) =>
                            (i + 1).toString().padStart(2, "0")
                          ).map((hour) => (
                            <option key={`end-${hour}`} value={hour}>
                              {hour}
                            </option>
                          ))}
                        </select>
                        <span>:</span>
                        <select
                          value={endTime.minute}
                          onChange={(e) =>
                            setEndTime({ ...endTime, minute: e.target.value })
                          }
                          className="border rounded px-2 py-1 w-full"
                        >
                          {["00", "15", "30", "45"].map((minute) => (
                            <option key={`end-${minute}`} value={minute}>
                              {minute}
                            </option>
                          ))}
                        </select>
                        <select
                          value={endTime.period}
                          onChange={(e) =>
                            setEndTime({ ...endTime, period: e.target.value })
                          }
                          className="border rounded px-2 py-1 w-full"
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                      {errors.timeSlots && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors.timeSlots}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={handleAddTimeSlot}
                      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm w-full"
                    >
                      Add Time Slot
                    </button>
                    {form.timeSlots.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {form.timeSlots.map((slot) => (
                          <div
                            key={slot}
                            className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
                          >
                            <span className="text-sm">{slot}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveSlot(slot)}
                              className="text-red-500 hover:text-red-700 text-md sm:text-3xl"
                              aria-label={`Remove ${slot}`}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="py-5">
                    <label className="block text-sm font-medium">
                      Available Dates
                    </label>

                    <div className="flex flex-col sm:flex-row gap-2 w-full mt-1">
                      <input
                        type="date"
                        value={dateInput}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setDateInput(e.target.value)}
                        className="border rounded px-3 py-2 flex-grow w-full sm:w-auto"
                      />
                      <button
                        type="button"
                        onClick={handleAddDate}
                        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm md:w-32 sm:min-w-[120px]"
                      >
                        Add Date
                      </button>
                    </div>

                    {form.availableDates.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {form.availableDates.map((date) => (
                          <div
                            key={date}
                            className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
                          >
                            <span className="text-sm">{date}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveDate(date)}
                              className="text-red-500 hover:text-red-700 text-3xl"
                              aria-label={`Remove ${date}`}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {errors.availableDates && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.availableDates}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="border rounded-lg p-6 hidden lg:block min-h-[360px]">
            <img
              src={Images.kind_location}
              alt="Info"
              className="w-10 h-10 mx-auto mb-4"
            />
            <p className="text-sm text-gray-600 text-center sm:text-left font-JosephicSans mb-2">
              Accurate car information helps in faster verification and builds
              credibility.
            </p>
            <p className="text-sm text-gray-600 text-center sm:text-left font-JosephicSans mt-4 mb-1">
              🚘 <strong>Why car details matter?</strong>
            </p>
            <p className="text-sm text-gray-600 text-center sm:text-left font-JosephicSans">
              Clear and correct car information improves user confidence and
              boosts your visibility.
            </p>
          </div>
        </div>

        <CustomToastContainer />
      </div>
      <div className="mt-60 p-4 sm:mt-52 justify-end sm:ml-[1200px] sm:mr-14">
        <button
         onClick={handleSubmit}
         disabled={loading}
          className={`w-full md:w-28 flex items-center justify-center gap-2 bg-main_host text-white px-25 py-3 rounded-lg transition ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:brightness-110"
          }`}
          type="button"
        >
           {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
          )}
          {loading ? "Submitting..." : "Next"}
        </button>
      </div>
    </div>
  );
};

export default CarForm;
