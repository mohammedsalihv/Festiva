import { Input } from "@/components/Input";
import { Images } from "@/assets";
import { useState } from "react";
import { Clock } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";
import {
  validateVenueDetailsForm,
  venueDetailsFormState,
  VenueDetailsErrorState,
} from "@/utils/validations/host/service/VenueDetailsValidation";
import { useDispatch } from "react-redux";
import { setVenueDetails } from "@/redux/Slice/host/venueDetailsSlice";
import { Textarea } from "@/components/Textarea";

const VenueDetailsForm = () => {
  const [form, setForm] = useState<venueDetailsFormState>({
    venueName: "",
    rent: "",
    capacity: "",
    shift: "",
    squareFeet: "",
    timeSlots: [],
    availableDates: [],
    description: "",
  });

  const [errors, setErrors] = useState<VenueDetailsErrorState>({});
  const [loading, setLoading] = useState(false);
  const [dateInput, setDateInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      [name]: value,
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

    const { isValid, errors: validationErrors } =
      validateVenueDetailsForm(form);

    if (!isValid) {
      setErrors(validationErrors);
      toast.error("Please correct the errors in the form.");
      setTimeout(() => setErrors({}), 5000);
      setLoading(false);
      return;
    }

    const payload = {
      ...form,
      rent: form.rent === "" ? null : Number(form.rent),
      capacity: form.capacity === "" ? null : Number(form.capacity),
      squareFeet: form.squareFeet === "" ? null : Number(form.squareFeet),
    };

    dispatch(setVenueDetails(payload));
    toast.success("Saving...");
    setTimeout(() => navigate("/host/location-features"), 5000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 font-prompt">
      <div className="grid lg:grid-cols-[2fr_1fr] gap-8 items-start">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-1">
            Tell us about your venue
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-6">
            This helps us better match guests to your space.
          </p>

          <form className="space-y-5 py-3">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Venue name</label>
              <Input
                type="text"
                name="venueName"
                value={form.venueName}
                onChange={handleChange}
                className={`${
                  errors.venueName ? "border-red-600" : "border-black"
                }`}
              />
              {errors.venueName && (
                <p className="text-red-600 text-xs mt-1">{errors.venueName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                 <label className="block text-sm font-medium">Rent</label>
                <Input
                  type="text"
                  name="rent"
                  value={form.rent}
                  onChange={handleChange}
                  className={`${
                    errors.rent ? "border-red-600" : "border-black"
                  }`}
                />
                {errors.rent && (
                  <p className="text-red-600 text-xs mt-1">{errors.rent}</p>
                )}
              </div>
              <div className="space-y-2">
                 <label className="block text-sm font-medium">Max capacity</label>
                <Input
                  type="text"
                  name="capacity"
                  value={form.capacity}
                  onChange={handleChange}
                  className={`${
                    errors.rent ? "border-red-600" : "border-black"
                  }`}
                />
                {errors.capacity && (
                  <p className="text-red-600 text-xs mt-1">{errors.capacity}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="space-y-2">
                 <label className="block text-sm font-medium">Select available shift</label>
                <select
                  name="shift"
                  value={form.shift}
                  onChange={handleChange}
                  className={`w-full border-b rounded px-3 py-2 ${errors.shift ? 'border-red-600':'border-black'}`}
                >
                  <option value="">Select one</option>
                  <option value="All">All</option>
                  <option value="Day">Day</option>
                  <option value="Evening">Evening</option>
                  <option value="Night">Night</option>
                </select>
                {errors.shift && (
                  <p className="text-red-600 text-xs mt-1">{errors.shift}</p>
                )}
              </div>
            <div className="space-y-2">
                 <label className="block text-sm font-medium">Square feet</label>
                <Input
                  type="text"
                  name="squareFeet"
                  value={form.squareFeet}
                  onChange={handleChange}
                  className={`${
                    errors.rent ? "border-red-600" : "border-black"
                  }`}
                />
                {errors.squareFeet && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.squareFeet}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-3">
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
                        setStartTime({ ...startTime, minute: e.target.value })
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
                        setStartTime({ ...startTime, period: e.target.value })
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
                          className="text-red-500 hover:text-red-700 text-3xl"
                          aria-label={`Remove ${slot}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Available Dates
              </label>

              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <Input
                  type="date"
                  value={dateInput}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDateInput(e.target.value)}
                  className={`${errors.availableDates ? "border-red-600":"border-black"}`}
                />

                <button
                  type="button"
                  onClick={handleAddDate}
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm 
                 md:w-32 sm:min-w-[120px]"
                >
                  Add Date
                </button>
              </div>
              {form.availableDates.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2 ">
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
            </div>
            {errors.availableDates && (
              <p className="text-red-600 text-xs mt-1">
                {errors.availableDates}
              </p>
            )}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Description</label>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className={`${errors.description ? "border-red-600":"border-black"}`}
              />
              {errors.description && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </form>
        </div>
        <div className="border rounded-lg p-6 hidden lg:block">
          <img
            src={Images.venues}
            alt="Venue illustration"
            className="w-20 h-20 mx-auto mb-4"
          />
          <p className="text-sm text-gray-600 text-center">
            Provide accurate information to attract the right guests for your
            venue.
          </p>
        </div>
      </div>
      <div className="flex justify-end mt-10">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`flex items-center justify-center gap-2 bg-main_host text-white px-10 py-3 rounded-lg transition ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:brightness-110"
          }`}
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
          {loading ? "Saving..." : "Next"}
        </button>
      </div>

      <CustomToastContainer />
    </div>
  );
};

export default VenueDetailsForm;
